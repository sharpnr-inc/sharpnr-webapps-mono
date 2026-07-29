import type { RefObject } from "react";
import { gsap, useGSAP } from "@/configs/gsap";
import { EASE, T, armDraw } from "@/app/home/shared/choreography";
import { prefersReduced } from "@/app/home/shared/motion";
import { animeWordsOnEnter } from "@/app/home/shared/reveal";

interface FoundationAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  eyebrowRef: RefObject<HTMLParagraphElement | null>;
  headingRef: RefObject<HTMLHeadingElement | null>;
  copyRef: RefObject<HTMLParagraphElement | null>;
  figureRef: RefObject<HTMLDivElement | null>;
}

/**
 * Everything settling onto one base.
 *
 * ── The opening: the two halves close on the heading ────────────────────
 *
 * The label used to rise from below with everything else. It descends
 * from above now and the sentence rises from below, so the framing closes
 * on the headline between them — the same move the Platform close is
 * built on, and the only opening on this page that travels on both
 * directions of one axis. It is the section's claim in miniature: two
 * things meeting on a third.
 *
 * ── The figure: down, then under ────────────────────────────────────────
 *
 * Nothing here rises. The order and the direction are the argument:
 *
 *   modules      descend into place from above, left to right
 *   drops        draw downward out of each module
 *   the bus      draws across, connecting what has landed
 *   the riser    draws downward again, into the space below it
 *   the slab     spreads outward from where the riser meets it, under
 *                everything already standing there
 *   the four     print onto the slab once it is there
 *
 * The slab is the last thing to exist and the only thing that grows
 * horizontally, because "everything above stands on the same foundation"
 * is a claim about what is underneath, not about what is added. A stagger
 * upward would have said the opposite. It spreads rather than fades
 * because a fade is a picture appearing; a base extending edge to edge
 * from the single point of contact is the sentence.
 *
 * `svgOrigin` is measured off the slab's own bounding box rather than
 * written in user units, so the drawing can be recomposed without the
 * spread silently starting from the wrong place.
 *
 * Dashes are measured per path with `armDraw`, so a 38-unit drop and the
 * 576-unit bus draw at the same rate — one hardcoded dash makes short
 * runs snap and long ones crawl.
 *
 * Plays once. The stroke hovers in `index.css` are written entirely in
 * stroke-opacity / stroke-width / fill, so nothing below collides with
 * them: GSAP owns `opacity` and `transform` here, CSS owns the rest.
 */
export function useFoundationAnimation(refs: FoundationAnimationRefs) {
  const { sectionRef, eyebrowRef, headingRef, copyRef, figureRef } = refs;

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      animeWordsOnEnter(headingRef.current, section);

      /* Every `set` below is behind this. A section parked at opacity 0
         waiting for a trigger that never fires is permanently invisible
         for anyone who has asked for less motion. */
      if (prefersReduced()) return;

      const opening = gsap.timeline({
        defaults: { ease: EASE.in, duration: T.base },
        scrollTrigger: { trigger: section, start: "top 78%", once: true },
      });
      if (eyebrowRef.current) {
        opening.from(eyebrowRef.current, { opacity: 0, y: -18 }, 0);
      }
      if (copyRef.current) {
        opening.from(copyRef.current, { opacity: 0, y: 18 }, 0.22);
      }

      const figure = figureRef.current;
      if (!figure) return;

      const q = <E extends Element>(sel: string) =>
        Array.from(figure.querySelectorAll<E>(sel));

      const mods = q<SVGGElement>(".pf-mod");
      const drops = q<SVGPathElement>(".pf-drop");
      const bus = q<SVGPathElement>(".pf-bus");
      const riser = q<SVGPathElement>(".pf-riser");
      const slab = figure.querySelector<SVGGElement>(".pf-slab");
      const cells = q<SVGTextElement>(".pf-cell");
      if (!drops.length || !slab) return;

      armDraw([...drops, ...bus, ...riser]);
      gsap.set(mods, { opacity: 0, y: -10 });
      gsap.set(cells, { opacity: 0 });

      const box = slab.getBBox();
      gsap.set(slab, {
        opacity: 0,
        scaleX: 0,
        svgOrigin: `${box.x + box.width / 2} ${box.y + box.height / 2}`,
      });

      gsap
        .timeline({
          scrollTrigger: { trigger: figure, start: "top 78%", once: true },
        })
        .to(mods, {
          opacity: 1,
          y: 0,
          duration: T.base,
          ease: EASE.in,
          stagger: 0.045,
        })
        .to(
          drops,
          {
            strokeDashoffset: 0,
            duration: 0.55,
            stagger: 0.04,
            ease: EASE.draw,
          },
          "-=0.2",
        )
        .to(
          bus,
          { strokeDashoffset: 0, duration: T.draw, ease: EASE.draw },
          "-=0.25",
        )
        .to(
          riser,
          { strokeDashoffset: 0, duration: T.quick, ease: EASE.draw },
          "-=0.2",
        )
        .to(
          slab,
          { opacity: 1, scaleX: 1, duration: T.draw, ease: EASE.draw },
          "-=0.1",
        )
        .to(
          cells,
          { opacity: 1, duration: T.quick, ease: EASE.in, stagger: 0.07 },
          "-=0.3",
        );
    },
    { scope: sectionRef },
  );
}
