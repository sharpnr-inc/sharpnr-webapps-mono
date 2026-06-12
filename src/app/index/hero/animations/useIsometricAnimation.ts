import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";

type GRef = RefObject<SVGGElement | null>;

interface IsometricAnimationRefs {
  containerRef: RefObject<HTMLDivElement | null>;
  svgRef: RefObject<SVGSVGElement | null>;
  parallax: {
    pFoundationRef: GRef;
    pCoreRef: GRef;
    pControlRef: GRef;
    pBizRef: GRef;
    pOrg2Ref: GRef;
  };
  layers: {
    foundationRef: GRef;
    coreRef: GRef;
    controlRef: GRef;
    bizRef: GRef;
    org2Ref: GRef;
  };
  pieces: {
    corePlateRef: GRef;
    coreBlocksRef: GRef;
    controlPlateRef: GRef;
    controlBlocksRef: GRef;
    bizPlateRef: GRef;
    bizBlocksRef: GRef;
  };
  beamsRef: GRef;
  labelsRef: GRef;
  flowRef: GRef;
  flowPathRef: RefObject<SVGPathElement | null>;
  pulsesRef: GRef;
  flowPulseRef: RefObject<SVGCircleElement | null>;
  beaconRingRef: RefObject<SVGCircleElement | null>;
}

