import type { PhaseConfig } from "./types";

interface PhaseCardsConfig extends PhaseConfig {
  duration?: number;
  stagger?: number;
}

export function phaseCards(
  tl: gsap.core.Timeline,
  container: HTMLElement | null,
  {
    at = 0.65,
    duration = 0.4,
    stagger = 0.08,
    onComplete,
    onStart,
  }: PhaseCardsConfig = {},
) {
  if (!container) return;
  const cards = container.querySelectorAll("[data-card]");

  tl.from(
    cards,
    {
      opacity: 0,
      y: 40,
      scale: 0.96,
      duration,
      stagger,
      ease: "power3.out",
      onComplete,
      onStart,
    },
    at,
  );
}
