import { motion } from "framer-motion";

/* -------------------------------------------------------------------------- */
/*                          Status colors (theme vars)                        */
/* -------------------------------------------------------------------------- */

const STATUS_COLOR: Record<string, string> = {
  nominal: "var(--color-primary)",
  degraded: "var(--color-destructive)",
  offline: "var(--color-muted-foreground)",
};

/** Pulsing status dot. Defaults to the "nominal" (primary) color. */
export function PulseDot({ status = "nominal" }: { status?: string }) {
  const color = STATUS_COLOR[status] ?? STATUS_COLOR.nominal;
  return (
    <span className="relative flex h-2 w-2">
      <motion.span
        className="absolute inline-flex h-full w-full rounded-full opacity-75"
        style={{ backgroundColor: color }}
        animate={{ scale: [1, 2.2, 1], opacity: [0.75, 0, 0.75] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: color }} />
    </span>
  );
}

/** Faint engineering grid + a slow vertical scanline. */
export function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <svg className="absolute inset-0 w-full h-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}

/** Four corner brackets that frame a card. */
export function CornerBrackets({ className = "" }: { className?: string }) {
  const s = "absolute w-3 h-3 border-border";
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <span className={`${s} top-0 left-0 border-t border-l`} />
      <span className={`${s} top-0 right-0 border-t border-r`} />
      <span className={`${s} bottom-0 left-0 border-b border-l`} />
      <span className={`${s} bottom-0 right-0 border-b border-r`} />
    </div>
  );
}

/** Rotating orbit ring with a single traveling node — hero decoration. */
export function OrbitRing({
  radius,
  duration,
  offset = 0,
}: {
  radius: number;
  duration: number;
  offset?: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full border border-border/30"
      style={{
        width: radius * 2,
        height: radius * 2,
        top: `calc(50% - ${radius}px)`,
        left: `calc(50% - ${radius}px)`,
      }}
      animate={{ rotate: 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear", delay: offset }}
    >
      <div
        className="absolute w-1.5 h-1.5 rounded-full bg-primary/60"
        style={{ top: -3, left: "50%", transform: "translateX(-50%)" }}
      />
    </motion.div>
  );
}
