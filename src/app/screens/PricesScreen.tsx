import { useState, useEffect, useCallback } from 'react';
import { Button, Card } from '@/app/components';
import { getDefaultPrices, getDefaultCategories } from '@/core/defaults';
import { loadCustomPrices, saveCustomPrices, resetPrices } from '@/core/storage';
import type { PriceItem } from '@/core/types';

export function PricesScreen() {
    const [prices, setPrices] = useState<PriceItem[]>([]);
    const [editedPrices, setEditedPrices] = useState<Record<string, number>>({});
    const [hasChanges, setHasChanges] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        async function load() {
            const customPrices = await loadCustomPrices();
            const mergedPrices = getDefaultPrices().map((p) => ({
                ...p,
                priceTL: customPrices[p.id] ?? p.priceTL,
            }));
            setPrices(mergedPrices);
        }
        load();
    }, []);

    const handlePriceChange = useCallback((id: string, value: string) => {
        const numValue = parseInt(value.replace(/[^\d]/g, ''), 10) || 0;
        setEditedPrices((prev) => ({ ...prev, [id]: numValue }));
        setHasChanges(true);
    }, []);

    const handleSave = useCallback(async () => {
        setSaving(true);
        try {
            // Merge with existing custom prices
            const existingCustom = await loadCustomPrices();
            const newCustom = { ...existingCustom };

            // Only save prices that differ from defaults
            const defaults = getDefaultPrices();
            Object.entries(editedPrices).forEach(([id, value]) => {
                const defaultPrice = defaults.find((p) => p.id === id)?.priceTL;
                if (value !== defaultPrice) {
                    newCustom[id] = value;
                } else {
                    delete newCustom[id];
                }
            });

            await saveCustomPrices(newCustom);

            // Update local state
            setPrices((prev) =>
                prev.map((p) => ({
                    ...p,
                    priceTL: editedPrices[p.id] ?? p.priceTL,
                }))
            );
            setEditedPrices({});
            setHasChanges(false);
        } finally {
            setSaving(false);
        }
    }, [editedPrices]);

    const handleReset = useCallback(async () => {
        if (!confirm('Tüm fiyatlar varsayılana döndürülecek. Emin misiniz?')) return;

        await resetPrices();
        setPrices(getDefaultPrices());
        setEditedPrices({});
        setHasChanges(false);
    }, []);

    const categories = getDefaultCategories();
    const groupedPrices = categories.map((category) => ({
        category,
        items: prices.filter((p) => p.category === category.id),
    }));

    return (
        <div className="main-content safe-area-top px-4 py-6">
            <div className="max-w-lg mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold uppercase font-mono tracking-wider">Fiyatlar</h1>
                    <Button variant="ghost" onClick={handleReset}>
                        🔄 Sıfırla
                    </Button>
                </div>

                {/* Price Cards */}
                {groupedPrices.map(({ category, items }) => (
                    <Card key={category.id} title={category.name} icon={category.icon}>
                        <div className="space-y-3">
                            {items.map((item) => {
                                const currentValue = editedPrices[item.id] ?? item.priceTL;
                                return (
                                    <div key={item.id} className="flex items-center gap-3">
                                        <span className="w-8 text-center text-xl">{item.icon}</span>
                                        <span className="flex-1 text-gray-700 dark:text-gray-300">
                                            {item.name}
                                        </span>
                                        <div className="relative w-32">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                                ₺
                                            </span>
                                            <input
                                                type="text"
                                                inputMode="numeric"
                                                value={formatForInput(currentValue)}
                                                onChange={(e) => handlePriceChange(item.id, e.target.value)}
                                                className="w-full pl-8 pr-3 py-2 text-right text-sm font-bold font-mono border-2 border-black dark:border-white bg-white dark:bg-black focus:border-primary focus:shadow-brutal outline-none"
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </Card>
                ))}

                {/* Save Button */}
                {hasChanges && (
                    <div className="fixed bottom-20 left-0 right-0 p-4 bg-gradient-to-t from-background-light dark:from-background-dark to-transparent">
                        <Button
                            variant="primary"
                            size="lg"
                            fullWidth
                            onClick={handleSave}
                            disabled={saving}
                        >
                            {saving ? '⏳ Kaydediliyor...' : '💾 KAYDET'}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

function formatForInput(value: number): string {
    return new Intl.NumberFormat('tr-TR').format(value);
}
