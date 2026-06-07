import type { PhaseConfig } from "./types";

interface PhaseBottomCopyConfig extends PhaseConfig {
  duration?: number;
}

export function phaseBottomCopy(
  tl: gsap.core.Timeline,
  el: HTMLElement | null,
  {
    at = 0.88,
    duration = 0.4,
    onComplete,
    onStart,
  }: PhaseBottomCopyConfig = {},
) {
  tl.from(
    el,
    {
      opacity: 0,
      y: 32,
      duration,
      ease: "power3.out",
      onComplete,
      onStart,
    },
    at,
  );
}
