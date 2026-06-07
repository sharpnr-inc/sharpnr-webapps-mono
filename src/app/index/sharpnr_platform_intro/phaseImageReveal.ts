import type { PhaseConfig } from "./types";

interface PhaseImageRevealConfig extends PhaseConfig {
  duration?: number;
}

export function phaseImageReveal(
  tl: gsap.core.Timeline,
  el: HTMLElement | null,
  {
    at = 0.55,
    duration = 0.5,
    onComplete,
    onStart,
  }: PhaseImageRevealConfig = {},
) {
  tl.fromTo(
    el,
    {
      clipPath: "inset(100% 0% 0% 0%)",
      scale: 1.1,
    },
    {
      clipPath: "inset(0% 0% 0% 0%)",
      scale: 1,
      duration,
      ease: "power4.out",
      onComplete,
      onStart,
    },
    at,
  );
}
