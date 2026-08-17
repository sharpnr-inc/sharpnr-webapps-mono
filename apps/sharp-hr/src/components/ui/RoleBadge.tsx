"use client";

// components/RoleBadge.tsx
// Drop-in badge that accepts a raw backend role string and renders a styled,
// animated badge with normalized text, icon, and a pulsing glow effect.

import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge"; // Shadcn UI
import { cn } from "@/lib/utils"; // Shadcn cn helper
import { resolveRoleConfig } from "@/lib/role_badge";
import type { RoleConfig } from "@/lib/role_badge";

// ─── Props ───────────────────────────────────────────────────────────────────

interface RoleBadgeProps {
  /** Raw role string from the backend — e.g. "SUPER_ADMIN", "admin", "CONTRACTOR" */
  role: string;
  /** Show the animated glow ring (default: true) */
  glow?: boolean;
  /** Show the pulsing status dot (default: true) */
  showDot?: boolean;
  /** Extra Tailwind classes forwarded to the badge wrapper */
  className?: string;
}

// ─── Pulse dot ───────────────────────────────────────────────────────────────

const PulseDot = ({ colorClass }: { colorClass: string }) => (
  <span className="relative flex h-2 w-2 shrink-0">
    <motion.span
      className={cn(
        "absolute inline-flex h-full w-full rounded-full opacity-75",
        colorClass,
      )}
      animate={{ scale: [1, 1.8, 1], opacity: [0.75, 0, 0.75] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
    />
    <span
      className={cn("relative inline-flex h-2 w-2 rounded-full", colorClass)}
    />
  </span>
);

// ─── RoleBadge ───────────────────────────────────────────────────────────────

export function RoleBadge({
  role,
  glow = true,
  showDot = true,
  className,
}: RoleBadgeProps) {
  const config: RoleConfig = resolveRoleConfig(role);

  // Glow keyframes applied directly on the badge — no extra positioned element,
  // so it can never bleed outside the table cell.
  const glowOn = `0 0 8px 2px ${config.glow}, inset 0 1px 0 rgba(255,255,255,0.07)`;
  const glowOff = `0 0 3px 0px ${config.glow}, inset 0 1px 0 rgba(255,255,255,0.07)`;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={role}
        initial={{ opacity: 0, scale: 0.82, y: 4 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.88, y: -4 }}
        transition={{ type: "spring", stiffness: 380, damping: 28 }}
        className="inline-flex"
      >
        <motion.div
          // Pulse the boxShadow on the wrapper — contained, never bleeds
          animate={glow ? { boxShadow: [glowOff, glowOn, glowOff] } : {}}
          transition={
            glow ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" } : {}
          }
          style={{ borderRadius: "9999px" }}
        >
          <Badge
            className={cn(
              "relative isolate inline-flex items-center gap-1.5",
              "select-none cursor-default font-medium tracking-wide text-xs",
              "rounded-full border px-2.5 py-0.5",
              "backdrop-blur-sm",
              "hover:brightness-110",
              config.bg,
              config.text,
              config.border,
              className,
            )}
            style={
              !glow ? { inset: "0 1px 0 rgba(255,255,255,0.07)" } : undefined
            }
          >
            {/* Icon */}
            <motion.span
              className="leading-none"
              whileHover={{ rotate: [0, -12, 12, 0], scale: 1.2 }}
              transition={{ duration: 0.4 }}
              aria-hidden
            >
              {config.icon}
            </motion.span>

            {/* Label */}
            <span>{config.label}</span>

            {/* Pulse dot */}
            {showDot && <PulseDot colorClass={config.dotColor} />}
          </Badge>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default RoleBadge;
