import { z } from 'zod';

// ============================================
// Category Types
// ============================================

export const CATEGORY_IDS = ['buyuk', 'gida', 'ulasim', 'teknoloji', 'eglence', 'zugurt'] as const;
export type CategoryId = (typeof CATEGORY_IDS)[number];

export interface Category {
    id: CategoryId;
    name: string;
    icon: string;
    enabled: boolean;
}

// ============================================
// Price Item Types
// ============================================

export interface PriceItem {
    id: string;
    name: string;
    priceTL: number;
    category: CategoryId;
    icon?: string;
}

// ============================================
// Settings Types
// ============================================

export const HumorLevelSchema = z.enum(['soft', 'mid', 'hard']);
export type HumorLevel = z.infer<typeof HumorLevelSchema>;

export const ThemeSchema = z.enum(['light', 'dark', 'system']);
export type Theme = z.infer<typeof ThemeSchema>;

export const SettingsSchema = z.object({
    usdTry: z.number().min(0),
    humorLevel: HumorLevelSchema,
    rounding: z.union([z.literal(0), z.literal(1), z.literal(2)]),
    abbreviate: z.boolean(),
    relativeFilterOn: z.boolean(),
    relativeSharePct: z.number().min(0).max(100),
    theme: ThemeSchema,
});

export type Settings = z.infer<typeof SettingsSchema>;

// ============================================
// Rich Entry Types
// ============================================

export interface RichEntry {
    id: number;
    name: string;
    netWorthUsdB: number;
}

export interface RichListMeta {
    sourceName: string;
    sourceUrl: string;
    asOfUtc: string;
    entries: RichEntry[];
}

export interface RemoteDataPayload {
    prices: PriceItem[];
    richList: RichListMeta;
}

// ============================================
// Calculation Types
// ============================================

export interface ItemResult {
    item: PriceItem;
    qty: number;
    qtyDisplay: string;
}

export interface Punchline {
    item: PriceItem;
    qty: number;
    qtyDisplay: string;
    text: string;
}

export interface CalcResult {
    amountTL: number;
    amountAfter: number;
    items: ItemResult[];
    punchlines: Punchline[];
    mood: MoodType;
    isRichMode: boolean;
    hasAnomaly: boolean;
}

// ============================================
// Mascot Types
// ============================================

export const MOOD_TYPES = [
    'idle',
    'focus',
    'calculating',
    'microWin',
    'shocked',
    'megaShocked',
    'broke',
    'tiny',
    'relativeTaxed',
    'richMode',
    'suspicious',
    'shareProud',
] as const;

export type MoodType = (typeof MOOD_TYPES)[number];

export interface MoodConfig {
    type: MoodType;
    texts: {
        soft: string;
        mid: string;
        hard: string;
    };
    animation: string;
}

// ============================================
// Context Types
// ============================================

export interface CalcContext {
    inputFocused?: boolean;
    isCalculating?: boolean;
    richSelected?: boolean;
    shareSuccess?: boolean;
}

// ============================================
// Storage Types
// ============================================

export interface StorageData {
    settings: Settings;
    customPrices: Record<string, number>;
    categoryStates: Record<CategoryId, boolean>;
    version: number;
}
