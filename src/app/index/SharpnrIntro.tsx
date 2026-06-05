import { gsap } from "@/animations/gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

// ─────────────────────────────────────────
// Data
// ─────────────────────────────────────────

const cards = [
  {
    id: "intro-01",
    num: "01",
    tag: "Platform",
    eyebrow: "Everything. One roof.",
    title: "Sharpnr\nPlatform",
    body: "A unified ecosystem of business applications — HR, accounting, healthcare, marketing, and more — wired together from day one. No integrations. No duct tape.",
    stat: { value: "9+", label: "Interconnected products" },
    accent: "#B8F455",
    imageSrc: "https://dummyimage.com/1280x720/0a0a0a/1a1a1a&text=+",
  },
  {
    id: "intro-02",
    num: "02",
    tag: "Ecosystem",
    eyebrow: "Modular by design.",
    title: "Unified\nServices",
    body: "Every module shares the same identity layer, data fabric, and permission model. Build a workflow once and it runs across your entire stack — instantly.",
    stat: { value: "∞", label: "Composable workflows" },
    accent: "#B8F455",
    imageSrc: "https://dummyimage.com/1280x720/0a0a0a/1a1a1a&text=+",
  },
  {
    id: "intro-03",
    num: "03",
    tag: "Vision",
    eyebrow: "Forged for scale.",
    title: "Built for\nthe Future",
    body: "Not another tool you'll migrate away from. Sharpnr is the infrastructure layer modern teams build on — an operating system for how people actually work.",
    stat: { value: "10×", label: "Faster than stitched tools" },
    accent: "#B8F455",
    imageSrc: "https://dummyimage.com/1280x720/0a0a0a/1a1a1a&text=+",
  },
];

// ─────────────────────────────────────────
// Component
// ─────────────────────────────────────────

