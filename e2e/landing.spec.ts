import { test, expect, type Page } from "@playwright/test";

/**
 * End-to-end tests for the public marketing landing page ("/").
 *
 * Route: src/routes/_marketing/index.tsx -> src/website/LandingPage.tsx
 *
 * This route is NOT auth-guarded, so the tests run against the real app
 * without any mocking. All asserted copy is sourced from the actual
 * section components and src/website/data/landing.ts, so the assertions
 * are meaningful (not placeholders).
 */

/* --------------------------------------------------------------------------
 * Confirmed copy — kept in one place so a wording change is a one-line edit.
 * ------------------------------------------------------------------------ */
const HERO_LABEL = "Sharpnr Platform · Command Centre";
const HERO_HEADLINE = "The Orchestrator";
const HERO_TAGLINE = /The administrative layer of the Sharpnr Platform/;

const HEADER_CTA = "LAUNCH CONSOLE →";
const HERO_CTA = "Enter Control Panel"; // exact: disambiguates from the bottom CTA
const BOTTOM_CTA = "Enter Control Panel →"; // CTASection, lower on the page

const ALPHA_COPY = "Currently In Development — Alpha Candidate is Live";
const TERMINAL_CMD = "orchestrator --connect --apps --services --watch";

/** True when no horizontal scrollbar exists on the document. */
async function hasNoHorizontalOverflow(page: Page) {
  return page.evaluate(() => {
    const el = document.documentElement;
    return el.scrollWidth <= el.clientWidth;
  });
}

