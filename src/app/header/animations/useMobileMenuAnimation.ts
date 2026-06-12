import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";

interface MobileMenuAnimationRefs {
  panelRef: RefObject<HTMLDivElement | null>;
  listRef: RefObject<HTMLUListElement | null>;
  isOpen: boolean;
}

export function useMobileMenuAnimation(refs: MobileMenuAnimationRefs) {
  const { panelRef, listRef, isOpen } = refs;

  useGSAP(
    () => {
      const panel = panelRef.current;
      const list = listRef.current;
      if (!panel || !list) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(panel, { autoAlpha: isOpen ? 1 : 0, height: "auto" });
        return;
      }

      const items = list.children;

      if (isOpen) {
        // ── Phase 1: Panel expands ────────────────────────
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.set(panel, { autoAlpha: 1 })
          .fromTo(
            panel,
            { height: 0 },
            { height: "auto", duration: 0.45, ease: "power3.inOut" },
          )
          // ── Phase 2: Links stagger in ───────────────────
          .from(
            items,
            { opacity: 0, x: -16, duration: 0.35, stagger: 0.05 },
            "-=0.2",
          );
      } else {
        gsap.to(panel, {
          height: 0,
          autoAlpha: 0,
          duration: 0.3,
          ease: "power2.inOut",
        });
      }
    },
    { dependencies: [isOpen], scope: panelRef },
  );
}
