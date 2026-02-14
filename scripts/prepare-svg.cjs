const fs = require('fs');
const path = require('path');

// Resources klasörünü oluştur
const resourcesDir = path.join(__dirname, '../resources');
if (!fs.existsSync(resourcesDir)) {
    fs.mkdirSync(resourcesDir, { recursive: true });
}

// SVG'yi okuyalım ama emoji olmadan (Android compat)
const svgContent = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <!-- Hard Shadow (Neo-Brutalist offset) -->
  <rect x="18" y="18" width="64" height="64" rx="0" fill="#000000" opacity="0.3"/>
  
  <!-- Head - Square shape (Neo-Brutalist) -->
  <rect x="15" y="15" width="64" height="64" rx="0" fill="#FCD34D" stroke="#000000" stroke-width="4"/>
  
  <!-- Left Eye - Square -->
  <g transform="translate(32, 35) scale(1)">
    <rect x="-8" y="-8" width="16" height="16" rx="0" fill="#FFFFFF" stroke="#000000" stroke-width="3"/>
    <circle cx="0" cy="0" r="4" fill="#000000"/>
  </g>
  
  <!-- Right Eye - Square -->
  <g transform="translate(62, 35) scale(1)">
    <rect x="-8" y="-8" width="16" height="16" rx="0" fill="#FFFFFF" stroke="#000000" stroke-width="3"/>
    <circle cx="0" cy="0" r="4" fill="#000000"/>
  </g>
  
  <!-- Mouth - Happy smile -->
  <path d="M 28 58 Q 50 70, 72 58" stroke="#000000" stroke-width="4" stroke-linecap="square" fill="none"/>
  
  <!-- Gold tooth (richMode indicator) -->
  <rect x="46" y="62" width="8" height="4" rx="0" fill="#FCD34D" stroke="#000000" stroke-width="2"/>
</svg>`;

// Icon için SVG (emoji yok)
fs.writeFileSync(path.join(__dirname, '../resources/icon.svg'), svgContent);
console.log('✅ resources/icon.svg oluşturuldu');

// Splash için SVG (text eklenmiş)
const splashSvg = `<svg viewBox="0 0 100 130" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect x="0" y="0" width="100" height="130" fill="#FFFBEB"/>
  
  <!-- Mascot (centered) -->
  <g transform="translate(0, 15)">
    <!-- Hard Shadow -->
    <rect x="18" y="18" width="64" height="64" rx="0" fill="#000000" opacity="0.3"/>
    
    <!-- Head -->
    <rect x="15" y="15" width="64" height="64" rx="0" fill="#FCD34D" stroke="#000000" stroke-width="4"/>
    
    <!-- Left Eye -->
    <g transform="translate(32, 35) scale(1)">
      <rect x="-8" y="-8" width="16" height="16" rx="0" fill="#FFFFFF" stroke="#000000" stroke-width="3"/>
      <circle cx="0" cy="0" r="4" fill="#000000"/>
    </g>
    
    <!-- Right Eye -->
    <g transform="translate(62, 35) scale(1)">
      <rect x="-8" y="-8" width="16" height="16" rx="0" fill="#FFFFFF" stroke="#000000" stroke-width="3"/>
      <circle cx="0" cy="0" r="4" fill="#000000"/>
    </g>
    
    <!-- Mouth -->
    <path d="M 28 58 Q 50 70, 72 58" stroke="#000000" stroke-width="4" stroke-linecap="square" fill="none"/>
    
    <!-- Gold tooth -->
    <rect x="46" y="62" width="8" height="4" rx="0" fill="#FCD34D" stroke="#000000" stroke-width="2"/>
  </g>
  
  <!-- App Title -->
  <text x="50" y="105" text-anchor="middle" font-family="monospace" font-size="6" font-weight="bold" fill="#000000">ZÜĞÜRDÜN ÇENESİ</text>
  
  <!-- Footer -->
  <text x="50" y="120" text-anchor="middle" font-family="monospace" font-size="3" font-weight="600" fill="#6B7280">v1.0 • RACA LABS</text>
</svg>`;

fs.writeFileSync(path.join(__dirname, '../resources/splash.svg'), splashSvg);
console.log('✅ resources/splash.svg oluşturuldu');

console.log('\n📝 Sonraki adım:');
console.log('Online SVG to PNG converter kullan (1024x1024):');
console.log('1. https://cloudconvert.com/svg-to-png');
console.log('2. resources/icon.svg yükle → 1024x1024 ayarla → indir');
console.log('3. resources/splash.svg yükle → 2732x2732 ayarla → indir');
console.log('4. İndirilen dosyaları resources/ klasörüne icon.png ve splash.png olarak kaydet');
console.log('\nVEYA manuel olarak:');
console.log('npm install sharp && node scripts/generate-assets.js');
