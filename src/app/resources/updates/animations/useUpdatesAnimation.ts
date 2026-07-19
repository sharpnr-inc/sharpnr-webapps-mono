import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";

interface UpdatesAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  introRef: RefObject<HTMLDivElement | null>;
}

/** Continuous progress — categories appear along a quiet rhythm. */
export function useUpdatesAnimation(refs: UpdatesAnimationRefs) {
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

      gsap.from(".update-cat", {
        opacity: 0,
        y: 14,
        duration: 0.45,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: { trigger: ".update-cat", start: "top 85%" },
      });
    },
    { scope: sectionRef },
  );
}
