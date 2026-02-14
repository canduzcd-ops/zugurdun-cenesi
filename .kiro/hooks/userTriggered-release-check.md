---
name: release-check
trigger: userTriggered
command: release-check
---

# Release Readiness Check

When user triggers "release-check", perform comprehensive verification:

## 1. Version Check
```bash
# Read version from package.json
cat package.json | grep '"version"'
```
- Verify version follows semver
- Check if version was bumped since last release

## 2. Build Verification
```bash
npm run build
```
- Must complete without errors
- Check bundle size (target: < 500KB gzipped)

## 3. Test Verification
```bash
npm test -- --run
```
- All tests must pass

## 4. Lint Check
```bash
npm run lint
```
- No lint errors allowed

## 5. Capacitor Sync
```bash
npx cap sync
```
- Must complete successfully

## 6. Documentation Check
Verify existence and completeness of:
- [ ] privacy/PRIVACY_POLICY.md
- [ ] privacy/TERMS.md
- [ ] privacy/ATTRIBUTIONS.md
- [ ] docs/STORE_METADATA_TR.md
- [ ] docs/STORE_METADATA_EN.md
- [ ] docs/APP_PRIVACY_APPLE.md
- [ ] docs/DATA_SAFETY_PLAY.md
- [ ] README.md with current version

## 7. Asset Check
- [ ] App icon exists (1024x1024)
- [ ] Splash screens generated
- [ ] All sticker SVGs present (12 files)

## 8. Store Metadata Validation
- Title length: ≤ 30 chars
- Subtitle length: ≤ 30 chars
- Description length: 80-4000 chars

## Output
Generate release readiness report:
```
📱 RELEASE CHECK REPORT
========================
Version: X.Y.Z
Build: ✅ Passed
Tests: ✅ 8/8 Passed
Lint: ✅ Clean
Docs: ✅ Complete
Assets: ✅ Present

READY FOR RELEASE: ✅
```
