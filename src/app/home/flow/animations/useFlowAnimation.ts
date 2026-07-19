import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";

interface FlowAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  introRef: RefObject<HTMLDivElement | null>;
  outroRef: RefObject<HTMLParagraphElement | null>;
  onComplete: () => void;
}

/**
 * Signature pattern 06 — Business Journey.
 * Each stage activates, the connection reaches the next stage, and
 * the completed flow remains in its connected state. Plays once —
 * never replays (per the section spec).
 */
export function useFlowAnimation(refs: FlowAnimationRefs) {
  const { sectionRef, introRef, outroRef, onComplete } = refs;

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const nodes = gsap.utils.toArray<HTMLElement>(".flow-node");
      const titles = gsap.utils.toArray<HTMLElement>(".flow-title");

      const activateInstantly = () => {
        gsap.set(nodes, {
          borderColor: "#0077b6",
          color: "#0077b6",
          backgroundColor: "#f0fbfe",
        });
        gsap.set(titles, { color: "#03045e" });
        gsap.set([".flow-fill-x", ".flow-fill-y"], { scaleX: 1, scaleY: 1 });
        gsap.set(outroRef.current, { opacity: 1 });
        onComplete();
      };

      if (prefersReducedMotion) {
        // Same information, no motion.
        activateInstantly();
        return;
      }

      gsap.from(introRef.current ? introRef.current.children : [], {
        opacity: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 55%",
        },
        onComplete,
      });

      const stepCount = nodes.length;

      nodes.forEach((node, i) => {
        // Stage activates…
        tl.to(
          node,
          {
            borderColor: "#0077b6",
            color: "#0077b6",
            backgroundColor: "#f0fbfe",
            duration: 0.35,
          },
          i === 0 ? "+=0.2" : ">-0.05",
        );
        tl.to(titles[i], { color: "#03045e", duration: 0.35 }, "<");

        // …then the connection travels to the next stage.
        if (i < stepCount - 1) {
          const progress = (i + 1) / (stepCount - 1);
          tl.to(".flow-fill-x", { scaleX: progress, duration: 0.45 }, ">-0.1");
          tl.to(".flow-fill-y", { scaleY: progress, duration: 0.45 }, "<");
        }
      });

      // The outcome message — calm, and it stays.
      tl.to(outroRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "+=0.2");
    },
    { scope: sectionRef },
  );
}
