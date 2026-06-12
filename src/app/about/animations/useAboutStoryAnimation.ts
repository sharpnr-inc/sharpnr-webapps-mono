import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";

interface AboutStoryAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  storyRef: RefObject<HTMLDivElement | null>;
  pillarsRef: RefObject<HTMLDivElement | null>;
}

export function useAboutStoryAnimation(refs: AboutStoryAnimationRefs) {
  const { sectionRef, storyRef, pillarsRef } = refs;

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      // ── Phase 1: Story paragraphs reveal ───────────────────────
      gsap.from(storyRef.current ? storyRef.current.children : [], {
        opacity: 0,
        y: 28,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: storyRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // ── Phase 2: Pillars rise in ───────────────────────────────
      gsap.from(pillarsRef.current ? pillarsRef.current.children : [], {
        opacity: 0,
        y: 36,
        duration: 0.65,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: pillarsRef.current,
          start: "top 84%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef },
  );
}
