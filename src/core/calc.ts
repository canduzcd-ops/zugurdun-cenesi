import type { Settings, PriceItem, Category, CalcResult, ItemResult, Punchline, MoodType, CalcContext, CategoryId } from './types';
import { formatQty } from './format';
import { generatePunchlineText } from './humor';

// ============================================
// Main Calculation Function
// ============================================

export function calculate(
    amountTL: number,
    prices: PriceItem[],
    settings: Settings,
    categories: Category[],
    context: CalcContext = {}
): CalcResult {
    // Validate input
    if (amountTL <= 0 || !isFinite(amountTL)) {
        return createEmptyResult(amountTL, context);
    }

    // Apply relative filter (akraba vergisi)
    const amountAfter = settings.relativeFilterOn
        ? amountTL * (1 - settings.relativeSharePct / 100)
        : amountTL;

    // Get enabled categories
    const enabledCategories = new Set(
        categories.filter((c) => c.enabled).map((c) => c.id)
    );

    // Filter and calculate items
    const items: ItemResult[] = prices
        .filter((p) => enabledCategories.has(p.category))
        .map((item) => {
            const qty = amountAfter / item.priceTL;
            return {
                item,
                qty,
                qtyDisplay: formatQty(qty, settings),
            };
        })
        .sort((a, b) => b.qty - a.qty);

    // Generate top 3 punchlines
    const punchlines = generatePunchlines(items.slice(0, 3), settings);

    // Determine mood
    const mood = selectMood(amountTL, amountAfter, items, context, settings);

    // Check for anomalies
    const hasAnomaly = checkForAnomalies(prices, settings);

    return {
        amountTL,
        amountAfter,
        items,
        punchlines,
        mood,
        isRichMode: context.richSelected ?? false,
        hasAnomaly,
    };
}

// ============================================
// Helper Functions
// ============================================

function createEmptyResult(amountTL: number, context: CalcContext): CalcResult {
    return {
        amountTL,
        amountAfter: 0,
        items: [],
        punchlines: [],
        mood: context.inputFocused ? 'focus' : 'suspicious',
        isRichMode: false,
        hasAnomaly: amountTL < 0,
    };
}

function generatePunchlines(topItems: ItemResult[], settings: Settings): Punchline[] {
    return topItems.map((itemResult) => ({
        item: itemResult.item,
        qty: itemResult.qty,
        qtyDisplay: itemResult.qtyDisplay,
        text: generatePunchlineText(itemResult.item, itemResult.qty, settings.humorLevel),
    }));
}

function selectMood(
    amountTL: number,
    _amountAfter: number,
    items: ItemResult[],
    context: CalcContext,
    settings: Settings
): MoodType {
    // Priority order for context-based moods
    if (context.shareSuccess) return 'shareProud';
    if (context.isCalculating) return 'calculating';
    if (context.inputFocused) return 'focus';
    if (context.richSelected) return 'richMode';
    if (settings.relativeFilterOn && items.length > 0) return 'relativeTaxed';

    // No items = broke
    if (items.length === 0) return 'idle';

    // Calculate statistics
    const avgQty = items.reduce((sum, i) => sum + i.qty, 0) / items.length;
    const allTiny = items.every((i) => i.qty < 0.1);
    const mostBroke = items.filter((i) => i.qty < 1).length > items.length * 0.7;

    // Amount-based moods
    if (amountTL >= 1_000_000_000) return 'megaShocked';
    if (amountTL >= 50_000_000) return 'shocked';
    if (allTiny) return 'tiny';
    if (mostBroke) return 'broke';
    if (avgQty >= 1 && avgQty <= 10) return 'microWin';

    return 'idle';
}

function checkForAnomalies(prices: PriceItem[], settings: Settings): boolean {
    // Check for suspicious prices (zero or negative)
    const hasZeroPrice = prices.some((p) => p.priceTL <= 0);
    // Check for extreme USD rate
    const extremeRate = settings.usdTry > 100 || settings.usdTry < 1;
    return hasZeroPrice || extremeRate;
}

// ============================================
// Category Filtering Functions
// ============================================

export function getCategoryResults(
    result: CalcResult,
    categoryId: CategoryId
): ItemResult[] {
    return result.items.filter((i) => i.item.category === categoryId);
}

export function filterByCategory(
    prices: PriceItem[],
    categoryId: CategoryId
): PriceItem[] {
    return prices.filter((p) => p.category === categoryId);
}

// ============================================
// Quick Mode Functions
// ============================================

export function createOnlyCategoryFilter(categoryId: CategoryId): Category[] {
    return [
        { id: 'buyuk', name: 'Büyük', icon: '🏠', enabled: categoryId === 'buyuk' },
        { id: 'gida', name: 'Gıda', icon: '🍕', enabled: categoryId === 'gida' },
        { id: 'ulasim', name: 'Ulaşım', icon: '🚗', enabled: categoryId === 'ulasim' },
        { id: 'teknoloji', name: 'Teknoloji', icon: '📱', enabled: categoryId === 'teknoloji' },
        { id: 'eglence', name: 'Eğlence', icon: '🎮', enabled: categoryId === 'eglence' },
        { id: 'zugurt', name: 'Züğürt Lüksleri', icon: '💸', enabled: categoryId === 'zugurt' },
    ];
}

export function createExcludeCategoryFilter(excludeId: CategoryId): Category[] {
    return [
        { id: 'buyuk', name: 'Büyük', icon: '🏠', enabled: excludeId !== 'buyuk' },
        { id: 'gida', name: 'Gıda', icon: '🍕', enabled: excludeId !== 'gida' },
        { id: 'ulasim', name: 'Ulaşım', icon: '🚗', enabled: excludeId !== 'ulasim' },
        { id: 'teknoloji', name: 'Teknoloji', icon: '📱', enabled: excludeId !== 'teknoloji' },
        { id: 'eglence', name: 'Eğlence', icon: '🎮', enabled: excludeId !== 'eglence' },
        { id: 'zugurt', name: 'Züğürt Lüksleri', icon: '💸', enabled: excludeId !== 'zugurt' },
    ];
}

// ============================================
// USD to TL Conversion
// ============================================

export function convertUsdToTl(usdBillions: number, usdTry: number): number {
    return usdBillions * 1_000_000_000 * usdTry;
}
