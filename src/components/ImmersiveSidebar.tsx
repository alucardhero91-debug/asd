import { TranslationRecord } from '../types';
import { Bookmark, History, Wifi, WifiOff, Sparkles, ChevronRight, Moon, Sun, BookOpen, ExternalLink, Monitor } from 'lucide-react';
import { isTauriEnvironment } from '../services/tauriBridge';

interface ImmersiveSidebarProps {
  isOnline: boolean;
  history: TranslationRecord[];
  favorites: TranslationRecord[];
  onSelectRecord: (record: TranslationRecord) => void;
  onOpenHistory: () => void;
  onOpenFavorites: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenDictionary?: () => void;
}

export default function ImmersiveSidebar({
  isOnline,
  history,
  favorites,
  onSelectRecord,
  onOpenHistory,
  onOpenFavorites,
  darkMode,
  onToggleDarkMode,
  onOpenDictionary,
}: ImmersiveSidebarProps) {
  // Format relative timestamp
  const formatTimeAgo = (timestamp: number) => {
    const diffSeconds = Math.floor((Date.now() - timestamp) / 1000);
    if (diffSeconds < 60) return 'Baru saja';
    const diffMinutes = Math.floor(diffSeconds / 60);
    if (diffMinutes < 60) return `${diffMinutes} menit yang lalu`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours} jam yang lalu`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} hari yang lalu`;
  };

  return (
    <aside className="w-72 hidden lg:flex flex-col shrink-0 border-r border-zinc-200/80 dark:border-zinc-800/50 bg-white/70 dark:bg-zinc-900/30 backdrop-blur-xl select-none z-20 transition-colors">
      {/* Brand Header */}
      <div className="p-6 border-b border-zinc-200/80 dark:border-zinc-800/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(5,150,105,0.4)]">
              <span className="font-arabic text-base">ض</span>
            </div>
            <div>
              <h1 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-white flex items-center gap-1.5">
                Tarjama Pro
                <span className="text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.2 rounded border border-emerald-500/20">
                  {isTauriEnvironment() ? 'Rust .exe' : 'AI'}
                </span>
              </h1>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                {isTauriEnvironment() ? 'Desktop Windows Edition' : 'Arab - Indonesia Kontekstual'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onToggleDarkMode}
            className="p-1.5 rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition"
            title={darkMode ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-600" />}
          </button>
        </div>
      </div>

      {/* Main Navigation Scroll Area */}
      <div className="flex-1 overflow-y-auto py-4 space-y-6">
        {/* Riwayat Terjemahan Section */}
        <div className="px-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
              <History className="w-3.5 h-3.5 text-zinc-400" />
              Riwayat Terjemahan
            </h2>
            {history.length > 0 && (
              <button
                type="button"
                onClick={onOpenHistory}
                className="text-[11px] text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300 transition flex items-center gap-0.5"
              >
                Semua
                <ChevronRight className="w-3 h-3" />
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <p className="text-xs text-zinc-500 italic py-2">Belum ada riwayat aktivitas.</p>
          ) : (
            <div className="space-y-2">
              {history.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectRecord(item)}
                  className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-700/30 hover:border-emerald-500/50 hover:bg-zinc-100 dark:hover:bg-zinc-800/70 transition-all cursor-pointer group"
                >
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mb-1 flex items-center justify-between">
                    <span>{formatTimeAgo(item.timestamp)}</span>
                    <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">
                      {item.sourceLang.toUpperCase()} → {item.targetLang.toUpperCase()}
                    </span>
                  </p>
                  <p
                    className={`text-xs text-zinc-800 dark:text-zinc-200 truncate group-hover:text-zinc-900 dark:group-hover:text-white transition ${
                      item.sourceLang === 'ar' ? 'font-arabic text-sm text-right' : ''
                    }`}
                  >
                    {item.originalText}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Favorit (Offline) Section */}
        <div className="px-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
              <Bookmark className="w-3.5 h-3.5 text-emerald-500" />
              Favorit (Offline)
            </h2>
            {favorites.length > 0 && (
              <button
                type="button"
                onClick={onOpenFavorites}
                className="text-[11px] text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300 transition flex items-center gap-0.5"
              >
                Lihat ({favorites.length})
                <ChevronRight className="w-3 h-3" />
              </button>
            )}
          </div>

          {favorites.length === 0 ? (
            <p className="text-xs text-zinc-500 italic py-2">Belum ada favorit tersimpan.</p>
          ) : (
            <div className="space-y-2">
              {favorites.slice(0, 4).map((fav) => (
                <div
                  key={fav.id}
                  onClick={() => onSelectRecord(fav)}
                  className="flex items-center justify-between p-3 rounded-xl bg-zinc-50/70 dark:bg-zinc-800/20 border border-zinc-200/80 dark:border-zinc-700/20 hover:border-emerald-500/40 hover:bg-zinc-100 dark:hover:bg-zinc-800/40 transition-all cursor-pointer group"
                >
                  <span
                    className={`text-xs text-zinc-700 dark:text-zinc-300 truncate pr-2 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 ${
                      fav.sourceLang === 'ar' ? 'font-arabic text-sm' : ''
                    }`}
                  >
                    {fav.originalText}
                  </span>
                  <div
                    className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] shrink-0"
                    title="Siap Luring"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Rujukan Mu'jam & Kamus Otoritatif Section */}
        <div className="px-5 pt-1">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Kamus & Mu'jam
            </h2>
            {onOpenDictionary && (
              <button
                type="button"
                onClick={onOpenDictionary}
                className="text-[11px] text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300 transition"
              >
                Cari Kata
              </button>
            )}
          </div>

          <div className="space-y-1.5">
            <a
              href="https://dictionary.ksaa.gov.sa"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-50/80 dark:bg-zinc-800/20 border border-zinc-200/80 dark:border-zinc-800/60 hover:border-emerald-500/40 hover:bg-zinc-100 dark:hover:bg-zinc-800/40 transition group"
            >
              <div className="min-w-0 pr-1">
                <span className="font-arabic text-xs font-semibold text-emerald-700 dark:text-emerald-300 block truncate">
                  معجم مجمع الملك سلمان
                </span>
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block truncate">
                  dictionary.ksaa.gov.sa
                </span>
              </div>
              <ExternalLink className="w-3 h-3 text-zinc-400 dark:text-zinc-500 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 shrink-0 transition" />
            </a>

            <a
              href="https://www.mujam.org"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-50/80 dark:bg-zinc-800/20 border border-zinc-200/80 dark:border-zinc-800/60 hover:border-emerald-500/40 hover:bg-zinc-100 dark:hover:bg-zinc-800/40 transition group"
            >
              <div className="min-w-0 pr-1">
                <span className="font-arabic text-xs font-semibold text-emerald-700 dark:text-emerald-300 block truncate">
                  معجم اللغة العربية المعاصرة
                </span>
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block truncate">
                  mujam.org
                </span>
              </div>
              <ExternalLink className="w-3 h-3 text-zinc-400 dark:text-zinc-500 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 shrink-0 transition" />
            </a>

            <a
              href="https://www.almaany.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-50/80 dark:bg-zinc-800/20 border border-zinc-200/80 dark:border-zinc-800/60 hover:border-emerald-500/40 hover:bg-zinc-100 dark:hover:bg-zinc-800/40 transition group"
            >
              <div className="min-w-0 pr-1">
                <span className="font-arabic text-xs font-semibold text-emerald-700 dark:text-emerald-300 block truncate">
                  قاموس المعاني لكل رسم
                </span>
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block truncate">
                  almaany.com
                </span>
              </div>
              <ExternalLink className="w-3 h-3 text-zinc-400 dark:text-zinc-500 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 shrink-0 transition" />
            </a>
          </div>
        </div>
      </div>

      {/* Sidebar Footer Status Indicator */}
      <div className="p-5 mt-auto border-t border-zinc-200/80 dark:border-zinc-800/50 bg-zinc-50 dark:bg-zinc-900/50">
        <div className="flex items-center gap-3 text-xs">
          <div
            className={`p-2 rounded font-mono text-[11px] font-bold tracking-wider ${
              isOnline
                ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20'
                : 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20'
            }`}
          >
            {isOnline ? 'ONLINE' : 'OFFLINE'}
          </div>
          <div className="leading-tight">
            <span className="text-zinc-800 dark:text-zinc-300 font-medium block">
              {isOnline ? 'Akurasi Konteks Maksimal' : 'Akses Database Lokal'}
            </span>
            <span className="text-zinc-500 dark:text-zinc-500 text-[11px] italic">
              {isOnline ? 'Tata Bahasa & I\'rab AI' : 'Tersimpan di IndexedDB'}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
