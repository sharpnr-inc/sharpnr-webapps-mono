import { gsap } from "@/configs/gsap";

/** Motion Language: honor prefers-reduced-motion everywhere. */
export const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Section Reveal (Motion Language 3.0): fade + 24px upward, 600ms,
 * easeOutCubic, 80ms stagger. Fires exactly once when the section
 * enters — never replays. Returns the tween so callers can chain.
 */
export function revealOnce(
  targets: gsap.TweenTarget,
  trigger: Element,
  vars: gsap.TweenVars = {},
) {
  return gsap.from(targets, {
    opacity: 0,
    y: 24,
    duration: 0.6,
    ease: "power3.out",
    stagger: 0.08,
    scrollTrigger: { trigger, start: "top 78%", once: true },
    ...vars,
  });
}

/**
 * Continuous scroll-scrubbed parallax — tied directly to scroll position
 * (not an enter/leave toggle), so the visual keeps drifting the entire time
 * a section is on screen, in both directions. Always targets a DIFFERENT
 * element than any entrance timeline in the same scene, so the two never
 * fight over `transform` (see Motion Language amendment v3.2).
 */
export function parallaxOnScroll(
  el: Element | null,
  trigger: Element,
  distance = 36,
) {
  if (!el || prefersReduced()) return;
  gsap.to(el, {
    yPercent: -distance,
    ease: "none",
    scrollTrigger: { trigger, start: "top bottom", end: "bottom top", scrub: true },
  });
}
