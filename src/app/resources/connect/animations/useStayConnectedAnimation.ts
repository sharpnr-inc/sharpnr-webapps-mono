import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";
import { EASE, T } from "@/app/home/shared/choreography";
import { prefersReduced } from "@/app/home/shared/motion";
import { enterIntro } from "@/app/shared/animations/sectionMotion";

interface StayConnectedAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  introRef: RefObject<HTMLDivElement | null>;
}

/**
 * Lightweight and respectful — a gentle entrance, nothing more.
 *
 * The topics and the button under them had no entrance at all: a centred
 * heading arrived and then a row of six controls was simply there. The
 * chips now open outward from the middle of the row, which is where the
 * centred heading has just left the eye, and the action follows once
 * there is something to act on.
 *
 * Opening outward from the centre is this section's alone on the page.
 * Nothing here loops — it is the last thing before the page's close.
 */
export function useStayConnectedAnimation(refs: StayConnectedAnimationRefs) {
  const { sectionRef, introRef } = refs;

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      enterIntro(introRef.current, section, "wipe", { start: "top 72%" });

      if (prefersReduced()) return;

      const topics = gsap.utils.toArray<HTMLElement>(".connect-topic", section);
      const action = section.querySelector(".connect-action");

      const tl = gsap.timeline({
        defaults: { ease: EASE.in, duration: T.base },
        scrollTrigger: { trigger: section, start: "top 60%", once: true },
      });

      if (topics.length) {
        tl.from(topics, {
          opacity: 0,
          y: 12,
          duration: T.quick,
          stagger: { each: 0.05, from: "center" },
        });
      }
      if (action) {
        tl.from(Array.from(action.children), { opacity: 0, y: 12, stagger: 0.1 }, 0.35);
      }
    },
    { scope: sectionRef },
  );
}
