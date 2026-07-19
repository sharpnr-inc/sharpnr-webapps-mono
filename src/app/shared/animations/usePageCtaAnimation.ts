import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";

interface PageCtaAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  contentRef: RefObject<HTMLDivElement | null>;
}

/** Minimal ending motion — content settles in once, then stays. */
export function usePageCtaAnimation(refs: PageCtaAnimationRefs) {
  const { sectionRef, contentRef } = refs;

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      gsap.from(contentRef.current ? contentRef.current.children : [], {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    },
    { scope: sectionRef },
  );
}
