import { useEffect } from 'react';
import { AppRouter } from '@/app/routes';
import { loadSettings } from '@/core/storage';
import { DataProvider } from '@/core/data-context'; // ✅ Yeni eklenen kısım

export function App() {
    // Apply theme on initial load (Mevcut kodun aynısı)
    useEffect(() => {
        loadSettings().then((settings) => {
            const root = document.documentElement;
            if (settings.theme === 'dark') {
                root.classList.add('dark');
            } else if (settings.theme === 'light') {
                root.classList.remove('dark');
            } else {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                root.classList.toggle('dark', prefersDark);
            }
        });

        // Listen for system theme changes (Mevcut kodun aynısı)
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e: MediaQueryListEvent) => {
            loadSettings().then((settings) => {
                if (settings.theme === 'system') {
                    document.documentElement.classList.toggle('dark', e.matches);
                }
            });
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    // ✅ Router'ı DataProvider ile sarmalıyoruz
    return (
        <DataProvider>
            <AppRouter />
        </DataProvider>
    );
}
