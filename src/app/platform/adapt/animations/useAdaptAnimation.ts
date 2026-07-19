import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";

interface AdaptAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  introRef: RefObject<HTMLDivElement | null>;
  workflowsRef: RefObject<HTMLUListElement | null>;
}

/**
 * The operational experience transforms between industries while the
 * foundation stays perfectly still — the stillness is the message.
 */
export function useAdaptAnimation(refs: AdaptAnimationRefs) {
  const { sectionRef, introRef, workflowsRef } = refs;

  const { contextSafe } = useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      gsap.from(introRef.current ? introRef.current.children : [], {
        opacity: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
      });
    },
    { scope: sectionRef },
  );

  /** Fade the workflows out, swap the industry, settle the new ones in. */
  const switchTo = contextSafe((apply: () => void) => {
    const list = workflowsRef.current;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!list || prefersReducedMotion) {
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
        // New industry workflows settle into the same workspace.
        requestAnimationFrame(() => {
          gsap.fromTo(
            list.children,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power3.out" },
          );
        });
      },
    });
  });

  return { switchTo };
}
