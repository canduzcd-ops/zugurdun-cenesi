import { useState, useEffect, useCallback } from 'react';
import { Card } from '@/app/components';
import { loadSettings, saveSettings } from '@/core/storage';
import type { Settings, HumorLevel, Theme } from '@/core/types';

export function SettingsScreen() {
    const [settings, setSettings] = useState<Settings | null>(null);

    useEffect(() => {
        loadSettings().then(setSettings);
    }, []);

    const updateSetting = useCallback(<K extends keyof Settings>(key: K, value: Settings[K]) => {
        setSettings((prev) => {
            if (!prev) return prev;
            const next = { ...prev, [key]: value };
            // Auto-save
            saveSettings(next);
            return next;
        });
    }, []);

    // Apply theme
    useEffect(() => {
        if (!settings) return;

        const root = document.documentElement;
        if (settings.theme === 'dark') {
            root.classList.add('dark');
        } else if (settings.theme === 'light') {
            root.classList.remove('dark');
        } else {
            // System preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            root.classList.toggle('dark', prefersDark);
        }
    }, [settings?.theme]);

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
                <h1 className="text-2xl font-bold uppercase font-mono tracking-wider">Ayarlar</h1>

                {/* Theme */}
                <Card title="Tema" icon="🎨">
                    <div className="flex gap-2">
                        {(['light', 'dark', 'system'] as Theme[]).map((theme) => (
                            <button
                                key={theme}
                                onClick={() => updateSetting('theme', theme)}
                                className={`flex-1 py-3 rounded-xl font-medium transition-all ${settings.theme === theme
                                    ? 'bg-primary text-white shadow-md'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                                    }`}
                            >
                                {theme === 'light' ? '☀️ Açık' : theme === 'dark' ? '🌙 Koyu' : '🔄 Sistem'}
                            </button>
                        ))}
                    </div>
                </Card>

                {/* Humor Level */}
                <Card title="Mizah Seviyesi" icon="😄">
                    <div className="flex gap-2">
                        {(['soft', 'mid', 'hard'] as HumorLevel[]).map((level) => (
                            <button
                                key={level}
                                onClick={() => updateSetting('humorLevel', level)}
                                className={`flex-1 py-3 rounded-xl font-medium transition-all ${settings.humorLevel === level
                                    ? 'bg-primary text-white shadow-md'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                                    }`}
                            >
                                {level === 'soft' ? 'Yumuşak' : level === 'mid' ? 'Orta' : 'Sert'}
                            </button>
                        ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        {settings.humorLevel === 'soft' && 'Nazik ve cesaretlendirici yorumlar'}
                        {settings.humorLevel === 'mid' && 'Dengeli espri, hafif sarkastik'}
                        {settings.humorLevel === 'hard' && 'Keskin gözlemler, absürt mizah'}
                    </p>
                </Card>

                {/* USD/TRY Rate */}
                <Card title="USD/TRY Kuru" icon="💱">
                    <div className="flex items-center gap-4">
                        <span className="text-gray-500">1 USD =</span>
                        <input
                            type="number"
                            inputMode="decimal"
                            value={settings.usdTry}
                            onChange={(e) => updateSetting('usdTry', parseFloat(e.target.value) || 0)}
                            className="w-24 px-3 py-2 text-center font-bold font-mono border-2 border-black dark:border-white bg-white dark:bg-black focus:border-primary focus:shadow-brutal outline-none"
                        />
                        <span className="text-gray-500">TL</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        Zengin seçiminde USD→TL dönüşümü için kullanılır.
                    </p>
                </Card>

                {/* Formatting Options */}
                <Card title="Biçimlendirme" icon="🔢">
                    <div className="space-y-4">
                        {/* Rounding */}
                        <div className="flex items-center justify-between">
                            <span className="text-gray-700 dark:text-gray-300">Ondalık Basamak</span>
                            <div className="flex gap-1">
                                {([0, 1, 2] as const).map((r) => (
                                    <button
                                        key={r}
                                        onClick={() => updateSetting('rounding', r)}
                                        className={`w-10 h-10 rounded-lg font-medium ${settings.rounding === r
                                            ? 'bg-primary text-white'
                                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                                            }`}
                                    >
                                        {r}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Abbreviate */}
                        <div className="flex items-center justify-between">
                            <span className="text-gray-700 dark:text-gray-300">Kısaltma (K/M/B)</span>
                            <button
                                onClick={() => updateSetting('abbreviate', !settings.abbreviate)}
                                className={`w-16 h-8 transition-colors border-2 border-black dark:border-white ${settings.abbreviate ? 'bg-primary' : 'bg-white dark:bg-black'
                                    }`}
                            >
                                <div
                                    className={`w-6 h-6 bg-accent border-2 border-black transition-transform ${settings.abbreviate ? 'translate-x-9' : 'translate-x-1'
                                        }`}
                                />
                            </button>
                        </div>
                    </div>
                </Card>

                {/* Relative Filter */}
                <Card title="Akraba Vergisi" icon="👨‍👩‍👧‍👦">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-700 dark:text-gray-300">Etkinleştir</span>
                            <button
                                onClick={() => updateSetting('relativeFilterOn', !settings.relativeFilterOn)}
                                className={`w-16 h-8 transition-colors border-2 border-black dark:border-white ${settings.relativeFilterOn ? 'bg-primary' : 'bg-white dark:bg-black'
                                    }`}
                            >
                                <div
                                    className={`w-6 h-6 bg-accent border-2 border-black transition-transform ${settings.relativeFilterOn ? 'translate-x-9' : 'translate-x-1'
                                        }`}
                                />
                            </button>
                        </div>

                        {settings.relativeFilterOn && (
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">Pay Oranı</span>
                                    <span className="text-sm font-semibold text-primary">%{settings.relativeSharePct}</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="50"
                                    value={settings.relativeSharePct}
                                    onChange={(e) => updateSetting('relativeSharePct', parseInt(e.target.value, 10))}
                                    className="w-full accent-primary"
                                />
                                <p className="text-xs text-gray-500">
                                    Paranın %{settings.relativeSharePct}'i akrabalara gidecekmiş gibi hesaplar.
                                </p>
                            </div>
                        )}
                    </div>
                </Card>

                {/* Attributions Link */}
                <a
                    href="#/about"
                    className="block text-center text-sm text-gray-500 hover:text-primary transition-colors"
                >
                    Atıflar ve Lisanslar →
                </a>
            </div>
        </div>
    );
}
