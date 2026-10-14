import { useState, useEffect } from 'react';
import {
  Search,
  ExternalLink,
  BookOpen,
  X,
  Sparkles,
  ArrowUpRight,
  Bookmark,
  Layers,
  Copy,
  Check,
} from 'lucide-react';
import { DICTIONARY_SOURCES, cleanArabicTerm, openDictionarySearch } from '../utils/dictionaryLinks';

interface DictionaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTerm?: string;
  contextWords?: string[];
}

export default function DictionaryModal({
  isOpen,
  onClose,
  initialTerm = '',
  contextWords = [],
}: DictionaryModalProps) {
  const [searchTerm, setSearchTerm] = useState(initialTerm);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialTerm) {
      setSearchTerm(initialTerm);
    }
  }, [initialTerm]);

  if (!isOpen) return null;

  const cleanedSearch = cleanArabicTerm(searchTerm);

  const handleCopy = () => {
    if (!searchTerm) return;
    navigator.clipboard.writeText(searchTerm);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/60 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-t-3xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 shadow-2xl backdrop-blur-2xl flex flex-col max-h-[92vh] sm:max-h-[90vh] transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800/80 px-4 sm:px-6 py-4 sm:py-5 bg-zinc-50 dark:bg-zinc-900/40">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.25)] shrink-0">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                <span>Rujukan Kamus & Mu'jam</span>
                <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono uppercase text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 font-bold">
                  Resmi
                </span>
              </h2>
              <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400">
                KSAA, Mujam.org & Almaany untuk makna kata & akar (جذر)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 hover:text-zinc-700 dark:hover:text-white transition"
            title="Tutup dialog kamus"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 sm:space-y-6">
          {/* Search Input Bar */}
          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              KATA_ATAU_AKAR_YANG_DICARI:
            </label>
            <div className="relative flex items-center rounded-2xl border border-zinc-200 dark:border-zinc-800/90 bg-zinc-50 dark:bg-zinc-900/60 p-1.5 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 transition shadow-inner">
              <div className="pl-3 text-zinc-400">
                <Search className="h-4 w-4" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Ketik kosa kata Arab (contoh: سلام, كتب, علم)..."
                className="w-full bg-transparent px-3 py-2 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none"
                autoFocus
              />
              {searchTerm && (
                <div className="flex items-center gap-1 pr-1">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition"
                    title="Salin kata"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchTerm('')}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition"
                    title="Bersihkan"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>
            {cleanedSearch && cleanedSearch !== searchTerm && (
              <p className="text-[11px] text-zinc-500 flex items-center gap-1.5">
                <span>Pencarian bersih tanpa harakat:</span>
                <span className="font-arabic text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                  {cleanedSearch}
                </span>
              </p>
            )}
          </div>

          {/* Quick Words from Current Translation */}
          {contextWords.length > 0 && (
            <div className="space-y-2">
              <span className="text-[11px] font-mono text-zinc-500 uppercase flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                PILIH_KATA_DARI_TERJEMAHAN:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {contextWords.map((word, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSearchTerm(word)}
                    className={`rounded-xl px-3 py-1 text-xs transition border ${
                      searchTerm === word
                        ? 'bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/40 font-semibold'
                        : 'bg-zinc-100 dark:bg-zinc-900/60 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white'
                    }`}
                  >
                    <span className="font-arabic text-sm">{word}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Three Authoritative Dictionary Reference Cards */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                3_KAMUS_OTORITATIF_RUJUKAN:
              </h3>
              <span className="text-[11px] text-zinc-500">Klik untuk langsung membuka pencarian</span>
            </div>

            <div className="space-y-3">
              {DICTIONARY_SOURCES.map((source) => (
                <div
                  key={source.id}
                  className="rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/80 dark:bg-zinc-900/50 p-4 transition-all hover:border-emerald-500/40 hover:bg-white dark:hover:bg-zinc-900/80 shadow-xs"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-arabic font-bold text-base text-emerald-700 dark:text-emerald-300">
                          {source.nameAr}
                        </span>
                        <span className="rounded-md bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 text-[10px] font-mono text-zinc-600 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-700/50">
                          {source.badge}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                        {source.nameId}
                      </p>
                      <p className="text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-400">
                        {source.description}
                      </p>
                    </div>

                    <div className="flex flex-col gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => openDictionarySearch(source.id, searchTerm)}
                        className="flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-3.5 py-2 text-xs font-semibold text-white transition shadow-xs"
                      >
                        <span>Cari</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </button>

                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1 rounded-xl border border-zinc-300 dark:border-zinc-700/50 bg-white dark:bg-zinc-800/40 px-3 py-1 text-[10px] font-mono text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                      >
                        <span>Beranda</span>
                        <ExternalLink className="h-2.5 w-2.5" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lexicographical Search Tips */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800/60 bg-zinc-50/60 dark:bg-zinc-900/30 p-4 text-xs text-zinc-600 dark:text-zinc-400 space-y-1.5">
            <span className="font-mono text-[10px] uppercase text-emerald-700 dark:text-emerald-400 block font-semibold">
              TIPS_PENCARIAN_LEKSIKOGRAFI_ARAB:
            </span>
            <ul className="list-disc list-inside space-y-1 text-[11px] leading-relaxed text-zinc-600 dark:text-zinc-400">
              <li>
                <strong className="text-zinc-800 dark:text-zinc-300">Akar Kata (Jadzr / جذر):</strong> Sebagian besar kamus Arab klasik mengelompokkan kata berdasarkan akar 3-huruf (misal: mencari <span className="font-arabic text-zinc-900 dark:text-zinc-200">مَكْتَبَة</span> melalui akar <span className="font-arabic text-zinc-900 dark:text-zinc-200">ك-ت-ب</span>).
              </li>
              <li>
                <strong className="text-zinc-800 dark:text-zinc-300">KSAA & Mujam.org:</strong> Mendukung pencarian leksikal modern langsung dalam bentuk kata turunan (Isim Musytaq) maupun akar kata.
              </li>
              <li>
                <strong className="text-zinc-800 dark:text-zinc-300">Almaany.com:</strong> Menyediakan perbandingan arti perkata, contoh ayat Al-Qur'an/Hadits, serta tasrif bentuk lampau (madhi) dan sekarang (mudhari').
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800/80 px-6 py-4 bg-zinc-50 dark:bg-zinc-900/60 text-xs">
          <div className="flex items-center gap-2 text-zinc-500 font-mono text-[11px]">
            <span>domain:</span>
            <a href="https://dictionary.ksaa.gov.sa" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">ksaa.gov.sa</a>
            <span>•</span>
            <a href="https://www.mujam.org" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">mujam.org</a>
            <span>•</span>
            <a href="https://www.almaany.com" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">almaany.com</a>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-zinc-300 dark:border-zinc-700/60 bg-white dark:bg-zinc-800/80 px-4 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition shadow-xs"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
