import { useGSAP } from "@gsap/react";
import { gsap, DrawSVGPlugin } from "@/configs/gsap";
import type { RefObject } from "react";

interface IntelligenceAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  introRef: RefObject<HTMLDivElement | null>;
  productsRef: RefObject<HTMLDivElement | null>;
}

/**
 * Signature pattern 03 — Knowledge Flow. Always forward: activity →
 * connected knowledge → patterns → one quiet recommendation.
 */
export function useIntelligenceAnimation(refs: IntelligenceAnimationRefs) {
  const { sectionRef, introRef, productsRef } = refs;

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

      tl.from(".intel-event", {
        opacity: 0,
        x: -12,
        duration: 0.45,
        stagger: 0.12,
        ease: "power3.out",
      });
      tl.fromTo(
        ".intel-flow",
        { drawSVG: "0%" },
        { drawSVG: "100%", duration: 0.8, stagger: 0.1 },
        "-=0.4",
      );
      tl.from(
        ".intel-node",
        { opacity: 0, scale: 0.6, transformOrigin: "center center", duration: 0.4, stagger: 0.08, ease: "power3.out" },
        "-=0.5",
      );
      tl.fromTo(
        ".intel-pattern",
        { drawSVG: "0%" },
        { drawSVG: "100%", duration: 0.9, stagger: 0.15 },
        "-=0.2",
      );
      tl.from(".intel-insight", { opacity: 0, y: 10, duration: 0.6, ease: "power3.out" }, "+=0.2");

      gsap.from(productsRef.current ? productsRef.current.children : [], {
        opacity: 0,
        y: 20,
        duration: 0.55,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: productsRef.current, start: "top 80%" },
      });
    },
    { scope: sectionRef },
  );

  void DrawSVGPlugin;
}
