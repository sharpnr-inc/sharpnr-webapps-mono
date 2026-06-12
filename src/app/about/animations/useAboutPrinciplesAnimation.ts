import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";

interface AboutPrinciplesAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  headingRef: RefObject<HTMLDivElement | null>;
  gridRef: RefObject<HTMLDivElement | null>;
  statusRef: RefObject<HTMLDivElement | null>;
}

export function useAboutPrinciplesAnimation(
  refs: AboutPrinciplesAnimationRefs,
) {
  const { sectionRef, headingRef, gridRef, statusRef } = refs;

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      // ── Phase 1: Heading reveals ───────────────────────────────
      gsap.from(headingRef.current ? headingRef.current.children : [], {
        opacity: 0,
        y: 32,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // ── Phase 2: Principle cards rise ──────────────────────────
      gsap.from(gridRef.current ? gridRef.current.children : [], {
        opacity: 0,
        y: 32,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 84%",
          toggleActions: "play none none reverse",
        },
      });

      // ── Phase 3: Status rows step in ───────────────────────────
      gsap.from(statusRef.current ? statusRef.current.children : [], {
        opacity: 0,
        x: -24,
        duration: 0.5,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: statusRef.current,
          start: "top 86%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef },
  );
}
