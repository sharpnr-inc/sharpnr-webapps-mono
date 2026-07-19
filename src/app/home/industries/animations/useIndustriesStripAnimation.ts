import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";

interface IndustriesStripAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  introRef: RefObject<HTMLDivElement | null>;
}

/**
 * Signature pattern 02 — Business Growth. The platform line extends
 * through every industry while each station joins in turn.
 */
export function useIndustriesStripAnimation(refs: IndustriesStripAnimationRefs) {
  const { sectionRef, introRef } = refs;

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 68%",
        },
      });

      tl.from(introRef.current ? introRef.current.children : [], {
        opacity: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
      });
      tl.to(".strip-fill-x", { scaleX: 1, duration: 1.6 }, "-=0.1");
      tl.to(".strip-fill-y", { scaleY: 1, duration: 1.6 }, "<");
      tl.from(
        ".strip-station",
        { opacity: 0, y: 10, duration: 0.45, stagger: 0.12, ease: "power3.out" },
        "<",
      );
    },
    { scope: sectionRef },
  );
}
