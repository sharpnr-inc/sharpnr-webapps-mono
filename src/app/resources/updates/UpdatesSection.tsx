import { useRef } from "react";
import { SectionIntro } from "@/app/shared/SectionIntro";
import { useUpdatesAnimation } from "./animations/useUpdatesAnimation";

const categories = [
  { name: "Platform", line: "Major improvements and new capabilities." },
  { name: "Products", line: "Updates across the entire product family." },
  { name: "Sharpnr Industries", line: "New operational experiences and workflows." },
  { name: "Design", line: "Usability and experience refinements." },
  { name: "Performance", line: "Reliability and speed that make everyday work better." },
  { name: "Ecosystem", line: "Network growth and connected platform improvements." },
] as const;

/**
 * Section 05 — What's new. Progress over promotion: meaningful
 * milestones, not technical changelogs.
 */
export function UpdatesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  useUpdatesAnimation({ sectionRef, introRef });

  return (
    <section ref={sectionRef} className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <div ref={introRef} className="lg:col-span-5">
            <SectionIntro
              eyebrow="What's new"
              heading={
                <>
                  Always improving.
                  <br />
                  Always moving forward.
                </>
              }
              lede="Great platforms are never finished. Every release moves Sharpnr forward — some improvements are visible, others quietly make everyday work faster and more reliable."
              size="md"
            />
            <p className="mt-6 text-sm text-slate-500">
              Updates are published here as the platform evolves, each one
              answering a single question: how does this make the platform
              better for businesses?
            </p>
          </div>

          <div className="lg:col-span-7">
            <ul className="divide-y divide-slate-200 border-y border-slate-200">
              {categories.map((cat) => (
                <li key={cat.name} className="update-cat flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4">
                  <h3 className="text-base font-semibold text-slate-900">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-slate-500">{cat.line}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
