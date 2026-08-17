import type { RefObject } from "react";
import { gsap, useGSAP } from "@/configs/gsap";
import { prefersReduced } from "@/app/home/shared/motion";
import { EASE, T, armWords, revealWords } from "@/app/home/shared/choreography";

interface AboutHeroAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  eyebrowRef: RefObject<HTMLParagraphElement | null>;
  copyRef: RefObject<HTMLParagraphElement | null>;
  ctaRef: RefObject<HTMLDivElement | null>;
}

/*
 * The belief appears quietly — words first, nothing else. Same beat as the
 * homepage and platform heroes; the timing lives in choreography.ts so no
 * page's opening can drift from another's.
 */
const AT = {
  line1: 0.15,
  line2: 0.45,
  copy: 0.9,
  cta: 1.15,
} as const;

export function useAboutHeroAnimation(refs: AboutHeroAnimationRefs) {
  const { sectionRef, eyebrowRef, copyRef, ctaRef } = refs;

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const line1 = section.querySelector(".about-line-1");
      const line2 = section.querySelector(".about-line-2");

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
