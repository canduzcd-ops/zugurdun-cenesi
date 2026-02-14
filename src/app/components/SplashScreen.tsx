import { CheneMascot } from '../mascot';

export function SplashScreen() {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-amber-50 dark:bg-gray-950">
            {/* Animated Mascot */}
            <div className="animate-bounce">
                <CheneMascot
                    mood="richMode"
                    humorLevel="mid"
                    showBubble={false}
                    size="lg"
                />
            </div>

            {/* App Title - Neo-Brutalist Style */}
            <h1 className="mt-8 text-3xl font-black font-mono uppercase tracking-wider text-black dark:text-white text-center">
                ZÜĞÜRDÜN ÇENESİ
            </h1>

            {/* Loading Indicator */}
            <div className="mt-6 flex gap-2">
                <div className="w-3 h-3 bg-violet-600 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-3 h-3 bg-violet-600 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-3 h-3 bg-violet-600 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>

            {/* Footer - Brand Signature */}
            <div className="absolute bottom-8 text-center">
                <p className="text-sm font-mono font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-widest">
                    v1.0 • RACA LABS
                </p>
            </div>
        </div>
    );
}
