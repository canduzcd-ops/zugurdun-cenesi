import type { MoodType } from '@/core/types';

// Mood face configurations
export interface FaceConfig {
    eyeScale: number;
    eyeY: number;
    pupilScale: number;
    pupilX: number;
    pupilY: number;
    browAngle: number;
    browY: number;
    mouthPath: string;
    mouthOpen: boolean;
    jawDrop: number;
    blushOpacity: number;
    accessories: ('sparkle' | 'confetti' | 'crown' | 'question' | 'percent')[];
}

const DEFAULT_MOUTH_SMILE = 'M 30 55 Q 50 65, 70 55';
const DEFAULT_MOUTH_FROWN = 'M 30 60 Q 50 50, 70 60';
const MOUTH_OPEN = 'M 35 52 Q 50 70, 65 52';
const MOUTH_TINY = 'M 40 55 L 60 55';
const MOUTH_O = 'M 40 50 Q 50 65, 60 50';

export const FACE_CONFIGS: Record<MoodType, FaceConfig> = {
    idle: {
        eyeScale: 1,
        eyeY: 0,
        pupilScale: 1,
        pupilX: 0,
        pupilY: 0,
        browAngle: 0,
        browY: 0,
        mouthPath: DEFAULT_MOUTH_SMILE,
        mouthOpen: false,
        jawDrop: 0,
        blushOpacity: 0,
        accessories: [],
    },
    focus: {
        eyeScale: 0.9,
        eyeY: 0,
        pupilScale: 1,
        pupilX: 2,
        pupilY: -2,
        browAngle: 5,
        browY: 2,
        mouthPath: MOUTH_TINY,
        mouthOpen: false,
        jawDrop: 0,
        blushOpacity: 0,
        accessories: [],
    },
    calculating: {
        eyeScale: 0.85,
        eyeY: 0,
        pupilScale: 0.8,
        pupilX: 0,
        pupilY: 0,
        browAngle: 10,
        browY: 3,
        mouthPath: DEFAULT_MOUTH_SMILE,
        mouthOpen: true,
        jawDrop: 2,
        blushOpacity: 0,
        accessories: [],
    },
    microWin: {
        eyeScale: 0.8,
        eyeY: -2,
        pupilScale: 1.1,
        pupilX: 0,
        pupilY: 0,
        browAngle: -10,
        browY: -3,
        mouthPath: DEFAULT_MOUTH_SMILE,
        mouthOpen: false,
        jawDrop: 0,
        blushOpacity: 0.3,
        accessories: [],
    },
    shocked: {
        eyeScale: 1.3,
        eyeY: 0,
        pupilScale: 0.7,
        pupilX: 0,
        pupilY: 0,
        browAngle: -15,
        browY: -5,
        mouthPath: MOUTH_O,
        mouthOpen: true,
        jawDrop: 0,
        blushOpacity: 0,
        accessories: ['sparkle'],
    },
    megaShocked: {
        eyeScale: 1.5,
        eyeY: 0,
        pupilScale: 0.5,
        pupilX: 0,
        pupilY: 0,
        browAngle: -20,
        browY: -8,
        mouthPath: MOUTH_OPEN,
        mouthOpen: true,
        jawDrop: 8,
        blushOpacity: 0,
        accessories: ['confetti'],
    },
    broke: {
        eyeScale: 0.7,
        eyeY: 2,
        pupilScale: 0.9,
        pupilX: 0,
        pupilY: 3,
        browAngle: 15,
        browY: 0,
        mouthPath: DEFAULT_MOUTH_FROWN,
        mouthOpen: false,
        jawDrop: 0,
        blushOpacity: 0,
        accessories: [],
    },
    tiny: {
        eyeScale: 0.6,
        eyeY: 0,
        pupilScale: 0.7,
        pupilX: 0,
        pupilY: 0,
        browAngle: 0,
        browY: 0,
        mouthPath: MOUTH_TINY,
        mouthOpen: false,
        jawDrop: 0,
        blushOpacity: 0,
        accessories: [],
    },
    relativeTaxed: {
        eyeScale: 0.9,
        eyeY: 0,
        pupilScale: 1,
        pupilX: 4,
        pupilY: 0,
        browAngle: 0,
        browY: 0,
        mouthPath: 'M 35 55 Q 45 60, 60 52',
        mouthOpen: false,
        jawDrop: 0,
        blushOpacity: 0,
        accessories: ['percent'],
    },
    richMode: {
        eyeScale: 1.1,
        eyeY: 0,
        pupilScale: 1.2,
        pupilX: 0,
        pupilY: 0,
        browAngle: -5,
        browY: -2,
        mouthPath: DEFAULT_MOUTH_SMILE,
        mouthOpen: false,
        jawDrop: 0,
        blushOpacity: 0.2,
        accessories: ['crown'],
    },
    suspicious: {
        eyeScale: 0.75,
        eyeY: 0,
        pupilScale: 1,
        pupilX: 3,
        pupilY: 0,
        browAngle: 8,
        browY: 3,
        mouthPath: MOUTH_TINY,
        mouthOpen: false,
        jawDrop: 0,
        blushOpacity: 0,
        accessories: ['question'],
    },
    shareProud: {
        eyeScale: 1,
        eyeY: 0,
        pupilScale: 1,
        pupilX: 0,
        pupilY: 0,
        browAngle: -5,
        browY: -2,
        mouthPath: DEFAULT_MOUTH_SMILE,
        mouthOpen: false,
        jawDrop: 0,
        blushOpacity: 0.4,
        accessories: [],
    },
};

export function getFaceConfig(mood: MoodType): FaceConfig {
    return FACE_CONFIGS[mood];
}
