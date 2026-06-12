import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";

interface ServicesSolutionsAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  panelsRef: RefObject<HTMLDivElement | null>;
}

export function useServicesSolutionsAnimation(
  refs: ServicesSolutionsAnimationRefs,
) {
  const { sectionRef, panelsRef } = refs;

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      const panels = panelsRef.current
        ? gsap.utils.toArray<HTMLDivElement>(panelsRef.current.children)
        : [];

      // ── Phase 1: Each solution panel rises on scroll ───────────
      panels.forEach((panel) => {
        gsap.from(panel, {
          opacity: 0,
          y: 48,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: panel,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: sectionRef },
  );
}
