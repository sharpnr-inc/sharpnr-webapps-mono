import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";

interface BetterTogetherAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  introRef: RefObject<HTMLDivElement | null>;
}

/** Four quiet stories, then the point — connection transforms. */
export function useBetterTogetherAnimation(refs: BetterTogetherAnimationRefs) {
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

      gsap.from(".better-story", {
        opacity: 0,
        y: 18,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".better-story", start: "top 82%" },
      });

      gsap.from(".better-close", {
        opacity: 0,
        y: 14,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: ".better-close", start: "top 88%" },
      });
    },
    { scope: sectionRef },
  );
}
