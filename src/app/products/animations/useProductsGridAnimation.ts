import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";

interface ProductsGridAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  headerRef: RefObject<HTMLDivElement | null>;
  gridRef: RefObject<HTMLDivElement | null>;
}

export function useProductsGridAnimation(refs: ProductsGridAnimationRefs) {
  const { sectionRef, headerRef, gridRef } = refs;

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      // ── Phase 1: System bar settles in ──────────────────────────
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // ── Phase 2: Bento cards rise in as they enter the viewport ──
      const cards = gridRef.current
        ? gsap.utils.toArray<HTMLDivElement>(gridRef.current.children)
        : [];

      cards.forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 34,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: sectionRef },
  );
}
