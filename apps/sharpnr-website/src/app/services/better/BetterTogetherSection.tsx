import { useRef } from "react";
import { SectionIntro } from "@/app/shared/SectionIntro";
import {
  DiagramTeam,
  DiagramCustomer,
  DiagramCollaboration,
  DiagramPartners,
} from "../diagrams";
import { useBetterTogetherAnimation } from "./animations/useBetterTogetherAnimation";

const stories = [
  {
    title: "Growing your team",
    line: "One new starter, and their login, their team, their first tasks and their pay are all already set up.",
    diagram: DiagramTeam,
  },
  {
    title: "Serving a customer",
    line: "The order, the invoice and the conversation all sit on the same customer, and stay there for the next visit.",
    diagram: DiagramCustomer,
  },
  {
    title: "Working together",
    line: "A project goes from a conversation to a document to finished work, without being retyped on the way.",
    diagram: DiagramCollaboration,
  },
  {
    title: "Working with partners",
    line: "You order from a supplier, and the supplier and the entry appear in your books without anyone adding them.",
    diagram: DiagramPartners,
  },
] as const;

/**
 * Section 09 — Better together. Most businesses don't have a
 * software problem; they have a connection problem. Short synthesis:
 * the value is everything working as one.
 *
 * Centred and full width. The seven capability sections above alternate
 * left and right; the swinging stops here so the page settles into its
 * ending rather than carrying on.
 *
 * The four stories were four paragraphs in a grid, which made a synthesis
 * section read as a list of claims. Each now carries a diagram that makes
 * the same argument with the sentence removed — see `../diagrams`.
 */
export function BetterTogetherSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  useBetterTogetherAnimation({ sectionRef, introRef });

  return (
    <section
      ref={sectionRef}
      className="relative border-t border-white/[0.07]"
    >
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <div ref={introRef}>
          <SectionIntro
            tone="navy"
            align="center"
            eyebrow="Better together"
            heading={
              <>
                Useful on their own,
                <br />
                <span className="text-twilight">better side by side.</span>
              </>
            }
            lede="Most businesses don't have a software problem. They have a problem with the gaps between the software, and somebody is paid to stand in them."
          />
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-4 sm:grid-cols-2">
          {stories.map((story) => {
            const Diagram = story.diagram;
            return (
              <div
                key={story.title}
                className="better-story group/story flex flex-col justify-between gap-4 rounded-xl border border-sky/15 bg-sky/[0.025] p-5 transition-colors duration-200 hover:border-sky/30 hover:bg-sky/[0.05] md:p-6"
              >
                <Diagram />
                <div>
                  <h3 className="text-title-md font-semibold text-white">
                    {story.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-mute">
                    {story.line}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <p className="better-close mx-auto mt-14 max-w-xl text-center text-base text-mute">
          Nobody should be working harder because of their software. Close the
          gaps and that job disappears.
        </p>
      </div>
    </section>
  );
}
