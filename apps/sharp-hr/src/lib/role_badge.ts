// lib/role_badge.ts
// Central config for all employee roles.
// To add a new role: append an entry to ROLE_CONFIG below — nothing else needs to change.

export type EmployeeRole =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "EMPLOYEE"
  | "CONTRACTOR";

// ─── Role Config ────────────────────────────────────────────────────────────
// Each entry controls: display label, Tailwind color classes, and an emoji icon.
// `ring`  → subtle border ring color (Tailwind arbitrary or preset class)
// `glow`  → CSS box-shadow color injected via inline style for the pulse effect

export interface RoleConfig {
  label: string;         // Human-readable label shown in the badge
  icon: string;          // Emoji / unicode symbol
  bg: string;            // Tailwind background class
  text: string;          // Tailwind text color class
  border: string;        // Tailwind border class
  glow: string;          // CSS color string used for box-shadow glow
  dotColor: string;      // Tailwind class for the animated status dot
}

export const ROLE_CONFIG: Record<EmployeeRole, RoleConfig> = {
  SUPER_ADMIN: {
    label: "Super Admin",
    icon: "⚡",
    bg: "bg-violet-950/60",
    text: "text-violet-200",
    border: "border-violet-500/50",
    glow: "rgba(139, 92, 246, 0.45)",
    dotColor: "bg-violet-400",
  },
  ADMIN: {
    label: "Admin",
    icon: "🛡️",
    bg: "bg-blue-950/60",
    text: "text-blue-200",
    border: "border-blue-500/50",
    glow: "rgba(59, 130, 246, 0.40)",
    dotColor: "bg-blue-400",
  },
  EMPLOYEE: {
    label: "Employee",
    icon: "👤",
    bg: "bg-emerald-950/60",
    text: "text-emerald-200",
    border: "border-emerald-500/50",
    glow: "rgba(16, 185, 129, 0.35)",
    dotColor: "bg-emerald-400",
  },
  CONTRACTOR: {
    label: "Contractor",
    icon: "🔧",
    bg: "bg-amber-950/60",
    text: "text-amber-200",
    border: "border-amber-500/50",
    glow: "rgba(245, 158, 11, 0.38)",
    dotColor: "bg-amber-400",
  },
};

// Fallback for unknown / future roles not yet added to ROLE_CONFIG
export const UNKNOWN_ROLE_CONFIG: RoleConfig = {
  label: "Unknown",
  icon: "❓",
  bg: "bg-zinc-800/60",
  text: "text-zinc-300",
  border: "border-zinc-600/50",
  glow: "rgba(161, 161, 170, 0.25)",
  dotColor: "bg-zinc-400",
};

/**
 * Resolves a raw backend role string (e.g. "SUPER_ADMIN") to its RoleConfig.
 * Handles case-insensitive input and trims whitespace.
 */
export function resolveRoleConfig(raw: string): RoleConfig {
  const normalized = raw.trim().toUpperCase() as EmployeeRole;
  return ROLE_CONFIG[normalized] ?? UNKNOWN_ROLE_CONFIG;
}