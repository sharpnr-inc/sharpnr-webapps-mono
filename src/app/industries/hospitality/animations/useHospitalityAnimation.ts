import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";

interface HospitalityAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  introRef: RefObject<HTMLDivElement | null>;
}

/** The guest journey unfolds; each completed moment activates the next. */
export function useHospitalityAnimation(refs: HospitalityAnimationRefs) {
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

      gsap.to(".hosp-fill", {
        scaleY: 1,
        duration: 2.4,
        ease: "power1.inOut",
        scrollTrigger: { trigger: ".hosp-step", start: "top 70%" },
      });

      gsap.utils.toArray<HTMLElement>(".hosp-step").forEach((step) => {
        gsap.from(step, {
          opacity: 0,
          y: 18,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: { trigger: step, start: "top 80%" },
        });
      });
    },
    { scope: sectionRef },
  );
}
