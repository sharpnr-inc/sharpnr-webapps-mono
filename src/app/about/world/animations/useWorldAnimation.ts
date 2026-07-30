import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";
import { EASE, T } from "@/app/home/shared/choreography";
import { prefersReduced } from "@/app/home/shared/motion";
import { enterIntro } from "@/app/shared/animations/sectionMotion";

interface WorldAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  bodyRef: RefObject<HTMLDivElement | null>;
}

/**
 * Calm, inevitable — ideas surface as the reader arrives at them.
 *
 * This hook and the one on the Future Vision section were byte-for-byte
 * identical: every block on both, `opacity 0, y 20, 0.7, power3.out`, on
 * its own trigger. Two sections of a five-section page playing the same
 * tween is the clearest case of the same animation wearing different
 * words.
 *
 * The prose still surfaces as the reader reaches it — that part was right,
 * and a paragraph is a paragraph. What changes is the pull quote, which is
 * the turn in the argument and now moves like one: the cyan rule and the
 * two lines beside it are uncovered downward together, so the quote is
 * ruled in rather than faded up. It is the only vertical wipe on the page.
 *
 * The About page carries no illustrations by design, so its motion has to
 * come from the type. That makes the quote's entrance the section's whole
 * visual event, and it earns being different from the prose around it.
 */
export function useWorldAnimation(refs: WorldAnimationRefs) {
  const { sectionRef, bodyRef } = refs;

  useGSAP(
    () => {
      const section = sectionRef.current;
      const body = bodyRef.current;
      if (!section || !body) return;

      enterIntro(body, section, "rise", { start: "top 78%" });

      if (prefersReduced()) return;

      const quote = body.querySelector<HTMLElement>(".world-quote");
      const blocks = Array.from(body.children).filter(
        (el) => !el.classList.contains("sec-intro") && el !== quote,
      );

      blocks.forEach((block) => {
        gsap.from(block, {
          opacity: 0,
          y: 18,
          duration: T.slow,
          ease: EASE.in,
          scrollTrigger: { trigger: block, start: "top 82%", once: true },
        });
      });

      if (quote) {
        /* Uncovered top to bottom, rule and all. `fromTo` rather than a
           `set` plus a `to`, so the quote is never left clipped waiting
           for a trigger, and the clip is cleared once it has played. */
        gsap.fromTo(
          quote,
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: T.draw,
            ease: EASE.draw,
            clearProps: "clipPath",
            scrollTrigger: { trigger: quote, start: "top 84%", once: true },
          },
        );
      }
    },
    { scope: sectionRef },
  );
}
