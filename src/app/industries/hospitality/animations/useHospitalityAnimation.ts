import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";
import { revealHeadings } from "@/app/industries/headings";

interface HospitalityAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  introRef: RefObject<HTMLDivElement | null>;
}

/** The guest journey unfolds; each completed moment activates the next. */
export function useHospitalityAnimation(refs: HospitalityAnimationRefs) {
  const { sectionRef, introRef } = refs;

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      /* Every dual-colour heading in the section, through the one shared
         word reveal — the section heading and all three sub-headings, so
         none of them sits still while the rest of the page moves. */
      revealHeadings(sectionRef.current);

      /* The heading is deliberately excluded: `revealHeadings` already owns
         its words, and a block fade over the top of that is two animations
         writing opacity on the same subtree. */
      const introBlocks = introRef.current
        ? Array.from(introRef.current.children).filter(
            (el) => !el.classList.contains("ind-heading"),
          )
        : [];

      gsap.from(introBlocks, {
        opacity: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
      });

      gsap.to(".hosp-fill", {
        scaleY: 1,
        duration: 2.4,
        ease: "power1.inOut",
        scrollTrigger: { trigger: ".hosp-step", start: "top 70%" },
      });

      gsap.utils.toArray<HTMLElement>(".hosp-step").forEach((step) => {
        gsap.from(step, {
          opacity: 0,
          y: 18,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: { trigger: step, start: "top 80%" },
        });
      });
    },
    { scope: sectionRef },
  );
}
