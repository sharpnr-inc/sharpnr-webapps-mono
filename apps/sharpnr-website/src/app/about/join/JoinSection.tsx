import { useRef } from "react";
import { config } from "@/configs/env";
import { CtaLink } from "@/app/shared/CtaLink";
import { Eyebrow } from "@/app/shared/Eyebrow";
import { useJoinAnimation } from "./animations/useJoinAnimation";

const ways = [
  {
    title: "Run your business on it",
    line: "Set up your business and try Sharpnr free while it is in Early Access.",
  },
  {
    title: "Build with us",
    line: "Developers and designers who want a say in what gets built next.",
  },
  {
    title: "Grow with us",
    line: "Partners who bring Sharpnr to trades and places we have not reached.",
  },
  {
    title: "Join our team",
    line: "People who would rather fix a real problem than ship another feature.",
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
    <section ref={sectionRef} className="hp-section relative">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <div ref={contentRef} className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <Eyebrow tone="navy">Join the journey</Eyebrow>
          <h2 className="mt-4 text-heading-lg font-bold text-white md:text-display-md">
            Early days,
            <br />
            <span className="text-twilight">come and shape them.</span>
          </h2>
          <p className="mt-5 max-w-xl text-body-lg text-mute">
            Nothing good gets built in a room on its own. The businesses using
            it decide what it becomes.
          </p>

          {/* Four invitations, not four value cards — the About page is
              typographic throughout and a bordered tile here would be the
              only box on it. A hairline above each keeps them legible as a
              set without becoming a grid of panels. */}
          <div className="mt-12 grid w-full gap-x-12 gap-y-8 text-left sm:grid-cols-2">
            {ways.map((way) => (
              <div key={way.title} className="border-t border-sky/12 pt-5">
                <h3 className="text-base font-semibold text-white">
                  {way.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-mute">
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
          <p className="mt-6 text-sm text-mute/70">
            Early Access is free. We're building in the open, and every business
            that joins changes what comes next.
          </p>
        </div>
      </div>
    </section>
  );
}
