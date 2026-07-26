import type { RefObject } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/configs/gsap";
import { prefersReduced } from "@/app/home/shared/motion";

interface WhyAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  gridRef: RefObject<HTMLDivElement | null>;
}

/**
 * Scene 07 motion — each intertitle holds the frame alone.
 *
 * A card rises as it takes the screen and recedes as it leaves, so only one
 * belief is ever fully present. Opacity and transform only; each card is
 * driven by its own scrub so nothing has to be sequenced by hand.
 */
export function useWhyAnimation(refs: WhyAnimationRefs) {
  const { sectionRef, gridRef } = refs;

  useGSAP(
    () => {
      if (prefersReduced() || !gridRef.current) return;

      for (const card of Array.from(gridRef.current.children)) {
        const line = card.querySelector("p");
        if (!line) continue;

        gsap.set(line, { opacity: 0.12, y: 26 });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 78%",
              end: "bottom 42%",
              scrub: true,
            },
          })
          .to(line, { opacity: 1, y: 0, ease: "power2.out", duration: 1 })
          .to(line, { duration: 0.9 })
          .to(line, { opacity: 0.12, y: -26, ease: "power2.in", duration: 1 });
      }

      ScrollTrigger.refresh();
    },
    { scope: sectionRef },
  );
}
