import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";

interface EducationAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  introRef: RefObject<HTMLDivElement | null>;
}

/** The academic lifecycle draws through, milestone by milestone. */
export function useEducationAnimation(refs: EducationAnimationRefs) {
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

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: { trigger: ".edu-stage", start: "top 78%" },
      });
      tl.to(".edu-fill", { scaleX: 1, duration: 1.8 });
      tl.from(
        ".edu-stage",
        { opacity: 0, y: 10, duration: 0.4, stagger: 0.14, ease: "power3.out" },
        0,
      );

      gsap.from(".edu-area", {
        opacity: 0,
        y: 12,
        duration: 0.45,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: { trigger: ".edu-area", start: "top 85%" },
      });
    },
    { scope: sectionRef },
  );
}
