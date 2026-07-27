import type { RefObject } from "react";
import { gsap, useGSAP } from "@/configs/gsap";
import { prefersReduced, revealOnce } from "@/app/home/shared/motion";
import { animeWordsOnEnter } from "@/app/home/shared/reveal";

interface EcosystemAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  headingRef: RefObject<HTMLHeadingElement | null>;
  copyRef: RefObject<HTMLParagraphElement | null>;
  fieldRef: RefObject<HTMLDivElement | null>;
}

/**
 * One highlight, sweeping through five capability chips. Reversible.
 *
 * The moment the section is seen: the chips rise into place, then a single
 * highlight visits each one in turn — active turquoise, briefly, before
 * settling. It runs once, top to bottom, and never loops. Each chip also
 * drifts at its own rate as the section scrolls past (a different
 * sub-property, scrubbed, to the entrance's own `y` — the two combine
 * instead of competing). Scrolling back up above the section reverses the
 * whole sequence, same as every sibling scene.
 */
export function useEcosystemAnimation(refs: EcosystemAnimationRefs) {
  const { sectionRef, headingRef, copyRef, fieldRef } = refs;

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      animeWordsOnEnter(headingRef.current, section);
      if (copyRef.current) revealOnce(copyRef.current, section, { delay: 0.15 });
      if (prefersReduced() || !fieldRef.current) return;

      const wraps = Array.from(fieldRef.current.querySelectorAll<HTMLElement>(".hp-block"));
      const chips = Array.from(fieldRef.current.querySelectorAll<HTMLElement>(".hp-icon-chip"));
      if (!wraps.length) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: fieldRef.current,
          start: "top 74%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(wraps, { opacity: 0, y: 16, duration: 0.5, ease: "power2.out", stagger: 0.08 });

      chips.forEach((chip) => {
        tl.to(chip, {
          borderColor: "var(--color-cyan)",
          backgroundColor: "rgba(0, 180, 216, 0.1)",
          color: "#00b4d8",
          duration: 0.32,
          ease: "power2.out",
        }).to(
          chip,
          {
            borderColor: "rgba(144, 224, 239, 0.4)",
            backgroundColor: "rgba(144, 224, 239, 0.06)",
            color: "rgba(255,255,255,0.85)",
            duration: 0.4,
            ease: "power2.inOut",
          },
          ">-0.04",
        );
      });

      // Depth layering: each chip drifts at its own rate with scroll.
      wraps.forEach((wrap, i) => {
        gsap.to(wrap, {
          yPercent: -(8 + ((i * 9) % 14)),
          ease: "none",
          scrollTrigger: {
            trigger: fieldRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    },
    { scope: sectionRef },
  );
}
