import { useRef } from "react";
import { CtaLink } from "@/app/shared/CtaLink";
import { Words } from "@/app/home/shared/Words";
import { ScrollSmoother } from "@/configs/gsap";
import { useAboutHeroAnimation } from "./animations/useAboutHeroAnimation";

/**
 * About hero — not a company profile. A belief, stated plainly, and
 * typography is the whole visual.
 *
 * Centred, like every hero on the site. No background and no lighting of
 * its own: the dark canvas and its ink wash are held at the root, and a
 * blurred pool on top of the wash only muddied it.
 */
export function AboutHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useAboutHeroAnimation({ sectionRef, eyebrowRef, copyRef, ctaRef });

  const scrollToStory = () => {
    const target = document.getElementById("story");
    if (!target) return;
    const smoother = ScrollSmoother.get();
    if (smoother) smoother.scrollTo(target, true, "top 88px");
    else target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-svh w-full overflow-hidden"
    >
      <div className="relative z-10 flex min-h-svh w-full items-center justify-center py-28">
        <div className="mx-auto w-full max-w-7xl px-6 text-center md:px-10">
          <p
            ref={eyebrowRef}
            className="text-[0.625rem] font-medium uppercase tracking-[0.16em] text-twilight sm:text-[0.6875rem] sm:tracking-[0.3em]"
          >
            Why We Exist
          </p>

          {/* Two lines, breaking on the comma — kept as blocks at every
              width rather than running onto one line at lg, which at 47
              characters would overflow max-w-7xl at the top of the type
              scale. Each half stays intact on its own line. */}
          <h1 className="hp-scene-title mt-5 font-extrabold text-white">
            <span className="about-line-1 block">
              <Words text="Business should feel connected," />
            </span>{" "}
            <span className="about-line-2 block text-twilight">
              <Words text="Not complicated." />
            </span>
          </h1>

          <p ref={copyRef} className="hp-hero-copy mx-auto mt-5 max-w-lg text-mute">
            Sharpnr exists to reduce operational complexity by giving every
            business one connected platform to run, grow and evolve.
          </p>

          <div
            ref={ctaRef}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
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
