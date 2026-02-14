# Mascot Style Steering

## Character: Çenko

### Design Philosophy
- Simple, clean lines
- Emoji-level readability at small sizes
- Premium-minimal aesthetic
- Expressive through subtle changes

### Base Anatomy (SVG Layers)
```
┌─────────────────┐
│     [brows]     │  ← Two separate paths
│   [eyes/pupils] │  ← Two circles + shine
│     [blush]     │  ← Optional circles
│     [mouth]     │  ← Single path
│     [jaw]       │  ← Optional extension
└─────────────────┘
       HEAD: Oval with slight chin emphasis
```

### Color Palette
- Skin: #FFE4C4 (bisque) with #FFDAB9 shadow
- Eyes: #333333 with #FFFFFF shine
- Mouth: #D35400 (outline) / #E74C3C (open)
- Blush: #FFB6C1 at 50% opacity
- Accent: #FF6B35 (primary brand color)

### Layer IDs (for CSS targeting)
- `#mascot-head`
- `#mascot-brow-l`, `#mascot-brow-r`
- `#mascot-eye-l`, `#mascot-eye-r`
- `#mascot-pupil-l`, `#mascot-pupil-r`
- `#mascot-mouth`
- `#mascot-jaw`
- `#mascot-blush-l`, `#mascot-blush-r`

---

## Mood States (12 Total)

### 1. idle
- Eyes: Normal, centered pupils, slow blink
- Brows: Neutral
- Mouth: Small closed smile
- Animation: Blink (3-5s), breathing scale (1.00-1.02)

### 2. focus
- Eyes: Pupils up-right (reading)
- Brows: Slightly furrowed
- Mouth: Straight line
- Animation: Subtle head tilt (-1°/+1°)

### 3. calculating
- Eyes: Fast blink, small pupils
- Brows: Drawn together
- Mouth: Teeth visible, tense
- Animation: Jaw tremble (2-4Hz)

### 4. microWin
- Eyes: Crescent smile shape
- Brows: Raised
- Mouth: Small grin
- Animation: Pop scale (1.00→1.06→1.00)

### 5. shocked
- Eyes: Large, tiny pupils
- Brows: Raised high
- Mouth: "O" shape
- Accessory: 2 small sparkles
- Animation: Recoil (translateY -4px)

### 6. megaShocked
- Eyes: Larger + double shine
- Brows: Very high
- Mouth: Open + jaw dropped
- Accessory: Mini confetti (3-5 pieces)
- Animation: Jaw drop + confetti burst

### 7. broke
- Eyes: Half-closed, pupils down
- Brows: Sad angle
- Mouth: Inverted smile
- Accessory: Dust puff
- Animation: Sigh (translateY +2px)

### 8. tiny
- Eyes: Tiny, squinting
- Brows: Flat
- Mouth: Thin line
- Animation: Small shake-no

### 9. relativeTaxed
- Eyes: Side-looking (skeptical)
- Brows: One up, one down
- Mouth: Side smirk
- Accessory: Small "%" badge
- Animation: None (static skeptical)

### 10. richMode
- Eyes: Sparkly, wide pupils
- Brows: Raised
- Mouth: Confident smile
- Accessory: Tiny crown or "$"
- Animation: Glint shimmer

### 11. suspicious
- Eyes: Narrowed, pupils to side
- Brows: Lowered
- Mouth: Small "tsk"
- Accessory: "?" bubble
- Animation: Eyebrow wiggle

### 12. shareProud
- Eyes: One winking
- Brows: Raised
- Mouth: Smile
- Animation: Wink + badge pop

---

## Speech Bubble

### Design
- Rounded rectangle with tail
- Background: currentTheme surface
- Border: 1px currentTheme border
- Shadow: subtle drop shadow

### Text Rules
- Single line only
- Font: Inter SemiBold
- Size: 14-16px
- Max chars: ~40 (auto-size if needed)
- No ellipsis (text must fit)

### Tail Position
- Points toward mascot's mouth area
- Left or right based on layout

---

## Sticker Pack (12 SVGs)

### Specifications
- ViewBox: 64x64 or 96x96
- Colors: Monochrome + 1 accent
- Style: Same as mascot, simplified

### File Names
```
stickers/
├── idle.svg
├── focus.svg
├── calculating.svg
├── micro-win.svg
├── shocked.svg
├── mega-shocked.svg
├── broke.svg
├── tiny.svg
├── relative-taxed.svg
├── rich-mode.svg
├── suspicious.svg
└── share-proud.svg
```

---

## Animation CSS Classes

```css
.mascot-blink { animation: blink 150ms ease-in-out; }
.mascot-breathe { animation: breathe 2s ease-in-out infinite; }
.mascot-tilt { animation: tilt 300ms ease-out; }
.mascot-tremble { animation: tremble 100ms linear infinite; }
.mascot-pop { animation: pop 200ms ease-out; }
.mascot-recoil { animation: recoil 200ms ease-out; }
.mascot-sigh { animation: sigh 300ms ease-in; }
.mascot-shake { animation: shake 200ms ease-out; }
.mascot-wink { animation: wink 300ms ease-out; }
.mascot-glint { animation: glint 400ms ease-out; }
```

---

## Mood Selection Logic

```typescript
function selectMood(result: CalcResult, context: Context): MoodType {
  // Priority order:
  if (context.shareSuccess) return 'shareProud';
  if (context.isCalculating) return 'calculating';
  if (context.inputFocused) return 'focus';
  if (context.richSelected) return 'richMode';
  if (result.relativeFilterActive) return 'relativeTaxed';
  if (result.hasAnomaly) return 'suspicious';
  
  const avgQty = result.items.reduce((s, i) => s + i.qty, 0) / result.items.length;
  const allTiny = result.items.every(i => i.qty < 0.1);
  const mostBroke = result.items.filter(i => i.qty < 1).length > result.items.length * 0.7;
  
  if (result.amountTL >= 1_000_000_000) return 'megaShocked';
  if (result.amountTL >= 50_000_000) return 'shocked';
  if (allTiny) return 'tiny';
  if (mostBroke) return 'broke';
  if (avgQty >= 1 && avgQty <= 10) return 'microWin';
  
  return 'idle';
}
```
