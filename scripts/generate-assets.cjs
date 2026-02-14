const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateAssets() {
    const resourcesDir = path.join(__dirname, '../resources');
    
    console.log('🎨 PNG varlıkları oluşturuluyor...\n');
    
    try {
        // Icon PNG (1024x1024)
        await sharp(path.join(resourcesDir, 'icon.svg'))
            .resize(1024, 1024)
            .png()
            .toFile(path.join(resourcesDir, 'icon.png'));
        console.log('✅ icon.png oluşturuldu (1024x1024)');
        
        // Splash PNG (2732x2732)
        await sharp(path.join(resourcesDir, 'splash.svg'))
            .resize(2732, 2732)
            .png()
            .toFile(path.join(resourcesDir, 'splash.png'));
        console.log('✅ splash.png oluşturuldu (2732x2732)');
        
        // Dark mode splash (opsiyonel)
        await sharp(path.join(resourcesDir, 'splash.svg'))
            .resize(2732, 2732)
            .png()
            .toFile(path.join(resourcesDir, 'splash-dark.png'));
        console.log('✅ splash-dark.png oluşturuldu (2732x2732)');
        
        console.log('\n✅ Tüm PNG dosyaları hazır!');
        console.log('\n📱 Sonraki adım:');
        console.log('npx capacitor-assets generate --android');
    } catch (error) {
        console.error('❌ Hata:', error.message);
        process.exit(1);
    }
}

generateAssets();
