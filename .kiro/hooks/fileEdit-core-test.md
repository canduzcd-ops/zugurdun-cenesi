---
name: core-test-sync
trigger: fileEdit
pattern: src/core/**/*.ts
exclude: src/core/**/*.test.ts
---

# Core Test Sync Hook

When any file in `src/core/` (excluding test files) is modified:

1. Check if corresponding test file exists:
   - For `calc.ts` → `calc.test.ts`
   - For `format.ts` → `format.test.ts`

2. If test file exists, remind developer:
   ```
   ⚠️ Core logic changed in {fileName}. 
   Please verify tests in {testFileName} are still valid and passing.
   Run: npm test
   ```

3. If test file does NOT exist and the file contains exported functions:
   ```
   ⚠️ {fileName} has no test file. Consider creating {testFileName}.
   ```

4. Optionally, run tests automatically:
   ```bash
   npm test -- --run {testPattern}
   ```

## Purpose
Ensure calculation logic changes are always validated by tests.
