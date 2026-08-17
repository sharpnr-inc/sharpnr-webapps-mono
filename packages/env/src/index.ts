/// <reference types="vite/client" />
import { z } from "zod";

/**
 * @file @sharpnr/env
 * @description Shared, validated access to the Sharpnr env variables.
 *
 * Every app used to carry its own `src/configs/env.ts` -- eight copies that had
 * drifted into eight different shapes (different required-var lists, different
 * validation, two different names for the same value). This is the single copy.
 *
 * ─── HOW TO USE ───────────────────────────────────────────────────────────────
 * No app keeps a local env file. Import the config directly:
 *
 *   import { config } from "@sharpnr/env";
 *
 *   <a href={config.cablesAppUrl} target="_blank" rel="noopener noreferrer">
 *     Open Cables
 *   </a>
 *
 *   window.location.replace(config.orchestratorAppUrl);
 *
 * This package is deliberately shipped as SOURCE -- its `exports` field points
 * at `src/`, and it has no build step. That is what lets the `config` export at
 * the bottom read `import.meta.env` and still get the *consuming app's* values:
 * each app's Vite compiles this file itself and substitutes its own env. A
 * prebuilt package would instead bake in whatever env existed when the package
 * was built, which is the same for every consumer and therefore wrong.
 *
 * ─── RULES ────────────────────────────────────────────────────────────────────
 * - ALWAYS import from `@sharpnr/env` for any external Sharpnr app URL
 * - NEVER hardcode an app URL in a component
 * - NEVER use <Link> from TanStack Router for external app URLs
 * - Use <a href={config.xyzAppUrl}> or window.location for external navigation
 *
 * ─── APP URL REFERENCE ────────────────────────────────────────────────────────
 * config.cablesAppUrl         → Cables (Messaging & Communications)
 * config.siloAppUrl           → Silo (Storage & Data Platform)
 * config.folioAppUrl          → Folio (Docs, Sheets, Whiteboards)
 * config.cortexAppUrl         → Cortex (IT Controls & Access Management)
 * config.orchestratorAppUrl   → Orchestrator (Command Center / Layer 2)
 * config.accountingAppUrl     → Sharp-Accounting (Finance & Accounting)
 * config.sharpcrmAppUrl       → Sharp-CRM (CRM, leads, campaigns)
 * config.hrAppUrl             → Sharp-HR (HRMS & Payroll)
 * config.iamAppUrl            → SharpIAM (Employee Portal)
 * config.hospitalityAppUrl    → Sharp-Hospitality (Business Ops - Hospitality)
 * config.marketplaceAppUrl    → Sharp-Marketplace (B2B / O2O Platform)
 * config.stockwaveAppUrl      → Stockwave (Inventory)
 * config.authAppUrl           → Auth App (Login portal)
 * config.docsAppUrl           → Sharpnr Guide & Documentation
 * config.websiteUrl           → Public marketing website
 *
 * ─── CTA RULES ────────────────────────────────────────────────────────────────
 * Login / Sign In button     → config.authAppUrl
 * Get Started / Sign Up CTA  → config.authAppUrl + "/signup"
 * Contact CTA                → internal page or mailto:  (not authAppUrl)
 */

/**
 * Every URL is normalised without its trailing slash so callers can build
 * `${config.iamAppUrl}/some/path` without producing a double slash.
 */
const appUrl = z.url().transform((value) => value.replace(/\/+$/, ""));

const envSchema = z.object({
  // Core API
  VITE_API_URL: appUrl,
  VITE_API_CSRF: z.string().min(1),

  // Sharpnr platform services
  VITE_API_ACCOUNTING_APP: appUrl,
  VITE_API_ORCHESTRATOR_APP: appUrl,
  VITE_API_SHARPCRM_APP: appUrl,
  VITE_API_HR_APP: appUrl,
  VITE_API_SILO_APP: appUrl,
  VITE_API_CORTEX_APP: appUrl,
  VITE_API_FOLIO_APP: appUrl,
  VITE_API_STOCKWAVE_APP: appUrl,
  VITE_API_SHARP_MARKETPLACE_APP: appUrl,
  VITE_API_CABLES_APP: appUrl,

  // Platform apps
  VITE_API_AUTH_APP: appUrl,
  VITE_API_IAM_APP: appUrl,

  // Business operation apps
  VITE_API_HOSPITALITY_APP: appUrl,

  // Guide & documentation
  VITE_API_SHARPNRS_GUIDE_DOCS_APP: appUrl,

  // Marketing website
  VITE_WEBSITE_APP: appUrl,

  // ── Legacy aliases ───────────────────────────────────────────────────────
  // Older apps read these names for values that now have canonical spellings.
  // Optional so a .env without them still validates; the canonical var is used
  // as the fallback below. Remove once no app reads the old name.
  VITE_API_MARKETING_APP: appUrl.optional(), // → VITE_API_SHARPCRM_APP
  VITE_API_MARKETPLACE_APP: appUrl.optional(), // → VITE_API_SHARP_MARKETPLACE_APP

  // ── Third-party, not declared in .env.example ────────────────────────────
  // Four apps listed these as REQUIRED while no env file defines them, which
  // threw at startup. Nothing reads the resulting values, so they are optional
  // here. Promote to required once they are added to .env.example.
  VITE_API_CITY_STATE_BASE_URL: appUrl.optional(),
  VITE_API_CITY_STATE_API_KEY: z.string().min(1).optional(),
});

