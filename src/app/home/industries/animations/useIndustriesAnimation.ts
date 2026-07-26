import type { RefObject } from "react";
import { useGSAP, ScrollTrigger } from "@/configs/gsap";
import { prefersReduced } from "@/app/home/shared/motion";

interface IndustriesAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  wallRef: RefObject<HTMLDivElement | null>;
  /** Number of subjects the frame cycles through. */
  steps: number;
  /** Called only when the subject changes. */
  onStep: (index: number) => void;
}

/**
 * Scene 06 motion — the subject changes, the frame does not.
 *
 * Scroll drives the substitution so the visitor controls the pace and can see
 * that the surrounding sentence never shifts. No autoplay: the stillness of
 * the frame is the point, and motion here would undermine it.
 */
export function useIndustriesAnimation(refs: IndustriesAnimationRefs) {
  const { sectionRef, wallRef, steps, onStep } = refs;

  useGSAP(
    () => {
      if (prefersReduced() || !wallRef.current) return;

      let last = -1;
      ScrollTrigger.create({
        trigger: wallRef.current,
        start: "top 78%",
        end: "bottom 40%",
        scrub: true,
        onUpdate: (self) => {
          const i = Math.min(steps - 1, Math.floor(self.progress * steps));
          if (i !== last) {
            last = i;
            onStep(i);
          }
        },
      });
    },
    { scope: sectionRef, dependencies: [steps] },
  );
}
