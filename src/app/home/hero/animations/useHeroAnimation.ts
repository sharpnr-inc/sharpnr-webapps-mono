import type { RefObject } from "react";
import { animate, stagger, utils } from "animejs";
import { gsap, useGSAP } from "@/configs/gsap";
import { prefersReduced } from "@/app/home/shared/motion";

interface HeroAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  copyRef: RefObject<HTMLParagraphElement | null>;
  ctaRef: RefObject<HTMLDivElement | null>;
  visualRef: RefObject<HTMLDivElement | null>;
}

/*
 * The opening — an eight second sequence, cut to the beat.
 *
 *   0.0  quiet. only the field.
 *   0.3  One Platform.
 *   0.7  Every Business.
 *   1.25 the paragraph
 *   1.7  the invitation
 *   2.25 the capabilities arrive, one per beat
 *   4.45 everything converges
 *   5.05 Sharpnr becomes the centre
 *        idle
 *
 * Each capability is given a full beat of its own, so the visitor reads it
 * rather than watching a stagger. Nothing loops afterwards.
 */
const T = {
  line1: 300,
  line2: 720,
  copy: 1250,
  cta: 1680,
  firstWord: 2250,
  wordBeat: 130,
  converge: 4450,
  centre: 5050,
} as const;

export function useHeroAnimation(refs: HeroAnimationRefs) {
  const { sectionRef, copyRef, ctaRef, visualRef } = refs;

  useGSAP(
    () => {
      const words = utils.$(".hero-word") as HTMLElement[];
      const centre = utils.$(".hero-center");
      const halo = utils.$(".hero-halo");
      const line1 = utils.$(".hero-line-1 .hp-word");
      const line2 = utils.$(".hero-line-2 .hp-word");

      // Reduced motion: the finished frame, immediately.
      if (prefersReduced()) {
        utils.set([...line1, ...line2, ...words, ...centre, ...halo], {
          opacity: 1,
        });
        return;
      }

      // Hold everything back — the sequence starts from silence.
      utils.set([...line1, ...line2], { opacity: 0, translateY: "0.5em" });
      utils.set(words, { opacity: 0, filter: "blur(6px)" });
      utils.set([...centre, ...halo], { opacity: 0 });

      const reveal = { duration: 820, ease: "outExpo" } as const;

      // 0.5s / 1.0s — the two lines, each on its own beat
      animate(line1, {
        ...reveal,
        opacity: 1,
        translateY: "0em",
        delay: stagger(38, { start: T.line1 }),
      });
      animate(line2, {
        ...reveal,
        opacity: 1,
        translateY: "0em",
        delay: stagger(38, { start: T.line2 }),
      });

      // 1.8s / 2.4s — paragraph, then the invitation
      const buttons = ctaRef.current ? Array.from(ctaRef.current.children) : [];
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(copyRef.current, { opacity: 0, y: 16, duration: 0.6 }, T.copy / 1000)
        .from(
          buttons,
          { opacity: 0, y: 12, duration: 0.5, stagger: 0.12 },
          T.cta / 1000,
        );

      // 3.2s → 6.4s — one capability per beat
      animate(words, {
        opacity: 1,
        filter: "blur(0px)",
        duration: 900,
        ease: "outExpo",
        delay: stagger(T.wordBeat, { start: T.firstWord }),
      });

      // 7.2s — everything draws toward the middle
      if (visualRef.current && words.length) {
        const box = visualRef.current.getBoundingClientRect();
        const cx = box.left + box.width / 2;
        const cy = box.top + box.height / 2;

        for (const word of words) {
          const r = word.getBoundingClientRect();
          const dx = r.left + r.width / 2 - cx;
          const dy = r.top + r.height / 2 - cy;
          const len = Math.hypot(dx, dy) || 1;
          animate(word, {
            translateX: (-dx / len) * 14,
            translateY: (-dy / len) * 14,
            duration: 1400,
            ease: "inOutQuad",
            delay: T.converge,
          });
        }
      }

      // 8.0s — the centre resolves, and the sequence rests
      animate(centre, {
        opacity: 1,
        scale: [0.97, 1],
        duration: 900,
        ease: "outExpo",
        delay: T.centre,
      });
      animate(halo, {
        opacity: 1,
        scale: [0.88, 1],
        duration: 1500,
        ease: "outQuad",
        delay: T.centre,
      });
    },
    { scope: sectionRef },
  );
}
