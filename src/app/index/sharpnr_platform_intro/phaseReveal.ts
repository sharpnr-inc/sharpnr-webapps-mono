import type { PhaseConfig } from "./types";

interface PhaseRevealConfig extends PhaseConfig {
  stagger?: number;
  duration?: number;
}

export function phaseReveal(
  tl: gsap.core.Timeline,
  lines: Element[],
  { at = 0, stagger = 0.08, duration = 0.4 }: PhaseRevealConfig = {},
) {
  tl.from(
    lines,
    {
      yPercent: 110,
      duration,
      stagger,
      ease: "power3.out",
    },
    at,
  );
}
