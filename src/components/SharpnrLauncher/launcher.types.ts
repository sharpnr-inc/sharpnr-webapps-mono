import React from "react";

export interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType;
  to: string;
}

export interface NavSection {
  id: string;
  title: string;
  items: NavItem[];
  isSubSection?: boolean;
}

/* ===== BACKEND STRUCTURE ===== */

export interface DomainConfig {
  Modules: string[];
  Infras: string[];
}

/**
 * Example:
 * [
 *   { Hospitality: {...} },
 *   { Medical: {...} }
 * ]
 */
export type DomainEntry = Record<string, DomainConfig>;

export interface LauncherPayload {
  Domains: DomainEntry[];
}
