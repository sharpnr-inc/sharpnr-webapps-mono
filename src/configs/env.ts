import { z } from "zod";

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
});

const parsed = envSchema.safeParse(import.meta.env);

if (!parsed.success) {
  const problems = parsed.error.issues
    .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
    .join("\n");

  throw new Error(
    `Invalid environment configuration (compare against .env.example):\n${problems}`,
  );
}

const env = parsed.data;

export const config = {
  // Core API
  apiBaseUrl: env.VITE_API_URL, // Main backend API (Sharpnr Engine)
  csrfToken: env.VITE_API_CSRF, // CSRF cookie name

  // Sharpnr Platform Services
  accountingAppUrl: env.VITE_API_ACCOUNTING_APP, // Accounting
  orchestratorAppUrl: env.VITE_API_ORCHESTRATOR_APP, // Orchestrator / workspace switcher
  sharpcrmAppUrl: env.VITE_API_SHARPCRM_APP, // CRM
  hrAppUrl: env.VITE_API_HR_APP, // Human Resources
  siloAppUrl: env.VITE_API_SILO_APP, // Silo (storage)
  cortexAppUrl: env.VITE_API_CORTEX_APP, // Cortex
  folioAppUrl: env.VITE_API_FOLIO_APP, // Folio
  stockwaveAppUrl: env.VITE_API_STOCKWAVE_APP, // Stockwave (inventory)
  marketplaceAppUrl: env.VITE_API_SHARP_MARKETPLACE_APP, // Sharp Marketplace
  cablesAppUrl: env.VITE_API_CABLES_APP, // Cables

  // Platform Apps
  authAppUrl: env.VITE_API_AUTH_APP, // Authentication
  iamAppUrl: env.VITE_API_IAM_APP, // Identity & Access Management

  // Business Operation Apps
  hospitalityAppUrl: env.VITE_API_HOSPITALITY_APP, // This app

  // Guide & Documentation
  docsAppUrl: env.VITE_API_SHARPNRS_GUIDE_DOCS_APP, // Sharpnr guide & docs

  // Marketing
  websiteUrl: env.VITE_WEBSITE_APP, // Public website
} as const;
