import type { RefObject } from "react";
import { animate, stagger, utils } from "animejs";
import { gsap, useGSAP } from "@/configs/gsap";
import { prefersReduced } from "@/app/home/shared/motion";
import { HERO_SPOKES } from "../heroLinks";

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
 *   6.3  the field settles into a living idle state
 *
 * Each capability is given a full beat of its own, so the visitor reads it
 * rather than watching a stagger. The narrative never loops — only the idle
 * state after it (drift, occasional pulses, drifting motes) continues.
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
  idle: 6300,
} as const;

/** Deterministic pseudo-variance from an index — no Math.random, so SSR and
 *  client renders agree and the drift stays reproducible. */
const vary = (i: number, spread: number, base = 0) =>
  base + (((i * 47) % 23) / 23 - 0.5) * 2 * spread;

export function useHeroAnimation(refs: HeroAnimationRefs) {
  const { sectionRef, copyRef, ctaRef, visualRef } = refs;

  useGSAP(
    () => {
      const words = utils.$(".hero-word") as HTMLElement[];
      const centre = utils.$(".hero-center");
      const halo = utils.$(".hero-halo");
      const line1 = utils.$(".hero-line-1 .hp-word");
      const line2 = utils.$(".hero-line-2 .hp-word");

      // Reduced motion: the finished frame, immediately, and nothing after.
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

      // visualRef is the full-width grid column; the actual composition
      // (SVG, words, mark) lives in the narrower, centred .hero-visual
      // inside it. Every rect calculation below has to be relative to that
      // inner stage, or coordinates land off by the centring gap.
      const stage =
        visualRef.current?.querySelector<HTMLElement>(".hero-visual") ??
        visualRef.current;

      // 7.2s — everything draws toward the middle
      if (stage && words.length) {
        const box = stage.getBoundingClientRect();
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

      // 8.0s — the centre resolves, and the narrative rests
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

      // From here on: a living field, not a story. Everything below loops
      // quietly forever, at low amplitude, and never advances a narrative.
      gsap.delayedCall(T.idle / 1000, () => {
        if (!stage) return;
        wakeIdleField(stage, words);
      });
    },
    { scope: sectionRef },
  );
}

/** Idle drift, occasional link pulses, and drifting particles — the field
 *  breathing once the opening narrative has finished. */
function wakeIdleField(container: HTMLElement, words: HTMLElement[]) {
  // Subtle per-word drift — a few px, its own period, never synchronised.
  words.forEach((word, i) => {
    gsap.to(word, {
      x: `+=${vary(i, 3)}`,
      y: `+=${vary(i * 3 + 1, 4)}`,
      duration: 5 + (i % 5),
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: vary(i, 1, 1.2),
    });
  });

  // Soft motes — a handful, drifting in slow independent loops.
  const particles = Array.from(
    container.querySelectorAll<HTMLElement>(".hero-particle"),
  );
  particles.forEach((p, i) => {
    gsap.set(p, {
      left: `${18 + i * 20}%`,
      top: `${30 + ((i * 37) % 45)}%`,
      opacity: 0,
    });
    gsap
      .timeline({ repeat: -1, delay: i * 1.4 })
      .to(p, { opacity: 0.4, duration: 2 })
      .to(
        p,
        {
          x: vary(i, 46, 20),
          y: vary(i * 5, 30, -16),
          duration: 14 + i * 3,
          ease: "sine.inOut",
        },
        0,
      )
      .to(p, { opacity: 0, duration: 3 }, "-=3");
  });

  // Occasional connections — a handful of words each send a pulse to the
  // mark, one at a time, so the field never lights up all at once. Every
  // line that appears resolves at the centre — nothing connects to nowhere.
  const byLabel = new Map(
    words.map((w) => [w.dataset.label, w] as const),
  );
  const mark = container.querySelector<HTMLElement>(".hero-center");

  HERO_SPOKES.forEach((label, i) => {
    if (!mark) return;
    const group = container.querySelector<SVGGElement>(
      `.hero-link-group[data-a="${label}"]`,
    );
    const path = group?.querySelector<SVGPathElement>(".hero-link");
    const dot = group?.querySelector<SVGCircleElement>(".hero-pulse");
    const word = byLabel.get(label);
    if (!path || !dot || !word) return;

    const setPath = () => {
      const box = container.getBoundingClientRect();
      const rw = word.getBoundingClientRect();
      const rm = mark.getBoundingClientRect();
      const x1 = rw.left + rw.width / 2 - box.left;
      const y1 = rw.top + rw.height / 2 - box.top;
      const x2 = rm.left + rm.width / 2 - box.left;
      const y2 = rm.top + rm.height / 2 - box.top;
      path.setAttribute("d", `M ${x1} ${y1} L ${x2} ${y2}`);
    };
    setPath();

    gsap.set([path, dot], { opacity: 0 });
    gsap
      .timeline({ repeat: -1, repeatDelay: 5 + i * 2.2, delay: 2 + i * 1.6 })
      .call(setPath)
      .to(path, { opacity: 1, duration: 0.5 })
      .to(dot, { opacity: 1, duration: 0.2 }, "-=0.3")
      .to(
        dot,
        { motionPath: { path, align: path }, duration: 1.1, ease: "power1.inOut" },
        "-=0.1",
      )
      .to(dot, { opacity: 0, duration: 0.3 }, "-=0.2")
      .to(path, { opacity: 0, duration: 0.6 }, "-=0.3");
  });
}
