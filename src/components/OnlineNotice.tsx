import { useState } from 'react';
import { Wifi, Sparkles, X, Database } from 'lucide-react';

interface OnlineNoticeProps {
  isOnline: boolean;
  favoritesCount: number;
  onOpenFavorites: () => void;
  hasApiKey?: boolean;
}

export default function OnlineNotice({ isOnline, favoritesCount, onOpenFavorites, hasApiKey = true }: OnlineNoticeProps) {
  const [dismissed, setDismissed] = useState(false);

  // Sembunyikan banner peringatan jika sedang daring dan sudah memiliki API key
  if (dismissed || (isOnline && hasApiKey)) return null;

  return (
    <div className="pt-2">
      <div
        className={`relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-2xl border px-5 py-3 text-xs sm:text-sm backdrop-blur-sm transition shadow-lg ${
          isOnline
            ? 'border-emerald-900/40 bg-zinc-900/60 text-zinc-300 shadow-[0_0_20px_rgba(5,150,105,0.08)]'
            : 'border-amber-900/40 bg-zinc-900/60 text-zinc-300 shadow-[0_0_20px_rgba(217,119,6,0.08)]'
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
              isOnline
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_8px_rgba(16,185,129,0.3)]'
                : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
            }`}
          >
            {isOnline ? <Sparkles className="h-4 w-4" /> : <Wifi className="h-4 w-4" />}
          </div>
          <div>
            <span className="font-semibold text-white">
              {isOnline ? 'Perhatian:' : 'Mode Luring Aktif:'}
            </span>{' '}
            <span className="text-zinc-400">
              {isOnline
                ? 'Mesin leksikon kontekstual bawaan sedang digunakan. Tambahkan GEMINI_API_KEY di menu Settings untuk mengaktifkan pemrosesan AI.'
                : 'Koneksi internet terputus. Anda tetap dapat membuka dan mencari seluruh data terjemahan favorit di database lokal tanpa kuota.'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          {!isOnline && favoritesCount > 0 && (
            <button
              type="button"
              onClick={onOpenFavorites}
              className="flex items-center gap-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 text-xs font-medium text-amber-300 hover:bg-amber-500/20 transition"
            >
              <Database className="h-3.5 w-3.5" />
              Buka Database Lokal ({favoritesCount})
            </button>
          )}
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="rounded-xl p-2 min-h-[40px] min-w-[40px] flex items-center justify-center text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition"
            title="Tutup pemberitahuan"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
