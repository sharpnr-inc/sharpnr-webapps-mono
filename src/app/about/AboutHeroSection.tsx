import { useRef } from "react";
import { useAboutHeroAnimation } from "./animations/useAboutHeroAnimation";

export function AboutHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useAboutHeroAnimation({ sectionRef, contentRef });

  return (
    <section ref={sectionRef} className="relative overflow-hidden pt-32 md:pt-44">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,oklch(0.97_0_296/0.045)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.97_0_296/0.045)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_70%_80%_at_50%_0%,black,transparent)]" />

      <div
        ref={contentRef}
        className="relative mx-auto max-w-3xl px-5 pb-8 text-center md:px-8"
      >
        <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent-strong">
          About Sharpnr
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-text-dark sm:text-5xl xl:text-6xl">
          We are building the operating system for business.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg">
          Not another tool. Not another app. A living, ever-evolving ecosystem
          where every part of an organization — and every organization —
          connects.
        </p>
      </div>
    </section>
  );
}
