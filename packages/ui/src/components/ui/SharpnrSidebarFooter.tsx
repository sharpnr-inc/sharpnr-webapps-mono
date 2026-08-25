import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useSidebar, SidebarFooter } from "./sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { cn } from "../../lib/utils";

/**
 * Brand colours are intentionally hard-coded rather than themed: this badge is
 * a fixed Sharpnr mark, and it must read the same in light and dark mode.
 */
const NAVY = "#0B0D2E";
const NAVY_MID = "#141741";
const NAVY_BRIGHT = "#1E2260";
const WHITE = "#F0F2F7";
const WHITE_DIM = "rgba(240,242,247,0.55)";

const DEFAULT_LOGO = "https://cdn.sharpnr.com/shicon.svg";

export interface SharpnrSidebarFooterProps {
  /**
   * Name of the app rendering this footer, e.g. "Orchestrator" or "Sharp HR".
   * When set it becomes the primary line and Sharpnr moves to the attribution
   * line below it. Omit to keep the plain "Powered by / Sharpnr" badge.
   */
  appName?: string;
  /** Optional version or environment pill shown beside the app name. */
  version?: string;
  /** Where the badge links to. Pass `null` to render a non-interactive badge. */
  href?: string | null;
  /** Small uppercase eyebrow text shown above the brand name. */
  label?: string;
  /** Brand name shown in bold. */
  brand?: string;
  /** Logo image source. */
  logoSrc?: string;
  /** Extra classes applied to the footer wrapper. */
  className?: string;
}

/**
 * The drifting glow behind the badge.
 *
 * This used to animate the `background` property through an array of
 * radial-gradient strings. Gradients are a paint property -- the browser
 * repaints the whole element every frame and none of it reaches the
 * compositor. Since this footer is mounted on every page of every app, that
 * ran forever, everywhere. Moving a pre-painted blob with `translate` instead
 * is GPU-composited and costs essentially nothing.
 */
