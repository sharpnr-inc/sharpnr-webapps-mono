import { useGSAP } from "@gsap/react";
import { gsap, DrawSVGPlugin } from "@/configs/gsap";
import type { RefObject } from "react";

interface NetworkAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  introRef: RefObject<HTMLDivElement | null>;
}

/** Organizations appear, the relationship forms, business flows. */
export function useNetworkAnimation(refs: NetworkAnimationRefs) {
  const { sectionRef, introRef } = refs;

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      gsap.from(introRef.current ? introRef.current.children : [], {
        opacity: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
      });

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: { trigger: sectionRef.current, start: "top 55%" },
      });

      // The two organizations exist first; only then does the edge between
      // them get drawn. Reversing that would say the network came before
      // the businesses.
      tl.from(".network-org", {
        opacity: 0,
        y: 10,
        duration: 0.5,
        stagger: 0.14,
        ease: "power3.out",
      });
      tl.fromTo(
        ".network-link",
        { drawSVG: "0% 0%" },
        { drawSVG: "0% 100%", duration: 0.9, ease: "power2.inOut" },
        "-=0.15",
      );
      tl.from(
        ".network-seal",
        { opacity: 0, scale: 0.7, transformOrigin: "261px 72px", duration: 0.45, ease: "power3.out" },
        "-=0.25",
      );
      tl.from(
        ".network-step",
        { opacity: 0, y: 10, duration: 0.35, stagger: 0.1, ease: "power3.out" },
        "-=0.5",
      );
      tl.from(".network-outro", { opacity: 0, y: 12, duration: 0.5, ease: "power3.out" }, "-=0.15");
    },
    { scope: sectionRef },
  );

  void DrawSVGPlugin;
}
