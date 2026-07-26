import type { RefObject } from "react";
import { gsap, useGSAP } from "@/configs/gsap";
import { prefersReduced, revealOnce } from "@/app/home/shared/motion";
import { animeWordsOnEnter } from "@/app/home/shared/reveal";

interface EcosystemAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  headingRef: RefObject<HTMLHeadingElement | null>;
  copyRef: RefObject<HTMLParagraphElement | null>;
  fieldRef: RefObject<HTMLDivElement | null>;
}

/**
 * One highlight, sweeping through five capabilities. Reversible.
 *
 * The moment the section is seen: the words rise into place, then a single
 * highlight visits each one in turn — active turquoise, briefly, before
 * settling to a bright, legible neutral. It runs once, left to right
 * through the list, and never loops. Scrolling back up above the section
 * reverses the whole sequence, same as every sibling scene.
 */
export function useEcosystemAnimation(refs: EcosystemAnimationRefs) {
  const { sectionRef, headingRef, copyRef, fieldRef } = refs;

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      animeWordsOnEnter(headingRef.current, section);
      if (copyRef.current) revealOnce(copyRef.current, section, { delay: 0.15 });
      if (prefersReduced() || !fieldRef.current) return;

      const words = Array.from(
        fieldRef.current.querySelectorAll<HTMLElement>(".hp-ecosystem-word"),
      );
      if (!words.length) return;

      gsap.set(words, { opacity: 0, y: 16, color: "var(--color-mute)" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: fieldRef.current,
          start: "top 74%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(words, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.07 });

      words.forEach((word) => {
        tl.to(word, { color: "#00b4d8", scale: 1.05, duration: 0.32, ease: "power2.out" })
          .to(
            word,
            { color: "rgba(255,255,255,0.82)", scale: 1, duration: 0.4, ease: "power2.inOut" },
            ">-0.04",
          );
      });
    },
    { scope: sectionRef },
  );
}
