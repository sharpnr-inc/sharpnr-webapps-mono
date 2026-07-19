import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";

interface JoinAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  contentRef: RefObject<HTMLDivElement | null>;
}

/** A warm, complete ending — still growing, already connected. */
export function useJoinAnimation(refs: JoinAnimationRefs) {
  const { sectionRef, contentRef } = refs;

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      gsap.from(contentRef.current ? contentRef.current.children : [], {
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
      });
    },
    { scope: sectionRef },
  );
}
