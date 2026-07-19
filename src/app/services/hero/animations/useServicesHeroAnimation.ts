import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";

interface ServicesHeroAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  copyRef: RefObject<HTMLDivElement | null>;
}

/** Capabilities appear one by one; connections form between them. */
export function useServicesHeroAnimation(refs: ServicesHeroAnimationRefs) {
  const { sectionRef, copyRef } = refs;

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(copyRef.current ? copyRef.current.children : [], {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.12,
      });
      tl.from(
        ".svc-hero-cap",
        { opacity: 0, y: 12, duration: 0.45, stagger: 0.08 },
        "-=0.3",
      );
    },
    { scope: sectionRef },
  );
}
