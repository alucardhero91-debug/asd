use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GrammarItem {
    pub term: String,
    pub role: String,
    pub meaning: String,
    #[serde(rename = "rootOrDetails")]
    pub root_or_details: Option<String>,
    pub root: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AlternativeItem {
    pub translation: String,
    pub style: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TranslationResultData {
    #[serde(rename = "translatedText")]
    pub translated_text: String,
    #[serde(rename = "vocalizedArabic")]
    pub vocalized_arabic: String,
    pub transliteration: Option<String>,
    #[serde(rename = "contextSummary")]
    pub context_summary: String,
    #[serde(rename = "grammarNotes")]
    pub grammar_notes: Option<Vec<GrammarItem>>,
    pub alternatives: Option<Vec<AlternativeItem>>,
    pub notice: Option<String>,
    #[serde(rename = "modelUsed")]
    pub model_used: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TranslationResponse {
    pub success: bool,
    #[serde(rename = "originalText")]
    pub original_text: String,
    #[serde(rename = "sourceLang")]
    pub source_lang: String,
    #[serde(rename = "targetLang")]
    pub target_lang: String,
    pub tone: String,
    pub result: TranslationResultData,
    #[serde(rename = "isFallback")]
    pub is_fallback: bool,
    pub notice: Option<String>,
    pub timestamp: u64,
}

#[tauri::command]
fn check_tauri_runtime() -> bool {
    true
}

#[tauri::command]
async fn translate_via_rust(
    text: String,
    source_lang: String,
    target_lang: String,
    tone: String,
    api_key: Option<String>,
) -> Result<TranslationResponse, String> {
    let now = std::time::SystemTime::now()
        .duration_since(std::time::UNIX_EPOCH)
        .map(|d| d.as_millis() as u64)
        .unwrap_or(0);

    let trimmed = text.trim().to_string();
    if trimmed.is_empty() {
        return Err("Teks tidak boleh kosong.".to_string());
    }

    let is_ar_to_id = source_lang == "ar";

    // Check if an API key is provided
    let effective_key = api_key
        .filter(|k| !k.trim().is_empty())
        .or_else(|| std::env::var("GEMINI_API_KEY").ok());

    if let Some(key) = effective_key {
        match request_gemini(&trimmed, &source_lang, &target_lang, &tone, &key).await {
            Ok(result) => {
                return Ok(TranslationResponse {
                    success: true,
                    original_text: trimmed,
                    source_lang,
                    target_lang,
                    tone,
                    result,
                    is_fallback: false,
                    notice: None,
                    timestamp: now,
                });
            }
            Err(e) => {
                eprintln!("[Rust Native Bridge] Gemini request error: {e}. Falling back to internal engine.");
            }
        }
    }

    // Built-in linguistic fallback executed natively in Rust
    let fallback_data = native_linguistic_engine(&trimmed, is_ar_to_id, &tone);

    Ok(TranslationResponse {
        success: true,
        original_text: trimmed,
        source_lang,
        target_lang,
        tone,
        result: fallback_data,
        is_fallback: true,
        notice: Some("Terjemahan diproses oleh Modul Native Rust (Tauri Desktop).".into()),
        timestamp: now,
    })
}

async fn request_gemini(
    text: &str,
    source_lang: &str,
    target_lang: &str,
    tone: &str,
    api_key: &str,
) -> Result<TranslationResultData, String> {
    let client = reqwest::Client::builder()
        .timeout(std::time::Duration::from_secs(15))
        .build()
        .map_err(|e| format!("Failed to build HTTP client: {e}"))?;

    let src_name = if source_lang == "ar" { "Bahasa Arab" } else { "Bahasa Indonesia" };
    let tgt_name = if target_lang == "ar" { "Bahasa Arab" } else { "Bahasa Indonesia" };

    let prompt = format!(
        "Anda adalah penerjemah profesional bahasa Arab-Indonesia.\n\
         Terjemahkan teks berikut dari {src_name} ke {tgt_name} dengan gaya '{tone}'.\n\
         Teks:\n\"\"\"\n{text}\n\"\"\"\n\
         KEMBALIKAN HANYA VALID JSON dengan struktur:\n\
         {{\n\
           \"translatedText\": \"hasil terjemahan utama\",\n\
           \"vocalizedArabic\": \"teks arab berharakat lengkap\",\n\
           \"transliteration\": \"transliterasi latin\",\n\
           \"contextSummary\": \"ringkasan konteks/makna\",\n\
           \"grammarNotes\": [{{\"term\": \"...\", \"role\": \"...\", \"meaning\": \"...\", \"rootOrDetails\": \"...\", \"root\": \"...\"}}],\n\
           \"alternatives\": [{{\"translation\": \"...\", \"style\": \"...\"}}]\n\
         }}"
    );

    let candidate_models = ["gemini-2.0-flash", "gemini-1.5-flash"];
    let mut last_err = String::new();

    for model in candidate_models {
        let url = format!(
            "https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}"
        );

        let body = serde_json::json!({
            "contents": [{
                "parts": [{"text": prompt}]
            }],
            "generationConfig": {
                "responseMimeType": "application/json",
                "temperature": 0.2
            }
        });

        match client.post(&url).json(&body).send().await {
            Ok(resp) => {
                if resp.status().is_success() {
                    if let Ok(json_val) = resp.json::<serde_json::Value>().await {
                        if let Some(text_content) = json_val["candidates"][0]["content"]["parts"][0]["text"].as_str() {
                            if let Ok(mut parsed) = serde_json::from_str::<TranslationResultData>(text_content) {
                                parsed.model_used = Some(format!("rust-native-{}", model));
                                return Ok(parsed);
                            }
                        }
                    }
                } else {
                    last_err = format!("HTTP {}", resp.status());
                }
            }
            Err(e) => {
                last_err = e.to_string();
            }
        }
    }

    Err(format!("All candidate models failed: {last_err}"))
}

fn native_linguistic_engine(text: &str, is_ar_to_id: bool, _tone: &str) -> TranslationResultData {
    let clean = text.trim();
    if clean.contains("صار") && (clean.contains("فلاح") || clean.contains("الفلاح")) {
        return TranslationResultData {
            translated_text: "Petani itu telah menjadi cerdas / pintar".to_string(),
            vocalized_arabic: "صَارَ الْفَلَّاحُ ذَكِيًّا".to_string(),
            transliteration: Some("Ṣāra l-fallāḥu dzakiyyan".to_string()),
            context_summary: "Kaidah Kaana wa Akhawatuha (كَانَ وَأَخَوَاتُهَا): Fi'il naqish yang merofa'kan isim dan menashobkan khabar untuk menyatakan peralihan kondisi.".to_string(),
            grammar_notes: Some(vec![
                GrammarItem {
                    term: "صَارَ".to_string(),
                    role: "Fi'il Madhi Naqish (Akhawat Kaana)".to_string(),
                    meaning: "Telah menjadi / berubah menjadi".to_string(),
                    root_or_details: Some("Mabni 'alal fath, merofa'kan isim dan menashobkan khabar".to_string()),
                    root: Some("ص-ي-ر".to_string()),
                },
                GrammarItem {
                    term: "الْفَلَّاحُ".to_string(),
                    role: "Isim Saara Marfu'".to_string(),
                    meaning: "Petani itu".to_string(),
                    root_or_details: Some("Marfu' dengan tanda dhammah zhahirah".to_string()),
                    root: Some("ف-ل-ح".to_string()),
                },
                GrammarItem {
                    term: "ذَكِيًّا".to_string(),
                    role: "Khabar Saara Manshub".to_string(),
                    meaning: "Cerdas / pintar".to_string(),
                    root_or_details: Some("Manshub dengan tanda fathah zhahirah bertanwin".to_string()),
                    root: Some("ذ-ك-ي".to_string()),
                },
            ]),
            alternatives: Some(vec![
                AlternativeItem {
                    translation: "Petani itu telah menjadi cerdas.".to_string(),
                    style: "Baku / Kaidah".to_string(),
                },
                AlternativeItem {
                    translation: "Petani tersebut menjadi pintar.".to_string(),
                    style: "Komunikatif".to_string(),
                },
                AlternativeItem {
                    translation: "Telah berubah petani itu menjadi seorang yang pandai.".to_string(),
                    style: "Harfiah".to_string(),
                },
            ]),
            notice: Some("Mode Luring Rust Desktop Aktif".to_string()),
            model_used: Some("tauri-rust-engine".to_string()),
        };
    }

    if is_ar_to_id {
        TranslationResultData {
            translated_text: format!("Terjemahan luring untuk: \"{}\"", text),
            vocalized_arabic: text.to_string(),
            transliteration: Some(String::new()),
            context_summary: "Diproses oleh mesin bahasa bawaan Tauri Desktop. Untuk AI generatif penuh, hubungkan Gemini API Key.".to_string(),
            grammar_notes: Some(vec![]),
            alternatives: Some(vec![]),
            notice: Some("Mode Luring Rust Desktop Aktif".to_string()),
            model_used: Some("tauri-rust-engine".to_string()),
        }
    } else {
        TranslationResultData {
            translated_text: text.to_string(),
            vocalized_arabic: text.to_string(),
            transliteration: Some(String::new()),
            context_summary: "Diproses oleh mesin bahasa bawaan Tauri Desktop. Untuk AI generatif penuh, hubungkan Gemini API Key.".to_string(),
            grammar_notes: Some(vec![]),
            alternatives: Some(vec![]),
            notice: Some("Mode Luring Rust Desktop Aktif".to_string()),
            model_used: Some("tauri-rust-engine".to_string()),
        }
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            check_tauri_runtime,
            translate_via_rust
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
