import type { RefObject } from "react";
import { gsap, useGSAP } from "@/configs/gsap";
import { prefersReduced } from "@/app/home/shared/motion";
import { animeWordsOnEnter } from "@/app/home/shared/reveal";

interface FinalCtaAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  headingRef: RefObject<HTMLHeadingElement | null>;
  copyRef: RefObject<HTMLParagraphElement | null>;
  /** The closing length of bus. */
  railRef: RefObject<HTMLDivElement | null>;
  ctaRef: RefObject<HTMLDivElement | null>;
}

/**
 * The close — heading, copy, the two actions, then one last charge.
 *
 * The charge crosses the rail once and stops at the terminal pad. It does
 * not loop: everywhere else on the page motion means work happening, so
 * repeating it here would suggest the story is still running when the
 * point is that it has arrived.
 */
export function useFinalCtaAnimation(refs: FinalCtaAnimationRefs) {
  const { sectionRef, headingRef, copyRef, railRef, ctaRef } = refs;

  useGSAP(
    () => {
      if (prefersReduced()) return;
      const section = sectionRef.current;
      if (!section) return;

      animeWordsOnEnter(headingRef.current, section, "top 72%");

      const buttons = ctaRef.current ? Array.from(ctaRef.current.children) : [];
      const rail = railRef.current;
      const charge = rail?.querySelector<HTMLElement>(".hp-cta-charge");
      const pads = rail ? Array.from(rail.querySelectorAll<HTMLElement>(".hp-cta-pad")) : [];

      gsap.set(charge ?? {}, { opacity: 0, x: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: section, start: "top 70%", once: true },
        delay: 0.35,
      });

      tl.from(copyRef.current, { opacity: 0, y: 18, duration: 0.5 })
        .from(buttons, { opacity: 0, y: 14, duration: 0.5, stagger: 0.2 }, "-=0.1")
        .from(rail ?? {}, { scaleX: 0, transformOrigin: "left", duration: 0.8 }, "-=0.3")
        .from(pads, { scale: 0, duration: 0.3, ease: "back.out(2)", stagger: 0.12 }, "-=0.4");

      // One charge, one crossing, then rest.
      if (charge && rail) {
        tl.to(charge, { opacity: 1, duration: 0.3 })
          .to(charge, { x: rail.clientWidth - 34, duration: 2.2, ease: "power1.inOut" }, "<")
          .to(charge, { opacity: 0, duration: 0.4 }, ">-0.4");
      }
    },
    { scope: sectionRef },
  );
}
