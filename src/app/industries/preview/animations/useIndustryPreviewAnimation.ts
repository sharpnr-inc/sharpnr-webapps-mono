import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import { EASE, T, ambient } from "@/app/home/shared/choreography";
import { prefersReduced } from "@/app/home/shared/motion";
import { revealHeadings } from "../../headings";
import { CYCLE } from "../topologies";

interface PreviewRefs {
  sectionRef: RefObject<HTMLElement | null>;
  headRef: RefObject<HTMLDivElement | null>;
  figureRef: RefObject<HTMLDivElement | null>;
}

/** The gap between one stage lighting and the next. */
const BEAT = 0.34;

/* Retail's orbit. One lap, and the range the count moves through — the
   floor is what the level bar reads as empty, not a claim about stock. */
const LAP = 9;
const STOCK_HIGH = CYCLE.stockHigh;
const STOCK_LOW = CYCLE.stockLow;
const STOCK_FLOOR = 176;

/**
 * One operational flow, played once.
 *
 * Three movements, in the order the figure argues: the runs draw, the
 * stages arrive, then a charge crosses the spine left to right and each
 * stage lights as it passes — the sequence being *travelled* rather than
 * merely listed. The band's line draws last, because "and this is what it
 * is made of" is a closing remark.
 *
 * Four things this file is careful about, every one of which has broken
 * something in this project before:
 *
 *   1. Nothing repeats forever. An infinitely-repeating child leaves the
 *      timeline with no finite duration and silently breaks its
 *      ScrollTrigger.
 *   2. The dash is measured per path, so a 40-unit run and an 860-unit
 *      spine draw at the same rate rather than in the same time.
 *   3. Both renderings are in the DOM and only one is laid out.
 *      getTotalLength on a display:none path returns 0, so a zero-length
 *      run is skipped rather than given a dash it can never clear.
 *   4. Nothing here is animated on a property Tailwind is also
 *      transitioning. The stacked nodes carry no bare `transition`.
 */
