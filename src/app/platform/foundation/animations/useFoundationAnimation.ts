import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";
import { EASE, T } from "@/app/home/shared/choreography";
import { prefersReduced } from "@/app/home/shared/motion";
import { enterIntro } from "@/app/shared/animations/sectionMotion";

interface FoundationAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  introRef: RefObject<HTMLDivElement | null>;
}

/**
 * The foundation assembles — steady, grounded, no excitement.
 *
 * Built in the order the argument runs, which is the reverse of what was
 * here before. The five pillars rise together as one slab rather than
 * arriving one after another on a long stagger: they are not five
 * products taking turns, they are one foundation, and a 0.1s stagger down
 * a row of five is exactly what made them read as a product grid. The
 * band naming the work then lands on top of them, because the work sits
 * on the foundation and not the other way round, and the closing line —
 * which is the payoff, one thing happening and three places knowing —
 * arrives on its own at the end.
 *
 * Adapt, immediately above, lands its top layer downward onto a base that
 * never moves. This one builds the base upward. The two sections make
 * opposite halves of the same claim and now move in opposite directions
 * to say so.
 */
export function useFoundationAnimation(refs: FoundationAnimationRefs) {
  const { sectionRef, introRef } = refs;

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      /* Label and heading descend, the sentence rises to meet them —
         a thing closing on its foundation, which is the section. */
      enterIntro(introRef.current, section, "drop", { start: "top 72%" });

      if (prefersReduced()) return;

      const pillars = gsap.utils.toArray<HTMLElement>(
        ".foundation-pillar",
        section,
      );
      const band = section.querySelector(".foundation-band");
      const close = section.querySelector(".foundation-close");

      const tl = gsap.timeline({
        defaults: { ease: EASE.in, duration: T.base },
        scrollTrigger: { trigger: section, start: "top 55%", once: true },
      });

      if (pillars.length) {
        /* Near-simultaneous on purpose. Enough offset to read as five
           things, not enough to read as a queue. */
        tl.from(pillars, { opacity: 0, y: 22, stagger: 0.035 });
      }
      if (band) tl.from(band, { opacity: 0, y: -14 }, 0.3);
      if (close) tl.from(close, { opacity: 0, y: 14 }, 0.62);
    },
    { scope: sectionRef },
  );
}
