import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";

interface ServicesHeroAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  contentRef: RefObject<HTMLDivElement | null>;
}

export function useServicesHeroAnimation(refs: ServicesHeroAnimationRefs) {
  const { sectionRef, contentRef } = refs;

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      // ── Phase 1: Hero content cascades in ──────────────────────
      gsap.from(contentRef.current ? contentRef.current.children : [], {
        opacity: 0,
        y: 28,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
      });
    },
    { scope: sectionRef },
  );
}
