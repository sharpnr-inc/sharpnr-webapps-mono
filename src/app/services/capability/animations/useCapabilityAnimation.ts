import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";

interface CapabilityAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  introRef: RefObject<HTMLDivElement | null>;
}

/** Outcomes settle in, then the connected flow unfolds step by step. */
export function useCapabilityAnimation(refs: CapabilityAnimationRefs) {
  const { sectionRef, introRef } = refs;

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      const section = sectionRef.current;
      if (!section) return;

      gsap.from(introRef.current ? introRef.current.children : [], {
        opacity: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 72%" },
      });

      gsap.from(section.querySelectorAll(".cap-item"), {
        opacity: 0,
        y: 12,
        duration: 0.45,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 58%" },
      });

      gsap.from(section.querySelectorAll(".cap-step"), {
        opacity: 0,
        x: -12,
        duration: 0.4,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 55%" },
      });
    },
    { scope: sectionRef },
  );
}
