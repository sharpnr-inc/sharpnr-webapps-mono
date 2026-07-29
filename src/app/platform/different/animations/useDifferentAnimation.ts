import { useGSAP } from "@gsap/react";
import { gsap, DrawSVGPlugin } from "@/configs/gsap";
import type { RefObject } from "react";

interface DifferentAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  introRef: RefObject<HTMLDivElement | null>;
  revealRef: RefObject<HTMLDivElement | null>;
}

/**
 * One comparison, made in two beats.
 *
 * The top band assembles and then weaves itself together; the bottom band
 * arrives already finished and stays that way. The asymmetry is the whole
 * argument — the eye should be waiting for the second band to connect, and
 * it never does. Plays once.
 */
export function useDifferentAnimation(refs: DifferentAnimationRefs) {
  const { sectionRef, introRef, revealRef } = refs;

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      // Same information, no motion — everything stays visible.
      if (prefersReducedMotion) return;

      gsap.from(introRef.current ? introRef.current.children : [], {
        opacity: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
      });

      gsap.set(".diff-node", {
        opacity: 0,
        y: 10,
        transformOrigin: "center center",
      });
      gsap.set(".diff-severed", { opacity: 0, y: 10 });
      gsap.set(".diff-link", { drawSVG: "0%" });
      gsap.set(".diff-band", { opacity: 0 });
      gsap.set(revealRef.current!.children, { opacity: 0, y: 16 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: { trigger: sectionRef.current, start: "top 45%" },
      });

      // ── The business: parts first, then the ties between them ──
      tl.to(".diff-band", { opacity: 1, duration: 0.4, stagger: 0.5 });
      tl.to(
        ".diff-node",
        { opacity: 1, y: 0, duration: 0.34, stagger: 0.09, ease: "power3.out" },
        "<",
      );
      // The four straight runs go first and quickly — they are the obvious
      // connections. The three that jog clear of the row follow, slower,
      // because they are the ones carrying the claim.
      tl.to(".diff-link", {
        drawSVG: "100%",
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
      });

      // ── The software: the same parts, and nothing joins them ──
      tl.to(
        ".diff-severed",
        { opacity: 1, y: 0, duration: 0.34, stagger: 0.09, ease: "power3.out" },
        "+=0.35",
      );

      // ── Pause on the gap, then name the philosophy ──
      tl.to(
        revealRef.current!.children,
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.22, ease: "power3.out" },
        "+=0.5",
      );
    },
    { scope: sectionRef },
  );

  void DrawSVGPlugin;
}
