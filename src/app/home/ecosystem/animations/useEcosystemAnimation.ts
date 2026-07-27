import type { RefObject } from "react";
import { gsap, useGSAP } from "@/configs/gsap";
import { prefersReduced, revealOnce } from "@/app/home/shared/motion";
import { animeWordsOnEnter } from "@/app/home/shared/reveal";
import { SPINE_X, SPINE_LEN, CONSEQUENCES } from "../cascade";

interface EcosystemAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  headingRef: RefObject<HTMLHeadingElement | null>;
  copyRef: RefObject<HTMLParagraphElement | null>;
  fieldRef: RefObject<HTMLDivElement | null>;
}

const RUN = 3.4;

/**
 * One action, and everything it sets off. Reversible.
 *
 * The charge runs the spine once; each consequence fires at the exact
 * moment the charge reaches its junction, so the branch is visibly *caused*
 * rather than merely appearing on a stagger. That timing is the whole
 * argument — a staggered reveal would say "here are five things", this says
 * "this one action did all five".
 *
 * Scrolling back up above the section reverses the whole cascade.
 */
export function useEcosystemAnimation(refs: EcosystemAnimationRefs) {
  const { sectionRef, headingRef, copyRef, fieldRef } = refs;

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      animeWordsOnEnter(headingRef.current, section);
      if (copyRef.current) revealOnce(copyRef.current, section, { delay: 0.15 });
      if (prefersReduced() || !fieldRef.current) return;

      const field = fieldRef.current;
      const spine = field.querySelector<HTMLElement>(".hp-casc-spine");
      const head = field.querySelector<HTMLElement>(".hp-casc-head");
      const origin = field.querySelector<HTMLElement>(".hp-casc-origin");
      const branches = Array.from(field.querySelectorAll<HTMLElement>(".hp-casc-branch"));
      const junctions = Array.from(field.querySelectorAll<HTMLElement>(".hp-casc-junction"));
      const outs = Array.from(field.querySelectorAll<HTMLElement>(".hp-casc-out"));
      const done = field.querySelector<HTMLElement>(".hp-casc-done");

      gsap.set(branches, { scaleY: 0 });
      gsap.set(junctions, { opacity: 0, scale: 0 });
      gsap.set(outs, { opacity: 0 });
      gsap.set(done ?? {}, { opacity: 0 });
      gsap.set(head ?? {}, { opacity: 0, x: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: field,
          start: "top 74%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(origin ?? {}, { opacity: 0, scale: 0.9, duration: 0.5, ease: "power2.out" })
        .from(spine ?? {}, { scaleX: 0, transformOrigin: "left", duration: 0.6, ease: "power2.out" }, "-=0.2")
        .addLabel("run")
        .to(head ?? {}, { opacity: 1, duration: 0.2 }, "run")
        .to(
          head ?? {},
          { x: (SPINE_LEN / 100) * field.clientWidth - 34, duration: RUN, ease: "none" },
          "run",
        )
        .to(head ?? {}, { opacity: 0, duration: 0.3 }, `run+=${RUN - 0.3}`);

      // Each consequence fires as the charge passes its junction, not on a
      // stagger — the position along the spine is what sets the timing.
      // The node flares as it is struck and eases back down, so the charge
      // is visibly the cause rather than a coincidence of timing.
      CONSEQUENCES.forEach((c, i) => {
        const at = ((c.x - SPINE_X) / SPINE_LEN) * RUN;
        tl.to(junctions[i], { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(2)" }, `run+=${at}`)
          .call(
            () => {
              junctions[i].classList.add("is-live");
              outs[i].classList.add("is-live");
            },
            undefined,
            `run+=${at}`,
          )
          .call(
            () => {
              junctions[i].classList.remove("is-live");
              outs[i].classList.remove("is-live");
            },
            undefined,
            `run+=${at + 0.9}`,
          )
          .to(branches[i], { scaleY: 1, duration: 0.4, ease: "power2.out" }, `run+=${at + 0.05}`)
          .to(outs[i], { opacity: 1, duration: 0.4, ease: "power2.out" }, `run+=${at + 0.15}`);
      });

      // Closure once the run completes.
      tl.to(done ?? {}, { opacity: 1, duration: 0.5, ease: "power2.out" }, `run+=${RUN + 0.1}`);

      // Reversing the timeline cannot undo a class, so clear them by hand.
      tl.eventCallback("onReverseComplete", () => {
        junctions.forEach((j) => j.classList.remove("is-live"));
        outs.forEach((o) => o.classList.remove("is-live"));
      });
    },
    { scope: sectionRef },
  );
}
