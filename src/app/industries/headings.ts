import { ScrollTrigger } from "@/configs/gsap";
import { armWords, revealWords } from "@/app/home/shared/choreography";
import { prefersReduced } from "@/app/home/shared/motion";

/**
 * Play every dual-colour heading inside `root` through the site's one word
 * reveal.
 *
 * Centralised for the same reason `choreography.ts` exists: when each
 * section rolls its own heading tween, the same idea arrives with a
 * different duration and easing every time, and a long page reads as
 * several people's work. Line two follows line one by a beat, which is the
 * whole of the choreography — the two-colour break is the emphasis, so the
 * motion does not need to add any.
 *
 * Under reduced motion nothing is armed. That matters: `armWords` sets the
 * words to opacity 0 immediately, so an early return *before* it is the
 * difference between a still heading and an invisible one.
 */
export function revealHeadings(root: Element | null) {
  if (!root || prefersReduced()) return;

  root.querySelectorAll<HTMLElement>(".ind-heading").forEach((heading) => {
    const l1 = heading.querySelector(".ind-heading-1");
    const l2 = heading.querySelector(".ind-heading-2");
    armWords(l1);
    armWords(l2);

    ScrollTrigger.create({
      trigger: heading,
      start: "top 84%",
      once: true,
      onEnter: () => {
        revealWords(l1);
        revealWords(l2, 0.12);
      },
    });
  });
}
