import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchSubmitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // All locators live ONLY inside the Page Object
    this.searchInput = page.locator('[data-test="search-query"]');
    this.searchSubmitButton = page.locator('[data-test="search-submit"]');
  }

  // Action 1: Navigate to the catalog page
  async goto() {
    await this.page.goto('/');
  }

  // Action 2: Type a search keyword and click Search
  async searchFor(term: string) {
    await this.searchInput.fill(term);
    await this.searchSubmitButton.click();
  }

  // Helper 1: Get a specific product card by its visible name
  productCardByName(name: string): Locator {
    return this.page.locator('.card', { hasText: name });
  }

  // Helper 2: Get the "Out of stock" badge inside that specific product card
  outOfStockBadgeForProduct(name: string): Locator {
    return this.productCardByName(name).locator('[data-test="out-of-stock"]');
  }
}