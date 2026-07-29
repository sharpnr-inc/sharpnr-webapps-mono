import { useGSAP } from "@gsap/react";
import { gsap, DrawSVGPlugin } from "@/configs/gsap";
import type { RefObject } from "react";

interface DifferentAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  introRef: RefObject<HTMLDivElement | null>;
  revealRef: RefObject<HTMLDivElement | null>;
}

/**
 * The defining brand moment: a business comes alive event by event,
 * then everything converges into one point — and the philosophy is
 * finally given its name. Plays once; the reveal stays.
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

      // Initial states — applied before the story begins.
      gsap.set(".diff-event", { opacity: 0, scale: 0.7, transformOrigin: "center center" });
      gsap.set(".diff-arc", { drawSVG: "0%" });
      gsap.set(".diff-spoke", { drawSVG: "0% 0%" });
      gsap.set(".diff-core", { opacity: 0, scale: 0.6, transformOrigin: "280px 280px" });
      gsap.set(revealRef.current!.children, { opacity: 0, y: 16 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 45%",
        },
      });

      // ── The business comes alive, one event creating the next ──
      const eventNodes = gsap.utils.toArray<Element>(".diff-event");
      const arcPaths = gsap.utils.toArray<Element>(".diff-arc");

      // Seven events told one at a time, but quickly: at the original
      // beat the whole sequence ran past ten seconds, and a visitor
      // scrolling at any normal speed reached the bottom of the section
      // while most of it was still at opacity 0 — a half-empty screen
      // where the page's defining moment was supposed to be. The order
      // is unchanged; only the tempo is.
      eventNodes.forEach((node, i) => {
        tl.to(node, { opacity: 1, scale: 1, duration: 0.22, ease: "power3.out" });
        if (i < arcPaths.length) {
          tl.to(arcPaths[i], { drawSVG: "100%", duration: 0.3 }, ">-0.18");
        }
      });

      // ── The convergence — everything flows to one point ────────
      tl.to(".diff-arc", { strokeOpacity: 0.15, duration: 0.5 }, "+=0.25");
      tl.to(
        ".diff-spoke",
        { drawSVG: "0% 100%", duration: 0.7, stagger: 0.05, ease: "power2.in" },
        "<",
      );
      tl.to(".diff-core", {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "power3.out",
      });

      // ── Pause. Then the philosophy is named. ───────────────────
      tl.to(
        revealRef.current!.children,
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.22, ease: "power3.out" },
        "+=0.3",
      );
    },
    { scope: sectionRef },
  );

  void DrawSVGPlugin;
}
