import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";

interface ServicesJourneyAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  headingRef: RefObject<HTMLDivElement | null>;
  spineRef: RefObject<HTMLDivElement | null>;
  itemsRef: RefObject<HTMLDivElement | null>;
}

export function useServicesJourneyAnimation(
  refs: ServicesJourneyAnimationRefs,
) {
  const { sectionRef, headingRef, spineRef, itemsRef } = refs;

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

      // ── Phase 2: Spine draws down as the day unfolds ───────────
      if (spineRef.current && itemsRef.current) {
        gsap.fromTo(
          spineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "top center",
            ease: "none",
            scrollTrigger: {
              trigger: itemsRef.current,
              start: "top 75%",
              end: "bottom 60%",
              scrub: 0.6,
            },
          },
        );
      }

      // ── Phase 3: Each moment lands as it enters ────────────────
      if (itemsRef.current) {
        Array.from(itemsRef.current.children).forEach((item) => {
          gsap.from(item, {
            opacity: 0,
            y: 36,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });
        });
      }
    },
    { scope: sectionRef },
  );
}
