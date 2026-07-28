import type { RefObject } from "react";
import { gsap, useGSAP } from "@/configs/gsap";
import { prefersReduced } from "@/app/home/shared/motion";
import { EASE, T, armWords, revealWords } from "@/app/home/shared/choreography";

interface PlatformHeroAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  eyebrowRef: RefObject<HTMLParagraphElement | null>;
  copyRef: RefObject<HTMLParagraphElement | null>;
  ctaRef: RefObject<HTMLDivElement | null>;
}

/*
 * The same opening beat as the homepage hero, so a visitor arriving on
 * /platform recognises it as the same site rather than a second product:
 *
 *   0.15  The Business Platform,
 *   0.45  Built for Everything.
 *   0.90  the sentence
 *   1.15  the invitation
 *
 * The word reveal itself lives in choreography.ts — timing shared with
 * every other heading on the site so the pages cannot drift apart.
 */
const AT = {
  line1: 0.15,
  line2: 0.45,
  copy: 0.9,
  cta: 1.15,
} as const;

export function usePlatformHeroAnimation(refs: PlatformHeroAnimationRefs) {
  const { sectionRef, eyebrowRef, copyRef, ctaRef } = refs;

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const line1 = section.querySelector(".phero-line-1");
      const line2 = section.querySelector(".phero-line-2");

      // Reduced motion: the finished frame, immediately.
      if (prefersReduced()) {
        gsap.set(gsap.utils.toArray(".hp-word", section), { opacity: 1 });
        return;
      }

      armWords(line1);
      armWords(line2);
      revealWords(line1, AT.line1);
      revealWords(line2, AT.line2);

      const buttons = ctaRef.current ? Array.from(ctaRef.current.children) : [];
      gsap
        .timeline({ defaults: { ease: EASE.in, duration: T.base } })
        .from(eyebrowRef.current, { opacity: 0, y: 10 }, 0)
        .from(copyRef.current, { opacity: 0, y: 16 }, AT.copy)
        .from(buttons, { opacity: 0, y: 12, stagger: 0.1 }, AT.cta);
    },
    { scope: sectionRef },
  );
}
