import { useGSAP } from "@gsap/react";
import { gsap, DrawSVGPlugin, MotionPathPlugin } from "@/configs/gsap";
import type { RefObject } from "react";

interface HeroAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  copyRef: RefObject<HTMLDivElement | null>;
  cueRef: RefObject<HTMLDivElement | null>;
}

/**
 * Opening motion: typography first, then the ecosystem assembles —
 * nodes appear, connections draw, business events begin to travel.
 */
export function useHeroAnimation(refs: HeroAnimationRefs) {
  const { sectionRef, copyRef, cueRef } = refs;

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // ── Typography first (performance guideline: meaning loads first)
      tl.from(copyRef.current ? copyRef.current.children : [], {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.12,
      });

      // ── The ecosystem assembles ─────────────────────────────────
      tl.from(".hero-core", { opacity: 0, scale: 0.9, transformOrigin: "50% 50%", duration: 0.6 }, "-=0.4");
      tl.from(
        ".hero-node",
        { opacity: 0, scale: 0, transformOrigin: "50% 50%", duration: 0.5, stagger: 0.06 },
        "-=0.3",
      );
      tl.fromTo(
        ".hero-line",
        { drawSVG: "0%" },
        { drawSVG: "100%", duration: 1.1, stagger: 0.05, ease: "power2.inOut" },
        "-=0.5",
      );
      tl.from(cueRef.current, { opacity: 0, duration: 0.8 }, "-=0.3");

      // ── Business events travel across the connections ───────────
      const pulses = gsap.utils.toArray<SVGCircleElement>(".hero-pulse");
      pulses.forEach((pulse, i) => {
        const path = pulse.dataset.path;
        if (!path) return;
        gsap
          .timeline({ repeat: -1, delay: 2 + i * 1.4, repeatDelay: 4.5 })
          .set(pulse, { opacity: 1 })
          .to(pulse, {
            motionPath: {
              path,
              align: path,
              alignOrigin: [0.5, 0.5],
            },
            duration: 3.2,
            ease: "power1.inOut",
          })
          .to(pulse, { opacity: 0, duration: 0.3 }, "-=0.3");
      });

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

  // Keep the plugins referenced so tree-shaking never drops them.
  void DrawSVGPlugin;
  void MotionPathPlugin;
}
