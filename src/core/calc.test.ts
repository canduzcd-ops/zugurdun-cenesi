import { describe, it, expect } from 'vitest';
import { calculate, convertUsdToTl, createOnlyCategoryFilter, createExcludeCategoryFilter } from './calc';
import { formatQty, abbreviate } from './format';
import { getDefaultSettings, getDefaultPrices, getDefaultCategories } from './defaults';
import type { Settings, Category } from './types';

describe('calculate', () => {
    const prices = getDefaultPrices();
    const categories = getDefaultCategories();
    const settings = getDefaultSettings();

    it('should calculate normal quantities correctly', () => {
        // 5,000,000 TL should buy exactly 1 ev (5,000,000 TL each)
        const result = calculate(5_000_000, prices, settings, categories);

        const evResult = result.items.find((i) => i.item.id === 'ev');
        expect(evResult).toBeDefined();
        expect(evResult!.qty).toBe(1);
    });

    it('should format qty < 1 with minimum 2 decimal places', () => {
        // 2,500,000 TL should buy 0.5 ev
        const result = calculate(2_500_000, prices, settings, categories);

        const evResult = result.items.find((i) => i.item.id === 'ev');
        expect(evResult).toBeDefined();
        expect(evResult!.qty).toBe(0.5);
        // formatQty should show at least 2 decimals for qty < 1
        expect(evResult!.qtyDisplay).toMatch(/0,50/);
    });

    it('should respect category filter', () => {
        // Disable 'buyuk' category
        const filteredCategories: Category[] = categories.map((c) => ({
            ...c,
            enabled: c.id !== 'buyuk',
        }));

        const result = calculate(5_000_000, prices, settings, filteredCategories);

        // Should not have any 'buyuk' items
        const buyukItems = result.items.filter((i) => i.item.category === 'buyuk');
        expect(buyukItems.length).toBe(0);

        // Should still have other categories
        expect(result.items.length).toBeGreaterThan(0);
    });

    it('should work with quick mode: only car', () => {
        const onlyBuyuk = createOnlyCategoryFilter('buyuk');
        const result = calculate(10_000_000, prices, settings, onlyBuyuk);

        // All items should be 'buyuk' category
        expect(result.items.every((i) => i.item.category === 'buyuk')).toBe(true);
    });

    it('should work with quick mode: exclude home', () => {
        const excludeBuyuk = createExcludeCategoryFilter('buyuk');
        const result = calculate(10_000_000, prices, settings, excludeBuyuk);

        // No items should be 'buyuk' category
        expect(result.items.every((i) => i.item.category !== 'buyuk')).toBe(true);
        // Should have items from other categories
        expect(result.items.length).toBeGreaterThan(0);
    });

    it('should apply relative filter correctly', () => {
        const settingsWithRelative: Settings = {
            ...settings,
            relativeFilterOn: true,
            relativeSharePct: 20, // 20% reduction
        };

        const result = calculate(1_000_000, prices, settingsWithRelative, categories);

        // Amount after should be 80% of original
        expect(result.amountAfter).toBe(800_000);
    });

    it('should convert USD to TL correctly', () => {
        // Elon Musk: $676B at 30 TL/USD = 20,280,000,000,000 TL
        const tlAmount = convertUsdToTl(676, 30);
        expect(tlAmount).toBe(20_280_000_000_000);
    });

    it('should abbreviate large numbers correctly', () => {
        expect(abbreviate(1_500)).toBe('1.5K');
        expect(abbreviate(2_400_000)).toBe('2.4M');
        expect(abbreviate(1_000_000_000)).toBe('1B');
        expect(abbreviate(1_200_000_000)).toBe('1.2B');
    });
});

describe('formatQty', () => {
    const settings = getDefaultSettings();

    it('should format qty >= 1 with specified rounding', () => {
        expect(formatQty(5, settings)).toBe('5');
        expect(formatQty(5.5, { ...settings, rounding: 1 })).toBe('5,5');
        expect(formatQty(5.55, { ...settings, rounding: 2 })).toBe('5,55');
    });

    it('should format qty < 1 with at least 2 decimals', () => {
        const result = formatQty(0.5, { ...settings, rounding: 0 });
        // Even with rounding: 0, qty < 1 should have 2+ decimals
        expect(result).toMatch(/0,50/);
    });

    it('should abbreviate large quantities when enabled', () => {
        const result = formatQty(2_500_000, { ...settings, abbreviate: true });
        expect(result).toBe('2.5M');
    });
});
