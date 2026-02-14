import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.racalabs.zugurduncenesi',
    appName: 'Züğürdün Çenesi',
    webDir: 'dist',
    server: {
        androidScheme: 'https',
    },
    plugins: {
        Share: {
            // No additional configuration needed
        },
        Preferences: {
            // No additional configuration needed
        },
    },
    android: {
        backgroundColor: '#0F0F1A',
        allowMixedContent: false,
    },
    ios: {
        backgroundColor: '#0F0F1A',
        contentInset: 'automatic',
        scrollEnabled: true,
    },
};

export default config;
