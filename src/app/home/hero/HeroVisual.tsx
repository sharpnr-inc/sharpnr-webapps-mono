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
/*
 * Grouped into three clusters — Platform (upper left), Business (right),
 * Intelligence (lower) — positioned onto an invisible grid. The grouping
 * is never drawn or labelled; it only has to be felt, so the field reads
 * as an ordered system rather than words scattered round a circle.
 */
/* Real capabilities a visitor can map onto their own business, not
   abstractions — "Accounting" lands where "Security" only gestures. */
const WORDS: Word[] = [
  // Platform
  { label: "Identity", left: 6, y: 12, tier: 1 },
  { label: "Storage", left: 0, y: 25, tier: 2 },
  { label: "Communication", left: 10, y: 38, tier: 1 },
  // Business
  { label: "CRM", right: 8, y: 16, tier: 2 },
  { label: "Marketplace", right: 0, y: 29, tier: 1 },
  { label: "Accounting", right: 6, y: 42, tier: 1 },
  // Intelligence
  { label: "Operations", left: 8, y: 66, tier: 1 },
  { label: "Analytics", right: 10, y: 70, tier: 2 },
  { label: "Knowledge", left: 30, y: 82, tier: 3 },
];

/* Depth without going 3D: tier is distance from the viewer, expressed as
   opacity, a hair of scale and — furthest back only — a sub-pixel blur.
   The eye reads the field as layered instead of as one flat plane, and a
   pulse arriving lifts its target clear of all of it. */
const TIER = {
  1: "text-[0.6875rem] text-mute opacity-100",
  2: "text-[0.6875rem] text-mute opacity-70 scale-[0.94]",
  3: "hidden text-[0.6875rem] text-mute opacity-40 blur-[0.3px] scale-[0.88] sm:inline",
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
      <div className="hero-halo absolute left-1/2 top-1/2 size-[300px] -translate-x-1/2 -translate-y-1/2" />

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
          className={`hero-word absolute whitespace-nowrap font-mono font-medium uppercase tracking-[0.12em] ${TIER[word.tier]}`}
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
