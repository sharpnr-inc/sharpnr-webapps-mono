import { useGSAP } from "@gsap/react";
import { gsap, DrawSVGPlugin } from "@/configs/gsap";
import type { RefObject } from "react";

interface ConvergenceAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  statementRef: RefObject<HTMLDivElement | null>;
  ctaRef: RefObject<HTMLDivElement | null>;
}

/**
 * The conclusion — deliberately slower than every section before it.
 * Areas settle, connections flow to the center, the platform appears,
 * and the brand statement is revealed. Plays once and stays.
 */
export function useConvergenceAnimation(refs: ConvergenceAnimationRefs) {
  const { sectionRef, statementRef, ctaRef } = refs;

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      gsap.from(".conv-intro", {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: { trigger: sectionRef.current, start: "top 45%" },
      });

      tl.from(".conv-area", {
        opacity: 0,
        scale: 0.8,
        transformOrigin: "center center",
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out",
      });
      tl.fromTo(
        ".conv-spoke",
        { drawSVG: "0% 0%" },
        { drawSVG: "0% 100%", duration: 0.9, stagger: 0.07, ease: "power2.in" },
        "-=0.25",
      );
      tl.from(".conv-core", {
        opacity: 0,
        scale: 0.7,
        transformOrigin: "280px 240px",
        duration: 0.6,
        ease: "power3.out",
      });

      // The statement and the CTA are a full screen below the diagram, so
      // they get their own triggers rather than waiting at the end of this
      // timeline. Chained to it, the closing moment of the page — and the
      // only call to action on it — stayed at opacity 0 for the eight
      // seconds the diagram took, which is exactly the span in which a
      // visitor scrolls past them.
      gsap.from(statementRef.current ? statementRef.current.children : [], {
        opacity: 0,
        y: 18,
        duration: 0.7,
        stagger: 0.28,
        ease: "power3.out",
        scrollTrigger: { trigger: statementRef.current, start: "top 88%" },
      });
      gsap.from(ctaRef.current, {
        opacity: 0,
        y: 16,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: ctaRef.current, start: "top 90%" },
      });
    },
    { scope: sectionRef },
  );

  void DrawSVGPlugin;
}
