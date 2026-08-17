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
  railRef: RefObject<HTMLDivElement | null>;
}

/*
 * The opening, on the same beat as Scene 01 on the homepage:
 *
 *   0.15  Every industry,
 *   0.45  One foundation.
 *   0.90  the sentence
 *   1.10  the rail, then the industries standing on it
 *
 * The rail arrives before the industries do — it is the thing they stand
 * on, so it cannot turn up afterwards.
 *
 * The 1.15 beat that used to belong to two buttons is gone with them; the
 * figure simply moves up into the gap rather than waiting through a pause
 * for something that is no longer there.
 */
const T = { line1: 0.15, line2: 0.45, copy: 0.9, rail: 1.1 } as const;

export function useIndustriesHeroAnimation(refs: IndustriesHeroAnimationRefs) {
  const { sectionRef, eyebrowRef, copyRef, railRef } = refs;

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

      gsap
        .timeline({ defaults: { ease: EASE.in, duration: MOTION.base } })
        .from(eyebrowRef.current, { opacity: 0, y: 10 }, 0)
        .from(copyRef.current, { opacity: 0, y: 16 }, T.copy);

      const rail = railRef.current;
      if (!rail) return;

      /* Both renderings are always in the DOM and CSS lays out one of them,
         so both are armed. The stacked list carries none of the drawing's
         `.ind-hero-*` hooks — it gets the one move that suits a list, and
         the figure's timeline simply runs against a display:none subtree
         on a phone, which costs nothing and leaves it correct if the
         viewport is widened. */
      const rows = Array.from(rail.querySelectorAll<HTMLElement>("li"));
      if (rows.length) {
        gsap.from(rows, {
          opacity: 0,
          y: 10,
          duration: MOTION.quick,
          stagger: 0.05,
          ease: EASE.in,
          delay: T.rail,
        });
      }

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
