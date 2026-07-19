import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";

interface FutureVisionAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  bodyRef: RefObject<HTMLDivElement | null>;
}

/** Steady, optimistic reading rhythm — longevity, not spectacle. */
export function useFutureVisionAnimation(refs: FutureVisionAnimationRefs) {
  const { sectionRef, bodyRef } = refs;

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      const blocks = bodyRef.current ? Array.from(bodyRef.current.children) : [];
      blocks.forEach((block) => {
        gsap.from(block, {
          opacity: 0,
          y: 20,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: block, start: "top 82%" },
        });
      });
    },
    { scope: sectionRef },
  );
}
