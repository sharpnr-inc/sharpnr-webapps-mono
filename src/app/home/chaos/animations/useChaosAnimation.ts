import type { RefObject } from "react";
import { gsap, useGSAP } from "@/configs/gsap";
import { prefersReduced, revealOnce } from "@/app/home/shared/motion";
import { animeWordsOnEnter } from "@/app/home/shared/reveal";

interface ChaosAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  headingRef: RefObject<HTMLHeadingElement | null>;
  copyRef: RefObject<HTMLParagraphElement | null>;
  lineRef: RefObject<HTMLParagraphElement | null>;
}

/* How far each word drifts out of line. Deliberate, not random: the first
   word holds, and the damage grows as the sentence goes on. */
const DRIFT = [
  { x: 0, y: 0, o: 1 },
  { x: 14, y: 18, o: 0.72 },
  { x: -10, y: 34, o: 0.5 },
  { x: 26, y: 12, o: 0.62 },
  { x: -18, y: 48, o: 0.38 },
  { x: 34, y: 30, o: 0.44 },
];

/**
 * Scene 02 motion — the sentence loses its line.
 *
 * Scroll pulls the words off their baseline and dims them unevenly, so the
 * thought becomes progressively harder to hold. Scrubbed, so the visitor is
 * the one taking it apart — which is exactly what happened to their business.
 * Transform and opacity only.
 */
export function useChaosAnimation(refs: ChaosAnimationRefs) {
  const { sectionRef, headingRef, copyRef, lineRef } = refs;

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || !lineRef.current) return;

      animeWordsOnEnter(headingRef.current, section);
      if (copyRef.current) revealOnce(copyRef.current, section, { delay: 0.15 });
      if (prefersReduced()) return;

      const words = Array.from(
        lineRef.current.querySelectorAll<HTMLElement>(".hp-frag"),
      );

      gsap.to(words, {
        x: (i: number) => DRIFT[i % DRIFT.length].x,
        y: (i: number) => DRIFT[i % DRIFT.length].y,
        opacity: (i: number) => DRIFT[i % DRIFT.length].o,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "bottom 55%",
          scrub: true,
        },
      });
    },
    { scope: sectionRef },
  );
}
