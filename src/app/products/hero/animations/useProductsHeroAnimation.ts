import { useGSAP } from "@gsap/react";
import { gsap, DrawSVGPlugin } from "@/configs/gsap";
import type { RefObject } from "react";

interface ProductsHeroAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  copyRef: RefObject<HTMLDivElement | null>;
}

/** Products appear one after another; connections form naturally. */
export function useProductsHeroAnimation(refs: ProductsHeroAnimationRefs) {
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
      tl.from(".prod-hero-core", { opacity: 0, scale: 0.85, transformOrigin: "500px 211px", duration: 0.5 }, "-=0.3");
      tl.from(
        ".prod-hero-pill",
        { opacity: 0, y: 10, duration: 0.4, stagger: 0.06 },
        "-=0.2",
      );
      tl.fromTo(
        ".prod-hero-line",
        { drawSVG: "0%" },
        { drawSVG: "100%", duration: 0.8, stagger: 0.04, ease: "power2.inOut" },
        "-=0.8",
      );
    },
    { scope: sectionRef },
  );

  void DrawSVGPlugin;
}