function Glow({ animate }: { animate: boolean }) {
  return (
    <motion.span
      aria-hidden="true"
      className="pointer-events-none absolute -inset-8 rounded-full blur-2xl"
      style={{
        background: `radial-gradient(circle, ${NAVY_BRIGHT} 0%, transparent 65%)`,
        willChange: animate ? "transform" : undefined,
      }}
      initial={false}
      animate={animate ? { x: ["-18%", "18%", "-18%"], y: ["12%", "-12%", "12%"] } : undefined}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

/** Fixed 32px so it lines up with the collapsed icon rail in every app. */
function Logo({ logoSrc, animate }: { logoSrc: string; animate: boolean }) {
  return (
    <motion.div
      whileHover={animate ? { scale: 1.08 } : undefined}
      whileTap={animate ? { scale: 0.94 } : undefined}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="relative size-8 shrink-0"
    >
      <div
        className="absolute inset-[1.5px] z-10 overflow-hidden rounded-[8px]"
        style={{ background: NAVY_MID }}
      >
        <img
          src={logoSrc}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="size-full object-cover"
        />
      </div>
    </motion.div>
  );
}

export function SharpnrSidebarFooter({
  appName,
  version,
  href = "https://sharpnr.com",
  label = "Powered by",
  brand = "Sharpnr",
  logoSrc = DEFAULT_LOGO,
  className,
}: SharpnrSidebarFooterProps = {}) {
  const { state, isMobile } = useSidebar();
  const reduceMotion = useReducedMotion();
  // On mobile the sidebar renders as a full-width sheet, so even though
  // `state` reports "collapsed" we want the full expanded layout there.
  const isCollapsed = state === "collapsed" && !isMobile;
  const animate = !reduceMotion;

  // With an appName the app leads and Sharpnr becomes the attribution;
  // without one this falls back to the original eyebrow-over-brand badge.
  const primary = appName ?? brand;
  const secondary = appName ? `${label} ${brand}` : label;

  // Screen readers get the destination and the new-tab behaviour, which the
  // visual arrow only hints at.
  const accessibleName = [
    appName ? `${appName} — ${label} ${brand}` : `${label} ${brand}`,
    href ? "(opens in a new tab)" : "",
  ]
    .filter(Boolean)
    .join(" ");

  // ── Collapsed: a compact navy brand badge sized to the icon rail ──
  if (isCollapsed) {
    return (
      <SidebarFooter className={cn("p-0", className)}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.a
                href={href ?? undefined}
                target={href ? "_blank" : undefined}
                rel={href ? "noopener noreferrer" : undefined}
                aria-label={accessibleName}
                whileHover={animate ? { scale: 1.08 } : undefined}
                whileTap={animate ? { scale: 0.94 } : undefined}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className={cn(
                  "relative mx-auto flex size-8 items-center justify-center overflow-hidden rounded-[10px] outline-none",
                  "focus-visible:ring-2 focus-visible:ring-sidebar-ring",
                  href ? "cursor-pointer" : "cursor-default",
                )}
                style={{ background: NAVY }}
                onClick={href ? undefined : (e) => e.preventDefault()}
              >
                <Glow animate={animate} />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-[10px]"
                  style={{
                    boxShadow:
                      "inset 0 0 0 1px rgba(240,242,247,0.12), inset 0 1px 0 rgba(240,242,247,0.20)",
                  }}
                />
                <img
                  src={logoSrc}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  className="relative z-10 size-5 rounded-[5px] object-contain"
                />
              </motion.a>
            </TooltipTrigger>
            <TooltipContent side="right" align="center">
              <div className="flex flex-col gap-0.5">
                <span className="font-medium">
                  {primary}
                  {version ? (
                    <span className="ml-1 font-normal opacity-60">{version}</span>
                  ) : null}
                </span>
                <span className="text-xs opacity-60">{secondary}</span>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </SidebarFooter>
    );
  }

  // ── Expanded: full card ──
  const Wrapper = href ? motion.a : motion.div;
  const wrapperLinkProps = href
    ? {
        href,
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label": accessibleName,
      }
    : {};

  return (
    <SidebarFooter className={className}>
      <Wrapper
        {...wrapperLinkProps}
        style={{ background: NAVY }}
        whileHover={animate && href ? { y: -1 } : undefined}
        whileTap={animate && href ? { scale: 0.99 } : undefined}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={cn(
          "group/brand relative block overflow-hidden rounded-xl outline-none",
          // Narrow sidebars and the mobile sheet get tighter padding.
          "p-2.5 sm:p-3",
          "focus-visible:ring-2 focus-visible:ring-sidebar-ring",
        )}
      >
        <Glow animate={animate} />

        {/* Inner border */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-xl"
          style={{
            boxShadow:
              "inset 0 0 0 1px rgba(240,242,247,0.10), inset 0 1px 0 rgba(240,242,247,0.18)",
          }}
        />

        {/* Dot constellation. Static: an animated opacity here was a second
            always-on timer for an effect nobody can consciously perceive. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle, ${WHITE} 1px, transparent 1px)`,
            backgroundSize: "14px 14px",
          }}
        />

        {/* Top shimmer */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${WHITE}, transparent)`,
            opacity: animate ? undefined : 0.4,
          }}
          initial={false}
          animate={animate ? { opacity: [0.2, 0.6, 0.2] } : undefined}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* ── Content row ── */}
        {/* min-w-0 has to be on every level of the flex chain, or the text
            column refuses to shrink and the card overflows a narrow sidebar. */}
        <div className="relative flex min-w-0 items-center gap-2.5 sm:gap-3">
          <Logo logoSrc={logoSrc} animate={animate} />

          <div className="flex min-w-0 flex-col">
            {/* With an appName the app leads and the attribution sits under it.
                Without one, keep the original eyebrow-above-brand order so the
                bare badge still reads "Powered by / Sharpnr". */}
            {!appName ? (
              <span
                className="mb-1 truncate text-[9px] leading-none font-semibold tracking-[0.18em] uppercase"
                style={{ color: WHITE_DIM }}
              >
                {label}
              </span>
            ) : null}

            <div className="flex min-w-0 items-center gap-1.5">
              <span
                className="truncate text-sm leading-tight font-bold tracking-tight"
                style={{ color: WHITE }}
              >
                {primary}
              </span>

              {version ? (
                <span
                  className="shrink-0 rounded-full px-1.5 py-px text-[9px] leading-[1.4] font-semibold tracking-wide tabular-nums"
                  style={{ background: "rgba(240,242,247,0.12)", color: WHITE_DIM }}
                >
                  {version}
                </span>
              ) : null}
            </div>

            {appName ? (
              <span
                className="mt-0.5 truncate text-[10px] leading-none font-medium tracking-[0.08em]"
                style={{ color: WHITE_DIM }}
              >
                {secondary}
              </span>
            ) : null}
          </div>

          {/* Outbound affordance -- the card was a link with nothing to say so. */}
          {href ? (
            <ArrowUpRight
              aria-hidden="true"
              className="ml-auto size-3.5 shrink-0 opacity-0 transition-opacity duration-200 group-hover/brand:opacity-70 group-focus-visible/brand:opacity-70"
              style={{ color: WHITE }}
            />
          ) : null}
        </div>

        {/* Bottom shimmer */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-4 bottom-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${WHITE_DIM}, transparent)`,
          }}
        />
      </Wrapper>
    </SidebarFooter>
  );
}
