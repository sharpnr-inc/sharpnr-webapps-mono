import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";

interface MarketplaceAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  copyRef: RefObject<HTMLDivElement | null>;
  hubRef: RefObject<SVGGElement | null>;
  linesRef: RefObject<SVGGElement | null>;
  nodesRef: RefObject<SVGGElement | null>;
}

export function useMarketplaceAnimation(refs: MarketplaceAnimationRefs) {
  const { sectionRef, copyRef, hubRef, linesRef, nodesRef } = refs;

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      // ── Phase 1: Copy column reveals ───────────────────────────
      gsap.from(copyRef.current ? copyRef.current.children : [], {
        opacity: 0,
        y: 32,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: copyRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      const lines = linesRef.current
        ? gsap.utils.toArray<SVGLineElement>(linesRef.current.children)
        : [];
      const nodes = nodesRef.current
        ? gsap.utils.toArray<SVGGElement>(nodesRef.current.children)
        : [];

      // ── Phase 2: Network assembles ─────────────────────────────
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: hubRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      tl.from(hubRef.current, {
        opacity: 0,
        scale: 0.7,
        transformOrigin: "center center",
        duration: 0.7,
      })
        .from(
          lines,
          { drawSVG: "0%", duration: 0.6, stagger: 0.1, ease: "power2.inOut" },
          "-=0.3",
        )
        .from(
          nodes,
          {
            opacity: 0,
            scale: 0.6,
            transformOrigin: "center center",
            duration: 0.5,
            stagger: 0.08,
          },
          "-=0.5",
        );

      // ── Phase 3: Ambient — trade flows between orgs ────────────
      tl.add(() => {
        lines.forEach((line, i) => {
          gsap.to(line, {
            strokeDashoffset: -24,
            duration: 1.4 + i * 0.2,
            repeat: -1,
            ease: "none",
          });
        });
        gsap.to(hubRef.current, {
          scale: 1.04,
          transformOrigin: "center center",
          duration: 2.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    },
    { scope: sectionRef },
  );
}
