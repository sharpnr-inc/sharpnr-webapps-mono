import { useGSAP, gsap, SplitText, ScrollTrigger } from "@/animations/gsap";
import type { SharpnrPlatformIntroRefs } from "./types";
import { phaseHeadingReveal } from "./phaseHeadingReveal";
import { phaseHeadingPin } from "./phaseHeadingPin";
import { phaseFeatures } from "./phaseFeatureSection";

export function useSharpnrPlatformIntro({
  mainContainerRef,
  headingRef,
  headingWrapperRef,
  explainerItemRefs,
  cardItemRefs,
}: SharpnrPlatformIntroRefs) {
  useGSAP(
    () => {
      const heading = headingRef.current;
      const headingWrapper = headingWrapperRef.current;
      if (!heading || !headingWrapper) return;

      const split = SplitText.create(heading, { type: "lines" });
      const lines = split.lines.length > 0 ? split.lines : [heading];

      // Total timeline units:
      // 0.0 → 0.5  : heading reveal
      // 0.5 → 1.0  : heading shrinks to top-left
      // 1.0 → 5.0  : 4 features × 1 unit each
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainContainerRef.current,
          start: "top top",
          end: "bottom bottom", // 600vh drives this
          scrub: 2, // higher = smoother/lazier scrub
          pin: true,
          pinSpacing: false,
          pinType: "transform",
          invalidateOnRefresh: true,
          markers: true,
        },
      });

      // Phase 1 — heading lines burst up from clip mask
      phaseHeadingReveal(tl, lines, { at: 0, duration: 0.5 });

      // Phase 2 — heading shrinks to top-left corner
      phaseHeadingPin(tl, headingWrapper, heading, { at: 0.5, duration: 0.5 });

      // Phase 3 — features scroll one by one
      phaseFeatures(tl, explainerItemRefs.current, cardItemRefs.current, {
        at: 1,
        duration: 0.4,
      });

      ScrollTrigger.refresh();
      return () => {
        split.revert();
        tl.kill();
      };
    },
    { scope: mainContainerRef },
  );
}
