import { motion, useReducedMotion } from "framer-motion";
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
                aria-label={`${label} ${brand}`}
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
              <span className="font-medium">{brand}</span>
              <span className="opacity-60"> · {label}</span>
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
        "aria-label": `${label} ${brand}`,
      }
    : {};

  return (
    <SidebarFooter className={className}>
      <Wrapper
        {...wrapperLinkProps}
        style={{ background: NAVY }}
        className={cn(
          "relative block overflow-hidden rounded-xl outline-none",
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
            <span
              className="mb-1 truncate text-[9px] leading-none font-semibold tracking-[0.18em] uppercase"
              style={{ color: WHITE_DIM }}
            >
              {label}
            </span>
            <span
              className="truncate text-sm leading-tight font-bold tracking-tight"
              style={{ color: WHITE }}
            >
              {brand}
            </span>
          </div>
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
