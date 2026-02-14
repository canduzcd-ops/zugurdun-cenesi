# Züğürdün Çenesi - Requirements Specification

## Product Overview
**App Name:** Züğürdün Çenesi  
**Slogan:** "Parayı yaz, çeneyi çalıştır."  
**Purpose:** Humorous purchasing power calculator showing what absurd quantities of items you can buy with any amount of money.

---

## Core Requirements

### R1: Amount Input
- **R1.1** User can enter any positive number as TL amount
- **R1.2** Preset chips for common amounts (1M, 10M, 100M, 1B TL)
- **R1.3** Clear button to reset input
- **R1.4** Input validates: empty/0/negative shows warning, blocks calculation

### R2: Category System
- **R2.1** 7 categories: Büyük, Gıda, Ulaşım, Teknoloji, Eğlence, Züğürt Lüksleri
- **R2.2** Toggle individual categories on/off
- **R2.3** Category state persists across sessions
- **R2.4** At least one category must be active

### R3: Rich Picker
- **R3.1** Embedded list of top 20 billionaires with USD(B) net worth
- **R3.2** Search functionality to filter by name
- **R3.3** Selecting billionaire converts USD → TL using settings.usdTry
- **R3.4** If usdTry <= 0, show warning and redirect to Settings
- **R3.5** Source attribution displayed (Bloomberg Billionaires Index)

### R4: Calculation Engine
- **R4.1** qty = amountAfter / priceTL for each enabled item
- **R4.2** If relativeFilterOn: amountAfter = amount * (1 - sharePct/100)
- **R4.3** qty < 1 always shows minimum 2 decimal places
- **R4.4** qty >= 1 respects settings.rounding (0/1/2 decimals)
- **R4.5** If settings.abbreviate: use K/M/B suffixes

### R5: Results Display
- **R5.1** Top 3 "punchlines" - most impactful items
- **R5.2** Category cards with all items and quantities
- **R5.3** Mascot reaction based on result magnitude
- **R5.4** Share button generates card image

### R6: Share Functionality
- **R6.1** Native: Use @capacitor/share for iOS/Android
- **R6.2** Web fallback: Generate image via dom-to-image-more, trigger download
- **R6.3** Share card includes: amount, top results, mascot, branding
- **R6.4** Works 100% offline (no external resources)

### R7: Price Editor
- **R7.1** View all prices organized by category
- **R7.2** Edit individual prices with validation (> 0)
- **R7.3** Save changes persist to storage
- **R7.4** Reset to defaults option
- **R7.5** Changes affect future calculations immediately

### R8: Settings
- **R8.1** usdTry: number input (default 30), manual entry only
- **R8.2** humorLevel: soft | mid | hard (affects mascot dialog)
- **R8.3** rounding: 0 | 1 | 2 decimal places
- **R8.4** abbreviate: boolean for K/M/B formatting
- **R8.5** relativeFilterOn: boolean for "akraba vergisi"
- **R8.6** relativeSharePct: 0-100 slider (default 15)
- **R8.7** theme: light | dark | system (3 themes)
- **R8.8** All settings persist to storage

### R9: Mascot ("Çenko")
- **R9.1** 12 mood states with distinct expressions
- **R9.2** Each mood has 3 text variants (soft/mid/hard)
- **R9.3** Mood selected based on calculation results
- **R9.4** CSS/SVG animations, no external dependencies
- **R9.5** Speech bubble with single-line text

### R10: Offline-First
- **R10.1** App functions 100% without internet
- **R10.2** All data embedded in bundle
- **R10.3** No external API calls required
- **R10.4** Prices and settings stored locally

---

## Acceptance Criteria

| ID | Criterion | Test Method |
|----|-----------|-------------|
| AC1 | Empty/0/negative input shows warning | Manual + Unit |
| AC2 | usdTry <= 0 blocks rich selection with redirect | Manual |
| AC3 | Price changes persist after app restart | Integration |
| AC4 | Settings apply immediately to all screens | Manual |
| AC5 | Share generates valid image offline | Manual |
| AC6 | Mascot mood matches result magnitude | Unit + Manual |
| AC7 | All 12 stickers render correctly | Visual |
| AC8 | 3 themes readable and consistent | Visual |

---

## Edge Cases

1. **Zero Amount**: Show mascot in "suspicious" mood, block calculation
2. **Negative Amount**: Same as zero, with "negatif mi?" hint
3. **Extremely Large (>1 trillion TL)**: Show "megaShocked" mood
4. **All Categories Off**: Prevent, force at least one category
5. **usdTry = 0**: Block rich picker, redirect to settings
6. **Price = 0**: Validation prevents saving, show error
7. **Floating Point Precision**: Round display, keep precision in calc
8. **Very Long Billionaire (search)**: Truncate in UI, full in selection

---

## Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Copyright (viral images) | Medium | High | 100% original mascot, no copied assets |
| Store Rejection (humor) | Low | High | Clean humor guidelines, no offensive content |
| Offline Storage Limits | Low | Low | Minimal data footprint (<1MB) |
| Performance (animations) | Low | Medium | CSS/SVG only, no heavy libraries |
| Outdated Rich Data | Certain | Low | Source disclosure, snapshot date shown |

---

## Test Coverage

### Unit Tests (calc.test.ts)
1. Normal calculation: amount / price = correct qty
2. qty < 1: formatted with 2+ decimals
3. Category filter: excluded categories not in results
4. Quick mode (only car): single category output
5. Quick mode (exclude home): one category excluded
6. Relative filter: reduces amount correctly
7. USD→TL: billionaire worth * usdTry = correct TL
8. Abbreviate: large numbers show K/M/B

### Integration Tests
- Settings persistence across reload
- Price edit persistence
- Storage abstraction (web/native)

### Visual Tests
- All 12 mood states render
- 3 themes applied correctly
- Responsive layout (mobile-first)
