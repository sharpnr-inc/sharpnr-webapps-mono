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

      /* The close converges, because that is what the section is called
         and what it claims. The label and the sentence come in from
         above and below and close on the heading between them, instead
         of the three of them filing upward in a stagger like every other
         section on the page. */
      const intro = gsap.utils.toArray<HTMLElement>(".conv-intro");
      if (intro.length === 3) {
        gsap
          .timeline({
            defaults: { ease: "power3.out", duration: 0.7 },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              once: true,
            },
          })
          .from(intro[1], { opacity: 0, scale: 0.97, duration: 0.8 })
          .from(intro[0], { opacity: 0, y: -22 }, 0.25)
          .from(intro[2], { opacity: 0, y: 22 }, 0.25);
      }

      // The statement and the CTA each get their own trigger rather than
      // sharing one timeline. That began as a fix — chained behind the
      // diagram that used to sit here, the closing moment of the page and
      // its only call to action stayed at opacity 0 for the eight seconds
      // the diagram took, which is exactly the span in which a visitor
      // scrolls past them. The diagram is gone; separate triggers are still
      // right, because these two are a screen apart.
      // The brand statement is the page's closing image, so it does the
      // same thing the section is named for: the two halves meet. It
      // arrives once and holds — nothing here loops.
      const statement = statementRef.current
        ? Array.from(statementRef.current.children)
        : [];
      if (statement.length) {
        gsap
          .timeline({
            defaults: { ease: "power3.out", duration: 0.8 },
            scrollTrigger: {
              trigger: statementRef.current,
              start: "top 88%",
              once: true,
            },
          })
          .from(statement[0], { opacity: 0, y: -20 })
          .from(statement.slice(1), { opacity: 0, y: 20, stagger: 0.2 }, 0.28);
      }
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
