import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";

interface IntelligenceProductsAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  introRef: RefObject<HTMLDivElement | null>;
}

/** Knowledge flows forward — chain, foundation, agent, scenario. */
export function useIntelligenceProductsAnimation(
  refs: IntelligenceProductsAnimationRefs,
) {
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

      gsap.from(".intel-chain", {
        opacity: 0,
        x: -10,
        duration: 0.4,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
      });

      gsap.utils
        .toArray<HTMLElement>(".intel-block, .intel-scenario")
        .forEach((block) => {
          gsap.from(block, {
            opacity: 0,
            y: 24,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: { trigger: block, start: "top 80%" },
          });
        });

      gsap.from(".intel-role", {
        opacity: 0,
        y: 18,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".intel-role", start: "top 82%" },
      });
    },
    { scope: sectionRef },
  );
}
