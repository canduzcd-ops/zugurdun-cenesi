import type { ReactNode } from 'react';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { Category, CategoryId, PriceItem, RichEntry, RichListMeta } from './types';
import { getDefaultCategories, getDefaultPrices } from './defaults';
import { loadCategoryStates, loadCustomPrices, resetPrices, saveCategoryStates, saveCustomPrices } from './storage';
import { loadRemoteData } from './remote-data';
import { RICH_LIST_META } from '@/data/rich20';
import { SplashScreen } from '@/app/components';

interface DataContextValue {
    loading: boolean;
    basePrices: PriceItem[];
    prices: PriceItem[];
    categories: Category[];
    richList: RichEntry[];
    richListMeta: Omit<RichListMeta, 'entries'>;
    updateCategories: (updater: (prev: Category[]) => Category[]) => void;
    saveEditedPrices: (editedPrices: Record<string, number>) => Promise<void>;
    resetCustomPrices: () => Promise<void>;
}

const DataContext = createContext<DataContextValue | null>(null);

function mergePrices(basePrices: PriceItem[], customPrices: Record<string, number>): PriceItem[] {
    return basePrices.map((item) => ({
        ...item,
        priceTL: customPrices[item.id] ?? item.priceTL,
    }));
}

function buildCategoryStates(categories: Category[]): Record<CategoryId, boolean> {
    const states: Record<CategoryId, boolean> = {} as Record<CategoryId, boolean>;
    categories.forEach((category) => {
        states[category.id] = category.enabled;
    });
    return states;
}

export function DataProvider({ children }: { children: ReactNode }) {
    const [loading, setLoading] = useState(true);
    const [basePrices, setBasePrices] = useState<PriceItem[]>(getDefaultPrices());
    const [prices, setPrices] = useState<PriceItem[]>(getDefaultPrices());
    const [categories, setCategories] = useState<Category[]>(getDefaultCategories());
    const [customPrices, setCustomPricesState] = useState<Record<string, number>>({});
    const [richList, setRichList] = useState<RichEntry[]>(RICH_LIST_META.entries);
    const [richListMeta, setRichListMeta] = useState<Omit<RichListMeta, 'entries'>>({
        sourceName: RICH_LIST_META.sourceName,
        sourceUrl: RICH_LIST_META.sourceUrl,
        asOfUtc: RICH_LIST_META.asOfUtc,
    });

    useEffect(() => {
        let isActive = true;

        async function load() {
            setLoading(true);
            const [remoteData, savedCustomPrices, savedCategoryStates] = await Promise.all([
                loadRemoteData(),
                loadCustomPrices(),
                loadCategoryStates(),
            ]);

            if (!isActive) return;

            const mergedCategories = getDefaultCategories().map((category) => ({
                ...category,
                enabled: savedCategoryStates[category.id] ?? category.enabled,
            }));

            const nextBasePrices = remoteData.prices.map((item) => ({ ...item }));
            const nextPrices = mergePrices(nextBasePrices, savedCustomPrices);

            setBasePrices(nextBasePrices);
            setPrices(nextPrices);
            setCustomPricesState(savedCustomPrices);
            setCategories(mergedCategories);
            setRichList(remoteData.richList.entries.map((entry) => ({ ...entry })));
            setRichListMeta({
                sourceName: remoteData.richList.sourceName,
                sourceUrl: remoteData.richList.sourceUrl,
                asOfUtc: remoteData.richList.asOfUtc,
            });
            setLoading(false);
        }

        load();

        return () => {
            isActive = false;
        };
    }, []);

    const updateCategories = useCallback((updater: (prev: Category[]) => Category[]) => {
        setCategories((prev) => {
            const next = updater(prev);
            saveCategoryStates(buildCategoryStates(next));
            return next;
        });
    }, []);

    const saveEditedPrices = useCallback(async (editedPrices: Record<string, number>) => {
        const defaultsById = new Map(basePrices.map((item) => [item.id, item.priceTL]));
        const nextCustom = { ...customPrices };

        Object.entries(editedPrices).forEach(([id, value]) => {
            const defaultPrice = defaultsById.get(id);
            if (typeof defaultPrice !== 'number') return;

            if (value !== defaultPrice) {
                nextCustom[id] = value;
            } else {
                delete nextCustom[id];
            }
        });

        await saveCustomPrices(nextCustom);
        setCustomPricesState(nextCustom);
        setPrices(mergePrices(basePrices, nextCustom));
    }, [basePrices, customPrices]);

    const resetCustomPrices = useCallback(async () => {
        await resetPrices();
        setCustomPricesState({});
        setPrices(basePrices.map((item) => ({ ...item })));
    }, [basePrices]);

    const value = useMemo<DataContextValue>(() => ({
        loading,
        basePrices,
        prices,
        categories,
        richList,
        richListMeta,
        updateCategories,
        saveEditedPrices,
        resetCustomPrices,
    }), [
        loading,
        basePrices,
        prices,
        categories,
        richList,
        richListMeta,
        updateCategories,
        saveEditedPrices,
        resetCustomPrices,
    ]);

    // Loading state'de SplashScreen göster
    if (loading) {
        return (
            <DataContext.Provider value={value}>
                <SplashScreen />
            </DataContext.Provider>
        );
    }

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
}

export function useData(): DataContextValue {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
}
