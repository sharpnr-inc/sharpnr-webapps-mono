import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";

interface SeriesAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  introRef: RefObject<HTMLDivElement | null>;
}

/** Publications settle onto the shelf, one after another. */
export function useSeriesAnimation(refs: SeriesAnimationRefs) {
  const { sectionRef, introRef } = refs;

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      gsap.from(introRef.current ? introRef.current.children : [], {
        opacity: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
      });

      gsap.from(".series-cover", {
        opacity: 0,
        y: 20,
        duration: 0.55,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".series-cover", start: "top 82%" },
      });
    },
    { scope: sectionRef },
  );
}
