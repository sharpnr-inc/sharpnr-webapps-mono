import type { RefObject } from "react";

export interface SharpnrPlatformIntroRefs {
  mainContainerRef: RefObject<HTMLDivElement | null>;
  headingRef: RefObject<HTMLHeadingElement | null>;
}

// ── Shape every phase function must follow ───────────────────────────────────
export interface PhaseConfig {
  /** Timeline position label/offset — same as GSAP's third argument */
  at?: gsap.Position;
}
