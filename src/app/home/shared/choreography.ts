/*
 * The page's shared motion vocabulary.
 *
 * Every scene used to hand-roll its own tweens, so the same idea — a
 * heading arriving, a block settling, a rule drawing — was expressed with a
 * different duration and easing each time. That reads as several people's
 * work rather than one product. These are the agreed moves; a scene should
 * reach for one of them before writing a bespoke tween.
 *
 * Two rules the whole file exists to enforce:
 *
 *   1. One easing family. `power3.out` for arrivals, `power2.inOut` for
 *      anything that draws, `none` for anything scrubbed. Mixing eases is
 *      the fastest way to make a page feel unresolved.
 *
 *   2. Never animate a property CSS is also transitioning on the same
 *      element. Tailwind's bare `transition` covers opacity and transform,
 *      and when GSAP writes those too the two fight and the element settles
 *      at the wrong value — it has blanked two sections in this project
 *      already. Scenes use `transition-colors` / `transition-transform`.
 */
import { ScrollTrigger, gsap } from "@/configs/gsap";
import { prefersReduced } from "./motion";

/** The one duration scale. Everything on the page is one of these. */
export const T = {
  quick: 0.35,
  base: 0.55,
  slow: 0.85,
  draw: 0.9,
} as const;

export const EASE = {
  in: "power3.out",
  draw: "power2.inOut",
  settle: "sine.out",
} as const;

/** The stagger that reads as "one after another" without feeling slow. */
export const STAGGER = 0.07;

interface EnterOptions {
  /** Where in the viewport the scene starts. */
  start?: string;
  /** Hold everything back — used where a visual must land before the copy. */
  delay?: number;
  /** Replay whenever the scene is re-entered. Off by default: repeating an
   *  entrance every scroll-past is what makes a page feel restless. */
  repeat?: boolean;
}

/**
 * A scene's entrance timeline.
 *
 * Returns a paused-until-scrolled timeline the caller fills in. Centralising
 * the ScrollTrigger means every scene starts at the same point in the
 * viewport, which is most of what makes a long page feel evenly paced.
 */
export function sceneTimeline(trigger: Element, o: EnterOptions = {}) {
  return gsap.timeline({
    defaults: { ease: EASE.in, duration: T.base },
    delay: o.delay ?? 0,
    scrollTrigger: {
      trigger,
      start: o.start ?? "top 74%",
      ...(o.repeat
        ? { toggleActions: "play none none reverse" }
        : { once: true }),
    },
  });
}

/**
 * Words arriving one at a time.
 *
 * The site's headings are pre-split into `.hp-word` spans by the `Words`
 * component, so nothing mutates React's DOM at runtime — a SplitText-style
 * rewrite would be undone by the next render.
 */
export function words(el: Element | null) {
  if (!el) return [];
  return gsap.utils.toArray<HTMLElement>(".hp-word", el);
}

/** Set a heading to its pre-reveal state. Safe to call before layout. */
export function armWords(el: Element | null) {
  const w = words(el);
  if (w.length) gsap.set(w, { opacity: 0, yPercent: 40 });
  return w;
}

/** Play a heading in. Returns the tween so it can be positioned in a
 *  timeline. */
export function revealWords(el: Element | null, delay = 0) {
  const w = words(el);
  if (!w.length) return null;
  return gsap.to(w, {
    opacity: 1,
    yPercent: 0,
    duration: T.slow,
    ease: "expo.out",
    stagger: 0.038,
    delay,
  });
}

/**
 * Draw an SVG path from nothing.
 *
 * The dash is measured per path, so a short run and a long one draw at the
 * same *rate* rather than in the same time — a single hardcoded dash value
 * makes short segments snap and long ones crawl.
 */
export function armDraw(paths: SVGPathElement[] | SVGLineElement[]) {
  paths.forEach((p) => {
    const len = typeof p.getTotalLength === "function" ? p.getTotalLength() : 0;
    if (len) gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
  });
}

export const drawVars = {
  strokeDashoffset: 0,
  duration: T.draw,
  ease: EASE.draw,
  stagger: 0.05,
} as const;

/**
 * An ambient loop, kept off the entrance timeline.
 *
 * An infinitely-repeating child leaves a timeline with no finite duration,
 * which silently breaks `toggleActions: "...reverse"`. It also pauses while
 * the scene is off screen — a loop tweening against something nobody is
 * looking at is wasted frames on every device.
 */
export function ambient(
  trigger: Element,
  build: (tl: gsap.core.Timeline) => void,
) {
  if (prefersReduced()) return null;
  const tl = gsap.timeline({ repeat: -1, paused: true });
  build(tl);
  ScrollTrigger.create({
    trigger,
    start: "top 90%",
    end: "bottom 10%",
    onEnter: () => tl.play(),
    onEnterBack: () => tl.play(),
    onLeave: () => tl.pause(),
    onLeaveBack: () => tl.pause(),
  });
  return tl;
}
