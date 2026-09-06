import type { ReactNode } from "react";
import { cn } from "@sharpnr/utils";

/* -------------------------------------------------------------------------- */
/*  The layout kit every sharpnr marketing site is built from.                 */
/*                                                                            */
/*  These exist so thirteen sites share one rhythm -- the same measure, the    */
/*  same vertical spacing, the same relationship between an eyebrow, a         */
/*  heading and its body. Each app supplies its own copy and accent; none of   */
/*  them re-invents the page. Nothing here draws a card, a badge or a          */
/*  decorative icon: the type hierarchy and the words carry the page.          */
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
  /** Anything that belongs under the actions, e.g. an inline flow. */
  children?: ReactNode;
  className?: string;
};

export function WebsiteHero({
  eyebrow,
  mark,
  title,
  lede,
  actions,
  children,
  className,
}: WebsiteHeroProps) {
  return (
    <section
      className={cn("border-b border-border pt-16", className)}
    >
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="max-w-3xl">
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
              "text-4xl leading-[1.05] font-bold tracking-tight text-balance md:text-6xl",
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
  /** Splits the section into a sticky-feeling title column and a body column. */
  split?: boolean;
  className?: string;
};

export function WebsiteSection({
  id,
  eyebrow,
  heading,
  intro,
  children,
  split = false,
  className,
}: WebsiteSectionProps) {
  const title = (
    <div className={cn(split ? "" : "max-w-2xl")}>
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
    </div>
  );

  return (
    <section
      id={id}
      className={cn("border-b border-border py-20 md:py-28", className)}
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
        <div
          key={i}
          className="grid grid-cols-1 gap-1 border-b border-border py-5 md:grid-cols-[minmax(0,15rem)_1fr] md:gap-8 md:py-6"
        >
          <dt className="text-sm font-semibold tracking-tight">
            {row.term}
            {row.note && (
              <span className="font-normal text-muted-foreground">
                {" "}
                {row.note}
              </span>
            )}
          </dt>
          <dd className="text-sm leading-relaxed text-muted-foreground text-pretty">
            {row.description}
          </dd>
        </div>
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
  className?: string;
};

export function PointList({
  points,
  columns = 2,
  className,
}: PointListProps) {
  return (
    <div
      className={cn(
        columns === 2
          ? "grid gap-x-16 gap-y-10 md:grid-cols-2"
          : "space-y-8",
        className,
      )}
    >
      {points.map(({ title, body }) => (
        <div key={title} className={cn(columns === 2 && "max-w-md")}>
          <h3 className="text-base font-semibold tracking-tight">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
            {body}
          </p>
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */

export type WebsiteClosingProps = {
  heading: ReactNode;
  body?: ReactNode;
  actions?: ReactNode;
  className?: string;
};

/** The last thing above the footer. No border: the footer supplies it. */
export function WebsiteClosing({
  heading,
  body,
  actions,
  className,
}: WebsiteClosingProps) {
  return (
    <section className={cn("py-20 md:py-24", className)}>
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="max-w-xl text-2xl font-semibold tracking-tight text-balance md:text-3xl">
          {heading}
        </h2>
        {body && (
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground text-pretty">
            {body}
          </p>
        )}
        {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
      </div>
    </section>
  );
}