export function useIsometricAnimation(refs: IsometricAnimationRefs) {
  const {
    containerRef,
    parallax,
    layers,
    pieces,
    beamsRef,
    labelsRef,
    flowRef,
    flowPathRef,
    pulsesRef,
    flowPulseRef,
    beaconRingRef,
  } = refs;

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      const beams = beamsRef.current
        ? gsap.utils.toArray<SVGLineElement>(beamsRef.current.children)
        : [];
      const labels = labelsRef.current
        ? gsap.utils.toArray<SVGGElement>(labelsRef.current.children)
        : [];
      const flowPaths = flowRef.current
        ? gsap.utils.toArray<SVGPathElement>(
            flowRef.current.children,
          ).filter((el) => el.tagName === "path")
        : [];
      const coreBlocks = pieces.coreBlocksRef.current?.children ?? [];
      const bizBlocks = pieces.bizBlocksRef.current?.children ?? [];

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });

      // ── Phase 1: Foundation — Sharp-Marketplace draws in ───────
      tl.from(layers.foundationRef.current, {
        opacity: 0,
        y: 56,
        duration: 1,
      });

      // ── Phase 2: Core Services floor builds up ─────────────────
      tl.from(
        pieces.corePlateRef.current,
        { opacity: 0, y: 48, duration: 0.7 },
        "-=0.45",
      ).from(
        coreBlocks,
        { opacity: 0, y: 28, duration: 0.5, stagger: 0.09 },
        "-=0.3",
      );

      // ── Phase 3: Orchestrator control floor rises ──────────────
      tl.from(
        pieces.controlPlateRef.current,
        { opacity: 0, y: 48, duration: 0.7 },
        "-=0.25",
      ).from(
        pieces.controlBlocksRef.current,
        { opacity: 0, y: 26, duration: 0.5 },
        "-=0.3",
      );

      // ── Phase 4: Business Operations floor lands on top ────────
      tl.from(
        pieces.bizPlateRef.current,
        { opacity: 0, y: -56, duration: 0.7 },
        "-=0.2",
      ).from(
        bizBlocks,
        { opacity: 0, y: -30, duration: 0.5, stagger: 0.09 },
        "-=0.3",
      );

      // ── Phase 5: Beams + layer labels connect the floors ───────
      tl.from(
        beams,
        { drawSVG: "0%", duration: 0.6, stagger: 0.05, ease: "power2.inOut" },
        "-=0.2",
      ).from(
        labels,
        { opacity: 0, x: -16, duration: 0.5, stagger: 0.08 },
        "-=0.5",
      );

      // ── Phase 6: Partner org builds in via the marketplace ─────
      tl.from(
        layers.org2Ref.current,
        { opacity: 0, y: 48, duration: 0.8 },
        "-=0.2",
      ).from(flowPaths, { opacity: 0, duration: 0.7 }, "-=0.4");

      // ── Phase 7: Ambient loop — float, pulses, beacon, flow ────
      tl.add(() => {
        // Floors drift gently at offset rhythms
        const floats: [GRef, number, number][] = [
          [layers.coreRef, 4, 3.4],
          [layers.controlRef, 5, 4.0],
          [layers.bizRef, 6, 4.6],
          [layers.org2Ref, 4, 5.2],
        ];
        floats.forEach(([ref, dist, dur]) => {
          gsap.to(ref.current, {
            y: -dist,
            duration: dur,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });

        // Data pulses ride the beams upward
        const pulses = pulsesRef.current
          ? gsap.utils.toArray<SVGCircleElement>(pulsesRef.current.children)
          : [];
        pulses.forEach((pulse, i) => {
          const y0 = Number(pulse.dataset.y0);
          const y1 = Number(pulse.dataset.y1);
          gsap
            .timeline({ repeat: -1, repeatDelay: 0.9, delay: i * 1.1 })
            .fromTo(
              pulse,
              { attr: { cy: y0 } },
              { attr: { cy: y1 }, duration: 2.4, ease: "none" },
            )
            .to(pulse, { opacity: 0.9, duration: 0.35 }, 0)
            .to(pulse, { opacity: 0, duration: 0.35 }, 2.05);
        });

        // A packet travels the marketplace route between orgs
        if (flowPulseRef.current && flowPathRef.current) {
          gsap
            .timeline({ repeat: -1, repeatDelay: 0.6 })
            .to(
              flowPulseRef.current,
              {
                motionPath: {
                  path: flowPathRef.current,
                  align: flowPathRef.current,
                  alignOrigin: [0.5, 0.5],
                },
                duration: 3,
                ease: "power1.inOut",
              },
              0,
            )
            .to(flowPulseRef.current, { opacity: 0.9, duration: 0.4 }, 0)
            .to(flowPulseRef.current, { opacity: 0, duration: 0.4 }, 2.6);
        }

        // Marketplace route flows continuously
        gsap.to(flowPathRef.current, {
          strokeDashoffset: -28,
          duration: 1.1,
          repeat: -1,
          ease: "none",
        });

        // Orchestrator beacon pings
        if (beaconRingRef.current) {
          gsap.fromTo(
            beaconRingRef.current,
            { attr: { r: 3 }, opacity: 0.7 },
            {
              attr: { r: 16 },
              opacity: 0,
              duration: 1.8,
              repeat: -1,
              repeatDelay: 0.5,
              ease: "power1.out",
            },
          );
        }
      });

      // ── Parallax: layers shift with the pointer for depth ──────
      const container = containerRef.current;
      if (!container) return;

      const targets: [GRef, number][] = [
        [parallax.pFoundationRef, 3],
        [parallax.pCoreRef, 7],
        [parallax.pControlRef, 11],
        [parallax.pBizRef, 16],
        [parallax.pOrg2Ref, 8],
      ];
      const movers = targets
        .filter(([ref]) => ref.current)
        .map(([ref, depth]) => ({
          x: gsap.quickTo(ref.current, "x", { duration: 0.7, ease: "power3" }),
          y: gsap.quickTo(ref.current, "y", { duration: 0.7, ease: "power3" }),
          depth,
        }));

      const onMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        movers.forEach((m) => {
          m.x(nx * m.depth);
          m.y(ny * m.depth * 0.55);
        });
      };
      const onLeave = () => movers.forEach((m) => (m.x(0), m.y(0)));

      container.addEventListener("mousemove", onMove);
      container.addEventListener("mouseleave", onLeave);
      return () => {
        container.removeEventListener("mousemove", onMove);
        container.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: containerRef },
  );
}
