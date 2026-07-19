import { useRef } from "react";
import { CtaLink } from "@/app/shared/CtaLink";
import { ScrollSmoother } from "@/configs/gsap";
import { useResourcesHeroAnimation } from "./animations/useResourcesHeroAnimation";

/**
 * Resources hero — a knowledge library, not a company blog.
 * Educate first, promote second.
 */
export function ResourcesHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useResourcesHeroAnimation({ sectionRef, copyRef });

  const scrollToLibrary = () => {
    const target = document.getElementById("explore");
    if (!target) return;
    const smoother = ScrollSmoother.get();
    if (smoother) smoother.scrollTo(target, true, "top 88px");
    else target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} className="bg-white">
      <div className="mx-auto max-w-7xl px-5 pb-20 pt-36 md:px-8 md:pb-28 md:pt-44">
        <div ref={copyRef} className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <h1 className="text-display-md font-bold text-navy md:text-display-lg">
            Learn something useful.
            <br />
            Build something better.
          </h1>
          <p className="mt-6 max-w-xl text-body-lg text-slate-600">
            Practical guides, industry insights, product updates, engineering
            stories and business ideas — designed to help organizations grow
            with confidence. Knowledge should be shared, not hidden.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={scrollToLibrary}
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-blue px-6 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-deep"
            >
              Explore Resources
            </button>
            <CtaLink variant="secondary" href="https://docs.sharpnr.com">
              Browse Documentation
            </CtaLink>
          </div>
          <p className="mt-8 text-sm text-slate-500">
            Resources is growing alongside the platform — the first
            publications are being written during Early Access.
          </p>
        </div>
      </div>
    </section>
  );
}
