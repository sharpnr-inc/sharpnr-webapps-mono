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

      // The statement and the CTA each get their own trigger rather than
      // sharing one timeline. That began as a fix — chained behind the
      // diagram that used to sit here, the closing moment of the page and
      // its only call to action stayed at opacity 0 for the eight seconds
      // the diagram took, which is exactly the span in which a visitor
      // scrolls past them. The diagram is gone; separate triggers are still
      // right, because these two are a screen apart.
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
