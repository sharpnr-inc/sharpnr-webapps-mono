import { useRef } from "react";
import { config } from "@/configs/env";
import { CtaLink } from "@/app/shared/CtaLink";
import { Eyebrow } from "@/app/shared/Eyebrow";
import { useJoinAnimation } from "./animations/useJoinAnimation";

const ways = [
  {
    title: "Build your business",
    line: "Create your organization and explore Sharpnr during Early Access.",
  },
  {
    title: "Build with us",
    line: "Developers, designers and builders shape the platform through ideas and feedback.",
  },
  {
    title: "Grow with us",
    line: "Partners help expand the ecosystem into new industries and markets.",
  },
  {
    title: "Join our team",
    line: "We look for people who care deeply about solving meaningful problems.",
  },
] as const;

/**
 * Section 05 — Join the journey. Not a call-to-action: an
 * invitation. Optimism, not urgency.
 */
export function JoinSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useJoinAnimation({ sectionRef, contentRef });

  return (
    <section ref={sectionRef} className="bg-navy">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <div ref={contentRef} className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <Eyebrow tone="navy">Join the journey</Eyebrow>
          <h2 className="mt-4 text-heading-lg font-bold text-white md:text-display-md">
            We're just getting started.
            <br />
            We'd love for you to be part of what's next.
          </h2>
          <p className="mt-5 max-w-xl text-body-lg text-white/70">
            Great platforms aren't built in isolation. They're shaped by the
            businesses that use them, the partners that grow with them and the
            people who challenge them to become better.
          </p>

          <div className="mt-12 grid w-full gap-x-12 gap-y-8 text-left sm:grid-cols-2">
            {ways.map((way) => (
              <div key={way.title}>
                <h3 className="text-base font-semibold text-white">
                  {way.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/65">
                  {way.line}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <CtaLink
              tone="navy"
              variant="primary"
              href={config.authAppUrl + "/signup"}
              arrow
            >
              Create Free Account
            </CtaLink>
            <CtaLink
              tone="navy"
              variant="secondary"
              href="mailto:support@sharpnr.com?subject=Careers%20at%20Sharpnr"
            >
              Explore Careers
            </CtaLink>
          </div>
          <p className="mt-6 text-sm text-white/50">
            Early Access is free. We're building in the open — learning
            continuously and improving with every organization that joins.
          </p>
        </div>
      </div>
    </section>
  );
}
