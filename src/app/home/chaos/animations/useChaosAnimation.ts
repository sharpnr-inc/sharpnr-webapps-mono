import type { RefObject } from "react";
import { ScrollTrigger, gsap, useGSAP } from "@/configs/gsap";
import { prefersReduced } from "@/app/home/shared/motion";
import { animeWordsOnEnter } from "@/app/home/shared/reveal";

interface ChaosAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  headingRef: RefObject<HTMLHeadingElement | null>;
  copyRef: RefObject<HTMLParagraphElement | null>;
  fieldRef: RefObject<HTMLDivElement | null>;
}

/**
 * Scene 02.
 *
 * The rows arrive one system at a time, so the visitor reads the first
 * one properly and only then notices the second says something different.
 * Landing them together would read as a spreadsheet dump, and the moment of
 * noticing — which is the whole argument — would be lost.
 *
 * After that, one recurring cue: the five names light down the column. It
 * takes about a second and says the thing the section is about, which is
 * that all five of these are one person.
 */
export function useChaosAnimation(refs: ChaosAnimationRefs) {
  const { sectionRef, headingRef, copyRef, fieldRef } = refs;

  useGSAP(
    () => {
      if (prefersReduced()) return;
      const section = sectionRef.current;
      const field = fieldRef.current;
      if (!section || !field) return;

      animeWordsOnEnter(headingRef.current, section, "top 72%");

      const records = gsap.utils.toArray<HTMLElement>(".hp-ledger-row", field);
      const verdict = field.querySelector(".hp-rec-verdict");
      /* The column headings are the sheet being ruled up, so they are
         uncovered left to right before anything is written into it —
         the one horizontal move in a scene that is otherwise a stack of
         rows arriving downward. */
      const headings = Array.from(
        field.querySelectorAll<HTMLElement>(".hp-ledger thead th"),
      );
      // The name is the first value in each record — the field a person
      // recognises themselves by, and the one the cue lights.
      const names = records
        .map((r) => r.querySelector<HTMLElement>(".hp-ledger-val"))
        .filter((n): n is HTMLElement => n !== null);

      gsap
        .timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: section, start: "top 70%", once: true },
        })
        .from(copyRef.current, { opacity: 0, y: 18, duration: 0.5 }, 0.3)
        .from(headings, { opacity: 0, x: -10, duration: 0.4, stagger: 0.05 }, 0.2)
        .from(records, { opacity: 0, y: 14, duration: 0.5, stagger: 0.13 }, 0.45)
        .from(verdict, { opacity: 0, duration: 0.6 }, ">-0.1");

      if (!names.length) return;

      /*
       * Ambient, and deliberately its own paused timeline rather than a
       * child of the entrance above: an infinitely repeating child leaves a
       * timeline with no finite duration, which silently breaks anything
       * that later needs to reverse it.
       *
       * Only runs while the scene is on screen — a loop tweening against a
       * section nobody is looking at is just wasted frames.
       */
      const cue = gsap
        .timeline({ repeat: -1, repeatDelay: 4.5, paused: true })
        .to(names, {
          color: "#caf0f8",
          duration: 0.28,
          stagger: 0.11,
          ease: "sine.out",
        })
        .to(
          names,
          { color: "", duration: 0.5, stagger: 0.11, ease: "sine.in" },
          "+=0.35",
        );

      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => cue.play(),
        onEnterBack: () => cue.play(),
        onLeave: () => cue.pause(),
        onLeaveBack: () => cue.pause(),
      });
    },
    { scope: sectionRef },
  );
}
