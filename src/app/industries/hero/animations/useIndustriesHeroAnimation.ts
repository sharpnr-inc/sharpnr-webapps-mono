import { useGSAP } from "@gsap/react";
import { gsap, DrawSVGPlugin } from "@/configs/gsap";
import type { RefObject } from "react";
import { prefersReduced } from "@/app/home/shared/motion";
import {
  EASE,
  T as MOTION,
  armWords,
  revealWords,
} from "@/app/home/shared/choreography";

interface IndustriesHeroAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  eyebrowRef: RefObject<HTMLParagraphElement | null>;
  copyRef: RefObject<HTMLParagraphElement | null>;
  ctaRef: RefObject<HTMLDivElement | null>;
  railRef: RefObject<HTMLDivElement | null>;
}

/*
 * The opening, on the same beat as Scene 01 on the homepage:
 *
 *   0.15  Every industry,
 *   0.45  One foundation.
 *   0.90  the sentence
 *   1.15  the invitation
 *   1.30  the rail, then the businesses standing on it
 *
 * The rail arrives before the businesses do — it is the thing they stand
 * on, so it cannot turn up afterwards.
 */
const T = { line1: 0.15, line2: 0.45, copy: 0.9, cta: 1.15, rail: 1.3 } as const;

export function useIndustriesHeroAnimation(refs: IndustriesHeroAnimationRefs) {
  const { sectionRef, eyebrowRef, copyRef, ctaRef, railRef } = refs;

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const line1 = section.querySelector(".ind-hero-line-1");
      const line2 = section.querySelector(".ind-hero-line-2");

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

      if (!railRef.current) return;

      gsap
        .timeline({ delay: T.rail })
        .from(".ind-hero-platform", {
          opacity: 0,
          y: 12,
          duration: MOTION.base,
          ease: EASE.in,
        })
        .from(
          ".ind-hero-node",
          {
            opacity: 0,
            y: 10,
            duration: MOTION.quick,
            stagger: 0.06,
            ease: EASE.in,
          },
          "-=0.25",
        )
        .fromTo(
          ".ind-hero-line",
          { drawSVG: "100% 100%" },
          {
            drawSVG: "0% 100%",
            duration: MOTION.base,
            stagger: 0.05,
            ease: EASE.draw,
          },
          "-=0.45",
        );
    },
    { scope: sectionRef },
  );

  void DrawSVGPlugin;
}
