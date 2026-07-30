import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";
import { EASE, T } from "@/app/home/shared/choreography";
import { prefersReduced } from "@/app/home/shared/motion";
import { enterIntro } from "@/app/shared/animations/sectionMotion";

interface PrinciplesAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  introRef: RefObject<HTMLDivElement | null>;
}

/**
 * Each principle appears as the reader reaches it — nothing flashy.
 *
 * A principle is a number and a rule written beside it, so it arrives that
 * way: the numeral first, then the rule advancing out from it. Seven
 * identical upward fades made a manifesto read as seven equal rows, which
 * is the impression the section's hover state already exists to break.
 *
 * Nothing is animated on the wrapper that carries `transition-opacity` —
 * that div is the hover emphasis, and GSAP writing opacity to the same
 * element would lag behind the CSS transition on every frame. The numeral
 * and the text block inside it carry no transition of their own, so they
 * are the safe targets. This is the trap in design.md §11, one level down.
 *
 * The closing line had no motion at all and now arrives last, alone.
 */
export function usePrinciplesAnimation(refs: PrinciplesAnimationRefs) {
  const { sectionRef, introRef } = refs;

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      /* Label and heading descend, the sentence rises to meet them. */
      enterIntro(introRef.current, section, "drop", { start: "top 72%" });

      if (prefersReduced()) return;

      gsap.utils.toArray<HTMLElement>(".principle", section).forEach((item) => {
        const numeral = item.querySelector(":scope > div > span");
        const text = item.querySelector(":scope > div > div");

        gsap
          .timeline({
            defaults: { ease: EASE.in, duration: T.base },
            scrollTrigger: { trigger: item, start: "top 84%", once: true },
          })
          .from(numeral, { opacity: 0, duration: T.quick })
          .from(text, { opacity: 0, x: -16 }, 0.1);
      });

      const closing = section.querySelector(":scope > div > p:last-child");
      if (closing) {
        gsap.from(closing, {
          opacity: 0,
          y: 16,
          duration: T.slow,
          ease: EASE.in,
          scrollTrigger: { trigger: closing, start: "top 88%", once: true },
        });
      }
    },
    { scope: sectionRef },
  );
}
