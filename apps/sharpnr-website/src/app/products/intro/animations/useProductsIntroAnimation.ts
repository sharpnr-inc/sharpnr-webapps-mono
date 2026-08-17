import type { RefObject } from "react";
import { gsap, useGSAP, DrawSVGPlugin } from "@/configs/gsap";
import { prefersReduced } from "@/app/home/shared/motion";
import { animeWordsNow } from "@/app/home/shared/reveal";

interface ProductsIntroAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  eyebrowRef: RefObject<HTMLParagraphElement | null>;
  headingRef: RefObject<HTMLHeadingElement | null>;
  copyRef: RefObject<HTMLParagraphElement | null>;
  figureRef: RefObject<HTMLDivElement | null>;
}

/*
 * Above the fold, so nothing waits on scroll.
 *
 *   0.00  the label
 *   0.15  the headline, word by word
 *   0.75  the sentence
 *   1.00  the assembly
 *
 * ── Motion follows the topology (design.md §6) ──────────────────────
 * The order is the argument. Each unit arrives on its own and finished —
 * outline and working parts together — because "take one" has to be true
 * of a single piece before anything is said about the set. Only then do
 * the couplings appear on the edges they share, and only then does the
 * outer hull draw itself round the lot in one continuous movement: the
 * whole is the *consequence* of the parts fitting, so it cannot arrive
 * first. It plays once and does not loop.
 *
 * The 1.00 beat belonged to two buttons; the figure takes it rather than
 * waiting through a pause for something that is no longer there.
 */
const T = { heading: 0.15, copy: 0.75, figure: 1 } as const;

export function useProductsIntroAnimation(refs: ProductsIntroAnimationRefs) {
  const { sectionRef, eyebrowRef, headingRef, copyRef, figureRef } = refs;

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      if (prefersReduced()) {
        gsap.set(gsap.utils.toArray(".hp-word", section), { opacity: 1 });
        return;
      }

      animeWordsNow(headingRef.current, T.heading);

      gsap
        .timeline({ defaults: { ease: "power3.out", duration: 0.55 } })
        .from(eyebrowRef.current, { opacity: 0, y: 10 }, 0)
        .from(copyRef.current, { opacity: 0, y: 16 }, T.copy);

      if (!figureRef.current) return;

      gsap
        .timeline({ delay: T.figure })
        .from(".pas-tile", {
          opacity: 0,
          duration: 0.45,
          stagger: 0.09,
          ease: "power3.out",
        })
        .from(
          ".pas-join",
          { opacity: 0, duration: 0.3, stagger: 0.05, ease: "power3.out" },
          "-=0.15",
        )
        .fromTo(
          ".pas-hull",
          { drawSVG: "0% 0%" },
          { drawSVG: "0% 100%", duration: 0.9, ease: "power2.inOut" },
          "-=0.2",
        );
    },
    { scope: sectionRef },
  );

  void DrawSVGPlugin;
}
