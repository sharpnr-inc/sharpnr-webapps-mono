"use client";
import { gsap, ScrollTrigger } from "@/animations/gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

// ─────────────────────────────────────────────────────────────────────────────
// SQUARE CONFIG
// Each square has: size (px), position (% from left/top), initial rotation
// These are purely decorative — feel free to add/remove/tweak
// ─────────────────────────────────────────────────────────────────────────────
const SQUARES = [
  { size: 80, x: "8%", y: "12%", rotate: 25 },
  { size: 48, x: "18%", y: "65%", rotate: -15 },
  { size: 120, x: "75%", y: "8%", rotate: 45 },
  { size: 36, x: "88%", y: "55%", rotate: -30 },
  { size: 64, x: "50%", y: "80%", rotate: 10 },
  { size: 96, x: "62%", y: "35%", rotate: -20 },
  { size: 28, x: "32%", y: "20%", rotate: 55 },
  { size: 52, x: "5%", y: "42%", rotate: -40 },
  { size: 160, x: "38%", y: "50%", rotate: 15 },
  { size: 40, x: "82%", y: "78%", rotate: -60 },
  { size: 72, x: "22%", y: "88%", rotate: 35 },
  { size: 56, x: "92%", y: "25%", rotate: -10 },
];

export function SharpnrIntroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // ─────────────────────────────────────────────────────────────────────────
  // contextSafe: wraps async callbacks so that any GSAP animations /
  // ScrollTriggers created *inside* them are still registered to this
  // component's GSAP context and get cleaned up on unmount.
  //
  // Without this, anything inside document.fonts.ready.then() runs *after*
  // useGSAP's context has already closed → ScrollTriggers become orphans
  // and markers appear stuck at y=0.
  // ─────────────────────────────────────────────────────────────────────────
  const { contextSafe } = useGSAP({ scope: sectionRef });

  useGSAP(
    () => {
      // Wrap everything in contextSafe so the async .then() callback
      // is context-aware
      const init = contextSafe(() => {
        const section = sectionRef.current;
        if (!section) return;

        // ── Step 1: grab all squares ──────────────────────────────────────
        // gsap.utils.toArray is safer than querySelectorAll in React because
        // it handles scoping and returns a typed array
        const squares = gsap.utils.toArray<HTMLElement>(".intro-square");

        // ── Step 2: set initial state for squares ─────────────────────────
        // gsap.set() is instant (no duration), used to place elements before
        // the scroll animation begins
        gsap.set(squares, {
          opacity: 0,
          scale: 0.3,
          rotate: (i) => SQUARES[i].rotate * 0.5,
        });

        // ── Step 3: idle float loops (independent of scroll) ─────────────
        // These run forever regardless of scroll position.
        // Each square gets a slightly different duration/direction so they
        // never move in sync — gives an organic floating feel.
        squares.forEach((sq, i) => {
          gsap.to(sq, {
            // alternate up/down per square
            y: `${i % 2 === 0 ? 1 : -1}${16 + (i % 3) * 6}px`,
            // slow rotation drift
            rotate: SQUARES[i].rotate + (i % 2 === 0 ? 6 : -6),
            duration: 3.2 + (i % 5) * 0.7, // 3.2s → 6.0s range
            repeat: -1, // loop forever
            yoyo: true, // ping-pong (reverse on each repeat)
            ease: "sine.inOut", // smooth in-out
            delay: i * 0.12, // stagger start so they desync
          });
        });

        // ── Step 4: the pinned scroll timeline ───────────────────────────
        //
        // pin: true       → section is pinned (fixed) while scroll continues
        // end: "+=400%"   → the pin lasts for 4× the viewport height of scroll
        //                   distance, giving you plenty of time to read each phase
        // scrub: 1.5      → animation lags 1.5s behind scroll (smoother feel)
        // markers: true   → DEBUG: shows start/end lines in the browser
        //                   (remove this before deploying to production!)
        //
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            markers: true, // ← REMOVE IN PRODUCTION
            start: "top top", // when top of section hits top of viewport
            end: "+=400%", // pin lasts 4 viewports of scroll distance
            scrub: 1.5, // 1.5s smoothing lag behind actual scroll
            pin: true, // pin the section while scrolling through it
          },
        });

        // ─────────────────────────────────────────────────────────────────
        // PHASE 1 (progress 0 → 0.15)
        // Squares fade and scale in from their set() state
        // The "Sharpnr" title is already visible (it's in the DOM at opacity 1)
        // ─────────────────────────────────────────────────────────────────
        tl.to(
          squares,
          {
            opacity: (i) => 0.06 + (i % 4) * 0.04, // subtle, varied opacity
            scale: 1,
            rotate: (i) => SQUARES[i].rotate,
            stagger: 0.05, // each square starts 0.05 "units" after the prev
            duration: 0.15,
            ease: "power2.out",
          },
          0, // ← position: starts at time 0 in the timeline
        )

          // ─────────────────────────────────────────────────────────────────
          // PHASE 2 (progress 0.15 → 0.35)
          // "Sharpnr" title zooms and fades away — signals a transition
          // Squares spread outward to amplify the zoom feeling
          // ─────────────────────────────────────────────────────────────────
          .to(
            ".intro-title",
            {
              scale: 1.6,
              opacity: 0,
              duration: 0.2,
              ease: "power2.in",
            },
            0.15, // ← starts at 0.15 in the timeline (right after phase 1)
          )
          .to(
            squares,
            {
              scale: (i) => 1.6 + (i % 3) * 0.4,
              opacity: 0.04,
              x: (i) => (i % 2 === 0 ? -40 : 40), // push left/right
              duration: 0.2,
              stagger: 0.01,
              ease: "power1.out",
            },
            0.15, // ← same start time — runs alongside the title tween
          )

          // ─────────────────────────────────────────────────────────────────
          // PHASE 3 (progress 0.35 → 0.50)
          // Brief pause / reset — squares converge back to center
          // Creates visual tension before the content reveal
          // ─────────────────────────────────────────────────────────────────
          .to(
            squares,
            {
              scale: 0.5,
              opacity: 0.1,
              x: 0, // return to original x
              duration: 0.15,
              stagger: 0.01,
              ease: "power2.inOut",
            },
            0.35,
          )

          // ─────────────────────────────────────────────────────────────────
          // PHASE 4 (progress 0.50 → 0.70)
          // Main content rises in — this is the "reveal"
          // fromTo() used here so the start state (y:80, opacity:0) is
          // always guaranteed, regardless of whether the user scrolled
          // back through the timeline
          // ─────────────────────────────────────────────────────────────────
          .fromTo(
            ".intro-content",
            {
              y: 80,
              opacity: 0,
              scale: 0.9,
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.2,
              ease: "power3.out",
            },
            0.5,
          )
          // Squares dim further so they don't compete with the content
          .to(
            squares,
            {
              opacity: 0.04,
              scale: 0.4,
              duration: 0.2,
              stagger: 0.01,
            },
            0.5,
          )

          // ─────────────────────────────────────────────────────────────────
          // PHASE 5 (progress 0.70 → 0.85)
          // Content holds — nothing animates, just reading time.
          // (achieved by leaving a gap in the timeline)
          // ─────────────────────────────────────────────────────────────────

          // ─────────────────────────────────────────────────────────────────
          // PHASE 6 (progress 0.85 → 1.0)
          // Content fades out upward as user prepares to scroll to next section
          // Squares make one last appearance before the pin releases
          // ─────────────────────────────────────────────────────────────────
          .to(
            ".intro-content",
            {
              y: -60,
              opacity: 0,
              scale: 0.95,
              duration: 0.15,
              ease: "power2.in",
            },
            0.85,
          )
          .to(
            squares,
            {
              opacity: (i) => 0.03 + (i % 3) * 0.02,
              scale: (i) => 0.6 + (i % 4) * 0.1,
              duration: 0.15,
              stagger: 0.01,
            },
            0.85,
          );

        // ── Step 5: refresh after fonts + layout are settled ──────────────
        // This recalculates all trigger bounds. Without it, if fonts or
        // images shifted the layout after ScrollTrigger initialized,
        // the start/end markers would be in the wrong place.
        ScrollTrigger.refresh();
      });

      // Run init after fonts are loaded — SplitText and layout measurements
      // need fonts to be ready or positions will be wrong
      document.fonts.ready.then(init);
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center bg-background"
    >
      {/* Subtle gradient from previous section */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-background pointer-events-none z-0" />

      {/* ── Floating squares ─────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
      >
        {SQUARES.map((sq, i) => (
          <div
            key={i}
            className="intro-square absolute border border-white/[0.18] rounded-sm"
            style={{
              width: sq.size,
              height: sq.size,
              left: sq.x,
              top: sq.y,
              background: `rgba(255,255,255,${0.008 + (i % 4) * 0.008})`,
            }}
          />
        ))}
      </div>

      {/* ── Title (phase 1–2) ────────────────────────────────────────── */}
      <h1 className="intro-title absolute z-10 text-7xl md:text-9xl font-bold tracking-tight text-white select-none">
        Sharpnr
      </h1>

      {/* ── Reveal content (phase 4–6) ───────────────────────────────── */}
      <div className="intro-content relative z-10 max-w-4xl px-6 text-center opacity-0">
        <p className="text-lg md:text-2xl text-muted-foreground leading-relaxed">
          A unified ecosystem of products designed to power modern businesses.
        </p>
        <h2 className="mt-8 text-4xl md:text-6xl font-bold">
          Build. Manage. Scale.
        </h2>
      </div>
    </section>
  );
}