export type SharpnrEnv = z.infer<typeof envSchema>;

/**
 * Validates the raw env object and returns the app config.
 *
 * Throws with every problem listed at once, rather than failing on the first
 * missing variable, so a misconfigured `.env` is fixed in a single pass.
 *
 * @param rawEnv the app's `import.meta.env`
 */
export function createConfig(rawEnv: unknown) {
  const parsed = envSchema.safeParse(rawEnv);

  if (!parsed.success) {
    const problems = parsed.error.issues
      .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");

    throw new Error(
      `Invalid environment configuration (compare against .env.example at the repo root):\n${problems}`,
    );
  }

  const env = parsed.data;

  return {
    // Core API
    apiBaseUrl: env.VITE_API_URL, // Main backend API (Sharpnr-Engine)
    csrfToken: env.VITE_API_CSRF, // CSRF cookie name
    /** @deprecated alias of `csrfToken`, kept for orchestrator's call sites */
    csrfCookieName: env.VITE_API_CSRF,

    // Sharpnr Platform Services
    accountingAppUrl: env.VITE_API_ACCOUNTING_APP, // Finance, P&L, double-entry accounting
    orchestratorAppUrl: env.VITE_API_ORCHESTRATOR_APP, // Command Center — manage all apps & workflows
    sharpcrmAppUrl: env.VITE_API_SHARPCRM_APP, // CRM, leads, campaigns
    /** @deprecated alias of `sharpcrmAppUrl` — the app was renamed from Sharp-Marketing */
    marketingAppUrl: env.VITE_API_MARKETING_APP ?? env.VITE_API_SHARPCRM_APP,
    hrAppUrl: env.VITE_API_HR_APP, // HRMS, payroll, attendance, leaves
    siloAppUrl: env.VITE_API_SILO_APP, // Storage, data lake, data warehouse
    cortexAppUrl: env.VITE_API_CORTEX_APP, // IT controls, RBAC, access management
    folioAppUrl: env.VITE_API_FOLIO_APP, // Docs, sheets, whiteboards, PDFs
    stockwaveAppUrl: env.VITE_API_STOCKWAVE_APP, // Inventory
    marketplaceAppUrl:
      env.VITE_API_SHARP_MARKETPLACE_APP ?? env.VITE_API_MARKETPLACE_APP, // B2B / O2O trading
    cablesAppUrl: env.VITE_API_CABLES_APP, // Messaging, video calls, channels

    // Platform Apps
    authAppUrl: env.VITE_API_AUTH_APP, // Login & signup portal
    iamAppUrl: env.VITE_API_IAM_APP, // Employee portal — tasks, payslips, leaves

    // Business Operation Apps
    hospitalityAppUrl: env.VITE_API_HOSPITALITY_APP, // Hotels, restaurants, POS

    // Guide & Documentation
    docsAppUrl: env.VITE_API_SHARPNRS_GUIDE_DOCS_APP,

    // Marketing
    websiteUrl: env.VITE_WEBSITE_APP, // Public website

    // Third-party (see note on the schema above)
    cityStateBaseUrl: env.VITE_API_CITY_STATE_BASE_URL,
    cityStateApiKey: env.VITE_API_CITY_STATE_API_KEY,
  } as const;
}

export type SharpnrConfig = ReturnType<typeof createConfig>;

/**
 * The parsed config for the importing app.
 *
 * This package is consumed as source (its `exports` points at `src/`), so each
 * app's Vite compiles this line itself and substitutes that app's
 * `import.meta.env`. A prebuilt package could not do this -- it would bake in
 * whatever env was present when the package was built.
 */
export const config = createConfig(import.meta.env);
