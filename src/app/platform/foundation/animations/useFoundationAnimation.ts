import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";

interface FoundationAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  introRef: RefObject<HTMLDivElement | null>;
}

/** The foundation assembles — steady, grounded, no excitement. */
export function useFoundationAnimation(refs: FoundationAnimationRefs) {
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

      gsap.from(".foundation-pillar", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 55%" },
      });
    },
    { scope: sectionRef },
  );
}
