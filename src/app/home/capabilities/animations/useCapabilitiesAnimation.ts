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
 * Scene 04 motion — the tiles arrive as a set, not as a queue.
 *
 * Heading words reveal, the paragraph follows, then the bento rises with a
 * short stagger so the rhythm of the grid is legible before anything is read.
 * Reveals once; the surfaces are still afterwards.
 */
export function useCapabilitiesAnimation(refs: CapabilitiesAnimationRefs) {
  const { sectionRef, headingRef, copyRef, gridRef } = refs;

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || prefersReduced()) return;

      animeWordsOnEnter(headingRef.current, section);
      if (copyRef.current) revealOnce(copyRef.current, section, { delay: 0.15 });

      const tiles = gridRef.current ? Array.from(gridRef.current.children) : [];
      gsap.from(tiles, {
        opacity: 0,
        y: 22,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.09,
        clearProps: "transform",
        scrollTrigger: { trigger: gridRef.current!, start: "top 84%", once: true },
      });
    },
    { scope: sectionRef },
  );
}
