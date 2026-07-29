import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";
import { EASE, T } from "@/app/home/shared/choreography";
import { prefersReduced } from "@/app/home/shared/motion";

interface JoinAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  contentRef: RefObject<HTMLDivElement | null>;
}

/**
 * A warm, complete ending — still growing, already connected.
 *
 * The four invitations used to arrive as a single block, because they sit
 * inside one grid and the section staggered `contentRef.children` — so a
 * stagger of four things moved one thing. They now open outward from the
 * middle of the grid, which is where the centred heading above has just
 * left the eye, and it is the only entrance on the About page that spreads
 * from a centre rather than travelling one way.
 *
 * It arrives once and stops. This is the page's ending, and repeating
 * anything here would suggest the story is still running when the point is
 * that it has arrived (design.md §8).
 */
export function useJoinAnimation(refs: JoinAnimationRefs) {
  const { sectionRef, contentRef } = refs;

  useGSAP(
    () => {
      if (prefersReduced()) return;

      const section = sectionRef.current;
      const content = contentRef.current;
      if (!section || !content) return;

      const kids = Array.from(content.children);
      /* The invitations grid — the only child with more than one thing
         in it, and the reason the old blanket stagger did nothing. */
      const grid = content.querySelector(".grid");
      const before = kids.slice(0, kids.indexOf(grid as Element));
      const after = kids.slice(kids.indexOf(grid as Element) + 1);

      gsap
        .timeline({
          defaults: { ease: EASE.in, duration: T.base },
          scrollTrigger: { trigger: section, start: "top 72%", once: true },
        })
        .from(before, { opacity: 0, y: 20, stagger: 0.1 })
        .from(
          grid ? Array.from(grid.children) : [],
          {
            opacity: 0,
            y: 16,
            stagger: { each: 0.08, from: "center" },
          },
          0.35,
        )
        .from(after, { opacity: 0, y: 14, stagger: 0.12 }, 0.7);
    },
    { scope: sectionRef },
  );
}
