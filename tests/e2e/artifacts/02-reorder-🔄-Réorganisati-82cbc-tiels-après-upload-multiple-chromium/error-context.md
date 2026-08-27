# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 02-reorder.spec.js >> 🔄 Réorganisation et Sélection >> Numéros de page séquentiels après upload multiple
- Location: tests/e2e/02-reorder.spec.js:149:3

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5174/
Call log:
  - navigating to "http://localhost:5174/", waiting until "load"

```

# Test source

```ts
  50  |     const checkbox = page.locator('#images-grid .page-card__checkbox').first();
  51  | 
  52  |     await checkbox.uncheck();
  53  |     await checkbox.check();
  54  |   });
  55  | 
  56  |   test('Bouton "Select all" coche toutes les cases', async ({ page }) => {
  57  |     // Upload 3 images
  58  |     await page.goto('/');
  59  |     await page.waitForSelector('#dropzone', { timeout: 10000 });
  60  |     const paths = [
  61  |       path.join(fixturesDir, 'test-image-1.png'),
  62  |       path.join(fixturesDir, 'test-image-2.png'),
  63  |       path.join(fixturesDir, 'test-image-3.png'),
  64  |     ];
  65  |     await page.setInputFiles('input[type="file"]', paths);
  66  |     await expect(page.locator('#workspace')).not.toHaveAttribute('hidden', '', { timeout: 10000 });
  67  |     await waitForCardsRender(page, 3);
  68  | 
  69  |     // Deselect all first
  70  |     await page.click('#btn-deselect-all');
  71  |     await page.waitForTimeout(300);
  72  | 
  73  |     const checkboxes = page.locator('#images-grid .page-card__checkbox');
  74  |     const count = await checkboxes.count();
  75  |     for (let i = 0; i < count; i++) {
  76  |       await expect(checkboxes.nth(i)).not.toBeChecked();
  77  |     }
  78  | 
  79  |     // Click select all (this adds page-card--selected class but doesn't call updateConvertButton)
  80  |     await page.click('#btn-select-all');
  81  |     await page.waitForTimeout(500);
  82  | 
  83  |     for (let i = 0; i < count; i++) {
  84  |       await expect(checkboxes.nth(i)).toBeChecked();
  85  |     }
  86  |   });
  87  | 
  88  |   test('Bouton "Deselect all" décoche toutes les cases', async ({ page }) => {
  89  |     await page.goto('/');
  90  |     await page.waitForSelector('#dropzone', { timeout: 10000 });
  91  |     const paths = [
  92  |       path.join(fixturesDir, 'test-image-1.png'),
  93  |       path.join(fixturesDir, 'test-image-2.png'),
  94  |     ];
  95  |     await page.setInputFiles('input[type="file"]', paths);
  96  |     await expect(page.locator('#workspace')).not.toHaveAttribute('hidden', '', { timeout: 10000 });
  97  |     await waitForCardsRender(page, 2);
  98  | 
  99  |     // All should be checked initially (but no page-card--selected class)
  100 |     const checkboxes = page.locator('#images-grid .page-card__checkbox');
  101 |     await expect(checkboxes).toHaveCount(2);
  102 | 
  103 |     // Click deselect all
  104 |     await page.click('#btn-deselect-all');
  105 |     await page.waitForTimeout(300);
  106 | 
  107 |     for (let i = 0; i < 2; i++) {
  108 |       await expect(checkboxes.nth(i)).not.toBeChecked();
  109 |     }
  110 | 
  111 |     // Button should be disabled (no selections)
  112 |     await expect(page.locator('#btn-convert')).toBeDisabled();
  113 |   });
  114 | 
  115 |   test('Clic sur carte toggle la sélection', async ({ page }) => {
  116 |     await uploadTestImage(page, 'test-image-1.png');
  117 | 
  118 |     const card = page.locator('#images-grid .page-card').first();
  119 |     const checkbox = card.locator('.page-card__checkbox');
  120 | 
  121 |     await expect(checkbox).toBeChecked();
  122 | 
  123 |     // Click on card body (not the checkbox)
  124 |     await card.locator('.page-card__thumb').click();
  125 |     await page.waitForTimeout(200);
  126 | 
  127 |     await expect(checkbox).not.toBeChecked();
  128 |   });
  129 | 
  130 |   test('Bouton Reset vide la grille et masque le workspace', async ({ page }) => {
  131 |     await page.goto('/');
  132 |     await page.waitForSelector('#dropzone', { timeout: 10000 });
  133 |     const paths = [
  134 |       path.join(fixturesDir, 'test-image-1.png'),
  135 |       path.join(fixturesDir, 'test-image-2.png'),
  136 |     ];
  137 |     await page.setInputFiles('input[type="file"]', paths);
  138 |     await expect(page.locator('#workspace')).not.toHaveAttribute('hidden', '', { timeout: 10000 });
  139 |     await waitForCardsRender(page, 2);
  140 | 
  141 |     // Click reset
  142 |     await page.click('#btn-reset');
  143 |     await page.waitForTimeout(300);
  144 | 
  145 |     await expect(page.locator('#workspace')).toHaveAttribute('hidden', '');
  146 |     await expect(page.locator('#images-grid .page-card')).toHaveCount(0);
  147 |   });
  148 | 
  149 |   test('Numéros de page séquentiels après upload multiple', async ({ page }) => {
> 150 |     await page.goto('/');
      |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5174/
  151 |     await page.waitForSelector('#dropzone', { timeout: 10000 });
  152 |     const paths = [
  153 |       path.join(fixturesDir, 'test-image-1.png'),
  154 |       path.join(fixturesDir, 'test-image-2.png'),
  155 |       path.join(fixturesDir, 'test-image-3.png'),
  156 |       path.join(fixturesDir, 'test-image-4.png'),
  157 |       path.join(fixturesDir, 'test-image-5.png'),
  158 |     ];
  159 |     await page.setInputFiles('input[type="file"]', paths);
  160 |     await expect(page.locator('#workspace')).not.toHaveAttribute('hidden', '', { timeout: 10000 });
  161 |     await waitForCardsRender(page, 5);
  162 | 
  163 |     const badges = page.locator('#images-grid .page-card .page-card__number');
  164 |     await expect(badges).toHaveCount(5);
  165 | 
  166 |     for (let i = 0; i < 5; i++) {
  167 |       await expect(badges.nth(i)).toContainText(`${i + 1}`);
  168 |     }
  169 |   });
  170 | });
  171 | 
```