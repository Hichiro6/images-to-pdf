# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 02-reorder.spec.js >> 🔄 Réorganisation et Sélection >> Clic sur carte toggle la sélection
- Location: tests/e2e/02-reorder.spec.js:115:3

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5174/
Call log:
  - navigating to "http://localhost:5174/", waiting until "load"

```

# Test source

```ts
  1   | /**
  2   |  * Test utilities for Images to PDF E2E tests
  3   |  * Fournit des helpers communs pour uploader des fichiers de test
  4   |  * et attendre que l'interface devienne prête.
  5   |  */
  6   | 
  7   | import path from 'path';
  8   | 
  9   | const fixturesDir = path.join(process.cwd(), 'tests/e2e/fixtures');
  10  | 
  11  | /**
  12  |  * Upload a test image and wait for workspace to appear.
  13  |  * @param {import('@playwright/test').Page} page
  14  |  * @param {string} filename - fixture filename (default: test-image.png)
  15  |  * @returns {Promise<{filename: string, count: number}>}
  16  |  */
  17  | export async function uploadTestImage(page, filename = 'test-image.png') {
> 18  |   await page.goto('/');
      |              ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5174/
  19  | 
  20  |   // Wait for dropzone to be visible (initial state)
  21  |   await page.waitForSelector('#dropzone', { timeout: 10000 });
  22  | 
  23  |   const filePath = path.join(fixturesDir, filename);
  24  |   await page.setInputFiles('input[type="file"]', filePath);
  25  | 
  26  |   // Wait for workspace to appear
  27  |   await page.waitForSelector('#workspace:not([hidden])', { timeout: 10000 });
  28  | 
  29  |   // Wait for grid to render
  30  |   await page.waitForSelector('#images-grid .page-card', { timeout: 10000 });
  31  | 
  32  |   const count = await page.locator('#images-grid .page-card').count();
  33  | 
  34  |   return {
  35  |     filename: path.basename(filename),
  36  |     count,
  37  |   };
  38  | }
  39  | 
  40  | /**
  41  |  * Wait for image cards to render after any change
  42  |  * @param {import('@playwright/test').Page} page
  43  |  * @param {number} expectedCount - expected number of cards (optional)
  44  |  * @param {number} timeout - timeout in ms (default: 10000)
  45  |  */
  46  | export async function waitForCardsRender(page, expectedCount = undefined, timeout = 10000) {
  47  |   // Wait for at least one card to be present
  48  |   await page.waitForFunction(
  49  |     () => document.querySelectorAll('.page-card').length > 0,
  50  |     null,
  51  |     { timeout }
  52  |   );
  53  | 
  54  |   if (expectedCount !== undefined) {
  55  |     // Wait for card count to stabilize
  56  |     await page.waitForFunction(
  57  |       (expected) => {
  58  |         const count = document.querySelectorAll('.page-card').length;
  59  |         return new Promise((resolve) => {
  60  |           setTimeout(() => {
  61  |             resolve(document.querySelectorAll('.page-card').length === expected);
  62  |           }, 300);
  63  |         });
  64  |       },
  65  |       expectedCount,
  66  |       { timeout }
  67  |     );
  68  |   }
  69  | }
  70  | 
  71  | /**
  72  |  * Perform drag-and-drop reordering of image cards
  73  |  * @param {import('@playwright/test').Page} page
  74  |  * @param {number} fromIndex - source index (0-based)
  75  |  * @param {number} toIndex - target index (0-based)
  76  |  */
  77  | export async function reorderImages(page, fromIndex, toIndex) {
  78  |   const cards = page.locator('#images-grid .page-card');
  79  |   const fromCard = cards.nth(fromIndex);
  80  |   const toCard = cards.nth(toIndex);
  81  | 
  82  |   // Get bounding boxes
  83  |   const fromBox = await fromCard.boundingBox();
  84  |   const toBox = await toCard.boundingBox();
  85  | 
  86  |   if (!fromBox || !toBox) {
  87  |     throw new Error('Could not get bounding boxes for drag-and-drop');
  88  |   }
  89  | 
  90  |   // Perform drag
  91  |   await page.mouse.move(fromBox.x + fromBox.width / 2, fromBox.y + fromBox.height / 2);
  92  |   await page.mouse.down();
  93  |   await page.mouse.move(toBox.x + toBox.width / 2, toBox.y + toBox.height / 2);
  94  |   await page.mouse.up();
  95  | 
  96  |   // Wait for re-render
  97  |   await page.waitForTimeout(500);
  98  | }
  99  | 
  100 | /**
  101 |  * Get a fixture file path
  102 |  */
  103 | export function getFixturePath(filename) {
  104 |   return path.join(fixturesDir, filename);
  105 | }
  106 | 
  107 | /**
  108 |  * Select or deselect an image card by index
  109 |  * @param {import('@playwright/test').Page} page
  110 |  * @param {number} index - card index (0-based)
  111 |  * @param {boolean} select - true to select, false to deselect
  112 |  */
  113 | export async function toggleImageSelection(page, index, select = true) {
  114 |   const checkbox = page.locator(`#images-grid .page-card`).nth(index).locator('.page-card__checkbox');
  115 |   const isChecked = await checkbox.isChecked();
  116 | 
  117 |   if (isChecked !== select) {
  118 |     await checkbox.click();
```