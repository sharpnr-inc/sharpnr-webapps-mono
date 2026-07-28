import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";
import { prefersReduced } from "@/app/home/shared/motion";
import {
  EASE,
  T as MOTION,
  armWords,
  revealWords,
} from "@/app/home/shared/choreography";

interface ResourcesHeroAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  eyebrowRef: RefObject<HTMLParagraphElement | null>;
  copyRef: RefObject<HTMLParagraphElement | null>;
  ctaRef: RefObject<HTMLDivElement | null>;
  noteRef: RefObject<HTMLParagraphElement | null>;
}

/*
 * The opening, on the same beat as Scene 01 on the homepage:
 *
 *   0.15  Learn something useful,
 *   0.45  Build something better.
 *   0.90  the sentence
 *   1.15  the invitation
 *   1.35  the honest note last — it qualifies everything above it
 */
const T = { line1: 0.15, line2: 0.45, copy: 0.9, cta: 1.15, note: 1.35 } as const;

export function useResourcesHeroAnimation(refs: ResourcesHeroAnimationRefs) {
  const { sectionRef, eyebrowRef, copyRef, ctaRef, noteRef } = refs;

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const line1 = section.querySelector(".res-hero-line-1");
      const line2 = section.querySelector(".res-hero-line-2");

      if (prefersReduced()) {
        gsap.set(gsap.utils.toArray(".hp-word", section), { opacity: 1 });
        return;
      }

      armWords(line1);
      armWords(line2);
      revealWords(line1, T.line1);
      revealWords(line2, T.line2);

      const buttons = ctaRef.current ? Array.from(ctaRef.current.children) : [];
      gsap
        .timeline({ defaults: { ease: EASE.in, duration: MOTION.base } })
        .from(eyebrowRef.current, { opacity: 0, y: 10 }, 0)
        .from(copyRef.current, { opacity: 0, y: 16 }, T.copy)
        .from(buttons, { opacity: 0, y: 12, stagger: 0.1 }, T.cta)
        .from(noteRef.current, { opacity: 0, y: 10 }, T.note);
    },
    { scope: sectionRef },
  );
}
