import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";

interface IndustriesListAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  listRef: RefObject<HTMLDivElement | null>;
}

export function useIndustriesListAnimation(refs: IndustriesListAnimationRefs) {
  const { sectionRef, listRef } = refs;

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      const cards = listRef.current
        ? gsap.utils.toArray<HTMLDivElement>(listRef.current.children)
        : [];

      // ── Phase 1: Industry cards rise in sequence ───────────────
      cards.forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 44,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 84%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: sectionRef },
  );
}
