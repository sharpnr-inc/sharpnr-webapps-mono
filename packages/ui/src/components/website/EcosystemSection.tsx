import { cn } from "@sharpnr/utils";
import {
  ecosystemApp,
  type EcosystemAppId,
} from "./ecosystem";

/**
 * One sibling app and what actually passes between it and this one.
 *
 * `line` is the sentence, and it should describe a specific exchange -- "every
 * inventory transaction posts to the books" -- rather than restating what the
 * other app is for. The app's name is rendered separately and linked, so the
 * line should read as its continuation, not repeat the name.
 */
export type EcosystemLink = {
  app: EcosystemAppId;
  line: string;
  /**
   * A second app sharing one line, for pairs that behave identically --
   * sharp-hospitality and sharp-healthcare both draw on the same stock.
   */
  and?: EcosystemAppId;
};

export type EcosystemSectionProps = {
  /** The app whose site this is. Used in the section's own copy. */
  appName: string;
  /** Overrides the default heading. */
  heading?: string;
  /** One or two sentences under the heading. */
  intro?: string;
  links: EcosystemLink[];
  className?: string;
};

/**
 * The "works with" section every sharpnr site carries above its footer.
 *
 * Rendered as a definition list rather than a card grid on purpose: these are
 * sentences, and setting thirteen of them in boxes makes them scan as feature
 * bullets instead of as the relationships they describe.
 */
export function EcosystemSection({
  appName,
  heading,
  intro,
  links,
  className,
}: EcosystemSectionProps) {
  return (
    <section
      id="ecosystem"
      className={cn("border-t border-border py-20 md:py-28", className)}
    >
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
          The rest of the platform
        </p>

        <h2 className="mt-4 max-w-2xl text-2xl font-semibold tracking-tight text-balance md:text-3xl">
          {heading ?? `What ${appName} is already connected to`}
        </h2>

        {intro && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {intro}
          </p>
        )}

        <dl className="mt-12 border-t border-border">
          {links.map(({ app, line, and }) => {
            const primary = ecosystemApp(app);
            const secondary = and ? ecosystemApp(and) : undefined;

            return (
              <div
                key={primary.id}
                className="grid grid-cols-1 gap-1 border-b border-border py-5 md:grid-cols-[minmax(0,15rem)_1fr] md:gap-8 md:py-6"
              >
                <dt className="text-sm font-semibold tracking-tight">
                  <a
                    href={primary.href}
                    className="underline decoration-border decoration-1 underline-offset-4 transition-colors hover:decoration-foreground"
                  >
                    {primary.name}
                  </a>
                  {secondary && (
                    <>
                      <span className="font-normal text-muted-foreground">
                        {" and "}
                      </span>
                      <a
                        href={secondary.href}
                        className="underline decoration-border decoration-1 underline-offset-4 transition-colors hover:decoration-foreground"
                      >
                        {secondary.name}
                      </a>
                    </>
                  )}
                </dt>
                <dd className="text-sm leading-relaxed text-muted-foreground text-pretty">
                  {line}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
