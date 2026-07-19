import { useRef } from "react";
import { SectionIntro } from "@/app/shared/SectionIntro";
import { usePrinciplesAnimation } from "./animations/usePrinciplesAnimation";

const principles = [
  {
    title: "Businesses first",
    body: "Technology exists to support businesses — not the other way around. Every decision begins with understanding how real organizations operate.",
  },
  {
    title: "Connected by default",
    body: "Information should never live in isolation. Connection shouldn't require additional effort; it's built into the platform.",
  },
  {
    title: "Simplicity without sacrificing capability",
    body: "Powerful software doesn't have to feel complicated. The best products reduce complexity instead of introducing more of it.",
  },
  {
    title: "Build once. Scale everywhere.",
    body: "The same connected foundation should support businesses of every size and every industry — without forcing anyone to rebuild how they work.",
  },
  {
    title: "Intelligence should assist, not replace",
    body: "Technology should help people make better decisions — not make decisions instead of them. Human judgment always matters.",
  },
  {
    title: "Trust is built into the platform",
    body: "Security isn't a feature and governance isn't an afterthought. Trust should exist quietly in the background of every action.",
  },
  {
    title: "Grow with the business",
    body: "Businesses evolve, teams grow, industries expand. Organizations should never outgrow the platform they rely on.",
  },
] as const;

/**
 * Section 03 — How we build. Seven principles, typography only.
 * Designed to be read slowly, not skimmed.
 */
export function PrinciplesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  usePrinciplesAnimation({ sectionRef, introRef });

  return (
    <section ref={sectionRef} className="bg-soft">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
        <div ref={introRef}>
          <SectionIntro
            align="center"
            eyebrow="How we build"
            heading="Every decision begins with a principle."
            lede="Sharpnr isn't built around trends. It's built around a small set of principles that shape every product, every capability and every experience — and they don't change."
          />
        </div>

        <ol className="mx-auto mt-16 max-w-2xl">
          {principles.map((principle, i) => (
            <li
              key={principle.title}
              className="principle border-t border-slate-200 py-10 first:border-t-0 md:py-12"
            >
              <div className="flex gap-6 md:gap-10">
                <span className="text-sm font-medium tabular-nums text-slate-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-heading-sm font-bold text-navy">
                    {principle.title}
                  </h3>
                  <p className="prose-width mt-3 text-base leading-relaxed text-slate-600">
                    {principle.body}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <p className="mx-auto mt-10 max-w-xl text-center text-base text-slate-600">
          These aren't aspirations. They're the standard we hold ourselves to
          every time we design a feature, write code or solve a problem.
        </p>
      </div>
    </section>
  );
}
