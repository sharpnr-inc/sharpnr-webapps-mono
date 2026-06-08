import type { PhaseConfig } from "./types";

interface Config extends PhaseConfig {
  duration?: number;
}

export function phaseHeadingPin(
  tl: gsap.core.Timeline,
  headingWrapper: HTMLDivElement,
  heading: HTMLHeadingElement,
  { at = 0.5, duration = 0.5, onComplete, onStart }: Config = {},
) {
  tl.to(
    headingWrapper,
    {
      x: 0,
      y: 0,
      alignItems: "flex-start",
      justifyContent: "flex-start",
      paddingTop: "1.5rem",
      paddingLeft: "2rem",
      duration,
      ease: "power3.inOut",
      onStart,
    },
    at,
  ).to(
    heading,
    {
      fontSize: "1.5rem",
      lineHeight: 1.2,
      textAlign: "left",
      duration,
      ease: "power3.inOut",
      onComplete,
    },
    at,
  );
}
