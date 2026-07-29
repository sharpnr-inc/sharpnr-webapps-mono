import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";
import { EASE, T } from "@/app/home/shared/choreography";
import { prefersReduced } from "@/app/home/shared/motion";
import { drawRule, enterIntro } from "@/app/shared/animations/sectionMotion";

interface LibraryAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  introRef: RefObject<HTMLDivElement | null>;
}

/**
 * Shelves appear like pages being added to a library.
 *
 * Which finally means something: the shelf is the hairline across the top
 * of each collection, so the rule is drawn left to right first and the
 * text then settles *down* onto it. Everything in this section moves
 * downward — the opening drops onto its own sentence, the collections drop
 * onto their rules. Intents above runs sideways and Series below arrives
 * face-on without travelling at all, so the three sections in the middle
 * of this page each move on a different axis.
 *
 * A `border-t` cannot be scaled on its own, so the shelf is uncovered from
 * the left instead — `drawRule` handles the fromTo and clears the clip
 * afterwards, so nothing is left clipped.
 */
export function useLibraryAnimation(refs: LibraryAnimationRefs) {
  const { sectionRef, introRef } = refs;

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      enterIntro(introRef.current, section, "drop", { start: "top 72%" });

      if (prefersReduced()) return;

      const shelves = gsap.utils.toArray<HTMLElement>(
        ".library-shelf",
        section,
      );
      if (!shelves.length) return;

      const tl = gsap.timeline({
        defaults: { ease: EASE.in, duration: T.base },
        scrollTrigger: { trigger: shelves[0], start: "top 82%", once: true },
      });

      /* The rules ruled up, then what sits on them. Only the collections
         get the draw — the honesty note at the end is a bordered panel,
         not a shelf, so it simply arrives. */
      const ruled = shelves.filter((s) => s.classList.contains("pt-5"));
      const panel = shelves.filter((s) => !s.classList.contains("pt-5"));

      drawRule(tl, ruled, 0, { stagger: 0.06, duration: 0.55 });
      ruled.forEach((shelf, i) => {
        tl.from(
          Array.from(shelf.children),
          { opacity: 0, y: -14, stagger: 0.05, duration: T.quick },
          0.24 + i * 0.06,
        );
      });
      if (panel.length) {
        tl.from(panel, { opacity: 0, y: -14 }, 0.24 + ruled.length * 0.06);
      }
    },
    { scope: sectionRef },
  );
}
