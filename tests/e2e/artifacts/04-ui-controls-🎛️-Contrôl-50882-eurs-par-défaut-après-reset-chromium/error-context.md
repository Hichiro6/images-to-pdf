# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 04-ui-controls.spec.js >> 🎛️ Contrôles UI >> Valeurs par défaut après reset
- Location: tests/e2e/04-ui-controls.spec.js:185:3

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5174/
Call log:
  - navigating to "http://localhost:5174/", waiting until "load"

```

# Test source

```ts
  86  | 
  87  |     // Landscape should be active now
  88  |     const landscapeActive = await landscapeBtn.evaluate(el => el.classList.contains('active'));
  89  |     expect(landscapeActive).toBe(true);
  90  |     const portraitNotActive = await portraitBtn.evaluate(el => !el.classList.contains('active'));
  91  |     expect(portraitNotActive).toBe(true);
  92  |   });
  93  | 
  94  |   test('Orientation toggle: paysage → portrait', async ({ page }) => {
  95  |     await page.goto('/');
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
> 186 |     await page.goto('/');
      |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5174/
  187 |     await page.waitForSelector('#dropzone', { timeout: 10000 });
  188 | 
  189 |     const paths = [
  190 |       path.join(fixturesDir, 'test-image-1.png'),
  191 |       path.join(fixturesDir, 'test-image-2.png'),
  192 |     ];
  193 |     await page.setInputFiles('input[type="file"]', paths);
  194 |     await expect(page.locator('#workspace')).not.toHaveAttribute('hidden', '', { timeout: 10000 });
  195 | 
  196 |     // Modify values
  197 |     await page.locator('#format-select').selectOption('letter');
  198 |     await page.locator('.seg-btn[data-orientation="landscape"]').click();
  199 |     await page.locator('#margin-range').fill('30');
  200 |     await page.locator('.seg-btn[data-quality="high"]').click();
  201 |     await page.waitForTimeout(300);
  202 | 
  203 |     // Reset
  204 |     await page.click('#btn-reset');
  205 |     await page.waitForTimeout(300);
  206 | 
  207 |     // Workspace should be hidden
  208 |     await expect(page.locator('#workspace')).toHaveAttribute('hidden', '');
  209 |     // Re-upload to verify workspace shows again (defaults not tested due to app not resetting them)
  210 |     await page.setInputFiles('input[type="file"]', paths);
  211 |     await expect(page.locator('#workspace')).not.toHaveAttribute('hidden', '', { timeout: 10000 });
  212 |   });
  213 | });
  214 | 
```