import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";
import { EASE, T } from "@/app/home/shared/choreography";
import { prefersReduced } from "@/app/home/shared/motion";
import { enterIntro } from "@/app/shared/animations/sectionMotion";

interface IntentsAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  introRef: RefObject<HTMLDivElement | null>;
}

/**
 * Five doors, each opening as the reader reaches it.
 *
 * The row is a numeral, a title and a description laid out across the
 * page, so it arrives across the page: the numeral first — it is the
 * handle you find the door by — and the title and the copy following it
 * inward from the left. Nothing rises. Library, immediately below, is the
 * section where things come *down* onto a shelf, and these two used to be
 * the identical upward fade one after the other.
 */
export function useIntentsAnimation(refs: IntentsAnimationRefs) {
  const { sectionRef, introRef } = refs;

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      /* Horizontal throughout, matching the rows below it. */
      enterIntro(introRef.current, section, "axis", { start: "top 72%" });

      if (prefersReduced()) return;

      gsap.utils.toArray<HTMLElement>(".intent-row").forEach((row) => {
        const numeral = row.querySelector("span");
        const rest = Array.from(row.querySelectorAll(":scope > div > *")).filter(
          (el) => el !== numeral,
        );

        gsap
          .timeline({
            defaults: { ease: EASE.in, duration: T.base },
            scrollTrigger: { trigger: row, start: "top 85%", once: true },
          })
          .from(numeral, { opacity: 0, duration: T.quick })
          /* Under the 20px page gutter, so a row never pushes the
             document sideways on a phone. */
          .from(rest, { opacity: 0, x: -16, stagger: 0.07 }, 0.1);
      });
    },
    { scope: sectionRef },
  );
}
