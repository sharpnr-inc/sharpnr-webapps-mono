/// <reference types="vite-plugin-pwa/react" />

interface ImportMetaEnv {
  // Core API
  readonly VITE_API_URL: string;
  readonly VITE_API_CSRF: string;

  // Sharpnr platform services
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

  // Platform apps
  readonly VITE_API_AUTH_APP: string;
  readonly VITE_API_IAM_APP: string;

  // Business operation apps
  readonly VITE_API_HOSPITALITY_APP: string;

  // Guide & documentation
  readonly VITE_API_SHARPNRS_GUIDE_DOCS_APP: string;

  // Marketing website
  readonly VITE_WEBSITE_APP: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
