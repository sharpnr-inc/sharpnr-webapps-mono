import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";
import { enterIntro } from "@/app/shared/animations/sectionMotion";

interface TogetherAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  introRef: RefObject<HTMLDivElement | null>;
  productsRef: RefObject<HTMLDivElement | null>;
}

/** Work unfolds down one continuous line — nothing switches context. */
export function useTogetherAnimation(refs: TogetherAnimationRefs) {
  const { sectionRef, introRef, productsRef } = refs;

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      /* Purely horizontal, and from the right — this intro is pushed into
         the right-hand column, and the section beneath it runs down a
         single vertical line. Nothing in the opening should move on that
         same axis before the line has been drawn on it. */
      enterIntro(introRef.current, sectionRef.current, "axis", {
        start: "top 72%",
        dir: -1,
      });

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: { trigger: sectionRef.current, start: "top 55%" },
      });

      tl.to(".together-fill", { scaleY: 1, duration: 1.8 });
      tl.from(
        ".together-stage",
        { opacity: 0, y: 14, duration: 0.5, stagger: 0.32, ease: "power3.out" },
        0.1,
      );
      tl.from(".together-outro", { opacity: 0, duration: 0.6 }, "-=0.2");
      tl.from(
        productsRef.current ? productsRef.current.children : [],
        { opacity: 0, y: 20, duration: 0.55, stagger: 0.15, ease: "power3.out" },
        0.3,
      );
    },
    { scope: sectionRef },
  );
}
