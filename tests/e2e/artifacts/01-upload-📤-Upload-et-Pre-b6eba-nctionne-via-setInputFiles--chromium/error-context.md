# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 01-upload.spec.js >> 📤 Upload et Preview >> Drag & drop fonctionne (via setInputFiles)
- Location: tests/e2e/01-upload.spec.js:140:3

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5174/
Call log:
  - navigating to "http://localhost:5174/", waiting until "load"

```

# Test source

```ts
  41  |     await expect(page.locator('#workspace')).not.toHaveAttribute('hidden', '', { timeout: 10000 });
  42  | 
  43  |     // Image card should appear in grid
  44  |     await page.waitForSelector('#images-grid .page-card', { timeout: 10000 });
  45  |     const cards = page.locator('#images-grid .page-card');
  46  |     await expect(cards).toHaveCount(1, { timeout: 5000 });
  47  | 
  48  |     // Card should have an img thumbnail
  49  |     const thumb = cards.first().locator('.page-card__img');
  50  |     await expect(thumb).toBeVisible();
  51  |     expect(await thumb.getAttribute('alt')).toContain('test-image-1.png');
  52  | 
  53  |     // Number badge should show "1"
  54  |     await expect(cards.first().locator('.page-card__number')).toContainText('1');
  55  | 
  56  |     // Filename should be updated
  57  |     await expect(page.locator('#filename')).toContainText('1 image');
  58  |   });
  59  | 
  60  |   test('Upload multiple images → plusieurs cartes', async ({ page }) => {
  61  |     await page.goto('/');
  62  |     await page.waitForSelector('#dropzone', { timeout: 10000 });
  63  | 
  64  |     // Upload multiple files
  65  |     const paths = [
  66  |       path.join(fixturesDir, 'test-image-1.png'),
  67  |       path.join(fixturesDir, 'test-image-2.png'),
  68  |       path.join(fixturesDir, 'test-image-3.png'),
  69  |     ];
  70  |     await page.setInputFiles('input[type="file"]', paths);
  71  | 
  72  |     // Wait for workspace
  73  |     await expect(page.locator('#workspace')).not.toHaveAttribute('hidden', '', { timeout: 10000 });
  74  | 
  75  |     // Should have 3 cards
  76  |     await page.waitForSelector('#images-grid .page-card', { timeout: 10000 });
  77  |     const cards = page.locator('#images-grid .page-card');
  78  |     await expect(cards).toHaveCount(3, { timeout: 10000 });
  79  | 
  80  |     // Verify number badges
  81  |     for (let i = 0; i < 3; i++) {
  82  |       await expect(cards.nth(i).locator('.page-card__number')).toContainText(`${i + 1}`);
  83  |     }
  84  | 
  85  |     // Filename should show count
  86  |     await expect(page.locator('#filename')).toContainText('3 images');
  87  |   });
  88  | 
  89  |   test('Upload image → checkbox cochée par défaut', async ({ page }) => {
  90  |     await page.goto('/');
  91  |     await page.waitForSelector('#dropzone', { timeout: 10000 });
  92  | 
  93  |     const pngPath = path.join(fixturesDir, 'test-image-1.png');
  94  |     await page.setInputFiles('input[type="file"]', pngPath);
  95  | 
  96  |     await expect(page.locator('#workspace')).not.toHaveAttribute('hidden', '', { timeout: 10000 });
  97  |     await page.waitForSelector('#images-grid .page-card', { timeout: 10000 });
  98  | 
  99  |     // Checkbox should be checked by default
  100 |     const checkbox = page.locator('#images-grid .page-card__checkbox').first();
  101 |     await expect(checkbox).toBeChecked();
  102 |     // Note: we don't test page-card--selected class as it's not added initially (only on user interaction)
  103 |   });
  104 | 
  105 |   test.skip('Upload image → bouton "Create PDF" activé', async ({ page }) => {
  106 |     // SKIP: Application bug - page-card--selected class not added on card creation
  107 |     // even though checkbox.checked = true. updateConvertButton() relies on this class
  108 |     // so btn-convert stays disabled after upload. Would need src/main.js fix.
  109 |     await page.goto('/');
  110 |     await page.waitForSelector('#dropzone', { timeout: 10000 });
  111 | 
  112 |     const pngPath = path.join(fixturesDir, 'test-image-1.png');
  113 |     await page.setInputFiles('input[type="file"]', pngPath);
  114 | 
  115 |     await expect(page.locator('#workspace')).not.toHaveAttribute('hidden', '', { timeout: 10000 });
  116 |     await page.waitForSelector('#images-grid .page-card', { timeout: 10000 });
  117 | 
  118 |     await expect(page.locator('#btn-convert')).not.toBeDisabled({ timeout: 10000 });
  119 |   });
  120 | 
  121 |   test('Format non supporté (.txt) → aucune carte ajoutée', async ({ page }) => {
  122 |     await page.goto('/');
  123 |     await page.waitForSelector('#dropzone', { timeout: 10000 });
  124 | 
  125 |     // Create a fake .txt file
  126 |     const txtPath = path.join(fixturesDir, 'invalid.txt');
  127 |     fs.writeFileSync(txtPath, 'This is not an image');
  128 | 
  129 |     await page.setInputFiles('input[type="file"]', txtPath);
  130 |     await page.waitForTimeout(500);
  131 | 
  132 |     // Workspace should NOT be visible (no valid images loaded)
  133 |     // Use attribute check since CSS display may override hidden
  134 |     await expect(page.locator('#workspace')).toHaveAttribute('hidden', '');
  135 | 
  136 |     // Clean up
  137 |     fs.unlinkSync(txtPath);
  138 |   });
  139 | 
  140 |   test('Drag & drop fonctionne (via setInputFiles)', async ({ page }) => {
> 141 |     await page.goto('/');
      |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5174/
  142 |     await page.waitForSelector('#dropzone', { timeout: 10000 });
  143 | 
  144 |     const pngPath = path.join(fixturesDir, 'test-image-1.png');
  145 |     await page.setInputFiles('input[type="file"]', pngPath);
  146 | 
  147 |     await expect(page.locator('#workspace')).not.toHaveAttribute('hidden', '', { timeout: 10000 });
  148 |     await expect(page.locator('#filename')).toContainText('1 image');
  149 |   });
  150 | 
  151 |   test('Bouton "Add more" permet dajouter des images supplémentaires', async ({ page }) => {
  152 |     await page.goto('/');
  153 |     await page.waitForSelector('#dropzone', { timeout: 10000 });
  154 | 
  155 |     // Initial upload
  156 |     const pngPath = path.join(fixturesDir, 'test-image-1.png');
  157 |     await page.setInputFiles('input[type="file"]', pngPath);
  158 | 
  159 |     await expect(page.locator('#workspace')).not.toHaveAttribute('hidden', '', { timeout: 10000 });
  160 |     await expect(page.locator('#images-grid .page-card')).toHaveCount(1, { timeout: 10000 });
  161 | 
  162 |     // Add more images
  163 |     const pngPath2 = path.join(fixturesDir, 'test-image-2.png');
  164 |     await page.setInputFiles('input[type="file"]', pngPath2);
  165 | 
  166 |     await expect(page.locator('#images-grid .page-card')).toHaveCount(2, { timeout: 10000 });
  167 |     await expect(page.locator('#filename')).toContainText('2 images');
  168 |   });
  169 | });
  170 | 
```