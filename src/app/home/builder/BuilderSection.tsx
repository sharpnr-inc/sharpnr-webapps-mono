import { useRef, useState } from "react";
import { Plus, RotateCcw } from "lucide-react";
import { SectionIntro } from "@/app/shared/SectionIntro";
import {
  useBuilderIntroAnimation,
  useMountReveal,
  useSpokeDraw,
} from "./animations/useBuilderAnimation";

interface BuilderProduct {
  id: string;
  name: string;
  blurb: string;
}

/* Every starting point is equally valid — no recommended option. */
const products: BuilderProduct[] = [
  { id: "accounting", name: "Sharp Accounting", blurb: "The financial foundation." },
  { id: "hrms", name: "Sharp HRMS", blurb: "The people foundation." },
  { id: "operations", name: "Sharp Operations", blurb: "Run your industry's daily work." },
  { id: "cables", name: "Cables", blurb: "Communication built for organizations." },
  { id: "tasks", name: "Tasks", blurb: "Where work gets done." },
  { id: "marketplace", name: "Sharp Marketplace", blurb: "Your business network." },
];

/* Workspace slots — SVG coords in an 800×600 canvas; the center
   first, then a ring that fills as the ecosystem grows. */
const slots = [
  { x: 400, y: 280 },
  { x: 400, y: 84 },
  { x: 672, y: 196 },
  { x: 648, y: 452 },
  { x: 152, y: 452 },
  { x: 128, y: 196 },
] as const;

const toPct = (s: { x: number; y: number }) => ({
  left: `${(s.x / 800) * 100}%`,
  top: `${(s.y / 600) * 100}%`,
});

/**
 * Section 05 — Start small. Grow without limits.
 * An interactive ecosystem builder: choose any starting product,
 * then watch the platform grow one connected addition at a time.
 */
export function BuilderSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const [startId, setStartId] = useState<string | null>(null);
  const [addedIds, setAddedIds] = useState<string[]>([]);

  useBuilderIntroAnimation({ sectionRef, introRef });

  const started = products.find((p) => p.id === startId) ?? null;
  const added = addedIds.map((id) => products.find((p) => p.id === id)!);
  const remaining = products.filter(
    (p) => p.id !== startId && !addedIds.includes(p.id),
  );
  const complete = started !== null && remaining.length === 0;

  const reset = () => {
    setStartId(null);
    setAddedIds([]);
  };

  return (
    <section ref={sectionRef} className="bg-ice/45">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
        <div ref={introRef}>
          <SectionIntro
            align="center"
            eyebrow="Flexible adoption"
            heading={
              <>
                Start small.
                <br />
                Grow without limits.
              </>
            }
            lede="Adopt one product or build your entire business on Sharpnr. Every product works independently from day one, and every addition automatically becomes part of the same connected platform."
          />
        </div>

        {/* ── The workspace ─────────────────────────────────────── */}
        <div className="mx-auto mt-14 max-w-3xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
            {!started ? (
              /* Phase 1 — choose any starting point */
              <div className="flex flex-col items-center py-8 text-center md:py-14">
                <h3 className="text-heading-sm font-semibold text-navy">
                  Where would you like to start?
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  There is no wrong place to begin.
                </p>
                <div className="mt-8 flex max-w-xl flex-wrap items-center justify-center gap-3">
                  {products.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setStartId(p.id)}
                      className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors duration-200 hover:border-blue hover:text-blue-deep"
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Phase 2 — the ecosystem grows */
              <div>
                <div className="relative aspect-[4/3] w-full">
                  {/* Connections */}
                  <svg
                    viewBox="0 0 800 600"
                    preserveAspectRatio="xMidYMid meet"
                    className="pointer-events-none absolute inset-0 h-full w-full"
                    aria-hidden="true"
                  >
                    {added.map((p, i) => (
                      <BuilderSpoke
                        key={p.id}
                        from={slots[0]}
                        to={slots[i + 1]}
                      />
                    ))}
                  </svg>

                  {/* Starting product — the center of this business */}
                  <BuilderNode
                    style={toPct(slots[0])}
                    name={started.name}
                    blurb={started.blurb}
                    center
                  />

                  {/* Additions */}
                  {added.map((p, i) => (
                    <BuilderNode
                      key={p.id}
                      style={toPct(slots[i + 1])}
                      name={p.name}
                    />
                  ))}
                </div>

                {/* Suggestions / outcome */}
                <div className="mt-6 border-t border-slate-100 pt-6">
                  {!complete ? (
                    <div className="flex flex-wrap items-center justify-center gap-2.5">
                      <span className="mr-1 text-sm text-slate-500">
                        When you're ready:
                      </span>
                      {remaining.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setAddedIds((ids) => [...ids, p.id])}
                          className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors duration-200 hover:border-blue hover:text-blue-deep"
                        >
                          <Plus className="size-3.5" strokeWidth={2} />
                          {p.name}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-title-md font-semibold text-navy">
                      Start with one. Grow into everything.
                      <span className="mt-1 block text-sm font-normal text-slate-500">
                        Without ever starting over.
                      </span>
                    </p>
                  )}
                  <div className="mt-5 flex justify-center">
                    <button
                      type="button"
                      onClick={reset}
                      className="inline-flex items-center gap-1.5 text-sm text-slate-400 transition-colors duration-200 hover:text-slate-600"
                    >
                      <RotateCcw className="size-3.5" strokeWidth={1.8} />
                      Start somewhere else
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <p className="mt-6 text-center text-sm text-slate-500">
            No migrations. No rebuilding. No disconnected systems.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── Self-animating pieces ─────────────────────────────────────── */

function BuilderNode({
  style,
  name,
  blurb,
  center = false,
}: {
  style: React.CSSProperties;
  name: string;
  blurb?: string;
  center?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useMountReveal(ref);

  return (
    <div
      ref={ref}
      style={style}
      className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center"
    >
      <span
        className={`rounded-full border bg-white px-4 py-2 text-sm font-semibold ${
          center
            ? "border-blue text-navy md:px-5 md:py-2.5"
            : "border-slate-300 text-slate-700"
        }`}
      >
        {name}
      </span>
      {blurb && (
        <span className="mt-2 hidden text-xs text-slate-500 sm:block">
          {blurb}
        </span>
      )}
    </div>
  );
}

function BuilderSpoke({
  from,
  to,
}: {
  from: { x: number; y: number };
  to: { x: number; y: number };
}) {
  const ref = useRef<SVGPathElement>(null);
  useSpokeDraw(ref);

  return (
    <path
      ref={ref}
      d={`M${from.x} ${from.y} L${to.x} ${to.y}`}
      fill="none"
      stroke="#0077b6"
      strokeOpacity="0.5"
      strokeWidth="1.5"
    />
  );
}
