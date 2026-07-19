import { useGSAP } from "@gsap/react";
import { gsap, DrawSVGPlugin } from "@/configs/gsap";
import type { RefObject } from "react";

interface ConnectedAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  copyRef: RefObject<HTMLDivElement | null>;
}

/**
 * Signature pattern 01 — Connected Flow.
 * Separate parts appear first; connections then draw them into one
 * system. Plays once and stays connected.
 */
export function useConnectedAnimation(refs: ConnectedAnimationRefs) {
  const { sectionRef, copyRef } = refs;

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      tl.from(copyRef.current ? copyRef.current.children : [], {
        opacity: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.12,
      });

      // Parts exist first — independent, unconnected
      tl.from(
        ".connected-node",
        { opacity: 0, y: 10, duration: 0.45, stagger: 0.08 },
        "-=0.3",
      );

      // Then the platform appears and connects them
      tl.from(".connected-core", {
        opacity: 0,
        scale: 0.85,
        transformOrigin: "260px 210px",
        duration: 0.5,
      });
      tl.fromTo(
        ".connected-line",
        { drawSVG: "0%" },
        { drawSVG: "100%", duration: 0.9, stagger: 0.09, ease: "power2.inOut" },
      );

      // Connection changes the parts — they now belong to one system
      tl.to(
        ".connected-pill",
        { stroke: "#0077b6", strokeOpacity: 0.55, duration: 0.5, stagger: 0.05 },
        "-=0.4",
      );
    },
    { scope: sectionRef },
  );

  void DrawSVGPlugin;
}
