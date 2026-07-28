import type { RefObject } from "react";
import { useGSAP } from "@/configs/gsap";
import { revealOnce } from "@/app/home/shared/motion";
import { animeWordsOnEnter } from "@/app/home/shared/reveal";

interface ProductsCloseAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  headingRef: RefObject<HTMLHeadingElement | null>;
  copyRef: RefObject<HTMLParagraphElement | null>;
  ctaRef: RefObject<HTMLDivElement | null>;
  trustRef: RefObject<HTMLParagraphElement | null>;
}

/**
 * The ending, arriving once.
 *
 * Plain fades, never reversed — Motion Language v3.1 keeps reversibility
 * for the multi-phase demonstrations; running a paragraph backwards on
 * scroll-up reads as flicker.
 */
export function useProductsCloseAnimation(refs: ProductsCloseAnimationRefs) {
  const { sectionRef, headingRef, copyRef, ctaRef, trustRef } = refs;

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      animeWordsOnEnter(headingRef.current, section);
      if (copyRef.current) revealOnce(copyRef.current, section, { delay: 0.15 });
      if (ctaRef.current) {
        revealOnce(Array.from(ctaRef.current.children), section, {
          delay: 0.3,
          stagger: 0.1,
        });
      }
      if (trustRef.current) revealOnce(trustRef.current, section, { delay: 0.5 });
    },
    { scope: sectionRef },
  );
}
