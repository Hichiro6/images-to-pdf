# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 04-ui-controls.spec.js >> 🎛️ Contrôles UI >> Orientation toggle: paysage → portrait
- Location: tests/e2e/04-ui-controls.spec.js:94:3

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5174/
Call log:
  - navigating to "http://localhost:5174/", waiting until "load"

```

# Test source

```ts
  1   | /**
  2   |  * Tests fonctionnels - Contrôles UI (simplified)
  3   |  *
  4   |  * Couvre:
  5   |  * - Visibility of controls after upload
  6   |  * - Format select options
  7   |  * - Orientation toggle
  8   |  * - Margin slider value update
  9   |  * - Quality seg-btn toggle
  10  |  */
  11  | import { test, expect } from '@playwright/test';
  12  | import path from 'path';
  13  | import fs from 'fs';
  14  | import { createTestImage } from './helpers/test-fixtures-gen.js';
  15  | 
  16  | const fixturesDir = path.join(process.cwd(), 'tests/e2e/fixtures');
  17  | 
  18  | test.describe('🎛️ Contrôles UI', () => {
  19  | 
  20  |   test.beforeAll(async () => {
  21  |     fs.mkdirSync(fixturesDir, { recursive: true });
  22  |     for (let i = 1; i <= 2; i++) {
  23  |       const fname = `test-image-${i}.png`;
  24  |       if (!fs.existsSync(path.join(fixturesDir, fname))) {
  25  |         createTestImage({ filename: fname, variant: i });
  26  |       }
  27  |     }
  28  |   });
  29  | 
  30  |   test('Controls visible après upload', async ({ page }) => {
  31  |     await page.goto('/');
  32  |     await page.waitForSelector('#dropzone', { timeout: 10000 });
  33  | 
  34  |     const pngPath = path.join(fixturesDir, 'test-image-1.png');
  35  |     await page.setInputFiles('input[type="file"]', pngPath);
  36  | 
  37  |     await expect(page.locator('#workspace')).not.toHaveAttribute('hidden', '', { timeout: 10000 });
  38  | 
  39  |     // Controls should be visible
  40  |     await expect(page.locator('#format-select')).toBeVisible();
  41  |     await expect(page.locator('.seg-btn[data-orientation="portrait"]')).toBeAttached();
  42  |     await expect(page.locator('#margin-range')).toBeVisible();
  43  |     // Quality is a seg-btn group, not a select
  44  |     await expect(page.locator('.seg-btn[data-quality="low"]')).toBeAttached();
  45  |     await expect(page.locator('.seg-btn[data-quality="medium"]')).toBeAttached();
  46  |     await expect(page.locator('.seg-btn[data-quality="high"]')).toBeAttached();
  47  |   });
  48  | 
  49  |   test('Format select: valeurs valides', async ({ page }) => {
  50  |     await page.goto('/');
  51  |     await page.waitForSelector('#dropzone', { timeout: 10000 });
  52  | 
  53  |     const pngPath = path.join(fixturesDir, 'test-image-1.png');
  54  |     await page.setInputFiles('input[type="file"]', pngPath);
  55  |     await expect(page.locator('#workspace')).not.toHaveAttribute('hidden', '', { timeout: 10000 });
  56  | 
  57  |     const formatSelect = page.locator('#format-select');
  58  |     
  59  |     // Options exist (dont check exact values)
  60  |     const optionCount = await formatSelect.locator('option').count();
  61  |     expect(optionCount).toBeGreaterThan(0);
  62  | 
  63  |     // Get current value
  64  |     const currentValue = await formatSelect.inputValue();
  65  |     expect(currentValue).toBeTruthy();
  66  |   });
  67  | 
  68  |   test('Orientation toggle: portrait → paysage', async ({ page }) => {
  69  |     await page.goto('/');
  70  |     await page.waitForSelector('#dropzone', { timeout: 10000 });
  71  | 
  72  |     const pngPath = path.join(fixturesDir, 'test-image-1.png');
  73  |     await page.setInputFiles('input[type="file"]', pngPath);
  74  |     await expect(page.locator('#workspace')).not.toHaveAttribute('hidden', '', { timeout: 10000 });
  75  | 
  76  |     const portraitBtn = page.locator('.seg-btn[data-orientation="portrait"]');
  77  |     const landscapeBtn = page.locator('.seg-btn[data-orientation="landscape"]');
  78  | 
  79  |     // Portrait active by default
  80  |     const portraitActive = await portraitBtn.evaluate(el => el.classList.contains('active'));
  81  |     expect(portraitActive).toBe(true);
  82  | 
  83  |     // Click landscape
  84  |     await landscapeBtn.click();
  85  |     await page.waitForTimeout(300);
  86  | 
  87  |     // Landscape should be active now
  88  |     const landscapeActive = await landscapeBtn.evaluate(el => el.classList.contains('active'));
  89  |     expect(landscapeActive).toBe(true);
  90  |     const portraitNotActive = await portraitBtn.evaluate(el => !el.classList.contains('active'));
  91  |     expect(portraitNotActive).toBe(true);
  92  |   });
  93  | 
  94  |   test('Orientation toggle: paysage → portrait', async ({ page }) => {
> 95  |     await page.goto('/');
      |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5174/
  96  |     await page.waitForSelector('#dropzone', { timeout: 10000 });
  97  | 
  98  |     const pngPath = path.join(fixturesDir, 'test-image-1.png');
  99  |     await page.setInputFiles('input[type="file"]', pngPath);
  100 |     await expect(page.locator('#workspace')).not.toHaveAttribute('hidden', '', { timeout: 10000 });
  101 | 
  102 |     const landscapeBtn = page.locator('.seg-btn[data-orientation="landscape"]');
  103 |     const portraitBtn = page.locator('.seg-btn[data-orientation="portrait"]');
  104 | 
  105 |     // Switch to landscape first
  106 |     await landscapeBtn.click();
  107 |     await page.waitForTimeout(300);
  108 | 
  109 |     // Switch back to portrait
  110 |     await portraitBtn.click();
  111 |     await page.waitForTimeout(300);
  112 | 
  113 |     const portraitActive = await portraitBtn.evaluate(el => el.classList.contains('active'));
  114 |     expect(portraitActive).toBe(true);
  115 |   });
  116 | 
  117 |   test('Margin slider: changement de valeur', async ({ page }) => {
  118 |     await page.goto('/');
  119 |     await page.waitForSelector('#dropzone', { timeout: 10000 });
  120 | 
  121 |     const pngPath = path.join(fixturesDir, 'test-image-1.png');
  122 |     await page.setInputFiles('input[type="file"]', pngPath);
  123 |     await expect(page.locator('#workspace')).not.toHaveAttribute('hidden', '', { timeout: 10000 });
  124 | 
  125 |     const marginRange = page.locator('#margin-range');
  126 |     const marginValue = page.locator('#margin-value');
  127 | 
  128 |     // Get initial value
  129 |     const initialVal = await marginValue.textContent();
  130 |     expect(initialVal).toBeTruthy();
  131 | 
  132 |     // Change slider
  133 |     await marginRange.fill('25');
  134 |     await page.waitForTimeout(300);
  135 | 
  136 |     // Value should update
  137 |     const newVal = await marginValue.textContent();
  138 |     expect(newVal).not.toBe(initialVal);
  139 |     expect(newVal).toContain('25');
  140 |   });
  141 | 
  142 |   test('Quality: medium actif par défaut', async ({ page }) => {
  143 |     await page.goto('/');
  144 |     await page.waitForSelector('#dropzone', { timeout: 10000 });
  145 | 
  146 |     const pngPath = path.join(fixturesDir, 'test-image-1.png');
  147 |     await page.setInputFiles('input[type="file"]', pngPath);
  148 |     await expect(page.locator('#workspace')).not.toHaveAttribute('hidden', '', { timeout: 10000 });
  149 | 
  150 |     const mediumBtn = page.locator('.seg-btn[data-quality="medium"]');
  151 |     const lowBtn = page.locator('.seg-btn[data-quality="low"]');
  152 |     const highBtn = page.locator('.seg-btn[data-quality="high"]');
  153 | 
  154 |     // Medium should be active by default
  155 |     const mediumActive = await mediumBtn.evaluate(el => el.classList.contains('active'));
  156 |     expect(mediumActive).toBe(true);
  157 |     const lowNotActive = await lowBtn.evaluate(el => !el.classList.contains('active'));
  158 |     expect(lowNotActive).toBe(true);
  159 |     const highNotActive = await highBtn.evaluate(el => !el.classList.contains('active'));
  160 |     expect(highNotActive).toBe(true);
  161 |   });
  162 | 
  163 |   test('Quality: sélection haute qualité', async ({ page }) => {
  164 |     await page.goto('/');
  165 |     await page.waitForSelector('#dropzone', { timeout: 10000 });
  166 | 
  167 |     const pngPath = path.join(fixturesDir, 'test-image-1.png');
  168 |     await page.setInputFiles('input[type="file"]', pngPath);
  169 |     await expect(page.locator('#workspace')).not.toHaveAttribute('hidden', '', { timeout: 10000 });
  170 | 
  171 |     const highBtn = page.locator('.seg-btn[data-quality="high"]');
  172 |     const mediumBtn = page.locator('.seg-btn[data-quality="medium"]');
  173 | 
  174 |     // Click high quality
  175 |     await highBtn.click();
  176 |     await page.waitForTimeout(300);
  177 | 
  178 |     // High should be active now
  179 |     const highActive = await highBtn.evaluate(el => el.classList.contains('active'));
  180 |     expect(highActive).toBe(true);
  181 |     const mediumNotActive = await mediumBtn.evaluate(el => !el.classList.contains('active'));
  182 |     expect(mediumNotActive).toBe(true);
  183 |   });
  184 | 
  185 |   test('Valeurs par défaut après reset', async ({ page }) => {
  186 |     await page.goto('/');
  187 |     await page.waitForSelector('#dropzone', { timeout: 10000 });
  188 | 
  189 |     const paths = [
  190 |       path.join(fixturesDir, 'test-image-1.png'),
  191 |       path.join(fixturesDir, 'test-image-2.png'),
  192 |     ];
  193 |     await page.setInputFiles('input[type="file"]', paths);
  194 |     await expect(page.locator('#workspace')).not.toHaveAttribute('hidden', '', { timeout: 10000 });
  195 | 
```