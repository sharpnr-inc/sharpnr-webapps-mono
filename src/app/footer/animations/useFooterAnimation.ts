import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";

interface FooterAnimationRefs {
  footerRef: RefObject<HTMLElement | null>;
  innerRef: RefObject<HTMLDivElement | null>;
}

export function useFooterAnimation(refs: FooterAnimationRefs) {
  const { footerRef, innerRef } = refs;

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      // ── Phase 1: Footer columns rise in ────────────────────────
      gsap.from(innerRef.current ? innerRef.current.children : [], {
        opacity: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 92%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: footerRef },
  );
}
