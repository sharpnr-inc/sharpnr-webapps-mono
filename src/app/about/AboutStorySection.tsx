import { useRef } from "react";
import { Compass, Network, Telescope } from "lucide-react";
import { useAboutStoryAnimation } from "./animations/useAboutStoryAnimation";

const pillars = [
  {
    icon: Compass,
    title: "Mission",
    description:
      "Unify business operations — bring accounting, people, customers, communication, and industry workflows into one connected platform that any organization can run on.",
  },
  {
    icon: Network,
    title: "Vision",
    description:
      "A world where organizations don't just run on Sharpnr — they connect through it. Org to org, industry to industry, a network where business flows without friction.",
  },
  {
    icon: Telescope,
    title: "Where we're going",
    description:
      "The ecosystem never stops expanding — new applications, new industries, and new connections, shaped by the organizations already building on Sharpnr in early access.",
  },
] as const;

export function AboutStorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);

  useAboutStoryAnimation({ sectionRef, storyRef, pillarsRef });

  return (
    <section ref={sectionRef} className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* ── The story ───────────────────────────────────────── */}
        <div
          ref={storyRef}
          className="mx-auto flex max-w-3xl flex-col gap-6 text-lg leading-relaxed text-text-muted"
        >
          <p>
            Every organization we have ever seen runs on a patchwork — one
            system for the books, another for payroll, a third for customers,
            a fourth for the actual operation. None of them talk. People
            become the integration layer, and the truth about the business
            lives in no single place.
          </p>
          <p>
            <span className="font-semibold text-text-dark">
              Sharpnr exists to end that patchwork.
            </span>{" "}
            One platform where the restaurant's order becomes the
            accountant's journal entry, where the hospital's roster is the
            payroll, and where the whole organization — every company, every
            branch, every industry — is visible from a single command center.
          </p>
          <p>
            And because business never happens inside one organization alone,
            Sharpnr connects organizations to each other — trading,
            communicating, and settling through Sharp-Marketplace, the
            org-to-org layer of the platform.
          </p>
          <p>
            We are in alpha, and we are building in the open. The platform you
            see today is the foundation of something much larger.
          </p>
        </div>

        {/* ── Pillars ─────────────────────────────────────────── */}
        <div
          ref={pillarsRef}
          className="mx-auto mt-20 grid max-w-5xl gap-4 md:grid-cols-3"
        >
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-2xl border border-border bg-surface p-7"
            >
              <div className="flex size-11 items-center justify-center rounded-lg bg-primary-light">
                <pillar.icon className="size-5 text-primary" strokeWidth={1.7} />
              </div>
              <h2 className="mt-5 font-display text-lg font-semibold text-text-dark">
                {pillar.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
