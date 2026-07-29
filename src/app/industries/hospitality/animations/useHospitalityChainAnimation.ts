import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import { EASE, T } from "@/app/home/shared/choreography";
import { SEQUENCE, STOCK_FROM, STOCK_TO } from "../chain";

interface ChainRefs {
  sectionRef: RefObject<HTMLElement | null>;
  chainRef: RefObject<HTMLDivElement | null>;
}

/* One beat of the causal chain. Every step is placed at an absolute time on
   the timeline rather than relative to the tween before it, so a step's
   decay can overlap the next step's arrival without pushing it later. The
   relative version of this ran for twenty-odd seconds; the whole point of
   the figure is that the systems respond at once. */
const BEAT = 0.62;

/** Where a node rests once the signal has passed through it — lit slightly
 *  above the untouched hairline, so the path the order took stays readable
 *  after the sequence ends. Never a glow: this is a static element. */
const TOUCHED = 0.55;

/**
 * One guest action travelling through the systems behind it.
 *
 * Three movements. The drawing builds — runs draw themselves with
 * stroke-dashoffset, then the nodes arrive. The causal chain plays once, in
 * order: POS, kitchen (and the station it staffs), inventory, accounting,
 * CRM, insights, IVA, with a charge running the connector ahead of each
 * step so the cause visibly reaches the effect, and the product in the
 * ecosystem band registering the same event as it happens. Then the band's
 * own line draws the full width — the closing statement, which is why it is
 * held back from the build.
 *
 * Four things this file is careful about, all of which have bitten this
 * project before:
 *
 *   1. Nothing here repeats forever. An infinitely-repeating child leaves
 *      the timeline with no finite duration and silently breaks its
 *      ScrollTrigger.
 *   2. The dash is measured per path, so a short run and a long one draw
 *      at the same rate rather than in the same time.
 *   3. Both the wide drawing and the stacked mobile version are in the
 *      DOM; only one is laid out. getTotalLength on a display:none path
 *      returns 0, so a zero-length run is skipped rather than set to a
 *      dash it can never clear.
 *   4. Neither rendering is animated on a property Tailwind is also
 *      transitioning — the mobile nodes carry no bare `transition`, so
 *      GSAP owns their border colour outright.
 */
