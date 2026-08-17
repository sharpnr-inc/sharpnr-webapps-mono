import { motion } from "framer-motion";

/**
 * Cables mark, redrawn from public/logo/cables-mark-{dark,light}.svg so it can
 * scale and animate inline. Geometry is identical to the shipped asset:
 * four ports on a 120 grid, cable bezier from the top-left port to the
 * bottom-right port.
 *
 * Brand rule: the cable is always #D9762F. Do not recolour it.
 */

const CABLE = "M34 47 C34 86, 86 34, 86 73";
const PATCH = "#D9762F";

/** `ink` = mark sits on a dark ground, `paper` = on a light ground. */
export type Ground = "ink" | "paper";

const PORTS: Record<Ground, { live: string; idle: string }> = {
  ink: { live: "#EDE8E1", idle: "#3f3a34" },
  paper: { live: "#111010", idle: "#c3bcb1" },
};

export function CablesMark({
  ground = "ink",
  className = "h-8 w-8",
  animated = false,
}: {
  ground?: Ground;
  className?: string;
  /** Draws the cable in on mount. Hero use only — keep chrome instances static. */
  animated?: boolean;
}) {
  const { live, idle } = PORTS[ground];

  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden focusable="false">
      <circle cx="34" cy="34" r="13" fill={live} />
      <circle cx="86" cy="34" r="13" fill={idle} />
      <circle cx="34" cy="86" r="13" fill={idle} />
      <circle cx="86" cy="86" r="13" fill={live} />
      {animated ? (
        <motion.path
          d={CABLE}
          stroke={PATCH}
          strokeWidth="9"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        />
      ) : (
        <path
          d={CABLE}
          stroke={PATCH}
          strokeWidth="9"
          strokeLinecap="round"
          fill="none"
        />
      )}
    </svg>
  );
}

/**
 * Mark + wordmark, matching the proportions of the shipped lockup but set in
 * live text so it stays crisp and selectable.
 */
export function CablesLockup({
  ground = "ink",
  subline = true,
  className = "",
}: {
  ground?: Ground;
  subline?: boolean;
  className?: string;
}) {
  const word = ground === "ink" ? "text-paper" : "text-ink";
  const sub = ground === "ink" ? "text-paper-muted" : "text-paper-muted";

  return (
    // gap-3 keeps roughly one port diameter of clear space beside the mark
    <span className={`flex items-center gap-3 ${className}`}>
      <CablesMark ground={ground} className="h-8 w-8 shrink-0" />
      <span className="flex flex-col leading-none">
        <span
          className={`font-mono text-lg font-bold tracking-tight lowercase ${word}`}
        >
          cables
        </span>
        {subline && (
          <span
            className={`mt-1 font-mono text-[9px] tracking-[0.24em] uppercase ${sub}`}
          >
            Patch your people in
          </span>
        )}
      </span>
    </span>
  );
}
