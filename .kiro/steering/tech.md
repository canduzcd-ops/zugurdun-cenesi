# Tech Steering

## Stack
- **Build**: Vite 5.x
- **Framework**: React 18.x
- **Language**: TypeScript 5.x (strict: true)
- **Styling**: TailwindCSS 3.x
- **Mobile**: Capacitor 6.x
- **Testing**: Vitest + jsdom

## Key Dependencies
```
react-router-dom     # Routing
zod                  # Schema validation
idb-keyval           # Web IndexedDB storage
dom-to-image-more    # Share card generation
@capacitor/core      # Mobile bridge
@capacitor/share     # Native sharing
@capacitor/preferences  # Native storage
```

## Commands
```bash
npm run dev          # Development server
npm run build        # Production build
npm test             # Run tests
npm run lint         # ESLint check
npm run format       # Prettier format
npx cap sync         # Sync to native
npx cap open android # Open Android Studio
npx cap open ios     # Open Xcode
```

## Code Standards
- ESLint: @typescript-eslint/recommended
- Prettier: singleQuote, trailingComma all, tabWidth 2
- No `any` types except explicit escape hatches
- Prefer `const` over `let`
- Functional components only
- Custom hooks for shared logic

## Build Requirements
- `npm run build` must complete without errors
- `npm test` must pass all tests
- Bundle size target: < 500KB gzipped
- First paint: < 1.5s on mid-range device

## Release Process
1. Bump version in package.json
2. Update CHANGELOG.md
3. `npm run build`
4. `npx cap sync`
5. Build in Android Studio / Xcode
6. Test on physical devices
7. Submit to stores
