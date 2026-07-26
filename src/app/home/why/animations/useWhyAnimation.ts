import type { RefObject } from "react";
import { gsap, useGSAP } from "@/configs/gsap";
import { prefersReduced, revealOnce } from "@/app/home/shared/motion";
import { animeWordsOnEnter } from "@/app/home/shared/reveal";

interface WhyAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  headingRef: RefObject<HTMLHeadingElement | null>;
  copyRef: RefObject<HTMLParagraphElement | null>;
  gridRef: RefObject<HTMLDivElement | null>;
}

/**
 * The four principles rise into place, once, on a short stagger — calm and
 * even, the same rhythm as every sibling scene's demonstration. The
 * turquoise underline on each name is plain CSS, triggered by :hover.
 * Reversible: scrolling back up above the section returns the grid to
 * hidden.
 */
export function useWhyAnimation(refs: WhyAnimationRefs) {
  const { sectionRef, headingRef, copyRef, gridRef } = refs;

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      animeWordsOnEnter(headingRef.current, section);
      if (copyRef.current) revealOnce(copyRef.current, section, { delay: 0.15 });
      if (prefersReduced() || !gridRef.current) return;

      gsap.from(gridRef.current.children, {
        opacity: 0,
        y: 24,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef },
  );
}
