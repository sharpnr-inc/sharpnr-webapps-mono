import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";

interface PrinciplesAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  introRef: RefObject<HTMLDivElement | null>;
}

/** Each principle appears as the reader reaches it — nothing flashy. */
export function usePrinciplesAnimation(refs: PrinciplesAnimationRefs) {
  const { sectionRef, introRef } = refs;

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      gsap.from(introRef.current ? introRef.current.children : [], {
        opacity: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
      });

      gsap.utils.toArray<HTMLElement>(".principle").forEach((principle) => {
        gsap.from(principle, {
          opacity: 0,
          y: 18,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: principle, start: "top 82%" },
        });
      });
    },
    { scope: sectionRef },
  );
}
