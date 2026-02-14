# Comedy Research: Züğürdün Çenesi

## Methodology
This document captures comedy archetypes and patterns for the app's humor system. No viral images or memes are copied - only emotional archetypes are documented and adapted into original content.

---

## Comedy Archetypes

### 1. Şok ve Dehşet (Shock & Awe)
**Emotion**: Overwhelming surprise at large numbers
**Trigger**: Amount > 50M TL or rich selection
**Pattern**: "Bu kadar mı? Dur bir saniye..."
**Examples**:
- "Bu rakamla... bir şeyler oluyor."
- "Sıfırları saydım. Tekrar saydım. Evet, bu çok."
- "Çenem düştü. Mecazi değil."

### 2. Acı Gerçek (Bitter Truth)
**Emotion**: Humorous acceptance of harsh reality
**Trigger**: Most qty < 1
**Pattern**: Understated disappointment
**Examples**:
- "0.3 ev. Yani salon."
- "Bu parayla 'neredeyse' bir şey alınıyor."
- "Matematik acımasız. Ama dürüst."

### 3. Bütçe Eridi (Budget Meltdown)
**Emotion**: Watching money disappear
**Trigger**: Relative filter active
**Pattern**: Money draining visualization
**Examples**:
- "%15 gitti. Akraba vergisi aktif."
- "Paylaşmak güzel. Cüzdan ağlıyor ama."
- "Sosyal çevre: pahalı bir hobi."

### 4. Akraba Vergisi (Relative Tax)
**Emotion**: Resigned humor about family obligations
**Trigger**: relativeFilterOn = true
**Pattern**: Knowing sarcasm
**Examples**:
- "Akrabalar öğrenince bu para 'yarıya' düşer."
- "Aile: paylaşılan mutluluk, bölünen bütçe."
- "Kuzen geldi. Para gitti."

### 5. Zengin Modu (Rich Mode)
**Emotion**: Playful fantasy of wealth
**Trigger**: Billionaire selected
**Pattern**: Pretend sophistication
**Examples**:
- "Zengin perspektifi açıldı."
- "Bu rakamlarla 'ekonomi' konuşulur."
- "Milyarder gözlüğü takıldı."

### 6. Fiyat Şoku (Price Shock)
**Emotion**: Surprise at how expensive things are
**Trigger**: Low qty on previously "cheap" items
**Pattern**: Nostalgic disappointment
**Examples**:
- "Bir döner kaç olmuş? Hatırlamak istemiyorum."
- "Bu fiyatlarla 'hesaplama' matematiğe hakaret."
- "Eskiden 5 alınırdı. Şimdi... 0.7."

### 7. Hayal Kırıklığı (Disappointment)
**Emotion**: Gentle letdown
**Trigger**: Expectation vs reality gap
**Pattern**: Soft irony
**Examples**:
- "Hayal güzeldi. Matematik bozdu."
- "Bu da... bir başlangıç mı acaba?"
- "Umut var. Para yok."

### 8. Mikro Zafer (Micro Victory)
**Emotion**: Celebrating small wins
**Trigger**: qty between 1-10, positive scenario
**Pattern**: Genuine but modest joy
**Examples**:
- "3 tane! Bu bir şey."
- "Alınabilir. Çok değil ama alınabilir."
- "Küçük ama gurur verici."

### 9. Dev Rakam (Mega Numbers)
**Emotion**: Numbers too big to comprehend
**Trigger**: qty > 1M
**Pattern**: Overwhelmed by scale
**Examples**:
- "2 milyon döner. Görselleştiremedim."
- "Bu kadar eve hangi sokak sığar?"
- "Sayılar artık anlamsız. İyi mi kötü mü bilemedim."

### 10. Şüphe (Suspicion)
**Emotion**: Something seems off
**Trigger**: Price anomaly or extreme kur
**Pattern**: Skeptical observation
**Examples**:
- "Bu fiyatlar... yaratıcı görünüyor."
- "Bir şeyler tam oturmuyor."
- "Kontrol et derim. matematik yalan söylemez."

### 11. Paylaşım Gururu (Share Pride)
**Emotion**: Satisfaction in sharing
**Trigger**: Successful share action
**Pattern**: Casual pride
**Examples**:
- "Paylaşıldı. İbret alsınlar."
- "Çene sosyal medyaya çıktı."
- "Al sana içerik."

### 12. Boş Ekran (Empty State)
**Emotion**: Waiting for input
**Trigger**: No amount entered
**Pattern**: Inviting prompt
**Examples**:
- "Rakam bekliyorum. Hazırım."
- "Bir miktar gir de konuşalım."
- "Çene hazır. Para nerede?"

---

## UI Applications

| Archetype | UI Element | Animation |
|-----------|------------|-----------|
| Şok ve Dehşet | Mascot jaw drop | Confetti + recoil |
| Acı Gerçek | Muted colors, small sticker | Sigh animation |
| Bütçe Eridi | Progress bar draining | Wallet drain anim |
| Akraba Vergisi | Split bar, "%" badge | Static skeptical |
| Zengin Modu | Crown/$ accent, golden tint | Glint shimmer |
| Fiyat Şoku | Red price highlight | Head shake |
| Hayal Kırıklığı | Fade transition | Slow fade |
| Mikro Zafer | Green highlight, checkmark | Pop scale |
| Dev Rakam | Large typography | Trembling text |
| Şüphe | Question mark accent | Eyebrow wiggle |
| Paylaşım Gururu | Badge/checkmark | Wink + pop |
| Boş Ekran | Neutral state | Idle blink |

---

## Punchline Templates

### Structure: [Qty] + [Item] + [Kicker]
- "{qty} {item}. Yani {metaphor}."
- "{qty} {item}... ve daha çok var."
- "Bu parayla {qty} {item}. {observation}."

### Comparative Structure
- "Bir {expensive} yerine {qty} {cheap}."
- "{expensive} fiyatına {qty} {cheap} düşer."

### Scale Comparisons (for large qty)
- "{qty} {item}. Bir mahalle beslenir."
- "{qty} {item}. Fabrika açılır."

---

## Sources & Attribution

This research is based on:
- General observation of Turkish social media humor patterns
- Common financial humor archetypes
- User feedback on money-related apps

**No copyrighted content was copied.** All examples are original compositions following discovered patterns.

---

## Implementation Notes

1. **Three humor levels** allow users to adjust tone
2. **Context-sensitive** - mood matches calculation result
3. **Never mean-spirited** - humor targets situation, not user
4. **Culturally aware** - uses Turkish idioms appropriately
5. **Concise** - all lines fit one speech bubble
