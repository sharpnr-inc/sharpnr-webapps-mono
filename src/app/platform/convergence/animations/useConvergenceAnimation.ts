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
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
      });
      tl.fromTo(
        ".conv-spoke",
        { drawSVG: "0% 0%" },
        { drawSVG: "0% 100%", duration: 1.6, stagger: 0.12, ease: "power2.in" },
        "-=0.3",
      );
      tl.from(".conv-core", {
        opacity: 0,
        scale: 0.7,
        transformOrigin: "280px 240px",
        duration: 1,
        ease: "power3.out",
      });

      // Pause. Then the statement — slower, larger gaps.
      tl.from(
        statementRef.current ? statementRef.current.children : [],
        { opacity: 0, y: 18, duration: 1, stagger: 0.5, ease: "power3.out" },
        "+=0.6",
      );
      tl.from(
        ctaRef.current,
        { opacity: 0, y: 16, duration: 0.8, ease: "power3.out" },
        "+=0.3",
      );
    },
    { scope: sectionRef },
  );

  void DrawSVGPlugin;
}
