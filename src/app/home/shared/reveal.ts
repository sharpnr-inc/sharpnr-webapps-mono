import { animate, stagger, utils } from "animejs";
import { ScrollTrigger } from "@/configs/gsap";
import { prefersReduced } from "./motion";

/*
 * Typography choreography — anime.js (per Motion Language: "Anime.js
 * controls typography choreography; GSAP controls large experiences").
 * Words are React-owned <span.hp-word> elements, so re-renders never wipe
 * the split. GSAP ScrollTrigger only decides *when* the reveal fires.
 */

function wordsIn(el: HTMLElement) {
  return Array.from(el.querySelectorAll<HTMLElement>(".hp-word"));
}

function playWords(words: HTMLElement[], startDelay = 0) {
  animate(words, {
    opacity: [0, 1],
    translateY: ["0.5em", "0em"],
    duration: 820,
    ease: "outExpo",
    delay: stagger(40, { start: startDelay }),
  });
}

/** Reveal a heading's words immediately (used above the fold). */
export function animeWordsNow(el: HTMLElement | null, startDelay = 0) {
  if (!el || prefersReduced()) return;
  const words = wordsIn(el);
  if (!words.length) return;
  utils.set(words, { opacity: 0, translateY: "0.5em" });
  playWords(words, startDelay);
}

/** Reveal a heading's words once it scrolls into view. */
export function animeWordsOnEnter(
  el: HTMLElement | null,
  trigger: Element,
  start = "top 80%",
) {
  if (!el || prefersReduced()) return;
  const words = wordsIn(el);
  if (!words.length) return;
  utils.set(words, { opacity: 0, translateY: "0.5em" });
  ScrollTrigger.create({
    trigger,
    start,
    once: true,
    onEnter: () => playWords(words),
  });
}
