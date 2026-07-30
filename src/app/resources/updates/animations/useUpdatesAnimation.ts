import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";
import { EASE, T } from "@/app/home/shared/choreography";
import { prefersReduced } from "@/app/home/shared/motion";
import { enterIntro } from "@/app/shared/animations/sectionMotion";

interface UpdatesAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  introRef: RefObject<HTMLDivElement | null>;
}

/**
 * Continuous progress — categories appear along a quiet rhythm.
 *
 * Each row is a name pinned to one edge and what changed pinned to the
 * other, so the two halves arrive from their own ends and meet in the
 * middle of the row. That is the section's sentence — always improving,
 * rarely announcing it — and it is the only motion on this page that
 * converges rather than travelling one way.
 *
 * The opening is the site's plain rise, deliberately: it is the argument
 * column of the page's only split, and every other section here now opens
 * some other way, so the ordinary one is free to sit where the ordinary
 * thing is being said.
 */
export function useUpdatesAnimation(refs: UpdatesAnimationRefs) {
  const { sectionRef, introRef } = refs;

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      enterIntro(introRef.current, section, "rise", { start: "top 72%" });

      if (prefersReduced()) return;

      const rows = gsap.utils.toArray<HTMLElement>(".update-cat", section);
      if (!rows.length) return;

      const names = rows
        .map((r) => r.querySelector("h3"))
        .filter((el): el is HTMLHeadingElement => el !== null);
      const lines = rows
        .map((r) => r.querySelector("p"))
        .filter((el): el is HTMLParagraphElement => el !== null);

      gsap
        .timeline({
          defaults: { ease: EASE.in, duration: T.base },
          scrollTrigger: { trigger: rows[0], start: "top 85%", once: true },
        })
        /* Small distances on purpose. These translate inside a column
           that only has the page gutter to spare, and anything larger
           would push a row past the container on a narrow viewport. */
        .from(names, { opacity: 0, x: -14, stagger: 0.07 })
        .from(lines, { opacity: 0, x: 14, stagger: 0.07 }, 0.08);
    },
    { scope: sectionRef },
  );
}
