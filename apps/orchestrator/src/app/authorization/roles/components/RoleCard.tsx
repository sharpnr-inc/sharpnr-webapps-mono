import { useId } from "react";
import {
  ShieldUser,
  Users,
  KeyRound,
  ArrowRight,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { OrgRole } from "../api/types";
import { useNavigate } from "@tanstack/react-router";

interface RoleCardProps {
  role: OrgRole;
  /** Number of people assigned this role, when known. */
  memberCount?: number;
  /** Hide the "Manage role" action (e.g. when already on the manage page). */
  hideAction?: boolean;
}

/** Roles that come built-in with every organization. */
const DEFAULT_ROLE_SLUGS = ["owner", "admin"];

export function RoleCard({ role, memberCount, hideAction }: RoleCardProps) {
  const nav = useNavigate();
  const isDefault = DEFAULT_ROLE_SLUGS.includes(role.slug);
  // Unique per instance so multiple cards don't share/clobber the SVG filter.
  const filterId = `role-metal-${useId().replace(/:/g, "")}`;

  return (
    <article
      className={cn(
        "group relative isolate flex min-h-80 flex-col overflow-hidden rounded-2xl",
        "bg-[radial-gradient(130%_120%_at_0%_0%,#23232b_0%,#15151a_45%,#0c0c10_100%)]",
        "shadow-[0_18px_40px_-18px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.06)_inset]",
        "transition-[transform,box-shadow] duration-300",
        "hover:-translate-y-0.5 hover:shadow-[0_26px_55px_-18px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.12)_inset]",
      )}
    >
      {/* Metallic displacement filter (visual only) */}
      <svg className="pointer-events-none absolute h-0 w-0" aria-hidden="true">
        <defs>
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.02"
              numOctaves={2}
              seed={4}
              result="noise"
            />
            <feColorMatrix in="noise" type="luminanceToAlpha" result="alpha" />
            <feSpecularLighting
              in="alpha"
              surfaceScale={6}
              specularConstant={1}
              specularExponent={18}
              lightingColor="#ffffff"
              result="light"
            >
              <fePointLight x={-100} y={-80} z={160} />
            </feSpecularLighting>
            <feComposite
              in="light"
              in2="SourceAlpha"
              operator="in"
              result="lit"
            />
          </filter>
        </defs>
      </svg>

      {/* Brushed-metal noise sheet */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.5] mix-blend-soft-light"
        style={{ filter: `url(#${filterId})` }}
      />

      {/* Static diagonal metalness highlight */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.02)_38%,rgba(255,255,255,0)_50%,rgba(255,255,255,0.04)_62%,rgba(255,255,255,0.12)_100%)] mix-blend-overlay" />

      {/* Primary-tinted glow that wakes up on hover */}
      <div className="pointer-events-none absolute -inset-px z-0 bg-[radial-gradient(120%_90%_at_85%_-10%,color-mix(in_oklab,var(--primary)_45%,transparent)_0%,transparent_55%)] opacity-40 transition-opacity duration-300 group-hover:opacity-90" />

      {/* Sweeping sheen */}
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-1/3 animate-[role-card-sheen_7s_linear_infinite] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)] opacity-40 mix-blend-overlay transition-opacity duration-300 group-hover:opacity-90" />
      </div>

      {/* Bright border ring */}
      <div className="pointer-events-none absolute inset-0 z-20 rounded-2xl p-px [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] mask-exclude bg-[linear-gradient(135deg,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0.08)_45%,rgba(255,255,255,0.05)_55%,rgba(255,255,255,0.4)_100%)]" />

      {/* ---- Content ---- */}
      <div className="relative z-30 flex flex-1 flex-col gap-4 p-5 text-white">
        {/* Top row: status badge + pulse icon */}
        <div className="flex items-center justify-between">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] backdrop-blur-sm",
              isDefault ? "text-white" : "text-white/70",
            )}
          >
            <KeyRound className="h-3 w-3" />
            {isDefault ? "Default" : "Custom"}
          </span>
          <Activity className="h-4 w-4 text-white/50" />
        </div>

        {/* Centered emblem + title */}
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white shadow-[0_4px_18px_rgba(0,0,0,0.4)] backdrop-blur-sm">
            <ShieldUser className="h-6 w-6" />
          </div>
          <h3 className="mt-3 text-lg font-semibold tracking-[0.02em] drop-shadow-sm">
            {role.name}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-white/60">
            {role.description}
          </p>
        </div>

        {/* Footer: members + action */}
        <div className="flex flex-col gap-2.5 border-t border-white/10 pt-3.5">
          <span className="inline-flex items-center justify-center gap-1.5 text-xs text-white/55">
            <Users className="h-3.5 w-3.5" />
            {memberCount !== undefined
              ? `${memberCount} ${memberCount === 1 ? "person" : "people"}`
              : "Manage access"}
          </span>
          {!hideAction && (
            <button
              onClick={() =>
                nav({
                  to: "/authorization/roles/$roleID",
                  params: {
                    roleID: role.id,
                  },
                })
              }
              type="button"
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-xs font-medium text-white backdrop-blur-sm transition-colors hover:border-white/30 hover:bg-white/20"
            >
              Manage role
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
