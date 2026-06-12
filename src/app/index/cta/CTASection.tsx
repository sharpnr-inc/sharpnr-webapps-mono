import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { config } from "@/configs/env";
import { useCtaAnimation } from "./animations/useCtaAnimation";

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useCtaAnimation({ sectionRef, panelRef, contentRef });

  return (
    <section ref={sectionRef} className="pb-24 pt-4 md:pb-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div
          ref={panelRef}
          className="relative overflow-hidden rounded-3xl bg-ink px-6 py-16 md:px-16 md:py-24"
        >
          {/* Grid texture + accent glow */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,oklch(0.97_0_296/0.04)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.97_0_296/0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-accent/15 blur-3xl" />

          <div
            ref={contentRef}
            className="relative mx-auto flex max-w-2xl flex-col items-center text-center"
          >
            <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent-glow">
              Free during early access
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-text-light sm:text-4xl xl:text-5xl">
              Run your entire business on Sharpnr.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-muted">
              Join the early access phase and grow with an ecosystem that
              never stops expanding — new apps, new industries, new
              connections.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a
                href={config.authAppUrl + "/signup"}
                className="group inline-flex items-center gap-2 rounded-md bg-text-light px-6 py-3 text-sm font-semibold text-primary shadow-md transition-opacity duration-200 hover:opacity-90"
              >
                Get Started
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-md border border-ink-border px-6 py-3 text-sm font-semibold text-text-light transition-colors duration-200 hover:border-accent/60"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
