import type { PhaseConfig } from "./types";

interface Config extends PhaseConfig {
  duration?: number;
  stagger?: number;
}

export function phaseHeadingReveal(
  tl: gsap.core.Timeline,
  lines: Element[],
  { at = 0, duration = 0.5, stagger = 0.12, onComplete, onStart }: Config = {},
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