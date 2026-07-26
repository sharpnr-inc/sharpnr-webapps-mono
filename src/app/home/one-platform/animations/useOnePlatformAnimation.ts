import type { RefObject } from "react";
import { gsap, useGSAP } from "@/configs/gsap";
import { prefersReduced, revealOnce } from "@/app/home/shared/motion";
import { animeWordsOnEnter } from "@/app/home/shared/reveal";

interface OnePlatformAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  headingRef: RefObject<HTMLHeadingElement | null>;
  copyRef: RefObject<HTMLParagraphElement | null>;
  lineRef: RefObject<HTMLParagraphElement | null>;
  groundRef: RefObject<HTMLDivElement | null>;
}

/**
 * The turn — the answer arrives whole.
 *
 * After a scene spent taking a sentence apart, this one does not assemble; it
 * is simply already correct. The line settles once, the floor draws itself
 * beneath it, and the mark rises onto that floor. Nothing loops. Stillness is
 * precisely what the previous scene was missing.
 */
export function useOnePlatformAnimation(refs: OnePlatformAnimationRefs) {
  const { sectionRef, headingRef, copyRef, lineRef, groundRef } = refs;

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      animeWordsOnEnter(headingRef.current, section);
      if (copyRef.current) revealOnce(copyRef.current, section, { delay: 0.15 });
      if (prefersReduced()) return;

      const rule = groundRef.current?.querySelector(".hp-ground-rule");
      const mark = groundRef.current?.querySelector(".hp-wordmark");

      gsap
        .timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: section, start: "top 66%", once: true },
        })
        .from(lineRef.current, { opacity: 0, y: 22, duration: 0.85 }, 0.15)
        .from(rule ?? {}, { scaleX: 0, duration: 1.1, ease: "power2.inOut" }, "-=0.3")
        .from(mark ?? {}, { opacity: 0, y: 14, duration: 0.75 }, "-=0.45");
    },
    { scope: sectionRef },
  );
}
