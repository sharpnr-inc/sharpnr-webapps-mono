/**
 * Silo "Shear" identity primitives.
 *
 * Geometry is taken verbatim from /public/mark-color.svg — three bands on a
 * fixed -14° shear inside a 100×100 box. Per the identity pack the bands are
 * never rotated, restacked, or recolored beyond the approved ink/accent pair.
 */

type MarkProps = {
  size?: number | string;
  /** Colour of the two outer bands. */
  band?: string;
  /** Colour of the centre band. Drop to `band` below 24px for legibility. */
  accent?: string;
  className?: string;
};

export function SiloMark({
  size = 28,
  band = "#FFFFFF",
  accent = "#5A66F0",
  className,
}: MarkProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g transform="translate(13,0) skewX(-14)">
        <rect x="0" y="6" width="86" height="22" fill={band} />
        <rect x="14" y="39" width="72" height="22" fill={accent} />
        <rect x="0" y="72" width="86" height="22" fill={band} />
      </g>
    </svg>
  );
}

type LockupProps = {
  markSize?: number;
  /** Small type set beneath the wordmark. */
  descriptor?: string;
  className?: string;
};

export function SiloLockup({
  markSize = 26,
  descriptor,
  className = "",
}: LockupProps) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <SiloMark size={markSize} />
      <span className="flex flex-col gap-[3px]">
        <span className="brand-title text-[17px] leading-none text-chalk">
          Silo<span className="text-accent-dark">-</span>Engine
        </span>
        {descriptor && (
          <span className="font-mono text-[9px] uppercase leading-none tracking-[0.22em] text-chalk-dim">
            {descriptor}
          </span>
        )}
      </span>
    </span>
  );
}

/**
 * A single sheared band — the identity's atomic unit, reused as a rule,
 * an accent tick, and a section marker.
 */
export function Band({
  w = 40,
  h = 4,
  className = "bg-accent-dark",
}: {
  w?: number | string;
  h?: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`shear inline-block shrink-0 ${className}`}
      style={{ width: w, height: h }}
    />
  );
}

/** Eyebrow label: accent band + mono caps. Opens every section. */
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-accent-hi">
      <Band w={22} h={3} />
      {children}
    </p>
  );
}

/** Section heading in the brand display face. */
export function SectionTitle({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`brand-title text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.02] text-chalk ${className}`}
    >
      {children}
    </h2>
  );
}

/** Hard-edged button. The identity has no rounded corners. */
export function BrandButton({
  children,
  variant = "solid",
  href = "#",
}: {
  children: React.ReactNode;
  variant?: "solid" | "ghost";
  href?: string;
}) {
  const base =
    "group inline-flex items-center gap-2.5 px-6 py-3 text-[13px] font-medium tracking-tight transition-colors duration-150";
  const styles =
    variant === "solid"
      ? "bg-accent-dark text-ink hover:bg-accent-hi"
      : "border border-rule text-chalk-muted hover:border-chalk-faint hover:text-chalk";

  return (
    <a href={href} className={`${base} ${styles}`}>
      {children}
      <Band
        w={12}
        h={2}
        className={
          variant === "solid"
            ? "bg-ink transition-[width] duration-200 group-hover:w-5"
            : "bg-accent-dark transition-[width] duration-200 group-hover:w-5"
        }
      />
    </a>
  );
}

/**
 * Monospaced technical panel with a band-marked title bar. Used for every
 * diagram and code sample lifted out of the architecture doc.
 */
export function Panel({
  title,
  meta,
  children,
  className = "",
}: {
  title: string;
  meta?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`border border-rule bg-ink-raised ${className}`}>
      <div className="flex items-center justify-between gap-4 border-b border-rule px-4 py-2.5">
        <span className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-chalk-muted">
          <Band w={14} h={3} />
          {title}
        </span>
        {meta && (
          <span className="font-mono text-[10px] tracking-wider text-chalk-dim">
            {meta}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}
