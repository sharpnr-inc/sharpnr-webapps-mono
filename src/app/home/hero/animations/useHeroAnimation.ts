import type { RefObject } from "react";
import { gsap, useGSAP } from "@/configs/gsap";
import { prefersReduced } from "@/app/home/shared/motion";

interface HeroAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  copyRef: RefObject<HTMLParagraphElement | null>;
  ctaRef: RefObject<HTMLDivElement | null>;
  eyebrowRef: RefObject<HTMLParagraphElement | null>;
}

/*
 * The opening, cut to the beat:
 *
 *   0.00  the field is there, resting
 *   0.15  One Platform,
 *   0.45  Every Business.
 *   0.90  the sentence
 *   1.15  the invitation
 *   2.20  the field starts lighting
 *
 * A little over two seconds to a readable frame.
 */
const T = {
  line1: 0.15,
  line2: 0.45,
  copy: 0.9,
  cta: 1.15,
} as const;

/** How many words lift at once, and how long the moment lasts. */
const GROUP_MIN = 4;
const GROUP_MAX = 5;
const LIT = 0.22;
const HOLD = 0.7;
const GAP_MIN = 2;
const GAP_MAX = 3;

export function useHeroAnimation(refs: HeroAnimationRefs) {
  const { sectionRef, copyRef, ctaRef, eyebrowRef } = refs;

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const line1 = gsap.utils.toArray<HTMLElement>(".hero-line-1 .hp-word");
      const line2 = gsap.utils.toArray<HTMLElement>(".hero-line-2 .hp-word");
      const words = gsap.utils
        .toArray<HTMLElement>(".hero-field-word")
        .filter((w) => getComputedStyle(w).display !== "none");

      // Reduced motion: the finished frame, and the field simply rests.
      if (prefersReduced()) {
        gsap.set([...line1, ...line2], { opacity: 1 });
        return;
      }

      gsap.set([...line1, ...line2], { opacity: 0, y: "0.5em" });

      // anime's outExpo/820ms, matched: GSAP expo.out over 0.82s.
      const reveal = { duration: 0.82, ease: "expo.out", stagger: 0.038 } as const;
      gsap.to(line1, { ...reveal, opacity: 1, y: "0em", delay: T.line1 });
      gsap.to(line2, { ...reveal, opacity: 1, y: "0em", delay: T.line2 });

      const buttons = ctaRef.current ? Array.from(ctaRef.current.children) : [];
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(eyebrowRef.current, { opacity: 0, y: 10, duration: 0.5 }, 0)
        .from(copyRef.current, { opacity: 0, y: 16, duration: 0.6 }, T.copy)
        .from(
          buttons,
          { opacity: 0, y: 12, duration: 0.5, stagger: 0.1 },
          T.cta,
        );

      if (!words.length) return;

      /*
       * The field writes itself in from the centre outward — the words
       * nearest the headline first, the margins last. It reads as the page
       * filling in around the message rather than as a background that was
       * always there, and it gives the opening somewhere to travel without
       * anything sliding, floating or orbiting.
       *
       * Distance is measured once, before any tween runs, so the ordering
       * holds at every viewport.
       */
      const centre = { x: section.offsetWidth / 2, y: section.offsetHeight / 2 };
      const byDistance = [...words].sort((a, b) => {
        const d = (el: HTMLElement) => {
          const r = el.getBoundingClientRect();
          const s = section.getBoundingClientRect();
          return Math.hypot(
            r.left + r.width / 2 - s.left - centre.x,
            r.top + r.height / 2 - s.top - centre.y,
          );
        };
        return d(a) - d(b);
      });

      gsap.set(byDistance, { opacity: 0 });
      gsap.to(byDistance, {
        opacity: (_i, t: HTMLElement) => Number(t.dataset.base ?? 0.07),
        duration: 0.9,
        ease: "sine.out",
        stagger: 0.022,
        delay: 0.35,
      });

      /*
       * The only motion in the scene. Every couple of seconds a handful of
       * words lift out of the field and settle back — nothing moves, nothing
       * scrolls, nothing connects.
       *
       * Each word returns to its *own* resting opacity, read from the value
       * the component wrote out; animating them all back to one number would
       * flatten the field's variance the first time it fired.
       *
       * Recently-used words are held out of the pool so the same term never
       * lights twice in quick succession, which is what would make the
       * rhythm feel authored.
       */
      const recent: HTMLElement[] = [];
      const pickGroup = () => {
        const size =
          GROUP_MIN + Math.floor(Math.random() * (GROUP_MAX - GROUP_MIN + 1));
        const pool = words.filter((w) => !recent.includes(w));
        const chosen: HTMLElement[] = [];
        while (chosen.length < size && chosen.length < pool.length) {
          const w = pool[Math.floor(Math.random() * pool.length)];
          if (!chosen.includes(w)) chosen.push(w);
        }
        recent.push(...chosen);
        // Keep roughly two cycles' worth out of circulation.
        while (recent.length > GROUP_MAX * 2) recent.shift();
        return chosen;
      };

      let stopped = false;
      const cycle = () => {
        if (stopped) return;
        const group = pickGroup();
        const tl = gsap.timeline({
          onComplete: () => {
            gsap.delayedCall(
              GAP_MIN + Math.random() * (GAP_MAX - GAP_MIN),
              cycle,
            );
          },
        });
        group.forEach((w, i) => {
          const base = Number(w.dataset.base ?? 0.07);
          tl.to(
            w,
            { opacity: LIT, duration: 0.5, ease: "sine.out" },
            i * 0.09,
          ).to(
            w,
            { opacity: base, duration: 0.8, ease: "sine.in" },
            i * 0.09 + 0.5 + HOLD,
          );
        });
      };

      gsap.delayedCall(2.2, cycle);
      return () => {
        stopped = true;
      };
    },
    { scope: sectionRef },
  );
}