const SharpnrIntro = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      const cards = gsap.utils.toArray<HTMLElement>(
        ".si-card",
        sectionRef.current,
      );

      cards.forEach((card, i) => {
        // ── Elements ─────────────────────────────
        const eyebrow = card.querySelector<HTMLElement>(".si-eyebrow");
        const titleEl = card.querySelector<HTMLElement>(".si-title");
        const divider = card.querySelector<HTMLElement>(".si-divider");
        const body = card.querySelector<HTMLElement>(".si-body");
        const stat = card.querySelector<HTMLElement>(".si-stat");
        const tag = card.querySelector<HTMLElement>(".si-tag");
        const numEl = card.querySelector<HTMLElement>(".si-num");
        const visual = card.querySelector<HTMLElement>(".si-visual");
        const imgEl = card.querySelector<HTMLElement>(".si-img");
        const bar = card.querySelector<HTMLElement>(".si-bar");
        const corner = card.querySelector<HTMLElement>(".si-corner");
        const scanLine = card.querySelector<HTMLElement>(".si-scanline");

        // ── Split title into lines & words ────────
        let split: SplitText | null = null;
        if (titleEl) {
          split = new SplitText(titleEl, { type: "lines,words,chars" });
          gsap.set(split.words, {
            overflow: "hidden",
            display: "inline-block",
          });
        }

        // ── Master scroll timeline ─────────────────
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 28%",
            end: "top 10%",
            scrub: 1,
          },
        });

        if (titleEl) {
          tl.fromTo(
            titleEl,
            {
              opacity: 0,
              x: 200,
              skewX: -12,
              skewY: 10,
            },
            {
              opacity: 1,
              x: 0,
              skewX: 0,
              skewY: 0,
              duration: 0.5,
              ease: "circ.in",
            },
          );
        }

        // Eyebrow
        if (eyebrow) {
          tl.fromTo(
            eyebrow,
            { opacity: 0, x: 500, skewX: -16 },
            { opacity: 1, x: 0, skewX: 0, duration: 0.6, ease: "bounce.inOut" },
            2,
          );
        }

        // Tag
        if (tag) {
          tl.fromTo(
            tag,
            { opacity: 0, x: -200 },
            { opacity: 1, y: 0, duration: 0.5, ease: "bounce.inOut" },
            0.05,
          );
        }

        // Title words — cascade up through clip
        if (split?.words) {
          tl.fromTo(
            split.words,
            { yPercent: 105, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 0.85,
              ease: "expo.out",
            },
            0.1,
          );
        }

        // Divider line
        if (divider) {
          tl.fromTo(
            divider,
            { scaleX: 0, transformOrigin: "left center" },
            { scaleX: 1, duration: 0.9, ease: "expo.inOut" },
            0.5,
          );
        }

        // Body
        if (body) {
          tl.fromTo(
            body,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.22, ease: "power2.out" },
            0.65,
          );
        }

        // Stat
        if (stat) {
          tl.fromTo(
            stat,
            { opacity: 0, y: 20, scale: 0.92 },
            { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "back.out(2)" },
            0.75,
          );
        }

        // Big number fade (background)
        if (numEl) {
          tl.fromTo(
            numEl,
            { opacity: 0, x: 60 },
            { opacity: 1, x: 0, duration: 1.2, ease: "expo.out" },
            0,
          );
        }

        // ── Visual enter ──────────────────────────
        const visualTl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 75%",
            end: "top 30%",
            scrub: 1.2,
          },
        });

        if (visual) {
          visualTl.fromTo(
            visual,
            {
              opacity: 0,
              y: 60,
              scale: 0.94,
              rotateY: i % 2 === 0 ? -6 : 6,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotateY: 0,
              duration: 1,
              ease: "expo.out",
            },
            0,
          );
        }

        // Bar on image
        if (bar) {
          visualTl.fromTo(
            bar,
            { scaleX: 0, transformOrigin: "left" },
            { scaleX: 1, duration: 1.1, ease: "expo.inOut" },
            0.2,
          );
        }

        // Corner bracket
        if (corner) {
          visualTl.fromTo(
            corner,
            { opacity: 0, scale: 0.5 },
            { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2)" },
            0.5,
          );
        }

        // Scan line sweep
        if (scanLine) {
          visualTl.fromTo(
            scanLine,
            { yPercent: 0, opacity: 0.5 },
            { yPercent: 100, opacity: 0, duration: 1, ease: "none" },
            0.1,
          );
        }

        // ── Parallax scrub ────────────────────────
        if (imgEl) {
          gsap.fromTo(
            imgEl,
            { yPercent: -12 },
            {
              yPercent: 12,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 2,
                markers: true,
              },
            },
          );
        }

        // ── Exit fade ─────────────────────────────
        gsap.to(card, {
          opacity: 0.25,
          yPercent: -4,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "bottom 55%",
            end: "bottom 20%",
            scrub: 1.5,
          },
        });
      });

      // ── Horizontal rule across full section ──
      const rule = sectionRef.current.querySelector(".si-hr");
      if (rule) {
        gsap.fromTo(
          rule,
          { scaleX: 0, transformOrigin: "left" },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              markers: true,
              trigger: sectionRef.current,
              start: "top 80%",
              end: "top 30%",

              scrub: 1,
            },
          },
        );
      }
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative m-0 py-0">
      {/* Top rule */}
      <div className="si-hr h-px w-full bg-white/10 mb-0" />

      {cards.map((card, i) => {
        const isOdd = i % 2 === 1;

        return (
          <div
            key={card.id}
            id={card.id}
            className="si-card relative max-w-7xl mx-auto grid grid-cols-[1fr_1fr] gap-x-16 gap-y-0 items-center min-h-screen px-10 py-28 overflow-hidden"
          >
            {/* ─── Background big number ─── */}
            <span
              className="si-num absolute select-none pointer-events-none font-black leading-none"
              style={{
                top: "-0.05em",
                right: isOdd ? "auto" : "1.5rem",
                left: isOdd ? "1.5rem" : "auto",
                fontSize: "clamp(120px, 18vw, 220px)",

                WebkitTextStroke: "1px rgba(255,255,255,0.04)",
                fontFamily: "Georgia, serif",
                zIndex: 0,
                letterSpacing: "-0.04em",
              }}
            >
              {card.num}
            </span>

            {/* ─── Thin vertical accent line ─── */}
            <div
              className="absolute top-0 bottom-0 w-px"
              style={{
                left: isOdd ? "calc(50% - 1px)" : "calc(50% + 1px)",
                background:
                  "linear-gradient(to bottom, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)",
              }}
            />

            {/* ─── Text Side ─── */}
            <div
              className={`relative z-10 flex flex-col justify-center ${isOdd ? "order-2 pl-6" : "pr-6"}`}
            >
              {/* Row: tag + num micro */}
              <div className="flex items-center justify-between mb-6">
                <div className="si-tag flex items-center gap-3">
                  <span
                    className="inline-block h-px w-8"
                    style={{ background: card.accent }}
                  />
                  <span
                    className="text-[9px] tracking-[.3em] uppercase font-semibold"
                    style={{ color: card.accent }}
                  >
                    {card.tag}
                  </span>
                </div>
                <span className="text-[10px] tracking-[.25em] text-white/15 font-mono">
                  {card.num} / 03
                </span>
              </div>

              {/* Eyebrow */}
              <p
                className="si-eyebrow text-sm font-light tracking-wide text-white/35 mb-3"
                style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
              >
                {card.eyebrow}
              </p>

              {/* Title */}
              <h2
                className="si-title font-black leading-[1.06] mb-6 whitespace-pre-line tracking-tight"
                style={{
                  fontSize: "clamp(2.4rem, 4.5vw, 3.6rem)",
                  fontFamily: "Georgia, serif",
                  color: "#F0EDE6",
                }}
              >
                {card.title}
              </h2>

              {/* Divider */}
              <div
                className="si-divider mb-6"
                style={{
                  height: "1.5px",
                  width: "3rem",
                  background: card.accent,
                  borderRadius: "1px",
                }}
              />

              {/* Body */}
              <p className="si-body text-[13px] leading-[1.95] text-white/40 max-w-sm font-light">
                {card.body}
              </p>

              {/* Stat pill */}
              <div className="si-stat mt-10 inline-flex items-baseline gap-3 self-start">
                <span
                  className="text-5xl font-black tracking-tight leading-none"
                  style={{
                    color: card.accent,
                    fontFamily: "Georgia, serif",
                    fontSize: "clamp(2.5rem, 4vw, 3.2rem)",
                  }}
                >
                  {card.stat.value}
                </span>
                <span className="text-[10px] tracking-[.2em] uppercase text-white/30 max-w-[100px] leading-[1.6]">
                  {card.stat.label}
                </span>
              </div>
            </div>

            {/* ─── Visual Side ─── */}
            <div
              className={`si-visual relative z-10 ${isOdd ? "order-1" : ""}`}
              style={{ perspective: "900px" }}
            >
              {/* Outer frame */}
              <div
                className="relative overflow-hidden"
                style={{
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "2px",
                }}
              >
                {/* Image wrapper with parallax */}
                <div
                  className="relative w-full overflow-hidden"
                  style={{ aspectRatio: "16/10" }}
                >
                  <img
                    src={card.imageSrc}
                    alt={card.tag}
                    className="si-img absolute inset-0 w-full h-full object-cover"
                    style={{
                      opacity: 0.5,
                      transform: "scale(1.18)",
                    }}
                  />

                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(0,0,0,0.55) 0%, transparent 60%, rgba(0,0,0,0.4) 100%)",
                    }}
                  />

                  {/* Scan line */}
                  <div
                    className="si-scanline absolute left-0 right-0 pointer-events-none"
                    style={{
                      top: 0,
                      height: "2px",
                      background: `linear-gradient(to right, transparent, ${card.accent}55, transparent)`,
                    }}
                  />

                  {/* Card label inside image */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <span
                      className="text-[8px] tracking-[.35em] uppercase font-semibold"
                      style={{ color: card.accent }}
                    >
                      {card.tag}
                    </span>
                    <span className="text-white/20 text-[8px]">—</span>
                    <span className="text-[8px] tracking-[.2em] text-white/25 font-mono">
                      SHN·{card.num}
                    </span>
                  </div>
                </div>

                {/* Bottom bar (lime accent) */}
                <div
                  className="si-bar absolute bottom-0 left-0 right-0"
                  style={{ height: "1.5px", background: card.accent }}
                />
              </div>

              {/* Corner bracket decoration */}
              <svg
                className="si-corner absolute"
                style={{
                  width: 22,
                  height: 22,
                  top: -6,
                  [isOdd ? "right" : "left"]: -6,
                  opacity: 0.7,
                }}
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d={isOdd ? "M22 0 L22 8 M14 0 L22 0" : "M0 0 L8 0 M0 0 L0 8"}
                  stroke={card.accent}
                  strokeWidth="1.5"
                />
              </svg>

              {/* Outer offset frame (depth cue) */}
              <div
                className="absolute pointer-events-none"
                style={{
                  inset: "-8px",
                  border: "1px solid rgba(255,255,255,0.035)",
                  borderRadius: "2px",
                  zIndex: -1,
                }}
              />
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default SharpnrIntro;
