import type { RefObject } from "react";
import { gsap, useGSAP } from "@/configs/gsap";
import { prefersReduced, revealOnce } from "@/app/home/shared/motion";
import { animeWordsOnEnter } from "@/app/home/shared/reveal";

interface OnePlatformAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  headingRef: RefObject<HTMLHeadingElement | null>;
  copyRef: RefObject<HTMLParagraphElement | null>;
  fieldRef: RefObject<HTMLDivElement | null>;
}

/* The visual has to land before the headline states its claim. */
const HEADLINE_DELAY = 1.2;

/**
 * The turn — the map drawing itself, then carrying traffic.
 *
 * Sequence: the modules appear, their traces draw downward into the bus,
 * the bus draws outward, the platform lands, and the foundation settles
 * under it. Only then do charges begin running module → bus → platform.
 *
 * Paths are drawn with stroke-dashoffset, measured per path with
 * getTotalLength so the rate is identical whatever the length — a fixed
 * dash value makes short runs snap and long ones crawl.
 *
 * The charges loop forever and are deliberately kept on their own timeline:
 * an infinitely repeating child leaves a timeline with no finite duration,
 * which silently breaks `toggleActions: "...reverse"` on the entrance.
 */
export function useOnePlatformAnimation(refs: OnePlatformAnimationRefs) {
  const { sectionRef, headingRef, copyRef, fieldRef } = refs;

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const reduced = prefersReduced();
      animeWordsOnEnter(
        headingRef.current,
        section,
        "top 80%",
        reduced ? 0 : HEADLINE_DELAY,
      );
      if (copyRef.current) revealOnce(copyRef.current, section, { delay: 0.15 });
      if (reduced || !fieldRef.current) return;

      const container = fieldRef.current;
      const q = <T extends Element>(sel: string) =>
        Array.from(container.querySelectorAll<T>(sel));

      const traces = q<SVGPathElement>(".hp-map-trace");
      const modules = q<SVGGElement>(".hp-map-module");
      
      const platform = container.querySelector(".hp-map-slab");
      const foundation = q<SVGGElement>(".hp-map-foundation g");
      const bands = q<SVGElement>(".hp-map-band, .hp-map-band-label");
      const charges = q<SVGCircleElement>(".hp-map-charge");
      if (!traces.length) return;

      // Per-path dash, so every run draws at the same speed.
      traces.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });
      gsap.set([modules, foundation, bands], { opacity: 0 });
      gsap.set(platform, { opacity: 0 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: container,
            start: "top 74%",
            toggleActions: "play none none reverse",
          },
        })
        .to(modules, { opacity: 1, duration: 0.45, stagger: 0.07 })
        .to(
          traces,
          { strokeDashoffset: 0, duration: 0.7, stagger: 0.05, ease: "power2.inOut" },
          "-=0.2",
        )
        .to(bands, { opacity: 1, duration: 0.4 }, "-=0.6")
        .to(platform, { opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.35")
        .to(foundation, { opacity: 1, duration: 0.4, stagger: 0.08 }, "-=0.2");

      // ── Hover ──
      // Pointing at an application lights its run and pulses the record it
      // writes to. The trace highlight is a class rather than a tween so it
      // can never fight the draw-in animation for the same property.
      const recordName = container.querySelector(".hp-map-record .is-name");
      modules.forEach((mod) => {
        const label = mod.dataset.label;
        const run = container.querySelector<SVGPathElement>(
          `.hp-map-trace[data-label="${label}"]`,
        );
        if (!run) return;
        mod.addEventListener("mouseenter", () => {
          run.classList.add("is-live");
          if (recordName) {
            gsap.fromTo(
              recordName,
              { fill: "#ffffff" },
              { fill: "#7fe3ff", duration: 0.28, yoyo: true, repeat: 1 },
            );
          }
        });
        mod.addEventListener("mouseleave", () => run.classList.remove("is-live"));
      });

      // ── Traffic ──
      // Each module sends a charge down its own drop, along the bus and
      // into the platform. Staggered starts and unequal periods, so they
      // never fall into a pattern.
      const drops = traces.slice(0, charges.length);
      charges.forEach((c, i) => {
        const drop = drops[i];
        if (!drop) return;
        gsap
          .timeline({ repeat: -1, repeatDelay: 1.6 + (i % 4) * 0.9, delay: 1.4 + i * 0.5 })
          .set(c, { opacity: 0 })
          .to(c, { opacity: 1, duration: 0.2 })
          .to(
            c,
            {
              motionPath: { path: drop, align: drop, alignOrigin: [0.5, 0.5] },
              duration: 0.9,
              ease: "power1.in",
            },
            "<",
          )
          .to(c, { opacity: 0, duration: 0.25 }, ">-0.1");
      });
    },
    { scope: sectionRef },
  );
}
