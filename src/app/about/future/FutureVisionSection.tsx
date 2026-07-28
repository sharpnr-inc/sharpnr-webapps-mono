import { useRef } from "react";
import { SectionIntro } from "@/app/shared/SectionIntro";
import { useFutureVisionAnimation } from "./animations/useFutureVisionAnimation";

const lookingAhead = [
  "Every business operates through connected experiences",
  "Intelligence becomes part of everyday work",
  "Organizations adopt technology without unnecessary complexity",
  "Business knowledge stays connected at any size",
  "Software quietly supports the business instead of demanding attention",
] as const;

/**
 * Section 04 — The future we're building. Not a roadmap: the role
 * Sharpnr wants to play in how businesses operate for decades.
 */
export function FutureVisionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useFutureVisionAnimation({ sectionRef, bodyRef });

  return (
    <section ref={sectionRef} className="hp-section relative">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
        <div ref={bodyRef} className="mx-auto max-w-2xl">
          <SectionIntro
            tone="navy"
            eyebrow="The future we're building"
            heading={
              <>
                We're not building software for today.
                <br />
                We're building the foundation for what's next.
              </>
            }
            lede="Our vision isn't another collection of business applications. It's connected business infrastructure that evolves as organizations, industries and technology change — without becoming obsolete every few years."
          />

          <div className="mt-8 space-y-5 text-base leading-relaxed text-mute">
            <p>
              As Sharpnr grows, organizations shouldn't need to start over.
              Today's small business could become tomorrow's enterprise. One
              location could become hundreds. One industry could become many.
              The platform should keep feeling familiar while becoming more
              powerful.
            </p>
          </div>

          <div className="mt-10">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-mute/70">
              We're building for a future where
            </p>
            <ul className="mt-4 space-y-2.5">
              {lookingAhead.map((item) => (
                <li key={item} className="border-l-2 border-sky/20 pl-4 text-base text-mute">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 space-y-5 text-base leading-relaxed text-mute">
            <p>
              Building business infrastructure carries responsibility.
              Organizations trust platforms with their people, their customers,
              their finances and their future. We believe that trust must be
              earned every day — through thoughtful design, reliable technology
              and a relentless focus on real business problems.
            </p>
            <p className="font-medium text-white">
              The destination isn't more software. It's better businesses.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
