/// <reference types="vite/client" />

const requiredVars = [
  // Core API
  "VITE_API_URL",
  "VITE_API_CSRF",

  // Third-party
  "VITE_API_CITY_STATE_BASE_URL",
  "VITE_API_CITY_STATE_API_KEY",

  // Internal Apps
  "VITE_API_ACCOUNTING_APP",
  "VITE_API_AUTH_APP",
  "VITE_API_ORCHESTRATOR_APP",
  "VITE_API_HOSPITALITY_APP",
  "VITE_API_IAM_APP",
  "VITE_API_MARKETING_APP",
  "VITE_API_HR_APP",

  // New Services
  "VITE_API_CABLES_APP",
  "VITE_API_SILO_APP",
  "VITE_API_FOLIO_APP",
  "VITE_API_MARKETPLACE_APP",
] as const;

type RequiredVar = (typeof requiredVars)[number];

requiredVars.forEach((key: RequiredVar) => {
  if (!import.meta.env[key]) {
    throw new Error(`Missing required env variable: ${key}`);
  }
});

export const config = {
  // Core API
  apiBaseUrl: import.meta.env.VITE_API_URL,
  csrfToken: import.meta.env.VITE_API_CSRF,

  // Third-party Services
  cityStateBaseUrl: import.meta.env.VITE_API_CITY_STATE_BASE_URL,
  cityStateApiKey: import.meta.env.VITE_API_CITY_STATE_API_KEY,

  accountingAppUrl: import.meta.env.VITE_API_ACCOUNTING_APP,
  authAppUrl: import.meta.env.VITE_API_AUTH_APP,
  orchestratorAppUrl: import.meta.env.VITE_API_ORCHESTRATOR_APP,
  hospitalityAppUrl: import.meta.env.VITE_API_HOSPITALITY_APP,
  iamAppUrl: import.meta.env.VITE_API_IAM_APP,
  marketingAppUrl: import.meta.env.VITE_API_MARKETING_APP,
  hrAppUrl: import.meta.env.VITE_API_HR_APP,

  // New Services
  cablesAppUrl: import.meta.env.VITE_API_CABLES_APP,
  siloAppUrl: import.meta.env.VITE_API_SILO_APP,
  folioAppUrl: import.meta.env.VITE_API_FOLIO_APP,
  marketplaceAppUrl: import.meta.env.VITE_API_MARKETPLACE_APP,
} as const;
