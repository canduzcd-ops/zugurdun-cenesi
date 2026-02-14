import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.racalabs.zugurduncenesi',
    appName: 'Züğürdün Çenesi',
    webDir: 'dist',
    server: {
        androidScheme: 'https',
    },
    plugins: {
        SplashScreen: {
            launchShowDuration: 2000,
            launchAutoHide: true,
            backgroundColor: "#FFFBEB",
            androidScaleType: "CENTER_CROP",
            showSpinner: false,
            androidSpinnerStyle: "large",
            iosSpinnerStyle: "small",
            spinnerColor: "#7C3AED",
            splashFullScreen: true,
            splashImmersive: true,
        },
        Keyboard: {
            resize: "body",
            style: "dark",
            resizeOnFullScreen: true,
        },
        Share: {
            // No additional configuration needed
        },
        Preferences: {
            // No additional configuration needed
        },
    },
    android: {
        backgroundColor: '#FFFBEB',
        allowMixedContent: false,
    },
    ios: {
        backgroundColor: '#FFFBEB',
        contentInset: 'automatic',
        scrollEnabled: true,
    },
};

export default config;
