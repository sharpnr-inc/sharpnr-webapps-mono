import { useRef } from "react";
import { Check } from "lucide-react";
import { config } from "@/configs/env";
import { CtaLink } from "@/app/shared/CtaLink";
import { Eyebrow } from "@/app/shared/Eyebrow";
import { useFutureAnimation } from "./animations/useFutureAnimation";

const comingNext = [
  "Healthcare (Lifco)",
  "Retail & commerce",
  "Corporate & professional services",
  "Education",
  "Manufacturing",
] as const;

/**
 * Section 09 — The future is connected. A calm, honest ending:
 * what's available now, what's coming, and an open invitation.
 */
export function FutureSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useFutureAnimation({ sectionRef, contentRef });

  return (
    <section ref={sectionRef} className="bg-navy">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <div ref={contentRef} className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <Eyebrow tone="navy">The future is connected</Eyebrow>
          <h2 className="mt-4 text-heading-lg font-bold text-white md:text-display-md">
            Built for today's industries.
            <br />
            Growing with tomorrow's businesses.
          </h2>
          <p className="mt-5 max-w-xl text-body-lg text-white/70">
            Join during Early Access and grow alongside a platform that's
            continuously expanding into new industries, new capabilities and
            new business connections.
          </p>

          {/* Honest availability */}
          <div className="mt-10 grid w-full gap-8 text-left sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/45">
                Available now
              </p>
              <p className="mt-3 flex items-center gap-2 text-sm font-medium text-white">
                <Check className="size-4 text-cyan" strokeWidth={2} />
                Sharp Operations · Hospitality
              </p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/45">
                Coming next
              </p>
              <ul className="mt-3 space-y-1.5">
                {comingNext.map((item) => (
                  <li key={item} className="text-sm text-white/70">
                    {item}
                  </li>
                ))}
                <li className="text-sm italic text-white/45">
                  …and more industry experiences over time
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <CtaLink
              tone="navy"
              variant="primary"
              href={config.authAppUrl + "/signup"}
              arrow
            >
              Create Free Account
            </CtaLink>
            <CtaLink tone="navy" variant="secondary" to="/products">
              Explore Products
            </CtaLink>
          </div>
          <p className="mt-6 text-sm text-white/50">
            No subscription required during Early Access. Start with one
            experience — expand as your business grows.
          </p>
        </div>
      </div>
    </section>
  );
}
