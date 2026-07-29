import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import { prefersReduced } from "@/app/home/shared/motion";

/**
 * The datum down the side of the whole roadmap run.
 *
 * One element, scrubbed once across every preview — not a transition
 * played on each section's entry. An entry animation repeated seven times
 * is the thing that makes a long page feel restless, and it says nothing:
 * seven separate hand-offs are seven separate claims. One line that never
 * breaks between sections is the page's actual argument — one foundation
 * under every industry — stated geometrically instead of in copy, and it
 * is the same device as the platform slab in `PlatformMap.tsx` and the
 * unbroken line under the ecosystem band.
 *
 * Scrubbed, with `ease: "none"`, because a scrubbed tween is driven by the
 * scroll position and any easing on top of it fights the scroll rather
 * than shaping it.
 */
export function usePreviewSpineAnimation(runRef: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const run = runRef.current;
      if (!run) return;

      const fill = run.querySelector<HTMLElement>(".ind-spine-fill");
      if (!fill) return;

      /* Reduced motion: the datum is simply there, full length. It is
         structure, so it must not depend on the scroll to exist. */
      if (prefersReduced()) {
        gsap.set(fill, { scaleY: 1 });
        return;
      }

      gsap.fromTo(
        fill,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: run,
            start: "top 80%",
            end: "bottom 65%",
            scrub: true,
          },
        },
      );
    },
    { scope: runRef },
  );
}
