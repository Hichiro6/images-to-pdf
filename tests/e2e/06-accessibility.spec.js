/**
 * Tests fonctionnels - Accessibilité (simplified)
 *
 * Couvre:
 * - Présence des régions ARIA (aria-live)
 * - Attributs ARIA sur les éléments interactifs
 * - Focus keyboard sur la dropzone (sans axe-core)
 *
 * SKIP: Axe-core deep audit (too heavy for simplified tests)
 */
import { expect, test } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { createTestImage } from './helpers/test-fixtures-gen.js';

const fixturesDir = path.join(process.cwd(), 'tests/e2e/fixtures');

test.describe('♿ Accessibilité', () => {
  test.beforeAll(async () => {
    fs.mkdirSync(fixturesDir, { recursive: true });
    for (let i = 1; i <= 2; i++) {
      const fname = `test-image-${i}.png`;
      if (!fs.existsSync(path.join(fixturesDir, fname))) {
        createTestImage({ filename: fname, variant: i });
      }
    }
  });

  test('Region aria-live (sr-live) existe', async ({ page }) => {
    await page.goto('/');

    // sr-live region should exist
    const srLive = page.locator('#sr-live');
    await expect(srLive).toBeAttached();

    // Should have role=status and aria-live=polite
    await expect(srLive).toHaveAttribute('role', 'status');
    await expect(srLive).toHaveAttribute('aria-live', 'polite');
  });

  test('Dropzone a attributs keyboard accessibles', async ({ page }) => {
    await page.goto('/');

    const dropzone = page.locator('#dropzone');

    // Should have tabindex
    await expect(dropzone).toHaveAttribute('tabindex');

    // Should have role or aria-label
    await expect(dropzone).toHaveAttribute('aria-label');
  });

  test('Grille images a role=list', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#dropzone', { timeout: 10000 });

    const pngPath = path.join(fixturesDir, 'test-image-1.png');
    await page.setInputFiles('input[type="file"]', pngPath);
    await expect(page.locator('#workspace')).not.toHaveAttribute('hidden', '', { timeout: 10000 });

    const grid = page.locator('#images-grid');

    // Should have role=list
    await expect(grid).toHaveAttribute('role', 'list');
    // Should have aria-label
    await expect(grid).toHaveAttribute('aria-label');
  });

  test('Cartes images ont role=listitem', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#dropzone', { timeout: 10000 });

    const paths = [
      path.join(fixturesDir, 'test-image-1.png'),
      path.join(fixturesDir, 'test-image-2.png'),
    ];
    await page.setInputFiles('input[type="file"]', paths);
    await expect(page.locator('#workspace')).not.toHaveAttribute('hidden', '', { timeout: 10000 });

    const cards = page.locator('#images-grid .page-card');
    await expect(cards).toHaveCount(2, { timeout: 10000 });

    // First card should have role=listitem
    await expect(cards.first()).toHaveAttribute('role', 'listitem');
  });

  test('Bouton Convert a aria-label', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#dropzone', { timeout: 10000 });

    const btnConvert = page.locator('#btn-convert');

    // Should have aria-label
    await expect(btnConvert).toHaveAttribute('aria-label');
  });

  test('Contrôles de format ont aria-label', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#dropzone', { timeout: 10000 });

    const pngPath = path.join(fixturesDir, 'test-image-1.png');
    await page.setInputFiles('input[type="file"]', pngPath);
    await expect(page.locator('#workspace')).not.toHaveAttribute('hidden', '', { timeout: 10000 });

    // Format select
    await expect(page.locator('#format-select')).toHaveAttribute('aria-label');

    // Margin range
    await expect(page.locator('#margin-range')).toHaveAttribute('aria-label');
  });

  test('Segment buttons ont role=radio et aria-checked', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#dropzone', { timeout: 10000 });

    const pngPath = path.join(fixturesDir, 'test-image-1.png');
    await page.setInputFiles('input[type="file"]', pngPath);
    await expect(page.locator('#workspace')).not.toHaveAttribute('hidden', '', { timeout: 10000 });

    const portraitBtn = page.locator('.seg-btn[data-orientation="portrait"]');

    // Should have role=radio and aria-checked
    await expect(portraitBtn).toHaveAttribute('role', 'radio');
    await expect(portraitBtn).toHaveAttribute('aria-checked');
  });

  test('Progress bar a attributs progressbar', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#dropzone', { timeout: 10000 });

    const pngPath = path.join(fixturesDir, 'test-image-1.png');
    await page.setInputFiles('input[type="file"]', pngPath);
    await expect(page.locator('#workspace')).not.toHaveAttribute('hidden', '', { timeout: 10000 });

    const progressBar = page.locator('#progress-bar');
    const progressContainer = page.locator('#progress-container');

    // Progress container is hidden by default
    await expect(progressContainer).toHaveAttribute('hidden', '');

    // Progress bar should have progressbar attributes
    await expect(progressBar).toHaveAttribute('role', 'progressbar');
    await expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    await expect(progressBar).toHaveAttribute('aria-valuemax', '100');
  });

  test('Boutons de contrôle ont aria-label', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#dropzone', { timeout: 10000 });

    const pngPath = path.join(fixturesDir, 'test-image-1.png');
    await page.setInputFiles('input[type="file"]', pngPath);
    await expect(page.locator('#workspace')).not.toHaveAttribute('hidden', '', { timeout: 10000 });

    // Add more button
    await expect(page.locator('#btn-add-more')).toHaveAttribute('aria-label');

    // Reset button
    await expect(page.locator('#btn-reset')).toHaveAttribute('aria-label');
  });

  test('Select checkboxes ont aria-label', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#dropzone', { timeout: 10000 });

    const paths = [
      path.join(fixturesDir, 'test-image-1.png'),
      path.join(fixturesDir, 'test-image-2.png'),
    ];
    await page.setInputFiles('input[type="file"]', paths);
    await expect(page.locator('#workspace')).not.toHaveAttribute('hidden', '', { timeout: 10000 });

    const checkbox = page.locator('#images-grid .page-card__checkbox').first();

    // Checkbox should have aria-label
    await expect(checkbox).toHaveAttribute('aria-label');
  });

  test('Lang selector a aria-label', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#lang-selector', { timeout: 10000 });

    const select = page.locator('#lang-selector select');

    // Should have aria-label
    await expect(select).toHaveAttribute('aria-label');
  });

  test('Règle radiogroup pour orientation', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#dropzone', { timeout: 10000 });

    const pngPath = path.join(fixturesDir, 'test-image-1.png');
    await page.setInputFiles('input[type="file"]', pngPath);
    await expect(page.locator('#workspace')).not.toHaveAttribute('hidden', '', { timeout: 10000 });

    // Orientation radiogroup
    const orientationGroup = page.locator('.seg-control[role="radiogroup"]').first();

    // Should have role=radiogroup
    await expect(orientationGroup).toHaveAttribute('role', 'radiogroup');
    // Should have aria-label
    await expect(orientationGroup).toHaveAttribute('aria-label');
  });
});
