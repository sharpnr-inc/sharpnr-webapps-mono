import { useRef } from "react";
import { SectionIntro } from "@/app/shared/SectionIntro";
import { useCollabAnimation } from "./animations/useCollabAnimation";

const stages = [
  {
    stage: "Conversation",
    product: "Cables",
    positioning: "Communication built for organizations.",
    story:
      "More than messaging — conversations stay connected to the work itself, whether you're chatting with colleagues, across departments or with another organization.",
    capabilities: [
      "Messaging & channels",
      "Voice & video",
      "Screen sharing",
      "Organization-wide channels",
      "Cross-organization conversations",
      "Conversation summaries",
    ],
  },
  {
    stage: "Knowledge",
    product: "Folio",
    positioning: "Where your organization's knowledge lives.",
    story:
      "Ideas deserve more than scattered files. One place to create, organize and collaborate — every document stays connected to the conversations and work that created it.",
    capabilities: [
      "Documents & spreadsheets",
      "Presentations",
      "Whiteboards & notes",
      "Wikis & knowledge base",
      "Real-time collaboration",
      "Version history",
    ],
  },
  {
    stage: "Execution",
    product: "Tasks",
    positioning: "Where ideas become execution.",
    story:
      "Every conversation should end with action. Turn discussions into structured work your team can prioritize, assign and complete together — with its context intact.",
    capabilities: [
      "Tasks & projects",
      "Boards & lists",
      "Timelines & milestones",
      "Dependencies",
      "Automation",
      "Progress tracking",
    ],
  },
] as const;

/**
 * Section 04 — Collaboration & execution. One flowing experience:
 * conversation becomes knowledge becomes completed work.
 */
export function CollabSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  useCollabAnimation({ sectionRef, introRef });

  return (
    <section ref={sectionRef} className="bg-soft">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
        <div ref={introRef}>
          <SectionIntro
            align="center"
            eyebrow="Collaboration & execution"
            heading={
              <>
                Great teams don't switch context.
                <br />
                They stay connected.
              </>
            }
            lede="Communication creates ideas. Ideas become knowledge. Knowledge becomes action. Sharpnr keeps every step connected, so your team always knows what happened and what happens next."
          />
        </div>

        {/* Conversation → Knowledge → Execution, one flow */}
        <div className="relative mt-16">
          <div className="absolute inset-x-[16.66%] top-4 hidden h-px bg-slate-300 lg:block">
            <div className="collab-fill h-full w-full origin-left scale-x-0 bg-blue/60" />
          </div>

          <div className="grid gap-14 lg:grid-cols-3 lg:gap-10">
            {stages.map((s) => (
              <div key={s.product} className="collab-stage">
                <div className="flex items-center gap-3 lg:flex-col lg:gap-4">
                  <span className="relative z-10 block size-2.5 rounded-full bg-blue lg:mx-auto" />
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-blue lg:text-center">
                    {s.stage}
                  </p>
                </div>
                <div className="mt-4 lg:text-center">
                  <h3 className="text-heading-sm font-bold text-navy">
                    {s.product}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {s.positioning}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 lg:mx-auto lg:max-w-xs">
                    {s.story}
                  </p>
                  <ul className="mt-5 space-y-1.5 lg:mx-auto lg:max-w-56">
                    {s.capabilities.map((c) => (
                      <li key={c} className="text-sm text-slate-500 lg:text-center">
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mx-auto mt-16 max-w-lg text-center text-base text-slate-600">
          Tasks can be created from Cables conversations, Folio documents,
          operational workflows or IVA recommendations. Nothing is copied.
          Nothing is lost.
        </p>
      </div>
    </section>
  );
}