test.describe("Marketing landing page", () => {
  // Captured per test, with the listener attached *before* navigation so the
  // initial page load is covered. (A reload/second navigation is avoided:
  // WebKit intermittently fails Vite's on-demand ESM imports on re-navigation
  // — "Importing a module script failed" — which is a dev-server artifact,
  // not an app fault.)
  let pageErrors: string[] = [];

  test.beforeEach(async ({ page }) => {
    pageErrors = [];
    page.on("pageerror", (err) => pageErrors.push(err.message));
    await page.goto("/");
  });

  test.describe("Page load & metadata", () => {
    test("has the Orchestrator page title", async ({ page }) => {
      await expect(page).toHaveTitle(/Orchestrator/);
    });

    test("exposes a descriptive SEO meta description", async ({ page }) => {
      const description = page.locator('meta[name="description"]');
      await expect(description).toHaveAttribute(
        "content",
        /Orchestrator is a Sharpnr product/,
      );
    });

    test("renders without uncaught JS exceptions", async ({ page }) => {
      // Settle on the hero so the page has fully executed, then assert the
      // load (captured from beforeEach) produced no uncaught errors.
      await expect(page.getByText(HERO_LABEL)).toBeVisible();
      expect(pageErrors, `Uncaught errors:\n${pageErrors.join("\n")}`).toEqual(
        [],
      );
    });

    test("has no horizontal overflow", async ({ page }) => {
      // The root wrapper uses `overflow-x-hidden`; guard against a section
      // regressing and introducing a sideways scrollbar.
      expect(await hasNoHorizontalOverflow(page)).toBe(true);
    });
  });

  test.describe("Header", () => {
    test("renders the banner with brand and product name", async ({ page }) => {
      const header = page.getByRole("banner");
      await expect(header).toBeVisible();
      await expect(header.getByText("SHARPNR")).toBeVisible();
      await expect(header.getByText("ORCHESTRATOR")).toBeVisible();
    });

    test("shows the desktop navigation items", async ({ page }) => {
      const nav = page.getByRole("navigation");
      for (const item of ["Products", "Architecture", "Changelog", "Docs"]) {
        await expect(nav.getByRole("link", { name: item })).toBeVisible();
      }
    });

    test("exposes the launch-console CTA", async ({ page }) => {
      await expect(
        page.getByRole("banner").getByRole("button", { name: HEADER_CTA }),
      ).toBeVisible();
    });
  });

  test.describe("Alpha status bar", () => {
    test("announces the alpha status", async ({ page }) => {
      await expect(page.getByText(ALPHA_COPY)).toBeVisible();
    });

    test("lists capability tags", async ({ page }) => {
      for (const tag of ["Service Control", "Health Monitoring", "Workflows"]) {
        await expect(page.getByText(tag, { exact: true })).toBeVisible();
      }
    });
  });

  test.describe("Hero", () => {
    test("shows the label, headline and tagline", async ({ page }) => {
      await expect(page.getByText(HERO_LABEL)).toBeVisible();
      await expect(
        page.getByRole("heading", { level: 1, name: HERO_HEADLINE }),
      ).toBeVisible();
      await expect(page.getByText(HERO_TAGLINE)).toBeVisible();
    });

    test("shows the primary CTA", async ({ page }) => {
      await expect(
        page.getByRole("button", { name: HERO_CTA, exact: true }),
      ).toBeVisible();
    });
  });

  test.describe("Terminal banner", () => {
    test("types out the orchestrator command", async ({ page }) => {
      // The text is typed one character at a time by <Typewriter> (a JS
      // timer), so give it generous room to finish rather than asserting a
      // transient mid-type value — software-rendered WebKit can throttle the
      // timer noticeably.
      await expect(page.getByText(TERMINAL_CMD)).toBeVisible({ timeout: 15_000 });
    });
  });

  test.describe("Capabilities section", () => {
    test("renders the section heading", async ({ page }) => {
      await expect(
        page.getByRole("heading", { name: "Command the whole platform" }),
      ).toBeVisible();
    });

    test("renders capability cards", async ({ page }) => {
      for (const label of [
        "Administration Dashboard",
        "Service Lifecycle",
        "Health & Status Monitoring",
      ]) {
        const card = page.getByRole("heading", { name: label });
        await card.scrollIntoViewIfNeeded();
        await expect(card).toBeVisible();
      }
    });

    test("renders the full capability list", async ({ page }) => {
      const item = page.getByText("Central Command Centre for the Platform");
      await item.scrollIntoViewIfNeeded();
      await expect(item).toBeVisible();
    });
  });

  test.describe("Why section", () => {
    test("renders the section heading", async ({ page }) => {
      const heading = page.getByRole("heading", {
        name: "Built for the whole stack",
      });
      await heading.scrollIntoViewIfNeeded();
      await expect(heading).toBeVisible();
    });

    test("renders the three value props", async ({ page }) => {
      for (const title of [
        "Unified Control Surface",
        "Full Lifecycle Control",
        "Governed & Audited",
      ]) {
        const prop = page.getByRole("heading", { name: title });
        await prop.scrollIntoViewIfNeeded();
        await expect(prop).toBeVisible();
      }
    });
  });

  test.describe("Bottom CTA section", () => {
    test("shows the conversion headline and CTA", async ({ page }) => {
      const cta = page.getByRole("button", { name: BOTTOM_CTA });
      await cta.scrollIntoViewIfNeeded();
      await expect(cta).toBeVisible();
      await expect(page.getByText("Your command centre")).toBeVisible();
    });
  });

  test.describe("Footer", () => {
    test("renders brand, copyright year and tagline", async ({ page }) => {
      const footer = page.getByRole("contentinfo");
      await footer.scrollIntoViewIfNeeded();
      await expect(footer).toBeVisible();
      await expect(footer.getByText(`© ${new Date().getFullYear()}`)).toBeVisible();
      await expect(
        footer.getByText("A Sharpnr Product — Part of the Sharpnr Ecosystem"),
      ).toBeVisible();
    });
  });

  test.describe("Primary conversion path", () => {
    // NOTE: the header "LAUNCH CONSOLE →" button is currently a visual
    // placeholder with no onClick wired in SiteHeader.tsx, so it does not
    // navigate yet. We assert it is present and interactive; once it is
    // wired to /home, tighten this to assert navigation like the hero CTA.
    test("header CTA is present and interactive", async ({ page }) => {
      const cta = page
        .getByRole("banner")
        .getByRole("button", { name: HEADER_CTA });
      await expect(cta).toBeVisible();
      await expect(cta).toBeEnabled();
    });

    test("hero CTA navigates toward the control panel", async ({ page }) => {
      await page.getByRole("button", { name: HERO_CTA, exact: true }).click();
      // /home is auth-guarded, so we land on /home or its login/setup redirect,
      // never back on the marketing root.
      await expect(page).not.toHaveURL(/\/$/);
    });
  });

  test.describe("Responsive (mobile viewport)", () => {
    test.use({ viewport: { width: 390, height: 844 } }); // iPhone 12-ish

    test("renders hero and CTA without sideways scroll", async ({ page }) => {
      await expect(page.getByText(HERO_LABEL)).toBeVisible();
      await expect(
        page.getByRole("button", { name: HERO_CTA, exact: true }),
      ).toBeVisible();
      expect(await hasNoHorizontalOverflow(page)).toBe(true);
    });
  });
});
