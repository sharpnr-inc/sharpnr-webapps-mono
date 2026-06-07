import type { RefObject } from "react";

export interface SharpnrPlatformIntroRefs {
  mainContainerRef: RefObject<HTMLDivElement | null>;
  stickyContainerRef: RefObject<HTMLDivElement | null>;
  headingRef: RefObject<HTMLHeadingElement | null>;
  headingWrapRef: RefObject<HTMLDivElement | null>;
  subtitleRef: RefObject<HTMLParagraphElement | null>;
  cardsRef: RefObject<HTMLDivElement | null>;
  statsRef: RefObject<HTMLDivElement | null>;
  imageRef: RefObject<HTMLDivElement | null>;
  bottomCopyRef: RefObject<HTMLDivElement | null>;
}

export interface PhaseConfig {
  at?: gsap.Position;
  onStart?: () => void;
  onComplete?: () => void;
}
