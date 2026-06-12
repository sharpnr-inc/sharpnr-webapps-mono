import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/configs/gsap";
import type { RefObject } from "react";

interface HeaderAnimationRefs {
  headerRef: RefObject<HTMLElement | null>;
  backdropRef: RefObject<HTMLDivElement | null>;
}

export function useHeaderAnimation(refs: HeaderAnimationRefs) {
  const { headerRef, backdropRef } = refs;

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      // ── Phase 1: Header entrance ──────────────────────────
      if (!prefersReducedMotion) {
        gsap.from(headerRef.current, {
          y: -24,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          delay: 0.1,
        });
      }

      // ── Phase 2: Backdrop reveal on scroll ────────────────
      gsap.set(backdropRef.current, { opacity: 0 });

      ScrollTrigger.create({
        start: "top -32",
        end: 99999,
        onToggle: (self) => {
          gsap.to(backdropRef.current, {
            opacity: self.isActive ? 1 : 0,
            duration: 0.35,
            ease: "power2.out",
          });
        },
      });
    },
    { scope: headerRef },
  );
}
