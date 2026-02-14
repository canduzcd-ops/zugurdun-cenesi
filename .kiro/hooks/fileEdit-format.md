---
name: format-on-edit
trigger: fileEdit
pattern: src/**/*.{ts,tsx}
---

# Format on Edit Hook

When any file matching `src/**/*.{ts,tsx}` is edited:

1. Run Prettier to format the file:
   ```bash
   npx prettier --write {filePath}
   ```

2. Run ESLint with auto-fix:
   ```bash
   npx eslint {filePath} --fix
   ```

3. If there are unfixable lint errors, report them to the user.

## Purpose
Ensure consistent code formatting across the codebase without manual intervention.
