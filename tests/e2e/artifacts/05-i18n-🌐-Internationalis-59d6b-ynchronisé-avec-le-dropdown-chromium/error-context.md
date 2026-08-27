# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 05-i18n.spec.js >> 🌐 Internationalisation >> HTML lang attribute synchronisé avec le dropdown
- Location: tests/e2e/05-i18n.spec.js:118:3

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5174/
Call log:
  - navigating to "http://localhost:5174/", waiting until "load"

```

# Test source

```ts
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
  43  |     await page.goto('/');
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
> 119 |     await page.goto('/');
      |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5174/
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
  144 |   test('Switch EN → DE → EN fonctionne correctement', async ({ page }) => {
  145 |     await page.goto('/');
  146 |     await page.waitForSelector('#lang-selector', { timeout: 10000 });
  147 | 
  148 |     const select = page.locator('#lang-selector select');
  149 | 
  150 |     // Set to EN first
  151 |     await select.selectOption('en');
  152 |     await page.waitForTimeout(200);
  153 |     await expect(select).toHaveValue('en');
  154 | 
  155 |     // Switch to DE
  156 |     await select.selectOption('de');
  157 |     await page.waitForTimeout(200);
  158 |     await expect(select).toHaveValue('de');
  159 | 
  160 |     // Switch back to EN
  161 |     await select.selectOption('en');
  162 |     await page.waitForTimeout(200);
  163 |     await expect(select).toHaveValue('en');
  164 |   });
  165 | 
  166 |   test.skip('Traduction exacte vérifiée pour chaque langue', async ({ page }) => {
  167 |     // SKIP: This requires exact knowledge of all translations
  168 |     // Too brittle for E2E tests
  169 |   });
  170 | });
  171 | 
```