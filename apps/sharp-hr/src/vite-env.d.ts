interface ImportMetaEnv {
  // Core API
  readonly VITE_API_URL: string;
  readonly VITE_API_CSRF: string;

  // Internal Apps
  readonly VITE_API_ACCOUNTING_APP: string;
  readonly VITE_API_AUTH_APP: string;
  readonly VITE_API_ORCHESTRATOR_APP: string;
  readonly VITE_API_HOSPITALITY_APP: string;
  readonly VITE_API_IAM_APP: string;
  readonly VITE_API_SHARPCRM_APP: string;
  readonly VITE_API_HR_APP: string;
  readonly VITE_API_CABLES_APP: string;
  readonly VITE_API_SILO_APP: string;
  readonly VITE_API_FOLIO_APP: string;
  readonly VITE_API_MARKETPLACE_APP: string;
  readonly VITE_API_CORTEX_APP: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
