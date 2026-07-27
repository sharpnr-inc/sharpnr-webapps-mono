import type { RefObject } from "react";
import { gsap, useGSAP } from "@/configs/gsap";
import { parallaxOnScroll, prefersReduced, revealOnce } from "@/app/home/shared/motion";
import { animeWordsOnEnter } from "@/app/home/shared/reveal";

interface OnePlatformAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  headingRef: RefObject<HTMLHeadingElement | null>;
  copyRef: RefObject<HTMLParagraphElement | null>;
  fieldRef: RefObject<HTMLDivElement | null>;
}

/** Each component arrives from its own direction, so the board assembles
 * from all sides rather than sliding in as one piece. */
const FROM = [
  { x: 0, y: -140 },
  { x: -160, y: -90 },
  { x: 160, y: -90 },
  { x: 0, y: -170 },
  { x: -180, y: 0 },
  { x: 180, y: 0 },
  { x: -150, y: 110 },
  { x: 150, y: 110 },
  { x: -80, y: 160 },
  { x: 80, y: 160 },
];

/* The visual has to land before the headline states its claim. */
const HEADLINE_DELAY_MS = 1500;

/**
 * The turn — a board fabricating itself, then coming alive. Reversible.
 *
 * Sequence: the substrate settles, every component slides in from its own
 * direction, the traces route between them, the drop opens into the
 * substrate, and only then do charges begin travelling the runs. The
 * headline is held back until the board is complete, so the visual proves
 * the claim before the words make it.
 *
 * The travelling charges are an infinite loop by design (Motion Language
 * amendment v3.2 covers ambient idle motion) and are kept on their own
 * tweens, never inside the reversible timeline — a timeline containing an
 * infinitely-repeating child has no finite duration and silently breaks
 * `toggleActions: "...reverse"`.
 */
export function useOnePlatformAnimation(refs: OnePlatformAnimationRefs) {
  const { sectionRef, headingRef, copyRef, fieldRef } = refs;

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const reduced = prefersReduced();
      animeWordsOnEnter(headingRef.current, section, "top 80%", reduced ? 0 : HEADLINE_DELAY_MS);
      if (copyRef.current) revealOnce(copyRef.current, section, { delay: 0.15 });
      if (reduced || !fieldRef.current) return;

      const container = fieldRef.current;
      const plate = container.querySelector<HTMLElement>(".hp-iso-plate");
      const blocks = Array.from(container.querySelectorAll<HTMLElement>(".hp-iso-block"));
      const traces = Array.from(container.querySelectorAll<HTMLElement>(".hp-iso-trace"));
      const vias = Array.from(container.querySelectorAll<HTMLElement>(".hp-iso-via"));
      const pulses = Array.from(container.querySelectorAll<HTMLElement>(".hp-iso-pulse"));
      const drops = Array.from(container.querySelectorAll<HTMLElement>(".hp-iso-drop"));
      if (!blocks.length) return;

      gsap.set(traces, { opacity: 0 });
      gsap.set(vias, { opacity: 0, scale: 0 });
      gsap.set(pulses, { opacity: 0 });
      gsap.set(drops, { scaleY: 0, transformOrigin: "top" });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: container,
            start: "top 74%",
            toggleActions: "play none none reverse",
          },
        })
        .from(plate ?? {}, { opacity: 0, scale: 0.94, duration: 0.6, ease: "power2.out" })
        .from(
          blocks,
          {
            x: (i) => FROM[i % FROM.length].x,
            y: (i) => FROM[i % FROM.length].y,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.07,
          },
          "-=0.3",
        )
        // The routing appears only once there is something to route between.
        .to(traces, { opacity: 1, duration: 0.3, ease: "power1.out", stagger: 0.035 }, "-=0.15")
        .to(vias, { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(2)", stagger: 0.03 }, "-=0.35")
        .to(drops, { scaleY: 1, duration: 0.45, ease: "power1.out" }, "-=0.3");

      // The board comes alive last, and stays alive. Each charge fires
      // from the hub, travels its run, and lands — flashing the node it
      // arrives at. Periods are deliberately co-prime-ish so the routes
      // drift out of phase and never resolve into a synchronised dance.
      const stageWidth = container.clientWidth * 0.92;

      // One idea at a time. A charge traces a whole thought — leaves an
      // application, crosses the hub, arrives somewhere that had to know —
      // rather than hopping a single segment. Journeys play end to end,
      // never overlapping, with a beat of stillness between them.
      gsap.set(pulses, { opacity: 0 });

      const byJourney = new Map<string, HTMLElement[]>();
      pulses.forEach((el) => {
        const k = el.dataset.journey ?? "0";
        byJourney.set(k, [...(byJourney.get(k) ?? []), el]);
      });

      const master = gsap.timeline({ repeat: -1, delay: 1.8 });

      [...byJourney.values()].forEach((legs) => {
        legs
          .slice()
          .sort((a, b) => Number(a.dataset.leg) - Number(b.dataset.leg))
          .forEach((pulse) => {
            const axis = pulse.dataset.dir === "h" ? "x" : "y";
            const distance = (Number(pulse.dataset.travel ?? 0) / 100) * stageWidth;
            master
              .set(pulse, { [axis]: 0, opacity: 0 })
              .to(pulse, { opacity: 1, duration: 0.25 })
              .to(pulse, { [axis]: distance, duration: 1.5, ease: "none" }, "<")
              .to(pulse, { opacity: 0, duration: 0.2 }, ">-0.2");
          });

        // Impact — only once the whole idea has landed.
        const dest = legs[0]?.dataset.to;
        const target = container.querySelector<HTMLElement>(`[data-label="${dest}"]`);
        const targetTop = target?.querySelector<HTMLElement>(".hp-iso-top");
        // The slabs are bare, so arrival reads on the silkscreen.
        const targetSilk = target?.querySelector<HTMLElement>(".hp-silk");

        master
          .to(targetTop ?? {}, { borderColor: "#ffffff", duration: 0.12 }, ">-0.2")
          .to(targetSilk ?? {}, { color: "#ffffff", duration: 0.12 }, "<")
          .to(targetTop ?? {}, { borderColor: "", duration: 0.5 }, ">+0.1")
          .to(targetSilk ?? {}, { color: "", duration: 0.5 }, "<")
          .to({}, { duration: 1.6 });
      });

      // Idle breathing. Nothing expensive is perfectly still — a single
      // pixel over nine seconds, felt rather than seen. On the stage, so
      // the whole board breathes as one object.
      gsap.to(container.querySelector(".hp-iso-stage"), {
        y: -1,
        duration: 4.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      parallaxOnScroll(container, section, 12);
    },
    { scope: sectionRef },
  );
}
