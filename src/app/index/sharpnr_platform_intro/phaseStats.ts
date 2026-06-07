import type { PhaseConfig } from "./types";

interface PhaseStatsConfig extends PhaseConfig {
  duration?: number;
  stagger?: number;
}

export function phaseStats(
  tl: gsap.core.Timeline,
  container: HTMLElement | null,
  {
    at = 0.75,
    duration = 0.45,
    stagger = 0.06,
    onComplete,
    onStart,
  }: PhaseStatsConfig = {},
) {
  if (!container) return;
  const stats = container.querySelectorAll("[data-stat]");

  // slide up + fade
  tl.from(
    stats,
    {
      opacity: 0,
      y: 30,
      duration,
      stagger,
      ease: "power2.out",
      onComplete,
      onStart,
    },
    at,
  );

  // number count-up on each stat value
  container.querySelectorAll("[data-stat-value]").forEach((el) => {
    const target = parseFloat(el.getAttribute("data-stat-value") ?? "0");
    const counter = { val: 0 };
    tl.to(
      counter,
      {
        val: target,
        duration: duration * 1.5,
        ease: "power2.out",
        onUpdate() {
          el.textContent = Math.round(counter.val).toLocaleString();
        },
      },
      at,
    );
  });
}
