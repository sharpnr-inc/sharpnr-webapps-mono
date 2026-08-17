import { useEffect, useRef, type RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/configs/gsap";
import { prefersReduced } from "@/app/home/shared/motion";

/**
 * One strip, travelling.
 *
 * Animated by transform on a single track — never by scroll position and
 * never per item. A per-item tween of thirty labels is thirty tweens
 * fighting for the same frame; one transform on one element is one.
 *
 * Rules this obeys, each of which has cost this project something before:
 *
 *   The loop is never on an entrance timeline. An infinitely-repeating
 *   child leaves its parent with no finite duration and silently breaks
 *   `toggleActions`. It is its own timeline, and a ScrollTrigger pauses it
 *   whenever the section is off screen — a marquee tweening against
 *   something nobody is looking at is wasted frames on every device.
 *
 *   Reduced motion gets no transform at all. The strip stays a wrapped,
 *   fully readable row; CSS drops the duplicate copy and unwraps the
 *   track. A *paused* marquee is the wrong answer — it strands whatever
 *   names happen to sit past the edge.
 *
 *   Duration is derived from width, not fixed, so a sector with four
 *   categories and one with six travel at the same speed rather than in
 *   the same time.
 */
export function useCategoryTickerAnimation(
  rootRef: RefObject<HTMLElement | null>,
  direction: "ltr" | "rtl",
  /** How many presentational repeats are in the DOM. Rebuilds the tween
   *  when the strip is re-measured, so the travel and the copies can never
   *  disagree — that disagreement is what puts a gap on screen. */
  repeats: number,
) {
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || prefersReduced() || repeats < 1) return;

      const track = root.querySelector<HTMLElement>(".ind-ticker-track");
      const first = root.querySelector<HTMLElement>(".ind-ticker-copy");
      if (!track || !first) return;

      /* Travel is exactly one list-width, never the track's width: that is
         what puts the seam where an identical copy already is. */
      const span = first.offsetWidth;
      if (!span) return;

      /* 42 pixels a second. Slow enough to read a name as it passes, which
         is the only reason the strip exists. */
      const duration = span / 42;

      const tween =
        direction === "rtl"
          ? gsap.fromTo(
              track,
              { x: 0 },
              { x: -span, duration, ease: "none", repeat: -1 },
            )
          : gsap.fromTo(
              track,
              { x: -span },
              { x: 0, duration, ease: "none", repeat: -1 },
            );

      tween.pause();
      tweenRef.current = tween;

      ScrollTrigger.create({
        trigger: root,
        start: "top 95%",
        end: "bottom 5%",
        onEnter: () => tween.play(),
        onEnterBack: () => tween.play(),
        onLeave: () => tween.pause(),
        onLeaveBack: () => tween.pause(),
      });
    },
    { scope: rootRef, dependencies: [direction, repeats], revertOnUpdate: true },
  );

  /* Pause on hover, so a name a visitor is actually reading stops moving.
     Bound here rather than through React props so the tween the handlers
     close over is always the live one. */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const stop = () => tweenRef.current?.pause();
    const go = () => tweenRef.current?.play();

    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", go);
    root.addEventListener("focusin", stop);
    root.addEventListener("focusout", go);
    return () => {
      root.removeEventListener("mouseenter", stop);
      root.removeEventListener("mouseleave", go);
      root.removeEventListener("focusin", stop);
      root.removeEventListener("focusout", go);
    };
  }, [rootRef]);
}
