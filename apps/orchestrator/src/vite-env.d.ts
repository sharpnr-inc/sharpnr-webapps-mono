/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
  // Core API
  readonly VITE_API_URL: string;
  readonly VITE_API_CSRF: string;

  // Platform Services
  readonly VITE_API_ACCOUNTING_APP: string;
  readonly VITE_API_ORCHESTRATOR_APP: string;
  readonly VITE_API_SHARPCRM_APP: string;
  readonly VITE_API_HR_APP: string;
  readonly VITE_API_SILO_APP: string;
  readonly VITE_API_CORTEX_APP: string;
  readonly VITE_API_FOLIO_APP: string;
  readonly VITE_API_STOCKWAVE_APP: string;
  readonly VITE_API_SHARP_MARKETPLACE_APP: string;
  readonly VITE_API_CABLES_APP: string;

  // Platform Apps
  readonly VITE_API_AUTH_APP: string;
  readonly VITE_API_IAM_APP: string;

  // Business Operation Apps
  readonly VITE_API_HOSPITALITY_APP: string;

  // Guide & Website
  readonly VITE_API_SHARPNRS_GUIDE_DOCS_APP: string;
  readonly VITE_WEBSITE_APP: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
