import { useRef, useState } from "react";
import {
  ShoppingBag,
  ClipboardCheck,
  Receipt,
  Package,
  TrendingUp,
  MessageSquareText,
} from "lucide-react";
import { SectionIntro } from "@/app/shared/SectionIntro";
import { useFlowAnimation } from "./animations/useFlowAnimation";

const flowSteps = [
  {
    icon: ShoppingBag,
    title: "Customer places an order",
    note: "A guest orders — at the table, online or by QR.",
  },
  {
    icon: ClipboardCheck,
    title: "Sharp Operations receives it",
    note: "The order reaches the right team instantly.",
  },
  {
    icon: Receipt,
    title: "Sharp Accounting records it",
    note: "The transaction becomes part of your books as it happens.",
  },
  {
    icon: Package,
    title: "Inventory updates automatically",
    note: "Stock adjusts the moment the order is confirmed.",
  },
  {
    icon: TrendingUp,
    title: "Manager receives live insights",
    note: "Performance is visible without waiting for reports.",
  },
  {
    icon: MessageSquareText,
    title: "IVA suggests the next action",
    note: "A quiet recommendation, based on your business.",
  },
] as const;

/**
 * Section 03 — One Business. One Flow. The signature homepage moment:
 * one business event travels the platform, step by step, and stays
 * connected. Activates once on scroll; hover or focus a stage for a
 * short explanation.
 */
export function FlowSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const outroRef = useRef<HTMLParagraphElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  useFlowAnimation({ sectionRef, introRef, outroRef, onComplete: () => setDone(true) });

  const caption =
    hovered !== null
      ? flowSteps[hovered].note
      : done
        ? "No duplicate work. No manual updates. Just one connected flow."
        : " ";

  return (
    <section ref={sectionRef} className="bg-soft">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
        <div ref={introRef}>
          <SectionIntro
            align="center"
            eyebrow="One Business. One Flow."
            heading="Every business event flows through one connected platform."
            lede="One action shouldn't require updates in five different systems. With Sharpnr, operations, finance, people, communication and intelligence stay connected from the moment work begins."
          />
        </div>

        {/* ── The flow — horizontal on desktop, vertical on mobile ── */}
        <div className="relative mt-16 md:mt-20">
          {/* Desktop track */}
          <div className="absolute left-[8.33%] right-[8.33%] top-6 hidden h-px bg-slate-200 md:block">
            <div className="flow-fill-x h-full w-full origin-left scale-x-0 bg-blue" />
          </div>
          {/* Mobile track */}
          <div className="absolute bottom-6 left-6 top-6 w-px bg-slate-200 md:hidden">
            <div className="flow-fill-y h-full w-full origin-top scale-y-0 bg-blue" />
          </div>

          <ol className="relative grid gap-10 md:grid-cols-6 md:gap-4">
            {flowSteps.map((step, i) => (
              <li key={step.title} className="flex gap-5 md:flex-col md:items-center md:gap-0">
                <button
                  type="button"
                  className="flow-node relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-400"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(i)}
                  onBlur={() => setHovered(null)}
                  aria-label={`${step.title} — ${step.note}`}
                >
                  <step.icon className="size-5" strokeWidth={1.8} />
                </button>
                <div className="md:mt-4 md:text-center">
                  <h3 className="flow-title text-sm font-semibold text-slate-500 md:mx-auto md:max-w-36">
                    {step.title}
                  </h3>
                  {/* Notes read inline on touch layouts */}
                  <p className="mt-1.5 text-sm text-slate-500 md:hidden">
                    {step.note}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          {/* Shared caption — hover explanations without layout shift */}
          <p
            className="mt-10 hidden min-h-6 text-center text-sm text-slate-500 md:block"
            aria-live="polite"
          >
            {caption}
          </p>
        </div>

        {/* The outcome — stays on screen once the flow completes */}
        <p
          ref={outroRef}
          className="mt-12 text-center text-heading-sm font-bold text-navy opacity-0 md:mt-8"
        >
          Everything stays connected.
        </p>
      </div>
    </section>
  );
}
