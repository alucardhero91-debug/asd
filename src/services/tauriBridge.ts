import type { Language, ToneOption, TranslationResultData } from '../types';
import { translateWithFallback } from '../utils/fallbackTranslator';

/**
 * Checks whether the app is currently running inside a Tauri native desktop window.
 */
export function isTauriEnvironment(): boolean {
  if (typeof window === 'undefined') return false;
  return Boolean(
    (window as any).__TAURI_INTERNALS__ ||
    (window as any).__TAURI__
  );
}

/**
 * Translates via Rust native Tauri command if running inside desktop app,
 * otherwise falls back seamlessly to the server /api/translate route.
 */
export async function translateViaBridge(
  text: string,
  sourceLang: Language,
  targetLang: Language,
  tone: ToneOption,
  customApiKey?: string
): Promise<TranslationResultData> {
  // Check if running in native Tauri desktop environment
  if (isTauriEnvironment()) {
    try {
      // Dynamic import to avoid build issues in pure web mode
      const tauriCore = await import('@tauri-apps/api/core');
      if (tauriCore && typeof tauriCore.invoke === 'function') {
        const storedKey = typeof localStorage !== 'undefined' ? localStorage.getItem('GEMINI_API_KEY') : null;
        const effectiveKey = customApiKey || storedKey || null;

        const response: any = await tauriCore.invoke('translate_via_rust', {
          text,
          sourceLang,
          targetLang,
          tone,
          apiKey: effectiveKey,
        });

        if (response && response.result) {
          // If Gemini API processed the translation successfully
          if (!response.isFallback) {
            return {
              ...response.result,
              notice: response.notice || response.result.notice,
              modelUsed: response.result.modelUsed || 'rust-tauri-gemini',
            };
          }

          // If in offline/fallback mode, run the comprehensive client-side Nahwu-Sharaf engine
          const richOffline = translateWithFallback(text, sourceLang, targetLang, tone);
          return {
            ...richOffline,
            notice: 'Mode Luring Desktop Aktif (Mesin Kaidah Nahwu-Sharaf & Kamus Kontekstual Bawaan).',
            modelUsed: 'tauri-offline-linguistic-engine',
          };
        }
      }
    } catch (rustErr) {
      console.warn('Tauri Rust bridge invoke failed, falling back to local linguistic engine:', rustErr);
      // In standalone desktop mode, fetch('/api/translate') will fail because no server is running.
      // Use local offline engine directly.
      const richOffline = translateWithFallback(text, sourceLang, targetLang, tone);
      return {
        ...richOffline,
        notice: 'Mode Luring Desktop Aktif (Mesin Kaidah Nahwu-Sharaf Bawaan).',
        modelUsed: 'tauri-offline-linguistic-engine',
      };
    }
  }

  // Web / Express standard API route
  const response = await fetch('/api/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text,
      sourceLang,
      targetLang,
      tone,
    }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || 'Gagal memproses terjemahan dari server.');
  }

  const data = await response.json();
  return {
    ...data.result,
    notice: data.notice,
    modelUsed: data.modelUsed,
  };
}
