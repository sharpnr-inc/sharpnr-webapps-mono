import { useGSAP, gsap, SplitText } from "@/animations/gsap";
import type { SharpnrPlatformIntroRefs } from "./types";
import { phaseReveal } from "./phaseReveal";
import { phaseScaleToCorner } from "./phaseScaleToCorner";

export function useSharpnrPlatformIntro({
  mainContainerRef,
  headingRef,
}: SharpnrPlatformIntroRefs) {
  useGSAP(
    () => {
      const heading = headingRef.current;
      if (!heading) return;

      const split = SplitText.create(heading, { type: "lines" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainContainerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          pin: true,
          markers: true,
        },
      });

      // ── Phases — add, remove, or reorder here ──────────────────────────
      phaseReveal(tl, split.lines);
      phaseScaleToCorner(tl, heading);
      // phaseContentReveal(tl, cardRefs);   ← next phase goes here
      // phaseExit(tl, stickyRef.current);   ← and so on
    },
    { scope: mainContainerRef },
  );
}
