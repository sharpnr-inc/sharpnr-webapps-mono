/*
 * Hero supporting visual — Scene 01.
 *
 * Typography only, with the official SHARPNR wordmark as the centre of
 * gravity. Independent platform words converge on that centre and settle
 * around it. Once settled, the field stays quietly alive: words drift a
 * few pixels on their own rhythm, a handful of related pairs occasionally
 * pulse a connection between them, and a few soft motes drift through the
 * whole composition — never a diagram, never continuous, never loud.
 *
 * Decorative: hidden from assistive technology.
 */

import { Wordmark } from "@/app/home/shared/Wordmark";
import { HERO_SPOKES } from "./heroLinks";

interface Word {
  label: string;
  /**
   * Ring placement. Left-hand words anchor from the left edge, right-hand
   * words from the right, so nothing can spill out and cause horizontal
   * scroll at any width.
   */
  left?: number;
  right?: number;
  y: number;
  /** 1 = closest to the centre and strongest, 3 = outermost and quietest. */
  tier: 1 | 2 | 3;
}

/*
 * Platform foundations, per 05_Platform.md. Only capabilities Sharpnr
 * actually provides appear here. Order is the reveal order — it works
 * around the composition rather than top-to-bottom, so the field fills in
 * organically instead of like a list.
 */
const WORDS: Word[] = [
  { label: "Identity", left: 43, y: 2, tier: 1 },
  { label: "Permissions", left: 21, y: 13, tier: 1 },
  { label: "Data", right: 27, y: 13, tier: 1 },
  { label: "Communication", left: 2, y: 25, tier: 1 },
  { label: "Workflows", right: 4, y: 25, tier: 1 },
  { label: "Automation", left: 0, y: 47, tier: 1 },
  { label: "Security", right: 2, y: 47, tier: 1 },
  { label: "Storage", left: 7, y: 60, tier: 2 },
  { label: "Insights", right: 11, y: 60, tier: 2 },
  { label: "Marketplace", left: 0, y: 72, tier: 2 },
  { label: "Operations", left: 39, y: 72, tier: 2 },
  { label: "Accounting", right: 3, y: 72, tier: 2 },
  { label: "Customers", left: 15, y: 83, tier: 3 },
  { label: "People", right: 22, y: 83, tier: 3 },
  { label: "Intelligence", left: 37, y: 93, tier: 3 },
];

/* Hierarchy lives in size and weight of presence, never in colour. */
const TIER = {
  1: "text-[0.875rem] text-mute",
  2: "text-[0.875rem] text-mute",
  3: "hidden text-[0.875rem] text-mute sm:inline",
} as const;

/** A few soft motes drifting through the field — data, not decoration. */
const PARTICLE_COUNT = 4;

export function HeroVisual() {
  return (
    <div
      className="hero-visual relative mx-auto aspect-5/4 w-full max-w-md sm:aspect-square"
      aria-hidden="true"
    >
      {/* Centre of gravity — soft light, never a shape */}
      <div className="hero-halo absolute left-1/2 top-1/2 h-40 w-72 -translate-x-1/2 -translate-y-1/2" />

      {/* Relationships — a word occasionally sends a pulse to the mark */}
      <svg className="pointer-events-none absolute inset-0 size-full overflow-visible">
        {HERO_SPOKES.map((label) => (
          <g key={label} className="hero-link-group" data-a={label}>
            <path className="hero-link" fill="none" />
            <circle className="hero-pulse" r="2.5" />
          </g>
        ))}
      </svg>

      {/* Soft data particles, drifting slowly through the composition */}
      {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
        <span key={i} className="hero-particle absolute size-1 rounded-full" />
      ))}

      {WORDS.map((word) => (
        <span
          key={word.label}
          data-label={word.label}
          className={`hero-word absolute whitespace-nowrap font-medium tracking-tight ${TIER[word.tier]}`}
          style={
            word.right !== undefined
              ? { right: `${word.right}%`, top: `${word.y}%` }
              : { left: `${word.left}%`, top: `${word.y}%` }
          }
        >
          {word.label}
        </span>
      ))}

      {/* Everything belongs to one platform */}
      <Wordmark className="hero-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[clamp(1.5rem,4.2vw,2.25rem)]" />
    </div>
  );
}
