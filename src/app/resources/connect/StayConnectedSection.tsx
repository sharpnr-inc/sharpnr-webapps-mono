import { useRef, useState } from "react";
import { Check } from "lucide-react";
import { SectionIntro } from "@/app/shared/SectionIntro";
import { useStayConnectedAnimation } from "./animations/useStayConnectedAnimation";

const topics = [
  "Business insights",
  "Sharpnr platform",
  "Sharpnr industries",
  "Engineering journal",
  "Design notebook",
  "Research & reports",
] as const;

/**
 * Section 06 — Stay connected. Subscribing to knowledge, not
 * marketing emails: choose topics, then reach out. No backend
 * pretence — an honest note straight to the team.
 */
export function StayConnectedSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<string[]>([]);

  useStayConnectedAnimation({ sectionRef, introRef });

  const toggle = (topic: string) =>
    setSelected((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic],
    );

  const mailto = () => {
    const chosen = selected.length > 0 ? selected.join(", ") : "everything";
    const subject = encodeURIComponent("Stay connected — Sharpnr Resources");
    const body = encodeURIComponent(
      `Hi Sharpnr team,\n\nI'd like to follow these topics: ${chosen}.\n\nThanks!`,
    );
    return `mailto:support@sharpnr.com?subject=${subject}&body=${body}`;
  };

  return (
    <section ref={sectionRef} className="bg-ice/45">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <div ref={introRef} className="mx-auto max-w-2xl text-center">
          <SectionIntro
            align="center"
            eyebrow="Stay connected"
            heading="Stay connected to the ideas that matter to you."
            lede="Choose the topics you care about and we'll write when something is genuinely worth sharing. No marketing campaigns. No unnecessary emails."
          />
        </div>

        <div className="mx-auto mt-12 max-w-xl">
          <fieldset>
            <legend className="sr-only">Topics to follow</legend>
            <div className="flex flex-wrap justify-center gap-2.5">
              {topics.map((topic) => {
                const isOn = selected.includes(topic);
                return (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => toggle(topic)}
                    aria-pressed={isOn}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                      isOn
                        ? "border-blue bg-white text-navy"
                        : "border-slate-300 bg-white/60 text-slate-600 hover:border-slate-400"
                    }`}
                  >
                    {isOn && <Check className="size-3.5 text-blue" strokeWidth={2.2} />}
                    {topic}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="mt-8 flex flex-col items-center gap-4">
            <a
              href={mailto()}
              className="inline-flex items-center justify-center rounded-lg bg-blue px-6 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-deep"
            >
              Follow these topics
            </a>
            <p className="max-w-sm text-center text-xs text-slate-500">
              This sends us a short note from your email. You stay in control —
              update your interests or step away anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
