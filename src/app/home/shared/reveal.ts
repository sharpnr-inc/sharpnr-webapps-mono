import { ScrollTrigger, gsap } from "@/configs/gsap";
import { prefersReduced } from "./motion";

/*
 * Typography choreography.
 *
 * This was anime.js, per an earlier Motion Language note that "Anime.js
 * controls typography choreography; GSAP controls large experiences".
 * Running two animation engines to move the same kind of property was never
 * worth its cost — a second runtime, a second easing vocabulary, and two
 * libraries able to write the same inline styles on the same element. GSAP
 * does all of it now.
 *
 * Words are React-owned <span.hp-word> elements, so re-renders never wipe
 * the split. ScrollTrigger only decides *when* the reveal fires.
 */

/** anime's `outExpo` at 820ms, matched: GSAP's expo.out over 0.82s. */
const DURATION = 0.82;
const STAGGER = 0.04;

function wordsIn(el: HTMLElement) {
  return Array.from(el.querySelectorAll<HTMLElement>(".hp-word"));
}

function playWords(words: HTMLElement[], startDelay = 0) {
  gsap.to(words, {
    opacity: 1,
    y: "0em",
    duration: DURATION,
    ease: "expo.out",
    stagger: STAGGER,
    delay: startDelay,
  });
}

/** Reveal a heading's words immediately (used above the fold). */
export function animeWordsNow(el: HTMLElement | null, startDelay = 0) {
  if (!el || prefersReduced()) return;
  const words = wordsIn(el);
  if (!words.length) return;
  gsap.set(words, { opacity: 0, y: "0.5em" });
  playWords(words, startDelay);
}

/**
 * Reveal a heading's words once it scrolls into view.
 *
 * `delay` (seconds) holds the words back after the trigger fires — used
 * where the scene's visual has to land its point before the headline states
 * it.
 */
export function animeWordsOnEnter(
  el: HTMLElement | null,
  trigger: Element,
  start = "top 80%",
  delay = 0,
) {
  if (!el || prefersReduced()) return;
  const words = wordsIn(el);
  if (!words.length) return;
  gsap.set(words, { opacity: 0, y: "0.5em" });
  ScrollTrigger.create({
    trigger,
    start,
    once: true,
    onEnter: () => playWords(words, delay),
  });
}
