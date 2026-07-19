import { useRef } from "react";
import { SectionIntro } from "@/app/shared/SectionIntro";
import { useConnectedAnimation } from "./animations/useConnectedAnimation";

/* The essential parts of a business — shown becoming one system. */
const nodes = [
  { label: "Operations", x: 116, y: 78, w: 100 },
  { label: "Finance", x: 404, y: 78, w: 84 },
  { label: "Customers", x: 62, y: 226, w: 100 },
  { label: "People", x: 458, y: 226, w: 76 },
  { label: "Communication", x: 146, y: 356, w: 128 },
  { label: "Knowledge", x: 380, y: 356, w: 100 },
] as const;

const links = [
  "M260 210 L136 96",
  "M260 210 L392 96",
  "M260 210 L92 212",
  "M260 210 L430 212",
  "M260 210 L166 340",
  "M260 210 L362 340",
  // The parts also work with each other — not just with the platform
  "M164 88 Q260 44 358 88",
  "M180 366 Q260 402 344 366",
] as const;

/**
 * Section 02 — What is Sharpnr?
 * The category is named here for the first time: Connected Business
 * Infrastructure. One visual: separate parts of a business become
 * one connected system.
 */
export function ConnectedSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useConnectedAnimation({ sectionRef, copyRef });

  return (
    <section ref={sectionRef} className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div ref={copyRef}>
            <SectionIntro
              eyebrow="What is Sharpnr"
              heading="Connected Business Infrastructure"
              lede="Businesses don't operate through one department. Operations, finance, people, customers, communication and knowledge are all parts of the same business."
            />
            <div className="prose-width mt-5 space-y-4 text-base leading-relaxed text-slate-600">
              <p>Yet traditional software treats them as separate systems.</p>
              <p>
                Sharpnr connects the essential parts of running a business, so
                information flows naturally across your organization. The
                result is one connected business — not a collection of
                disconnected applications.
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <svg
              viewBox="0 0 520 420"
              role="img"
              aria-label="Operations, finance, customers, people, communication and knowledge connecting into one system"
              className="h-auto w-full max-w-lg"
            >
              {/* Connections appear as the section enters */}
              <g fill="none" stroke="#0077b6" strokeOpacity="0.45" strokeWidth="1.3">
                {links.map((d) => (
                  <path key={d} className="connected-line" d={d} />
                ))}
              </g>

              {/* The platform at the center */}
              <g className="connected-core">
                <circle cx="260" cy="210" r="30" fill="none" stroke="#0077b6" strokeOpacity="0.35" strokeWidth="1.4" />
                <circle cx="260" cy="210" r="7" fill="#0077b6" />
              </g>

              {/* Parts of the business */}
              {nodes.map((n) => (
                <g key={n.label} className="connected-node">
                  <rect
                    x={n.x - n.w / 2}
                    y={n.y - 17}
                    width={n.w}
                    height={34}
                    rx={17}
                    fill="#ffffff"
                    stroke="#cbd5e1"
                    strokeWidth="1.2"
                    className="connected-pill"
                  />
                  <text
                    x={n.x}
                    y={n.y + 4.5}
                    textAnchor="middle"
                    fontSize="13"
                    fontWeight="500"
                    fill="#334155"
                  >
                    {n.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
