import { useState } from 'react';
import { Moon, Sun, Bookmark, History, Wifi, WifiOff, Globe2, Sparkles, Info } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  isOnline: boolean;
  favoritesCount: number;
  onOpenFavorites: () => void;
  onOpenHistory: () => void;
}

export default function Navbar({
  darkMode,
  onToggleDarkMode,
  isOnline,
  favoritesCount,
  onOpenFavorites,
  onOpenHistory,
}: NavbarProps) {
  const [showNetworkInfo, setShowNetworkInfo] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/90 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/90 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-sm shadow-emerald-700/20">
              <span className="font-arabic text-xl font-bold leading-none">ض</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                  Penerjemah Arab Indonesia
                </h1>
                <span className="hidden sm:inline-flex items-center rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  Kontekstual AI
                </span>
              </div>
              <p className="hidden text-xs text-zinc-500 dark:text-zinc-400 sm:block">
                Tata bahasa Nahwu-Sharaf akurat & pemahaman konteks kalimat
              </p>
            </div>
          </div>

          {/* Right Action Icons & Status */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Network Status Badge with Recommendation Popup */}
            <div className="relative">
              <button
                type="button"
                id="network-status-badge"
                onClick={() => setShowNetworkInfo(!showNetworkInfo)}
                className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-all ${
                  isOnline
                    ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 dark:hover:bg-emerald-900/50'
                    : 'bg-amber-50 text-amber-700 hover:bg-amber-100 dark:bg-amber-950/40 dark:text-amber-300 dark:hover:bg-amber-900/50'
                }`}
                title="Status jaringan dan rekomendasi"
              >
                {isOnline ? (
                  <>
                    <Wifi className="h-3.5 w-3.5" />
                    <span className="hidden md:inline">Mode Daring (Disarankan)</span>
                    <span className="md:hidden">Daring</span>
                  </>
                ) : (
                  <>
                    <WifiOff className="h-3.5 w-3.5" />
                    <span className="hidden md:inline">Mode Luring</span>
                    <span className="md:hidden">Luring</span>
                  </>
                )}
                <Info className="h-3 w-3 opacity-60 ml-0.5" />
              </button>

              {showNetworkInfo && (
                <div className="absolute right-0 mt-2 w-80 rounded-xl border border-zinc-200 bg-white p-4 shadow-xl dark:border-zinc-800 dark:bg-zinc-900 z-50 animate-in fade-in zoom-in-95">
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 rounded-full p-1.5 ${
                        isOnline ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300'
                      }`}
                    >
                      {isOnline ? <Sparkles className="h-4 w-4" /> : <Globe2 className="h-4 w-4" />}
                    </div>
                    <div className="text-xs">
                      <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                        {isOnline ? 'Koneksi Daring Aktif' : 'Sedang Dalam Mode Luring'}
                      </p>
                      <p className="mt-1 text-zinc-600 dark:text-zinc-300 leading-relaxed">
                        {isOnline
                          ? 'Aplikasi terhubung online ke model kecerdasan buatan untuk analisis konteks kalimat, harakat/tasykil akurat, dan tata bahasa Nahwu-Sharaf terkini.'
                          : 'Dalam mode luring, Anda dapat membuka seluruh koleksi Favorit dan Riwayat di database lokal. Hubungkan ke internet untuk terjemahan kontekstual kalimat baru.'}
                      </p>
                      <p className="mt-2 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                        💡 Rekomendasi: Tetap online untuk akurasi maksimal dan pembaruan kosa kata.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowNetworkInfo(false)}
                    className="mt-3 w-full rounded-lg bg-zinc-100 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                  >
                    Tutup
                  </button>
                </div>
              )}
            </div>

            {/* Favorites (Local Database) Button */}
            <button
              type="button"
              id="open-favorites-btn"
              onClick={onOpenFavorites}
              className="relative flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800 transition"
              title="Buka Favorit (Database Lokal Luring)"
            >
              <Bookmark className="h-4 w-4 text-amber-500 fill-amber-500/20" />
              <span className="hidden sm:inline">Favorit</span>
              {favoritesCount > 0 && (
                <span className="ml-1 rounded-full bg-amber-500/15 px-1.5 py-0.2 text-[11px] font-bold text-amber-600 dark:text-amber-400">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* History Button */}
            <button
              type="button"
              id="open-history-btn"
              onClick={onOpenHistory}
              className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800 transition"
              title="Buka Riwayat Terjemahan Cepat"
            >
              <History className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
              <span className="hidden sm:inline">Riwayat</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              type="button"
              id="theme-toggle-btn"
              onClick={onToggleDarkMode}
              className="rounded-lg p-2 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 transition"
              title={darkMode ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-zinc-600" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
