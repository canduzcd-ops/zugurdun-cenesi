# Züğürdün Çenesi

> "Parayı yaz, çeneyi çalıştır."

Herhangi bir para miktarıyla neler alınabileceğini hesaplayan eğlenceli bir mobil uygulama.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android-green)
![License](https://img.shields.io/badge/license-Proprietary-red)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/canduzcd-ops/zugurdun-cenesi)

## 🎯 Özellikler

- 💰 **Para Hesaplama**: Girin, hesaplayın, kaç ev/araba/döner alınır görün
- 👑 **Zengin Modu**: Türkiye'nin en zenginleriyle karşılaştırma yapın
- 🎭 **Dinamik SVG Maskot**: Mood'a göre değişen yüz ifadeleri (gözler, ağız, animasyonlar)
- 🎨 **Neo-Brutalist Tasarım**: Sert gölgeler, kalın kenarlıklar, underground fanzin estetiği
- ✏️ **Fiyat Düzenleme**: Kendi fiyatlarınızı girin
- 🌙 **Dark Mode**: Açık, Koyu, Sistem teması
- 📴 **%100 Çevrimdışı**: İnternet gerektirmez, IndexedDB ile yerel depolama
- 🔒 **Gizlilik**: Veri toplanmaz, reklam yok
- 📊 **100+ Ürün**: Çaydan uçağa geniş kategori yelpazesi

## 🚀 Başlangıç

### Gereksinimler

- Node.js 18+
- npm 9+
- Android Studio (Android için)
- Xcode 15+ (iOS için)

### Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusu
npm run dev

# Testler
npm test

# Build
npm run build
```

### Capacitor

```bash
# Web build'i native'e senkronize et
npm run cap:sync

# IDE'de aç
npm run cap:android
npm run cap:ios
```

## 🎨 Neo-Brutalist Tasarım

**Underground fanzin estetiği** - Sert, köşeli, yüksek kontrastlı tasarım:

- **Renkler**: Violet-600, Lime-400, Amber-50, Black
- **Gölgeler**: 4px offset, blur yok → `4px_4px_0px_0px_rgba(0,0,0,1)`
- **Kenarlıklar**: 2-4px kalınlıkta siyah konturler
- **Köşeler**: Yuvarlak yok, tamamen kare (`border-radius: 0`)
- **Font**: Monospace, uppercase, bold
- **Animasyonlar**: jitter, hard-shake, stress-pulse

### SVG Maskot Sistemi

Dinamik yüz ifadeleri mood'a göre değişir:

- **idle**: Hafif gülümseme, yavaş pulse animasyonu
- **focus**: Şaşı bakış, jitter animasyonu
- **calculating**: Açık ağız, stress-pulse
- **shocked**: Kocaman gözler, O ağız, hard-shake
- **richMode**: Altın diş + taç emoji 👑
- **broke**: Dalgalı üzgün ağız, sigh animasyonu

Her mood için özel: `eyeScale`, `pupilX/Y`, `mouthPath`, `animation`

## 📁 Proje Yapısı

```
├── .kiro/
│   ├── steering/       # Proje kuralları
│   └── hooks/          # Agent hook'ları
├── specs/              # Kiro spec dosyaları
├── docs/               # Store ve release dokümanları
├── privacy/            # Gizlilik ve yasal belgeler
├── src/
│   ├── app/
│   │   ├── components/ # UI bileşenleri
│   │   ├── screens/    # Ekranlar
│   │   ├── routes/     # Router
│   │   └── mascot/     # Çenko karakteri
│   ├── core/           # İş mantığı
│   ├── data/           # Statik veriler
│   └── styles/         # CSS
├── scripts/            # Build script'leri
└── public/             # Statik dosyalar
```

## 🧪 Test

```bash
# Tüm testler
npm test

# Watch modunda
npm test -- --watch

# Coverage
npm test -- --coverage
```

## 📱 Release

```bash
# Verification
node scripts/verify.mjs

# Android AAB
cd android && ./gradlew bundleRelease

# iOS Archive
npx cap open ios  # Xcode'da Product → Archive
```

Detaylı rehber için: [docs/STORE_RELEASE.md](docs/STORE_RELEASE.md)

## 📄 Lisans

Tüm hakları saklıdır © 2026 RacaLabs

## 🙏 Atıflar

- Emoji: [Twemoji](https://twemoji.twitter.com/) (CC BY 4.0)
- Font: [Inter](https://rsms.me/inter/) (SIL OFL)
- Zengin Listesi: [Bloomberg Billionaires Index](https://www.bloomberg.com/billionaires/) (snapshot)

Tam liste: [privacy/ATTRIBUTIONS.md](privacy/ATTRIBUTIONS.md)
