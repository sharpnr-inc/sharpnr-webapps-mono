import type { RefObject } from "react";

export interface SharpnrPlatformIntroRefs {
  mainContainerRef: RefObject<HTMLDivElement | null>;
  headingRef: RefObject<HTMLHeadingElement | null>;
  headingWrapperRef: RefObject<HTMLDivElement | null>;
  explainerItemRefs: RefObject<(HTMLDivElement | null)[]>;
  cardItemRefs: RefObject<(HTMLDivElement | null)[]>;
}

export interface PhaseConfig {
  at?: gsap.Position;
  onStart?: () => void;
  onComplete?: () => void;
}
