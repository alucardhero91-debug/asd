import { useState } from 'react';
import {
  BookOpen,
  Sparkles,
  Layers,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  ArrowRight,
  ExternalLink,
  Search,
} from 'lucide-react';
import { GrammarItem, AlternativeItem } from '../types';
import { openDictionarySearch } from '../utils/dictionaryLinks';

interface GrammarAnalysisProps {
  contextSummary?: string;
  grammarNotes?: GrammarItem[];
  alternatives?: AlternativeItem[];
  vocalizedArabic?: string;
  transliteration?: string;
  sourceLang: 'ar' | 'id';
  onSelectAlternative?: (altText: string) => void;
  onOpenDictionary?: (term: string) => void;
}

export default function GrammarAnalysis({
  contextSummary,
  grammarNotes = [],
  alternatives = [],
  vocalizedArabic,
  transliteration,
  sourceLang,
  onSelectAlternative,
  onOpenDictionary,
}: GrammarAnalysisProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [copiedVocalized, setCopiedVocalized] = useState(false);

  if (!contextSummary && grammarNotes.length === 0 && alternatives.length === 0) {
    return null;
  }

  const handleCopyVocalized = () => {
    if (!vocalizedArabic) return;
    navigator.clipboard.writeText(vocalizedArabic);
    setCopiedVocalized(true);
    setTimeout(() => setCopiedVocalized(false), 2000);
  };

  return (
    <div className="mt-6 overflow-hidden rounded-3xl border border-zinc-200/90 dark:border-zinc-800/60 bg-white/95 dark:bg-zinc-900/40 backdrop-blur-sm shadow-sm dark:shadow-xl transition-colors">
      {/* Header Accordion */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 text-left border-b border-zinc-200/80 dark:border-zinc-800/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition min-h-[56px]"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,0.2)] shrink-0">
            <BookOpen className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-white flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span>Pemahaman Konteks & Tata Bahasa (Nahwu - Sharaf)</span>
              <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono uppercase text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 font-bold">
                Akurasi Tinggi
              </span>
            </h3>
            <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400">
              Analisis struktur i'rab, konteks laras bahasa, dan ragam alternatif
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-zinc-400 shrink-0 ml-2">
          <span className="text-xs font-mono hidden sm:inline text-zinc-400 dark:text-zinc-500">
            {isOpen ? 'CIUTKAN' : 'PERLUAS'}
          </span>
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
      </button>

      {isOpen && (
        <div className="p-4 sm:p-6 space-y-5 sm:space-y-6">
          {/* Vocalized Arabic & Transliteration Display */}
          {vocalizedArabic && (
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-900/60 p-5 shadow-inner">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 font-bold">
                  <Sparkles className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  TEKS_ARAB_BERHARAKAT:
                </span>
                <button
                  type="button"
                  onClick={handleCopyVocalized}
                  className="flex items-center gap-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700/50 bg-white dark:bg-zinc-800/60 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition shadow-xs"
                  title="Salin teks Arab berharakat"
                >
                  {copiedVocalized ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Salin Harakat</span>
                    </>
                  )}
                </button>
              </div>
              <p
                className="font-arabic text-2xl sm:text-3xl leading-loose text-zinc-900 dark:text-white text-right py-1"
                dir="rtl"
              >
                {vocalizedArabic}
              </p>
              {transliteration && (
                <div className="mt-3 pt-3 border-t border-zinc-200 dark:border-zinc-800/60 flex items-baseline gap-2">
                  <span className="text-[11px] font-mono text-zinc-500 uppercase">
                    Transliterasi:
                  </span>
                  <span className="text-xs italic text-zinc-700 dark:text-zinc-300">
                    {transliteration}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Context Summary */}
          {contextSummary && (
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
                KONTEKS_MAKNA_DAN_SITUASI:
              </h4>
              <p className="text-xs sm:text-sm leading-relaxed text-zinc-800 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-900/40 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800/60">
                {contextSummary}
              </p>
            </div>
          )}

          {/* Grammar Notes / Nahwu & Sharaf table */}
          {grammarNotes.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                <Layers className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                STRUKTUR_TATA_BAHASA_DAN_KOSA_KATA:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {grammarNotes.map((item, index) => {
                  const targetSearchTerm = item.root || item.term;
                  return (
                    <div
                      key={index}
                      className="flex flex-col justify-between rounded-2xl border border-zinc-200/90 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 p-4 transition hover:border-emerald-500/40 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 shadow-xs"
                    >
                      <div>
                        <div className="flex items-baseline justify-between gap-2 border-b border-zinc-200 dark:border-zinc-800/60 pb-2 mb-2">
                          <span className="font-arabic text-xl font-bold text-emerald-700 dark:text-emerald-300">
                            {item.term}
                          </span>
                          <span className="rounded-md bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/40 px-2 py-0.5 text-[10px] font-mono text-emerald-800 dark:text-emerald-300 font-medium">
                            {item.role}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-700 dark:text-zinc-200 font-medium">
                          {item.meaning}
                        </p>
                      </div>

                      <div className="mt-3 space-y-2">
                        {item.root && (
                          <div className="flex items-center justify-between text-[11px] bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800/60 px-2.5 py-1 rounded-xl">
                            <span className="text-zinc-500 font-mono text-[10px]">AKAR KATA (جذر):</span>
                            <span className="font-arabic text-emerald-700 dark:text-emerald-300 font-bold">{item.root}</span>
                          </div>
                        )}

                        {item.rootOrDetails && !item.root && (
                          <p className="text-[11px] text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800/40 p-2 rounded-xl">
                            <span className="text-zinc-500 font-mono text-[10px] block mb-0.5">KAIDAH / AKAR:</span>
                            {item.rootOrDetails}
                          </p>
                        )}

                        {/* Direct Mu'jam / Dictionary Lookup Buttons */}
                        <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800/60 flex items-center justify-between gap-1">
                          <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase">
                            RUJUKAN:
                          </span>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => openDictionarySearch('almaany', targetSearchTerm)}
                              className="rounded-lg border border-zinc-200 dark:border-zinc-700/40 bg-zinc-100/80 dark:bg-zinc-800/50 px-2 py-0.5 text-[10px] font-medium text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-300 hover:border-emerald-500/50 transition"
                              title="Buka di Almaany.com"
                            >
                              Almaany
                            </button>
                            <button
                              type="button"
                              onClick={() => openDictionarySearch('mujam', targetSearchTerm)}
                              className="rounded-lg border border-zinc-200 dark:border-zinc-700/40 bg-zinc-100/80 dark:bg-zinc-800/50 px-2 py-0.5 text-[10px] font-medium text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-300 hover:border-emerald-500/50 transition"
                              title="Buka di Mujam.org"
                            >
                              Mu'jam
                            </button>
                            <button
                              type="button"
                              onClick={() => openDictionarySearch('ksaa', targetSearchTerm)}
                              className="rounded-lg border border-zinc-200 dark:border-zinc-700/40 bg-zinc-100/80 dark:bg-zinc-800/50 px-2 py-0.5 text-[10px] font-medium text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-300 hover:border-emerald-500/50 transition"
                              title="Buka di KSAA (dictionary.ksaa.gov.sa)"
                            >
                              KSAA
                            </button>
                            {onOpenDictionary && (
                              <button
                                type="button"
                                onClick={() => onOpenDictionary(item.term)}
                                className="p-1 rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                                title="Buka panel pencarian kamus"
                              >
                                <Search className="h-3 w-3" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Alternative Translations */}
          {alternatives.length > 0 && (
            <div className="space-y-3 pt-3 border-t border-zinc-200 dark:border-zinc-800/50">
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                ALTERNATIF_TERJEMAHAN_KONTEKSTUAL:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {alternatives.map((alt, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-zinc-200/90 dark:border-zinc-800/70 bg-zinc-50/80 dark:bg-zinc-900/50 p-3.5 hover:border-emerald-500/40 transition"
                  >
                    <div className="min-w-0 flex-1">
                      <span className="inline-block rounded-md bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 text-[10px] font-mono text-zinc-700 dark:text-zinc-300 mb-1 border border-zinc-300 dark:border-zinc-700/40">
                        {alt.style}
                      </span>
                      <p className="text-xs text-zinc-800 dark:text-zinc-200 font-medium italic">
                        "{alt.translation}"
                      </p>
                    </div>
                    {onSelectAlternative && (
                      <button
                        type="button"
                        onClick={() => onSelectAlternative(alt.translation)}
                        className="flex shrink-0 items-center gap-1 rounded-xl border border-zinc-300 dark:border-zinc-700/50 bg-white dark:bg-zinc-800/80 px-3 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-200 hover:border-emerald-500/50 hover:text-emerald-600 dark:hover:text-emerald-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition shadow-xs"
                        title="Gunakan terjemahan alternatif ini"
                      >
                        Pakai <ArrowRight className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Authoritative Lexicography Reference Footer */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-950/60 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <BookOpen className="h-3.5 w-3.5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block">
                  Standar Verifikasi Mu'jam & Kamus
                </span>
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  Didasarkan pada standar leksikal KSAA (Arab Saudi), Mujam.org, dan Almaany
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <a
                href="https://dictionary.ksaa.gov.sa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-2.5 py-1 text-[11px] font-mono text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-300 hover:border-emerald-500/40 transition shadow-xs"
              >
                <span>dictionary.ksaa.gov.sa</span>
                <ExternalLink className="h-2.5 w-2.5" />
              </a>
              <a
                href="https://www.mujam.org"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-2.5 py-1 text-[11px] font-mono text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-300 hover:border-emerald-500/40 transition shadow-xs"
              >
                <span>mujam.org</span>
                <ExternalLink className="h-2.5 w-2.5" />
              </a>
              <a
                href="https://www.almaany.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-2.5 py-1 text-[11px] font-mono text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-300 hover:border-emerald-500/40 transition shadow-xs"
              >
                <span>almaany.com</span>
                <ExternalLink className="h-2.5 w-2.5" />
              </a>
              {onOpenDictionary && (
                <button
                  type="button"
                  onClick={() => onOpenDictionary('')}
                  className="flex items-center gap-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 px-3 py-1 text-[11px] font-medium text-white transition shadow-xs"
                >
                  <Search className="h-3 w-3" />
                  <span>Cari Mu'jam</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
