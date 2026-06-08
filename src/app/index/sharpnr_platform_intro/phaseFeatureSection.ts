import type { PhaseConfig } from "./types";

interface Config extends PhaseConfig {
  duration?: number;
}

export function phaseFeatures(
  tl: gsap.core.Timeline,
  explainerItems: (HTMLDivElement | null)[],
  cardItems: (HTMLDivElement | null)[],
  {
    at = 1,
    duration = 0.4,
  }: Config = {},
) {
  const baseAt = typeof at === "number" ? at : 1; // ← safe cast

  const validItems = explainerItems
    .map((el, i) => ({ explainer: el, card: cardItems[i] }))
    .filter((item): item is { explainer: HTMLDivElement; card: HTMLDivElement } =>
      item.explainer !== null && item.card !== null,
    );

  validItems.forEach(({ explainer, card }, i) => {
    const offset = baseAt + i * 1;       // ← now valid
    const outOffset = offset + 0.6;

    tl.to(explainer, { opacity: 1, y: 0, duration, ease: "power3.out" }, offset)
      .to(card, { opacity: 1, scale: 1, duration, ease: "power3.out" }, offset);

    if (i < validItems.length - 1) {
      tl.to(explainer, { opacity: 0, y: -24, duration: duration * 0.8, ease: "power2.in" }, outOffset)
        .to(card, { opacity: 0, scale: 1.03, duration: duration * 0.8, ease: "power2.in" }, outOffset);
    }
  });
}
