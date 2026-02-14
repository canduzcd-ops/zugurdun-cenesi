import { z } from 'zod';
import type { RemoteDataPayload, PriceItem, RichEntry, RichListMeta } from './types';
import { CATEGORY_IDS } from './types';
import { DEFAULT_PRICES } from './defaults';
import { RICH_LIST_META } from '@/data/rich20';
import { loadRemoteDataCache, saveRemoteDataCache } from './storage';

const REMOTE_DATA_URL = 'https://gist.githubusercontent.com/your-user/your-gist-id/raw/zugurd-remote-data.json';

const PriceItemSchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    priceTL: z.number().finite().nonnegative(),
    category: z.enum(CATEGORY_IDS),
    icon: z.string().optional(),
});

const RichEntrySchema = z.object({
    id: z.number().int().positive(),
    name: z.string().min(1),
    netWorthUsdB: z.number().finite().nonnegative(),
});

const RichListMetaSchema = z.object({
    sourceName: z.string().min(1),
    sourceUrl: z.string().url(),
    asOfUtc: z.string().min(1),
    entries: z.array(RichEntrySchema).min(1),
});

const RemoteDataSchema = z.object({
    prices: z.array(PriceItemSchema).min(1),
    richList: RichListMetaSchema,
});

function getFallbackData(): RemoteDataPayload {
    return {
        prices: DEFAULT_PRICES.map((item) => ({ ...item })),
        richList: {
            sourceName: RICH_LIST_META.sourceName,
            sourceUrl: RICH_LIST_META.sourceUrl,
            asOfUtc: RICH_LIST_META.asOfUtc,
            entries: RICH_LIST_META.entries.map((entry) => ({ ...entry })),
        },
    };
}

async function fetchRemoteData(): Promise<RemoteDataPayload | null> {
    try {
        const response = await fetch(REMOTE_DATA_URL, { cache: 'no-store' });
        if (!response.ok) return null;

        const json = await response.json();
        const parsed = RemoteDataSchema.safeParse(json);
        if (!parsed.success) return null;

        return parsed.data;
    } catch {
        return null;
    }
}

export async function loadRemoteData(): Promise<RemoteDataPayload> {
    const cached = await loadRemoteDataCache();
    const remote = await fetchRemoteData();

    if (remote) {
        await saveRemoteDataCache(remote);
        return remote;
    }

    if (cached) {
        return cached;
    }

    return getFallbackData();
}

export function formatRichWorth(usdB: number): string {
    return `$${usdB}B`;
}

export type { PriceItem, RichEntry, RichListMeta };