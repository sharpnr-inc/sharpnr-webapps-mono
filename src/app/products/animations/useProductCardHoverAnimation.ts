import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";

interface ProductCardHoverAnimationRefs {
  gridRef: RefObject<HTMLDivElement | null>;
}

/**
 * Premium hover for every card in the bento grid:
 *  - a soft accent orb ([data-spot]) tracks the cursor inside the card
 *  - the card lifts on enter
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
        const orb = card.querySelector<HTMLElement>("[data-spot]");

        // Smooth cursor-follow for the spotlight orb.
        let xTo: gsap.QuickToFunc | null = null;
        let yTo: gsap.QuickToFunc | null = null;
        if (orb) {
          gsap.set(orb, { xPercent: -50, yPercent: -50 });
          xTo = gsap.quickTo(orb, "x", { duration: 0.45, ease: "power3.out" });
          yTo = gsap.quickTo(orb, "y", { duration: 0.45, ease: "power3.out" });
        }

        const move = (e: MouseEvent) => {
          if (!xTo || !yTo) return;
          const rect = card.getBoundingClientRect();
          xTo(e.clientX - rect.left);
          yTo(e.clientY - rect.top);
        };
        const enter = (e: MouseEvent) => {
          if (orb) {
            // Seed the position so the orb appears under the cursor, not 0,0.
            const rect = card.getBoundingClientRect();
            gsap.set(orb, {
              x: e.clientX - rect.left,
              y: e.clientY - rect.top,
            });
            gsap.to(orb, { autoAlpha: 1, duration: 0.4, ease: "power2.out" });
          }
          gsap.to(card, {
            y: -6,
            scale: 1.012,
            duration: 0.35,
            ease: "power2.out",
          });
        };
        const leave = () => {
          if (orb) {
            gsap.to(orb, { autoAlpha: 0, duration: 0.4, ease: "power2.inOut" });
          }
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.35,
            ease: "power2.inOut",
          });
        };

        card.addEventListener("mousemove", move);
        card.addEventListener("mouseenter", enter);
        card.addEventListener("mouseleave", leave);
        cleanups.push(() => {
          card.removeEventListener("mousemove", move);
          card.removeEventListener("mouseenter", enter);
          card.removeEventListener("mouseleave", leave);
        });
      });

      return () => cleanups.forEach((fn) => fn());
    },
    { scope: gridRef },
  );
}
