import type { Settings } from './types';

// ============================================
// Number Formatting
// ============================================

export function formatNumber(value: number, settings: Settings): string {
    if (settings.abbreviate && Math.abs(value) >= 1000) {
        return abbreviate(value);
    }
    return formatWithDecimals(value, settings.rounding);
}

export function formatQty(qty: number, settings: Settings): string {
    // If qty < 1, always show at least 2 decimal places
    if (qty < 1 && qty > 0) {
        const decimals = Math.max(2, settings.rounding) as 0 | 1 | 2;
        return formatWithDecimals(qty, decimals);
    }

    if (settings.abbreviate && qty >= 1000) {
        return abbreviate(qty);
    }

    return formatWithDecimals(qty, settings.rounding);
}

export function formatCurrency(value: number): string {
    return new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
}

export function formatCurrencyShort(value: number): string {
    if (value >= 1_000_000_000) {
        return `₺${(value / 1_000_000_000).toFixed(1)}B`;
    }
    if (value >= 1_000_000) {
        return `₺${(value / 1_000_000).toFixed(1)}M`;
    }
    if (value >= 1_000) {
        return `₺${(value / 1_000).toFixed(1)}K`;
    }
    return `₺${value.toFixed(0)}`;
}

// ============================================
// Abbreviation (K, M, B)
// ============================================

export function abbreviate(value: number): string {
    const absValue = Math.abs(value);
    const sign = value < 0 ? '-' : '';

    if (absValue >= 1_000_000_000) {
        const formatted = (absValue / 1_000_000_000).toFixed(1);
        return `${sign}${removeTrailingZeros(formatted)}B`;
    }
    if (absValue >= 1_000_000) {
        const formatted = (absValue / 1_000_000).toFixed(1);
        return `${sign}${removeTrailingZeros(formatted)}M`;
    }
    if (absValue >= 1_000) {
        const formatted = (absValue / 1_000).toFixed(1);
        return `${sign}${removeTrailingZeros(formatted)}K`;
    }
    return `${sign}${absValue.toFixed(0)}`;
}

// ============================================
// Helper Functions
// ============================================

function formatWithDecimals(value: number, decimals: 0 | 1 | 2): string {
    return new Intl.NumberFormat('tr-TR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: decimals,
    }).format(value);
}

function removeTrailingZeros(str: string): string {
    return str.replace(/\.0$/, '');
}

// ============================================
// Input Parsing
// ============================================

export function parseAmount(input: string): number {
    // Remove currency symbols, spaces, and format separators
    const cleaned = input
        .replace(/[₺$€\s]/g, '')
        .replace(/\./g, '') // Remove thousand separators (Turkish style)
        .replace(/,/g, '.'); // Convert decimal comma to dot

    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
}

export function formatInputValue(value: number): string {
    if (value === 0) return '';
    return new Intl.NumberFormat('tr-TR').format(value);
}
