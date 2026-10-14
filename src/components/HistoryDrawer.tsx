import { useState } from 'react';
import { X, History, Trash2, ArrowUpRight, Bookmark, Search } from 'lucide-react';
import { TranslationRecord } from '../types';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: TranslationRecord[];
  onSelectRecord: (record: TranslationRecord) => void;
  onDeleteHistoryItem: (id: string) => void;
  onClearHistory: () => void;
  onToggleFavorite: (record: TranslationRecord) => void;
  isItemFavorite: (id: string, originalText?: string) => boolean;
}

export default function HistoryDrawer({
  isOpen,
  onClose,
  history,
  onSelectRecord,
  onDeleteHistoryItem,
  onClearHistory,
  onToggleFavorite,
  isItemFavorite,
}: HistoryDrawerProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHistory = history.filter((item) => {
    return (
      item.originalText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.translatedText.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const formatTime = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    if (diff < 60000) return 'Baru saja';
    if (diff < 3600000) return `${Math.floor(diff / 60000)} menit lalu`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)} jam lalu`;
    return new Date(timestamp).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div className="flex h-full w-full max-w-md flex-col bg-white shadow-2xl dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4 dark:border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
              <History className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                Riwayat Terjemahan
              </h2>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                Akses cepat kalimat yang baru saja diterjemahkan
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 transition"
            title="Tutup riwayat"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search */}
        <div className="border-b border-zinc-100 bg-zinc-50/70 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Cari riwayat terjemahan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-white py-2 pl-9 pr-4 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-emerald-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
            />
          </div>
        </div>

        {/* List of History */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredHistory.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center text-zinc-400">
              <History className="h-10 w-10 stroke-1 text-zinc-300 dark:text-zinc-600 mb-3" />
              <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                {searchQuery ? 'Tidak ada hasil pencarian riwayat' : 'Belum ada riwayat terjemahan'}
              </p>
              <p className="mt-1 text-xs text-zinc-400 max-w-xs">
                Setiap kalimat yang Anda terjemahkan akan otomatis tercatat di sini untuk akses cepat.
              </p>
            </div>
          ) : (
            filteredHistory.map((item) => {
              const favorite = isItemFavorite(item.id, item.originalText);
              return (
                <div
                  key={item.id}
                  className="group rounded-xl border border-zinc-200 bg-white p-3.5 dark:border-zinc-800 dark:bg-zinc-800/60 shadow-xs hover:border-emerald-300 dark:hover:border-emerald-700 transition"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="rounded bg-zinc-100 px-2 py-0.5 text-[10px] font-bold uppercase text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                      {item.sourceLang === 'ar' ? 'Arab → Indo' : 'Indo → Arab'}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] text-zinc-400">{formatTime(item.timestamp)}</span>
                      <button
                        type="button"
                        onClick={() => onToggleFavorite(item)}
                        className="rounded p-1 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-400 transition"
                        title={favorite ? 'Hapus dari favorit' : 'Simpan ke favorit lokal'}
                      >
                        <Bookmark
                          className={`h-3.5 w-3.5 ${
                            favorite
                              ? 'text-amber-500 fill-amber-500'
                              : 'text-zinc-400 hover:text-amber-500'
                          }`}
                        />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteHistoryItem(item.id)}
                        className="rounded p-1 text-zinc-400 hover:text-red-500 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition"
                        title="Hapus riwayat ini"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  <p
                    className="font-arabic text-lg text-zinc-900 dark:text-zinc-100 line-clamp-2"
                    dir="rtl"
                  >
                    {item.vocalizedArabic || item.originalText}
                  </p>
                  <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-300 line-clamp-2 font-medium">
                    {item.translatedText}
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
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
              );
            })
          )}
        </div>

        {/* Footer Actions */}
        {history.length > 0 && (
          <div className="border-t border-zinc-200 p-4 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/60">
            <button
              type="button"
              onClick={onClearHistory}
              className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-red-200 bg-red-50/50 py-2 text-xs font-semibold text-red-700 hover:bg-red-100 dark:border-red-950 dark:bg-red-950/20 dark:text-red-300 dark:hover:bg-red-950/50 transition"
            >
              <Trash2 className="h-3.5 w-3.5" /> Bersihkan Semua Riwayat
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
