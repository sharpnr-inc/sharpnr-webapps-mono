import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";

interface CorporateAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  introRef: RefObject<HTMLDivElement | null>;
}

/** Proposal → project → delivery, unfolding naturally. */
export function useCorporateAnimation(refs: CorporateAnimationRefs) {
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

      gsap.from(".corp-step", {
        opacity: 0,
        x: -12,
        duration: 0.4,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".corp-step", start: "top 82%" },
      });

      gsap.from(".corp-iva", {
        opacity: 0,
        y: 10,
        duration: 0.4,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: { trigger: ".corp-iva", start: "top 85%" },
      });
    },
    { scope: sectionRef },
  );
}
