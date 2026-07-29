import { useRef } from "react";
import { Button } from "@/app/home/shared/Button";
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
 * The quiet, confident page ending — typography as the hero. No
 * illustrations, no repeated visuals, no pressure.
 *
 * It used to sit on its own `bg-navy` slab. The site is one dark canvas now
 * with the ink wash held at the root, so a solid #03045e panel over the top
 * of that reads as a patch rather than as a finale — the same change the
 * Industries page's closing scene already made. The canvas runs through and
 * a hairline carries the section break, exactly like every other section on
 * these pages.
 *
 * The buttons are the shared homepage pair for the same reason: a white
 * primary belonged to the navy slab, and against the canvas the accent fill
 * is what the rest of the site uses.
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
    <section
      ref={sectionRef}
      className="relative border-t border-white/[0.07]"
    >
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <div
          ref={contentRef}
          className="mx-auto flex max-w-2xl flex-col items-center text-center"
        >
          {eyebrow && <Eyebrow tone="navy" className="mb-5">{eyebrow}</Eyebrow>}
          <h2 className="text-heading-lg font-bold text-white md:text-display-md">
            {heading}
          </h2>
          {copy && <p className="mt-5 max-w-xl text-body-lg text-mute">{copy}</p>}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="primary"
              to={primary.to}
              href={primary.href}
              arrow
            >
              {primary.label}
            </Button>
            {secondary && (
              <Button
                variant="secondary"
                to={secondary.to}
                href={secondary.href}
              >
                {secondary.label}
              </Button>
            )}
          </div>
          {trust && <p className="mt-6 text-sm text-mute/70">{trust}</p>}
        </div>
      </div>
    </section>
  );
}
