import { useGSAP } from "@gsap/react";
import { gsap, DrawSVGPlugin } from "@/configs/gsap";
import type { RefObject } from "react";

interface BuilderIntroRefs {
  sectionRef: RefObject<HTMLElement | null>;
  introRef: RefObject<HTMLDivElement | null>;
}

const reducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Section entrance — intro copy settles in once. */
export function useBuilderIntroAnimation(refs: BuilderIntroRefs) {
  const { sectionRef, introRef } = refs;

  useGSAP(
    () => {
      if (reducedMotion()) return;

      gsap.from(introRef.current ? introRef.current.children : [], {
        opacity: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
      });
    },
    { scope: sectionRef },
  );
}

/**
 * Signature pattern 05 — Platform Expansion. A newly adopted product
 * settles into place; growth feels natural, never abrupt.
 */
export function useMountReveal(ref: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      if (!ref.current || reducedMotion()) return;

      gsap.from(ref.current, {
        opacity: 0,
        scale: 0.85,
        duration: 0.5,
        ease: "power3.out",
      });
    },
    { scope: ref },
  );
}

/** A new connection draws from the platform to the added product. */
export function useSpokeDraw(ref: RefObject<SVGPathElement | null>) {
  useGSAP(
    () => {
      if (!ref.current || reducedMotion()) return;

      gsap.fromTo(
        ref.current,
        { drawSVG: "0%" },
        { drawSVG: "100%", duration: 0.55, ease: "power2.inOut" },
      );
    },
    { scope: ref },
  );

  void DrawSVGPlugin;
}
