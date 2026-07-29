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
 *
 * The page's only split, so there is nothing for it to alternate against.
 * The argument sits left and the categories right; on a phone the argument
 * still comes first, which is the markup order anyway.
 */
export function UpdatesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  useUpdatesAnimation({ sectionRef, introRef });

  return (
    <section
      ref={sectionRef}
      className="relative border-t border-white/[0.07]"
    >
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <div ref={introRef} className="lg:col-span-5">
            <SectionIntro
              tone="navy"
              eyebrow="What's new"
              heading={
                <>
                  Always improving,
                  <br />
                  <span className="text-twilight">rarely announcing it.</span>
                </>
              }
              lede="Some releases you will see. Most of them quietly make an ordinary day faster."
              size="md"
            />
            <p className="mt-6 text-sm text-mute/70">
              Updates go up here as they ship, each one answering the same
              question: what does this change for the business using it?
            </p>
          </div>

          <div className="lg:col-span-7">
            <ul className="divide-y divide-sky/12 border-y border-sky/12">
              {categories.map((cat) => (
                <li key={cat.name} className="update-cat flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4">
                  <h3 className="text-base font-semibold text-white">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-mute">{cat.line}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
