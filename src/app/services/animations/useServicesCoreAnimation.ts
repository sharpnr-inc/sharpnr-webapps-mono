import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";

interface ServicesCoreAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  headingRef: RefObject<HTMLDivElement | null>;
  modesRef: RefObject<HTMLDivElement | null>;
  stripRef: RefObject<HTMLDivElement | null>;
}

export function useServicesCoreAnimation(refs: ServicesCoreAnimationRefs) {
  const { sectionRef, headingRef, modesRef, stripRef } = refs;

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

      // ── Phase 2: Mode panels slide in from opposite sides ──────
      const modes = modesRef.current
        ? gsap.utils.toArray<HTMLDivElement>(modesRef.current.children)
        : [];
      modes.forEach((panel, i) => {
        gsap.from(panel, {
          opacity: 0,
          x: i === 0 ? -40 : 40,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: modesRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // ── Phase 3: Core services strip cascades ──────────────────
      gsap.from(stripRef.current ? stripRef.current.children : [], {
        opacity: 0,
        y: 24,
        duration: 0.5,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: {
          trigger: stripRef.current,
          start: "top 86%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef },
  );
}
