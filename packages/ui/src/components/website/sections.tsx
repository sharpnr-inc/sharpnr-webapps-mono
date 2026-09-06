import type { ReactNode } from "react";
import { config } from "@sharpnr/env";
import { cn } from "@sharpnr/utils";
import { Reveal } from "./motion";
import { ECOSYSTEM_APPS, type EcosystemAppId } from "./ecosystem";

/* -------------------------------------------------------------------------- */
/*  The layout kit every sharpnr marketing site is built from.                 */
/*                                                                            */
/*  These exist so thirteen sites share one rhythm -- the same measure, the    */
/*  same vertical spacing, the same relationship between an eyebrow, a         */
/*  heading and its body -- while each app supplies its own diagram, texture   */
/*  and accent. Nothing here draws a feature card, a pill badge or a           */
/*  decorative icon: what carries a page is its type, its spacing, and the     */
/*  one drawing that shows how the app actually works.                        */
/* -------------------------------------------------------------------------- */

export type WebsiteHeroProps = {
  /** Small line above the headline. Optional, and never a pill. */
  eyebrow?: string;
  /** The app's mark, above the headline. */
  mark?: ReactNode;
  title: ReactNode;
  /** One paragraph. The pitch, not a feature summary. */
  lede: ReactNode;
  /** Buttons and links. */
  actions?: ReactNode;
  /**
   * The app's signature diagram, shown beside the copy from `lg` up and under
   * it on narrower screens. Without one the hero centres on a single column
   * rather than leaving half the page empty.
   */
  aside?: ReactNode;
  /** A full-bleed background motif, positioned behind everything. */
  texture?: ReactNode;
  /** Anything below the actions, inside the copy column. */
  children?: ReactNode;
  className?: string;
};