export function useHospitalityChainAnimation(refs: ChainRefs) {
  const { sectionRef, chainRef } = refs;

  useGSAP(
    () => {
      const root = chainRef.current;
      if (!root) return;

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const nodes = Array.from(
        root.querySelectorAll<SVGGElement | HTMLElement>(".hosp-node"),
      );
      const notes = Array.from(
        root.querySelectorAll<Element>(".hosp-node-note"),
      );
      const ivaLines = Array.from(
        root.querySelectorAll<Element>(".hosp-iva-line"),
      );
      const charge = root.querySelector<SVGCircleElement>(".hosp-charge");
      const stocks = Array.from(root.querySelectorAll<Element>(".hosp-stock"));
      const ecoNames = Array.from(
        root.querySelectorAll<Element>(".hosp-eco-name"),
      );
      const ecoTicks = Array.from(
        root.querySelectorAll<Element>(".hosp-eco-tick"),
      );

      const byId = (id: string) =>
        nodes.filter((n) => n.getAttribute("data-node") === id);
      const ecoById = (id: string) =>
        Array.from(root.querySelectorAll<Element>(`[data-eco="${id}"]`));

      /* The band's line is one <path> in the drawing and one <div> in the
         stacked version; both are held back and drawn at the end. */
      const bandPath = root.querySelector<SVGPathElement>(
        "path.hosp-band-line",
      );
      const bandBar = root.querySelector<HTMLElement>("div.hosp-band-line");

      /* Reduced motion: the whole figure is simply present and finished.
         The argument is structural, so it survives without the sequence. */
      if (reduced) {
        gsap.set([...notes, ...ivaLines], { opacity: 1 });
        stocks.forEach((s) => (s.textContent = String(STOCK_TO)));
        return;
      }

      const edges = Array.from(
        root.querySelectorAll<SVGPathElement>(".hosp-edge"),
      );
      const drawable = edges.filter(
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
      gsap.set([...notes, ...ivaLines], { opacity: 0 });
      gsap.set(ecoNames, { fillOpacity: 0.34, opacity: 0.55 });
      if (charge) gsap.set(charge, { opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: EASE.in, duration: T.base },
        scrollTrigger: { trigger: root, start: "top 72%", once: true },
      });

      // ── The drawing builds ──
      if (drawable.length) {
        tl.to(drawable, {
          strokeDashoffset: 0,
          duration: 0.7,
          ease: EASE.draw,
          stagger: 0.035,
        });
      }
      tl.to(nodes, { opacity: 1, duration: T.quick, stagger: 0.035 }, 0.35);

      // ── The causal chain ──
      // One beat per step, each placed at an absolute time. The charge runs
      // the connector first, so the cause arrives before the effect lights.
      const start = 1.05;
      const stock = { v: STOCK_FROM };

      SEQUENCE.forEach((step, i) => {
        const at = start + i * BEAT;
        const run = step.via
          ? root.querySelector<SVGPathElement>(
              `.hosp-edge[data-edge="${step.via[0]}-${step.via[1]}"]`,
            )
          : null;

        if (charge && run && run.getTotalLength() > 0) {
          tl.set(charge, { opacity: 0 }, at)
            .to(charge, { opacity: 1, duration: 0.1 }, at)
            .to(
              charge,
              {
                motionPath: { path: run, align: run, alignOrigin: [0.5, 0.5] },
                duration: 0.36,
                ease: "power1.inOut",
              },
              at,
            )
            .to(charge, { opacity: 0, duration: 0.12 }, at + 0.28);
        }

        // The effect lands as the charge arrives.
        const lands = step.via && charge ? at + 0.3 : at;

        const lit = [step.id, ...(step.with ?? [])].flatMap(byId);
        const litBoxes = lit.flatMap((n) =>
          Array.from(n.querySelectorAll<SVGRectElement>(".hosp-node-box")),
        );
        // The stacked rendering has no <rect> to brighten — its node *is*
        // the bordered element, so the same beat lands on its border.
        const litDivs = lit.filter(
          (n): n is HTMLElement => n instanceof HTMLElement,
        );

        if (litBoxes.length) {
          tl.to(litBoxes, { strokeOpacity: 0.95, duration: 0.18 }, lands).to(
            litBoxes,
            { strokeOpacity: TOUCHED, duration: 0.4 },
            lands + 0.42,
          );
        }
        if (litDivs.length) {
          tl.to(
            litDivs,
            { borderColor: "rgba(0,180,216,0.8)", duration: 0.18 },
            lands,
          ).to(
            litDivs,
            { borderColor: "rgba(0,180,216,0.35)", duration: 0.4 },
            lands + 0.42,
          );
        }

        const stepNotes = lit
          .map((n) => n.querySelector(".hosp-node-note"))
          .filter((n): n is Element => Boolean(n));
        if (stepNotes.length) {
          tl.to(stepNotes, { opacity: 1, duration: 0.24 }, lands);
        }

        // Inventory says it with a number that actually moves.
        if (step.id === "inventory" && stocks.length) {
          tl.to(
            stock,
            {
              v: STOCK_TO,
              duration: 0.4,
              ease: "none",
              snap: { v: 1 },
              onUpdate: () => {
                const t = String(Math.round(stock.v));
                stocks.forEach((s) => {
                  if (s.textContent !== t) s.textContent = t;
                });
              },
            },
            lands,
          );
        }

        // The product below registers the same event.
        const ecoEls = (step.eco ?? []).flatMap(ecoById);
        if (ecoEls.length) {
          const names = ecoEls.flatMap((e) =>
            Array.from(e.querySelectorAll<Element>(".hosp-eco-name")),
          );
          const ticks = ecoEls.flatMap((e) =>
            Array.from(e.querySelectorAll<Element>(".hosp-eco-tick")),
          );
          if (names.length) {
            tl.to(
              names,
              { fillOpacity: 0.95, opacity: 1, duration: 0.2 },
              lands + 0.06,
            ).to(
              names,
              { fillOpacity: 0.72, duration: 0.4 },
              lands + 0.5,
            );
          }
          if (ticks.length) {
            tl.to(ticks, { strokeOpacity: 0.85, duration: 0.2 }, lands + 0.06)
              .to(ticks, { strokeOpacity: 0.5, duration: 0.4 }, lands + 0.5);
          }
        }

        if (step.id === "iva" && ivaLines.length) {
          tl.fromTo(
            ivaLines,
            { opacity: 0, y: 6 },
            { opacity: 1, y: 0, duration: T.base },
            lands + 0.1,
          );
        }
      });

      // ── Nothing operates in isolation ──
      // The band's line draws the full width, last, once every system in
      // the cascade above has responded.
      const closing = start + SEQUENCE.length * BEAT;
      if (bandPath && bandLen) {
        tl.to(
          bandPath,
          { strokeDashoffset: 0, duration: T.draw, ease: EASE.draw },
          closing,
        );
      }
      if (bandBar) {
        tl.to(
          bandBar,
          { scaleX: 1, duration: T.draw, ease: EASE.draw },
          closing,
        );
      }
      if (ecoNames.length) {
        tl.to(
          ecoNames,
          { fillOpacity: 0.72, opacity: 1, duration: T.base, stagger: 0.04 },
          closing + 0.15,
        );
      }
      if (ecoTicks.length) {
        tl.to(
          ecoTicks,
          { strokeOpacity: 0.5, duration: T.base, stagger: 0.04 },
          closing + 0.15,
        );
      }
    },
    { scope: sectionRef },
  );
}
