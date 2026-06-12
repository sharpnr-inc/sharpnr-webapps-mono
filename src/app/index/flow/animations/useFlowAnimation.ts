import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";

interface FlowAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  headingRef: RefObject<HTMLDivElement | null>;
  nodesRef: RefObject<SVGGElement | null>;
  linksRef: RefObject<SVGGElement | null>;
  chipARef: RefObject<SVGGElement | null>;
  chipBRef: RefObject<SVGGElement | null>;
  ping1Ref: RefObject<SVGCircleElement | null>;
  ping2Ref: RefObject<SVGCircleElement | null>;
  /* Travel distances in viewBox units for each pipeline segment */
  segA: { from: number; to: number };
  segB: { from: number; to: number };
}

export function useFlowAnimation(refs: FlowAnimationRefs) {
  const {
    sectionRef,
    headingRef,
    nodesRef,
    linksRef,
    chipARef,
    chipBRef,
    ping1Ref,
    ping2Ref,
    segA,
    segB,
  } = refs;

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      // ── Phase 1: Heading reveals ───────────────────────────────
      gsap.from(headingRef.current ? headingRef.current.children : [], {
        opacity: 0,
        y: 32,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      const nodes = nodesRef.current
        ? gsap.utils.toArray<SVGGElement>(nodesRef.current.children)
        : [];
      const links = linksRef.current
        ? gsap.utils.toArray<SVGLineElement>(linksRef.current.children)
        : [];

      // ── Phase 2: Pipeline assembles on scroll ──────────────────
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: nodesRef.current,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });

      tl.from(nodes, {
        opacity: 0,
        y: 24,
        scale: 0.94,
        transformOrigin: "center center",
        duration: 0.6,
        stagger: 0.15,
      }).from(
        links,
        {
          opacity: 0,
          scaleX: 0,
          transformOrigin: "left center",
          duration: 0.5,
          stagger: 0.15,
          ease: "power2.inOut",
        },
        "-=0.4",
      );

      // ── Phase 3: The document rides the pipeline, forever ──────
      tl.add(() => {
        const chipA = chipARef.current;
        const chipB = chipBRef.current;
        if (!chipA || !chipB) return;

        const loop = gsap.timeline({ repeat: -1, repeatDelay: 1.2 });

        // Order leaves Hospitality
        loop
          .fromTo(
            chipA,
            { x: segA.from, opacity: 0 },
            { opacity: 1, duration: 0.25, ease: "none" },
            0,
          )
          .to(chipA, { x: segA.to, duration: 1.4, ease: "power1.inOut" }, 0)
          .to(chipA, { opacity: 0, duration: 0.25 }, 1.15);

        // Accounting acknowledges
        if (ping1Ref.current) {
          loop.fromTo(
            ping1Ref.current,
            { attr: { r: 4 }, opacity: 0.8 },
            { attr: { r: 26 }, opacity: 0, duration: 0.9, ease: "power1.out" },
            1.3,
          );
        }

        // Journal entry flows on to the statements
        loop
          .fromTo(
            chipB,
            { x: segB.from, opacity: 0 },
            { opacity: 1, duration: 0.25, ease: "none" },
            1.7,
          )
          .to(
            chipB,
            { x: segB.to, duration: 1.4, ease: "power1.inOut" },
            1.7,
          )
          .to(chipB, { opacity: 0, duration: 0.25 }, 2.85);

        // Statements update
        if (ping2Ref.current) {
          loop.fromTo(
            ping2Ref.current,
            { attr: { r: 4 }, opacity: 0.8 },
            { attr: { r: 26 }, opacity: 0, duration: 0.9, ease: "power1.out" },
            3.0,
          );
        }

        // Links shimmer continuously
        links.forEach((link) => {
          gsap.to(link, {
            strokeDashoffset: -20,
            duration: 1,
            repeat: -1,
            ease: "none",
          });
        });
      });
    },
    { scope: sectionRef },
  );
}
