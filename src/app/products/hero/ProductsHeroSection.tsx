import { useRef } from "react";
import { config } from "@/configs/env";
import { CtaLink } from "@/app/shared/CtaLink";
import { ScrollSmoother } from "@/configs/gsap";
import { useProductsHeroAnimation } from "./animations/useProductsHeroAnimation";

/* Every product, arranged around one platform. Coordinates for a
   1000×420 canvas — two gentle arcs above and below the center. */
const productPills = [
  { label: "Sharp Operations", x: 170, y: 96 },
  { label: "Sharp Accounting", x: 400, y: 56 },
  { label: "Sharp HRMS", x: 630, y: 56 },
  { label: "Sharp CRMS", x: 850, y: 96 },
  { label: "Sharp IAM", x: 95, y: 208 },
  { label: "Cortex", x: 905, y: 208 },
  { label: "Cables", x: 170, y: 322 },
  { label: "Folio", x: 360, y: 366 },
  { label: "Tasks", x: 545, y: 366 },
  { label: "Silo", x: 725, y: 344 },
  { label: "IVA", x: 862, y: 310 },
] as const;

/**
 * Products hero — opening the door to the ecosystem. Every product
 * appears as part of something bigger; none dominates.
 */
export function ProductsHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useProductsHeroAnimation({ sectionRef, copyRef });

  const scrollToProducts = () => {
    const target = document.getElementById("operations");
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
            Products built for every part of your business.
          </h1>
          <p className="mt-6 max-w-xl text-body-lg text-slate-600">
            From daily operations to finance, people, customers, communication,
            knowledge and business relationships — every Sharpnr product
            delivers value on its own and becomes even more powerful together.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={scrollToProducts}
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-blue px-6 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-deep"
            >
              Explore Products
            </button>
            <CtaLink variant="secondary" href={config.authAppUrl + "/signup"}>
              Create Free Account
            </CtaLink>
          </div>
        </div>

        {/* The ecosystem assembles — no product dominates */}
        <div className="mx-auto mt-16 hidden max-w-5xl md:block">
          <svg
            viewBox="0 0 1000 420"
            role="img"
            aria-label="Eleven Sharpnr products and Sharp Marketplace connected around one platform"
            className="h-auto w-full"
          >
            <g fill="none" stroke="#0077b6" strokeOpacity="0.3" strokeWidth="1.1">
              {productPills.map((p) => (
                <path
                  key={`line-${p.label}`}
                  className="prod-hero-line"
                  d={`M500 211 L${p.x} ${p.y}`}
                />
              ))}
              <path className="prod-hero-line" d={`M500 211 L500 366`} />
            </g>

            <g className="prod-hero-core">
              <circle cx="500" cy="211" r="40" fill="#03045e" />
              <text x="500" y="216" textAnchor="middle" fontSize="13.5" fontWeight="600" fill="#ffffff">
                Sharpnr
              </text>
            </g>

            {[...productPills, { label: "Sharp Marketplace", x: 500, y: 366 }].map((p) => (
              <g key={p.label} className="prod-hero-pill">
                <rect
                  x={p.x - (p.label.length * 3.8 + 18)}
                  y={p.y - 16}
                  width={p.label.length * 7.6 + 36}
                  height={32}
                  rx={16}
                  fill="#ffffff"
                  stroke="#cbd5e1"
                  strokeWidth="1.2"
                />
                <text x={p.x} y={p.y + 4.5} textAnchor="middle" fontSize="13" fontWeight="500" fill="#334155">
                  {p.label}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Small screens read the same idea as text */}
        <p className="mx-auto mt-12 max-w-md text-center text-sm text-slate-500 md:hidden">
          Sharp Operations · Sharp Accounting · Sharp HRMS · Sharp CRMS · Sharp
          IAM · Cortex · Cables · Folio · Tasks · Silo · IVA · Sharp
          Marketplace — one connected ecosystem.
        </p>
      </div>
    </section>
  );
}
