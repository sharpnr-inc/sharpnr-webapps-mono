import { useGSAP } from "@gsap/react";
import { gsap, DrawSVGPlugin } from "@/configs/gsap";
import type { RefObject } from "react";

interface IndustriesHeroAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  copyRef: RefObject<HTMLDivElement | null>;
}

/** Businesses appear one after another and settle onto the platform. */
export function useIndustriesHeroAnimation(refs: IndustriesHeroAnimationRefs) {
  const { sectionRef, copyRef } = refs;

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(copyRef.current ? copyRef.current.children : [], {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.12,
      });
      tl.from(".ind-hero-platform", { opacity: 0, y: 14, duration: 0.55 }, "-=0.35");
      tl.from(
        ".ind-hero-node",
        { opacity: 0, y: 10, duration: 0.4, stagger: 0.07 },
        "-=0.2",
      );
      tl.fromTo(
        ".ind-hero-line",
        { drawSVG: "100% 100%" },
        { drawSVG: "0% 100%", duration: 0.6, stagger: 0.06, ease: "power2.inOut" },
        "-=0.6",
      );
    },
    { scope: sectionRef },
  );

  void DrawSVGPlugin;
}
