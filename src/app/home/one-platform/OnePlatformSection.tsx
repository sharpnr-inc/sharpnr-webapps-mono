import { useRef } from "react";
import { Words } from "@/app/home/shared/Words";
import { NODES, TRACES, VIAS, JOURNEYS, SUBSTRATE_Z } from "./board";
import { useOnePlatformAnimation } from "./animations/useOnePlatformAnimation";

/*
 * The turn.
 *
 * Emotion: relief. The platform drawn as fabricated hardware — unequal
 * slabs, squares and chips soldered onto one board, wired as a mesh where
 * services talk to each other directly and Sharpnr orchestrates rather
 * than sitting on every route. Underneath, a sunk substrate everything
 * writes into and reads from.
 *
 * Three layers of depth: components, the board they sit on, and the
 * substrate below it. Labels stay hidden until hovered so the board reads
 * as hardware rather than as a labelled diagram.
 *
 * Text-left, visual-right. The headline finishes only once the board has
 * assembled — the visual proves the claim before the words make it.
 */

export function OnePlatformSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);

  useOnePlatformAnimation({ sectionRef, headingRef, copyRef, fieldRef });

  return (
    <section
      ref={sectionRef}
      className="hp-section hp-sec relative flex hp-flex-section min-h-svh items-center overflow-x-clip px-6 md:px-10"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
        {/* The argument */}
        <div className="order-1 lg:pr-6">
          <h2
            ref={headingRef}
            className="hp-scene-title font-extrabold text-white"
          >
            <span className="block">
              <Words text="Everything," />
            </span>
            <span className="block text-twilight">
              <Words text="One Platform." />
            </span>
          </h2>

          <p ref={copyRef} className="hp-hero-copy mt-6 max-w-xl text-mute">
            Every application shares the same foundation, data, and
            intelligence&mdash;working as one platform.
          </p>
        </div>

        {/* The board */}
        <div className="order-2 w-full">
          <div
            ref={fieldRef}
            className="relative mx-auto flex aspect-square w-full max-w-lg items-center justify-center"
            style={{ perspective: "2400px" }}
            aria-hidden="true"
          >
            <div className="hp-iso-stage relative mt-4 size-[min(27rem,92%)]">
              {/* Layer 3 — the substrate, sunk beneath the board */}
              <div
                className="hp-iso-plate hp-iso-substrate absolute -inset-[7%]"
                style={{ transform: `translateZ(${SUBSTRATE_Z}px)` }}
              >
                <div className="hp-iso-plate-grid absolute inset-0" />
                {/* No label here — Data Lake is a real block on the
                    substrate now, labelled like every other component. */}
              </div>

              {TRACES.map((t, i) => (
                <div
                  key={`t${i}`}
                  className={`hp-iso-trace ${t.dim ? "hp-iso-trace--dim" : ""}`}
                  style={{
                    left: `${t.x}%`,
                    top: `${t.y}%`,
                    width: t.dir === "h" ? `${t.len}%` : (t.w ?? 2),
                    height: t.dir === "v" ? `${t.len}%` : (t.w ?? 2),
                    transform: `translateZ(${t.z}px)`,
                  }}
                />
              ))}

              {VIAS.map((v, i) => (
                <div
                  key={`v${i}`}
                  className="hp-iso-via"
                  style={{ left: `${v.x}%`, top: `${v.y}%`, transform: `translateZ(${v.z}px)` }}
                />
              ))}

              {JOURNEYS.flatMap((j, ji) =>
                j.legs.map((p, li) => {
                  const horizontal = p.dir === "h";
                  const forward = p.travel > 0;
                  const fade = horizontal
                    ? forward ? "to right" : "to left"
                    : forward ? "to bottom" : "to top";
                  return (
                    <div
                      key={`p${ji}-${li}`}
                      className="hp-iso-pulse"
                      data-journey={ji}
                      data-leg={li}
                      data-dir={p.dir}
                      data-travel={p.travel}
                      data-to={j.to}
                      style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: horizontal ? 30 : 3,
                        height: horizontal ? 3 : 30,
                        marginLeft: horizontal ? (forward ? -30 : 0) : -1.5,
                        marginTop: horizontal ? -1.5 : forward ? -30 : 0,
                        background: `linear-gradient(${fade}, rgba(0,180,216,0) 0%, rgba(0,180,216,0.5) 60%, #00b4d8 100%)`,
                      }}
                    />
                  );
                }),
              )}

              {/* The heavy drop — the board writing into the substrate */}
              <div
                className="hp-iso-drop absolute left-1/2 top-1/2"
                style={{
                  width: 3,
                  height: -SUBSTRATE_Z,
                  transformOrigin: "top",
                  transform: "rotateX(-90deg)",
                }}
              />

              {/* Layer 1 — the components */}
              {NODES.map((n) => (
                <div
                  key={n.label}
                  data-label={n.label}
                  data-z={n.z}
                  tabIndex={0}
                  className={`hp-iso-block absolute ${
                    n.variant ? `hp-iso-block--${n.variant}` : ""
                  } ${n.anchor ? "hp-iso-block--anchor" : ""}`}
                  style={{
                    left: `${n.cx}%`,
                    top: `${n.cy}%`,
                    width: n.w,
                    height: n.h,
                    marginLeft: -n.w / 2,
                    marginTop: -n.h / 2,
                    transform: `translateZ(${n.z}px)`,
                  }}
                >
                  {/* Bare. Nothing is printed on a slab — every mark on a
                      real board is silkscreened onto the substrate beside
                      the component, never onto the component itself. */}
                  <div className="hp-iso-top absolute inset-0" />
                  <div
                    className="hp-iso-front absolute left-0 top-full w-full"
                    style={{ height: n.depth, transformOrigin: "top", transform: "rotateX(-90deg)" }}
                  />
                  <div
                    className="hp-iso-side absolute left-full top-0 h-full"
                    style={{ width: n.depth, transformOrigin: "left", transform: "rotateY(90deg)" }}
                  />
                  {/* Silkscreen, centred on the part and lying IN the
                      board's plane — deliberately no counter-rotation.
                      Facing the type at the camera lifts it off the surface
                      and it reads as a floating caption; inheriting the
                      stage's rotation is what makes it look printed on. */}
                  {n.variant === "hub" ? (
                    /* Centred by the same flex box the labels use, rather
                       than by left/top + translate: the block also renders
                       side faces, so a manually-centred child lands on the
                       top face's centre and reads high against the prism. */
                    <span className="absolute inset-0 flex items-center justify-center">
                      <img
                        src="/sharpnr-logo-white.svg"
                        alt=""
                        className="hp-silk-mark"
                        style={{ width: Math.round(n.w * 0.28) }}
                      />
                    </span>
                  ) : (
                    <span
                      className={`hp-core-node hp-silk absolute inset-0 flex items-center justify-center ${
                        n.silk ? "hp-silk--on" : ""
                      }`}
                    >
                      {n.label}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
