import type { ReactNode } from "react";
import { Icon } from "../components/icons";

/* -------------------------------------------------------------------------- */
/*                                  Branding                                  */
/* -------------------------------------------------------------------------- */

export const BRAND = {
  logo: "/orchestrator-hub.svg",
  name: "SHARPNR",
  product: "ORCHESTRATOR",
  tagline: "A Sharpnr Product — Part of the Sharpnr Ecosystem",
  alpha: "Currently In Development — Alpha Candidate is Live",
} as const;

/* -------------------------------------------------------------------------- */
/*                          Capabilities (feature grid)                       */
/* -------------------------------------------------------------------------- */

export interface Capability {
  id: string;
  label: string;
  sub: string;
  icon: ReactNode;
  body: string;
}

/** The core Orchestrator capabilities, surfaced as cards. */
export const CAPABILITIES: Capability[] = [
  {
    id: "dashboard",
    label: "Administration Dashboard",
    sub: "Control Plane",
    icon: Icon.grid,
    body: "A single console to observe, configure, and command the entire Sharpnr Platform.",
  },
  {
    id: "lifecycle",
    label: "Service Lifecycle",
    sub: "Start · Stop · Restart",
    icon: Icon.refresh,
    body: "Bring Sharp services up, take them down, or restart them on demand — full lifecycle control.",
  },
  {
    id: "apps",
    label: "Enable / Disable Apps",
    sub: "Application Control",
    icon: Icon.power,
    body: "Switch platform applications on or off for your organization the moment you need them.",
  },
  {
    id: "health",
    label: "Health & Status Monitoring",
    sub: "Observability",
    icon: Icon.signal,
    body: "Watch the status and health of every service in real time and catch issues early.",
  },
  {
    id: "logs",
    label: "Logs & Diagnostics",
    sub: "Insight",
    icon: Icon.terminal,
    body: "Inspect logs and diagnostics across services to understand exactly what is happening.",
  },
  {
    id: "workflow",
    label: "Workflow & Automation",
    sub: "Orchestration",
    icon: Icon.zap,
    body: "Orchestrate workflows and automation across your apps and services from one place.",
  },
  {
    id: "rbac",
    label: "Role-Based Access",
    sub: "Governance",
    icon: Icon.shield,
    body: "Grant precise administrative access so the right people command the right parts of the platform.",
  },
  {
    id: "audit",
    label: "Audit Logs & Activity",
    sub: "Accountability",
    icon: Icon.activity,
    body: "Every administrative action is recorded — a complete, reviewable trail of who did what and when.",
  },
  {
    id: "alerts",
    label: "Alerts & Notifications",
    sub: "Awareness",
    icon: Icon.bell,
    body: "Stay informed with platform alerts and notifications the moment something needs attention.",
  },
];

/** The full administrative capability set — shown as a compact bracketed list. */
export const CAPABILITY_LIST: string[] = [
  "Platform Administration Dashboard",
  "Start, Stop & Restart Sharp Services",
  "Enable / Disable Platform Applications",
  "Service Health & Status Monitoring",
  "View Logs & Diagnostics",
  "Platform Configuration Management",
  "Workflow & Automation Management",
  "Resource Usage Monitoring",
  "User Session Management",
  "API & Integration Management",
  "Platform Alerts & Notifications",
  "Maintenance Mode Controls",
  "Audit Logs & Administrative Activity",
  "Role-Based Administrative Access",
  "Stakeholder View of the Organization",
  "Central Command Centre for the Platform",
];

/* -------------------------------------------------------------------------- */
/*                            Why Orchestrator (3)                            */
/* -------------------------------------------------------------------------- */

export interface ValueProp {
  icon: ReactNode;
  title: string;
  body: string;
}

export const VALUE_PROPS: ValueProp[] = [
  {
    icon: Icon.grid,
    title: "Unified Control Surface",
    body: "One interface to observe, configure, and command every Sharpnr service. Context switches eliminated. Cognitive load reduced.",
  },
  {
    icon: Icon.refresh,
    title: "Full Lifecycle Control",
    body: "Start, stop, and restart services and enable or disable apps for your organization — all from a single command plane.",
  },
  {
    icon: Icon.shield,
    title: "Governed & Audited",
    body: "Role-based administrative access paired with a complete audit trail of every action taken across the platform.",
  },
];
