import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";

interface IndustriesSegmentsAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  headingRef: RefObject<HTMLDivElement | null>;
  cloudRef: RefObject<HTMLDivElement | null>;
  cardsRef: RefObject<HTMLDivElement | null>;
}

export function useIndustriesSegmentsAnimation(
  refs: IndustriesSegmentsAnimationRefs,
) {
  const { sectionRef, headingRef, cloudRef, cardsRef } = refs;

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

      // ── Phase 2: Segment chips pop in ──────────────────────────
      gsap.from(cloudRef.current ? cloudRef.current.children : [], {
        opacity: 0,
        scale: 0.8,
        y: 16,
        duration: 0.45,
        stagger: 0.045,
        ease: "back.out(1.6)",
        scrollTrigger: {
          trigger: cloudRef.current,
          start: "top 84%",
          toggleActions: "play none none reverse",
        },
      });

      // ── Phase 3: Capability cards rise ─────────────────────────
      gsap.from(cardsRef.current ? cardsRef.current.children : [], {
        opacity: 0,
        y: 32,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef },
  );
}
