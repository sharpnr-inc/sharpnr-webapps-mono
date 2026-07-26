import type { RefObject } from "react";
import { gsap, useGSAP } from "@/configs/gsap";
import { prefersReduced, revealOnce } from "@/app/home/shared/motion";
import { animeWordsOnEnter } from "@/app/home/shared/reveal";

interface OnePlatformAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  headingRef: RefObject<HTMLHeadingElement | null>;
  copyRef: RefObject<HTMLParagraphElement | null>;
  fieldRef: RefObject<HTMLDivElement | null>;
}

/** Each block's own arrival vector and starting tilt — different enough
 * that the seven read as converging from all directions, not sliding in
 * as one group. */
const FROM = [
  { x: -70, y: -50, rotate: -14 },
  { x: 64, y: -34, rotate: 10 },
  { x: -44, y: 42, rotate: 12 },
  { x: 76, y: 30, rotate: -9 },
  { x: -60, y: 58, rotate: -11 },
  { x: 48, y: -52, rotate: 13 },
  { x: -30, y: 66, rotate: 8 },
];

/**
 * The turn — seven blocks, arriving and levelling out. Reversible.
 *
 * One timeline: each block slides in from its own direction and rotation
 * and settles flat into its cell in the structure; once all seven are in
 * place, the frame around them and the light behind it fade in together.
 * Scrolling back up above the section reverses the whole arrival.
 */
export function useOnePlatformAnimation(refs: OnePlatformAnimationRefs) {
  const { sectionRef, headingRef, copyRef, fieldRef } = refs;

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      animeWordsOnEnter(headingRef.current, section);
      if (copyRef.current) revealOnce(copyRef.current, section, { delay: 0.15 });
      if (prefersReduced() || !fieldRef.current) return;

      const container = fieldRef.current;
      const blocks = Array.from(container.querySelectorAll<HTMLElement>(".hp-block"));
      const outline = container.querySelector<HTMLElement>(".hp-structure-outline");
      const halo = container.querySelector<HTMLElement>(".platform-halo");
      if (!blocks.length) return;

      gsap.set(outline ?? {}, { opacity: 0 });
      gsap.set(halo ?? {}, { opacity: 0, scale: 0.9 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 72%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(blocks, {
        opacity: 0,
        x: (i) => FROM[i % FROM.length].x,
        y: (i) => FROM[i % FROM.length].y,
        rotate: (i) => FROM[i % FROM.length].rotate,
        duration: 0.9,
        ease: "power2.out",
        stagger: 0.11,
      }).to(
        outline ?? {},
        { opacity: 1, duration: 0.5, ease: "power2.out" },
        "-=0.25",
      ).fromTo(
        halo ?? {},
        { scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.9, ease: "power2.out" },
        "<",
      );
    },
    { scope: sectionRef },
  );
}
