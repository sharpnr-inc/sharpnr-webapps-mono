import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Building2,
  Handshake,
  ListChecks,
  MessagesSquare,
  Store,
} from "lucide-react";
import { SectionIntro } from "@/app/shared/SectionIntro";
import { useEcosystemAnimation } from "./animations/useEcosystemAnimation";

const areas = [
  {
    icon: Store,
    title: "Business Operations",
    purpose: "Run your industry.",
    products: ["Sharp Operations"],
  },
  {
    icon: Building2,
    title: "Foundation",
    purpose: "Run your organization.",
    products: ["Sharp Accounting", "Sharp HRMS", "Sharp CRMS", "Sharp IAM", "Cortex"],
  },
  {
    icon: MessagesSquare,
    title: "Collaboration",
    purpose: "Keep teams connected.",
    products: ["Cables", "Folio"],
  },
  {
    icon: ListChecks,
    title: "Execution",
    purpose: "Plan. Track. Deliver.",
    products: ["Tasks"],
  },
  {
    icon: BookOpen,
    title: "Data & Intelligence",
    purpose: "Understand your business.",
    products: ["Silo", "IVA"],
  },
  {
    icon: Handshake,
    title: "Business Network",
    purpose: "Connect organizations.",
    products: ["Sharp Marketplace"],
  },
] as const;

/* Hexagonal constellation — every area connects to the platform and
   to its neighbours. Coordinates in a 420×420 viewBox. */
const nodePos = [
  { x: 210, y: 58 },
  { x: 342, y: 134 },
  { x: 342, y: 286 },
  { x: 210, y: 362 },
  { x: 78, y: 286 },
  { x: 78, y: 134 },
] as const;

/**
 * Section 04 — The Sharpnr Ecosystem. Six connected areas around one
 * platform. Not six cards: one constellation plus a quiet list.
 * Hovering an area lights up its place in the ecosystem.
 */
export function EcosystemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEcosystemAnimation({ sectionRef, introRef, listRef });

  return (
    <section ref={sectionRef} className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
        <div ref={introRef}>
          <SectionIntro
            align="center"
            eyebrow="The Sharpnr Ecosystem"
            heading={
              <>
                Everything your business needs.
                <br />
                Connected by one platform.
              </>
            }
            lede="Sharpnr combines specialized products into one connected ecosystem. Every product works independently. Every product works even better together."
          />
        </div>

        <div className="mt-16 grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* One connected ecosystem — the visual is the hero */}
          <div className="order-last flex justify-center lg:order-first">
            <svg
              viewBox="0 0 420 420"
              role="img"
              aria-label="Six areas of the Sharpnr ecosystem connected around one platform"
              className="h-auto w-full max-w-md"
            >
              {/* Platform ↔ area connections */}
              <g fill="none" strokeWidth="1.3">
                {nodePos.map((p, i) => (
                  <path
                    key={`spoke-${p.x}-${p.y}`}
                    className="eco-line"
                    d={`M210 210 L${p.x} ${p.y}`}
                    stroke={i === active ? "#00b4d8" : "#cbd5e1"}
                    strokeWidth={i === active ? 1.8 : 1.3}
                  />
                ))}
                {/* Areas strengthen each other — the outer ring */}
                {nodePos.map((p, i) => {
                  const q = nodePos[(i + 1) % nodePos.length];
                  return (
                    <path
                      key={`ring-${p.x}-${p.y}`}
                      className="eco-line"
                      d={`M${p.x} ${p.y} L${q.x} ${q.y}`}
                      stroke="#e2e8f0"
                    />
                  );
                })}
              </g>

              {/* The platform */}
              <g className="eco-core">
                <circle cx="210" cy="210" r="34" fill="#03045e" />
                <circle cx="210" cy="210" r="46" fill="none" stroke="#0077b6" strokeOpacity="0.3" />
                <text x="210" y="214.5" textAnchor="middle" fontSize="12.5" fontWeight="600" fill="#ffffff">
                  Sharpnr
                </text>
              </g>

              {/* Areas */}
              {areas.map((area, i) => {
                const p = nodePos[i];
                const isActive = i === active;
                return (
                  <g
                    key={area.title}
                    className="eco-node cursor-pointer"
                    onMouseEnter={() => setActive(i)}
                    onClick={() => setActive(i)}
                  >
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r="20"
                      fill={isActive ? "#caf0f8" : "#ffffff"}
                      stroke={isActive ? "#0077b6" : "#cbd5e1"}
                      strokeWidth="1.4"
                    />
                    <circle cx={p.x} cy={p.y} r="4" fill={isActive ? "#0077b6" : "#94a3b8"} />
                    <text
                      x={p.x}
                      y={p.y < 210 ? p.y - 32 : p.y + 42}
                      textAnchor="middle"
                      fontSize="12"
                      fontWeight={isActive ? 600 : 500}
                      fill={isActive ? "#03045e" : "#64748b"}
                    >
                      {area.title}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* The six areas — typography, not cards */}
          <div ref={listRef}>
            <ul className="divide-y divide-slate-200 border-y border-slate-200">
              {areas.map((area, i) => {
                const isActive = i === active;
                return (
                  <li key={area.title}>
                    <button
                      type="button"
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onClick={() => setActive(i)}
                      className="flex w-full items-baseline gap-4 py-4 text-left"
                      aria-expanded={isActive}
                    >
                      <area.icon
                        className={`size-5 shrink-0 translate-y-1 transition-colors duration-200 ${
                          isActive ? "text-blue" : "text-slate-400"
                        }`}
                        strokeWidth={1.8}
                      />
                      <span className="flex flex-1 flex-wrap items-baseline justify-between gap-x-6">
                        <span
                          className={`text-title-md font-semibold transition-colors duration-200 ${
                            isActive ? "text-navy" : "text-slate-700"
                          }`}
                        >
                          {area.title}
                        </span>
                        <span className="text-sm text-slate-500">{area.purpose}</span>
                      </span>
                    </button>
                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ${
                        isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="pb-4 pl-9 text-sm text-slate-500">
                          {area.products.join(" · ")}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <Link
              to="/products"
              className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-blue transition-colors hover:text-blue-deep"
            >
              Explore every product
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
