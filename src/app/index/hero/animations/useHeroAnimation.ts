import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/configs/gsap";
import type { RefObject } from "react";

interface HeroAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  badgeRef: RefObject<HTMLDivElement | null>;
  titleRef: RefObject<HTMLHeadingElement | null>;
  subtitleRef: RefObject<HTMLParagraphElement | null>;
  ctaRef: RefObject<HTMLDivElement | null>;
  trustRef: RefObject<HTMLParagraphElement | null>;
}

export function useHeroAnimation(refs: HeroAnimationRefs) {
  const { sectionRef, badgeRef, titleRef, subtitleRef, ctaRef, trustRef } =
    refs;

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion || !titleRef.current) return;

      const split = new SplitText(titleRef.current, { type: "words" });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // ── Phase 1: Badge ─────────────────────────────────────────
      tl.from(badgeRef.current, { opacity: 0, y: 14, duration: 0.5 });

      // ── Phase 2: Headline words cascade ────────────────────────
      tl.from(
        split.words,
        { opacity: 0, y: 30, duration: 0.7, stagger: 0.055 },
        "-=0.25",
      );

      // ── Phase 3: Subtitle ──────────────────────────────────────
      tl.from(
        subtitleRef.current,
        { opacity: 0, y: 20, duration: 0.6 },
        "-=0.45",
      );

      // ── Phase 4: CTAs + trust line ─────────────────────────────
      tl.from(
        ctaRef.current ? ctaRef.current.children : [],
        { opacity: 0, y: 18, duration: 0.5, stagger: 0.1 },
        "-=0.35",
      ).from(trustRef.current, { opacity: 0, duration: 0.6 }, "-=0.2");

      return () => split.revert();
    },
    { scope: sectionRef },
  );
}
