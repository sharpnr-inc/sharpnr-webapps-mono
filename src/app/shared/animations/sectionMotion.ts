/*
 * Section entrances, for the pages built on `SectionIntro`.
 *
 * ── The problem this file exists to solve ───────────────────────────────
 *
 * Fourteen sections across Platform, Services, Resources and About opened
 * with this, character for character:
 *
 *     gsap.from(introRef.current.children, {
 *       opacity: 0, y: 24, duration: 0.6, stagger: 0.12,
 *       ease: "power3.out",
 *       scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
 *     });
 *
 * Two things were wrong with it. The obvious one is that four pages read
 * as one template. The quieter one is that `introRef.current.children` is
 * a single element — the `SectionIntro` wrapper — so `stagger: 0.12` had
 * nothing to stagger and the label, the headline and the sentence all
 * arrived as one undifferentiated block. The stagger was decorative.
 *
 * ── What "different" means here ─────────────────────────────────────────
 *
 * Not different easing. design.md §8 fixes ONE easing family on purpose —
 * `power3.out` for arrivals, `power2.inOut` for anything that draws — and
 * a page where every section eases differently reads as unresolved, which
 * is a worse failure than sameness. Every move below uses that family.
 *
 * The difference is **what moves and in which direction**, which is the
 * same rule the eight Industries topologies are built on: if two sections'
 * timelines could be swapped without anyone noticing, they are one
 * animation wearing different words.
 *
 * ── Honouring reduced motion ────────────────────────────────────────────
 *
 * Everything here is `from`/`fromTo` off the element's real resting state,
 * and the whole module no-ops under `prefers-reduced-motion`. Nothing is
 * ever left parked at opacity 0 waiting for a trigger that will not fire —
 * a section that is invisible until an animation runs is permanently
 * invisible for those users, which is the worst outcome available.
 */
import { gsap } from "@/configs/gsap";
import { EASE, T } from "@/app/home/shared/choreography";
import { prefersReduced } from "@/app/home/shared/motion";

/**
 * The five ways a section may open.
 *
 * One easing family throughout; they differ by which part leads and along
 * which axis it travels.
 *
 *   rise     label → headline → sentence, each up from below.
 *            The site's plain arrival. Use where the section has no
 *            argument about direction to make.
 *
 *   lead     the headline first and alone; the label and the sentence
 *            then fade in around it without moving. The statement, then
 *            its framing — for sections whose heading IS the point.
 *
 *   wipe     the headline is uncovered left to right, like a line being
 *            ruled; the label slides in ahead of it, the sentence fades
 *            after. For sections about something being laid down.
 *
 *   drop     label and headline descend from above, the sentence rises
 *            from below, and the two close on each other. For sections
 *            about a thing meeting its foundation.
 *
 *   axis     everything enters horizontally from the leading edge, no
 *            vertical movement at all. For sections whose content runs
 *            along an axis — and `dir` flips it, so a page of alternating
 *            splits never opens the same way twice in a row.
 */
export type IntroMove = "rise" | "lead" | "wipe" | "drop" | "axis";

interface IntroOptions {
  /** Where in the viewport the section opens. */
  start?: string;
  /** 1 enters from the left, -1 from the right. `axis` only. */
  dir?: 1 | -1;
  /** Hold the whole opening back — used where a visual lands first. */
  delay?: number;
}

/**
 * The parts of a `SectionIntro`, in reading order, plus anything else the
 * caller wrapped alongside it.
 *
 * `trailing` is any direct child of the container that does not contain
 * the intro — a note under the lede, the diagram in the other half of a
 * split. It arrives last whatever the move, because it is always a
 * supporting element.
 */
function parts(container: Element) {
  const intro = container.querySelector(".sec-intro") ?? container;

  const pick = (sel: string) => {
    const el = intro.querySelector(sel);
    return el ? [el] : [];
  };

  const eyebrow = pick(".sec-eyebrow");
  const heading = pick(".sec-heading");
  const lede = pick(".sec-lede");

  const trailing = Array.from(container.children).filter(
    (child) => child !== intro && !child.contains(intro),
  );

  /* Markup that does not use SectionIntro at all — fall back to the
     container's own children so the caller still gets an entrance rather
     than silence. */
  const named = [...eyebrow, ...heading, ...lede];
  if (!named.length) {
    return {
      eyebrow: [] as Element[],
      heading: Array.from(container.children).slice(0, 1),
      lede: Array.from(container.children).slice(1),
      trailing: [] as Element[],
      any: Array.from(container.children).length > 0,
    };
  }

  return { eyebrow, heading, lede, trailing, any: true };
}

