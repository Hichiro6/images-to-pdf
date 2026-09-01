/**
 * Test utilities for Images to PDF E2E tests
 * Fournit des helpers communs pour uploader des fichiers de test
 * et attendre que l'interface devienne prête.
 */

import path from 'path';

const fixturesDir = path.join(process.cwd(), 'tests/e2e/fixtures');

/**
 * Upload a test image and wait for workspace to appear.
 * @param {import('@playwright/test').Page} page
 * @param {string} filename - fixture filename (default: test-image.png)
 * @returns {Promise<{filename: string, count: number}>}
 */
export async function uploadTestImage(page, filename = 'test-image.png') {
  await page.goto('/');

  // Wait for dropzone to be visible (initial state)
  await page.waitForSelector('#dropzone', { timeout: 10000 });

  const filePath = path.join(fixturesDir, filename);
  await page.setInputFiles('input[type="file"]', filePath);

  // Wait for workspace to appear
  await page.waitForSelector('#workspace:not([hidden])', { timeout: 10000 });

  // Wait for grid to render
  await page.waitForSelector('#images-grid .page-card', { timeout: 10000 });

  const count = await page.locator('#images-grid .page-card').count();

  return {
    filename: path.basename(filename),
    count,
  };
}

/**
 * Wait for image cards to render after any change
 * @param {import('@playwright/test').Page} page
 * @param {number} expectedCount - expected number of cards (optional)
 * @param {number} timeout - timeout in ms (default: 10000)
 */
export async function waitForCardsRender(page, expectedCount = undefined, timeout = 10000) {
  // Wait for at least one card to be present
  await page.waitForFunction(() => document.querySelectorAll('.page-card').length > 0, null, {
    timeout,
  });

  if (expectedCount !== undefined) {
    // Wait for card count to stabilize
    await page.waitForFunction(
      (expected) => {
        const count = document.querySelectorAll('.page-card').length;
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(document.querySelectorAll('.page-card').length === expected);
          }, 300);
        });
      },
      expectedCount,
      { timeout },
    );
  }
}

/**
 * Perform drag-and-drop reordering of image cards
 * @param {import('@playwright/test').Page} page
 * @param {number} fromIndex - source index (0-based)
 * @param {number} toIndex - target index (0-based)
 */
export async function reorderImages(page, fromIndex, toIndex) {
  const cards = page.locator('#images-grid .page-card');
  const fromCard = cards.nth(fromIndex);
  const toCard = cards.nth(toIndex);

  // Get bounding boxes
  const fromBox = await fromCard.boundingBox();
  const toBox = await toCard.boundingBox();

  if (!fromBox || !toBox) {
    throw new Error('Could not get bounding boxes for drag-and-drop');
  }

  // Perform drag
  await page.mouse.move(fromBox.x + fromBox.width / 2, fromBox.y + fromBox.height / 2);
  await page.mouse.down();
  await page.mouse.move(toBox.x + toBox.width / 2, toBox.y + toBox.height / 2);
  await page.mouse.up();

  // Wait for re-render
  await page.waitForTimeout(500);
}

/**
 * Get a fixture file path
 */
export function getFixturePath(filename) {
  return path.join(fixturesDir, filename);
}

/**
 * Select or deselect an image card by index
 * @param {import('@playwright/test').Page} page
 * @param {number} index - card index (0-based)
 * @param {boolean} select - true to select, false to deselect
 */
export async function toggleImageSelection(page, index, select = true) {
  const checkbox = page
    .locator(`#images-grid .page-card`)
    .nth(index)
    .locator('.page-card__checkbox');
  const isChecked = await checkbox.isChecked();

  if (isChecked !== select) {
    await checkbox.click();
    await page.waitForTimeout(200);
  }
}
