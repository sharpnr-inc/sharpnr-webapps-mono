import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";

interface LibraryAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  introRef: RefObject<HTMLDivElement | null>;
}

/** Shelves appear like pages being added to a library. */
export function useLibraryAnimation(refs: LibraryAnimationRefs) {
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

      gsap.from(".library-shelf", {
        opacity: 0,
        y: 18,
        duration: 0.55,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".library-shelf", start: "top 82%" },
      });
    },
    { scope: sectionRef },
  );
}
