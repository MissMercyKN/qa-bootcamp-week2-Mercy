import { test, expect } from '@playwright/test';

test('home page displays the expected title', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com');
  await expect(page).toHaveTitle('Practice Software Testing - Toolshop - v5.0');
});

test('searching for "pliers" returns pliers products', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com');

  await page.getByRole('textbox', { name: 'Search' }).fill('pliers');
  await page.getByRole('button', { name: 'Search' }).click();

  await expect(page.getByRole('heading', { name: 'Searched for: pliers' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 5, name: /pliers/i }).first()).toBeVisible();
});

test('invalid login is rejected with "Invalid email or password"', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com');

  await page.getByRole('link', { name: 'Sign in' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('wrong.user@example.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('WrongPassword123!');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Invalid email or password')).toBeVisible();
});