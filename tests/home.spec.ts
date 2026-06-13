import { test, expect } from '@playwright/test';

test('home page loads', async ({ page }) => {
  // baseURL is configured in playwright.config.ts
  await page.goto('/');

  // The app shell should render and not be a blank document.
  await expect(page.locator('body')).toBeVisible();
});
