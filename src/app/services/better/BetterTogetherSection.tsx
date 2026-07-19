import { useRef } from "react";
import { SectionIntro } from "@/app/shared/SectionIntro";
import { useBetterTogetherAnimation } from "./animations/useBetterTogetherAnimation";

const stories = [
  {
    title: "Growing your team",
    line: "A new employee gets identity, access, teams, tasks, documents and payroll — from one moment of welcome.",
  },
  {
    title: "Serving a customer",
    line: "One relationship flows through operations, finance and communication, and every future opportunity is remembered.",
  },
  {
    title: "Working together",
    line: "A project moves from conversation to knowledge to completed work, with leadership informed the whole way.",
  },
  {
    title: "Working with partners",
    line: "A supplier relationship begins, purchases complete, finance updates itself — and future decisions get smarter.",
  },
] as const;

/**
 * Section 09 — Better together. Most businesses don't have a
 * software problem; they have a connection problem. Short synthesis:
 * the value is everything working as one.
 */
export function BetterTogetherSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  useBetterTogetherAnimation({ sectionRef, introRef });

  return (
    <section ref={sectionRef} className="bg-ice/45">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <div ref={introRef}>
          <SectionIntro
            align="center"
            eyebrow="Better together"
            heading={
              <>
                Every capability is valuable.
                <br />
                Together, they become transformational.
              </>
            }
            lede="Most businesses don't have a software problem — they have a connection problem. Every department spends time moving information instead of moving the business forward. Sharpnr was designed differently."
          />
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-x-12 gap-y-10 sm:grid-cols-2">
          {stories.map((story) => (
            <div key={story.title} className="better-story">
              <h3 className="text-title-md font-semibold text-navy">
                {story.title}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-slate-600">
                {story.line}
              </p>
            </div>
          ))}
        </div>

        <p className="better-close mx-auto mt-14 max-w-xl text-center text-base text-slate-600">
          Technology shouldn't force organizations to work harder. When
          capabilities are connected, people spend less time managing software
          and more time growing the business.
        </p>
      </div>
    </section>
  );
}
