import React from 'react';
import {
  X,
  BookOpen,
  History,
  Bookmark,
  ExternalLink,
  ShieldCheck,
  HardDrive,
  Sun,
  Moon,
  Info,
} from 'lucide-react';

interface MobileMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isOnline: boolean;
  historyCount: number;
  favoritesCount: number;
  onOpenDictionary: () => void;
  onOpenHistory: () => void;
  onOpenFavorites: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function MobileMenuDrawer({
  isOpen,
  onClose,
  isOnline,
  historyCount,
  favoritesCount,
  onOpenDictionary,
  onOpenHistory,
  onOpenFavorites,
  darkMode,
  onToggleDarkMode,
}: MobileMenuDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-start bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="flex h-full w-4/5 max-w-xs flex-col bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800/80 shadow-2xl animate-in slide-in-from-left duration-200 text-zinc-800 dark:text-zinc-200 transition-colors">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-200 dark:border-zinc-800/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(5,150,105,0.4)]">
              <span className="font-arabic text-base">ض</span>
            </div>
            <div>
              <h2 className="text-sm font-bold text-zinc-900 dark:text-white tracking-tight">Tarjama Pro</h2>
              <p className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">NAHWU & SHARAF ENGINE</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
            title="Tutup Menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Status badge */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-900/50 p-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-500 dark:text-zinc-400">Status Koneksi</span>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold ${
                  isOnline
                    ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20'
                    : 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isOnline ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                />
                {isOnline ? 'ONLINE' : 'LURING'}
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 px-2">
              Navigasi Cepat
            </span>

            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenDictionary();
              }}
              className="w-full flex items-center justify-between p-3 min-h-[44px] rounded-xl bg-zinc-100/80 dark:bg-zinc-900/40 hover:bg-zinc-200/80 dark:hover:bg-zinc-850 hover:text-emerald-700 dark:hover:text-emerald-300 text-xs font-medium transition"
            >
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-zinc-800 dark:text-zinc-200">Kamus & Mu'jam Otoritatif</span>
              </div>
              <span className="text-[10px] font-mono bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 rounded text-zinc-600 dark:text-zinc-400">
                Resmi
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenHistory();
              }}
              className="w-full flex items-center justify-between p-3 min-h-[44px] rounded-xl bg-zinc-100/80 dark:bg-zinc-900/40 hover:bg-zinc-200/80 dark:hover:bg-zinc-850 hover:text-zinc-900 dark:hover:text-white text-xs font-medium transition"
            >
              <div className="flex items-center gap-2.5">
                <History className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                <span className="text-zinc-800 dark:text-zinc-200">Riwayat Terjemahan</span>
              </div>
              {historyCount > 0 && (
                <span className="text-[10px] font-mono bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 rounded text-zinc-700 dark:text-zinc-300">
                  {historyCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenFavorites();
              }}
              className="w-full flex items-center justify-between p-3 min-h-[44px] rounded-xl bg-zinc-100/80 dark:bg-zinc-900/40 hover:bg-zinc-200/80 dark:hover:bg-zinc-850 hover:text-zinc-900 dark:hover:text-white text-xs font-medium transition"
            >
              <div className="flex items-center gap-2.5">
                <Bookmark className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                <span className="text-zinc-800 dark:text-zinc-200">Favorit Luring</span>
              </div>
              {favoritesCount > 0 && (
                <span className="text-[10px] font-mono bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded font-semibold">
                  {favoritesCount}
                </span>
              )}
            </button>
          </div>

          {/* Lexical Reference Links */}
          <div className="space-y-2 pt-2 border-t border-zinc-200 dark:border-zinc-800/80">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 px-2">
              Kamus Luar Otoritatif
            </span>
            <div className="space-y-1">
              <a
                href="https://dictionary.ksaa.gov.sa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
              >
                <span>Kamus Kontemporer KSAA</span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
              </a>
              <a
                href="https://www.mujam.org"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
              >
                <span>Mu'jam al-Dauhah</span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
              </a>
              <a
                href="https://www.almaany.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
              >
                <span>Kamus Almaany</span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-900/40">
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="w-full flex items-center justify-between p-3 min-h-[44px] rounded-xl bg-zinc-200/70 dark:bg-zinc-800/60 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-xs font-medium text-zinc-800 dark:text-zinc-200 transition"
          >
            <div className="flex items-center gap-2">
              {darkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-zinc-600" />}
              <span>{darkMode ? 'Mode Terang' : 'Mode Gelap'}</span>
            </div>
            <span className="text-[10px] font-mono text-zinc-500">Toggle</span>
          </button>
        </div>
      </div>
    </div>
  );
}
