import { useGSAP, gsap, SplitText } from "@/animations/gsap";
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

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
        },
        (context) => {
          const { isMobile } = context.conditions as { isMobile: boolean };

          const split = SplitText.create(heading, { type: "lines" });
          const lines = split.lines.length > 0 ? split.lines : [heading];

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: mainContainerRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 2,
              pin: true,
              pinSpacing: false,
              pinType: "transform",
              invalidateOnRefresh: true,
            },
          });

          // Phase 1 — heading reveal
          phaseHeadingReveal(tl, lines, { at: 0, duration: 0.5 });

          // Phase 2 — heading shrinks and pins
          phaseHeadingPin(tl, headingWrapper, heading, {
            at: 0.5,
            duration: 0.5,
            paddingTop: isMobile ? "1rem" : "1.5rem",
            paddingLeft: isMobile ? "0" : "2rem",
            fontSize: isMobile ? "1.125rem" : "1.5rem",
            textAlign: isMobile ? "center" : "left",
            alignItems: "flex-start",
            justifyContent: isMobile ? "center" : "flex-start",
          });

          // Phase 3 — features
          phaseFeatures(tl, explainerItemRefs.current, cardItemRefs.current, {
            at: 1,
            duration: 0.4,
          });
        },
      );

      return () => {
        mm.revert();
      };
    },
    { scope: mainContainerRef },
  );
}
