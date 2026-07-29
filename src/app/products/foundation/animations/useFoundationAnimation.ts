import type { RefObject } from "react";
import { gsap, useGSAP } from "@/configs/gsap";
import { prefersReduced, revealOnce } from "@/app/home/shared/motion";
import { animeWordsOnEnter } from "@/app/home/shared/reveal";

interface FoundationAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  eyebrowRef: RefObject<HTMLParagraphElement | null>;
  headingRef: RefObject<HTMLHeadingElement | null>;
  copyRef: RefObject<HTMLParagraphElement | null>;
  figureRef: RefObject<HTMLDivElement | null>;
}

/**
 * The diagram assembling in the order the argument runs.
 *
 * Modules first, then their runs drawing down into the bus, then the slab
 * arriving under all of it, then the four things printed on it. Everything
 * fading in together would read as a picture appearing; drawn in this
 * order it reads as nine capabilities landing on one foundation, which is
 * the sentence the section is making.
 *
 * Dashes are measured per path with getTotalLength, so a short drop and
 * the full-width bus draw at the same rate — one hardcoded dash makes
 * short runs snap and long ones crawl.
 *
 * Reversible, per Motion Language v3.1: this is a multi-phase
 * demonstration, so scrolling back above it puts it away again.
 */
export function useFoundationAnimation(refs: FoundationAnimationRefs) {
  const { sectionRef, eyebrowRef, headingRef, copyRef, figureRef } = refs;

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      animeWordsOnEnter(headingRef.current, section);
      if (eyebrowRef.current) revealOnce(eyebrowRef.current, section);
      if (copyRef.current) revealOnce(copyRef.current, section, { delay: 0.15 });

      const figure = figureRef.current;
      if (prefersReduced() || !figure) return;

      const q = <T extends Element>(sel: string) =>
        Array.from(figure.querySelectorAll<T>(sel));

      const mods = q<SVGGElement>(".pf-mod");
      const traces = q<SVGPathElement>(".pf-trace");
      const slab = figure.querySelector(".pf-slab");
      const cells = q<SVGTextElement>(".pf-cell");
      if (!traces.length) return;

      traces.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });
      gsap.set([mods, cells], { opacity: 0 });
      gsap.set(slab, { opacity: 0 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: figure,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        })
        .to(mods, { opacity: 1, duration: 0.4, stagger: 0.05 })
        .to(
          traces,
          {
            strokeDashoffset: 0,
            duration: 0.7,
            stagger: 0.04,
            ease: "power2.inOut",
          },
          "-=0.15",
        )
        .to(slab, { opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.3")
        .to(cells, { opacity: 1, duration: 0.4, stagger: 0.07 }, "-=0.15");
    },
    { scope: sectionRef },
  );
}
