import { test, expect } from '@playwright/test';

// End-to-end test for the public marketing landing page ("/").
// This route is NOT auth-guarded, so it runs against the real app
// (started automatically by the webServer config) without mocking.
test.describe('Landing page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has the Orchestrator page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Orchestrator/);
  });

  test('renders the hero headline and tagline', async ({ page }) => {
    await expect(
      page.getByText('Sharpnr Platform · Command Centre'),
    ).toBeVisible();
    await expect(
      page.getByText(/The administrative layer of the Sharpnr Platform/),
    ).toBeVisible();
  });

  test('shows the primary call-to-action buttons', async ({ page }) => {
    // Hero CTA (exact, to avoid matching the "Enter Control Panel →" CTA lower down)
    await expect(
      page.getByRole('button', { name: 'Enter Control Panel', exact: true }),
    ).toBeVisible();
    // Header CTA
    await expect(
      page.getByRole('button', { name: 'LAUNCH CONSOLE →' }),
    ).toBeVisible();
  });
});
