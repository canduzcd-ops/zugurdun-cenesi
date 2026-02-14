import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheneMascot } from '@/app/mascot';
import { Button, AmountInput, CategoryChip, PresetChip, Modal } from '@/app/components';
import { calculate } from '@/core/calc';
import { getDefaultPrices, getDefaultCategories } from '@/core/defaults';
import { loadSettings, loadCustomPrices, loadCategoryStates, saveCategoryStates } from '@/core/storage';
import { getRichList, searchRichByName, getRichListMeta, formatRichWorth } from '@/data/rich20';
import type { Settings, Category, CategoryId, PriceItem, RichEntry } from '@/core/types';
import { convertUsdToTl } from '@/core/calc';
import { useMascotMood } from '@/core/useMascotMood';
import { SoundManager } from '@/core/sound';

const PRESETS = [
    { label: '1M', value: 1_000_000 },
    { label: '10M', value: 10_000_000 },
    { label: '100M', value: 100_000_000 },
    { label: '1B', value: 1_000_000_000 },
];

export function HomeScreen() {
    const navigate = useNavigate();
    const [amount, setAmount] = useState(0);
    const [settings, setSettings] = useState<Settings | null>(null);
    const [prices, setPrices] = useState<PriceItem[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [inputFocused, setInputFocused] = useState(false);
    const [showRichPicker, setShowRichPicker] = useState(false);
    const [richSearch, setRichSearch] = useState('');

    // Real-time mascot mood based on amount
    const mood = useMascotMood(amount, { inputFocused });

    // Load data on mount
    useEffect(() => {
        async function load() {
            const [loadedSettings, customPrices, categoryStates] = await Promise.all([
                loadSettings(),
                loadCustomPrices(),
                loadCategoryStates(),
            ]);

            setSettings(loadedSettings);

            // Merge custom prices with defaults
            const mergedPrices = getDefaultPrices().map((p) => ({
                ...p,
                priceTL: customPrices[p.id] ?? p.priceTL,
            }));
            setPrices(mergedPrices);

            // Apply category states
            const mergedCategories = getDefaultCategories().map((c) => ({
                ...c,
                enabled: categoryStates[c.id] ?? c.enabled,
            }));
            setCategories(mergedCategories);
        }
        load();
    }, []);

    const handleCategoryToggle = useCallback(async (categoryId: CategoryId) => {
        setCategories((prev) => {
            // Don't allow disabling if it's the last enabled category
            const enabledCount = prev.filter((c) => c.enabled).length;
            const category = prev.find((c) => c.id === categoryId);
            if (enabledCount === 1 && category?.enabled) {
                return prev;
            }

            const next = prev.map((c) =>
                c.id === categoryId ? { ...c, enabled: !c.enabled } : c
            );

            // Save to storage
            const states: Record<CategoryId, boolean> = {} as Record<CategoryId, boolean>;
            next.forEach((c) => { states[c.id] = c.enabled; });
            saveCategoryStates(states);

            return next;
        });
    }, []);

    const handleCalculate = useCallback(() => {
        if (!settings || amount <= 0) {
            SoundManager.play('error');
            return;
        }

        // Play cash register sound
        SoundManager.play('cash');

        // Store result and navigate
        const result = calculate(amount, prices, settings, categories);
        sessionStorage.setItem('lastResult', JSON.stringify(result));
        sessionStorage.setItem('lastAmount', String(amount));
        navigate('/results');
    }, [amount, prices, settings, categories, navigate]);

    const handleMascotClick = useCallback(() => {
        SoundManager.play('pop');
        // Mascot click animation handled by component itself
    }, []);

    const handleAmountChange = useCallback((newAmount: number) => {
        if (newAmount !== amount) {
            SoundManager.play('click');
        }
        setAmount(newAmount);
    }, [amount]);

    const handleRichSelect = useCallback((entry: RichEntry) => {
        if (!settings) return;

        if (settings.usdTry <= 0) {
            alert('USD/TRY kuru ayarlanmamış. Lütfen Ayarlar\'dan kur bilgisini girin.');
            setShowRichPicker(false);
            navigate('/settings');
            return;
        }

        const tlAmount = convertUsdToTl(entry.netWorthUsdB, settings.usdTry);
        setAmount(tlAmount);
        setShowRichPicker(false);

        // Calculate with rich mode context
        const result = calculate(tlAmount, prices, settings, categories, { richSelected: true });
        sessionStorage.setItem('lastResult', JSON.stringify(result));
        sessionStorage.setItem('lastAmount', String(tlAmount));
        sessionStorage.setItem('richName', entry.name);
        navigate('/results');
    }, [settings, prices, categories, navigate]);

    const filteredRichList = richSearch
        ? searchRichByName(richSearch)
        : getRichList();

    const richMeta = getRichListMeta();

    if (!settings) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-pulse text-primary text-xl">Yükleniyor...</div>
            </div>
        );
    }

    return (
        <div className="main-content safe-area-top px-4 py-6">
            <div className="max-w-lg mx-auto space-y-6">
                {/* Mascot */}
                <div className="flex justify-center">
                    <CheneMascot 
                        mood={mood} 
                        humorLevel={settings.humorLevel} 
                        size="md"
                        onClick={handleMascotClick}
                    />
                </div>

                {/* Amount Input */}
                <AmountInput
                    value={amount}
                    onChange={handleAmountChange}
                    onFocus={() => setInputFocused(true)}
                    onBlur={() => setInputFocused(false)}
                />

                {/* Preset Chips */}
                <div className="flex justify-center gap-2 flex-wrap">
                    {PRESETS.map((preset) => (
                        <PresetChip
                            key={preset.value}
                            label={preset.label}
                            value={preset.value}
                            onClick={(value) => {
                                SoundManager.play('pop');
                                setAmount(value);
                            }}
                        />
                    ))}
                </div>

                {/* Category Chips */}
                <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Kategoriler</h3>
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <CategoryChip
                                key={category.id}
                                category={category}
                                onToggle={handleCategoryToggle}
                            />
                        ))}
                    </div>
                </div>

                {/* Rich Picker Button */}
                <Button
                    variant="outline"
                    fullWidth
                    onClick={() => setShowRichPicker(true)}
                >
                    👑 Zenginlerden Seç
                </Button>

                {/* Calculate Button */}
                <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    onClick={handleCalculate}
                    disabled={amount <= 0}
                >
                    HESAPLA
                </Button>
            </div>

            {/* Rich Picker Modal */}
            <Modal
                isOpen={showRichPicker}
                onClose={() => setShowRichPicker(false)}
                title="Zenginler"
            >
                <div className="space-y-4">
                    {/* Search */}
                    <input
                        type="text"
                        placeholder="🔍 Ara..."
                        value={richSearch}
                        onChange={(e) => setRichSearch(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-black dark:border-white bg-white dark:bg-black focus:border-primary focus:shadow-brutal outline-none font-mono"
                    />

                    {/* List */}
                    <div className="space-y-2 max-h-80 overflow-y-auto">
                        {filteredRichList.map((entry) => (
                            <button
                                key={entry.id}
                                onClick={() => handleRichSelect(entry)}
                                className="w-full flex items-center justify-between px-4 py-3 border-2 border-black dark:border-white hover:bg-amber-100 dark:hover:bg-gray-900 transition-colors text-left font-mono font-bold"
                            >
                                <div>
                                    <span className="text-gray-400 text-sm mr-2">{entry.id}.</span>
                                    <span className="font-medium">{entry.name}</span>
                                </div>
                                <span className="text-primary font-bold">{formatRichWorth(entry.netWorthUsdB)}</span>
                            </button>
                        ))}
                    </div>

                    {/* Source */}
                    <div className="text-xs text-gray-400 text-center pt-2 border-t border-gray-200 dark:border-gray-700">
                        📊 {richMeta.sourceName}<br />
                        {new Date(richMeta.asOfUtc).toLocaleDateString('tr-TR')}
                    </div>
                </div>
            </Modal>
        </div>
    );
}
