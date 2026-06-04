import { useRef } from "react";
import { useGSAP, gsap, ScrollTrigger } from "@/animations/gsap";

// ScrollTrigger + ScrollToPlugin already registered in @/animations/gsap

const ITEMS = [
  { text: "connecting other businesses.", dir: "left" as const },
  { text: "managing operations.", dir: "right" as const },
  { text: "managing your business.", dir: "left" as const },
  { text: "managing employees.", dir: "right" as const },
];

export function SharpnrIntroCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(
    () => {
      // ── 1. Entry animation ────────────────────────────────
      const entry = gsap.timeline();
      entry
        .fromTo(
          titleRef.current,
          { y: 70, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "expo.out" },
        )
        .fromTo(
          pinnedRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
          "-=0.5",
        );

      // ── 2. Pin + scrub through items ─────────────────────
      // Total scroll distance = items × 100vh so each item gets one viewport height
      const scrollDistance = ITEMS.length * window.innerHeight;

      // Pin the section
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${scrollDistance}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          // progress 0–1 across the entire pinned scroll
          const progress = self.progress;
          // Which item slot we're in (0 to ITEMS.length-1)
          const slot = progress * ITEMS.length;
          const current = Math.min(Math.floor(slot), ITEMS.length - 1);
          // progress within that slot (0–1)
          const slotProg = slot - current;

          ITEMS.forEach((item, i) => {
            const el = itemsRef.current[i];
            if (!el) return;

            const fromLeft = item.dir === "left";

            if (i < current) {
              // fully gone – exit to opposite side
              gsap.set(el, {
                x: fromLeft ? "-120%" : "120%",
                opacity: 0,
                scale: 0.92,
              });
            } else if (i === current) {
              // active item – fully settled
              gsap.set(el, { x: "0%", opacity: 1, scale: 1 });
            } else if (i === current + 1) {
              // next item – waiting off-screen
              const nextFromLeft = item.dir === "left";
              // Peek in slightly based on slotProg nearing 1
              const peekX = nextFromLeft
                ? gsap.utils.interpolate("100%", "100%", slotProg)
                : gsap.utils.interpolate("-100%", "-100%", slotProg);
              gsap.set(el, { x: peekX, opacity: 0, scale: 0.95 });
            } else {
              // far future items – hide off-screen
              gsap.set(el, {
                x: item.dir === "left" ? "100%" : "-100%",
                opacity: 0,
                scale: 0.95,
              });
            }
          });
        },
        onEnterBack: () => {
          // Reset all when scrolling back to top of pin
          ITEMS.forEach((item, i) => {
            const el = itemsRef.current[i];
            if (!el) return;
            if (i === 0) {
              gsap.set(el, { x: "0%", opacity: 1, scale: 1 });
            } else {
              gsap.set(el, {
                x: item.dir === "left" ? "100%" : "-100%",
                opacity: 0,
                scale: 0.95,
              });
            }
          });
        },
      });

      // Per-item tweens driven by ScrollTrigger scrub
      ITEMS.forEach((item, i) => {
        const el = itemsRef.current[i];
        if (!el) return;

        const fromLeft = item.dir === "left";
        const enterFrom = fromLeft ? "110%" : "-110%";
        const exitTo = fromLeft ? "-110%" : "110%";

        // Each item occupies 1/(ITEMS.length) of the total scroll
        const segmentSize = 1 / ITEMS.length;
        const segStart = i * segmentSize;
        const segEnd = segStart + segmentSize;

        // Enter tween: first 40% of the segment
        gsap.fromTo(
          el,
          { x: enterFrom, opacity: 0, scale: 0.92 },
          {
            x: "0%",
            opacity: 1,
            scale: 1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: `top+=${segStart * scrollDistance} top`,
              end: `top+=${(segStart + segmentSize * 0.4) * scrollDistance} top`,
              scrub: 0.6,
            },
          },
        );

        // Exit tween: last 35% of the segment (only for non-last items)
        if (i < ITEMS.length - 1) {
          gsap.fromTo(
            el,
            { x: "0%", opacity: 1, scale: 1 },
            {
              x: exitTo,
              opacity: 0,
              scale: 0.92,
              ease: "power2.in",
              scrollTrigger: {
                trigger: containerRef.current,
                start: `top+=${(segEnd - segmentSize * 0.35) * scrollDistance} top`,
                end: `top+=${segEnd * scrollDistance} top`,
                scrub: 0.6,
              },
            },
          );
        }
      });

      // Set initial positions
      ITEMS.forEach((item, i) => {
        const el = itemsRef.current[i];
        if (!el) return;
        if (i === 0) return; // first is visible
        gsap.set(el, {
          x: item.dir === "left" ? "110%" : "-110%",
          opacity: 0,
          scale: 0.92,
        });
      });
    },
    { scope: containerRef, dependencies: [] },
  );

  return (
    <div
      ref={containerRef}
      className="w-full h-screen overflow-hidden relative"
    >
      <section className="w-full h-full flex flex-col justify-center items-center px-6">
        {/* ── Title ──────────────────────────────────────────────── */}
        <h1
          ref={titleRef}
          className="text-5xl md:text-8xl font-bold tracking-tight mb-12 md:mb-16"
        >
          Sharpnr
        </h1>

        {/* ── Pinned sentence + cycling right column ─────────────── */}
        <div className="flex flex-row items-center gap-4 md:gap-8 w-full max-w-5xl">
          {/* LEFT: pinned sentence — never moves */}
          <div className="flex-shrink-0">
            <p className="text-xl md:text-3xl lg:text-4xl font-medium text-foreground leading-snug whitespace-nowrap">
              A unified ecosystem of products
              <br />
              <span className="text-muted-foreground">designed for</span>
            </p>
          </div>

          {/* Divider */}
          <div className="w-px self-stretch bg-border flex-shrink-0" />

          {/* RIGHT: items slide in/out from alternating sides */}
          <div className="relative flex-1 overflow-hidden h-24 md:h-28 flex items-center">
            {ITEMS.map((item, i) => (
              <span
                key={i}
                ref={(el) => {
                  itemsRef.current[i] = el;
                }}
                className="absolute left-0 text-xl md:text-3xl lg:text-4xl font-semibold
                           text-foreground leading-tight will-change-transform"
              >
                {item.text}
              </span>
            ))}
          </div>
        </div>

        {/* ── Scroll hint ─────────────────────────────────────────── */}
        <p className="absolute bottom-8 text-xs text-muted-foreground/50 tracking-widest uppercase">
          Scroll to explore
        </p>
      </section>
    </div>
  );
}
