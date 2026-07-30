import type { RefObject } from "react";
import { gsap, useGSAP } from "@/configs/gsap";
import { EASE, T } from "@/app/home/shared/choreography";
import { prefersReduced } from "@/app/home/shared/motion";
import { animeWordsOnEnter } from "@/app/home/shared/reveal";
import { drawRule, isSplit } from "@/app/shared/animations/sectionMotion";

interface CapabilitiesAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  eyebrowRef: RefObject<HTMLParagraphElement | null>;
  headingRef: RefObject<HTMLHeadingElement | null>;
  copyRef: RefObject<HTMLParagraphElement | null>;
  listRef: RefObject<HTMLDivElement | null>;
}

/**
 * Nine capabilities, alternating.
 *
 * ── The opening: the statement stands on its own ────────────────────────
 *
 * The label and the sentence used to rise 24px behind the headline, which
 * is the same three-part upward file every other section on this page ran.
 * Here the headline IS the argument — "Independent when needed, Connected
 * by design" — so it arrives alone and the framing then *fades* in around
 * it without travelling at all. Nothing in this opening moves vertically
 * except the headline's own words. That is the section's claim performed:
 * one thing complete by itself, the rest attaching to it afterwards.
 *
 * (`sectionMotion`'s `lead` move is the same idea for pages built on
 * `SectionIntro`. This heading is pre-split into `.hp-word` spans, so the
 * words carry the arrival and tweening the `<h2>` block underneath them
 * would be two transforms nested on the same movement.)
 *
 * ── The groups: direction follows the layout ────────────────────────────
 *
 * Each group gets its own trigger rather than one long stagger down the
 * page: with nine of them, a single timeline would either race ahead of
 * the reader or still be playing three screens later.
 *
 * Two things alternate with the group's own left/right flip, so nine
 * repetitions never settle into a metronome:
 *
 *   the divider   draws from the outer edge the group leads with — left
 *                 to right on an unflipped group, right to left on a
 *                 flipped one. Mirroring the rule and clipping it from
 *                 its own left is what reverses it; a hairline is
 *                 symmetric, so the flip is invisible once it lands.
 *   the halves    enter from the outer edge of the column each lands in
 *                 and close on each other, rather than both sliding the
 *                 same way.
 *
 * Only `.hp-cap-part` and `.hp-cap-rule` are ever animated. The marks
 * inside are `motion` hover variants on their own elements, and the
 * product cards transition `colors` only, so GSAP and CSS never write
 * transform or opacity to the same node.
 */
export function useCapabilitiesAnimation(refs: CapabilitiesAnimationRefs) {
  const { sectionRef, eyebrowRef, headingRef, copyRef, listRef } = refs;

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      animeWordsOnEnter(headingRef.current, section);

      if (prefersReduced()) return;

      /* Fade only. Giving these a `y` would put them back in the same
         upward file the headline is deliberately arriving ahead of. */
      const framing = [eyebrowRef.current, copyRef.current].filter(
        (el): el is HTMLParagraphElement => Boolean(el),
      );
      if (framing.length) {
        gsap.from(framing, {
          opacity: 0,
          duration: T.base,
          ease: EASE.in,
          stagger: 0.12,
          delay: 0.36,
          scrollTrigger: { trigger: section, start: "top 78%", once: true },
        });
      }

      if (!listRef.current) return;

      const groups = Array.from(
        listRef.current.querySelectorAll<HTMLElement>(".hp-cap-group"),
      );
      const wide = isSplit();

      groups.forEach((group, i) => {
        const parts = Array.from(
          group.querySelectorAll<HTMLElement>(".hp-cap-part"),
        );
        if (!parts.length) return;

        /* Matches `flipped` in the section — group 0 puts the copy left
           and the products right, group 1 swaps them, and so on. */
        const flipped = i % 2 === 1;

        const tl = gsap.timeline({
          scrollTrigger: { trigger: group, start: "top 85%", once: true },
        });

        /* The divider above the group, ruled in the direction the group
           reads. `drawRule` always uncovers from the element's own left,
           so a flipped group is mirrored first and uncovers from the
           right — the transform is left in place afterwards because a
           1px rule looks identical either way round. */
        const rule = group.querySelector<HTMLElement>(".hp-cap-rule");
        if (rule) {
          gsap.set(rule, { scaleX: flipped ? -1 : 1 });
          drawRule(tl, [rule], 0);
        }

        tl.from(
          parts,
          /* Only where the group actually has two columns. Stacked,
             "the outer edge of its column" means nothing, and 32px
             sideways would push past the 24px page gutter and put a
             horizontal scrollbar on a phone. */
          wide
            ? {
                opacity: 0,
                /* parts[0] is always the capability copy, parts[1]
                   always the product cards — markup order never
                   changes, only the columns they land in. */
                x: (index: number) => {
                  const onLeft = flipped ? index === 1 : index === 0;
                  return onLeft ? -32 : 32;
                },
                duration: 0.7,
                ease: EASE.in,
                stagger: 0.1,
              }
            : {
                opacity: 0,
                y: 18,
                duration: T.base,
                ease: EASE.in,
                stagger: 0.1,
              },
          0.18,
        );
      });
    },
    { scope: sectionRef },
  );
}
