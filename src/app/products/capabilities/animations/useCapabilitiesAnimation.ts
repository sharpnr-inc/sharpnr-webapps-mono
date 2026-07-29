import type { RefObject } from "react";
import { gsap, useGSAP } from "@/configs/gsap";
import { prefersReduced, revealOnce } from "@/app/home/shared/motion";
import { animeWordsOnEnter } from "@/app/home/shared/reveal";

interface CapabilitiesAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  eyebrowRef: RefObject<HTMLParagraphElement | null>;
  headingRef: RefObject<HTMLHeadingElement | null>;
  copyRef: RefObject<HTMLParagraphElement | null>;
  listRef: RefObject<HTMLDivElement | null>;
}

/**
 * The capabilities arriving one group at a time.
 *
 * Each group gets its own trigger rather than one long stagger down the
 * page: with nine of them, a single timeline would either race ahead of
 * the reader or still be playing three screens later. Reversible, per
 * Motion Language v3.1 — scrolling back up puts the page back the way it
 * was found.
 *
 * The two halves of a group (the capability and its products) arrive a
 * beat apart, so the group reads as a heading with a list under it rather
 * than as one block appearing.
 *
 * Only `.hp-cap-part` is ever animated. The marks inside are `motion`
 * hover variants on their own elements, so GSAP and motion never write
 * transform or opacity to the same node.
 */
export function useCapabilitiesAnimation(refs: CapabilitiesAnimationRefs) {
  const { sectionRef, eyebrowRef, headingRef, copyRef, listRef } = refs;

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      animeWordsOnEnter(headingRef.current, section);
      if (eyebrowRef.current) revealOnce(eyebrowRef.current, section);
      if (copyRef.current) revealOnce(copyRef.current, section, { delay: 0.15 });

      if (prefersReduced() || !listRef.current) return;

      const groups = Array.from(
        listRef.current.querySelectorAll<HTMLElement>(".hp-cap-group"),
      );

      groups.forEach((group) => {
        const parts = Array.from(
          group.querySelectorAll<HTMLElement>(".hp-cap-part"),
        );
        if (!parts.length) return;

        gsap
          .timeline({
            scrollTrigger: {
              trigger: group,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          })
          .from(parts, {
            opacity: 0,
            y: 18,
            duration: 0.55,
            ease: "power2.out",
            stagger: 0.1,
          });
      });
    },
    { scope: sectionRef },
  );
}
