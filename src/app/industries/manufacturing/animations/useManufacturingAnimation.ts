import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";

interface ManufacturingAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  introRef: RefObject<HTMLDivElement | null>;
}

/** Materials move through production — steady, sequential. */
export function useManufacturingAnimation(refs: ManufacturingAnimationRefs) {
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

      gsap.from(".mfg-step", {
        opacity: 0,
        y: 16,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".mfg-step", start: "top 82%" },
      });
    },
    { scope: sectionRef },
  );
}
