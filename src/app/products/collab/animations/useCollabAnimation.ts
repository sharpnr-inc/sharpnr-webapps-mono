import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";

interface CollabAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  introRef: RefObject<HTMLDivElement | null>;
}

/** Work flows left to right — conversation, knowledge, execution. */
export function useCollabAnimation(refs: CollabAnimationRefs) {
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

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: { trigger: sectionRef.current, start: "top 55%" },
      });

      tl.to(".collab-fill", { scaleX: 1, duration: 1.4 });
      tl.from(
        ".collab-stage",
        { opacity: 0, y: 20, duration: 0.55, stagger: 0.35, ease: "power3.out" },
        0,
      );
    },
    { scope: sectionRef },
  );
}
