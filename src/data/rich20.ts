import type { RichEntry, RichListMeta } from '@/core/types';

// ============================================
// Rich 20 Billionaire List
// Bloomberg Billionaires Index Snapshot
// ============================================

export const RICH_LIST_META: RichListMeta = {
    sourceName: 'Bloomberg Billionaires Index',
    sourceUrl: 'https://www.bloomberg.com/billionaires/',
    asOfUtc: '2026-01-29T00:02:00Z',
    entries: [
        { id: 1, name: 'Elon Musk', netWorthUsdB: 676 },
        { id: 2, name: 'Larry Page', netWorthUsdB: 287 },
        { id: 3, name: 'Sergey Brin', netWorthUsdB: 267 },
        { id: 4, name: 'Jeff Bezos', netWorthUsdB: 265 },
        { id: 5, name: 'Mark Zuckerberg', netWorthUsdB: 236 },
        { id: 6, name: 'Larry Ellison', netWorthUsdB: 226 },
        { id: 7, name: 'Bernard Arnault', netWorthUsdB: 183 },
        { id: 8, name: 'Steve Ballmer', netWorthUsdB: 168 },
        { id: 9, name: 'Jensen Huang', netWorthUsdB: 159 },
        { id: 10, name: 'Warren Buffett', netWorthUsdB: 143 },
        { id: 11, name: 'Jim Walton', netWorthUsdB: 142 },
        { id: 12, name: 'Rob Walton', netWorthUsdB: 139 },
        { id: 13, name: 'Alice Walton', netWorthUsdB: 139 },
        { id: 14, name: 'Michael Dell', netWorthUsdB: 136 },
        { id: 15, name: 'Amancio Ortega', netWorthUsdB: 134 },
        { id: 16, name: 'Carlos Slim', netWorthUsdB: 121 },
        { id: 17, name: 'Bill Gates', netWorthUsdB: 108 },
        { id: 18, name: 'Françoise Bettencourt Meyers', netWorthUsdB: 97.6 },
        { id: 19, name: 'Mukesh Ambani', netWorthUsdB: 93.5 },
        { id: 20, name: 'Thomas Peterffy', netWorthUsdB: 90.0 },
    ],
};

// ============================================
// Access Functions
// ============================================

export function getRichList(): RichEntry[] {
    return RICH_LIST_META.entries;
}

export function getRichById(id: number): RichEntry | undefined {
    return RICH_LIST_META.entries.find((e) => e.id === id);
}

export function searchRichByName(query: string): RichEntry[] {
    const lowerQuery = query.toLowerCase().trim();
    if (!lowerQuery) return RICH_LIST_META.entries;

    return RICH_LIST_META.entries.filter((e) =>
        e.name.toLowerCase().includes(lowerQuery)
    );
}

export function getRichListMeta(): Omit<RichListMeta, 'entries'> {
    return {
        sourceName: RICH_LIST_META.sourceName,
        sourceUrl: RICH_LIST_META.sourceUrl,
        asOfUtc: RICH_LIST_META.asOfUtc,
    };
}

export function formatRichWorth(usdB: number): string {
    return `$${usdB}B`;
}
