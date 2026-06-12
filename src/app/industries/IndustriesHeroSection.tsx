import { useRef } from "react";
import { useIndustriesHeroAnimation } from "./animations/useIndustriesHeroAnimation";

export function IndustriesHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useIndustriesHeroAnimation({ sectionRef, contentRef });

  return (
    <section ref={sectionRef} className="relative overflow-hidden pt-32 md:pt-44">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,oklch(0.225_0.146_265.82/0.04)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.225_0.146_265.82/0.04)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_70%_80%_at_50%_0%,black,transparent)]" />

      <div
        ref={contentRef}
        className="relative mx-auto max-w-3xl px-5 pb-8 text-center md:px-8"
      >
        <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent-strong">
          Industries
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-text-dark sm:text-5xl xl:text-6xl">
          From hospitality to healthcare — one OS for all.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg">
          We serve many sectors and understand each one. And when your
          organization spans several at once, Sharpnr is the only platform you
          need.
        </p>
      </div>
    </section>
  );
}
