import React from 'react';
import {
  Languages,
  BookOpen,
  History,
  Bookmark,
  Sun,
  Moon,
} from 'lucide-react';

interface MobileBottomNavProps {
  onOpenTranslate: () => void;
  onOpenDictionary: () => void;
  onOpenHistory: () => void;
  onOpenFavorites: () => void;
  historyCount: number;
  favoritesCount: number;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function MobileBottomNav({
  onOpenTranslate,
  onOpenDictionary,
  onOpenHistory,
  onOpenFavorites,
  historyCount,
  favoritesCount,
  darkMode,
  onToggleDarkMode,
}: MobileBottomNavProps) {
  return (
    <nav
      aria-label="Navigasi Bawah Seluler"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/95 dark:bg-zinc-950/95 border-t border-zinc-800/80 backdrop-blur-xl px-2 py-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-4px_24px_rgba(0,0,0,0.5)] transition-all"
    >
      <div className="grid grid-cols-5 items-center justify-around max-w-md mx-auto">
        {/* Terjemah */}
        <button
          type="button"
          onClick={onOpenTranslate}
          className="flex flex-col items-center justify-center min-h-[48px] py-1 text-emerald-400 active:scale-95 transition-transform"
          title="Ke Layar Terjemahan"
        >
          <Languages className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-medium tracking-tight">Terjemah</span>
        </button>

        {/* Kamus */}
        <button
          type="button"
          onClick={onOpenDictionary}
          className="flex flex-col items-center justify-center min-h-[48px] py-1 text-zinc-400 hover:text-emerald-300 active:scale-95 transition-all"
          title="Buka Kamus & Mu'jam"
        >
          <BookOpen className="w-5 h-5 mb-0.5 text-zinc-300" />
          <span className="text-[10px] font-medium tracking-tight">Kamus</span>
        </button>

        {/* Riwayat */}
        <button
          type="button"
          onClick={onOpenHistory}
          className="relative flex flex-col items-center justify-center min-h-[48px] py-1 text-zinc-400 hover:text-white active:scale-95 transition-all"
          title="Buka Riwayat Terjemahan"
        >
          <div className="relative">
            <History className="w-5 h-5 mb-0.5" />
            {historyCount > 0 && (
              <span className="absolute -top-1.5 -right-2 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-zinc-700 text-zinc-200 text-[9px] font-mono font-bold">
                {historyCount > 99 ? '99+' : historyCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium tracking-tight">Riwayat</span>
        </button>

        {/* Favorit */}
        <button
          type="button"
          onClick={onOpenFavorites}
          className="relative flex flex-col items-center justify-center min-h-[48px] py-1 text-zinc-400 hover:text-emerald-300 active:scale-95 transition-all"
          title="Buka Favorit Luring"
        >
          <div className="relative">
            <Bookmark className="w-5 h-5 mb-0.5 text-amber-400/90" />
            {favoritesCount > 0 && (
              <span className="absolute -top-1.5 -right-2 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-emerald-500 text-zinc-950 text-[9px] font-mono font-bold">
                {favoritesCount > 99 ? '99+' : favoritesCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium tracking-tight">Favorit</span>
        </button>

        {/* Tema / Mode Gelap */}
        <button
          type="button"
          onClick={onToggleDarkMode}
          className="flex flex-col items-center justify-center min-h-[48px] py-1 text-zinc-400 hover:text-white active:scale-95 transition-all"
          title={darkMode ? 'Ubah ke Mode Terang' : 'Ubah ke Mode Gelap'}
        >
          {darkMode ? (
            <Sun className="w-5 h-5 mb-0.5 text-amber-400" />
          ) : (
            <Moon className="w-5 h-5 mb-0.5 text-zinc-300" />
          )}
          <span className="text-[10px] font-medium tracking-tight">
            {darkMode ? 'Terang' : 'Gelap'}
          </span>
        </button>
      </div>
    </nav>
  );
}
