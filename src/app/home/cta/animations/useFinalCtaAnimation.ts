import type { RefObject } from "react";
import { gsap, useGSAP } from "@/configs/gsap";
import { prefersReduced } from "@/app/home/shared/motion";
import { animeWordsOnEnter } from "@/app/home/shared/reveal";

interface FinalCtaAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  headingRef: RefObject<HTMLHeadingElement | null>;
  copyRef: RefObject<HTMLParagraphElement | null>;
  ctaRef: RefObject<HTMLDivElement | null>;
  docRef: RefObject<HTMLAnchorElement | null>;
}

/**
 * Scene 08 motion. Heading reveals, copy fades up, the CTAs appear, then the
 * documentation link — a calm, sequential close. At most two things move at
 * once (Scene 08 performance budget). Reveal once; then idle.
 */
export function useFinalCtaAnimation(refs: FinalCtaAnimationRefs) {
  const { sectionRef, headingRef, copyRef, ctaRef, docRef } = refs;

  useGSAP(
    () => {
      if (prefersReduced()) return;
      const section = sectionRef.current;
      if (!section) return;

      // Heading — anime.js typography
      animeWordsOnEnter(headingRef.current, section, "top 72%");

      // Copy, CTAs, doc link — GSAP, sequenced after the heading
      const buttons = ctaRef.current ? Array.from(ctaRef.current.children) : [];
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: section, start: "top 70%", once: true },
        delay: 0.35,
      });

      tl.from(copyRef.current, { opacity: 0, y: 18, duration: 0.5 })
        .from(buttons, { opacity: 0, y: 14, duration: 0.5, stagger: 0.2 }, "-=0.1")
        .from(docRef.current, { opacity: 0, duration: 0.5 }, "-=0.15");
    },
    { scope: sectionRef },
  );
}
