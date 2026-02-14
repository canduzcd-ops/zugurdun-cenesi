# Store Release Guide

## Pre-Release Checklist

### Code Ready
- [ ] All features implemented
- [ ] All tests passing (`npm test`)
- [ ] No lint errors (`npm run lint`)
- [ ] Production build succeeds (`npm run build`)
- [ ] Capacitor sync successful (`npx cap sync`)

### Documentation Ready
- [ ] Privacy Policy hosted at public URL
- [ ] Terms of Service ready
- [ ] Attributions complete
- [ ] Store metadata finalized (TR + EN)

### Assets Ready
- [ ] App icon (1024x1024)
- [ ] Splash screens
- [ ] Screenshots (6 per platform)
- [ ] Feature graphic (Android)

---

## Android Release

### 1. Version Update
```bash
# Update version in package.json
"version": "1.0.0"
```

Also update in `android/app/build.gradle`:
```gradle
versionCode 1
versionName "1.0.0"
```

### 2. Generate Keystore (First Time Only)
```bash
keytool -genkey -v -keystore zugurd-release.keystore \
  -alias zugurd \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

Store securely! Never commit to git.

### 3. Build Release
```bash
npm run build
npx cap sync android
cd android
./gradlew bundleRelease
```

Output: `android/app/build/outputs/bundle/release/app-release.aab`

### 4. Google Play Console
1. Create app in Console
2. Complete store listing
3. Upload AAB to internal testing
4. Fill Data Safety form (see DATA_SAFETY_PLAY.md)
5. Complete content rating questionnaire
6. Submit for review

---

## iOS Release

### 1. Version Update
In Xcode: General → Version & Build
- Version: 1.0.0
- Build: 1

### 2. Certificates
Required from Apple Developer Portal:
- Distribution certificate
- App Store provisioning profile

### 3. Build Archive
```bash
npm run build
npx cap sync ios
npx cap open ios
```

In Xcode:
1. Product → Archive
2. Distribute App → App Store Connect
3. Upload

### 4. App Store Connect
1. Create app
2. Fill in app information
3. Upload build via Xcode
4. Complete App Privacy (see APP_PRIVACY_APPLE.md)
5. Add screenshots
6. Submit for review

---

## Post-Release

### Monitoring
- Check crash reports daily for first week
- Respond to reviews within 48 hours
- Monitor rating trend

### Updates
- Bug fixes: as needed
- Minor features: monthly
- Major updates: quarterly

---

## Commands Quick Reference

```bash
# Development
npm run dev

# Build
npm run build

# Test
npm test

# Capacitor
npx cap sync
npx cap open android
npx cap open ios

# Android release
cd android && ./gradlew bundleRelease
```
