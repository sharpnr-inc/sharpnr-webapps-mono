import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";

interface HeroAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  copyRef: RefObject<HTMLDivElement | null>;
  halvesRef: RefObject<HTMLDivElement | null>;
  cueRef: RefObject<HTMLDivElement | null>;
}

/**
 * Opening motion: meaning loads first. The message staggers in, then
 * the two halves settle and the connector draws between them —
 * "connected out of the box" shown, not decorated.
 */
export function useHeroAnimation(refs: HeroAnimationRefs) {
  const { sectionRef, copyRef, halvesRef, cueRef } = refs;

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // ── The message first ───────────────────────────────────────
      tl.from(copyRef.current ? copyRef.current.children : [], {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.12,
      });

      // ── The two halves settle in ────────────────────────────────
      tl.from(
        ".hero-half",
        { opacity: 0, y: 16, duration: 0.6, stagger: 0.12 },
        "-=0.2",
      );

      // ── The connection draws between them ───────────────────────
      tl.from(
        ".hero-connector-line",
        { scaleX: 0, duration: 0.9, ease: "power2.inOut" },
        "-=0.4",
      );

      tl.from(cueRef.current, { opacity: 0, duration: 0.8 }, "-=0.3");

      // ── Scroll cue breathes gently ──────────────────────────────
      gsap.to(".hero-cue-line", {
        scaleY: 1.6,
        transformOrigin: "top",
        opacity: 0.6,
        duration: 1.6,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        delay: 2.5,
      });
    },
    { scope: sectionRef },
  );
}
