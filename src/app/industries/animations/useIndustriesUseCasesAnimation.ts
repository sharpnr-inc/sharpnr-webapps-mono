import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";

interface IndustriesUseCasesAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  headingRef: RefObject<HTMLDivElement | null>;
  scenariosRef: RefObject<HTMLDivElement | null>;
}

export function useIndustriesUseCasesAnimation(
  refs: IndustriesUseCasesAnimationRefs,
) {
  const { sectionRef, headingRef, scenariosRef } = refs;

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      // ── Phase 1: Heading cascades in ───────────────────────────
      gsap.from(headingRef.current ? headingRef.current.children : [], {
        opacity: 0,
        y: 28,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });

      // ── Phase 2: Each scenario builds its flow left → right ─────
      const scenarios = scenariosRef.current
        ? gsap.utils.toArray<HTMLElement>(
            scenariosRef.current.querySelectorAll("[data-scenario]"),
          )
        : [];

      scenarios.forEach((scenario) => {
        const header = scenario.querySelector("[data-sc-header]");
        const nodes = gsap.utils.toArray<HTMLElement>(
          scenario.querySelectorAll("[data-node]"),
        );
        const connectors = gsap.utils.toArray<HTMLElement>(
          scenario.querySelectorAll("[data-conn]"),
        );

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: scenario,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        });

        if (header) {
          tl.from(header, { opacity: 0, y: 20, duration: 0.5 });
        }
        if (nodes.length) {
          tl.from(
            nodes,
            { opacity: 0, y: 22, duration: 0.5, stagger: 0.12 },
            header ? "-=0.15" : 0,
          );
        }
        if (connectors.length) {
          tl.from(
            connectors,
            { opacity: 0, scale: 0.5, duration: 0.3, stagger: 0.12 },
            "<0.12",
          );
        }
      });

      // ── Phase 3: Ambient — the automatic "result" payoff pulses ──
      const glows = scenariosRef.current
        ? gsap.utils.toArray<HTMLElement>(
            scenariosRef.current.querySelectorAll("[data-glow]"),
          )
        : [];

      if (glows.length) {
        gsap.to(glows, {
          opacity: 0.55,
          scale: 1.12,
          duration: 1.9,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.4,
        });
      }
    },
    { scope: sectionRef },
  );
}
