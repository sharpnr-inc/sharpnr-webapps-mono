import type { PhaseConfig } from "./types";

interface PhaseSubtitleConfig extends PhaseConfig {
  duration?: number;
}

export function phaseSubtitle(
  tl: gsap.core.Timeline,
  el: HTMLElement | null,
  { at = 0.3, duration = 0.35, onComplete, onStart }: PhaseSubtitleConfig = {},
) {
  tl.from(
    el,
    {
      opacity: 0,
      y: 24,
      duration,
      ease: "power2.out",
      onComplete,
      onStart,
    },
    at,
  );
}
