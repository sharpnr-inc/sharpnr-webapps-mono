import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

/*
 * Aceternity's Card Hover Effect, hand-copied and retinted for the Sharpnr
 * canvas — same treatment `bento-grid.tsx` got, for the same reasons.
 *
 * Four deliberate changes from upstream:
 *
 * 1. Dark is the base, not a `dark:` variant. Upstream carries a light
 *    theme on every colour; this site is only ever dark, so shipping both
 *    would mean half the styles are unreachable. neutral-200 / slate-800 /
 *    zinc-400 become the palette: sky hairlines, a sky surface at very low
 *    opacity, `text-mute` for secondary copy.
 *
 * 2. `next/link` is gone. Items link to external Sharpnr applications, and
 *    an item with no application yet renders as a plain card rather than as
 *    a link to nowhere.
 *
 * 3. Every transition is scoped — `transition-colors` on the card, never
 *    Tailwind's bare `transition`, which also covers opacity and transform
 *    and would fight the GSAP entrance animating exactly those.
 *
 * 4. `layoutIdPrefix` is required per instance. Upstream hardcodes
 *    `layoutId="hoverBackground"`; with several lists on one page that one
 *    id makes the surface fly across the page between them.
 *
 * The travelling surface itself is unchanged: one element, shared by
 * layoutId, so it slides between cards instead of fading in and out.
 */

export interface HoverEffectItem {
  title: string;
  description: string;
  /** External application URL. Omitted when there is nothing to open yet. */
  link?: string;
  /** A short status mark, printed opposite the title. */
  meta?: ReactNode;
}

export const HoverEffect = ({
  items,
  layoutIdPrefix,
  className,
}: {
  items: HoverEffectItem[];
  layoutIdPrefix: string;
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={cn("grid grid-cols-1", className)}>
      {items.map((item, idx) => {
        const body = (
          <>
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 block h-full w-full rounded-xl bg-sky/6"
                  layoutId={`${layoutIdPrefix}-hover`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.15 } }}
                  exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
                />
              )}
            </AnimatePresence>
            <Card>
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1.5">
                <CardTitle>
                  {item.link && <span className="sr-only">Open </span>}
                  {item.title}
                </CardTitle>
                {item.meta}
              </div>
              <CardDescription>{item.description}</CardDescription>
            </Card>
          </>
        );

        /* Only a card that goes somewhere lights up. A card with no
           application behind it keeps the `group` class off entirely, so
           the surface never travels to it and its title never takes the
           link colour — highlighting something unclickable is a promise
           the card can't keep. */
        return item.link ? (
          <a
            key={item.title}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block h-full w-full rounded-xl p-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            onFocus={() => setHoveredIndex(idx)}
            onBlur={() => setHoveredIndex(null)}
          >
            {body}
          </a>
        ) : (
          <div key={item.title} className="relative block h-full w-full p-1">
            {body}
          </div>
        );
      })}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => (
  <div
    className={cn(
      "relative z-20 h-full w-full overflow-hidden rounded-xl border border-transparent px-5 py-5 transition-colors duration-200 group-hover:border-sky/20",
      className,
    )}
  >
    <div className="relative z-50">{children}</div>
  </div>
);

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => (
  <h4
    className={cn(
      "text-[1.0625rem] font-semibold tracking-tight text-white transition-colors duration-200 group-hover:text-sky md:text-lg",
      className,
    )}
  >
    {children}
  </h4>
);

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => (
  <p
    className={cn(
      /* No max-width. The card is already inside a half-width column, and
         capping it again leaves dead space at that column's outer edge. */
      "mt-2.5 text-sm leading-relaxed tracking-wide text-mute",
      className,
    )}
  >
    {children}
  </p>
);
