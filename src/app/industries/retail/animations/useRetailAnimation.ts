import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";

interface RetailAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  introRef: RefObject<HTMLDivElement | null>;
}

/** The journey follows the product — receiving, shelf, sale, insight. */
export function useRetailAnimation(refs: RetailAnimationRefs) {
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

      gsap.from(".retail-step", {
        opacity: 0,
        x: -14,
        duration: 0.45,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".retail-step", start: "top 82%" },
      });

      gsap.from(".retail-area", {
        opacity: 0,
        y: 12,
        duration: 0.45,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: { trigger: ".retail-area", start: "top 85%" },
      });
    },
    { scope: sectionRef },
  );
}
