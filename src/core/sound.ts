/**
 * Sound Manager - Lightweight audio feedback system using Web Audio API
 */

type SoundType = 'click' | 'pop' | 'cash' | 'error';

class SoundManagerClass {
    private audioContext: AudioContext | null = null;
    private muted: boolean = false;
    private isPlaying: Map<SoundType, boolean> = new Map();

    constructor() {
        // Lazy init - AudioContext will be created on first play
        if (typeof window !== 'undefined') {
            // Do nothing until first interaction (browser autoplay policy)
        }
    }

    private initAudioContext() {
        if (!this.audioContext && typeof window !== 'undefined') {
            this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
    }

    /**
     * Generate and play a sound effect
     */
    play(type: SoundType): void {
        if (this.muted) return;

        // Prevent overlapping sounds of same type (debounce)
        if (this.isPlaying.get(type)) return;

        this.initAudioContext();
        if (!this.audioContext) return;

        this.isPlaying.set(type, true);

        try {
            const { frequency, duration, volume, waveType } = this.getSoundConfig(type);

            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            oscillator.type = waveType;
            oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);

            // Envelope (volume fade)
            gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + duration);

            // Cleanup
            setTimeout(() => {
                this.isPlaying.set(type, false);
            }, duration * 1000);
        } catch (error) {
            console.warn('Sound playback failed:', error);
            this.isPlaying.set(type, false);
        }
    }

    private getSoundConfig(type: SoundType): {
        frequency: number;
        duration: number;
        volume: number;
        waveType: OscillatorType;
    } {
        switch (type) {
            case 'click':
                return { frequency: 800, duration: 0.05, volume: 0.1, waveType: 'sine' };
            case 'pop':
                return { frequency: 400, duration: 0.1, volume: 0.15, waveType: 'sine' };
            case 'cash':
                return { frequency: 1200, duration: 0.2, volume: 0.2, waveType: 'triangle' };
            case 'error':
                return { frequency: 200, duration: 0.15, volume: 0.15, waveType: 'sawtooth' };
            default:
                return { frequency: 440, duration: 0.1, volume: 0.1, waveType: 'sine' };
        }
    }

    setMuted(muted: boolean): void {
        this.muted = muted;
    }

    isMuted(): boolean {
        return this.muted;
    }

    /**
     * Play a compound sound effect (multiple tones in sequence)
     */
    async playCompound(types: SoundType[]): Promise<void> {
        for (const type of types) {
            this.play(type);
            await new Promise((resolve) => setTimeout(resolve, 100));
        }
    }
}

// Singleton instance
export const SoundManager = new SoundManagerClass();
