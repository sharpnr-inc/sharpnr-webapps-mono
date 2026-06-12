import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";

interface ProductsSpotlightAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  headingRef: RefObject<HTMLDivElement | null>;
  panelRefs: RefObject<Array<HTMLDivElement | null>>;
  mockRefs: RefObject<Array<HTMLDivElement | null>>;
}

export function useProductsSpotlightAnimation(
  refs: ProductsSpotlightAnimationRefs,
) {
  const { sectionRef, headingRef, panelRefs, mockRefs } = refs;

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

      // ── Phase 2: Each spotlight panel slides in ────────────────
      panelRefs.current?.forEach((panel) => {
        if (!panel) return;
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

      // ── Phase 3: Mock UI internals build row by row ────────────
      mockRefs.current?.forEach((mock) => {
        if (!mock) return;
        gsap.from(mock.children, {
          opacity: 0,
          y: 16,
          duration: 0.5,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: mock,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: sectionRef },
  );
}
