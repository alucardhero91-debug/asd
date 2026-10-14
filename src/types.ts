export type Language = 'ar' | 'id';

export type ToneOption = 'standard' | 'formal' | 'islamic' | 'colloquial';

export interface GrammarItem {
  term: string;
  role: string;
  meaning: string;
  rootOrDetails?: string;
  root?: string; // Akar kata Arab 3 huruf (Jadzr / جذر), contoh: س-ل-م
}

export interface AlternativeItem {
  translation: string;
  style: string;
}

export interface TranslationResultData {
  translatedText: string;
  vocalizedArabic: string;
  transliteration?: string;
  contextSummary: string;
  grammarNotes?: GrammarItem[];
  alternatives?: AlternativeItem[];
  notice?: string;
  modelUsed?: string;
}

export interface TranslationRecord {
  id: string;
  originalText: string;
  translatedText: string;
  sourceLang: Language;
  targetLang: Language;
  tone: ToneOption;
  vocalizedArabic?: string;
  transliteration?: string;
  contextSummary?: string;
  grammarNotes?: GrammarItem[];
  alternatives?: AlternativeItem[];
  timestamp: number;
  isFavorite?: boolean;
  notes?: string;
  tags?: string[];
  notice?: string;
  modelUsed?: string;
}

export interface ApiResponse {
  success: boolean;
  originalText: string;
  sourceLang: Language;
  targetLang: Language;
  tone: ToneOption;
  result: TranslationResultData;
  timestamp: number;
  error?: string;
}
