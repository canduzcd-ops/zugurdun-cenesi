---
name: docs-sync
trigger: fileEdit
pattern: "{docs/**/*.md,specs/**/*.md}"
---

# Documentation Sync Hook

When documentation files are modified:

1. If `specs/` files change:
   ```
   📝 Spec updated. Check if README.md needs corresponding updates.
   ```

2. If store metadata changes (`STORE_METADATA_*.md`):
   ```
   📝 Store metadata updated. Verify both TR and EN versions are in sync.
   ```

3. If privacy documents change:
   ```
   📝 Legal document updated. Ensure consistency across:
   - privacy/PRIVACY_POLICY.md
   - privacy/TERMS.md
   - docs/APP_PRIVACY_APPLE.md
   - docs/DATA_SAFETY_PLAY.md
   ```

4. Check for broken internal links in modified files.

## Purpose
Keep documentation consistent across the project.
