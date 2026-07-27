import type { RefObject } from "react";
import { useRef } from "react";
import { gsap, useGSAP } from "@/configs/gsap";
import { prefersReduced, revealOnce } from "@/app/home/shared/motion";
import { animeWordsOnEnter } from "@/app/home/shared/reveal";

interface IndustriesAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  headingRef: RefObject<HTMLHeadingElement | null>;
  copyRef: RefObject<HTMLParagraphElement | null>;
  /** The trade layer — the only thing that morphs. */
  layerRef: RefObject<HTMLDivElement | null>;
  /** The foundation. Revealed once on scroll, then never touched again. */
  baseRef: RefObject<HTMLDivElement | null>;
  /** The backplane. Revealed once, then never animated again. */
  busRef: RefObject<HTMLDivElement | null>;
  activeIndex: number;
}

/**
 * One moving part, and no others.
 *
 * Exactly one: the industry layer morphs when the trade changes.
 *
 * The foundation is deliberately excluded from every tween after its
 * initial reveal. Animating it — even a flicker — would undercut the one
 * claim this scene exists to make: every business runs on the same
 * platform, and choosing a different trade does not disturb it.
 */
export function useIndustriesAnimation(refs: IndustriesAnimationRefs) {
  const { sectionRef, headingRef, copyRef, layerRef, baseRef, busRef, activeIndex } = refs;
  const mounted = useRef(false);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      animeWordsOnEnter(headingRef.current, section);
      if (copyRef.current) revealOnce(copyRef.current, section, { delay: 0.15 });
      if (prefersReduced()) return;

      const bus = busRef.current;

      if (bus) {
        gsap.from(bus, {
          scaleX: 0.9,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: bus, start: "top 88%", toggleActions: "play none none reverse" },
        });
      }
      if (baseRef.current) {
        gsap.from(baseRef.current.children, {
          opacity: 0,
          y: 10,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.05,
          scrollTrigger: { trigger: baseRef.current, start: "top 92%", toggleActions: "play none none reverse" },
        });
      }
      if (layerRef.current) {
        gsap.from(layerRef.current.children, {
          opacity: 0,
          y: 10,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.06,
          scrollTrigger: { trigger: layerRef.current, start: "top 92%", toggleActions: "play none none reverse" },
        });
      }

      // One charge crossing the bus on a slow ambient loop. The bus and
      // the foundation never move; only this travels, so the platform
      // reads as live without anything shifting position.
      const pulse = bus?.querySelector<HTMLElement>(".hp-ind-pulse");
      if (pulse && bus) {
        gsap.set(pulse, { opacity: 0, x: -30 });
        gsap
          .timeline({ repeat: -1, repeatDelay: 3.2, delay: 1.4 })
          .set(pulse, { x: -30 })
          .to(pulse, { opacity: 1, duration: 0.5 })
          .to(pulse, { x: bus.clientWidth, duration: 4.6, ease: "none" }, "<")
          .to(pulse, { opacity: 0, duration: 0.5 }, ">-0.5");
      }
    },
    { scope: sectionRef },
  );

  useGSAP(
    () => {
      // The trade layer morphs; nothing else is touched.
      if (!layerRef.current) return;
      if (!mounted.current) {
        mounted.current = true;
        return;
      }
      if (prefersReduced()) return;

      // Morph rather than fade: a blur-out/in on a stagger reads as one
      // set of modules becoming another, where a plain fade reads as two
      // unrelated lists swapping places.
      gsap.fromTo(
        layerRef.current.children,
        { opacity: 0, y: 10, filter: "blur(3px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.45,
          ease: "power2.out",
          stagger: 0.06,
        },
      );

      // Send a charge across the bus too — the same platform visibly
      // powering the trade that just replaced the last one.
      const bus = busRef.current;
      const pulse = bus?.querySelector<HTMLElement>(".hp-ind-pulse");
      if (pulse && bus) {
        gsap.killTweensOf(pulse);
        gsap
          .timeline()
          .set(pulse, { x: -30, opacity: 0 })
          .to(pulse, { opacity: 1, duration: 0.3 })
          .to(pulse, { x: bus.clientWidth, duration: 2.4, ease: "power1.out" }, "<")
          .to(pulse, { opacity: 0, duration: 0.3 }, ">-0.3");
      }
    },
    { dependencies: [activeIndex], scope: sectionRef },
  );
}
