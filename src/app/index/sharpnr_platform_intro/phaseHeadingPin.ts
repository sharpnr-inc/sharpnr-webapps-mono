import type { PhaseConfig } from "./types";

interface Config extends PhaseConfig {
  duration?: number;
  paddingTop?: string | number;
  paddingLeft?: string | number;
  fontSize?: string | number;
  textAlign?: string;
  alignItems?: string;
  justifyContent?: string;
}

export function phaseHeadingPin(
  tl: gsap.core.Timeline,
  headingWrapper: HTMLDivElement,
  heading: HTMLHeadingElement,
  {
    at = 0.5,
    duration = 0.5,
    onComplete,
    onStart,
    paddingTop = "1.5rem",
    paddingLeft = "2rem",
    fontSize = "1.5rem",
    textAlign = "left",
    alignItems = "flex-start",
    justifyContent = "flex-start",
  }: Config = {},
) {
  tl.to(
    headingWrapper,
    {
      x: 0,
      y: 0,
      alignItems,
      justifyContent,
      paddingTop,
      paddingLeft,
      duration,
      ease: "power3.inOut",
      onStart,
    },
    at,
  ).to(
    heading,
    {
      fontSize,
      lineHeight: 1.2,
      textAlign,
      duration,
      ease: "power3.inOut",
      onComplete,
    },
    at,
  );
}
