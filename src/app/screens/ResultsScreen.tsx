import { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheneMascot } from '@/app/mascot';
import { Button, Card, ShareReceipt } from '@/app/components';
import { loadSettings } from '@/core/storage';
import { formatCurrency } from '@/core/format';
import { getCategoryById } from '@/core/defaults';
import { shareReceiptImage } from '@/core/share-utils';
import type { CalcResult, Settings, CategoryId, ItemResult } from '@/core/types';

export function ResultsScreen() {
    const navigate = useNavigate();
    const [result, setResult] = useState<CalcResult | null>(null);
    const [settings, setSettings] = useState<Settings | null>(null);
    const [richName, setRichName] = useState<string | null>(null);
    const [sharing, setSharing] = useState(false);
    const shareReceiptRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const savedResult = sessionStorage.getItem('lastResult');
        const savedRichName = sessionStorage.getItem('richName');

        if (!savedResult) {
            navigate('/');
            return;
        }

        setResult(JSON.parse(savedResult));
        setRichName(savedRichName);

        loadSettings().then(setSettings);

        // Clear rich name after reading
        sessionStorage.removeItem('richName');
    }, [navigate]);

    const groupedItems = useGroupedItems(result?.items ?? []);

    const handleShare = useCallback(async () => {
        if (!shareReceiptRef.current || !result) return;

        setSharing(true);
        try {
            await shareReceiptImage(shareReceiptRef.current, {
                title: 'Züğürdün Çenesi',
                text: `${formatCurrency(result.amountTL)} ile neler alinir?`,
                fileName: 'zugurdun-cenesi-receipt.png',
                background: '#f5f5f5',
            });
        } catch (error) {
            console.error('Share failed:', error);
        } finally {
            setSharing(false);
        }
    }, [result]);

    if (!result || !settings) {
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
                    <CheneMascot mood={result.mood} humorLevel={settings.humorLevel} size="md" />
                </div>

                {/* Amount Display */}
                <div className="text-center">
                    <div className="text-3xl font-bold text-primary font-mono">
                        {formatCurrency(result.amountTL)}
                    </div>
                    {richName && (
                        <div className="text-sm text-gray-500 mt-1">
                            ({richName} serveti)
                        </div>
                    )}
                    {result.isRichMode && result.amountAfter !== result.amountTL && (
                        <div className="text-sm text-amber-600 mt-1">
                            Akraba vergisi sonrası: {formatCurrency(result.amountAfter)}
                        </div>
                    )}
                </div>

                {/* Punchlines */}
                <div className="space-y-3">
                    {result.punchlines.map((punchline, index) => (
                        <div
                            key={punchline.item.id}
                            className="flex items-center gap-3 p-4 bg-accent border-4 border-black dark:border-white shadow-brutal animate-slideUp"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <span className="text-2xl">{punchline.item.icon}</span>
                            <div>
                                <div className="font-bold text-lg text-gray-900 dark:text-gray-100">
                                    {punchline.qtyDisplay} {punchline.item.name}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    {punchline.text}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Category Cards */}
                <div className="space-y-4">
                    {Object.entries(groupedItems).map(([categoryId, items]) => {
                        const category = getCategoryById(categoryId as CategoryId);
                        if (!category || items.length === 0) return null;

                        return (
                            <Card
                                key={categoryId}
                                title={category.name}
                                icon={category.icon}
                            >
                                <div className="grid grid-cols-2 gap-3">
                                    {items.map((item) => (
                                        <div
                                            key={item.item.id}
                                            className="flex items-center gap-2 text-sm"
                                        >
                                            <span>{item.item.icon}</span>
                                            <span className="text-gray-600 dark:text-gray-400">{item.item.name}:</span>
                                            <span className="font-semibold text-gray-900 dark:text-gray-100">{item.qtyDisplay}</span>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        );
                    })}
                </div>

                {/* Share Button */}
                <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    onClick={handleShare}
                    disabled={sharing}
                >
                    {sharing ? '🧾 Fiş yazdırılıyor...' : '📤 PAYLAŞ'}
                </Button>

                {/* New Calculation Button */}
                <Button
                    variant="ghost"
                    fullWidth
                    onClick={() => navigate('/')}
                >
                    Yeni Hesaplama
                </Button>
            </div>

            {/* Hidden Share Card */}
            <div className="fixed -left-[9999px]">
                <ShareReceipt
                    ref={shareReceiptRef}
                    result={result}
                    humorLevel={settings.humorLevel}
                />
            </div>
        </div>
    );
}

function useGroupedItems(items: ItemResult[]): Record<CategoryId, ItemResult[]> {
    return items.reduce((acc, item) => {
        const categoryId = item.item.category;
        if (!acc[categoryId]) {
            acc[categoryId] = [];
        }
        acc[categoryId].push(item);
        return acc;
    }, {} as Record<CategoryId, ItemResult[]>);
}
