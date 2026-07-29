import type { RefObject } from "react";
import { gsap, useGSAP } from "@/configs/gsap";
import { prefersReduced } from "@/app/home/shared/motion";
import { animeWordsNow } from "@/app/home/shared/reveal";

interface ProductsIntroAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  eyebrowRef: RefObject<HTMLParagraphElement | null>;
  headingRef: RefObject<HTMLHeadingElement | null>;
  copyRef: RefObject<HTMLParagraphElement | null>;
  ctaRef: RefObject<HTMLDivElement | null>;
}

/*
 * Above the fold, so nothing waits on scroll.
 *
 *   0.00  the label
 *   0.15  the headline, word by word
 *   0.75  the sentence
 *   1.00  the invitation
 *
 * Deliberately shorter than the homepage's opening: that hero has a field
 * of vocabulary to fill in behind it, and this one only has to name the
 * page and hand the visitor to the capabilities below it.
 */
const T = { heading: 0.15, copy: 0.75, cta: 1 } as const;

export function useProductsIntroAnimation(refs: ProductsIntroAnimationRefs) {
  const { sectionRef, eyebrowRef, headingRef, copyRef, ctaRef } = refs;

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      if (prefersReduced()) {
        gsap.set(gsap.utils.toArray(".hp-word", section), { opacity: 1 });
        return;
      }

      animeWordsNow(headingRef.current, T.heading);

      const buttons = ctaRef.current ? Array.from(ctaRef.current.children) : [];
      gsap
        .timeline({ defaults: { ease: "power3.out", duration: 0.55 } })
        .from(eyebrowRef.current, { opacity: 0, y: 10 }, 0)
        .from(copyRef.current, { opacity: 0, y: 16 }, T.copy)
        .from(buttons, { opacity: 0, y: 12, stagger: 0.1 }, T.cta);
    },
    { scope: sectionRef },
  );
}
