import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";
import { EASE, T } from "@/app/home/shared/choreography";
import { prefersReduced } from "@/app/home/shared/motion";
import { enterIntro, isSplit } from "@/app/shared/animations/sectionMotion";

interface BetterTogetherAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  introRef: RefObject<HTMLDivElement | null>;
}

/**
 * Four quiet stories, then the point — connection transforms.
 *
 * The seven capability sections above alternate left and right; the
 * swinging stops here, and so does the travelling. The four stories draw
 * *inward* toward the middle of the grid instead of rising in a stagger —
 * useful on their own, better side by side, which is the heading. It is
 * the only convergent entrance on the page, and it lands where the page
 * settles.
 *
 * The closing line arrives after them, alone, and nothing loops: this is
 * the last thing before the page's ending card.
 */
export function useBetterTogetherAnimation(refs: BetterTogetherAnimationRefs) {
  const { sectionRef, introRef } = refs;

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      /* The headline first and alone — it is the synthesis the four
         stories underneath are evidence for. */
      enterIntro(introRef.current, section, "lead", { start: "top 72%" });

      if (prefersReduced()) return;

      const stories = gsap.utils.toArray<HTMLElement>(".better-story", section);
      const close = section.querySelector(".better-close");

      if (stories.length) {
        gsap
          .timeline({
            defaults: { ease: EASE.in, duration: T.slow },
            scrollTrigger: {
              trigger: stories[0],
              start: "top 82%",
              once: true,
            },
          })
          /* Two columns: the left pair comes in from the left, the right
             pair from the right, and they close the gap between them.
             The grid is 2-up from `sm`, so the convergence is gated on
             there genuinely being two columns to converge across —
             stacked, a 30px sideways move would say nothing and would
             push past the 20px page gutter. */
          .from(
            stories,
            isSplit()
              ? { opacity: 0, x: (i: number) => (i % 2 === 0 ? -30 : 30), stagger: 0.08 }
              : { opacity: 0, y: 22, stagger: 0.08 },
          );
      }

      if (close) {
        gsap.from(close, {
          opacity: 0,
          y: 14,
          duration: T.slow,
          ease: EASE.in,
          scrollTrigger: { trigger: close, start: "top 88%", once: true },
        });
      }
    },
    { scope: sectionRef },
  );
}
