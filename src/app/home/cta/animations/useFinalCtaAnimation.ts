import type { RefObject } from "react";
import { gsap, useGSAP } from "@/configs/gsap";
import { prefersReduced } from "@/app/home/shared/motion";
import { animeWordsOnEnter } from "@/app/home/shared/reveal";

interface FinalCtaAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  headingRef: RefObject<HTMLHeadingElement | null>;
  copyRef: RefObject<HTMLParagraphElement | null>;
  shapeRef: RefObject<HTMLDivElement | null>;
  ctaRef: RefObject<HTMLDivElement | null>;
}

/**
 * The invitation — the ambient shape, then heading, copy and the two
 * actions. A calm, sequential close; reveals once, then idle. Hover lifts
 * on the buttons are plain CSS (see Button), not part of this timeline.
 */
export function useFinalCtaAnimation(refs: FinalCtaAnimationRefs) {
  const { sectionRef, headingRef, copyRef, shapeRef, ctaRef } = refs;

  useGSAP(
    () => {
      if (prefersReduced()) return;
      const section = sectionRef.current;
      if (!section) return;

      animeWordsOnEnter(headingRef.current, section, "top 72%");

      const buttons = ctaRef.current ? Array.from(ctaRef.current.children) : [];
      gsap
        .timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: section, start: "top 70%", once: true },
          delay: 0.35,
        })
        .from(shapeRef.current, { opacity: 0, scale: 0.92, duration: 0.8 }, 0)
        .from(copyRef.current, { opacity: 0, y: 18, duration: 0.5 }, 0.1)
        .from(buttons, { opacity: 0, y: 14, duration: 0.5, stagger: 0.2 }, "-=0.1");
    },
    { scope: sectionRef },
  );
}
