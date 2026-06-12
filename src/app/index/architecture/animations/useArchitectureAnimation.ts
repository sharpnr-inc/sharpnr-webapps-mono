import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";

interface ArchitectureAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  headingRef: RefObject<HTMLDivElement | null>;
  listRef: RefObject<HTMLOListElement | null>;
  lineRef: RefObject<HTMLDivElement | null>;
}

export function useArchitectureAnimation(refs: ArchitectureAnimationRefs) {
  const { sectionRef, headingRef, listRef, lineRef } = refs;

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

      // ── Phase 2: Spine line draws with scroll ──────────────────
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 75%",
            end: "bottom 55%",
            scrub: 0.6,
          },
        },
      );

      // ── Phase 3: Layer rows step in ────────────────────────────
      const rows = listRef.current
        ? gsap.utils.toArray<HTMLLIElement>(listRef.current.children)
        : [];
      rows.forEach((row) => {
        gsap.from(row, {
          opacity: 0,
          x: 40,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: sectionRef },
  );
}
