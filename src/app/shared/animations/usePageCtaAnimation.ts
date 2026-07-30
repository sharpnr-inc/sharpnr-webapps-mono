import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";
import { EASE, T } from "@/app/home/shared/choreography";
import { prefersReduced } from "@/app/home/shared/motion";

interface PageCtaAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  contentRef: RefObject<HTMLDivElement | null>;
}

/**
 * The page ending. It arrives once, and then it stops.
 *
 * This used to be one blanket stagger down `contentRef.children` — the
 * same tween, in the same direction, that the eyebrow, heading, copy,
 * buttons and trust note each got on every other section of every other
 * page. Now the parts arrive in the order the ending is read, and the
 * *heading leads*: everything else settles around a statement that is
 * already on screen, rather than five rows queueing up behind each other.
 *
 * Deliberately identical on Services and Resources. It is one component
 * and one moment — the site's ending card — and giving two instances of
 * the same card two different entrances would be variety for its own sake.
 *
 * Nothing here loops. Motion means work happening, and repeating at the
 * close would suggest the story is still running when the point is that it
 * has arrived (design.md §8).
 */
export function usePageCtaAnimation(refs: PageCtaAnimationRefs) {
  const { sectionRef, contentRef } = refs;

  useGSAP(
    () => {
      if (prefersReduced()) return;

      const content = contentRef.current;
      const section = sectionRef.current;
      if (!content || !section) return;

      const heading = content.querySelector("h2");
      const actions = content.querySelector(".cta-actions");
      const rest = Array.from(content.children).filter(
        (el) => el !== heading && el !== actions,
      );

      gsap
        .timeline({
          defaults: { ease: EASE.in, duration: T.base },
          scrollTrigger: { trigger: section, start: "top 78%", once: true },
        })
        .from(heading, { opacity: 0, y: 24, duration: T.slow })
        /* The label above and the copy below settle onto a statement that
           is already there, so they fade rather than travel. */
        .from(rest, { opacity: 0, stagger: 0.12 }, 0.3)
        /* The actions arrive last, and are the only thing in the close
           that still travels. */
        .from(
          actions ? Array.from(actions.children) : [],
          { opacity: 0, y: 14, stagger: 0.1 },
          0.55,
        );
    },
    { scope: sectionRef },
  );
}
