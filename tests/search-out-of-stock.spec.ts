import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test('MN-6: Search for an out-of-stock product displays Out of stock badge', async ({ page }) => {
  const homePage = new HomePage(page);

  // Step 1: Open the Toolshop home page
  await homePage.goto();

  // Step 2: Search for an out-of-stock product
  await homePage.searchFor('Long Nose Pliers');

  // Expected Result: Long Nose Pliers appears in results with a visible "Out of stock" badge
  await expect(homePage.productCardByName('Long Nose Pliers')).toBeVisible();
  await expect(homePage.outOfStockBadgeForProduct('Long Nose Pliers')).toBeVisible();
});