import { useCallback, useRef, useState } from "react";
import { useIndustriesAnimation } from "./animations/useIndustriesAnimation";

/*
 * Scene 06 — Whose business this is for.
 *
 * Mechanism: an immovable frame with one word changing inside it.
 *
 * A roster would be a list, and a list would say "we support these". Instead
 * the sentence never moves — not by a pixel — while its subject is replaced
 * again and again. The visitor watches the platform hold every shape without
 * altering itself, which is the entire claim, made before a word is read.
 */
const SUBJECTS = [
  "restaurant",
  "clinic",
  "store",
  "factory",
  "school",
  "studio",
  "practice",
  "warehouse",
];

export function IndustriesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const wallRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);

  const onStep = useCallback((i: number) => setStep(Math.max(0, i)), []);

  useIndustriesAnimation({
    sectionRef,
    wallRef,
    steps: SUBJECTS.length,
    onStep,
  });

  const subject = SUBJECTS[Math.min(step, SUBJECTS.length - 1)];

  return (
    <section
      ref={sectionRef}
      className="hp-section hp-sec relative flex hp-flex-section min-h-svh items-center px-6 md:px-10"
    >
      <div ref={wallRef} className="hp-stage mx-auto w-full max-w-4xl px-7 py-14 md:px-14 md:py-20">
        {/* The frame. Nothing here ever moves. */}
        <p className="text-[clamp(1.75rem,4.6vw,3.5rem)] font-extrabold leading-[1.18] tracking-[-0.04em] text-mute/50">
          Somewhere there is a
        </p>

        <p
          aria-live="polite"
          className="min-h-[1.18em] text-[clamp(1.75rem,4.6vw,3.5rem)] font-extrabold leading-[1.18] tracking-[-0.04em] text-white"
        >
          <span key={subject} className="hp-slot inline-block">
            {subject}
          </span>
        </p>

        <p className="text-[clamp(1.75rem,4.6vw,3.5rem)] font-extrabold leading-[1.18] tracking-[-0.04em] text-mute/50">
          running on all of this.
        </p>

        <p className="mt-16 max-w-sm hp-lede text-mute md:mt-20">
          The work looks nothing alike. Underneath, it is the same platform.
        </p>
      </div>
    </section>
  );
}
