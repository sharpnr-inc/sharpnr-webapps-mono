import { useRef } from "react";
import { config } from "@/configs/env";
import { CtaLink } from "@/app/shared/CtaLink";
import { ScrollSmoother } from "@/configs/gsap";
import { useIndustriesHeroAnimation } from "./animations/useIndustriesHeroAnimation";

/* Different businesses, different rhythms — one shared platform. */
const businesses = [
  { label: "Hotel", x: 90, r: 15 },
  { label: "Restaurant", x: 205, r: 12 },
  { label: "Café", x: 315, r: 9 },
  { label: "Hospital", x: 425, r: 14 },
  { label: "Retail store", x: 545, r: 11 },
  { label: "University", x: 665, r: 13 },
  { label: "Factory", x: 785, r: 12 },
  { label: "Office", x: 890, r: 9 },
] as const;

/**
 * Industries hero — this page introduces businesses, not software.
 * Every visitor should recognize their own.
 */
export function IndustriesHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useIndustriesHeroAnimation({ sectionRef, copyRef });

  const scrollToHospitality = () => {
    const target = document.getElementById("hospitality");
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
            Built for your industry.
            <br />
            Connected for your entire business.
          </h1>
          <p className="mt-6 max-w-xl text-body-lg text-slate-600">
            From hospitality today to healthcare, retail, education and beyond,
            Sharpnr delivers industry-specific operational experiences on one
            connected platform. Start with the industry you know.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={scrollToHospitality}
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-blue px-6 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-deep"
            >
              Explore Hospitality
            </button>
            <CtaLink variant="secondary" href={config.authAppUrl + "/signup"}>
              Create Free Account
            </CtaLink>
          </div>
        </div>

        {/* Many kinds of business, one foundation beneath them */}
        <div className="mx-auto mt-16 hidden max-w-5xl md:block">
          <svg
            viewBox="0 0 980 240"
            role="img"
            aria-label="Hotels, restaurants, hospitals, stores, universities, factories and offices standing on one shared Sharpnr platform"
            className="h-auto w-full"
          >
            {/* Each business connects down to the platform */}
            <g fill="none" stroke="#0077b6" strokeOpacity="0.35" strokeWidth="1.2">
              {businesses.map((b) => (
                <path key={`l-${b.label}`} className="ind-hero-line" d={`M${b.x} ${96 + b.r} L${b.x} 168`} />
              ))}
            </g>

            {businesses.map((b) => (
              <g key={b.label} className="ind-hero-node">
                <circle
                  cx={b.x}
                  cy="96"
                  r={b.r}
                  fill={b.r > 12 ? "#caf0f8" : "#ffffff"}
                  stroke="#0077b6"
                  strokeOpacity="0.5"
                  strokeWidth="1.4"
                />
                <text x={b.x} y="52" textAnchor="middle" fontSize="13" fontWeight="500" fill="#475569">
                  {b.label}
                </text>
              </g>
            ))}

            {/* The platform */}
            <g className="ind-hero-platform">
              <rect x="40" y="168" width="900" height="46" rx="12" fill="#03045e" />
              <text x="490" y="196" textAnchor="middle" fontSize="13.5" fontWeight="600" fill="#ffffff">
                One connected platform
              </text>
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
