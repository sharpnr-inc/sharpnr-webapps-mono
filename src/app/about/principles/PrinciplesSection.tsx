import { useRef, useState } from "react";
import { SectionIntro } from "@/app/shared/SectionIntro";
import { usePrinciplesAnimation } from "./animations/usePrinciplesAnimation";

const principles = [
  {
    title: "The business comes first",
    body: "Software exists to serve the business, not the other way round. Every decision here starts with how a real one actually runs its day.",
  },
  {
    title: "Connected without asking",
    body: "Nothing should sit on its own. If joining two things up takes effort, we have not finished the job.",
  },
  {
    title: "Simple, still capable",
    body: "Powerful does not have to feel complicated. The best products take complexity away rather than hand you more of it.",
  },
  {
    title: "Build once, hold everywhere",
    body: "The same foundation should suit a single café and a group of hotels, without either of them rebuilding how they work.",
  },
  {
    title: "Help people decide",
    body: "Software should make a decision easier to make, not make it for you. The judgement stays with the person.",
  },
  {
    title: "Trust is not a feature",
    body: "Security and permissions are not something bolted on afterwards. They sit quietly behind every action instead.",
  },
  {
    title: "Grow with the business",
    body: "Teams grow, branches open, trades change. Nobody should outgrow the platform they came to depend on.",
  },
] as const;

/**
 * Section 03 — How we build. Seven principles, typography only.
 * Designed to be read slowly, not skimmed.
 *
 * Pointing at one principle brings it forward and lets the rest recede,
 * so the list reads as a manifesto being worked through rather than as
 * seven equal rows. Only opacity moves — no scaling, no borders, no
 * cards; the section has no illustration by design.
 *
 * The emphasis is state-driven rather than a `group-hover` variant
 * because both the hovered item and its siblings need to write the same
 * property, and it lands on the inner wrapper, never on the `.principle`
 * element itself: GSAP animates opacity there on scroll, and a CSS
 * transition on the same property would lag every frame it writes.
 */
export function PrinciplesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  usePrinciplesAnimation({ sectionRef, introRef });

  return (
    <section ref={sectionRef} className="hp-section relative">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
        <div ref={introRef}>
          <SectionIntro
            tone="navy"
            align="center"
            eyebrow="How we build"
            heading={
              <>
                Every decision here,
                <br />
                <span className="text-twilight">starts with one of these.</span>
              </>
            }
            lede="Sharpnr isn't built around trends. It's built around a short list that hasn't changed."
          />
        </div>

        <ol
          className="mx-auto mt-16 max-w-2xl"
          onMouseLeave={() => setActive(null)}
        >
          {principles.map((principle, i) => (
            <li
              key={principle.title}
              className="principle border-t border-sky/12 first:border-t-0"
            >
              {/* Pointer only, and deliberately not focusable: these are
                  paragraphs, and seven meaningless tab stops would cost a
                  keyboard user more than the emphasis is worth. Nothing is
                  hidden behind the interaction — every principle is fully
                  readable at rest. */}
              <div
                onMouseEnter={() => setActive(i)}
                className={`flex gap-6 py-10 transition-opacity duration-300 ease-out md:gap-10 md:py-12 ${
                  active === null || active === i ? "opacity-100" : "opacity-40"
                }`}
              >
                <span className="text-sm font-medium tabular-nums text-cyan/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-heading-sm font-bold text-white">
                    {principle.title}
                  </h3>
                  <p className="prose-width mt-3 text-base leading-relaxed text-mute">
                    {principle.body}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <p className="mx-auto mt-10 max-w-xl text-center text-base text-mute">
          These aren't aspirations. They're what we argue about when we
          disagree.
        </p>
      </div>
    </section>
  );
}
