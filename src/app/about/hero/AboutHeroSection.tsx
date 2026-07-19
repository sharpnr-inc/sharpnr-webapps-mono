import { useRef } from "react";
import { CtaLink } from "@/app/shared/CtaLink";
import { ScrollSmoother } from "@/configs/gsap";
import { useAboutHeroAnimation } from "./animations/useAboutHeroAnimation";

/**
 * About hero — not a company profile. A belief, stated plainly.
 * Typography is the hero; the philosophy comes before the company.
 */
export function AboutHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useAboutHeroAnimation({ sectionRef, copyRef });

  const scrollToStory = () => {
    const target = document.getElementById("story");
    if (!target) return;
    const smoother = ScrollSmoother.get();
    if (smoother) smoother.scrollTo(target, true, "top 88px");
    else target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-navy">
      {/* Subtle lighting — nothing else competes with the words */}
      <div className="pointer-events-none absolute -top-32 right-1/4 size-120 rounded-full bg-blue/15 blur-3xl" />

      <div className="relative mx-auto flex min-h-[80svh] max-w-7xl flex-col justify-center px-5 pb-24 pt-36 md:px-8 md:pt-44">
        <div ref={copyRef} className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <h1 className="text-display-md font-bold text-white md:text-display-lg">
            We believe businesses deserve better.
          </h1>
          <p className="mt-6 max-w-xl text-body-lg text-white/70">
            Businesses shouldn't have to assemble dozens of disconnected tools
            just to run their organization. Technology should simplify work,
            connect people and create clarity — not add complexity.
          </p>
          <p className="mt-4 text-base text-white/55">
            Everything we build begins with that belief.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={scrollToStory}
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-medium text-navy transition-colors duration-200 hover:bg-ice"
            >
              Read Our Story
            </button>
            <CtaLink tone="navy" variant="secondary" to="/platform">
              Explore the Platform
            </CtaLink>
          </div>
        </div>
      </div>
    </section>
  );
}
