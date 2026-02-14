import type { PriceItem, HumorLevel, MoodType, MoodConfig } from './types';

// ============================================
// Mascot Text by Mood
// ============================================

export const MOOD_CONFIGS: Record<MoodType, MoodConfig> = {
    idle: {
        type: 'idle',
        texts: {
            soft: 'Parayı yaz da bir konuşalım.',
            mid: 'Hadi… rakamı dök.',
            hard: 'Rakam gelsin. Gerçekler hazır.',
        },
        animation: 'mascot-breathe',
    },
    focus: {
        type: 'focus',
        texts: {
            soft: 'Tamam… dikkatle bakıyorum.',
            mid: 'Bir dakika… bu kaç sıfır?',
            hard: 'Sıfırlar çoğalınca ben ciddileşiyorum.',
        },
        animation: 'mascot-tilt',
    },
    calculating: {
        type: 'calculating',
        texts: {
            soft: 'Çene ısınıyor…',
            mid: 'Hesap moduna geçtim.',
            hard: 'Bir saniye… gerçekleri çarpıyorum.',
        },
        animation: 'mascot-tremble',
    },
    microWin: {
        type: 'microWin',
        texts: {
            soft: 'Bak bu fena değil.',
            mid: 'Oluyor… az da olsa oluyor.',
            hard: "Nadir bir an: 'oldu'.",
        },
        animation: 'mascot-pop',
    },
    shocked: {
        type: 'shocked',
        texts: {
            soft: 'Ooo… bu bayağı iyi.',
            mid: 'Bu rakamla çene değil, sistem çalışıyor.',
            hard: 'Dur… bu gerçek mi?',
        },
        animation: 'mascot-recoil',
    },
    megaShocked: {
        type: 'megaShocked',
        texts: {
            soft: "Bu parayla 'olay' olursun.",
            mid: 'Çeneyi kaybettim. İnanılmaz.',
            hard: "Bu rakam… toplu taşıma gibi: herkesi taşıyor.",
        },
        animation: 'mascot-recoil',
    },
    broke: {
        type: 'broke',
        texts: {
            soft: 'Üzülme, bu da bir başlangıç.',
            mid: "0.2 ev… yani 'kapı kolu'.",
            hard: 'Burada tek alınan şey… ders.',
        },
        animation: 'mascot-sigh',
    },
    tiny: {
        type: 'tiny',
        texts: {
            soft: 'Bu… biraz minik kaldı.',
            mid: "Bu rakamla ancak 'deneme sürümü'.",
            hard: "Bu parayla 'görmek' ücretsiz.",
        },
        animation: 'mascot-shake',
    },
    relativeTaxed: {
        type: 'relativeTaxed',
        texts: {
            soft: 'Akraba modu… tamam, sakin.',
            mid: 'Akrabalar geldi. Bütçe inceldi.',
            hard: 'Bütçe küçüldü… sebep: sosyal çevre.',
        },
        animation: '',
    },
    richMode: {
        type: 'richMode',
        texts: {
            soft: 'Zengin modu açıldı.',
            mid: 'Tamam… şimdi çene konuşur.',
            hard: 'Bu rakamla ben değil, ekonomi konuşur.',
        },
        animation: 'mascot-glint',
    },
    suspicious: {
        type: 'suspicious',
        texts: {
            soft: 'Bir şeyler… ilginç görünüyor.',
            mid: "Bu fiyatlar biraz 'yaratıcı'.",
            hard: 'Kural 1: matematik yalan söylemez.',
        },
        animation: '',
    },
    shareProud: {
        type: 'shareProud',
        texts: {
            soft: 'Paylaşıldı. İbretlik.',
            mid: 'Al sana içerik.',
            hard: 'Çene çıktı. İnternet düşünsün.',
        },
        animation: 'mascot-wink',
    },
};

// ============================================
// Get Mascot Text
// ============================================

export function getMascotText(mood: MoodType, humorLevel: HumorLevel): string {
    return MOOD_CONFIGS[mood].texts[humorLevel];
}

export function getMoodConfig(mood: MoodType): MoodConfig {
    return MOOD_CONFIGS[mood];
}

// ============================================
// Punchline Generation
// ============================================

const PUNCHLINE_TEMPLATES = {
    // High quantity templates
    high: [
        (name: string, qty: string) => `${qty} ${name}. Bir mahalle beslenir.`,
        (name: string, qty: string) => `${qty} tane ${name}. Fabrika açılır.`,
        (name: string, qty: string) => `${qty} ${name}… ve daha çok var.`,
    ],
    // Medium quantity templates
    medium: [
        (name: string, qty: string) => `${qty} ${name}. Fena değil.`,
        (name: string, qty: string) => `Bu parayla ${qty} ${name}.`,
        (name: string, qty: string) => `${qty} tane ${name}. Yani olur.`,
    ],
    // Low quantity templates (qty < 10)
    low: [
        (name: string, qty: string) => `${qty} ${name}. Az ama öz.`,
        (name: string, qty: string) => `Tam ${qty} ${name}. O kadar.`,
        (name: string, qty: string) => `${qty} ${name}… cesarete ihtiyaç var.`,
    ],
    // Fractional quantity templates (qty < 1)
    fractional: [
        (name: string, qty: string) => `${qty} ${name}. Yani parçası.`,
        (name: string, qty: string) => `${qty} ${name}… hayaller güzel.`,
        (name: string, qty: string) => `${qty} ${name}. Kısmet bu kadar.`,
    ],
};

export function generatePunchlineText(
    item: PriceItem,
    qty: number,
    humorLevel: HumorLevel
): string {
    const qtyDisplay = formatQtyForPunchline(qty);

    let templates: ((name: string, qty: string) => string)[];

    if (qty < 1) {
        templates = PUNCHLINE_TEMPLATES.fractional;
    } else if (qty < 10) {
        templates = PUNCHLINE_TEMPLATES.low;
    } else if (qty < 1000) {
        templates = PUNCHLINE_TEMPLATES.medium;
    } else {
        templates = PUNCHLINE_TEMPLATES.high;
    }

    // Select template based on humor level for variety
    const index = humorLevel === 'soft' ? 0 : humorLevel === 'mid' ? 1 : 2;
    const template = templates[index % templates.length];

    return template(item.name, qtyDisplay);
}

function formatQtyForPunchline(qty: number): string {
    if (qty < 1) {
        return qty.toFixed(2).replace('.', ',');
    }
    if (qty < 10) {
        return qty.toFixed(1).replace('.', ',').replace(',0', '');
    }
    if (qty >= 1_000_000) {
        return `${(qty / 1_000_000).toFixed(1).replace('.', ',')}M`;
    }
    if (qty >= 1_000) {
        return `${(qty / 1_000).toFixed(1).replace('.', ',')}K`;
    }
    return Math.round(qty).toString();
}
