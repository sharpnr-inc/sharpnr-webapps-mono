import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";

interface HealthcareAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  introRef: RefObject<HTMLDivElement | null>;
}

/** Care unfolds calmly — clinical focus, quiet platform. */
export function useHealthcareAnimation(refs: HealthcareAnimationRefs) {
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

      gsap.from(".hc-area", {
        opacity: 0,
        y: 16,
        duration: 0.5,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: { trigger: ".hc-area", start: "top 82%" },
      });

      gsap.from(".hc-step", {
        opacity: 0,
        x: -12,
        duration: 0.4,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".hc-step", start: "top 82%" },
      });
    },
    { scope: sectionRef },
  );
}
