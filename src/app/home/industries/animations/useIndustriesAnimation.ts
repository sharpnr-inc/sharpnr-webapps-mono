import type { RefObject } from "react";
import { useRef } from "react";
import { gsap, useGSAP } from "@/configs/gsap";
import { prefersReduced, revealOnce } from "@/app/home/shared/motion";
import { animeWordsOnEnter } from "@/app/home/shared/reveal";

interface IndustriesAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  headingRef: RefObject<HTMLHeadingElement | null>;
  copyRef: RefObject<HTMLParagraphElement | null>;
  shapeRef: RefObject<HTMLDivElement | null>;
  iconRef: RefObject<HTMLDivElement | null>;
  /** The current industry's clip-path target. */
  shape: string;
  /** Changes whenever the visitor hovers, focuses or taps a different
   * industry — drives the morph, independent of scroll position. */
  activeIndex: number;
}

/**
 * The shape settles in once, on scroll; after that it morphs on demand.
 *
 * Entrance: heading, copy and the shape itself fade up like every sibling
 * scene. Selection: choosing a different industry (hover/focus/tap, owned
 * by IndustriesSection) re-runs this hook with a new `shape` and tweens the
 * silhouette and icon to match — no scroll involvement at all, since this
 * one is driven by the visitor's pointer, not the page.
 */
export function useIndustriesAnimation(refs: IndustriesAnimationRefs) {
  const { sectionRef, headingRef, copyRef, shapeRef, iconRef, shape, activeIndex } = refs;
  const mounted = useRef(false);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      animeWordsOnEnter(headingRef.current, section);
      if (copyRef.current) revealOnce(copyRef.current, section, { delay: 0.15 });
      if (shapeRef.current) revealOnce(shapeRef.current, section, { delay: 0.1, y: 18 });
    },
    { scope: sectionRef },
  );

  useGSAP(
    () => {
      if (!shapeRef.current) return;

      // The shape mounts already showing the first industry — only morph
      // on genuine selection changes after that.
      if (!mounted.current) {
        mounted.current = true;
        return;
      }

      if (prefersReduced()) {
        gsap.set(shapeRef.current, { clipPath: shape });
        return;
      }

      gsap.to(shapeRef.current, { clipPath: shape, duration: 0.7, ease: "power2.inOut" });
      if (iconRef.current) {
        gsap.fromTo(
          iconRef.current,
          { opacity: 0, scale: 0.86, y: 6 },
          { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "power2.out" },
        );
      }
    },
    { dependencies: [activeIndex], scope: sectionRef },
  );
}
