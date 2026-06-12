import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";

interface ProductCardHoverAnimationRefs {
  gridRef: RefObject<HTMLDivElement | null>;
}

/**
 * Lift-on-hover for every card in the bento grid.
 * Attaches to the grid's direct children so each card gets the same
 * treatment without per-card hooks.
 */
export function useProductCardHoverAnimation(
  refs: ProductCardHoverAnimationRefs,
) {
  const { gridRef } = refs;

  useGSAP(
    () => {
      const grid = gridRef.current;
      if (!grid) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const canHover = window.matchMedia("(hover: hover)").matches;
      if (prefersReducedMotion || !canHover) return;

      const cards = gsap.utils.toArray<HTMLElement>(grid.children);
      const cleanups: (() => void)[] = [];

      cards.forEach((card) => {
        const enterAnim = () =>
          gsap.to(card, {
            y: -6,
            scale: 1.012,
            duration: 0.35,
            ease: "power2.out",
          });
        const leaveAnim = () =>
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.35,
            ease: "power2.inOut",
          });

        card.addEventListener("mouseenter", enterAnim);
        card.addEventListener("mouseleave", leaveAnim);
        cleanups.push(() => {
          card.removeEventListener("mouseenter", enterAnim);
          card.removeEventListener("mouseleave", leaveAnim);
        });
      });

      return () => cleanups.forEach((fn) => fn());
    },
    { scope: gridRef },
  );
}
