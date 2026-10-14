import { useState, useMemo } from 'react';
import { X, Search, Bookmark, Trash2, Copy, Check, Download, ArrowUpRight, HardDrive, Filter } from 'lucide-react';
import { TranslationRecord } from '../types';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: TranslationRecord[];
  onRemoveFavorite: (id: string) => void;
  onSelectRecord: (record: TranslationRecord) => void;
}

export default function FavoritesDrawer({
  isOpen,
  onClose,
  favorites,
  onRemoveFavorite,
  onSelectRecord,
}: FavoritesDrawerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    favorites.forEach((f) => {
      f.tags?.forEach((t) => tags.add(t));
    });
    return Array.from(tags);
  }, [favorites]);

  // Filter favorites
  const filteredFavorites = useMemo(() => {
    return favorites.filter((item) => {
      const matchesSearch =
        item.originalText.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.translatedText.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.vocalizedArabic && item.vocalizedArabic.includes(searchQuery)) ||
        (item.contextSummary && item.contextSummary.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTag =
        selectedTag === 'all' || (item.tags && item.tags.includes(selectedTag));

      return matchesSearch && matchesTag;
    });
  }, [favorites, searchQuery, selectedTag]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(favorites, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `terjemahan-favorit-arab-indo-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div className="flex h-full w-full max-w-md flex-col bg-white shadow-2xl dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4 dark:border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
              <Bookmark className="h-4 w-4 fill-current" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                Terjemahan Favorit
              </h2>
              <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-400">
                <HardDrive className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                <span>Database Lokal (Tersedia Akses Luring)</span>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 transition"
            title="Tutup favorit"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="border-b border-zinc-100 bg-zinc-50/70 p-4 dark:border-zinc-800 dark:bg-zinc-900/50 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Cari favorit (Arab atau Indonesia)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-white py-2 pl-9 pr-4 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-emerald-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
            />
          </div>

          {/* Tags */}
          {allTags.length > 0 && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <span className="text-[11px] text-zinc-400 flex items-center gap-1">
                <Filter className="h-3 w-3" />
              </span>
              <button
                type="button"
                onClick={() => setSelectedTag('all')}
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium transition ${
                  selectedTag === 'all'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-zinc-200/80 text-zinc-700 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-300'
                }`}
              >
                Semua ({favorites.length})
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(tag)}
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap transition ${
                    selectedTag === tag
                      ? 'bg-emerald-600 text-white'
                      : 'bg-zinc-200/80 text-zinc-700 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-300'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* List of Favorites */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredFavorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center text-zinc-400">
              <Bookmark className="h-10 w-10 stroke-1 text-zinc-300 dark:text-zinc-600 mb-3" />
              <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                {searchQuery ? 'Tidak ada hasil pencarian' : 'Belum ada favorit tersimpan'}
              </p>
              <p className="mt-1 text-xs text-zinc-400 max-w-xs">
                Klik ikon bintang pada hasil terjemahan untuk menyimpannya ke database lokal agar bisa diakses kapan saja secara luring.
              </p>
            </div>
          ) : (
            filteredFavorites.map((item) => (
              <div
                key={item.id}
                className="group relative rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-800/60 shadow-xs hover:border-emerald-300 dark:hover:border-emerald-700 transition"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      {item.sourceLang === 'ar' ? 'Arab → Indo' : 'Indo → Arab'}
                    </span>
                    {item.tags?.map((t) => (
                      <span
                        key={t}
                        className="rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleCopy(item.translatedText, item.id)}
                      className="rounded p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                      title="Salin terjemahan"
                    >
                      {copiedId === item.id ? (
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemoveFavorite(item.id)}
                      className="rounded p-1 text-zinc-400 hover:text-red-600 dark:hover:text-red-400"
                      title="Hapus dari favorit"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Arabic Vocalized or Original */}
                <p
                  className="font-arabic text-xl text-zinc-900 dark:text-zinc-100 leading-relaxed"
                  dir="rtl"
                >
                  {item.vocalizedArabic || item.originalText}
                </p>

                {/* Translated Text */}
                <p className="mt-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  {item.translatedText}
                </p>

                {/* Context or Transliteration Note */}
                {item.contextSummary && (
                  <p className="mt-1.5 text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2">
                    {item.contextSummary}
                  </p>
                )}

                {/* Re-load into editor button */}
                <div className="mt-3 pt-2 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectRecord(item);
                      onClose();
                    }}
                    className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                  >
                    Buka di Editor <ArrowUpRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        {favorites.length > 0 && (
          <div className="border-t border-zinc-200 p-4 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/60">
            <button
              type="button"
              onClick={handleExportJSON}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 transition"
            >
              <Download className="h-4 w-4" /> Ekspor Koleksi Favorit (JSON Luring)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
