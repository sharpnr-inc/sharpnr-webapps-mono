import { useRef } from "react";
import { SectionIntro } from "@/app/shared/SectionIntro";
import { useFutureVisionAnimation } from "./animations/useFutureVisionAnimation";

const lookingAhead = [
  "Nobody types the same thing into two systems",
  "A useful answer is there when the question comes up",
  "Adopting software doesn't need a project team",
  "What the business knows stays in one place, at any size",
  "Software sits underneath the work instead of interrupting it",
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
                Businesses change,
                <br />
                <span className="text-twilight">you don't start over.</span>
              </>
            }
            lede="A café that turns into three cafés should not have to move to different software to do it."
          />

          {/* The paragraph that sat here said the heading and the lede again in
              longer words — a shop growing, a team growing, nothing to relearn.
              Cut rather than reworded. */}
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
              A business hands over its people, its customers and its money when
              it picks software. That is not a trust you earn once.
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
