import type { RefObject } from "react";
import { gsap, useGSAP } from "@/configs/gsap";
import { prefersReduced, revealOnce } from "@/app/home/shared/motion";
import { animeWordsOnEnter } from "@/app/home/shared/reveal";

interface CapabilitiesAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  headingRef: RefObject<HTMLHeadingElement | null>;
  copyRef: RefObject<HTMLParagraphElement | null>;
  flowRef: RefObject<HTMLDivElement | null>;
}

/**
 * One event, travelling the whole chain once. Reversible.
 *
 * The moment the section is seen: every node and connector fades in, then a
 * badge appears at the first node, travels the first connector, arrives
 * (that node lights, briefly), and the next badge takes over — in turn,
 * left to right, ending settled at the last node. It runs once and never
 * loops, same as Scene 04's highlight sweep. Scrolling back up above the
 * section reverses the whole sequence.
 */
export function useCapabilitiesAnimation(refs: CapabilitiesAnimationRefs) {
  const { sectionRef, headingRef, copyRef, flowRef } = refs;

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      animeWordsOnEnter(headingRef.current, section);
      if (copyRef.current) revealOnce(copyRef.current, section, { delay: 0.15 });
      if (prefersReduced() || !flowRef.current) return;

      const nodes = Array.from(flowRef.current.querySelectorAll<HTMLElement>(".hp-flow-node"));
      const connectors = Array.from(
        flowRef.current.querySelectorAll<HTMLElement>(".hp-flow-connector"),
      );
      const badges = Array.from(flowRef.current.querySelectorAll<HTMLElement>(".hp-flow-badge"));
      if (!nodes.length) return;

      // The chain runs left-to-right on desktop and top-to-bottom on
      // phones (see .hp-flow), so the badge has to travel the matching
      // axis — animating `left` on a vertical connector would send it
      // sideways off the line.
      const horizontal = window.matchMedia("(width >= 48rem)").matches;
      const axis = horizontal ? "left" : "top";
      gsap.set(badges, { opacity: 0, [axis]: "0%" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: flowRef.current,
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from([...nodes, ...connectors], {
        opacity: 0,
        y: 12,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.08,
      });

      badges.forEach((badge, i) => {
        tl.to(nodes[i], { borderColor: "rgba(0, 180, 216, 0.55)", backgroundColor: "rgba(0, 180, 216, 0.05)", duration: 0.3 })
          .to(badge, { opacity: 1, duration: 0.25 }, "<")
          .to(badge, { [axis]: "100%", duration: 0.9, ease: "power1.inOut" }, "<")
          .to(nodes[i], { borderColor: "rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.02)", duration: 0.3 }, ">-0.2")
          .to(nodes[i + 1], { borderColor: "rgba(0, 180, 216, 0.55)", backgroundColor: "rgba(0, 180, 216, 0.05)", duration: 0.3 }, "<")
          .to(badge, { opacity: 0, duration: 0.25 }, "<");
      });
    },
    { scope: sectionRef },
  );
}
