import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";
import { EASE, T } from "@/app/home/shared/choreography";
import { prefersReduced } from "@/app/home/shared/motion";
import { enterIntro } from "@/app/shared/animations/sectionMotion";

interface FutureVisionAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  bodyRef: RefObject<HTMLDivElement | null>;
}

/**
 * Steady, optimistic reading rhythm — longevity, not spectacle.
 *
 * This hook was identical to the World section's, three sections earlier.
 * It now moves the way its own content argues: the five things the
 * platform is being built toward each *widen out* from the rule on their
 * left, one after another, rather than rising into place. A list of
 * futures should read as something opening up, and nothing else on this
 * page grows along its own width.
 *
 * The last line — the destination isn't more software — arrives on its own
 * after a beat. It is the page's conclusion and the only sentence in the
 * section that gets to land by itself.
 */
export function useFutureVisionAnimation(refs: FutureVisionAnimationRefs) {
  const { sectionRef, bodyRef } = refs;

  useGSAP(
    () => {
      const section = sectionRef.current;
      const body = bodyRef.current;
      if (!section || !body) return;

      /* Horizontal opening, matching the list that follows it. */
      enterIntro(body, section, "axis", { start: "top 78%" });

      if (prefersReduced()) return;

      const items = gsap.utils.toArray<HTMLElement>("ul > li", body);
      const kicker = body.querySelector("ul")?.previousElementSibling ?? null;
      const closing = Array.from(
        body.querySelectorAll<HTMLElement>(":scope > div:last-child > p"),
      );

      if (items.length) {
        gsap
          .timeline({
            defaults: { ease: EASE.in, duration: T.base },
            scrollTrigger: { trigger: items[0], start: "top 85%", once: true },
          })
          .from(kicker, { opacity: 0, duration: T.quick })
          /* Anchored on the rule, so each line grows out of it rather
             than sliding past it. */
          .from(
            items,
            {
              opacity: 0,
              scaleX: 0.94,
              transformOrigin: "left center",
              stagger: 0.09,
            },
            0.12,
          );
      }

      if (closing.length) {
        gsap
          .timeline({
            defaults: { ease: EASE.in, duration: T.slow },
            scrollTrigger: {
              trigger: closing[0],
              start: "top 86%",
              once: true,
            },
          })
          .from(closing.slice(0, -1), { opacity: 0, y: 16, stagger: 0.12 })
          .from(closing.slice(-1), { opacity: 0, y: 16 }, "+=0.25");
      }
    },
    { scope: sectionRef },
  );
}
