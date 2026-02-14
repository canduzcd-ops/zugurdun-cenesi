import { useMemo } from 'react';
import type { MoodType } from './types';

/**
 * Custom hook to determine mascot mood based on amount and context
 */
export function useMascotMood(
    amountTL: number,
    context?: {
        inputFocused?: boolean;
        isCalculating?: boolean;
        richSelected?: boolean;
    }
): MoodType {
    return useMemo(() => {
        // Priority: context-based moods first
        if (context?.isCalculating) return 'calculating';
        if (context?.inputFocused && amountTL === 0) return 'focus';
        if (context?.richSelected) return 'richMode';

        // Empty or invalid amount
        if (amountTL <= 0 || !isFinite(amountTL)) {
            return context?.inputFocused ? 'focus' : 'idle';
        }

        // Amount-based mood selection (simplified for real-time)
        if (amountTL >= 1_000_000_000) return 'megaShocked';
        if (amountTL >= 100_000_000) return 'shocked';
        if (amountTL >= 10_000_000) return 'microWin';
        if (amountTL >= 1_000_000) return 'microWin';
        if (amountTL >= 100_000) return 'microWin';
        if (amountTL >= 10_000) return 'microWin';
        if (amountTL > 0) return 'tiny';

        return 'idle';
    }, [amountTL, context?.inputFocused, context?.isCalculating, context?.richSelected]);
}
