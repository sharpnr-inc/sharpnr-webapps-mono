import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";

interface TickerAnimationRefs {
  containerRef: RefObject<HTMLElement | null>;
  trackRef: RefObject<HTMLDivElement | null>;
}

export function useTickerAnimation(refs: TickerAnimationRefs) {
  const { containerRef, trackRef } = refs;

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      // ── Phase 1: Endless marquee — track holds two copies, so
      //    -50% loops seamlessly ─────────────────────────────────
      gsap.to(trackRef.current, {
        xPercent: -50,
        duration: 38,
        repeat: -1,
        ease: "none",
      });
    },
    { scope: containerRef },
  );
}
