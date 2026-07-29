import { useRef } from "react";
import { config } from "@/configs/env";
import { CtaLink } from "@/app/shared/CtaLink";
import { useConvergenceAnimation } from "./animations/useConvergenceAnimation";

/**
 * Section 08 — Connected by design. The conclusion: every part of
 * the platform converges into one point, slower than everything
 * before it, ending in the brand statement and one clear next step.
 */
export function ConvergenceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useConvergenceAnimation({ sectionRef, statementRef, ctaRef });

  return (
    <section ref={sectionRef} className="hp-section relative">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <p className="conv-intro text-xs font-medium uppercase tracking-[0.16em] text-cyan">
            Connected by design
          </p>
          <h2 className="conv-intro mt-4 text-heading-lg font-bold text-white md:text-heading-xl">
            Built to work as one.
          </h2>
          <p className="conv-intro mt-5 max-w-xl text-body-lg text-mute">
            Every product here runs on its own. Put two together and there is
            no integration to build — they already knew about each other.
          </p>
        </div>

        {/* No diagram here.

            This section used to close with seven labelled nodes on a circle
            and a spoke from each into the Sharpnr mark — the same drawing
            Section 02 opened the page with, and by this point the third
            time the page had explained its own architecture. A close does
            not need to restate the argument; it needs to arrive. Homepage
            Scene 07 settled the same question the same way: one charge
            crosses the rail once and stops, and it does not loop, because
            repeating suggests the story is still running when the point is
            that it has finished.

            The brand statement is the closing image. */}

        <div
          ref={statementRef}
          className="mx-auto mt-20 flex max-w-2xl flex-col items-center text-center"
        >
          <p className="text-heading-md font-bold text-white md:text-display-md">
            One Platform.
            <br />
            Every Business.
          </p>
          <p className="mt-6 text-title-md font-medium text-cyan">
            Connected Business Infrastructure.
          </p>
        </div>

        {/* One clear next step */}
        <div
          ref={ctaRef}
          className="mx-auto mt-20 flex max-w-xl flex-col items-center border-t border-sky/12 pt-14 text-center"
        >
          <h3 className="text-heading-sm font-bold text-white">
            Where would you like to start?
          </h3>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <CtaLink tone="navy" variant="primary" to="/products" arrow>
              Explore Products
            </CtaLink>
            <CtaLink
              tone="navy"
              variant="secondary"
              href={config.authAppUrl + "/signup"}
            >
              Create Free Account
            </CtaLink>
          </div>
          <p className="mt-6 text-sm text-mute/70">
            Free during Early Access • No credit card required
          </p>
        </div>
      </div>
    </section>
  );
}
