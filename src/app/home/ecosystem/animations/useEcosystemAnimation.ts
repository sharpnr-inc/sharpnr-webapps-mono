import type { RefObject } from "react";
import { useGSAP, ScrollTrigger } from "@/configs/gsap";
import { prefersReduced, revealOnce } from "@/app/home/shared/motion";
import { animeWordsOnEnter } from "@/app/home/shared/reveal";

interface EcosystemAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  headingRef: RefObject<HTMLHeadingElement | null>;
  copyRef: RefObject<HTMLParagraphElement | null>;
  eventRef: RefObject<HTMLDivElement | null>;
  stageRef: RefObject<HTMLDivElement | null>;
  /** Number of capabilities in the activation sequence. */
  steps: number;
  /** Called (only on change) with the active step index, or -1 for idle. */
  onStep: (index: number) => void;
}

/**
 * Scene 04 motion — the connected ecosystem.
 * A business event flows through the platform: as the visitor scrolls, one
 * capability activates at a time, then everything returns to idle. Driven by
 * scroll progress (never pinned, never locked); the active index only changes
 * on segment boundaries, so React re-renders a handful of times and CSS
 * transitions do the smoothing. One highlight, one active capability — no
 * connecting lines. The visitor controls the story.
 */
export function useEcosystemAnimation(refs: EcosystemAnimationRefs) {
  const { sectionRef, headingRef, copyRef, eventRef, stageRef, steps, onStep } =
    refs;

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      if (prefersReduced()) {
        onStep(-1);
        return;
      }

      animeWordsOnEnter(headingRef.current, section);
      if (copyRef.current)
        revealOnce(copyRef.current, section, { delay: 0.15 });
      if (eventRef.current)
        revealOnce(eventRef.current, section, { delay: 0.3 });

      // Lead segment (event appears) + one per capability + trailing idle.
      const segments = steps + 2;
      let last = -2;

      ScrollTrigger.create({
        trigger: stageRef.current!,
        start: "top 70%",
        end: "bottom 45%",
        scrub: true,
        onUpdate: (self) => {
          const seg = Math.min(
            segments - 1,
            Math.floor(self.progress * segments),
          );
          const index = seg === 0 || seg > steps ? -1 : seg - 1;
          if (index !== last) {
            last = index;
            onStep(index);
          }
        },
      });
    },
    { scope: sectionRef, dependencies: [steps] },
  );
}
