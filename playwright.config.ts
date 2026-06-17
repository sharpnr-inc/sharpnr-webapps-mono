import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./e2e",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /*
   * Opt out of parallel tests on CI. Locally, cap workers low: this box has
   * many cores but a single Vite dev server, and WebKit renders in software
   * here. Too much concurrency starves the software-rendered WebKit (whose
   * main thread is already busy with the page's always-on framer-motion
   * animations), throttling timer-driven content like the typewriter and
   * making animation-gated assertions flaky.
   */
  workers: process.env.CI ? 1 : 2,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /*
   * WebKit on Linux renders in software here (its system libs are vendored,
   * no GPU), and the landing page runs several always-on framer-motion
   * animations that keep the main thread busy. Give assertions more room than
   * the 5s default so animation-gated content isn't a flaky miss; Chromium and
   * Firefox settle well within this anyway.
   */
  expect: { timeout: 12_000 },
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: "http://localhost:6969",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    /*
     * WebKit needs system libraries (icu 74, libxml2.so.2, libjxl 0.8, flite,
     * libbacktrace) that Arch's rolling repos no longer provide at the sonames
     * Playwright's WebKit build links against, and `playwright install-deps`
     * only supports Debian/Ubuntu. Run `bash e2e/setup-webkit-deps.sh` once
     * (and after any `playwright install webkit`) to vendor the ABI-correct
     * libraries into the WebKit bundle, then this project runs normally.
     */
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: "npm run dev",
    url: "http://localhost:6969",
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
