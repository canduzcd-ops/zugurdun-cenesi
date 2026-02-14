#!/usr/bin/env node

/**
 * Verification Script for Züğürdün Çenesi
 * Runs pre-release checks
 */

import { execSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

const ROOT = process.cwd();
const REQUIRED_FILES = [
    'package.json',
    'capacitor.config.ts',
    'README.md',
    'privacy/PRIVACY_POLICY.md',
    'privacy/TERMS.md',
    'privacy/ATTRIBUTIONS.md',
    'docs/STORE_METADATA_TR.md',
    'docs/STORE_METADATA_EN.md',
    'docs/APP_PRIVACY_APPLE.md',
    'docs/DATA_SAFETY_PLAY.md',
    'src/core/calc.ts',
    'src/core/calc.test.ts',
    'src/data/rich20.ts',
    'src/app/mascot/CheneMascot.tsx',
];

let passed = 0;
let failed = 0;

function check(name, fn) {
    try {
        const result = fn();
        if (result === true) {
            console.log(`✅ ${name}`);
            passed++;
        } else {
            console.log(`❌ ${name}: ${result}`);
            failed++;
        }
    } catch (error) {
        console.log(`❌ ${name}: ${error.message}`);
        failed++;
    }
}

function run(cmd) {
    try {
        execSync(cmd, { stdio: 'pipe', cwd: ROOT });
        return true;
    } catch {
        return false;
    }
}

console.log('🔍 ZÜĞÜRDÜN ÇENESİ - VERIFICATION\n');
console.log('='.repeat(50));

// 1. Required files
console.log('\n📁 Required Files\n');
REQUIRED_FILES.forEach(file => {
    check(file, () => existsSync(join(ROOT, file)) || `File missing`);
});

// 2. Package.json version
console.log('\n📦 Package Info\n');
check('Version in package.json', () => {
    const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));
    return pkg.version ? true : 'No version found';
});

// 3. TypeScript build
console.log('\n🔨 Build Checks\n');
check('TypeScript compilation', () => run('npx tsc --noEmit') || 'TypeScript errors');
check('Vite build', () => run('npm run build') || 'Build failed');

// 4. Tests
console.log('\n🧪 Tests\n');
check('Unit tests', () => run('npm test -- --run') || 'Tests failed');

// 5. Lint (if configured)
console.log('\n📝 Code Quality\n');
check('ESLint', () => run('npm run lint') || 'Lint errors');

// 6. Capacitor
console.log('\n📱 Capacitor\n');
check('Capacitor config', () => existsSync(join(ROOT, 'capacitor.config.ts')) || 'Config missing');

// Summary
console.log('\n' + '='.repeat(50));
console.log(`\n📊 SUMMARY: ${passed} passed, ${failed} failed\n`);

if (failed === 0) {
    console.log('🚀 ALL CHECKS PASSED - Ready for release!\n');
    process.exit(0);
} else {
    console.log('⚠️ Some checks failed. Please fix before release.\n');
    process.exit(1);
}
