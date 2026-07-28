import { useRef } from "react";
import { SectionIntro } from "@/app/shared/SectionIntro";
import { StatusBadge } from "@/app/shared/StatusBadge";
import { useLibraryAnimation } from "./animations/useLibraryAnimation";

const collections = [
  {
    name: "Business fundamentals",
    line: "Practical knowledge for running modern organizations.",
    topics: "Operations · Finance · People · Customer experience · Leadership · Productivity",
  },
  {
    name: "Industry playbooks",
    line: "Deep dives into how different industries actually operate.",
    topics: "Hospitality · Healthcare · Retail · Corporate · Education · Manufacturing",
  },
  {
    name: "Technology & innovation",
    line: "The technology shaping how businesses work.",
    topics: "Intelligence · Automation · Data · Security · Modern business software",
  },
  {
    name: "Product knowledge",
    line: "Everything related to the Sharpnr platform.",
    topics: "Product guides · Walkthroughs · Best practices · Release notes",
  },
  {
    name: "Research & reports",
    line: "Long-form observations and original analysis.",
    topics: "Industry trends · Operational insights · The future of connected business",
  },
] as const;

/**
 * Section 03 — The learning library. Curated collections rather than
 * a chronological feed — with an honest note about what exists today.
 *
 * A grid, so full width rather than a split.
 */
export function LibrarySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  useLibraryAnimation({ sectionRef, introRef });

  return (
    <section
      ref={sectionRef}
      className="relative border-t border-white/[0.07]"
    >
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <div ref={introRef}>
          <SectionIntro
            tone="navy"
            eyebrow="Learning library"
            heading={
              <>
                Keep learning.
                <br />
                One idea leads to the next.
              </>
            }
            lede="Learning rarely happens through one article — a single idea leads to another, and one answer opens new possibilities. The library is organized as connected collections, not isolated posts."
          />
        </div>

        <div className="mt-14 grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection) => (
            <div key={collection.name} className="library-shelf border-t border-sky/25 pt-5">
              <h3 className="text-title-lg font-semibold text-white">
                {collection.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mute">
                {collection.line}
              </p>
              <p className="mt-3 text-sm text-mute/70">{collection.topics}</p>
            </div>
          ))}

          {/* Honesty about today */}
          <div className="library-shelf flex flex-col items-start justify-center rounded-2xl border border-sky/15 bg-sky/[0.025] p-6">
            <StatusBadge kind="early" tone="navy" label="Being written" />
            <p className="mt-4 text-sm leading-relaxed text-mute">
              We&rsquo;re building the library in the open. The first guides,
              playbooks and reports are being written now, and every collection
              grows as the platform does.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
