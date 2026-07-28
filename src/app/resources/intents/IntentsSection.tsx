import { useRef } from "react";
import { SectionIntro } from "@/app/shared/SectionIntro";
import { useIntentsAnimation } from "./animations/useIntentsAnimation";

const intents = [
  {
    title: "Learn",
    line: "Actionable knowledge you can apply immediately.",
    contains: "Practical guides · Step-by-step tutorials · Business fundamentals · Templates · Playbooks",
  },
  {
    title: "Think",
    line: "For readers who enjoy understanding why the world is changing.",
    contains: "Perspectives · Industry insights · Research · Leadership · The future of connected businesses",
  },
  {
    title: "Build",
    line: "For developers, designers and builders of modern products.",
    contains: "Engineering · Architecture · Design · Technical decisions · Product thinking",
  },
  {
    title: "Grow",
    line: "Real-world experiences that help organizations improve.",
    contains: "Business stories · Industry playbooks · Operational improvements · Practical examples",
  },
  {
    title: "Stay updated",
    line: "Everything new across the Sharpnr ecosystem.",
    contains: "Product releases · Platform updates · Announcements · Roadmap progress",
  },
] as const;

/**
 * Section 02 — Explore by intent. Knowledge organized around what
 * people are trying to accomplish, not how content was published.
 *
 * A full-width list, not a split: five paths read as a set of doors, and
 * putting them in one column of a 50/50 would make four of them wrap.
 */
export function IntentsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  useIntentsAnimation({ sectionRef, introRef });

  return (
    <section
      ref={sectionRef}
      id="explore"
      className="relative scroll-mt-24 border-t border-white/[0.07]"
    >
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <div ref={introRef}>
          <SectionIntro
            tone="navy"
            eyebrow="Explore by intent"
            heading="Explore by what you want to accomplish."
            lede="Sometimes you want to learn. Sometimes you need practical guidance. Sometimes you simply want to stay informed. Start with the path that matches your goal."
          />
        </div>

        <ol className="mt-14 divide-y divide-sky/12 border-y border-sky/12">
          {intents.map((intent, i) => (
            <li key={intent.title} className="intent-row py-8 md:py-10">
              <div className="grid gap-3 md:grid-cols-12 md:items-baseline md:gap-8">
                <span className="font-mono text-sm tabular-nums tracking-[0.18em] text-cyan/60 md:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-heading-sm font-bold text-white md:col-span-3 md:text-heading-md">
                  {intent.title}
                </h3>
                <div className="md:col-span-8">
                  <p className="text-base font-medium text-sky/85">
                    {intent.line}
                  </p>
                  <p className="mt-2 text-sm text-mute">{intent.contains}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
