import type { PhaseConfig } from "./types";

interface PhaseHeadingRevealConfig extends PhaseConfig {
  duration?: number;
  stagger?: number;
}

export function phaseHeadingReveal(
  tl: gsap.core.Timeline,
  lines: Element[],
  {
    at = 0,
    duration = 0.4,
    stagger = 0.1,
    onComplete,
    onStart,
  }: PhaseHeadingRevealConfig = {},
) {
  tl.from(
    lines,
    {
      yPercent: 110,
      opacity: 0,
      duration,
      stagger,
      ease: "power3.out",
      onComplete,
      onStart,
    },
    at,
  );
}
