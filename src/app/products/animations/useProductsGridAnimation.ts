import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";

interface ProductsGridAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  gridRef: RefObject<HTMLDivElement | null>;
}

export function useProductsGridAnimation(refs: ProductsGridAnimationRefs) {
  const { sectionRef, gridRef } = refs;

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      const cards = gridRef.current
        ? gsap.utils.toArray<HTMLDivElement>(gridRef.current.children)
        : [];

      // ── Phase 1: Bento cards rise in as they enter the viewport ──
      cards.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 40,
          duration: 0.65,
          delay: (i % 3) * 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: sectionRef },
  );
}
