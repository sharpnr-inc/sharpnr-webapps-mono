import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";

interface FoundationShowcaseAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  introRef: RefObject<HTMLDivElement | null>;
}

/** Each showcase enters independently as visitors scroll. */
export function useFoundationShowcaseAnimation(
  refs: FoundationShowcaseAnimationRefs,
) {
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

      gsap.utils.toArray<HTMLElement>(".showcase-row").forEach((row) => {
        gsap.from(row, {
          opacity: 0,
          y: 32,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 78%" },
        });
      });
    },
    { scope: sectionRef },
  );
}
