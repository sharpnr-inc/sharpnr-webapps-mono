import { useRef } from "react";
import { config } from "@/configs/env";
import { CtaLink } from "@/app/shared/CtaLink";
import { usePlatformHeroAnimation } from "./animations/usePlatformHeroAnimation";

/* One platform → multiple connected capabilities → one business. */
const capabilityNodes = [
  { x: 80, y: 96 },
  { x: 180, y: 56 },
  { x: 290, y: 40 },
  { x: 400, y: 56 },
  { x: 500, y: 96 },
] as const;

/**
 * Platform hero — the homepage introduced Sharpnr; this page explains
 * how it works. One platform holds every capability.
 */
export function PlatformHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  usePlatformHeroAnimation({ sectionRef, copyRef });

  return (
    <section ref={sectionRef} className="bg-white">
      <div className="mx-auto max-w-7xl px-5 pb-24 pt-36 md:px-8 md:pb-32 md:pt-44">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          <div ref={copyRef} className="max-w-xl">
            <h1 className="text-display-md font-bold text-navy md:text-display-lg">
              One platform.
              <br />
              Every part of your business, connected.
            </h1>
            <p className="mt-6 max-w-lg text-body-lg text-slate-600">
              Sharpnr brings business operations, finance, people,
              communication, collaboration, data and business networks into one
              connected platform. Everything is designed to work independently
              — and even better together.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <CtaLink variant="primary" to="/products" arrow>
                Explore Products
              </CtaLink>
              <CtaLink
                variant="secondary"
                href={config.authAppUrl + "/signup"}
              >
                Create Free Account
              </CtaLink>
            </div>
          </div>

          {/* Capabilities settle onto one shared platform */}
          <div className="flex justify-center lg:justify-end">
            <svg
              viewBox="0 0 580 320"
              role="img"
              aria-label="Multiple business capabilities connecting onto one shared platform"
              className="h-auto w-full max-w-lg"
            >
              {/* Connections from platform to each capability */}
              <g fill="none" stroke="#0077b6" strokeOpacity="0.4" strokeWidth="1.3">
                <path className="phero-line" d="M170 236 Q110 180 80 106" />
                <path className="phero-line" d="M230 236 Q200 150 180 66" />
                <path className="phero-line" d="M290 236 L290 50" />
                <path className="phero-line" d="M350 236 Q380 150 400 66" />
                <path className="phero-line" d="M410 236 Q470 180 500 106" />
              </g>

              {/* Capabilities — different shapes of work, one system */}
              <g className="phero-nodes">
                {capabilityNodes.map((n, i) => (
                  <g key={n.x} className="phero-node">
                    <circle
                      cx={n.x}
                      cy={n.y}
                      r={i % 2 === 0 ? 13 : 10}
                      fill={i % 2 === 0 ? "#ffffff" : "#caf0f8"}
                      stroke="#0077b6"
                      strokeOpacity="0.55"
                      strokeWidth="1.4"
                    />
                    <circle cx={n.x} cy={n.y} r="3.5" fill="#0077b6" />
                  </g>
                ))}
              </g>

              {/* The platform — one foundation beneath everything */}
              <g className="phero-platform">
                <rect x="120" y="236" width="340" height="52" rx="14" fill="#03045e" />
                <text
                  x="290"
                  y="267"
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="600"
                  fill="#ffffff"
                >
                  Sharpnr
                </text>
              </g>

              {/* One connected business beneath the platform */}
              <text
                className="phero-caption"
                x="290"
                y="312"
                textAnchor="middle"
                fontSize="12"
                fill="#64748b"
              >
                One connected business
              </text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
