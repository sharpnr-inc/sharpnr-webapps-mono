import { useGSAP } from "@gsap/react";
import { gsap, DrawSVGPlugin } from "@/configs/gsap";
import type { RefObject } from "react";

interface PlatformHeroAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  copyRef: RefObject<HTMLDivElement | null>;
}

/** The platform appears, then capabilities connect one by one. */
export function usePlatformHeroAnimation(refs: PlatformHeroAnimationRefs) {
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
      tl.from(".phero-platform", { opacity: 0, y: 16, duration: 0.55 }, "-=0.4");
      tl.fromTo(
        ".phero-line",
        { drawSVG: "100% 100%" },
        { drawSVG: "0% 100%", duration: 0.7, stagger: 0.12, ease: "power2.inOut" },
      );
      tl.from(
        ".phero-node",
        { opacity: 0, scale: 0.6, transformOrigin: "center center", duration: 0.4, stagger: 0.12 },
        "-=0.9",
      );
      tl.from(".phero-caption", { opacity: 0, duration: 0.5 });
    },
    { scope: sectionRef },
  );

  void DrawSVGPlugin;
}
