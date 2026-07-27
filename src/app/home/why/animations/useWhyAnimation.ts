import type { RefObject } from "react";
import { gsap, useGSAP } from "@/configs/gsap";
import { prefersReduced, revealOnce } from "@/app/home/shared/motion";
import { animeWordsOnEnter } from "@/app/home/shared/reveal";

interface WhyAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  headingRef: RefObject<HTMLHeadingElement | null>;
  copyRef: RefObject<HTMLParagraphElement | null>;
  listRef: RefObject<HTMLDivElement | null>;
}

/**
 * The datasheet writes itself. Reversible.
 *
 * Each rule draws left to right, and its row settles just behind it — the
 * order matters, because a rule arriving first reads as the sheet being
 * ruled up before it is filled in. Everything fading together would read
 * as four items appearing, which is the card-grid impression this scene
 * exists to avoid.
 */
export function useWhyAnimation(refs: WhyAnimationRefs) {
  const { sectionRef, headingRef, copyRef, listRef } = refs;

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      animeWordsOnEnter(headingRef.current, section);
      if (copyRef.current) revealOnce(copyRef.current, section, { delay: 0.15 });
      if (prefersReduced() || !listRef.current) return;

      const list = listRef.current;
      const rules = Array.from(list.querySelectorAll<HTMLElement>(".hp-spec-rule"));
      const rows = Array.from(list.querySelectorAll<HTMLElement>(".hp-spec-row > .grid"));

      gsap
        .timeline({
          scrollTrigger: {
            trigger: list,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        })
        .from(rules, {
          scaleX: 0,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.14,
        })
        .from(
          rows,
          { opacity: 0, y: 10, duration: 0.5, ease: "power2.out", stagger: 0.14 },
          0.18,
        );
    },
    { scope: sectionRef },
  );
}
