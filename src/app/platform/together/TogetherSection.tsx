import { useRef } from "react";
import { SectionIntro } from "@/app/shared/SectionIntro";
import { useTogetherAnimation } from "./animations/useTogetherAnimation";

const journey = [
  {
    title: "A conversation starts",
    detail: "A manager raises an idea with the team.",
  },
  {
    title: "The discussion becomes a document",
    detail: "Meeting notes grow into a shared plan.",
  },
  {
    title: "Action items become tasks",
    detail: "Work is assigned without copying anything.",
  },
  {
    title: "Progress flows back",
    detail: "Updates appear where the conversation began.",
  },
] as const;

const products = [
  {
    name: "Cables",
    line: "Communication built for organizations.",
    detail:
      "Chat, voice, video and channels — including conversations with other organizations. Share business records directly inside the discussion.",
  },
  {
    name: "Folio",
    line: "Knowledge built for teams.",
    detail:
      "Documents, spreadsheets, presentations, whiteboards and wikis, created together in real time and connected to the work around them.",
  },
  {
    name: "Tasks",
    line: "Where work gets done.",
    detail:
      "Turn conversations into action — plan projects, assign work and track progress without losing the context that created it.",
  },
] as const;

/**
 * Section 05 — Work happens together. Communication, knowledge and
 * execution shown as one continuous workflow, never as three
 * separate applications.
 *
 * The page's right-facing section. Foundation, immediately above,
 * faces left; two splits leaning the same way read as a template
 * rather than as a page. The intro is pushed into the same column the
 * product copy occupies, so heading, product names and body all share
 * one left edge down the right half.
 */
export function TogetherSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);

  useTogetherAnimation({ sectionRef, introRef, productsRef });

  return (
    <section ref={sectionRef} className="hp-section relative">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
        {/* calc(50% - 2.5rem) is exactly one column of the grid below at
            its lg gap-20, so the intro lands over the product copy rather
            than near it. */}
        <div ref={introRef} className="lg:ml-auto lg:w-[calc(50%-2.5rem)]">
          <SectionIntro
            tone="navy"
            eyebrow="Collaboration"
            heading={
              <>
                Work shouldn't stop
                <br />
                when you switch applications.
              </>
            }
            lede="From the first conversation to the final task, every part of your team's work stays connected — no copying, no lost context, no switching."
          />
        </div>

        <div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* One continuous workflow */}
          <div className="relative">
            <div className="absolute bottom-5 left-[9px] top-5 w-px bg-sky/15">
              <div className="together-fill h-full w-full origin-top scale-y-0 bg-cyan/70" />
            </div>
            <ol className="relative space-y-9">
              {journey.map((stage) => (
                <li key={stage.title} className="together-stage flex gap-5">
                  <span className="relative z-10 mt-1 block size-[19px] shrink-0 rounded-full border-2 border-cyan/60 bg-canvas" />
                  <div>
                    <h3 className="text-title-md font-semibold text-white">
                      {stage.title}
                    </h3>
                    <p className="mt-1 text-sm text-mute/80">{stage.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="together-outro mt-9 pl-10 text-sm font-medium text-white">
              The conversation stays connected the whole way.
            </p>
          </div>

          {/* The products behind the workflow. Right column, so the block
              sits against the outer edge of its own column — capped on the
              wrapper rather than on each paragraph, so every name and every
              line of copy shares one left edge. */}
          <div ref={productsRef} className="space-y-9 lg:ml-auto lg:max-w-xl lg:pt-2">
            {products.map((product) => (
              <div key={product.name}>
                <h3 className="text-title-lg font-semibold text-white">
                  {product.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-sky/80">
                  {product.line}
                </p>
                <p className="mt-2 text-base leading-relaxed text-mute">
                  {product.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
