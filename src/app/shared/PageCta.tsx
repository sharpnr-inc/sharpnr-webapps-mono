import { useRef } from "react";
import { CtaLink } from "./CtaLink";
import { Eyebrow } from "./Eyebrow";
import { usePageCtaAnimation } from "./animations/usePageCtaAnimation";

interface CtaAction {
  label: string;
  to?: string;
  href?: string;
}

interface PageCtaProps {
  eyebrow?: string;
  heading: React.ReactNode;
  copy?: React.ReactNode;
  primary: CtaAction;
  secondary?: CtaAction;
  /** Small honest note under the buttons, e.g. availability. */
  trust?: string;
}

/**
 * The quiet, confident page ending — deep navy, typography as the hero.
 * No illustrations, no repeated visuals, no pressure.
 */
export function PageCta({
  eyebrow,
  heading,
  copy,
  primary,
  secondary,
  trust,
}: PageCtaProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  usePageCtaAnimation({ sectionRef, contentRef });

  return (
    <section ref={sectionRef} className="bg-navy">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <div
          ref={contentRef}
          className="mx-auto flex max-w-2xl flex-col items-center text-center"
        >
          {eyebrow && <Eyebrow tone="navy" className="mb-5">{eyebrow}</Eyebrow>}
          <h2 className="text-heading-lg font-bold text-white md:text-display-md">
            {heading}
          </h2>
          {copy && (
            <p className="mt-5 max-w-xl text-body-lg text-white/70">{copy}</p>
          )}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <CtaLink
              tone="navy"
              variant="primary"
              to={primary.to}
              href={primary.href}
              arrow
            >
              {primary.label}
            </CtaLink>
            {secondary && (
              <CtaLink
                tone="navy"
                variant="secondary"
                to={secondary.to}
                href={secondary.href}
              >
                {secondary.label}
              </CtaLink>
            )}
          </div>
          {trust && <p className="mt-6 text-sm text-white/50">{trust}</p>}
        </div>
      </div>
    </section>
  );
}
