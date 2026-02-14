import { useMemo } from 'react';
import type { MoodType, HumorLevel } from '@/core/types';
import { getMascotText } from '@/core/humor';

interface CheneMascotProps {
    mood: MoodType;
    humorLevel: HumorLevel;
    intensity?: number;
    showBubble?: boolean;
    size?: 'sm' | 'md' | 'lg';
    onClick?: () => void;
}

// Neo-Brutalist SVG yüz ifadeleri (mood'a göre)
interface FaceExpression {
    eyeScale: number;
    pupilX: number;
    pupilCrossEyed: boolean; // Şaşı bakış (focus için)
    mouthPath: string;
    mouthFill?: string; // RichMode için altın diş
    animationClass: string;
}

function getFaceExpression(mood: MoodType): FaceExpression {
    switch (mood) {
        case 'idle':
            return {
                eyeScale: 1,
                pupilX: 0,
                pupilCrossEyed: false,
                mouthPath: 'M 30 60 Q 50 65, 70 60', // Hafif gülümseme
                animationClass: 'animate-pulse-slow',
            };
        case 'focus':
            return {
                eyeScale: 0.9,
                pupilX: 0,
                pupilCrossEyed: true, // Şaşı bakış
                mouthPath: 'M 40 60 L 60 60', // Düz çizgi
                animationClass: 'animate-jitter',
            };
        case 'calculating':
            return {
                eyeScale: 0.85,
                pupilX: 0,
                pupilCrossEyed: false,
                mouthPath: 'M 35 58 Q 50 68, 65 58', // Açık ağız
                animationClass: 'animate-stress-pulse',
            };
        case 'shocked':
            return {
                eyeScale: 1.5,
                pupilX: 0,
                pupilCrossEyed: false,
                mouthPath: 'M 42 52 Q 50 64, 58 52', // O ağız
                animationClass: 'animate-hard-shake',
            };
        case 'megaShocked':
            return {
                eyeScale: 1.8,
                pupilX: 0,
                pupilCrossEyed: false,
                mouthPath: 'M 40 50 Q 50 68, 60 50', // Büyük O ağız
                animationClass: 'animate-hard-shake drop-shadow-[0_0_20px_rgba(220,38,38,0.8)]',
            };
        case 'microWin':
        case 'richMode':
            return {
                eyeScale: 1.1,
                pupilX: 0,
                pupilCrossEyed: false,
                mouthPath: 'M 28 58 Q 50 70, 72 58', // Geniş gülümseme
                mouthFill: mood === 'richMode' ? '#FCD34D' : undefined, // Altın diş
                animationClass: 'animate-bounce-short',
            };
        case 'broke':
        case 'tiny':
            return {
                eyeScale: 0.7,
                pupilX: 0,
                pupilCrossEyed: false,
                mouthPath: 'M 30 62 Q 45 58, 55 60 Q 65 62, 70 58', // Dalgalı üzgün
                animationClass: 'animate-mascot-sigh',
            };
        case 'relativeTaxed':
            return {
                eyeScale: 0.9,
                pupilX: 5,
                pupilCrossEyed: false,
                mouthPath: 'M 35 60 Q 45 64, 60 58', // Yan bakışlı endişeli
                animationClass: 'animate-jitter',
            };
        case 'suspicious':
            return {
                eyeScale: 0.8,
                pupilX: 4,
                pupilCrossEyed: false,
                mouthPath: 'M 38 60 L 62 60', // İnce çizgi
                animationClass: 'animate-mascot-tilt',
            };
        case 'shareProud':
            return {
                eyeScale: 1,
                pupilX: 0,
                pupilCrossEyed: false,
                mouthPath: 'M 30 60 Q 50 68, 70 60', // Mutlu
                animationClass: 'animate-mascot-pop',
            };
        default:
            return {
                eyeScale: 1,
                pupilX: 0,
                pupilCrossEyed: false,
                mouthPath: 'M 30 60 Q 50 65, 70 60',
                animationClass: 'animate-pulse-slow',
            };
    }
}

// Ter damlası gerekiyor mu?
function shouldShowSweat(mood: MoodType): boolean {
    return ['focus', 'calculating', 'shocked', 'megaShocked', 'relativeTaxed'].includes(mood);
}

