import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";
import { EASE, T } from "@/app/home/shared/choreography";
import { prefersReduced } from "@/app/home/shared/motion";
import { enterIntro } from "@/app/shared/animations/sectionMotion";

interface AdaptAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  introRef: RefObject<HTMLDivElement | null>;
  workflowsRef: RefObject<HTMLUListElement | null>;
}

/**
 * The operational experience transforms between industries while the
 * foundation stays perfectly still — the stillness is the message.
 *
 * Everything below the intro used to have no entrance at all: the trade
 * selector, the workspace and the foundation strip were simply present
 * while the heading above them arrived. Now the section is built bottom
 * up, and it carries the only downward-landing motion on this page — the
 * panel arrives, the shared foundation strip fades in *first* because it
 * is the thing that was always going to be there, and only then do the
 * workflow tiles descend onto it from above. Everything else on Platform
 * rises from below or travels sideways; here the top layer visibly lands
 * on a base that did not move to receive it.
 *
 * Nothing about the foundation is tweened again after that. `switchTo`
 * touches the workflow list and nothing else — animating the base, even a
 * flicker, would undercut the one claim the section makes.
 */
export function useAdaptAnimation(refs: AdaptAnimationRefs) {
  const { sectionRef, introRef, workflowsRef } = refs;

  const { contextSafe } = useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      /* The heading is uncovered left to right, like a line being ruled.
         This section is about what gets laid down over what stays put. */
      enterIntro(introRef.current, section, "wipe", { start: "top 72%" });

      if (prefersReduced()) return;

      const tabs = gsap.utils.toArray<HTMLElement>(".adapt-tab", section);
      const panel = section.querySelector(".adapt-panel");
      const base = section.querySelector(".adapt-base");
      const tiles = workflowsRef.current
        ? Array.from(workflowsRef.current.children)
        : [];

      const tl = gsap.timeline({
        defaults: { ease: EASE.in, duration: T.base },
        scrollTrigger: { trigger: section, start: "top 55%", once: true },
      });

      /* The trades run along a row, so they arrive along it. */
      if (tabs.length) {
        tl.from(tabs, { opacity: 0, x: -16, stagger: 0.06, duration: T.quick });
      }
      if (panel) tl.from(panel, { opacity: 0, y: 18 }, 0.2);
      /* The constant, before the thing that changes on top of it. */
      if (base) tl.from(base, { opacity: 0 }, 0.45);
      if (tiles.length) {
        tl.from(
          tiles,
          { opacity: 0, y: -16, stagger: 0.06, duration: T.quick },
          0.6,
        );
      }
    },
    { scope: sectionRef },
  );

  /** Fade the workflows out, swap the industry, settle the new ones in. */
  const switchTo = contextSafe((apply: () => void) => {
    const list = workflowsRef.current;

    if (!list || prefersReduced()) {
      apply();
      return;
    }

    gsap.to(list.children, {
      opacity: 0,
      y: 8,
      duration: 0.22,
      stagger: 0.03,
      ease: "power2.in",
      onComplete: () => {
        apply();
        /* The new trade lands from above, the same way the first one did
           — the base is still exactly where it was. */
        requestAnimationFrame(() => {
          gsap.fromTo(
            list.children,
            { opacity: 0, y: -10 },
            { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: EASE.in },
          );
        });
      },
    });
  });

  return { switchTo };
}
