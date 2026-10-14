import { TranslationRecord } from '../types';

const DB_NAME = 'ArabicIndoTranslator_DB';
const DB_VERSION = 1;
const STORE_FAVORITES = 'favorites';
const STORE_HISTORY = 'history';

// Fallback memory/localStorage keys
const LS_FAV_KEY = 'ar_id_trans_favorites_v1';
const LS_HIST_KEY = 'ar_id_trans_history_v1';

class LocalDatabase {
  private db: IDBDatabase | null = null;
  private isIndexedDBAvailable: boolean = typeof window !== 'undefined' && 'indexedDB' in window;

  public async init(): Promise<boolean> {
    if (!this.isIndexedDBAvailable) return false;

    return new Promise((resolve) => {
      try {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
          const db = (event.target as IDBOpenDBRequest).result;
          if (!db.objectStoreNames.contains(STORE_FAVORITES)) {
            const favStore = db.createObjectStore(STORE_FAVORITES, { keyPath: 'id' });
            favStore.createIndex('timestamp', 'timestamp', { unique: false });
            favStore.createIndex('originalText', 'originalText', { unique: false });
          }
          if (!db.objectStoreNames.contains(STORE_HISTORY)) {
            const histStore = db.createObjectStore(STORE_HISTORY, { keyPath: 'id' });
            histStore.createIndex('timestamp', 'timestamp', { unique: false });
          }
        };

        request.onsuccess = (event) => {
          this.db = (event.target as IDBOpenDBRequest).result;
          resolve(true);
        };

        request.onerror = () => {
          console.warn('IndexedDB failed to open, falling back to LocalStorage');
          resolve(false);
        };
      } catch (err) {
        console.warn('IndexedDB error during initialization:', err);
        resolve(false);
      }
    });
  }

  // Helper to normalize text for deduplication
  private normalizeKey(sourceLang: string, targetLang: string, text: string): string {
    return `${sourceLang}_${targetLang}_${text.trim().toLowerCase()}`;
  }

  // --- FAVORITES (Offline Local Database) ---
  public async getFavorites(): Promise<TranslationRecord[]> {
    let records: TranslationRecord[] = [];

    if (!this.db) {
      records = this.getFavoritesFromLocalStorage();
    } else {
      records = await new Promise((resolve) => {
        try {
          const tx = this.db!.transaction(STORE_FAVORITES, 'readonly');
          const store = tx.objectStore(STORE_FAVORITES);
          const request = store.getAll();

          request.onsuccess = () => {
            const list: TranslationRecord[] = request.result || [];
            list.sort((a, b) => b.timestamp - a.timestamp);
            resolve(list);
          };

          request.onerror = () => {
            resolve(this.getFavoritesFromLocalStorage());
          };
        } catch {
          resolve(this.getFavoritesFromLocalStorage());
        }
      });
    }

    // Strictly filter out any previous seed data (e.g. 'seed-1', 'seed-2')
    const userOnlyFavorites = records.filter((r) => !r.id.startsWith('seed-'));

    // If there were seed entries stored previously, purge them permanently
    if (records.length !== userOnlyFavorites.length) {
      this.purgeSeedFavorites(records);
    }

    // Deduplicate favorites so each phrase exists only once
    const seen = new Set<string>();
    const uniqueFavorites: TranslationRecord[] = [];
    for (const fav of userOnlyFavorites) {
      const key = this.normalizeKey(fav.sourceLang, fav.targetLang, fav.originalText);
      if (!seen.has(key)) {
        seen.add(key);
        uniqueFavorites.push(fav);
      }
    }

    return uniqueFavorites;
  }

  private async purgeSeedFavorites(allRecords: TranslationRecord[]): Promise<void> {
    const seedIds = allRecords.filter((r) => r.id.startsWith('seed-')).map((r) => r.id);
    if (seedIds.length === 0) return;

    // Remove from localStorage
    try {
      const lsFavs = this.getFavoritesFromLocalStorage().filter((r) => !r.id.startsWith('seed-'));
      localStorage.setItem(LS_FAV_KEY, JSON.stringify(lsFavs));
    } catch {}

    // Remove from IndexedDB
    if (this.db) {
      try {
        const tx = this.db.transaction(STORE_FAVORITES, 'readwrite');
        const store = tx.objectStore(STORE_FAVORITES);
        for (const id of seedIds) {
          store.delete(id);
        }
      } catch {}
    }
  }

  public async saveFavorite(record: TranslationRecord): Promise<void> {
    const itemToSave = { ...record, isFavorite: true };
    const normKey = this.normalizeKey(record.sourceLang, record.targetLang, record.originalText);

    // Update in localStorage (remove any duplicate first)
    try {
      const existing = this.getFavoritesFromLocalStorage();
      const filtered = existing.filter(
        (f) =>
          f.id !== record.id &&
          this.normalizeKey(f.sourceLang, f.targetLang, f.originalText) !== normKey
      );
      filtered.unshift(itemToSave);
      localStorage.setItem(LS_FAV_KEY, JSON.stringify(filtered.slice(0, 300)));
    } catch {
      // ignore
    }

    if (!this.db) return;

    return new Promise((resolve) => {
      try {
        const tx = this.db!.transaction(STORE_FAVORITES, 'readwrite');
        const store = tx.objectStore(STORE_FAVORITES);
        const getAllReq = store.getAll();

        getAllReq.onsuccess = () => {
          const allItems: TranslationRecord[] = getAllReq.result || [];
          for (const item of allItems) {
            if (
              item.id === record.id ||
              this.normalizeKey(item.sourceLang, item.targetLang, item.originalText) === normKey
            ) {
              store.delete(item.id);
            }
          }
          store.put(itemToSave);
        };

        tx.oncomplete = () => resolve();
        tx.onerror = () => resolve();
      } catch {
        resolve();
      }
    });
  }

  public async removeFavorite(idOrText: string): Promise<void> {
    const cleanQuery = idOrText.trim().toLowerCase();

    // Remove from localStorage
    try {
      const existing = this.getFavoritesFromLocalStorage();
      const filtered = existing.filter(
        (f) => f.id !== idOrText && f.originalText.trim().toLowerCase() !== cleanQuery
      );
      localStorage.setItem(LS_FAV_KEY, JSON.stringify(filtered));
    } catch {
      // ignore
    }

    if (!this.db) return;

    return new Promise((resolve) => {
      try {
        const tx = this.db!.transaction(STORE_FAVORITES, 'readwrite');
        const store = tx.objectStore(STORE_FAVORITES);
        const getAllReq = store.getAll();

        getAllReq.onsuccess = () => {
          const allItems: TranslationRecord[] = getAllReq.result || [];
          for (const item of allItems) {
            if (item.id === idOrText || item.originalText.trim().toLowerCase() === cleanQuery) {
              store.delete(item.id);
            }
          }
        };

        tx.oncomplete = () => resolve();
        tx.onerror = () => resolve();
      } catch {
        resolve();
      }
    });
  }

  public async isFavorite(id: string, originalText?: string): Promise<boolean> {
    const favorites = await this.getFavorites();
    const cleanText = originalText?.trim().toLowerCase();
    return favorites.some(
      (f) => f.id === id || (cleanText && f.originalText.trim().toLowerCase() === cleanText)
    );
  }

  // --- HISTORY (Single Entry Only - Strictly Deduplicated) ---
  public async getHistory(): Promise<TranslationRecord[]> {
    let records: TranslationRecord[] = [];

    if (!this.db) {
      records = this.getHistoryFromLocalStorage();
    } else {
      records = await new Promise((resolve) => {
        try {
          const tx = this.db!.transaction(STORE_HISTORY, 'readonly');
          const store = tx.objectStore(STORE_HISTORY);
          const request = store.getAll();

          request.onsuccess = () => {
            const list: TranslationRecord[] = request.result || [];
            list.sort((a, b) => b.timestamp - a.timestamp);
            resolve(list);
          };

          request.onerror = () => {
            resolve(this.getHistoryFromLocalStorage());
          };
        } catch {
          resolve(this.getHistoryFromLocalStorage());
        }
      });
    }

    // Deduplicate: Keep only the most recent entry for each unique source text and language pair
    const seen = new Set<string>();
    const deduplicated: TranslationRecord[] = [];
    const duplicateIdsToDelete: string[] = [];

    for (const item of records) {
      const key = this.normalizeKey(item.sourceLang, item.targetLang, item.originalText);
      if (!seen.has(key)) {
        seen.add(key);
        deduplicated.push(item);
      } else {
        duplicateIdsToDelete.push(item.id);
      }
    }

    // Cleanup redundant duplicates in the background if found
    if (duplicateIdsToDelete.length > 0) {
      this.cleanupDuplicateHistoryIds(duplicateIdsToDelete, deduplicated);
    }

    return deduplicated.slice(0, 100);
  }

  private async cleanupDuplicateHistoryIds(ids: string[], keptItems: TranslationRecord[]): Promise<void> {
    try {
      localStorage.setItem(LS_HIST_KEY, JSON.stringify(keptItems.slice(0, 100)));
    } catch {}

    if (!this.db) return;

    try {
      const tx = this.db.transaction(STORE_HISTORY, 'readwrite');
      const store = tx.objectStore(STORE_HISTORY);
      for (const id of ids) {
        store.delete(id);
      }
    } catch {
      // ignore
    }
  }

  public async saveHistory(record: TranslationRecord): Promise<void> {
    const normKey = this.normalizeKey(record.sourceLang, record.targetLang, record.originalText);

    // Save to localStorage: remove any previous duplicate first
    try {
      const existing = this.getHistoryFromLocalStorage();
      const filtered = existing.filter(
        (h) =>
          h.id !== record.id &&
          this.normalizeKey(h.sourceLang, h.targetLang, h.originalText) !== normKey
      );
      filtered.unshift(record);
      localStorage.setItem(LS_HIST_KEY, JSON.stringify(filtered.slice(0, 100)));
    } catch {
      // ignore
    }

    if (!this.db) return;

    return new Promise((resolve) => {
      try {
        const tx = this.db!.transaction(STORE_HISTORY, 'readwrite');
        const store = tx.objectStore(STORE_HISTORY);
        const getAllReq = store.getAll();

        getAllReq.onsuccess = () => {
          const allItems: TranslationRecord[] = getAllReq.result || [];
          for (const item of allItems) {
            // Delete existing duplicate with same text and language pair
            if (
              item.id === record.id ||
              this.normalizeKey(item.sourceLang, item.targetLang, item.originalText) === normKey
            ) {
              store.delete(item.id);
            }
          }
          // Put the new single record at the front
          store.put(record);
        };

        tx.oncomplete = () => resolve();
        tx.onerror = () => resolve();
      } catch {
        resolve();
      }
    });
  }

  public async clearHistory(): Promise<void> {
    try {
      localStorage.removeItem(LS_HIST_KEY);
    } catch {
      // ignore
    }

    if (!this.db) return;

    return new Promise((resolve) => {
      try {
        const tx = this.db!.transaction(STORE_HISTORY, 'readwrite');
        const store = tx.objectStore(STORE_HISTORY);
        store.clear();
        tx.oncomplete = () => resolve();
        tx.onerror = () => resolve();
      } catch {
        resolve();
      }
    });
  }

  public async deleteHistoryItem(id: string): Promise<void> {
    this.removeHistoryFromLocalStorage(id);

    if (!this.db) return;

    return new Promise((resolve) => {
      try {
        const tx = this.db!.transaction(STORE_HISTORY, 'readwrite');
        const store = tx.objectStore(STORE_HISTORY);
        store.delete(id);
        tx.oncomplete = () => resolve();
        tx.onerror = () => resolve();
      } catch {
        resolve();
      }
    });
  }

  // --- OFFLINE CACHE MATCHING ---
  public async findOfflineMatch(text: string, sourceLang: string): Promise<TranslationRecord | null> {
    const cleanText = text.trim().toLowerCase();
    // 1. Search favorites first
    const favorites = await this.getFavorites();
    const favMatch = favorites.find(
      (f) => f.sourceLang === sourceLang && f.originalText.trim().toLowerCase() === cleanText
    );
    if (favMatch) return favMatch;

    // 2. Search history
    const history = await this.getHistory();
    const histMatch = history.find(
      (h) => h.sourceLang === sourceLang && h.originalText.trim().toLowerCase() === cleanText
    );
    return histMatch || null;
  }

  // --- LOCALSTORAGE FALLBACK IMPLEMENTATIONS ---
  private getFavoritesFromLocalStorage(): TranslationRecord[] {
    try {
      const data = localStorage.getItem(LS_FAV_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private saveFavoriteToLocalStorage(record: TranslationRecord) {
    try {
      const existing = this.getFavoritesFromLocalStorage();
      const filtered = existing.filter((f) => f.id !== record.id);
      filtered.unshift(record);
      localStorage.setItem(LS_FAV_KEY, JSON.stringify(filtered.slice(0, 300)));
    } catch {
      // quota exceeded or disabled
    }
  }

  private removeFavoriteFromLocalStorage(id: string) {
    try {
      const existing = this.getFavoritesFromLocalStorage();
      const filtered = existing.filter((f) => f.id !== id);
      localStorage.setItem(LS_FAV_KEY, JSON.stringify(filtered));
    } catch {
      // ignore
    }
  }

  private getHistoryFromLocalStorage(): TranslationRecord[] {
    try {
      const data = localStorage.getItem(LS_HIST_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private saveHistoryToLocalStorage(record: TranslationRecord) {
    try {
      const existing = this.getHistoryFromLocalStorage();
      const filtered = existing.filter((h) => h.id !== record.id);
      filtered.unshift(record);
      localStorage.setItem(LS_HIST_KEY, JSON.stringify(filtered.slice(0, 100)));
    } catch {
      // ignore
    }
  }

  private removeHistoryFromLocalStorage(id: string) {
    try {
      const existing = this.getHistoryFromLocalStorage();
      const filtered = existing.filter((h) => h.id !== id);
      localStorage.setItem(LS_HIST_KEY, JSON.stringify(filtered));
    } catch {
      // ignore
    }
  }
}

export const localDB = new LocalDatabase();
