import type { RefObject } from "react";
import { gsap, useGSAP } from "@/configs/gsap";
import { prefersReduced, revealOnce } from "@/app/home/shared/motion";
import { animeWordsOnEnter } from "@/app/home/shared/reveal";

interface ChaosAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  headingRef: RefObject<HTMLHeadingElement | null>;
  copyRef: RefObject<HTMLParagraphElement | null>;
  fieldRef: RefObject<HTMLDivElement | null>;
}

/**
 * The board that never completes a circuit. Reversible entrance.
 *
 * Parts and traces fade in once on scroll and reverse on scroll-up. After
 * that, charges set out along each severed run and die at the break —
 * never arriving, never looping in unison. It is deliberately the same
 * mechanic as Scene 03's journeys, failing: there the charge crosses the
 * board and lands, here it stops at a gap and gives up.
 */
export function useChaosAnimation(refs: ChaosAnimationRefs) {
  const { sectionRef, headingRef, copyRef, fieldRef } = refs;

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      animeWordsOnEnter(headingRef.current, section);
      if (copyRef.current) revealOnce(copyRef.current, section, { delay: 0.15 });
      if (prefersReduced() || !fieldRef.current) return;

      const field = fieldRef.current;
      const parts = Array.from(field.querySelectorAll<HTMLElement>(".hp-frag-part"));
      const traces = Array.from(field.querySelectorAll<HTMLElement>(".hp-frag-trace"));
      const breaks = Array.from(field.querySelectorAll<HTMLElement>(".hp-frag-break"));
      const errs = Array.from(field.querySelectorAll<HTMLElement>(".hp-frag-err"));
      const pulses = Array.from(field.querySelectorAll<HTMLElement>(".hp-frag-pulse"));

      gsap.set(pulses, { opacity: 0 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: field,
            start: "top 74%",
            toggleActions: "play none none reverse",
          },
        })
        .from(parts, { opacity: 0, y: 14, duration: 0.55, ease: "power2.out", stagger: 0.08 })
        .from(traces, { opacity: 0, duration: 0.4, ease: "power1.out", stagger: 0.04 }, "-=0.3")
        .from(breaks, { opacity: 0, scale: 0, duration: 0.3, ease: "back.out(2)", stagger: 0.03 }, "-=0.25")
        // The errors arrive last — the break registers before it is named.
        .from(errs, { opacity: 0, duration: 0.5, ease: "power1.out", stagger: 0.05 }, "-=0.1");

      // Each run tries on its own schedule and fails on its own schedule.
      // Never synchronised: coordinated failure would read as choreography,
      // and the point is that nothing here is coordinated at all.
      pulses.forEach((pulse, i) => {
        const horizontal = pulse.dataset.dir === "h";
        const axis = horizontal ? "x" : "y";
        const travel = (Number(pulse.dataset.travel ?? 0) / 100) *
          (horizontal ? field.clientWidth : field.clientHeight);

        gsap
          .timeline({
            repeat: -1,
            repeatDelay: 2.4 + ((i * 7) % 5) * 0.8,
            delay: 1.2 + ((i * 3) % 7) * 0.7,
          })
          .set(pulse, { [axis]: 0, opacity: 0 })
          .to(pulse, { opacity: 1, duration: 0.35 })
          .to(pulse, { [axis]: travel, duration: 1.1, ease: "power1.out" }, "<")
          // Dies at the gap rather than fading politely — it hit something.
          .to(pulse, { opacity: 0, duration: 0.18, ease: "power2.in" });
      });
      // No parallax here on purpose: translating the visual while the
      // text column stays put pulls the two out of alignment as you
      // scroll, and this scene reads as a pair that must sit level.
    },
    { scope: sectionRef },
  );
}
