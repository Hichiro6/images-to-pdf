# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 06-accessibility.spec.js >> ♿ Accessibilité >> Progress bar a attributs progressbar
- Location: tests/e2e/06-accessibility.spec.js:128:3

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5174/
Call log:
  - navigating to "http://localhost:5174/", waiting until "load"

```

# Test source

```ts
  29  | 
  30  |   test('Region aria-live (sr-live) existe', async ({ page }) => {
  31  |     await page.goto('/');
  32  | 
  33  |     // sr-live region should exist
  34  |     const srLive = page.locator('#sr-live');
  35  |     await expect(srLive).toBeAttached();
  36  |     
  37  |     // Should have role=status and aria-live=polite
  38  |     await expect(srLive).toHaveAttribute('role', 'status');
  39  |     await expect(srLive).toHaveAttribute('aria-live', 'polite');
  40  |   });
  41  | 
  42  |   test('Dropzone a attributs keyboard accessibles', async ({ page }) => {
  43  |     await page.goto('/');
  44  | 
  45  |     const dropzone = page.locator('#dropzone');
  46  |     
  47  |     // Should have tabindex
  48  |     await expect(dropzone).toHaveAttribute('tabindex');
  49  |     
  50  |     // Should have role or aria-label
  51  |     await expect(dropzone).toHaveAttribute('aria-label');
  52  |   });
  53  | 
  54  |   test('Grille images a role=list', async ({ page }) => {
  55  |     await page.goto('/');
  56  |     await page.waitForSelector('#dropzone', { timeout: 10000 });
  57  | 
  58  |     const pngPath = path.join(fixturesDir, 'test-image-1.png');
  59  |     await page.setInputFiles('input[type="file"]', pngPath);
  60  |     await expect(page.locator('#workspace')).not.toHaveAttribute('hidden', '', { timeout: 10000 });
  61  | 
  62  |     const grid = page.locator('#images-grid');
  63  |     
  64  |     // Should have role=list
  65  |     await expect(grid).toHaveAttribute('role', 'list');
  66  |     // Should have aria-label
  67  |     await expect(grid).toHaveAttribute('aria-label');
  68  |   });
  69  | 
  70  |   test('Cartes images ont role=listitem', async ({ page }) => {
  71  |     await page.goto('/');
  72  |     await page.waitForSelector('#dropzone', { timeout: 10000 });
  73  | 
  74  |     const paths = [
  75  |       path.join(fixturesDir, 'test-image-1.png'),
  76  |       path.join(fixturesDir, 'test-image-2.png'),
  77  |     ];
  78  |     await page.setInputFiles('input[type="file"]', paths);
  79  |     await expect(page.locator('#workspace')).not.toHaveAttribute('hidden', '', { timeout: 10000 });
  80  | 
  81  |     const cards = page.locator('#images-grid .page-card');
  82  |     await expect(cards).toHaveCount(2, { timeout: 10000 });
  83  | 
  84  |     // First card should have role=listitem
  85  |     await expect(cards.first()).toHaveAttribute('role', 'listitem');
  86  |   });
  87  | 
  88  |   test('Bouton Convert a aria-label', async ({ page }) => {
  89  |     await page.goto('/');
  90  |     await page.waitForSelector('#dropzone', { timeout: 10000 });
  91  | 
  92  |     const btnConvert = page.locator('#btn-convert');
  93  |     
  94  |     // Should have aria-label
  95  |     await expect(btnConvert).toHaveAttribute('aria-label');
  96  |   });
  97  | 
  98  |   test('Contrôles de format ont aria-label', async ({ page }) => {
  99  |     await page.goto('/');
  100 |     await page.waitForSelector('#dropzone', { timeout: 10000 });
  101 | 
  102 |     const pngPath = path.join(fixturesDir, 'test-image-1.png');
  103 |     await page.setInputFiles('input[type="file"]', pngPath);
  104 |     await expect(page.locator('#workspace')).not.toHaveAttribute('hidden', '', { timeout: 10000 });
  105 | 
  106 |     // Format select
  107 |     await expect(page.locator('#format-select')).toHaveAttribute('aria-label');
  108 |     
  109 |     // Margin range
  110 |     await expect(page.locator('#margin-range')).toHaveAttribute('aria-label');
  111 |   });
  112 | 
  113 |   test('Segment buttons ont role=radio et aria-checked', async ({ page }) => {
  114 |     await page.goto('/');
  115 |     await page.waitForSelector('#dropzone', { timeout: 10000 });
  116 | 
  117 |     const pngPath = path.join(fixturesDir, 'test-image-1.png');
  118 |     await page.setInputFiles('input[type="file"]', pngPath);
  119 |     await expect(page.locator('#workspace')).not.toHaveAttribute('hidden', '', { timeout: 10000 });
  120 | 
  121 |     const portraitBtn = page.locator('.seg-btn[data-orientation="portrait"]');
  122 |     
  123 |     // Should have role=radio and aria-checked
  124 |     await expect(portraitBtn).toHaveAttribute('role', 'radio');
  125 |     await expect(portraitBtn).toHaveAttribute('aria-checked');
  126 |   });
  127 | 
  128 |   test('Progress bar a attributs progressbar', async ({ page }) => {
> 129 |     await page.goto('/');
      |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5174/
  130 |     await page.waitForSelector('#dropzone', { timeout: 10000 });
  131 | 
  132 |     const pngPath = path.join(fixturesDir, 'test-image-1.png');
  133 |     await page.setInputFiles('input[type="file"]', pngPath);
  134 |     await expect(page.locator('#workspace')).not.toHaveAttribute('hidden', '', { timeout: 10000 });
  135 | 
  136 |     const progressBar = page.locator('#progress-bar');
  137 |     const progressContainer = page.locator('#progress-container');
  138 |     
  139 |     // Progress container is hidden by default
  140 |     await expect(progressContainer).toHaveAttribute('hidden', '');
  141 |     
  142 |     // Progress bar should have progressbar attributes
  143 |     await expect(progressBar).toHaveAttribute('role', 'progressbar');
  144 |     await expect(progressBar).toHaveAttribute('aria-valuemin', '0');
  145 |     await expect(progressBar).toHaveAttribute('aria-valuemax', '100');
  146 |   });
  147 | 
  148 |   test('Boutons de contrôle ont aria-label', async ({ page }) => {
  149 |     await page.goto('/');
  150 |     await page.waitForSelector('#dropzone', { timeout: 10000 });
  151 | 
  152 |     const pngPath = path.join(fixturesDir, 'test-image-1.png');
  153 |     await page.setInputFiles('input[type="file"]', pngPath);
  154 |     await expect(page.locator('#workspace')).not.toHaveAttribute('hidden', '', { timeout: 10000 });
  155 | 
  156 |     // Add more button
  157 |     await expect(page.locator('#btn-add-more')).toHaveAttribute('aria-label');
  158 |     
  159 |     // Reset button
  160 |     await expect(page.locator('#btn-reset')).toHaveAttribute('aria-label');
  161 |   });
  162 | 
  163 |   test('Select checkboxes ont aria-label', async ({ page }) => {
  164 |     await page.goto('/');
  165 |     await page.waitForSelector('#dropzone', { timeout: 10000 });
  166 | 
  167 |     const paths = [
  168 |       path.join(fixturesDir, 'test-image-1.png'),
  169 |       path.join(fixturesDir, 'test-image-2.png'),
  170 |     ];
  171 |     await page.setInputFiles('input[type="file"]', paths);
  172 |     await expect(page.locator('#workspace')).not.toHaveAttribute('hidden', '', { timeout: 10000 });
  173 | 
  174 |     const checkbox = page.locator('#images-grid .page-card__checkbox').first();
  175 |     
  176 |     // Checkbox should have aria-label
  177 |     await expect(checkbox).toHaveAttribute('aria-label');
  178 |   });
  179 | 
  180 |   test('Lang selector a aria-label', async ({ page }) => {
  181 |     await page.goto('/');
  182 |     await page.waitForSelector('#lang-selector', { timeout: 10000 });
  183 | 
  184 |     const select = page.locator('#lang-selector select');
  185 |     
  186 |     // Should have aria-label
  187 |     await expect(select).toHaveAttribute('aria-label');
  188 |   });
  189 | 
  190 |   test('Règle radiogroup pour orientation', async ({ page }) => {
  191 |     await page.goto('/');
  192 |     await page.waitForSelector('#dropzone', { timeout: 10000 });
  193 | 
  194 |     const pngPath = path.join(fixturesDir, 'test-image-1.png');
  195 |     await page.setInputFiles('input[type="file"]', pngPath);
  196 |     await expect(page.locator('#workspace')).not.toHaveAttribute('hidden', '', { timeout: 10000 });
  197 | 
  198 |     // Orientation radiogroup
  199 |     const orientationGroup = page.locator('.seg-control[role="radiogroup"]').first();
  200 |     
  201 |     // Should have role=radiogroup
  202 |     await expect(orientationGroup).toHaveAttribute('role', 'radiogroup');
  203 |     // Should have aria-label
  204 |     await expect(orientationGroup).toHaveAttribute('aria-label');
  205 |   });
  206 | });
  207 | 
```