export function WebsiteHero({
  eyebrow,
  mark,
  title,
  lede,
  actions,
  aside,
  texture,
  children,
  className,
}: WebsiteHeroProps) {
  return (
    <section className={cn("relative overflow-hidden border-b border-border", className)}>
      {texture}

      <div
        className={cn(
          "relative mx-auto max-w-6xl px-6 pt-32 pb-20 md:pt-40 md:pb-28",
          aside &&
            "lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:items-center lg:gap-16",
        )}
      >
        {/* The hero is deliberately not animated. It is the first thing painted,
            and an entrance transition here only delays the headline and risks
            leaving it invisible if the transition never resolves. Motion on
            these pages starts below the fold, where it is additive. */}
        <div className={cn(!aside && "max-w-3xl")}>
          {mark}
          {eyebrow && (
            <p
              className={cn(
                "text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase",
                mark && "mt-8",
              )}
            >
              {eyebrow}
            </p>
          )}

          <h1
            className={cn(
              "font-bold tracking-tight text-balance",
              aside
                ? "text-4xl leading-[1.06] md:text-5xl"
                : "text-4xl leading-[1.05] md:text-6xl",
              (eyebrow || mark) && "mt-5",
            )}
          >
            {title}
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {lede}
          </p>

          {actions && (
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">{actions}</div>
          )}
          {children}
        </div>

        {aside && <div className="mt-16 lg:mt-0">{aside}</div>}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

export type WebsiteSectionProps = {
  /** Must match the href of the matching header nav entry. */
  id?: string;
  eyebrow?: string;
  heading?: ReactNode;
  /** One or two sentences under the heading. */
  intro?: ReactNode;
  children?: ReactNode;
  /** Splits into a title column and a body column. */
  split?: boolean;
  /** A quieter ground, to break up a long run of sections. */
  muted?: boolean;
  className?: string;
};

export function WebsiteSection({
  id,
  eyebrow,
  heading,
  intro,
  children,
  split = false,
  muted = false,
  className,
}: WebsiteSectionProps) {
  const title = (
    <Reveal className={cn(split ? "" : "max-w-2xl")}>
      <>
        {eyebrow && (
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            {eyebrow}
          </p>
        )}
        {heading && (
          <h2
            className={cn(
              "text-2xl font-semibold tracking-tight text-balance md:text-3xl",
              eyebrow && "mt-4",
            )}
          >
            {heading}
          </h2>
        )}
        {intro && (
          <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty">
            {intro}
          </p>
        )}
      </>
    </Reveal>
  );

  return (
    <section
      id={id}
      // scroll-mt clears the fixed header when a nav anchor jumps here.
      className={cn(
        "scroll-mt-16 border-b border-border py-20 md:py-28",
        muted && "bg-muted/30",
        className,
      )}
    >
      {split ? (
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[minmax(0,20rem)_1fr] md:gap-20">
          {title}
          <div>{children}</div>
        </div>
      ) : (
        <div className="mx-auto max-w-6xl px-6">
          {title}
          {children && <div className="mt-14">{children}</div>}
        </div>
      )}
    </section>
  );
}

/* -------------------------------------------------------------------------- */

export type DefinitionRow = {
  /** The subject -- a record, an app, a step. */
  term: ReactNode;
  /** A quieter qualifier beside the term, e.g. where the record lives. */
  note?: ReactNode;
  description: ReactNode;
};

export type DefinitionRowsProps = {
  rows: DefinitionRow[];
  className?: string;
};

/**
 * Term-and-sentence rows, ruled rather than boxed.
 *
 * The alternative -- a grid of cards -- reads as a feature list, which is
 * exactly the wrong impression for content describing what passes between two
 * apps. Rules keep it reading as prose.
 */
export function DefinitionRows({ rows, className }: DefinitionRowsProps) {
  return (
    <dl className={cn("border-t border-border", className)}>
      {rows.map((row, i) => (
        <Reveal key={i} delay={i * 0.05}>
          <div className="group grid grid-cols-1 gap-1 border-b border-border py-5 transition-colors md:grid-cols-[minmax(0,15rem)_1fr] md:gap-8 md:py-6">
            <dt className="flex items-baseline gap-3 text-sm font-semibold tracking-tight">
              {/* A rule that grows on hover -- the only ornament on the row,
                  and it tracks the reader rather than decorating the page. */}
              <span
                aria-hidden
                className="mt-2 hidden h-px w-3 shrink-0 bg-primary transition-all duration-300 group-hover:w-6 md:block"
              />
              <span>
                {row.term}
                {row.note && (
                  <span className="font-normal text-muted-foreground">
                    {" "}
                    {row.note}
                  </span>
                )}
              </span>
            </dt>
            <dd className="text-sm leading-relaxed text-muted-foreground text-pretty md:pl-0">
              {row.description}
            </dd>
          </div>
        </Reveal>
      ))}
    </dl>
  );
}

/* -------------------------------------------------------------------------- */

export type Point = {
  title: string;
  body: ReactNode;
};

export type PointListProps = {
  points: Point[];
  /** One column reads better for an argument; two for a capability list. */
  columns?: 1 | 2;
  /** Numbers the points, for arguments that are genuinely sequential. */
  numbered?: boolean;
  className?: string;
};

export function PointList({
  points,
  columns = 2,
  numbered = false,
  className,
}: PointListProps) {
  return (
    <div
      className={cn(
        columns === 2 ? "grid gap-x-16 gap-y-10 md:grid-cols-2" : "space-y-9",
        className,
      )}
    >
      {points.map(({ title, body }, i) => (
        <Reveal key={title} delay={i * 0.05}>
          <div className={cn(columns === 2 && "max-w-md")}>
            <h3 className="flex items-baseline gap-3 text-base font-semibold tracking-tight">
              {numbered && (
                <span
                  aria-hidden
                  className="font-mono text-xs text-primary tabular-nums"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              )}
              {title}
            </h3>
            <p
              className={cn(
                "mt-2 text-sm leading-relaxed text-muted-foreground text-pretty",
                numbered && "pl-[1.9rem]",
              )}
            >
              {body}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * A band naming every app in the platform, linked.
 *
 * Sits high on the page, where the footer's version of the same list is too
 * far down to do the job: a visitor who came for one app should learn in the
 * first screenful that there are twelve others holding the same records.
 */
export function PlatformStrip({
  appId,
  lead = "Part of sharpnr —",
  className,
}: {
  appId: EcosystemAppId;
  lead?: string;
  className?: string;
}) {
  return (
    <section className={cn("border-b border-border py-8", className)}>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-6">
        <span className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
          {lead}
        </span>
        {ECOSYSTEM_APPS.filter((app) => app.id !== appId).map((app) => (
          <a
            key={app.id}
            href={app.href}
            className="text-sm text-muted-foreground underline decoration-transparent underline-offset-4 transition-colors hover:text-foreground hover:decoration-current"
          >
            {app.name}
          </a>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

export type WebsiteClosingProps = {
  heading: ReactNode;
  body?: ReactNode;
  actions?: ReactNode;
  /** A motif behind the closing block, usually a quieter echo of the hero's. */
  texture?: ReactNode;
  className?: string;
};

/** The last thing above the footer. No border: the footer supplies it. */
export function WebsiteClosing({
  heading,
  body,
  actions,
  texture,
  className,
}: WebsiteClosingProps) {
  return (
    <section className={cn("relative overflow-hidden py-24 md:py-32", className)}>
      {texture}
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <div>
            <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-balance md:text-4xl">
              {heading}
            </h2>
            {body && (
              <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground text-pretty">
                {body}
              </p>
            )}
            {actions && <div className="mt-9 flex flex-wrap gap-3">{actions}</div>}
            <p className="mt-10 text-xs text-muted-foreground">
              Already have a sharpnr account?{" "}
              <a
                href={config.authAppUrl}
                className="underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
              >
                Sign in
              </a>
              .
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
