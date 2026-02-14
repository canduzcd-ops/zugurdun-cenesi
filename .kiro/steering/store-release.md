# Store Release Steering

## App Information

### Identity
- **App Name**: Züğürdün Çenesi
- **Bundle ID**: com.racalabs.zugurduncenesi
- **Category**: Entertainment / Finance (secondary)
- **Age Rating**: 4+ (no objectionable content)

### Versioning
- Format: MAJOR.MINOR.PATCH (semantic)
- Initial: 1.0.0
- Android versionCode: 1 (increment each release)
- iOS build number: 1 (increment each release)

---

## Android (Google Play)

### Pre-Release Checklist
- [ ] Update versionCode and versionName in android/app/build.gradle
- [ ] Generate signed APK/AAB with release keystore
- [ ] Test on 3+ device sizes
- [ ] Test offline functionality
- [ ] Verify share functionality
- [ ] Check all strings are localized

### Keystore Setup
```bash
keytool -genkey -v -keystore zugurd-release.keystore \
  -alias zugurd -keyalg RSA -keysize 2048 -validity 10000
```

Store keystore securely. Never commit to git.

### Build Commands
```bash
npx cap sync android
cd android
./gradlew bundleRelease  # For Play Store (AAB)
./gradlew assembleRelease  # For direct install (APK)
```

### Play Console Submission
1. Create app in Play Console
2. Complete store listing (TR primary, EN secondary)
3. Upload AAB to internal testing
4. Complete Data Safety form
5. Complete Content Rating questionnaire
6. Submit for review

---

## iOS (App Store)

### Pre-Release Checklist
- [ ] Update version and build in Xcode
- [ ] Archive with distribution certificate
- [ ] Test on iPhone and iPad
- [ ] Test offline functionality
- [ ] Verify share functionality
- [ ] Check Info.plist permissions

### Certificates Required
- Apple Developer account ($99/year)
- Distribution certificate
- App Store provisioning profile

### Build Commands
```bash
npx cap sync ios
npx cap open ios  # Opens Xcode
# In Xcode: Product → Archive → Distribute App
```

### App Store Connect Submission
1. Create app in App Store Connect
2. Upload build via Xcode or Transporter
3. Complete App Information
4. Complete App Privacy (Data Not Collected)
5. Add screenshots (see SCREENSHOTS_PLAN.md)
6. Submit for review

---

## Common Submission Requirements

### Screenshots Needed
- iPhone 6.7" (1290 × 2796)
- iPhone 6.5" (1284 × 2778)
- iPhone 5.5" (1242 × 2208)
- iPad Pro 12.9" (2048 × 2732)
- Android Phone (1080 × 1920)
- Android Tablet (1200 × 1920)

### Required Assets
- App Icon: 1024×1024 (no alpha, no rounded corners for source)
- Feature Graphic (Android): 1024×500
- Promo Video (optional): 30s max

### Store Listing Content
- See docs/STORE_METADATA_TR.md
- See docs/STORE_METADATA_EN.md

### Legal Documents
- Privacy Policy URL (host privacy/PRIVACY_POLICY.md)
- Terms of Service URL (optional but recommended)

---

## Post-Release

### Monitoring
- Check crash reports daily for first week
- Respond to reviews within 48 hours
- Monitor ratings trend

### Update Cadence
- Bug fixes: as needed
- Minor features: monthly
- Major updates: quarterly
