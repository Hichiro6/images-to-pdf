# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 05-i18n.spec.js >> 🌐 Internationalisation >> Changement de langue: → EN
- Location: tests/e2e/05-i18n.spec.js:42:3

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5174/
Call log:
  - navigating to "http://localhost:5174/", waiting until "load"

```

# Test source

```ts
  1   | /**
  2   |  * Tests fonctionnels - Internationalisation (i18n)
  3   |  *
  4   |  * Couvre:
  5   |  * - Changement de langue via le dropdown
  6   |  * - Persistance dans localStorage (après page.goto)
  7   |  * - Attribut html.lang mis à jour
  8   |  * - Traductions appliquées
  9   |  */
  10  | import { test, expect } from '@playwright/test';
  11  | import path from 'path';
  12  | import fs from 'fs';
  13  | import { createTestImage } from './helpers/test-fixtures-gen.js';
  14  | 
  15  | const fixturesDir = path.join(process.cwd(), 'tests/e2e/fixtures');
  16  | 
  17  | test.describe('🌐 Internationalisation', () => {
  18  | 
  19  |   test.beforeAll(async () => {
  20  |     fs.mkdirSync(fixturesDir, { recursive: true });
  21  |     for (let i = 1; i <= 2; i++) {
  22  |       const fname = `test-image-${i}.png`;
  23  |       if (!fs.existsSync(path.join(fixturesDir, fname))) {
  24  |         createTestImage({ filename: fname, variant: i });
  25  |       }
  26  |     }
  27  |   });
  28  | 
  29  |   test('Dropdown de langue présent dans le header', async ({ page }) => {
  30  |     await page.goto('/');
  31  |     await page.waitForSelector('#lang-selector', { timeout: 10000 });
  32  | 
  33  |     // Lang selector container should exist
  34  |     const langContainer = page.locator('#lang-selector');
  35  |     await expect(langContainer).toBeVisible();
  36  | 
  37  |     // Dropdown should be present
  38  |     const select = langContainer.locator('select');
  39  |     await expect(select).toBeVisible();
  40  |   });
  41  | 
  42  |   test('Changement de langue: → EN', async ({ page }) => {
> 43  |     await page.goto('/');
      |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5174/
  44  |     await page.waitForSelector('#lang-selector', { timeout: 10000 });
  45  | 
  46  |     const select = page.locator('#lang-selector select');
  47  | 
  48  |     // Change to English
  49  |     await select.selectOption('en');
  50  |     await page.waitForTimeout(300);
  51  | 
  52  |     // Language should update
  53  |     const currentValue = await select.inputValue();
  54  |     expect(currentValue).toBe('en');
  55  | 
  56  |     // HTML lang attribute should update
  57  |     await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  58  |   });
  59  | 
  60  |   test('Changement de langue: → DE', async ({ page }) => {
  61  |     await page.goto('/');
  62  |     await page.waitForSelector('#lang-selector', { timeout: 10000 });
  63  | 
  64  |     const select = page.locator('#lang-selector select');
  65  | 
  66  |     // Change to German
  67  |     await select.selectOption('de');
  68  |     await page.waitForTimeout(300);
  69  | 
  70  |     await expect(select).toHaveValue('de');
  71  |     await expect(page.locator('html')).toHaveAttribute('lang', 'de');
  72  |   });
  73  | 
  74  |   test('Traductions: texte bouton change après changement de langue', async ({ page }) => {
  75  |     await page.goto('/');
  76  |     await page.waitForSelector('#lang-selector', { timeout: 10000 });
  77  | 
  78  |     const select = page.locator('#lang-selector select');
  79  | 
  80  |     // Set to English first
  81  |     await select.selectOption('en');
  82  |     await page.waitForTimeout(300);
  83  | 
  84  |     const btnConvert = page.locator('#btn-convert');
  85  |     const enText = await btnConvert.textContent();
  86  | 
  87  |     // Change to German
  88  |     await select.selectOption('de');
  89  |     await page.waitForTimeout(300);
  90  | 
  91  |     const deText = await btnConvert.textContent();
  92  | 
  93  |     // Texts should be different (translation applied)
  94  |     expect(enText).toBeTruthy();
  95  |     expect(deText).toBeTruthy();
  96  |     expect(enText).not.toBe(deText);
  97  |   });
  98  | 
  99  |   test('Langue persiste après rechargement de page', async ({ page }) => {
  100 |     // Navigate first (avoid localStorage SecurityError on about:blank)
  101 |     await page.goto('/');
  102 |     await page.waitForSelector('#lang-selector', { timeout: 10000 });
  103 | 
  104 |     const select = page.locator('#lang-selector select');
  105 |     await select.selectOption('en');
  106 |     await page.waitForTimeout(300);
  107 | 
  108 |     // Reload page
  109 |     await page.reload({ waitUntil: 'networkidle' });
  110 |     await page.waitForSelector('#lang-selector', { timeout: 10000 });
  111 | 
  112 |     // Language should still be English (persisted in localStorage)
  113 |     const selectAfterReload = page.locator('#lang-selector select');
  114 |     await expect(selectAfterReload).toHaveValue('en');
  115 |     await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  116 |   });
  117 | 
  118 |   test('HTML lang attribute synchronisé avec le dropdown', async ({ page }) => {
  119 |     await page.goto('/');
  120 |     await page.waitForSelector('#lang-selector', { timeout: 10000 });
  121 | 
  122 |     const select = page.locator('#lang-selector select');
  123 | 
  124 |     // Test multiple languages
  125 |     for (const lang of ['en', 'de', 'es', 'pt']) {
  126 |       await select.selectOption(lang);
  127 |       await page.waitForTimeout(200);
  128 | 
  129 |       await expect(page.locator('html')).toHaveAttribute('lang', lang);
  130 |     }
  131 |   });
  132 | 
  133 |   test('Toutes les langues disponibles dans le dropdown', async ({ page }) => {
  134 |     await page.goto('/');
  135 |     await page.waitForSelector('#lang-selector', { timeout: 10000 });
  136 | 
  137 |     const select = page.locator('#lang-selector select');
  138 |     const optionCount = await select.locator('option').count();
  139 |     
  140 |     // Should have multiple options (at least: en, fr, de, es, pt, nl, it)
  141 |     expect(optionCount).toBeGreaterThanOrEqual(7);
  142 |   });
  143 | 
```