export function CheneMascot({
    mood,
    humorLevel,
    showBubble = true,
    size = 'md',
    onClick,
}: CheneMascotProps) {
    const text = useMemo(() => getMascotText(mood, humorLevel), [mood, humorLevel]);
    const expression = useMemo(() => getFaceExpression(mood), [mood]);
    const showSweat = useMemo(() => shouldShowSweat(mood), [mood]);

    const sizeClasses = {
        sm: 'w-20 h-20',
        md: 'w-32 h-32',
        lg: 'w-48 h-48',
    };

    return (
        <div className="flex flex-col items-center gap-3">
            {/* Speech Bubble */}
            {showBubble && (
                <div className="relative bg-white dark:bg-black border-4 border-black dark:border-white shadow-brutal px-4 py-2 max-w-[280px]">
                    <p className="text-sm font-bold text-center text-black dark:text-white uppercase tracking-wide font-mono">
                        {text}
                    </p>
                    {/* Brutal bubble tail */}
                    <div className="absolute -bottom-[8px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-transparent border-t-black dark:border-t-white" />
                </div>
            )}

            {/* Mascot Container */}
            <div className="relative">
                {/* Ter Damlacıkları */}
                {showSweat && (
                    <>
                        {/* Sol ter */}
                        <div className="absolute -left-2 top-1/4 w-2 h-3 bg-cyan-400 rounded-full opacity-80 animate-ping" />
                        <div className="absolute -left-1 top-1/3 w-1.5 h-2 bg-cyan-300 rounded-full opacity-60 animate-pulse" />
                        
                        {/* Sağ ter */}
                        <div className="absolute -right-2 top-1/4 w-2 h-3 bg-cyan-400 rounded-full opacity-80 animate-ping" style={{ animationDelay: '200ms' }} />
                        <div className="absolute -right-1 top-1/2 w-1.5 h-2 bg-cyan-300 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '100ms' }} />
                        
                        {/* Üst ter */}
                        <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-1.5 h-2 bg-cyan-400 rounded-full opacity-70 animate-bounce" />
                    </>
                )}

                {/* SVG Mascot */}
                <div 
                    className={`${sizeClasses[size]} ${expression.animationClass} ${onClick ? 'cursor-pointer hover:scale-110 active:scale-95' : ''} transition-transform`}
                    onClick={onClick}
                >
                    <svg
                        viewBox="0 0 100 100"
                        className="w-full h-full select-none"
                        style={{ filter: 'drop-shadow(0 2px 0 rgba(0, 0, 0, 0.3))' }}
                    >
                        {/* Hard Shadow (Neo-Brutalist offset) */}
                        <rect
                            x="18"
                            y="18"
                            width="64"
                            height="64"
                            rx="0"
                            fill="#000000"
                            opacity="0.3"
                        />

                        {/* Head - Square shape (Neo-Brutalist) */}
                        <rect
                            x="15"
                            y="15"
                            width="64"
                            height="64"
                            rx="0"
                            fill="#FCD34D"
                            stroke="#000000"
                            strokeWidth="4"
                        />

                        {/* Left Eye - Square */}
                        <g transform={`translate(32, 35) scale(${expression.eyeScale})`}>
                            <rect
                                x="-8"
                                y="-8"
                                width="16"
                                height="16"
                                rx="0"
                                fill="#FFFFFF"
                                stroke="#000000"
                                strokeWidth="3"
                            />
                            {/* Pupil - şaşı veya normal */}
                            <circle
                                cx={expression.pupilCrossEyed ? 3 : expression.pupilX}
                                cy="0"
                                r="4"
                                fill="#000000"
                            />
                        </g>

                        {/* Right Eye - Square */}
                        <g transform={`translate(62, 35) scale(${expression.eyeScale})`}>
                            <rect
                                x="-8"
                                y="-8"
                                width="16"
                                height="16"
                                rx="0"
                                fill="#FFFFFF"
                                stroke="#000000"
                                strokeWidth="3"
                            />
                            {/* Pupil - şaşı veya normal */}
                            <circle
                                cx={expression.pupilCrossEyed ? -3 : expression.pupilX}
                                cy="0"
                                r="4"
                                fill="#000000"
                            />
                        </g>

                        {/* Mouth */}
                        <path
                            d={expression.mouthPath}
                            stroke="#000000"
                            strokeWidth="4"
                            strokeLinecap="square"
                            fill={expression.mouthFill || 'none'}
                        />

                        {/* Altın diş (richMode için) */}
                        {expression.mouthFill && (
                            <rect
                                x="46"
                                y="62"
                                width="8"
                                height="4"
                                rx="0"
                                fill="#FCD34D"
                                stroke="#000000"
                                strokeWidth="2"
                            />
                        )}

                        {/* Accessories (mood'a göre) */}
                        {mood === 'megaShocked' && (
                            <>
                                <text x="85" y="18" fontSize="12" className="animate-ping">💥</text>
                                <text x="8" y="22" fontSize="12" className="animate-ping" style={{ animationDelay: '150ms' }}>💥</text>
                            </>
                        )}
                        {mood === 'richMode' && (
                            <text x="40" y="8" fontSize="16">👑</text>
                        )}
                        {mood === 'suspicious' && (
                            <text x="82" y="30" fontSize="14">❓</text>
                        )}
                    </svg>
                </div>
            </div>
        </div>
    );
}
