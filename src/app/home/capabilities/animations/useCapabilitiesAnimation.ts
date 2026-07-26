import type { RefObject } from "react";
import { gsap, useGSAP } from "@/configs/gsap";
import { prefersReduced, revealOnce } from "@/app/home/shared/motion";
import { animeWordsOnEnter } from "@/app/home/shared/reveal";

interface CapabilitiesAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  headingRef: RefObject<HTMLHeadingElement | null>;
  copyRef: RefObject<HTMLParagraphElement | null>;
  gridRef: RefObject<HTMLDivElement | null>;
}

/**
 * The cards rise into place, once, with a short even stagger — calm and
 * confident rather than eventful. Reversible: scrolling back up above the
 * section returns the grid to hidden, same as every other scene.
 */
export function useCapabilitiesAnimation(refs: CapabilitiesAnimationRefs) {
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
        y: 20,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.07,
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 84%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef },
  );
}
