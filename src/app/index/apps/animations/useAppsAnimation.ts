import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";

interface AppsAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  headingRef: RefObject<HTMLDivElement | null>;
  gridRef: RefObject<HTMLDivElement | null>;
}

export function useAppsAnimation(refs: AppsAnimationRefs) {
  const { sectionRef, headingRef, gridRef } = refs;

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      // ── Phase 1: Heading reveals ───────────────────────────────
      gsap.from(headingRef.current ? headingRef.current.children : [], {
        opacity: 0,
        y: 32,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // ── Phase 2: App cards cascade in ──────────────────────────
      gsap.from(gridRef.current ? gridRef.current.children : [], {
        opacity: 0,
        y: 36,
        duration: 0.6,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef },
  );
}
