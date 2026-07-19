import { useGSAP } from "@gsap/react";
import { gsap, DrawSVGPlugin } from "@/configs/gsap";
import type { RefObject } from "react";

interface MultiIndustryAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  introRef: RefObject<HTMLDivElement | null>;
}

/** Divisions operate independently; shared services quietly connect them. */
export function useMultiIndustryAnimation(refs: MultiIndustryAnimationRefs) {
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
        scrollTrigger: { trigger: sectionRef.current, start: "top 55%" },
      });

      tl.from(".multi-node", {
        opacity: 0,
        scale: 0.7,
        transformOrigin: "center center",
        duration: 0.45,
        stagger: 0.08,
        ease: "power3.out",
      });
      tl.from(".multi-core", { opacity: 0, scale: 0.85, transformOrigin: "280px 240px", duration: 0.5 }, "-=0.2");
      tl.fromTo(
        ".multi-spoke",
        { drawSVG: "0%" },
        { drawSVG: "100%", duration: 0.8, stagger: 0.08 },
        "-=0.3",
      );
      tl.from(
        ".multi-service",
        { opacity: 0, y: 14, duration: 0.45, stagger: 0.08, ease: "power3.out" },
        "-=0.8",
      );

      gsap.from(".multi-leadership", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: ".multi-leadership", start: "top 82%" },
      });
    },
    { scope: sectionRef },
  );

  void DrawSVGPlugin;
}
