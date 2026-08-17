import type { RefObject } from "react";
import { gsap, useGSAP, DrawSVGPlugin } from "@/configs/gsap";
import { prefersReduced } from "@/app/home/shared/motion";
import { EASE, T, armWords, revealWords } from "@/app/home/shared/choreography";

interface PlatformHeroAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  eyebrowRef: RefObject<HTMLParagraphElement | null>;
  copyRef: RefObject<HTMLParagraphElement | null>;
  figureRef: RefObject<HTMLDivElement | null>;
}

/*
 * The same opening beat as the homepage hero, so a visitor arriving on
 * /platform recognises it as the same site rather than a second product:
 *
 *   0.15  The Business Platform,
 *   0.45  Built for Everything.
 *   0.90  the sentence
 *   1.10  the weave — records first, then the areas that cross them
 *
 * The 1.15 beat that belonged to two buttons is gone with them, and the
 * figure takes it rather than waiting through a pause for something that
 * is no longer there. Same substitution the Industries hero made.
 *
 * ── Motion follows the topology (design.md §6) ──────────────────────
 * The records draw downward first, because they are what the areas cross;
 * the areas then draw across them; the junctions land where the two meet;
 * and one charge runs Sales → the order record → Billing, which is the
 * only claim the figure makes that a still frame cannot. It plays once. A
 * hero that loops says the story is still running.
 *
 * The word reveal itself lives in choreography.ts — timing shared with
 * every other heading on the site so the pages cannot drift apart.
 */
const AT = {
  line1: 0.15,
  line2: 0.45,
  copy: 0.9,
  figure: 1.1,
} as const;

/* The charge's route, in the weave's own viewBox units. Sales is the top
   run, ORDER the second record down, Billing the third run — so the fact
   entered at the left of Sales turns down the order it belongs to and
   carries on along Billing without anyone typing it again. */
const ROUTE = { startX: 160, salesY: 92, orderX: 392, billingY: 168, endX: 784 };

export function usePlatformHeroAnimation(refs: PlatformHeroAnimationRefs) {
  const { sectionRef, eyebrowRef, copyRef, figureRef } = refs;

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const line1 = section.querySelector(".phero-line-1");
      const line2 = section.querySelector(".phero-line-2");

      // Reduced motion: the finished frame, immediately.
      if (prefersReduced()) {
        gsap.set(gsap.utils.toArray(".hp-word", section), { opacity: 1 });
        return;
      }

      armWords(line1);
      armWords(line2);
      revealWords(line1, AT.line1);
      revealWords(line2, AT.line2);

      gsap
        .timeline({ defaults: { ease: EASE.in, duration: T.base } })
        .from(eyebrowRef.current, { opacity: 0, y: 10 }, 0)
        .from(copyRef.current, { opacity: 0, y: 16 }, AT.copy);

      const figure = figureRef.current;
      if (!figure) return;

      /* Both renderings are always in the DOM and CSS lays out one of
         them, so both are armed. The stacked list carries none of the
         drawing's hooks — it gets the one move that suits a list, and the
         figure's timeline runs against a display:none subtree on a phone,
         which costs nothing and leaves it correct if the viewport is
         widened. */
      const rows = Array.from(figure.querySelectorAll<HTMLElement>("li"));
      if (rows.length) {
        gsap.from(rows, {
          opacity: 0,
          y: 10,
          duration: T.quick,
          stagger: 0.05,
          ease: EASE.in,
          delay: AT.figure,
        });
      }

      const tl = gsap
        .timeline({ delay: AT.figure })
        .from(".plw-col-name", {
          opacity: 0,
          y: -6,
          duration: T.quick,
          stagger: 0.06,
          ease: EASE.in,
        })
        .fromTo(
          ".plw-col-run",
          { drawSVG: "0% 0%" },
          {
            drawSVG: "0% 100%",
            duration: T.base,
            stagger: 0.06,
            ease: EASE.draw,
          },
          "-=0.2",
        )
        .from(
          ".plw-row-name",
          {
            opacity: 0,
            x: -8,
            duration: T.quick,
            stagger: 0.05,
            ease: EASE.in,
          },
          "-=0.35",
        )
        .fromTo(
          ".plw-run",
          { drawSVG: "0% 0%" },
          {
            drawSVG: "0% 100%",
            duration: T.base,
            stagger: 0.05,
            ease: EASE.draw,
          },
          "-=0.4",
        )
        .from(
          ".plw-node",
          { opacity: 0, duration: T.quick, stagger: 0.02, ease: EASE.in },
          "-=0.3",
        )
        .from(".plw-note", { opacity: 0, duration: T.quick }, "-=0.2");

      /* One fact, entered once, arriving somewhere nobody typed it.
         Straight tweens on the two coordinates rather than a motion path:
         the route is three orthogonal segments, and three tweens describe
         it exactly with nothing to measure. */
      tl.set(".plw-charge", { opacity: 1 }, ">-0.1")
        .to(".plw-charge", {
          attr: { cx: ROUTE.orderX },
          duration: 0.45,
          ease: "none",
        })
        .to(".plw-charge", {
          attr: { cy: ROUTE.billingY },
          duration: 0.3,
          ease: "none",
        })
        .to(".plw-charge", {
          attr: { cx: ROUTE.endX },
          duration: 0.5,
          ease: "none",
        })
        .to(".plw-charge", { opacity: 0, duration: 0.25 }, "-=0.2");

      /* The circle starts where the route starts; setting it explicitly
         keeps the markup and the timeline from drifting apart. */
      gsap.set(".plw-charge", { attr: { cx: ROUTE.startX, cy: ROUTE.salesY } });
    },
    { scope: sectionRef },
  );

  void DrawSVGPlugin;
}
