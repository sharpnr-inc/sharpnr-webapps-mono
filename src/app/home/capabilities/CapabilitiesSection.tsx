import { useRef, type MouseEvent } from "react";
import { Link } from "@tanstack/react-router";
import { Layers, Radio, Activity, Database } from "lucide-react";
import { Words } from "@/app/home/shared/Words";
import { useCapabilitiesAnimation } from "./animations/useCapabilitiesAnimation";

/*
 * Scene 04 — What the platform actually does.
 *
 * A bento with a deliberate rhythm: a wide tile paired with a narrow one, then
 * the pairing reversed, so the eye moves diagonally instead of scanning a
 * uniform grid. Each tile carries one mark, one name and one plain sentence —
 * nothing else earns the space.
 *
 * Surfaces sit a hair above the field, held by a single hairline that warms on
 * approach. Depth comes from one inner highlight, never a shadow stack.
 */
interface Tile {
  icon: typeof Layers;
  name: string;
  copy: string;
  span: string;
}

const TILES: Tile[] = [
  {
    icon: Layers,
    name: "Unified operations",
    copy: "Everything from stock to the day's work, running in one place instead of five.",
    span: "md:col-span-3",
  },
  {
    icon: Radio,
    name: "Connected teams",
    copy: "Conversations stay attached to the work that caused them.",
    span: "md:col-span-2",
  },
  {
    icon: Activity,
    name: "Live understanding",
    copy: "What happened today, without waiting for a report.",
    span: "md:col-span-2",
  },
  {
    icon: Database,
    name: "A foundation you own",
    copy: "Documents, records and access, held together underneath everything else.",
    span: "md:col-span-3",
  },
];

/** Let the surface highlight follow the pointer. */
function trackPointer(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
  el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
}

export function CapabilitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useCapabilitiesAnimation({ sectionRef, headingRef, copyRef, gridRef });

  return (
    <section
      ref={sectionRef}
      className="hp-section hp-sec relative px-6 md:px-10"
    >
      <div className="mx-auto max-w-5xl">

        <h2
          ref={headingRef}
          className="mt-10 max-w-2xl text-[clamp(1.75rem,3.4vw,2.75rem)] font-extrabold leading-[1.12] tracking-[-0.035em] text-white md:mt-14"
        >
          <Words text="Run your business." />
          <span className="block text-twilight">
            <Words text="Not your software." />
          </span>
        </h2>

        <p
          ref={copyRef}
          className="mt-6 max-w-lg text-[1.0625rem] leading-relaxed text-mute"
        >
          One place for the work, the people and the money behind it — instead
          of every tool you already pay for pulling in its own direction.
        </p>

        <div
          ref={gridRef}
          className="mt-14 grid grid-cols-1 gap-4 md:mt-20 md:grid-cols-5"
        >
          {TILES.map((tile) => (
            <Link
              key={tile.name}
              to="/platform"
              onMouseMove={trackPointer}
              className={`hp-tile group relative flex flex-col justify-between overflow-hidden p-8 md:p-10 ${tile.span}`}
            >
              <tile.icon
                className="relative z-10 size-7 text-white/70 transition-colors duration-300 group-hover:text-white"
                strokeWidth={1.5}
              />
              <div className="relative z-10 mt-14 md:mt-20">
                <h3 className="text-[1.0625rem] font-semibold tracking-tight text-white">
                  {tile.name}
                </h3>
                <p className="mt-2 max-w-sm text-[0.9375rem] leading-relaxed text-mute">
                  {tile.copy}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
