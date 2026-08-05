const requiredVars = [
  // Core API
  "VITE_API_URL",
  "VITE_API_CSRF",

  // Internal Apps
  "VITE_API_ACCOUNTING_APP",
  "VITE_API_AUTH_APP",
  "VITE_API_ORCHESTRATOR_APP",
  "VITE_API_HOSPITALITY_APP",
  "VITE_API_IAM_APP",
  "VITE_API_MARKETING_APP",
  "VITE_API_HR_APP",
] as const;

type RequiredVar = (typeof requiredVars)[number];

requiredVars.forEach((key: RequiredVar) => {
  if (!import.meta.env[key]) {
    throw new Error(`Missing required env variable: ${key}`);
  }
});

export const config = {
  // Core API
  apiBaseUrl: import.meta.env.VITE_API_URL, // Main backend API
  csrfToken: import.meta.env.VITE_API_CSRF, // CSRF protection token

  // Internal Apps (Micro-frontends / Services)
  accountingAppUrl: import.meta.env.VITE_API_ACCOUNTING_APP, // Accounting module
  authAppUrl: import.meta.env.VITE_API_AUTH_APP, // Authentication service
  orchestratorAppUrl: import.meta.env.VITE_API_ORCHESTRATOR_APP, // Orchestrator / workflow engine
  hospitalityAppUrl: import.meta.env.VITE_API_HOSPITALITY_APP, // Hospitality module
  iamAppUrl: import.meta.env.VITE_API_IAM_APP, // Identity & Access Management
  marketingAppUrl: import.meta.env.VITE_API_MARKETING_APP, // Marketing module
  hrAppUrl: import.meta.env.VITE_API_HR_APP, // Human Resources module
} as const;
