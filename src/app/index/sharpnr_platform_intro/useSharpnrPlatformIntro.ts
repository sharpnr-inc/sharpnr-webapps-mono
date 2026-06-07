import { useGSAP, gsap, SplitText, ScrollTrigger } from "@/animations/gsap";
import type { SharpnrPlatformIntroRefs } from "./types";
import { phaseHeadingReveal } from "./phaseHeadingReveal";
import { phaseSubtitle } from "./phaseSubtitle";
import { phaseImageReveal } from "./phaseImageReveal";
import { phaseScaleToCorner } from "./phaseScaleToCorner";
import { phaseCards } from "./phaseCards";
import { phaseStats } from "./phaseStats";
import { phaseBottomCopy } from "./phaseBottomCopy";

export function useSharpnrPlatformIntro({
  mainContainerRef,
  stickyContainerRef,
  headingRef,
  headingWrapRef,
  subtitleRef,
  cardsRef,
  statsRef,
  imageRef,
  bottomCopyRef,
}: SharpnrPlatformIntroRefs) {
  useGSAP(
    () => {
      const heading = headingRef.current;
      if (!heading) return;

      const split = SplitText.create(heading, { type: "lines" });
      const lines = split.lines.length > 0 ? split.lines : [heading];

      // One timeline scrubbed across the full 500vh.
      // Each phase `at` is a progress value 0–1 mapped to scroll distance.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainContainerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
          pin: stickyContainerRef.current,
          pinSpacing: true,
          pinType: "transform",
          invalidateOnRefresh: true,
          markers: true, // Temporarily enabled for debugging
        },
      });

      // ── Phase 1 (0.00): heading lines wipe up ──────────────────────────
      phaseHeadingReveal(tl, lines, { at: 0, duration: 0.3 });

      // ── Phase 2 (0.10): subtitle fades in ──────────────────────────────
      phaseSubtitle(tl, subtitleRef.current, { at: 0.1, duration: 0.2 });

      // ── Phase 3 (0.25): image wipes in from bottom ─────────────────────
      phaseImageReveal(tl, imageRef.current, { at: 0.25, duration: 0.25 });

      // ── Phase 4 (0.45): heading shrinks to top-left corner ─────────────
      phaseScaleToCorner(tl, headingWrapRef.current, {
        at: 0.45,
        duration: 0.3,
      });

      // ── Phase 5 (0.60): cards stagger up ───────────────────────────────
      phaseCards(tl, cardsRef.current, {
        at: 0.6,
        duration: 0.2,
        stagger: 0.06,
      });

      // ── Phase 6 (0.75): stats count up ─────────────────────────────────
      phaseStats(tl, statsRef.current, { at: 0.75, duration: 0.2 });

      // ── Phase 7 (0.88): bottom copy ────────────────────────────────────
      phaseBottomCopy(tl, bottomCopyRef.current, { at: 0.88, duration: 0.15 });

      ScrollTrigger.refresh();

      return () => {
        split.revert();
        tl.kill();
      };
    },
    { scope: mainContainerRef },
  );
}
