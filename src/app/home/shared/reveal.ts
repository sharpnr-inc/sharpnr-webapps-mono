import { ScrollTrigger } from "@/configs/gsap";
import { prefersReduced } from "./motion";
import { armWords, revealWords } from "./choreography";

/*
 * Typography choreography.
 *
 * Thin wrappers over the shared vocabulary in choreography.ts — the timing
 * and easing live there so every heading on the page arrives identically.
 * This was anime.js once; running a second animation engine to move the
 * same properties GSAP was already moving was never worth its cost.
 *
 * Words are React-owned <span.hp-word> elements, so re-renders never wipe
 * the split. ScrollTrigger only decides *when*.
 */

/** Reveal a heading's words immediately (used above the fold). */
export function animeWordsNow(el: HTMLElement | null, startDelay = 0) {
  if (!el || prefersReduced()) return;
  armWords(el);
  revealWords(el, startDelay);
}

/**
 * Reveal a heading's words once it scrolls into view.
 *
 * `delay` is in seconds — used where a scene's visual has to land its point
 * before the headline states it.
 */
export function animeWordsOnEnter(
  el: HTMLElement | null,
  trigger: Element,
  start = "top 80%",
  delay = 0,
) {
  if (!el || prefersReduced()) return;
  armWords(el);
  ScrollTrigger.create({
    trigger,
    start,
    once: true,
    onEnter: () => revealWords(el, delay),
  });
}
