import { useGSAP } from "@gsap/react";
import { gsap, DrawSVGPlugin } from "@/configs/gsap";
import type { RefObject } from "react";

interface EcosystemAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  introRef: RefObject<HTMLDivElement | null>;
  listRef: RefObject<HTMLDivElement | null>;
}

/** The ecosystem gradually assembles itself as the section enters. */
export function useEcosystemAnimation(refs: EcosystemAnimationRefs) {
  const { sectionRef, introRef, listRef } = refs;

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

      tl.from(introRef.current ? introRef.current.children : [], {
        opacity: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.12,
      });
      tl.from(".eco-core", { opacity: 0, scale: 0.9, transformOrigin: "210px 210px", duration: 0.5 }, "-=0.2");
      tl.from(
        ".eco-node",
        { opacity: 0, scale: 0.7, transformOrigin: "center center", duration: 0.45, stagger: 0.07 },
        "-=0.2",
      );
      tl.fromTo(
        ".eco-line",
        { drawSVG: "0%" },
        { drawSVG: "100%", duration: 0.8, stagger: 0.04, ease: "power2.inOut" },
        "-=0.4",
      );
      tl.from(
        listRef.current ? listRef.current.children : [],
        { opacity: 0, y: 20, duration: 0.5, stagger: 0.08 },
        "-=0.8",
      );
    },
    { scope: sectionRef },
  );

  void DrawSVGPlugin;
}
