import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/*
 * Aceternity's BentoGrid, retinted for the Sharpnr dark canvas.
 *
 * The upstream component is written light-first with a `dark:` variant on
 * every colour. This homepage is only ever dark, so the dark values are the
 * base here — carrying both would mean every tile shipped a light theme
 * nobody can reach, and the palette is ours rather than neutral-200/black:
 * sky hairlines on a low-opacity surface, matching the rest of the page.
 *
 * Structure, spans and the group-hover nudge are unchanged. The one
 * functional edit: each transition is scoped (transition-colors on the
 * tile, transition-transform on the body) instead of Tailwind's bare
 * `transition`, which also covers opacity and transform and would fight the
 * GSAP entrance animating those same properties.
 */
export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | ReactNode;
  description?: string | ReactNode;
  header?: ReactNode;
  icon?: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "hp-bento-tile group/bento row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-sky/15 bg-sky/[0.025] p-4 transition-colors duration-200 hover:border-sky/30 hover:bg-sky/[0.05]",
        className,
      )}
    >
      {header}
      <div className="transition-transform duration-200 group-hover/bento:translate-x-2">
        {icon}
        <div className="mb-2 mt-2 font-sans font-bold text-white">{title}</div>
        <div className="font-sans text-xs font-normal text-mute">
          {description}
        </div>
      </div>
    </div>
  );
};