/**
 * Open a section.
 *
 * Returns the timeline so a caller can hang the section's own content off
 * the end of it, or null when there was nothing to move.
 */
export function enterIntro(
  container: Element | null,
  trigger: Element | null,
  move: IntroMove = "rise",
  o: IntroOptions = {},
) {
  if (!container || !trigger || prefersReduced()) return null;

  const { eyebrow, heading, lede, trailing, any } = parts(container);
  if (!any) return null;

  const tl = gsap.timeline({
    defaults: { ease: EASE.in, duration: T.base },
    delay: o.delay ?? 0,
    scrollTrigger: { trigger, start: o.start ?? "top 74%", once: true },
  });

  /* 18, not the 26 this started at. A horizontal entrance travels outside
     its container, and the page gutter is only 20px at 375 — anything
     wider than the gutter pushes the document sideways and puts a
     horizontal scrollbar on a phone. Measured, not guessed. */
  const x = 18 * (o.dir ?? 1);

  if (move === "lead") {
    tl.from(heading, { opacity: 0, y: 26, duration: T.slow });
    tl.from([...eyebrow, ...lede], { opacity: 0, stagger: 0.08 }, 0.28);
  } else if (move === "wipe") {
    tl.from(eyebrow, { opacity: 0, x: -14 }, 0);
    /* `from` a clip-path would have to tween back to the computed value,
       which is `none` and does not interpolate. fromTo both ends, then
       clear the property so nothing is left clipping the heading. */
    if (heading.length) {
      tl.fromTo(
        heading,
        { clipPath: "inset(0 100% -0.25em 0)" },
        {
          clipPath: "inset(0 0% -0.25em 0)",
          duration: T.slow,
          ease: EASE.draw,
          clearProps: "clipPath",
        },
        0.12,
      );
    }
    tl.from(lede, { opacity: 0 }, 0.55);
  } else if (move === "drop") {
    tl.from([...eyebrow, ...heading], {
      opacity: 0,
      y: -20,
      stagger: 0.08,
    });
    tl.from(lede, { opacity: 0, y: 20 }, 0.16);
  } else if (move === "axis") {
    tl.from([...eyebrow, ...heading, ...lede], {
      opacity: 0,
      x,
      stagger: 0.08,
    });
  } else {
    tl.from([...eyebrow, ...heading, ...lede], {
      opacity: 0,
      y: 22,
      stagger: 0.09,
    });
  }

  if (trailing.length) {
    tl.from(trailing, { opacity: 0, y: 16, stagger: 0.08 }, 0.35);
  }

  return tl;
}

/**
 * True once the two halves of a split are actually side by side.
 *
 * "Enters from the outer edge of its own column" only means anything
 * where there are columns. Below `lg` these sections are one stacked
 * column, and a 30px horizontal entrance there would both say nothing and
 * push the document past the 20px page gutter — a horizontal scrollbar on
 * a phone. Callers fall back to a vertical arrival below the breakpoint.
 *
 * Entrances play once, so a resize across the breakpoint afterwards
 * cannot strand anything: whatever has already arrived stays arrived.
 */
export const isSplit = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(min-width: 1024px)").matches;

/**
 * A rule drawing itself, with whatever sits on it.
 *
 * The hairlines on these pages are `border-t` on a real element, and a
 * border cannot be scaled on its own — so the element is uncovered from
 * one edge instead, which draws the rule and its content in one movement.
 *
 * `fromTo`, never a bare `set` + `to`: a `set` would clip the element the
 * moment the hook ran and leave it clipped until a trigger fired. Every
 * caller is already behind `prefersReduced`, and this keeps it true even
 * if one is not. `clearProps` matters too — a stale `inset()` would clip
 * anything the element later grows to hold.
 */
export function drawRule(
  tl: gsap.core.Timeline,
  targets: Element[],
  position: gsap.Position,
  vars: gsap.TweenVars = {},
) {
  if (!targets.length) return tl;
  return tl.fromTo(
    targets,
    { clipPath: "inset(0 100% 0 0)" },
    {
      clipPath: "inset(0 0% 0 0)",
      duration: T.draw,
      ease: EASE.draw,
      clearProps: "clipPath",
      ...vars,
    },
    position,
  );
}
