import { useState, useEffect, useCallback } from 'react';
import ImmersiveSidebar from './components/ImmersiveSidebar';
import TranslationWorkspace from './components/TranslationWorkspace';
import FavoritesDrawer from './components/FavoritesDrawer';
import HistoryDrawer from './components/HistoryDrawer';
import MobileBottomNav from './components/MobileBottomNav';
import MobileMenuDrawer from './components/MobileMenuDrawer';
import { localDB } from './utils/db';
import { Language, ToneOption, TranslationRecord, TranslationResultData } from './types';
import { Bookmark, History, Wifi, Sparkles, Moon, Sun, Menu, BookOpen } from 'lucide-react';
import DictionaryModal from './components/DictionaryModal';
import { translateViaBridge, isTauriEnvironment } from './services/tauriBridge';

export default function App() {
  // Dark mode (default to true for Immersive UI aesthetic)
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme_dark_mode');
      if (saved !== null) return saved === 'true';
      return true; // Default dark mode for Immersive UI
    }
    return true;
  });

  // Online / Offline status
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  });
  const [hasApiKey, setHasApiKey] = useState<boolean>(true);

  // Data states
  const [favorites, setFavorites] = useState<TranslationRecord[]>([]);
  const [history, setHistory] = useState<TranslationRecord[]>([]);
  const [currentRecord, setCurrentRecord] = useState<TranslationRecord | null>(null);

  // Drawer states
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isGlobalDictionaryOpen, setIsGlobalDictionaryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check server health and API key status
  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.hasApiKey === 'boolean') {
          setHasApiKey(data.hasApiKey);
        }
      })
      .catch(() => {});
  }, []);

  // Apply dark mode class to html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('theme_dark_mode', String(darkMode));
    } catch {
      // ignore
    }
  }, [darkMode]);

  // Listen to network status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Initialize IndexedDB and load user data
  useEffect(() => {
    async function loadDatabase() {
      await localDB.init();

      // Only load user-saved favorites; empty array if none saved
      const favs = await localDB.getFavorites();
      setFavorites(favs);

      // Load translation history (strictly unique, deduplicated)
      const hist = await localDB.getHistory();
      setHistory(hist);
    }

    loadDatabase();
  }, []);

  // Handle translation execution
  const handleTranslate = async (
    text: string,
    sourceLang: Language,
    targetLang: Language,
    tone: ToneOption
  ): Promise<TranslationResultData | null> => {
    // 1. If Offline, try to check local database cache first
    if (!isOnline) {
      const match = await localDB.findOfflineMatch(text, sourceLang);
      if (match) {
        return {
          translatedText: match.translatedText,
          vocalizedArabic: match.vocalizedArabic || (sourceLang === 'ar' ? text : match.translatedText),
          transliteration: match.transliteration,
          contextSummary:
            (match.contextSummary || '') + ' [Diambil dari Database Lokal Luring]',
          grammarNotes: match.grammarNotes || [],
          alternatives: match.alternatives || [],
        };
      } else {
        throw new Error(
          'Anda sedang dalam Mode Luring. Terjemahan kalimat baru membutuhkan koneksi internet agar model AI dapat memproses konteks kalimat dan kaidah tata bahasa secara akurat.'
        );
      }
    }

    // 2. Process translation via Tauri Rust bridge (if running as Windows .exe) or Express API route
    const result = await translateViaBridge(text, sourceLang, targetLang, tone);

    // Check if this item is in favorites
    const isFav = favorites.some(
      (f) => f.originalText.trim().toLowerCase() === text.trim().toLowerCase()
    );

    // Save to history in IndexedDB (single unique entry, deduplicated)
    const newRecord: TranslationRecord = {
      id: `hist-${Date.now()}`,
      originalText: text,
      translatedText: result.translatedText,
      sourceLang,
      targetLang,
      tone,
      vocalizedArabic: result.vocalizedArabic,
      transliteration: result.transliteration,
      contextSummary: result.contextSummary,
      grammarNotes: result.grammarNotes,
      alternatives: result.alternatives,
      notice: result.notice,
      modelUsed: result.modelUsed,
      timestamp: Date.now(),
      isFavorite: isFav,
    };

    await localDB.saveHistory(newRecord);
    const updatedHistory = await localDB.getHistory();
    setHistory(updatedHistory);
    setCurrentRecord(newRecord);

    return result;
  };

  // Favorites actions
  const handleSaveFavorite = async (record: TranslationRecord) => {
    await localDB.saveFavorite(record);
    const updatedFavs = await localDB.getFavorites();
    setFavorites(updatedFavs);
    if (
      currentRecord &&
      currentRecord.originalText.trim().toLowerCase() === record.originalText.trim().toLowerCase()
    ) {
      setCurrentRecord({ ...currentRecord, isFavorite: true });
    }
  };

  const handleRemoveFavorite = async (idOrText: string) => {
    await localDB.removeFavorite(idOrText);
    const updatedFavs = await localDB.getFavorites();
    setFavorites(updatedFavs);
    if (
      currentRecord &&
      (currentRecord.id === idOrText ||
        currentRecord.originalText.trim().toLowerCase() === idOrText.trim().toLowerCase())
    ) {
      setCurrentRecord({ ...currentRecord, isFavorite: false });
    }
  };

  const isCurrentFavorite = Boolean(
    currentRecord &&
      favorites.some(
        (f) =>
          f.id === currentRecord.id ||
          f.originalText.trim().toLowerCase() === currentRecord.originalText.trim().toLowerCase()
      )
  );

  const isItemFavorite = useCallback(
    (id: string, originalText?: string) => {
      const clean = originalText?.trim().toLowerCase();
      return favorites.some(
        (f) => f.id === id || (clean && f.originalText.trim().toLowerCase() === clean)
      );
    },
    [favorites]
  );

  // History actions
  const handleDeleteHistoryItem = async (id: string) => {
    await localDB.deleteHistoryItem(id);
    const updatedHist = await localDB.getHistory();
    setHistory(updatedHist);
  };

  const handleClearHistory = async () => {
    await localDB.clearHistory();
    setHistory([]);
  };

  const handleSelectRecord = (record: TranslationRecord) => {
    setCurrentRecord(record);
  };

  return (
    <div className="flex h-screen w-full bg-zinc-100/80 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-300 font-sans overflow-hidden transition-colors duration-200">
      {/* Immersive Sidebar (Desktop) */}
      <ImmersiveSidebar
        isOnline={isOnline}
        history={history}
        favorites={favorites}
        onSelectRecord={handleSelectRecord}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onOpenDictionary={() => setIsGlobalDictionaryOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden relative">
        {/* Top Header Bar */}
        <header className="h-16 shrink-0 border-b border-zinc-200/80 dark:border-zinc-800/50 bg-white/80 dark:bg-zinc-900/40 backdrop-blur-xl px-4 sm:px-6 lg:px-8 flex items-center justify-between z-10 transition-colors">
          <div className="flex items-center gap-3">
            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 active:scale-95 transition"
              title="Buka Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Mobile Brand */}
            <div className="flex items-center gap-2 lg:hidden">
              <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold shadow-[0_0_12px_rgba(5,150,105,0.4)]">
                <span className="font-arabic text-sm">ض</span>
              </div>
              <span className="font-semibold text-sm text-zinc-900 dark:text-white">Tarjama Pro</span>
            </div>

            {/* Desktop Breadcrumb / System info */}
            <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-zinc-400 dark:text-zinc-500">
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">TARJAMA_PRO</span>
              <span>/</span>
              <span className="text-zinc-600 dark:text-zinc-400">NAHWU_SHARAF_ENGINE</span>
              <span>/</span>
              <span className="text-zinc-400 dark:text-zinc-600">v2.4</span>
            </div>
          </div>

          {/* Right Action Icons & Status */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Online Status Pill */}
            <div
              className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full font-mono text-[11px] border backdrop-blur-sm transition ${
                isOnline
                  ? 'border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 shadow-xs dark:shadow-[0_0_12px_rgba(16,185,129,0.15)]'
                  : 'border-amber-500/30 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isOnline
                    ? 'bg-emerald-500 dark:bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]'
                    : 'bg-amber-500 dark:bg-amber-400'
                }`}
              />
              <span className="hidden sm:inline">
                {isOnline ? 'ONLINE // AI AKTIF' : 'OFFLINE // DB LOKAL'}
              </span>
              <span className="sm:hidden text-[10px]">{isOnline ? 'ONLINE' : 'LURING'}</span>
            </div>

            {/* Quick Dictionary Button (Desktop) */}
            <button
              type="button"
              onClick={() => setIsGlobalDictionaryOpen(true)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-emerald-500/40 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-300 shadow-xs transition"
              title="Buka Rujukan Kamus & Mu'jam Otoritatif (KSAA, Mujam, Almaany)"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Kamus</span>
            </button>

            {/* Quick Favorites Button (Desktop) */}
            <button
              type="button"
              onClick={() => setIsFavoritesOpen(true)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-zinc-300 dark:hover:border-zinc-700 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white shadow-xs transition"
              title="Buka Terjemahan Favorit Luring"
            >
              <Bookmark className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Favorit</span>
              {favorites.length > 0 && (
                <span className="font-mono text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300 px-1.5 py-0.2 rounded-full font-bold">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Dark/Light Mode Toggle (Accessible on all screens) */}
            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800/60 text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700/60 transition shadow-xs active:scale-95 text-xs font-medium min-h-[36px]"
              title={darkMode ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
            >
              {darkMode ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="hidden md:inline font-medium">Mode Terang</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-zinc-600 shrink-0" />
                  <span className="hidden md:inline font-medium">Mode Gelap</span>
                </>
              )}
            </button>
          </div>
        </header>

        {/* Scrollable Translation Workspace */}
        <main className="flex-1 overflow-y-auto bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-50/60 via-zinc-100/90 to-zinc-100 dark:from-emerald-950/15 dark:via-zinc-950 dark:to-zinc-950 p-3 sm:p-6 lg:p-8 pb-28 lg:pb-12 transition-colors">
          <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
            {/* Main Translation Workspace */}
            <TranslationWorkspace
              isOnline={isOnline}
              onTranslate={handleTranslate}
              currentRecord={currentRecord}
              onSaveFavorite={handleSaveFavorite}
              onRemoveFavorite={handleRemoveFavorite}
              isFavorite={isCurrentFavorite}
              onClearWorkspace={() => setCurrentRecord(null)}
            />

            {/* Minimal Footer */}
            <footer className="pt-6 pb-2 text-center text-xs text-zinc-500 font-mono">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-zinc-200 dark:border-zinc-900 pt-4">
                <div>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    TARJAMA PRO // PENERJEMAH ARAB - INDONESIA KONTEKSTUAL & TATA BAHASA
                  </p>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-600 mt-0.5">
                    Rujukan Leksikal Resmi: dictionary.ksaa.gov.sa • mujam.org • almaany.com
                  </p>
                </div>
                <p className="text-zinc-500 dark:text-zinc-600 text-[11px]">
                  INDEXEDDB LOCAL OFFLINE PERSISTENCE READY
                </p>
              </div>
            </footer>
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (< lg screens) */}
      <MobileBottomNav
        onOpenTranslate={() => {
          const mainEl = document.querySelector('main');
          mainEl?.scrollTo({ top: 0, behavior: 'smooth' });
          const inputEl = document.getElementById('source-text-input');
          inputEl?.focus();
        }}
        onOpenDictionary={() => setIsGlobalDictionaryOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        historyCount={history.length}
        favoritesCount={favorites.length}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      {/* Mobile Slide-Out Menu Drawer */}
      <MobileMenuDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        isOnline={isOnline}
        historyCount={history.length}
        favoritesCount={favorites.length}
        onOpenDictionary={() => setIsGlobalDictionaryOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      {/* Drawers & Modals */}
      <DictionaryModal
        isOpen={isGlobalDictionaryOpen}
        onClose={() => setIsGlobalDictionaryOpen(false)}
      />

      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        onRemoveFavorite={handleRemoveFavorite}
        onSelectRecord={handleSelectRecord}
      />

      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelectRecord={handleSelectRecord}
        onDeleteHistoryItem={handleDeleteHistoryItem}
        onClearHistory={handleClearHistory}
        onToggleFavorite={(item) => {
          const inFav = favorites.find(
            (f) =>
              f.id === item.id ||
              f.originalText.trim().toLowerCase() === item.originalText.trim().toLowerCase()
          );
          if (inFav) {
            handleRemoveFavorite(inFav.id);
          } else {
            handleSaveFavorite(item);
          }
        }}
        isItemFavorite={(id, text) => isItemFavorite(id, text)}
      />
    </div>
  );
}
