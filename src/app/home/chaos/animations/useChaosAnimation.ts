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
 * Seven blocks, arriving once, then adrift forever. Reversible entrance.
 *
 * The wrapper (`.hp-block`) is the reversible, scroll-triggered entrance —
 * fade and rise, once, reversed if the visitor scrolls back above the
 * section. The block itself (`.hp-island`, nested inside) runs an
 * independent, uncoordinated GSAP yoyo — a few px of vertical drift, its
 * own duration per block — that never stops and never touches the
 * scroll-triggered timeline, so the two can never fight over `y`.
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

      const wraps = Array.from(
        fieldRef.current.querySelectorAll<HTMLElement>(".hp-block"),
      );
      const islands = Array.from(
        fieldRef.current.querySelectorAll<HTMLElement>(".hp-island"),
      );
      if (!wraps.length) return;

      gsap.from(wraps, {
        opacity: 0,
        y: 22,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: fieldRef.current,
          start: "top 74%",
          toggleActions: "play none none reverse",
        },
      });

      // Independent of scroll state on purpose — a handful of px, never
      // synchronised, so the field reads as unmanaged rather than staged.
      islands.forEach((island, i) => {
        gsap.to(island, {
          y: -4,
          duration: 1.7 + ((i * 3) % 5) * 0.22,
          delay: ((i * 7) % 5) * 0.18,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });
    },
    { scope: sectionRef },
  );
}
