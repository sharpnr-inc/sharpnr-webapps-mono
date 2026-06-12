import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";

interface CtaAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  panelRef: RefObject<HTMLDivElement | null>;
  contentRef: RefObject<HTMLDivElement | null>;
}

export function useCtaAnimation(refs: CtaAnimationRefs) {
  const { sectionRef, panelRef, contentRef } = refs;

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: panelRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // ── Phase 1: Panel rises ───────────────────────────────────
      tl.from(panelRef.current, { opacity: 0, y: 48, duration: 0.8 });

      // ── Phase 2: Content cascades ──────────────────────────────
      tl.from(
        contentRef.current ? contentRef.current.children : [],
        { opacity: 0, y: 24, duration: 0.6, stagger: 0.1 },
        "-=0.4",
      );
    },
    { scope: sectionRef },
  );
}
