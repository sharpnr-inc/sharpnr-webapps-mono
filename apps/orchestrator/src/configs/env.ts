const requiredVars = [
  // Core API
  "VITE_API_URL",
  "VITE_API_CSRF",

  // Platform Services
  "VITE_API_ACCOUNTING_APP",
  "VITE_API_ORCHESTRATOR_APP",
  "VITE_API_SHARPCRM_APP",
  "VITE_API_HR_APP",
  "VITE_API_SILO_APP",
  "VITE_API_CORTEX_APP",
  "VITE_API_FOLIO_APP",
  "VITE_API_STOCKWAVE_APP",
  "VITE_API_SHARP_MARKETPLACE_APP",
  "VITE_API_CABLES_APP",

  // Platform Apps
  "VITE_API_AUTH_APP",
  "VITE_API_IAM_APP",

  // Business Operation Apps
  "VITE_API_HOSPITALITY_APP",

  // Guide & Website
  "VITE_API_SHARPNRS_GUIDE_DOCS_APP",
  "VITE_WEBSITE_APP",
] as const;

type RequiredVar = (typeof requiredVars)[number];

const missingVars = requiredVars.filter(
  (key: RequiredVar) => !import.meta.env[key],
);

if (missingVars.length > 0) {
  throw new Error(
    `Missing required env variable(s): ${missingVars.join(", ")}. ` +
      `Copy .env.example to .env.development (or .env.production) and fill them in.`,
  );
}

export const config = {
  // Core API
  apiBaseUrl: import.meta.env.VITE_API_URL, // Main backend API (Sharpnr-Engine)
  csrfCookieName: import.meta.env.VITE_API_CSRF, // CSRF cookie name

  // Platform Services
  accountingAppUrl: import.meta.env.VITE_API_ACCOUNTING_APP, // Accounting module
  orchestratorAppUrl: import.meta.env.VITE_API_ORCHESTRATOR_APP, // Orchestrator / workflow engine
  sharpcrmAppUrl: import.meta.env.VITE_API_SHARPCRM_APP, // CRM / marketing module
  hrAppUrl: import.meta.env.VITE_API_HR_APP, // Human Resources module
  siloAppUrl: import.meta.env.VITE_API_SILO_APP, // Silo (storage) module
  cortexAppUrl: import.meta.env.VITE_API_CORTEX_APP, // Cortex module
  folioAppUrl: import.meta.env.VITE_API_FOLIO_APP, // Folio module
  stockwaveAppUrl: import.meta.env.VITE_API_STOCKWAVE_APP, // Stockwave module
  marketplaceAppUrl: import.meta.env.VITE_API_SHARP_MARKETPLACE_APP, // Sharp Marketplace
  cablesAppUrl: import.meta.env.VITE_API_CABLES_APP, // Cables module

  // Platform Apps
  authAppUrl: import.meta.env.VITE_API_AUTH_APP, // Authentication service
  iamAppUrl: import.meta.env.VITE_API_IAM_APP, // Identity & Access Management

  // Business Operation Apps
  hospitalityAppUrl: import.meta.env.VITE_API_HOSPITALITY_APP, // Hospitality module

  // Guide & Website
  docsAppUrl: import.meta.env.VITE_API_SHARPNRS_GUIDE_DOCS_APP, // Guide & documentation
  websiteUrl: import.meta.env.VITE_WEBSITE_APP, // Public marketing website
} as const;
