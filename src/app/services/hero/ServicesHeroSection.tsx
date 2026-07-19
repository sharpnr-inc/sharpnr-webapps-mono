import { useRef } from "react";
import { config } from "@/configs/env";
import { CtaLink } from "@/app/shared/CtaLink";
import { ScrollSmoother } from "@/configs/gsap";
import { useServicesHeroAnimation } from "./animations/useServicesHeroAnimation";

const capabilities = [
  "Financial management",
  "People & workforce",
  "Customer relationships",
  "Communication & collaboration",
  "Identity & governance",
  "Knowledge & intelligence",
  "Business network",
] as const;

/**
 * Services hero — business capabilities, not applications. Every
 * capability connects to the next; nothing exists in isolation.
 */
export function ServicesHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useServicesHeroAnimation({ sectionRef, copyRef });

  const scrollToCapabilities = () => {
    const target = document.getElementById("financial-management");
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
            Everything your business needs.
            <br />
            Connected by design.
          </h1>
          <p className="mt-6 max-w-xl text-body-lg text-slate-600">
            Sharpnr brings together the essential capabilities every modern
            organization depends on. Each one works independently. Together,
            they create a connected business.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={scrollToCapabilities}
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-blue px-6 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-deep"
            >
              Explore Capabilities
            </button>
            <CtaLink variant="secondary" href={config.authAppUrl + "/signup"}>
              Create Free Account
            </CtaLink>
          </div>
        </div>

        {/* Capabilities chained together — none stands alone */}
        <ol className="mx-auto mt-16 flex max-w-4xl flex-wrap items-center justify-center gap-x-3 gap-y-3">
          {capabilities.map((cap, i) => (
            <li key={cap} className="svc-hero-cap flex items-center gap-3">
              <span className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-600">
                {cap}
              </span>
              {i < capabilities.length - 1 && (
                <span className="hidden h-px w-4 bg-blue/40 sm:block" />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
