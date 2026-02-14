# Structure Steering

## Folder Layout
```
/
├── .kiro/
│   ├── steering/          # Project guidelines
│   └── hooks/             # Agent hooks
├── specs/                 # Kiro specs
├── docs/                  # Store & release docs
├── privacy/               # Legal documents
├── src/
│   ├── app/
│   │   ├── components/    # Reusable UI components
│   │   ├── screens/       # Full screen views
│   │   ├── routes/        # Router configuration
│   │   └── mascot/        # Çenko character
│   │       └── stickers/  # SVG stickers
│   ├── core/              # Business logic (pure)
│   ├── data/              # Static data
│   ├── platform/          # Platform abstractions
│   └── styles/            # Global CSS
├── public/                # Static assets
├── scripts/               # Build/verify scripts
└── LICENSES/              # Third-party licenses
```

## Naming Conventions

### Files
- Components: `PascalCase.tsx` (e.g., `HomeScreen.tsx`)
- Utilities: `camelCase.ts` (e.g., `calc.ts`)
- Types: `types.ts` in each module
- Tests: `*.test.ts` alongside source
- SVGs: `kebab-case.svg` (e.g., `mood-shocked.svg`)

### Code
- Components: PascalCase
- Functions: camelCase
- Constants: SCREAMING_SNAKE_CASE
- Types/Interfaces: PascalCase
- Enums: PascalCase with PascalCase members

## Import Rules

### Order (enforced by ESLint)
1. React/external packages
2. Internal absolute paths (@/)
3. Relative paths
4. CSS/styles

### Path Aliases
```typescript
@ → src/
@core → src/core/
@app → src/app/
@data → src/data/
```

## Component Structure
```tsx
// 1. Imports
import { useState } from 'react';
import { Button } from '@app/components';

// 2. Types
interface Props { ... }

// 3. Component
export function MyComponent({ prop }: Props) {
  // hooks
  // handlers
  // render
}

// 4. Subcomponents (if small, otherwise separate file)
```

## Core Module Rules
- Pure functions only, no React hooks
- No side effects
- All functions must be unit tested
- Export from index.ts barrel
