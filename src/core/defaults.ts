import type { Settings, PriceItem, Category, CategoryId } from './types';

// ============================================
// Default Settings
// ============================================

export const DEFAULT_SETTINGS: Settings = {
    usdTry: 30,
    humorLevel: 'mid',
    rounding: 0,
    abbreviate: true,
    relativeFilterOn: false,
    relativeSharePct: 15,
    theme: 'system',
};

// ============================================
// Categories
// ============================================

export const DEFAULT_CATEGORIES: Category[] = [
    { id: 'buyuk', name: 'Büyük', icon: '🏠', enabled: true },
    { id: 'gida', name: 'Gıda', icon: '🍕', enabled: true },
    { id: 'ulasim', name: 'Ulaşım', icon: '🚗', enabled: true },
    { id: 'teknoloji', name: 'Teknoloji', icon: '📱', enabled: true },
    { id: 'eglence', name: 'Eğlence', icon: '🎮', enabled: true },
    { id: 'zugurt', name: 'Züğürt Lüksleri', icon: '💸', enabled: true },
];

// ============================================
// Default Prices (TL)
// ============================================

export const DEFAULT_PRICES: PriceItem[] = [
    // BÜYÜK
    { id: 'ev', name: 'Ev (daire)', priceTL: 5_000_000, category: 'buyuk', icon: '🏠' },
    { id: 'araba_sifir', name: 'Araba (sıfır)', priceTL: 2_000_000, category: 'buyuk', icon: '🚗' },
    { id: 'araba_ikinci', name: 'Araba (2.el)', priceTL: 900_000, category: 'buyuk', icon: '🚙' },
    { id: 'arsa', name: 'Arsa (100 m²)', priceTL: 1_500_000, category: 'buyuk', icon: '🏗️' },
    { id: 'kira_yillik', name: '1 yıllık kira', priceTL: 360_000, category: 'buyuk', icon: '🔑' },

    // GIDA
    { id: 'doner', name: 'Döner', priceTL: 250, category: 'gida', icon: '🌯' },
    { id: 'kahve', name: 'Kahve', priceTL: 120, category: 'gida', icon: '☕' },
    { id: 'market', name: 'Market sepeti', priceTL: 1_500, category: 'gida', icon: '🛒' },
    { id: 'ekmek', name: 'Ekmek', priceTL: 15, category: 'gida', icon: '🍞' },

    // ULAŞIM
    { id: 'benzin', name: 'Benzin (litre)', priceTL: 45, category: 'ulasim', icon: '⛽' },
    { id: 'taksi', name: 'Taksi (km)', priceTL: 25, category: 'ulasim', icon: '🚕' },
    { id: 'bilet', name: 'Şehir içi bilet', priceTL: 20, category: 'ulasim', icon: '🎫' },
    { id: 'ucak', name: 'Uçak bileti', priceTL: 2_000, category: 'ulasim', icon: '✈️' },

    // TEKNOLOJİ
    { id: 'iphone', name: 'iPhone', priceTL: 80_000, category: 'teknoloji', icon: '📱' },
    { id: 'android', name: 'Orta Android', priceTL: 30_000, category: 'teknoloji', icon: '📲' },
    { id: 'laptop', name: 'Laptop', priceTL: 55_000, category: 'teknoloji', icon: '💻' },
    { id: 'konsol', name: 'Konsol', priceTL: 35_000, category: 'teknoloji', icon: '🎮' },
    { id: 'kulaklik', name: 'Kulaklık', priceTL: 6_000, category: 'teknoloji', icon: '🎧' },

    // EĞLENCE/ABONELİK
    { id: 'netflix', name: 'Netflix (ay)', priceTL: 200, category: 'eglence', icon: '📺' },
    { id: 'spotify', name: 'Spotify (ay)', priceTL: 60, category: 'eglence', icon: '🎵' },
    { id: 'sinema', name: 'Sinema', priceTL: 250, category: 'eglence', icon: '🎬' },
    { id: 'konser', name: 'Konser', priceTL: 1_500, category: 'eglence', icon: '🎤' },
    { id: 'spor', name: 'Spor salonu (ay)', priceTL: 2_000, category: 'eglence', icon: '🏋️' },
    { id: 'oyun', name: 'AAA oyun', priceTL: 2_000, category: 'eglence', icon: '🕹️' },

    // ZÜĞÜRT LÜKSLERİ
    { id: 'aksam', name: '2 kişilik dışarı akşamı', priceTL: 3_500, category: 'zugurt', icon: '🍽️' },
    { id: 'date', name: 'Date bütçesi', priceTL: 1_500, category: 'zugurt', icon: '💕' },
    { id: 'misafir', name: 'Misafir ikram seti', priceTL: 800, category: 'zugurt', icon: '🍪' },
];

// ============================================
// Utility Functions
// ============================================

export function getDefaultSettings(): Settings {
    return { ...DEFAULT_SETTINGS };
}

export function getDefaultPrices(): PriceItem[] {
    return DEFAULT_PRICES.map((p) => ({ ...p }));
}

export function getDefaultCategories(): Category[] {
    return DEFAULT_CATEGORIES.map((c) => ({ ...c }));
}

export function getCategoryById(id: CategoryId): Category | undefined {
    return DEFAULT_CATEGORIES.find((c) => c.id === id);
}

export function getPricesByCategory(prices: PriceItem[], categoryId: CategoryId): PriceItem[] {
    return prices.filter((p) => p.category === categoryId);
}
