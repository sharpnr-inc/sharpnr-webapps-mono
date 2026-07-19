import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";

interface MarketplaceAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  introRef: RefObject<HTMLDivElement | null>;
}

/** Relationships form step by step — trust, not transactions. */
export function useMarketplaceAnimation(refs: MarketplaceAnimationRefs) {
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

      gsap.from(".mkt-cap", {
        opacity: 0,
        y: 16,
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".mkt-cap", start: "top 82%" },
      });

      gsap.from(".mkt-step", {
        opacity: 0,
        x: -12,
        duration: 0.45,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".mkt-step", start: "top 82%" },
      });
    },
    { scope: sectionRef },
  );
}
