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
 *
 * Centred and full width — the page settles here and stays centred
 * through the closing invitation.
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
    <section
      ref={sectionRef}
      className="relative border-t border-white/[0.07]"
    >
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <div ref={introRef} className="mx-auto max-w-2xl text-center">
          <SectionIntro
            tone="navy"
            align="center"
            eyebrow="Stay connected"
            heading={
              <>
                Pick your topics,
                <br />
                <span className="text-twilight">hear from us rarely.</span>
              </>
            }
            lede="We'll write when there is something genuinely worth reading. No campaigns, and nothing you didn't ask for."
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
                        ? "border-cyan/70 bg-cyan/10 text-white"
                        : "border-sky/20 bg-sky/[0.025] text-sky/85 hover:border-sky/40 hover:text-white"
                    }`}
                  >
                    {isOn && <Check className="size-3.5 text-cyan" strokeWidth={2.2} />}
                    {topic}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="mt-8 flex flex-col items-center gap-4">
            <a
              href={mailto()}
              className="group inline-flex h-[52px] select-none items-center justify-center gap-2.5 bg-cyan px-7 text-[0.9375rem] font-semibold tracking-tight text-navy transition-[transform,background-color,border-color,color] duration-180 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-sky focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-cyan active:translate-y-0 motion-safe:hover:-translate-y-0.5"
            >
              Follow these topics
            </a>
            <p className="max-w-sm text-center text-xs text-mute/70">
              This sends us a short note from your email. You stay in control —
              update your interests or step away anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
