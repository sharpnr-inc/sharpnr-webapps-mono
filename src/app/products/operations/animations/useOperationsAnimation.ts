import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";

interface OperationsAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  introRef: RefObject<HTMLDivElement | null>;
}

/** Operational areas reveal in a calm cascade as the section enters. */
export function useOperationsAnimation(refs: OperationsAnimationRefs) {
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

      gsap.from(".ops-area", {
        opacity: 0,
        y: 16,
        duration: 0.5,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: { trigger: ".ops-area", start: "top 82%" },
      });

      gsap.from(".ops-future", {
        opacity: 0,
        y: 16,
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".ops-future", start: "top 85%" },
      });
    },
    { scope: sectionRef },
  );
}
