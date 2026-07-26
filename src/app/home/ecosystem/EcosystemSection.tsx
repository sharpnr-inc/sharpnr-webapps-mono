import { useCallback, useRef, useState } from "react";
import { Words } from "@/app/home/shared/Words";
import { useEcosystemAnimation } from "./animations/useEcosystemAnimation";

/*
 * Scene 04 — What happens after something happens.
 *
 * Mechanism: one sentence that keeps finishing itself.
 *
 * The opening clause never moves. Only the ending changes, again and again,
 * until the visitor realises a single ordinary event has been quietly
 * finishing work all over the business. Nothing is listed and nothing is
 * named — the departments were understood earlier, so only their effects
 * appear here.
 */
const OPENING = "A customer places an order,";

const ENDINGS = [
  "and the shelf already knows.",
  "and the invoice is already written.",
  "and the floor has already been told.",
  "and the courier is already booked.",
  "and the books are already correct.",
  "and tomorrow's plan has already changed.",
];

export function EcosystemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const eventRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);

  const onStep = useCallback((i: number) => setStep(Math.max(0, i)), []);

  useEcosystemAnimation({
    sectionRef,
    headingRef,
    copyRef,
    eventRef,
    stageRef,
    steps: ENDINGS.length,
    onStep,
  });

  const ending = ENDINGS[Math.min(step, ENDINGS.length - 1)];

  return (
    <section
      ref={sectionRef}
      className="hp-section hp-sec relative flex hp-flex-section min-h-svh items-center px-6 md:px-10"
    >
      <div ref={stageRef} className="hp-stage mx-auto w-full max-w-4xl px-7 py-14 md:px-14 md:py-20">
        <h2 ref={headingRef} className="sr-only">
          <Words text="Everything works together" />
        </h2>

        {/* The clause that never moves */}
        <p
          ref={eventRef}
          className="text-[clamp(1.5rem,3.6vw,2.75rem)] font-extrabold leading-[1.2] tracking-[-0.035em] text-mute/50"
        >
          {OPENING}
        </p>

        {/* The ending that keeps arriving */}
        <p
          key={ending}
          className="hp-slot mt-3 text-[clamp(1.5rem,3.6vw,2.75rem)] font-extrabold leading-[1.2] tracking-[-0.035em] text-white md:mt-4"
          aria-live="polite"
        >
          {ending}
        </p>

        <p
          ref={copyRef}
          className="mt-16 max-w-sm hp-lede text-mute md:mt-20"
        >
          Nobody was asked to do any of that.
        </p>
      </div>
    </section>
  );
}
