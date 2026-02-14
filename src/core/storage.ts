import { Preferences } from '@capacitor/preferences';
import { get, set, del } from 'idb-keyval';
import type { Settings, CategoryId, StorageData, RemoteDataPayload } from './types';
import { getDefaultSettings } from './defaults';

// ============================================
// Storage Keys
// ============================================

const STORAGE_KEYS = {
    settings: 'zugurd:settings',
    prices: 'zugurd:prices',
    categories: 'zugurd:categories',
    remoteData: 'zugurd:remote-data',
    version: 'zugurd:version',
} as const;

const CURRENT_VERSION = 1;

// ============================================
// Platform Detection
// ============================================

function isNativePlatform(): boolean {
    return typeof (window as unknown as { Capacitor?: { isNativePlatform: () => boolean } }).Capacitor !== 'undefined' &&
        (window as unknown as { Capacitor: { isNativePlatform: () => boolean } }).Capacitor.isNativePlatform();
}

// ============================================
// Native Storage (Capacitor Preferences)
// ============================================

async function getNative<T>(key: string): Promise<T | null> {
    try {
        const { value } = await Preferences.get({ key });
        return value ? JSON.parse(value) : null;
    } catch {
        return null;
    }
}

async function setNative<T>(key: string, value: T): Promise<void> {
    await Preferences.set({ key, value: JSON.stringify(value) });
}

async function removeNative(key: string): Promise<void> {
    await Preferences.remove({ key });
}

// ============================================
// Web Storage (IndexedDB via idb-keyval)
// ============================================

async function getWeb<T>(key: string): Promise<T | null> {
    try {
        const value = await get<T>(key);
        return value ?? null;
    } catch {
        return null;
    }
}

async function setWeb<T>(key: string, value: T): Promise<void> {
    await set(key, value);
}

async function removeWeb(key: string): Promise<void> {
    await del(key);
}

// ============================================
// Unified Storage API
// ============================================

async function getItem<T>(key: string): Promise<T | null> {
    return isNativePlatform() ? getNative<T>(key) : getWeb<T>(key);
}

async function setItem<T>(key: string, value: T): Promise<void> {
    return isNativePlatform() ? setNative(key, value) : setWeb(key, value);
}

async function removeItem(key: string): Promise<void> {
    return isNativePlatform() ? removeNative(key) : removeWeb(key);
}

// ============================================
// Settings Storage
// ============================================

export async function loadSettings(): Promise<Settings> {
    const saved = await getItem<Settings>(STORAGE_KEYS.settings);
    if (saved) {
        // Merge with defaults to handle any new settings
        return { ...getDefaultSettings(), ...saved };
    }
    return getDefaultSettings();
}

export async function saveSettings(settings: Settings): Promise<void> {
    await setItem(STORAGE_KEYS.settings, settings);
}

// ============================================
// Custom Prices Storage
// ============================================

export async function loadCustomPrices(): Promise<Record<string, number>> {
    const saved = await getItem<Record<string, number>>(STORAGE_KEYS.prices);
    return saved ?? {};
}

export async function saveCustomPrices(prices: Record<string, number>): Promise<void> {
    await setItem(STORAGE_KEYS.prices, prices);
}

export async function resetPrices(): Promise<void> {
    await removeItem(STORAGE_KEYS.prices);
}

// ============================================
// Category States Storage
// ============================================

export async function loadCategoryStates(): Promise<Record<CategoryId, boolean>> {
    const saved = await getItem<Record<CategoryId, boolean>>(STORAGE_KEYS.categories);
    if (saved) {
        return saved;
    }
    // Return defaults
    const defaults: Record<CategoryId, boolean> = {
        buyuk: true,
        gida: true,
        ulasim: true,
        teknoloji: true,
        eglence: true,
        zugurt: true,
    };
    return defaults;
}

export async function saveCategoryStates(states: Record<CategoryId, boolean>): Promise<void> {
    await setItem(STORAGE_KEYS.categories, states);
}

// ============================================
// Full Storage Export/Import
// ============================================

export async function exportAllData(): Promise<StorageData> {
    const settings = await loadSettings();
    const customPrices = await loadCustomPrices();
    const categoryStates = await loadCategoryStates();

    return {
        settings,
        customPrices,
        categoryStates,
        version: CURRENT_VERSION,
    };
}

export async function importAllData(data: StorageData): Promise<void> {
    await saveSettings(data.settings);
    await saveCustomPrices(data.customPrices);
    await saveCategoryStates(data.categoryStates);
}

export async function clearAllData(): Promise<void> {
    await removeItem(STORAGE_KEYS.settings);
    await removeItem(STORAGE_KEYS.prices);
    await removeItem(STORAGE_KEYS.categories);
}

// ============================================
// Remote Data Cache
// ============================================

export async function loadRemoteDataCache(): Promise<RemoteDataPayload | null> {
    return getItem<RemoteDataPayload>(STORAGE_KEYS.remoteData);
}

export async function saveRemoteDataCache(data: RemoteDataPayload): Promise<void> {
    await setItem(STORAGE_KEYS.remoteData, data);
}

export async function clearRemoteDataCache(): Promise<void> {
    await removeItem(STORAGE_KEYS.remoteData);
}