export function useIndustryPreviewAnimation(refs: PreviewRefs) {
  const { sectionRef, headRef, figureRef } = refs;

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      /* Reduced motion: everything is simply present and finished. The
         argument is structural, so it survives without the sequence. */
      if (prefersReduced()) return;

      const head = headRef.current;
      const root = figureRef.current;

      /* The heading goes through the site's one word reveal rather than a
         block fade, so it moves the way every other heading on the site
         moves. Everything else in the column is a block. */
      revealHeadings(section);

      if (head) {
        const blocks = Array.from(head.children).filter(
          (el) => !el.classList.contains("ind-heading"),
        );
        gsap.from(blocks, {
          opacity: 0,
          y: 16,
          duration: T.base,
          stagger: 0.1,
          ease: EASE.in,
          scrollTrigger: { trigger: section, start: "top 74%", once: true },
        });
      }

      if (!root) return;

      const nodes = Array.from(
        root.querySelectorAll<SVGGElement | HTMLElement>(".flow-node"),
      );
      const boxes = Array.from(
        root.querySelectorAll<SVGRectElement>(".flow-node-box"),
      );
      const caps = Array.from(root.querySelectorAll<Element>(".flow-cap"));
      const charge = root.querySelector<SVGCircleElement>(".flow-charge");
      const spine = root.querySelector<SVGPathElement>(".flow-spine");
      const bandPath = root.querySelector<SVGPathElement>("path.flow-band-line");
      const bandBar = root.querySelector<HTMLElement>("div.flow-band-line");

      const runs = [
        ...Array.from(root.querySelectorAll<SVGPathElement>(".flow-edge")),
        ...(spine ? [spine] : []),
      ];
      const drawable = runs.filter(
        (p) => typeof p.getTotalLength === "function" && p.getTotalLength() > 0,
      );
      drawable.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });

      const bandLen =
        bandPath && typeof bandPath.getTotalLength === "function"
          ? bandPath.getTotalLength()
          : 0;
      if (bandPath && bandLen) {
        gsap.set(bandPath, {
          strokeDasharray: bandLen,
          strokeDashoffset: bandLen,
        });
      }
      if (bandBar) gsap.set(bandBar, { scaleX: 0, transformOrigin: "0 50%" });

      gsap.set(nodes, { opacity: 0 });
      gsap.set(caps, { opacity: 0 });
      if (charge) gsap.set(charge, { opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: EASE.in, duration: T.base },
        scrollTrigger: { trigger: root, start: "top 80%", once: true },
      });

      /*
       * The motion belongs to the shape.
       *
       * If two sectors' timelines could be swapped without anyone
       * noticing, the two figures are still the same figure wearing
       * different labels — which is the failure this whole file exists to
       * avoid. So each topology gets the movement that is natural to it,
       * and the topology is read off the drawing rather than passed in, so
       * a figure can never end up playing another shape's timeline.
       */
      const topology =
        root.querySelector<SVGElement>("[data-topology]")?.dataset.topology ??
        "chain";

      const edges = Array.from(
        root.querySelectorAll<SVGPathElement>(".flow-edge"),
      ).filter((p) => p.getTotalLength?.() > 0);

      let closing: number;

      if (topology === "spine") {
        /* Healthcare. The record exists before any of it happens, so the
           long line draws first and on its own; the episodes then arch off
           it one at a time, and the line is still running after the last
           one returns. Nothing "completes". */
        const spineLen = spine?.getTotalLength() ?? 0;
        if (spine && spineLen) {
          tl.to(spine, {
            strokeDashoffset: 0,
            duration: 1,
            ease: EASE.draw,
          });
        }
        edges.forEach((edge, i) => {
          tl.to(
            edge,
            { strokeDashoffset: 0, duration: 0.5, ease: EASE.draw },
            0.75 + Math.floor(i / 2) * BEAT,
          );
        });
        nodes.forEach((node, i) => {
          tl.to(
            node,
            { opacity: 1, duration: T.quick },
            0.95 + i * BEAT,
          );
        });
        closing = 0.95 + nodes.length * BEAT;
      } else if (topology === "cycle") {
        /* Retail.
         *
         * The circuit builds run by run, around, until it arrives back
         * where it started. Then the charge *orbits* — continuously, as an
         * ambient loop rather than one lap that stops, because a cycle
         * that plays once and halts contradicts the thing it is drawing.
         *
         * And the count moves. It falls as the charge crosses Checkout and
         * climbs back as it comes round through Replenishment and
         * Warehouse, so the loop closing is something a visitor watches
         * happen to a number rather than a claim set in the middle of the
         * frame. Every lap ends on the value it started with, or the
         * figure would drift out of range on the third pass.
         */
        tl.to(edges, {
          strokeDashoffset: 0,
          duration: 0.55,
          ease: EASE.draw,
          stagger: 0.28,
        });
        tl.to(nodes, { opacity: 1, duration: T.quick, stagger: 0.24 }, 0.2);
        closing = 1.9;

        const orbit = root.querySelector<SVGPathElement>(".flow-orbit");
        const stockText = root.querySelector<SVGTextElement>(".flow-stock");
        const level = root.querySelector<SVGRectElement>(".flow-level");

        if (orbit && charge && orbit.getTotalLength() > 0) {
          gsap.set(charge, { opacity: 1 });
          if (level) gsap.set(level, { transformOrigin: "0% 50%" });

          const count = { v: STOCK_HIGH };
          const paint = () => {
            const n = Math.round(count.v);
            if (stockText && stockText.textContent !== String(n)) {
              stockText.textContent = String(n);
            }
            if (level) {
              gsap.set(level, {
                scaleX: (n - STOCK_FLOOR) / (STOCK_HIGH - STOCK_FLOOR),
              });
            }
          };

          ambient(root, (loop) => {
            loop.to(charge, {
              motionPath: {
                path: orbit,
                align: orbit,
                alignOrigin: [0.5, 0.5],
              },
              duration: LAP,
              ease: "none",
            });
            // Selling, on the way down the right side and across the till.
            loop.to(
              count,
              {
                v: STOCK_LOW,
                duration: LAP * 0.35,
                ease: "none",
                onUpdate: paint,
              },
              LAP * 0.25,
            );
            // Reordered, received, back on the shelf.
            loop.to(
              count,
              {
                v: STOCK_HIGH,
                duration: LAP * 0.3,
                ease: "none",
                onUpdate: paint,
              },
              LAP * 0.66,
            );
          });
        }
      } else if (topology === "reverse") {
        /* Digital Commerce. The channels converge inward first, the
           forward path runs left to right, and then — the point of the
           figure — the return path draws in the opposite direction,
           right to left, against everything that just happened. */
        const back = root.querySelector<SVGPathElement>(".flow-return");
        const backLen = back?.getTotalLength() ?? 0;
        if (back && backLen) {
          gsap.set(back, {
            strokeDasharray: backLen,
            strokeDashoffset: -backLen,
          });
        }
        tl.to(edges, {
          strokeDashoffset: 0,
          duration: 0.6,
          ease: EASE.draw,
          stagger: 0.06,
        });
        tl.to(nodes, { opacity: 1, duration: T.quick, stagger: 0.09 }, 0.35);
        if (back && backLen) {
          tl.to(
            back,
            { strokeDashoffset: 0, duration: 1.1, ease: EASE.draw },
            1.3,
          );
        }
        closing = 2.5;
      } else if (topology === "converge") {
        /* Manufacturing. Everything draws inward toward the join, the
           centre runs, and only then does it fan back out. Convergence
           first and divergence last is the shape; a simultaneous draw
           would have made it a diagram of nothing. */
        const half = Math.ceil(edges.length / 2);
        tl.to(edges.slice(0, 4), {
          strokeDashoffset: 0,
          duration: 0.7,
          ease: EASE.draw,
          stagger: 0.05,
        });
        tl.to(
          edges.slice(4, half + 2),
          { strokeDashoffset: 0, duration: 0.5, ease: EASE.draw, stagger: 0.1 },
          0.6,
        );
        tl.to(
          edges.slice(half + 2),
          { strokeDashoffset: 0, duration: 0.6, ease: EASE.draw, stagger: 0.07 },
          1.2,
        );
        tl.to(nodes, { opacity: 1, duration: T.quick, stagger: 0.1 }, 0.4);
        closing = 2.1;
      } else if (topology === "calendar") {
        /* Education. The grid is the year and it exists first; the
           cohorts then extend across it, each one further along than the
           one above. Bars grow from their own left edge — a fade would
           have said "three rectangles" rather than "time passing". */
        tl.to(edges, {
          strokeDashoffset: 0,
          duration: 0.8,
          ease: EASE.draw,
          stagger: 0.04,
        });
        if (spine && spine.getTotalLength() > 0) {
          tl.to(
            spine,
            { strokeDashoffset: 0, duration: 0.8, ease: EASE.draw },
            0.2,
          );
        }
        tl.to(nodes, { opacity: 1, duration: T.quick, stagger: 0.06 }, 0.5);
        const bars = Array.from(
          root.querySelectorAll<SVGRectElement>(".flow-bar"),
        );
        gsap.set(bars, { transformOrigin: "0% 50%", scaleX: 0 });
        tl.to(
          bars,
          { scaleX: 1, duration: 0.7, ease: EASE.draw, stagger: 0.16 },
          0.9,
        );
        closing = 2.2;
      } else if (topology === "parallel") {
        /* Professional Services. The bars extend rightward together and
           overlapping, because the overlap is the whole difficulty; the
           shared team draws underneath them last, once there is visibly
           something for it to be carrying. */
        tl.to(nodes, { opacity: 1, duration: T.quick, stagger: 0.06 });
        const bars = Array.from(
          root.querySelectorAll<SVGRectElement>(".flow-bar"),
        );
        gsap.set(bars, { transformOrigin: "0% 50%", scaleX: 0 });
        tl.to(
          bars,
          { scaleX: 1, duration: 0.75, ease: EASE.draw, stagger: 0.12 },
          0.25,
        );
        tl.to(
          edges,
          { strokeDashoffset: 0, duration: 0.5, ease: EASE.draw, stagger: 0.06 },
          0.9,
        );
        if (spine && spine.getTotalLength() > 0) {
          tl.to(
            spine,
            { strokeDashoffset: 0, duration: 0.9, ease: EASE.draw },
            1.2,
          );
        }
        closing = 2.2;
      } else if (topology === "nested") {
        /* Technology & Enterprise. Containment settles from the outside
           in — the enterprise, then its units, then the teams inside them
           — and nothing travels, because nothing here is a sequence. The
           identity layer draws last and everything reaches down to it. */
        gsap.set(nodes, { opacity: 0 });
        nodes.forEach((node, i) => {
          tl.to(node, { opacity: 1, duration: T.quick }, i * 0.12);
        });
        tl.to(
          edges,
          { strokeDashoffset: 0, duration: 0.5, ease: EASE.draw, stagger: 0.05 },
          nodes.length * 0.12,
        );
        if (spine && spine.getTotalLength() > 0) {
          tl.to(
            spine,
            { strokeDashoffset: 0, duration: 0.9, ease: EASE.draw },
            nodes.length * 0.12 + 0.2,
          );
        }
        closing = nodes.length * 0.12 + 1.2;
      } else {
        /* A chain. Everything draws, then one charge runs the spine from
           end to end and each stage lights as it passes. */
        if (drawable.length) {
          tl.to(drawable, {
            strokeDashoffset: 0,
            duration: 0.65,
            ease: EASE.draw,
            stagger: 0.03,
          });
        }
        tl.to(nodes, { opacity: 1, duration: T.quick, stagger: 0.05 }, 0.3);

        const start = 0.95;
        const travel = BEAT * Math.max(nodes.length - 1, 1);

        if (charge && spine && spine.getTotalLength() > 0) {
          tl.to(charge, { opacity: 1, duration: 0.12 }, start)
            .to(
              charge,
              {
                motionPath: {
                  path: spine,
                  align: spine,
                  alignOrigin: [0.5, 0.5],
                },
                duration: travel,
                ease: "power1.inOut",
              },
              start,
            )
            .to(charge, { opacity: 0, duration: 0.18 }, start + travel);
        }

        boxes.forEach((box, i) => {
          const at = start + i * BEAT;
          tl.to(box, { strokeOpacity: 0.95, duration: 0.16 }, at).to(
            box,
            { strokeOpacity: 0.55, duration: 0.4 },
            at + 0.36,
          );
        });

        closing = start + travel + 0.2;
      }

      // ── And this is what it is made of ──
      if (bandPath && bandLen) {
        tl.to(
          bandPath,
          { strokeDashoffset: 0, duration: T.draw, ease: EASE.draw },
          closing,
        );
      }
      if (bandBar) {
        tl.to(bandBar, { scaleX: 1, duration: T.draw, ease: EASE.draw }, closing);
      }
      if (caps.length) {
        tl.to(
          caps,
          { opacity: 1, duration: T.base, stagger: 0.06 },
          closing + 0.25,
        );
      }
    },
    { scope: sectionRef },
  );
}
