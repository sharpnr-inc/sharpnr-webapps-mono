import type { PhaseConfig } from "./types";

interface PhaseScaleToCornerConfig extends PhaseConfig {
  scale?: number;
  offsetX?: number;
  offsetY?: number;
  duration?: number;
}

export function phaseScaleToCorner(
  tl: gsap.core.Timeline,
  heading: HTMLHeadingElement,
  {
    at = 0.5,
    scale = 0.18,
    offsetX = 24,
    offsetY = 24,
    duration = 0.5,
  }: PhaseScaleToCornerConfig = {},
) {
  tl.to(
    heading,
    {
      scale,
      x: () =>
        -(heading.offsetWidth / 2) +
        (heading.offsetWidth * scale) / 2 +
        offsetX,
      y: () =>
        -(window.innerHeight / 2) +
        (heading.offsetHeight * scale) / 2 +
        offsetY,
      transformOrigin: "center center",
      ease: "power3.inOut",
      duration,
    },
    at,
  );
}
