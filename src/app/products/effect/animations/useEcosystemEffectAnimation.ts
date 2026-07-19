import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";

interface EcosystemEffectAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  introRef: RefObject<HTMLDivElement | null>;
}

/**
 * Journeys unfold step by step — each completed action quietly
 * enabling the next. Inevitable, not automated.
 */
export function useEcosystemEffectAnimation(refs: EcosystemEffectAnimationRefs) {
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

      gsap.utils.toArray<HTMLElement>(".effect-journey").forEach((journey) => {
        const steps = journey.querySelectorAll(".effect-step");
        const tl = gsap.timeline({
          scrollTrigger: { trigger: journey, start: "top 75%" },
        });
        tl.from(journey, { opacity: 0, y: 24, duration: 0.6, ease: "power3.out" });
        tl.from(
          steps,
          { opacity: 0, x: -12, duration: 0.4, stagger: 0.12, ease: "power3.out" },
          "-=0.3",
        );
      });

      gsap.from(".effect-advantage", {
        opacity: 0,
        y: 24,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: ".effect-advantage", start: "top 80%" },
      });
    },
    { scope: sectionRef },
  );
}
