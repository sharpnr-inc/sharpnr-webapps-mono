import type { PhaseConfig } from "./types";

interface PhaseScaleToCornerConfig extends PhaseConfig {
  scale?: number;
  offsetX?: number;
  offsetY?: number;
  duration?: number;
}

export function phaseScaleToCorner(
  tl: gsap.core.Timeline,
  headingWrap: HTMLElement | null,
  {
    at = 0.45,
    scale = 0.3,
    offsetX = 48,
    offsetY = 24,
    duration = 0.3,
    onComplete,
    onStart,
  }: PhaseScaleToCornerConfig = {},
) {
  if (!headingWrap) return;

  tl.to(
    headingWrap,
    {
      // scale from top-left so it visually anchors to the corner
      scale,
      transformOrigin: "top left",
      // translate to top-left of the viewport
      x: () => -headingWrap.getBoundingClientRect().left + offsetX,
      y: () => -headingWrap.getBoundingClientRect().top + offsetY,
      ease: "power3.inOut",
      duration,
      onComplete,
      onStart,
    },
    at,
  );
}
