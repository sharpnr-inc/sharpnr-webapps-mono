import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";
import { EASE, T } from "@/app/home/shared/choreography";
import { prefersReduced } from "@/app/home/shared/motion";
import { enterIntro } from "@/app/shared/animations/sectionMotion";

interface SeriesAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  introRef: RefObject<HTMLDivElement | null>;
}

/**
 * Publications settle onto the shelf, one after another.
 *
 * These are covers, so they arrive face-on: they come forward out of the
 * page rather than up from under it or in from the side. Scale and opacity
 * only, no translation at all — which is the one arrival left on this page
 * after Intents took the horizontal and Library took the vertical, and it
 * is the right one for a card whose whole job is to be looked at squarely.
 *
 * The stagger runs across the grid rather than down the DOM, so a
 * three-column row fills the way the eye reads it.
 *
 * The cover diagrams inside are `motion` hover components. Nothing here
 * touches them — GSAP writes transform and opacity to the card, motion
 * writes to elements inside the SVG, and the two never meet on one node.
 */
export function useSeriesAnimation(refs: SeriesAnimationRefs) {
  const { sectionRef, introRef } = refs;

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      /* The headline alone, then its framing — this section's heading is
         the argument and the six cards below are the evidence. */
      enterIntro(introRef.current, section, "lead", { start: "top 72%" });

      if (prefersReduced()) return;

      const covers = gsap.utils.toArray<HTMLElement>(".series-cover", section);
      if (!covers.length) return;

      gsap.from(covers, {
        opacity: 0,
        scale: 0.94,
        transformOrigin: "center center",
        duration: T.base,
        ease: EASE.in,
        stagger: { each: 0.06, grid: "auto", from: "start" },
        scrollTrigger: { trigger: covers[0], start: "top 82%", once: true },
      });
    },
    { scope: sectionRef },
  );
}
