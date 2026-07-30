/// <reference types="vite/client" />

/**
 * @file env.ts
 * @description Central configuration file for all external Sharpnr app URLs and API keys.
 *
 * ─── HOW TO USE ───────────────────────────────────────────────────────────────
 * Import `config` wherever you need to link to an external Sharpnr app:
 *
 *   import { config } from "@/configs/env";
 *
 *   // Link to an external app
 *   <a href={config.cablesAppUrl} target="_blank" rel="noopener noreferrer">
 *     Open Cables
 *   </a>
 *
 *   // Or use window.location for programmatic navigation
 *   window.location.replace(config.orchestratorAppUrl);
 *
 * ─── RULES FOR CLAUDE CODE ────────────────────────────────────────────────────
 * - ALWAYS import from this file for any external Sharpnr app URL
 * - NEVER hardcode any app URL directly in a component
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
 * config.sharpCRMAppUrl       → Sharp-CRM / Sharp-Marketing (CRM)
 * config.hrAppUrl             → Sharp-HR (HRMS & Payroll)
 * config.iamAppUrl            → SharpIAM (Employee Portal)
 * config.hospitalityAppUrl    → Sharp Operations · Hospitality (Business Ops)
 * config.marketplaceAppUrl    → Sharp-Marketplace (B2B / O2O Platform)
 * config.authAppUrl           → Auth App (Login portal for existing Sharpnr clients & organizations)

 * ─── CTA RULES ───────────────────────────────────────────────────────────────
 * Login / Sign In button     → config.authAppUrl               (existing clients — login)
 * Get Started / Sign Up CTA  → config.authAppUrl + "/signup"   (new clients — register)
 * Contact CTA                → internal page or mailto:         (not authAppUrl)
 */

const requiredVars = [
  // Core API
  "VITE_API_URL",
  "VITE_API_CSRF",

  // Third-party
  "VITE_API_AUTH_APP",

  // Sharpnr Core Services (Layer 3)
  "VITE_API_ACCOUNTING_APP",
  "VITE_API_ORCHESTRATOR_APP",
  "VITE_API_IAM_APP",
  "VITE_API_SHARPCRM_APP",
  "VITE_API_HR_APP",
  "VITE_API_CABLES_APP",
  "VITE_API_SILO_APP",
  "VITE_API_FOLIO_APP",
  "VITE_API_CORTEX_APP",

  // Business Operations Layer (Layer 1)
  "VITE_API_HOSPITALITY_APP",

  // Platform Apps & Services (Layer 4)
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

  // Auth — Login & Signup portal for Sharpnr clients & organizations
  authAppUrl: import.meta.env.VITE_API_AUTH_APP, // Base URL for auth app
  // Usage:
  // Login  → config.authAppUrl
  // Signup → config.authAppUrl + "/signup"

  // Sharpnr Core Services (Layer 3)
  orchestratorAppUrl: import.meta.env.VITE_API_ORCHESTRATOR_APP, // Command Center — manage all apps & workflows
  accountingAppUrl: import.meta.env.VITE_API_ACCOUNTING_APP, // Finance, P&L, double-entry accounting
  sharpCRMAppUrl: import.meta.env.VITE_API_SHARPCRM_APP, // CRM, leads, campaigns (renaming to Sharp-CRM)
  hrAppUrl: import.meta.env.VITE_API_HR_APP, // HRMS, payroll, attendance, leaves
  iamAppUrl: import.meta.env.VITE_API_IAM_APP, // Employee portal — tasks, payslips, leaves
  cablesAppUrl: import.meta.env.VITE_API_CABLES_APP, // Messaging, video calls, channels
  siloAppUrl: import.meta.env.VITE_API_SILO_APP, // Storage, data lake, data warehouse
  folioAppUrl: import.meta.env.VITE_API_FOLIO_APP, // Docs, sheets, whiteboards, PDFs
  cortexAppUrl: import.meta.env.VITE_API_CORTEX_APP, // IT controls, RBAC, access management

  // Business Operations Layer (Layer 1)
  hospitalityAppUrl: import.meta.env.VITE_API_HOSPITALITY_APP, // Sharp Operations · Hospitality — hotels, restaurants, POS

  // Platform Apps & Services (Layer 4)
  marketplaceAppUrl: import.meta.env.VITE_API_MARKETPLACE_APP, // Sharp-Marketplace — B2B / O2O trading
} as const;
