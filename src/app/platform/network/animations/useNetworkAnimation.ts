import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";

interface NetworkAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  introRef: RefObject<HTMLDivElement | null>;
}

/** Organizations appear, the relationship forms, business flows. */
export function useNetworkAnimation(refs: NetworkAnimationRefs) {
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

      tl.from(".network-org", {
        opacity: 0,
        scale: 0.85,
        duration: 0.55,
        stagger: 0.15,
        ease: "power3.out",
      });
      tl.to(".network-fill", { scaleX: 1, duration: 1.2 }, "-=0.2");
      tl.from(
        ".network-step",
        { opacity: 0, y: 10, duration: 0.4, stagger: 0.12, ease: "power3.out" },
        "-=0.9",
      );
      tl.from(".network-outro", { opacity: 0, y: 12, duration: 0.6, ease: "power3.out" });
    },
    { scope: sectionRef },
  );
}
