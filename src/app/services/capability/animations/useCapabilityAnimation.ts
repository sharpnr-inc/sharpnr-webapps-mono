import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";
import { EASE, T } from "@/app/home/shared/choreography";
import { prefersReduced } from "@/app/home/shared/motion";
import { enterIntro, isSplit } from "@/app/shared/animations/sectionMotion";

interface CapabilityAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  introRef: RefObject<HTMLDivElement | null>;
  /** True when the flow panel sits on the left. */
  flip: boolean;
}

/**
 * Outcomes settle in, then the connected flow unfolds step by step.
 *
 * Seven of these run back to back on the Services page. They are one
 * component, so they cannot each get a bespoke figure — but they were also
 * playing one identical timeline seven times, which meant seven sections
 * with the same layout, the same rhythm and the same direction. Any two of
 * them could have been swapped and nobody would have noticed.
 *
 * The honest differentiator is the one the page already uses to lay them
 * out: **direction follows the layout**, the same rule as the Industries
 * category strips. The panel alternates sides down the page, so the
 * entrance alternates with it — the argument column enters from the outer
 * edge of its own column and the panel from the opposite side, and the two
 * meet in the middle. No two consecutive sections travel the same way,
 * which is exactly what made them read as one repeated widget before.
 *
 * Within a section the motion follows the content rather than the clock:
 * the outcomes advance in from their rules, then the panel arrives, then
 * the journey walks *down its own spine* one step at a time — a flow being
 * traced, not a list appearing — and only then the line that closes it and
 * the products underneath.
 */
export function useCapabilityAnimation(refs: CapabilityAnimationRefs) {
  const { sectionRef, introRef, flip } = refs;

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      /* The opening travels the same way the section does. */
      enterIntro(introRef.current, section, "axis", {
        start: "top 72%",
        dir: flip ? -1 : 1,
      });

      if (prefersReduced()) return;

      const q = <E extends Element>(sel: string) =>
        Array.from(section.querySelectorAll<E>(sel));

      const items = q<HTMLElement>(".cap-item");
      const panel = section.querySelector(".cap-panel");
      const steps = q<HTMLElement>(".cap-step");
      const close = section.querySelector(".cap-close");
      const powered = section.querySelector(".cap-powered");

      const tl = gsap.timeline({
        defaults: { ease: EASE.in, duration: T.base },
        scrollTrigger: { trigger: section, start: "top 58%", once: true },
      });

      /* Each outcome grows out of the hairline on its left rather than
         sliding past it — the rule is the thing they are attached to. */
      if (items.length) {
        tl.from(items, {
          opacity: 0,
          scaleX: 0.96,
          transformOrigin: "left center",
          stagger: 0.06,
          duration: T.quick,
        });
      }
      /* The panel comes in from whichever side it is on — but only where
         it actually has a side. Stacked, it simply arrives. */
      if (panel) {
        tl.from(
          panel,
          isSplit()
            ? { opacity: 0, x: flip ? -28 : 28, duration: T.slow }
            : { opacity: 0, y: 20, duration: T.slow },
          0.1,
        );
      }
      /* Down the spine, in order. The dot lands and the step follows it,
         so the eye is walked along the flow instead of being handed four
         rows at once. */
      steps.forEach((step, i) => {
        const dot = step.querySelector(":scope > span:first-child");
        const label = step.querySelector(":scope > span:last-child");
        const at = 0.5 + i * 0.14;
        tl.from(dot, { opacity: 0, scale: 0.4, duration: T.quick }, at);
        tl.from(label, { opacity: 0, y: 8, duration: T.quick }, at + 0.05);
      });
      const after = 0.5 + steps.length * 0.14;
      if (close) tl.from(close, { opacity: 0, y: 10 }, after);
      if (powered) tl.from(powered, { opacity: 0 }, after + 0.15);
    },
    { scope: sectionRef },
  );
}
