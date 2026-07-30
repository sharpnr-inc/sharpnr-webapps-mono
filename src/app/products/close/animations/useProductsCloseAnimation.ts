import type { RefObject } from "react";
import { gsap, useGSAP } from "@/configs/gsap";
import { EASE, T } from "@/app/home/shared/choreography";
import { prefersReduced } from "@/app/home/shared/motion";
import { animeWordsOnEnter } from "@/app/home/shared/reveal";

interface ProductsCloseAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  headingRef: RefObject<HTMLHeadingElement | null>;
  copyRef: RefObject<HTMLParagraphElement | null>;
  ctaRef: RefObject<HTMLDivElement | null>;
  trustRef: RefObject<HTMLParagraphElement | null>;
}

/**
 * "Start with one. Grow into the rest." — performed, then stopped.
 *
 * Everything used to file upward in a 24px stagger, which is the page's
 * default arrival and says nothing about what this section claims. The
 * shape now is the sentence:
 *
 *   the headline   its words, as everywhere on the site
 *   the sentence   fades, no travel — it is framing, not a step
 *   Get Started    arrives on its own, the one thing you start with
 *   Documentation  extends out of it, sideways, into the space beside it
 *   the note       fades last
 *
 * The growth is horizontal and one-directional: the second action comes
 * out from behind the first rather than queueing under it. That is the
 * only rightward extension on the page — Capabilities alternates inward
 * from both edges, Foundation runs downward — so the three cannot be
 * swapped for each other.
 *
 * It plays **once** and never repeats. Motion elsewhere on this site
 * means work happening; a close that loops says the story is still
 * running, when the point of a close is that it has arrived.
 *
 * ── Why `clearProps` on the actions ─────────────────────────────────────
 *
 * `Button` carries `transition-[transform,…]` and
 * `motion-safe:hover:-translate-y-0.5` — its hover lift is a CSS
 * transform on the same element. GSAP writes `transform` inline, and
 * inline beats a utility class, so a finished tween left
 * `translate(0px, 0px)` sitting on both buttons and the hover lift never
 * fired again. Clearing the property at the end of the tween hands the
 * transform back to CSS.
 */
export function useProductsCloseAnimation(refs: ProductsCloseAnimationRefs) {
  const { sectionRef, headingRef, copyRef, ctaRef, trustRef } = refs;

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      animeWordsOnEnter(headingRef.current, section);

      /* Everything below is a `from` off the resting state and this
         guard sits above all of it, so reduced motion leaves the whole
         section exactly as it renders. */
      if (prefersReduced()) return;

      const tl = gsap.timeline({
        defaults: { ease: EASE.in, duration: T.base },
        scrollTrigger: { trigger: section, start: "top 78%", once: true },
      });

      if (copyRef.current) {
        tl.from(copyRef.current, { opacity: 0 }, 0.34);
      }

      const actions = ctaRef.current
        ? Array.from(ctaRef.current.children)
        : [];

      /* The row is a column below `sm`, and "out to the side" has no
         side there — it would also be 20px of sideways travel inside a
         24px gutter. Stacked, the second action simply follows. */
      const sideBySide =
        typeof window !== "undefined" &&
        window.matchMedia("(min-width: 640px)").matches;

      if (actions[0]) {
        tl.from(
          actions[0],
          { opacity: 0, y: 14, clearProps: "transform" },
          0.52,
        );
      }
      if (actions[1]) {
        tl.from(
          actions[1],
          sideBySide
            ? { opacity: 0, x: -20, clearProps: "transform" }
            : { opacity: 0, y: 14, clearProps: "transform" },
          0.74,
        );
      }

      if (trustRef.current) {
        tl.from(trustRef.current, { opacity: 0, duration: T.slow }, 0.96);
      }
    },
    { scope: sectionRef },
  );
}
