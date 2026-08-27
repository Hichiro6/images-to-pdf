/**
 * Tests fonctionnels - Internationalisation (i18n)
 *
 * Couvre:
 * - Changement de langue via le dropdown
 * - Persistance dans localStorage (après page.goto)
 * - Attribut html.lang mis à jour
 * - Traductions appliquées
 */
import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { createTestImage } from './helpers/test-fixtures-gen.js';

const fixturesDir = path.join(process.cwd(), 'tests/e2e/fixtures');

test.describe('🌐 Internationalisation', () => {

  test.beforeAll(async () => {
    fs.mkdirSync(fixturesDir, { recursive: true });
    for (let i = 1; i <= 2; i++) {
      const fname = `test-image-${i}.png`;
      if (!fs.existsSync(path.join(fixturesDir, fname))) {
        createTestImage({ filename: fname, variant: i });
      }
    }
  });

  test('Dropdown de langue présent dans le header', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#lang-selector', { timeout: 10000 });

    // Lang selector container should exist
    const langContainer = page.locator('#lang-selector');
    await expect(langContainer).toBeVisible();

    // Dropdown should be present
    const select = langContainer.locator('select');
    await expect(select).toBeVisible();
  });

  test('Changement de langue: → EN', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#lang-selector', { timeout: 10000 });

    const select = page.locator('#lang-selector select');

    // Change to English
    await select.selectOption('en');
    await page.waitForTimeout(300);

    // Language should update
    const currentValue = await select.inputValue();
    expect(currentValue).toBe('en');

    // HTML lang attribute should update
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });

  test('Changement de langue: → DE', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#lang-selector', { timeout: 10000 });

    const select = page.locator('#lang-selector select');

    // Change to German
    await select.selectOption('de');
    await page.waitForTimeout(300);

    await expect(select).toHaveValue('de');
    await expect(page.locator('html')).toHaveAttribute('lang', 'de');
  });

  test('Traductions: texte bouton change après changement de langue', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#lang-selector', { timeout: 10000 });

    const select = page.locator('#lang-selector select');

    // Set to English first
    await select.selectOption('en');
    await page.waitForTimeout(300);

    const btnConvert = page.locator('#btn-convert');
    const enText = await btnConvert.textContent();

    // Change to German
    await select.selectOption('de');
    await page.waitForTimeout(300);

    const deText = await btnConvert.textContent();

    // Texts should be different (translation applied)
    expect(enText).toBeTruthy();
    expect(deText).toBeTruthy();
    expect(enText).not.toBe(deText);
  });

  test('Langue persiste après rechargement de page', async ({ page }) => {
    // Navigate first (avoid localStorage SecurityError on about:blank)
    await page.goto('/');
    await page.waitForSelector('#lang-selector', { timeout: 10000 });

    const select = page.locator('#lang-selector select');
    await select.selectOption('en');
    await page.waitForTimeout(300);

    // Reload page
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForSelector('#lang-selector', { timeout: 10000 });

    // Language should still be English (persisted in localStorage)
    const selectAfterReload = page.locator('#lang-selector select');
    await expect(selectAfterReload).toHaveValue('en');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });

  test('HTML lang attribute synchronisé avec le dropdown', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#lang-selector', { timeout: 10000 });

    const select = page.locator('#lang-selector select');

    // Test multiple languages
    for (const lang of ['en', 'de', 'es', 'pt']) {
      await select.selectOption(lang);
      await page.waitForTimeout(200);

      await expect(page.locator('html')).toHaveAttribute('lang', lang);
    }
  });

  test('Toutes les langues disponibles dans le dropdown', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#lang-selector', { timeout: 10000 });

    const select = page.locator('#lang-selector select');
    const optionCount = await select.locator('option').count();
    
    // Should have multiple options (at least: en, fr, de, es, pt, nl, it)
    expect(optionCount).toBeGreaterThanOrEqual(7);
  });

  test('Switch EN → DE → EN fonctionne correctement', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#lang-selector', { timeout: 10000 });

    const select = page.locator('#lang-selector select');

    // Set to EN first
    await select.selectOption('en');
    await page.waitForTimeout(200);
    await expect(select).toHaveValue('en');

    // Switch to DE
    await select.selectOption('de');
    await page.waitForTimeout(200);
    await expect(select).toHaveValue('de');

    // Switch back to EN
    await select.selectOption('en');
    await page.waitForTimeout(200);
    await expect(select).toHaveValue('en');
  });

  test.skip('Traduction exacte vérifiée pour chaque langue', async ({ page }) => {
    // SKIP: This requires exact knowledge of all translations
    // Too brittle for E2E tests
  });
});
