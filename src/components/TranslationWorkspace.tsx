import { useState, useRef, useEffect } from 'react';
import {
  ArrowLeftRight,
  Copy,
  Check,
  Bookmark,
  X,
  Sparkles,
  Loader2,
  HardDrive,
  RotateCcw,
  BookMarked,
  BookOpen,
} from 'lucide-react';
import { Language, ToneOption, TranslationRecord, TranslationResultData } from '../types';
import GrammarAnalysis from './GrammarAnalysis';
import DictionaryModal from './DictionaryModal';

interface TranslationWorkspaceProps {
  isOnline: boolean;
  onTranslate: (
    text: string,
    sourceLang: Language,
    targetLang: Language,
    tone: ToneOption
  ) => Promise<TranslationResultData | null>;
  currentRecord: TranslationRecord | null;
  onSaveFavorite: (record: TranslationRecord) => void;
  onRemoveFavorite: (id: string) => void;
  isFavorite: boolean;
  onClearWorkspace: () => void;
}

export default function TranslationWorkspace({
  isOnline,
  onTranslate,
  currentRecord,
  onSaveFavorite,
  onRemoveFavorite,
  isFavorite,
  onClearWorkspace,
}: TranslationWorkspaceProps) {
  const [sourceLang, setSourceLang] = useState<Language>('ar');
  const [targetLang, setTargetLang] = useState<Language>('id');
  const [inputText, setInputText] = useState('');
  const [tone, setTone] = useState<ToneOption>('standard');
  const [isLoading, setIsLoading] = useState(false);
  const [activeResult, setActiveResult] = useState<TranslationResultData | null>(null);
  const [copiedTarget, setCopiedTarget] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDictionaryOpen, setIsDictionaryOpen] = useState(false);
  const [dictionaryLookupWord, setDictionaryLookupWord] = useState('');

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sync with incoming record from history / favorites
  useEffect(() => {
    if (currentRecord) {
      setInputText(currentRecord.originalText);
      setSourceLang(currentRecord.sourceLang);
      setTargetLang(currentRecord.targetLang);
      setTone(currentRecord.tone || 'standard');
      setActiveResult({
        translatedText: currentRecord.translatedText,
        vocalizedArabic: currentRecord.vocalizedArabic || currentRecord.originalText,
        transliteration: currentRecord.transliteration,
        contextSummary: currentRecord.contextSummary || '',
        grammarNotes: currentRecord.grammarNotes || [],
        alternatives: currentRecord.alternatives || [],
        notice: currentRecord.notice,
        modelUsed: currentRecord.modelUsed,
      });
      setErrorMessage(null);
    }
  }, [currentRecord]);

  // Swap languages
  const handleSwapLanguages = () => {
    const prevSource = sourceLang;
    const prevTarget = targetLang;
    const prevInput = inputText;
    const prevOutput = activeResult?.translatedText || '';

    setSourceLang(prevTarget);
    setTargetLang(prevSource);
    setInputText(prevOutput);

    if (prevInput) {
      setActiveResult({
        translatedText: prevInput,
        vocalizedArabic: prevTarget === 'ar' ? prevOutput : prevInput,
        contextSummary: 'Dibalikkan dari hasil terjemahan sebelumnya.',
      });
    } else {
      setActiveResult(null);
    }
  };

  // Perform translation
  const handleExecuteTranslation = async (textToTranslate = inputText) => {
    const trimmed = textToTranslate.trim();
    if (!trimmed) {
      setActiveResult(null);
      return;
    }

    // Auto-detect and correct opposite language direction
    const hasArabicChars = /[\u0600-\u06FF]/.test(trimmed);
    const hasLatinChars = /[a-zA-Z]/.test(trimmed);

    let effectiveSource = sourceLang;
    let effectiveTarget = targetLang;

    if (hasArabicChars && !hasLatinChars && sourceLang === 'id') {
      effectiveSource = 'ar';
      effectiveTarget = 'id';
      setSourceLang('ar');
      setTargetLang('id');
    } else if (!hasArabicChars && hasLatinChars && sourceLang === 'ar') {
      effectiveSource = 'id';
      effectiveTarget = 'ar';
      setSourceLang('id');
      setTargetLang('ar');
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await onTranslate(trimmed, effectiveSource, effectiveTarget, tone);
      if (res) {
        setActiveResult(res);
      } else {
        setErrorMessage('Tidak dapat memperoleh hasil terjemahan.');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Terjadi gangguan saat menerjemahkan.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyTarget = () => {
    if (!activeResult?.translatedText) return;
    navigator.clipboard.writeText(activeResult.translatedText);
    setCopiedTarget(true);
    setTimeout(() => setCopiedTarget(false), 2000);
  };

  const handleToggleFavorite = () => {
    if (!activeResult || !inputText.trim()) return;

    const recordId = currentRecord?.id || `trans-${Date.now()}`;
    const record: TranslationRecord = {
      id: recordId,
      originalText: inputText.trim(),
      translatedText: activeResult.translatedText,
      sourceLang,
      targetLang,
      tone,
      vocalizedArabic: activeResult.vocalizedArabic,
      transliteration: activeResult.transliteration,
      contextSummary: activeResult.contextSummary,
      grammarNotes: activeResult.grammarNotes,
      alternatives: activeResult.alternatives,
      notice: activeResult.notice,
      modelUsed: activeResult.modelUsed,
      timestamp: Date.now(),
      isFavorite: !isFavorite,
    };

    if (isFavorite) {
      onRemoveFavorite(recordId);
    } else {
      onSaveFavorite(record);
    }
  };

  const handleSelectAlternative = (altText: string) => {
    if (!activeResult) return;
    setActiveResult({
      ...activeResult,
      translatedText: altText,
    });
  };

  const isSourceArabic = sourceLang === 'ar';
  const isTargetArabic = targetLang === 'ar';

  const hasArabicScript = /[\u0600-\u06FF]/.test(inputText);
  const hasLatinScript = /[a-zA-Z]/.test(inputText);
  const showArabicMismatchAlert =
    inputText.trim().length >= 2 && hasArabicScript && !hasLatinScript && sourceLang === 'id';
  const showIndonesianMismatchAlert =
    inputText.trim().length >= 2 && !hasArabicScript && hasLatinScript && sourceLang === 'ar';

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Top Controls: Language Switcher & Quick Actions */}
      {/* Top Toolbar: Language Direction & Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        {/* Sleek Pill Language Switcher with Clear Origin ➔ Destination */}
        <div className="w-full sm:w-auto flex items-center justify-between gap-1.5 sm:gap-2 bg-zinc-100/90 dark:bg-zinc-900/90 p-1.5 rounded-2xl border border-zinc-200/90 dark:border-zinc-800 shadow-sm dark:shadow-2xl backdrop-blur-md transition-colors">
          <button
            type="button"
            onClick={() => {
              if (sourceLang !== 'ar') {
                setSourceLang('ar');
                setTargetLang('id');
              }
            }}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 sm:px-5 py-2.5 min-h-[44px] rounded-xl text-xs sm:text-sm font-medium transition-all ${
              sourceLang === 'ar'
                ? 'bg-white dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-zinc-200 dark:border-emerald-500/40 font-semibold shadow-xs dark:shadow-inner'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <span className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Asal:</span>
            <span className="font-semibold">Arab</span>
          </button>

          <button
            type="button"
            id="swap-language-btn"
            onClick={handleSwapLanguages}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-zinc-500 dark:text-zinc-400 hover:text-emerald-700 dark:hover:text-white hover:bg-white dark:hover:bg-zinc-800 active:scale-90 transition shadow-xs border border-zinc-200 dark:border-zinc-700/40 hover:border-emerald-500/40"
            title="Tukar bahasa asal dan target"
          >
            <ArrowLeftRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400 transition" />
          </button>

          <button
            type="button"
            onClick={() => {
              if (sourceLang !== 'id') {
                setSourceLang('id');
                setTargetLang('ar');
              }
            }}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 sm:px-5 py-2.5 min-h-[44px] rounded-xl text-xs sm:text-sm font-medium transition-all ${
              sourceLang === 'id'
                ? 'bg-white dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-zinc-200 dark:border-emerald-500/40 font-semibold shadow-xs dark:shadow-inner'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <span className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Tujuan:</span>
            <span className="font-semibold">{targetLang === 'id' ? 'Indonesia' : 'Arab'}</span>
          </button>
        </div>

        {/* Action Controls */}
        <div className="w-full sm:w-auto flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0 touch-pan-x">
          <button
            type="button"
            id="open-dictionary-btn"
            onClick={() => {
              setDictionaryLookupWord('');
              setIsDictionaryOpen(true);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2.5 min-h-[44px] rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-300 hover:border-emerald-500/40 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition text-xs font-medium whitespace-nowrap shrink-0 shadow-xs"
            title="Buka rujukan leksikal kamus resmi: KSAA, Mujam.org, Almaany.com"
          >
            <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Kamus Mu'jam</span>
          </button>

          <button
            type="button"
            id="save-favorite-btn"
            onClick={handleToggleFavorite}
            disabled={!activeResult || !inputText.trim()}
            className={`flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl border text-xs sm:text-sm whitespace-nowrap shrink-0 transition shadow-xs ${
              isFavorite
                ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-500/60 text-emerald-800 dark:text-emerald-300'
                : 'bg-white dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700/50 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white'
            } disabled:opacity-40 disabled:cursor-not-allowed`}
            title={isFavorite ? 'Tersimpan di Favorit Luring' : 'Simpan ke Favorit Luring'}
          >
            <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-emerald-500 text-emerald-500' : 'text-emerald-500'}`} />
            <span>{isFavorite ? 'Tersimpan' : 'Simpan Luring'}</span>
          </button>
        </div>
      </div>

      {/* Main Immersive Dual-Card Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* LEFT: INPUT SOURCE CARD */}
        <div className="relative group flex flex-col">
          <div className="relative flex-1 flex flex-col bg-white dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800/60 rounded-3xl overflow-hidden backdrop-blur-sm shadow-sm dark:shadow-xl min-h-[300px] sm:min-h-[340px] transition-colors">
            {/* Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 bg-zinc-50/70 dark:bg-zinc-900/40 border-b border-zinc-200/80 dark:border-zinc-800/50">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-semibold text-emerald-700 dark:text-emerald-400 tracking-wider">
                  SUMBER: {isSourceArabic ? 'BAHASA ARAB (العربية)' : 'BAHASA INDONESIA'}
                </span>
              </div>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                Konteks:{' '}
                <span className="text-zinc-800 dark:text-zinc-200 font-medium capitalize">
                  {tone === 'standard'
                    ? 'Standar'
                    : tone === 'formal'
                    ? 'Resmi'
                    : tone === 'islamic'
                    ? 'Islami'
                    : 'Santai'}
                </span>
              </span>
            </div>

            {/* Input Body */}
            <div className="relative flex-1 p-4 sm:p-6 flex flex-col">
              {/* Language mismatch alert */}
              {showArabicMismatchAlert && (
                <div className="mb-4 px-3.5 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-amber-800 dark:text-amber-200 animate-in fade-in">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-amber-600 dark:text-amber-400">⚠️ Terdeteksi Bahasa Arab:</span>
                    <span>Arah saat ini adalah Indonesia ➔ Arab. Tukar agar output berupa Bahasa Indonesia.</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleSwapLanguages}
                    className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 rounded-lg text-amber-900 dark:text-amber-100 font-medium transition flex items-center justify-center gap-1.5 shrink-0 shadow-xs"
                  >
                    <ArrowLeftRight className="w-3.5 h-3.5" />
                    <span>Tukar: Arab ➔ Indonesia</span>
                  </button>
                </div>
              )}

              {showIndonesianMismatchAlert && (
                <div className="mb-4 px-3.5 py-2.5 rounded-xl bg-blue-500/10 border border-blue-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-blue-800 dark:text-blue-200 animate-in fade-in">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-blue-600 dark:text-blue-400">ℹ️ Terdeteksi Bahasa Indonesia:</span>
                    <span>Arah saat ini adalah Arab ➔ Indonesia. Tukar ke Indonesia ➔ Arab?</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleSwapLanguages}
                    className="px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/40 rounded-lg text-blue-900 dark:text-blue-100 font-medium transition flex items-center justify-center gap-1.5 shrink-0 shadow-xs"
                  >
                    <ArrowLeftRight className="w-3.5 h-3.5" />
                    <span>Tukar: Indonesia ➔ Arab</span>
                  </button>
                </div>
              )}

              <textarea
                ref={textareaRef}
                id="source-text-input"
                dir={isSourceArabic ? 'rtl' : 'ltr'}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                    e.preventDefault();
                    handleExecuteTranslation();
                  }
                }}
                placeholder={
                  isSourceArabic
                    ? 'أدخل النص العربي هنا للترجمة مع فهم السياق وقواعد النحو...'
                    : 'Ketik atau tempel teks bahasa Indonesia di sini untuk diterjemahkan ke bahasa Arab...'
                }
                className={`w-full flex-1 resize-none bg-transparent p-0 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-0 leading-relaxed ${
                  isSourceArabic
                    ? 'font-arabic text-2xl md:text-3xl text-right'
                    : 'text-base md:text-lg'
                }`}
                rows={6}
              />

              {inputText && (
                <button
                  type="button"
                  onClick={() => {
                    setInputText('');
                    setActiveResult(null);
                    onClearWorkspace();
                  }}
                  className="absolute top-4 right-4 rounded-full p-1.5 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-700 dark:hover:text-zinc-200 transition"
                  title="Hapus teks"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="px-4 sm:px-6 py-3 sm:py-4 bg-zinc-50/70 dark:bg-zinc-900/40 border-t border-zinc-200/80 dark:border-zinc-800/50 flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
                {inputText.length} / 5000
              </span>
              <button
                type="button"
                id="translate-button"
                onClick={() => handleExecuteTranslation()}
                disabled={isLoading || !inputText.trim()}
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 min-h-[44px] text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-emerald-500 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Menganalisis...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    <span>Terjemahkan</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: OUTPUT TRANSLATION CARD */}
        <div className="relative flex flex-col">
          <div className="relative flex-1 flex flex-col bg-white dark:bg-zinc-900/40 border border-emerald-500/20 dark:border-emerald-900/20 rounded-3xl overflow-hidden backdrop-blur-sm shadow-sm dark:shadow-[0_0_40px_rgba(0,0,0,0.5)] min-h-[300px] sm:min-h-[340px] transition-colors">
            {/* Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 bg-emerald-500/5 dark:bg-emerald-900/10 border-b border-emerald-500/20 dark:border-emerald-900/20">
              <span className="text-xs font-mono font-semibold text-emerald-700 dark:text-emerald-400 tracking-wider">
                HASIL: {isTargetArabic ? 'BAHASA ARAB (العربية)' : 'BAHASA INDONESIA'}
              </span>
              <div className="flex items-center gap-1.5">
                {activeResult && (
                  <>
                    <button
                      type="button"
                      onClick={handleCopyTarget}
                      className="p-2 min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 active:scale-95 transition"
                      title="Salin hasil terjemahan"
                    >
                      {copiedTarget ? (
                        <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleToggleFavorite}
                      className="p-2 min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl text-emerald-600 dark:text-emerald-500 hover:text-emerald-500 dark:hover:text-emerald-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 active:scale-95 transition"
                      title={isFavorite ? 'Hapus dari favorit' : 'Simpan ke favorit'}
                    >
                      <Bookmark className={`h-4 w-4 ${isFavorite ? 'fill-emerald-500' : ''}`} />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Content Body */}
            <div className="flex-1 p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12 space-y-3 text-zinc-400">
                  <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
                  <p className="text-xs font-medium text-zinc-600 dark:text-zinc-300">
                    Memahami konteks kalimat & kaidah tata bahasa...
                  </p>
                </div>
              ) : activeResult ? (
                <div className="space-y-4">
                  <div
                    dir={isTargetArabic ? 'rtl' : 'ltr'}
                    className={`leading-relaxed text-zinc-900 dark:text-emerald-50 ${
                      isTargetArabic
                        ? 'font-arabic text-2xl md:text-3xl text-right'
                        : 'text-lg sm:text-xl font-medium italic'
                    }`}
                  >
                    {activeResult.translatedText}
                  </div>

                  {/* Transliteration if target is Arabic */}
                  {isTargetArabic && activeResult.transliteration && (
                    <div className="text-xs italic text-zinc-500 dark:text-zinc-400 pt-1 border-t border-zinc-200 dark:border-zinc-800/40">
                      {activeResult.transliteration}
                    </div>
                  )}

                  {/* Quota / Traffic status notice badge */}
                  {activeResult.notice && (
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-amber-500/30 bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 text-xs">
                      <Sparkles className="w-3.5 h-3.5 flex-shrink-0 text-amber-500 dark:text-amber-400" />
                      <span>{activeResult.notice}</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center text-zinc-400 dark:text-zinc-500 space-y-2">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Hasil terjemahan kontekstual akan muncul di sini.
                  </p>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500">
                    Tekan <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Terjemahkan</span> atau{' '}
                    <kbd className="rounded bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/50 px-1.5 py-0.5 text-[10px] text-zinc-600 dark:text-zinc-300 font-mono">
                      Ctrl + Enter
                    </kbd>
                  </p>
                </div>
              )}

              {errorMessage && (
                <div className="mt-4 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/40 p-3 text-xs text-red-700 dark:text-red-300">
                  {errorMessage}
                </div>
              )}
            </div>

            {/* AI Semantic Analysis status bar */}
            <div className="px-6 py-4 bg-zinc-50/70 dark:bg-zinc-900/60 border-t border-zinc-200/80 dark:border-zinc-800/50 flex items-center gap-4">
              <div className="flex-1 h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    isLoading
                      ? 'w-1/2 bg-emerald-500 animate-pulse'
                      : activeResult
                      ? 'w-full bg-emerald-600'
                      : 'w-1/4 bg-zinc-400 dark:bg-zinc-700'
                  }`}
                />
              </div>
              <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 tracking-tighter uppercase whitespace-nowrap">
                {isLoading ? 'AI Analyzing Syntax...' : 'AI Semantic Analysis Complete'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Grammar & Context Analysis Component */}
      {activeResult && (
        <GrammarAnalysis
          contextSummary={activeResult.contextSummary}
          grammarNotes={activeResult.grammarNotes}
          alternatives={activeResult.alternatives}
          vocalizedArabic={activeResult.vocalizedArabic}
          transliteration={activeResult.transliteration}
          sourceLang={sourceLang}
          onSelectAlternative={handleSelectAlternative}
          onOpenDictionary={(term) => {
            setDictionaryLookupWord(term);
            setIsDictionaryOpen(true);
          }}
        />
      )}

      {/* Dictionary Modal for KSAA, Mujam, Almaany */}
      <DictionaryModal
        isOpen={isDictionaryOpen}
        onClose={() => setIsDictionaryOpen(false)}
        initialTerm={dictionaryLookupWord}
        contextWords={Array.from(
          new Set([
            ...(inputText.match(/[\u0600-\u06FF]+/g) || []),
            ...(activeResult?.vocalizedArabic?.match(/[\u0600-\u06FF]+/g) || []),
            ...(activeResult?.grammarNotes?.map((g) => g.root || g.term) || []),
          ].filter((w) => Boolean(w) && w.length > 1))
        ).slice(0, 10)}
      />
    </div>
  );
}
