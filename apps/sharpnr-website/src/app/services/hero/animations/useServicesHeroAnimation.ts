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

interface ServicesHeroAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  eyebrowRef: RefObject<HTMLParagraphElement | null>;
  copyRef: RefObject<HTMLParagraphElement | null>;
  ctaRef: RefObject<HTMLDivElement | null>;
  chainRef: RefObject<HTMLDivElement | null>;
}

/*
 * The opening, on the same beat as Scene 01 on the homepage:
 *
 *   0.15  Every capability,
 *   0.45  Connected by design.
 *   0.90  the sentence
 *   1.15  the invitation
 *   1.30  the chain, left to right
 */
const T = { line1: 0.15, line2: 0.45, copy: 0.9, cta: 1.15, chain: 1.3 } as const;

export function useServicesHeroAnimation(refs: ServicesHeroAnimationRefs) {
  const { sectionRef, eyebrowRef, copyRef, ctaRef, chainRef } = refs;

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const line1 = section.querySelector(".svc-hero-line-1");
      const line2 = section.querySelector(".svc-hero-line-2");

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
        .from(buttons, { opacity: 0, y: 12, stagger: 0.1 }, T.cta);

      if (!chainRef.current) return;

      gsap.from(".svc-hero-cap", {
        opacity: 0,
        y: 12,
        duration: MOTION.quick,
        stagger: 0.07,
        ease: EASE.in,
        delay: T.chain,
      });
    },
    { scope: sectionRef },
  );
}
