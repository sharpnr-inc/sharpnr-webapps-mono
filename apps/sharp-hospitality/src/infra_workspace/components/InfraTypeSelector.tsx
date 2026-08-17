import { useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Lock } from "lucide-react";

import { Card, CardContent } from "@sharpnr/ui";
import { Badge } from "@sharpnr/ui";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@sharpnr/ui";
import { cn } from "@sharpnr/utils";
import {
  INFRA_GROUPS,
  INFRA_TYPES,
  type InfraType,
} from "@/infra_workspace/constants/infra-types";

interface InfraTypeSelectorProps {
  value?: InfraType | null;
  onChange?: (value: InfraType) => void;
  /** Ids to render greyed out and unclickable. */
  disabledTypes?: readonly InfraType[];
  /** Per-id explanation shown in a tooltip on a disabled card. */
  disabledReasons?: Partial<Record<InfraType, string>>;
  title?: string;
  subtitle?: string;
  /** Wraps the grid in a full-page shell. Turn off when embedding in a form. */
  fullPage?: boolean;
}

const COMING_SOON_REASON = "This area isn't available yet — coming soon.";

const InfraTypeSelector = ({
  value,
  onChange,
  disabledTypes = [],
  disabledReasons,
  title = "Select Infrastructure",
  subtitle = "Choose the area you want to configure",
  fullPage = true,
}: InfraTypeSelectorProps) => {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  // Uncontrolled fallback so the component is usable without wiring
  const [internal, setInternal] = useState<InfraType | null>(null);
  const selected = value !== undefined ? value : internal;

  const itemRefs = useRef(new Map<InfraType, HTMLButtonElement>());

  /**
   * Without an `onChange` the component drives navigation itself, so anything
   * that has no route yet is dead weight and is shown as "coming soon".
   * In that mode the cards are actions, not radio options, so the radiogroup
   * semantics (and its arrow-key selection) are only used when picking.
   */
  const navigates = !onChange;
  const isPicker = !navigates;

  const items = useMemo(
    () =>
      INFRA_TYPES.map((infra) => {
        const to = "to" in infra ? infra.to : undefined;
        const comingSoon = navigates && !to;
        const isDisabled = comingSoon || disabledTypes.includes(infra.id);

        return {
          ...infra,
          to,
          comingSoon,
          isDisabled,
          reason: comingSoon
            ? COMING_SOON_REASON
            : disabledReasons?.[infra.id] ?? "",
        };
      }),
    [navigates, disabledTypes, disabledReasons]
  );

  const availableCount = items.filter((item) => !item.isDisabled).length;

  const handleSelect = (id: InfraType) => {
    const item = items.find((entry) => entry.id === id);
    if (!item || item.isDisabled) return;

    if (value === undefined) setInternal(id);
    onChange?.(id);

    if (navigates && item.to) navigate({ to: item.to });
  };

  /** Roving focus: one tab stop for the whole group, arrows move between cards. */
  const focusIndex = (index: number) => {
    const next = items[(index + items.length) % items.length];
    const node = itemRefs.current.get(next.id);
    node?.focus();
    // Arrow keys select as you move, which is the expected radiogroup behaviour
    if (!next.isDisabled) handleSelect(next.id);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        focusIndex(index + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        focusIndex(index - 1);
        break;
      case "Home":
        event.preventDefault();
        focusIndex(0);
        break;
      case "End":
        event.preventDefault();
        focusIndex(items.length - 1);
        break;
    }
  };

  // The tab stop follows the selection, falling back to the first usable card
  const selectedIndex = items.findIndex(
    (item) => item.id === selected && !item.isDisabled
  );
  const activeIndex =
    selectedIndex >= 0
      ? selectedIndex
      : Math.max(
          items.findIndex((item) => !item.isDisabled),
          0
        );

  const content = (
    <div className={cn("w-full max-w-6xl", fullPage && "my-auto")}>
      <header className="mb-8">
        <p className="text-[0.625rem] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Infrastructure
        </p>

        <div className="mt-2 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            <p className="mt-1 text-muted-foreground">{subtitle}</p>
          </div>

          <p className="text-xs text-muted-foreground">
            {availableCount} of {items.length} areas available
          </p>
        </div>

        <div className="mt-6 h-px bg-linear-to-r from-border to-transparent" />
      </header>

      <div
        role={isPicker ? "radiogroup" : "group"}
        aria-label={title}
        className="space-y-8"
      >
        {INFRA_GROUPS.map((group) => {
          const groupItems = items.filter((item) => item.group === group.id);
          if (groupItems.length === 0) return null;

          return (
            <section key={group.id}>
              <h2 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {group.label}
              </h2>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {groupItems.map((infra) => {
                  const index = items.indexOf(infra);
                  const isSelected = selected === infra.id && !infra.isDisabled;
                  const Icon = infra.icon;

                  const card = (
                    <button
                      ref={(node) => {
                        if (node) itemRefs.current.set(infra.id, node);
                        else itemRefs.current.delete(infra.id);
                      }}
                      type="button"
                      role={isPicker ? "radio" : undefined}
                      aria-checked={isPicker ? isSelected : undefined}
                      aria-disabled={infra.isDisabled || undefined}
                      aria-describedby={
                        infra.isDisabled && !infra.comingSoon
                          ? `${infra.id}-reason`
                          : undefined
                      }
                      tabIndex={!isPicker || index === activeIndex ? 0 : -1}
                      onClick={() => handleSelect(infra.id)}
                      onKeyDown={
                        isPicker
                          ? (event) => handleKeyDown(event, index)
                          : undefined
                      }
                      className={cn(
                        "group/item h-full w-full rounded-lg text-left",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                        infra.isDisabled ? "cursor-not-allowed" : "cursor-pointer"
                      )}
                    >
                      <Card
                        className={cn(
                          "relative h-full gap-0 py-0 transition-all duration-200",
                          infra.isDisabled
                            ? "bg-muted/40 opacity-75 ring-border"
                            : "hover:shadow-md hover:ring-foreground/25",
                          isSelected &&
                            "bg-primary/4 shadow-md ring-2 ring-primary"
                        )}
                      >
                        <CardContent className="flex h-full flex-col gap-3 p-4">
                          <div className="flex items-start justify-between gap-2">
                            <span
                              className={cn(
                                "flex size-10 items-center justify-center rounded-xl border transition-colors",
                                isSelected
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : "border-border bg-muted text-foreground/70 group-hover/item:text-foreground"
                              )}
                            >
                              <Icon className="size-5" />
                            </span>

                            {infra.comingSoon ? (
                              <Badge variant="outline" className="gap-1">
                                <Lock aria-hidden /> Soon
                              </Badge>
                            ) : isSelected ? (
                              <motion.span
                                initial={
                                  reduceMotion ? false : { scale: 0, opacity: 0 }
                                }
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{
                                  type: "spring",
                                  stiffness: 500,
                                  damping: 24,
                                }}
                                className="flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground"
                              >
                                <Check className="size-3" />
                              </motion.span>
                            ) : null}
                          </div>

                          <div className="flex-1">
                            <p className="text-sm font-semibold">
                              {infra.label}
                            </p>
                            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                              {infra.description}
                            </p>
                          </div>

                          {/* "Soon" cards say it with the badge + tooltip;
                              caller-supplied reasons need the full sentence. */}
                          {infra.isDisabled && !infra.comingSoon && (
                            <p
                              id={`${infra.id}-reason`}
                              className="text-[0.6875rem] leading-relaxed text-muted-foreground"
                            >
                              {infra.reason}
                            </p>
                          )}

                          {/* Only the navigating variant needs a call to
                              action — picking is confirmed by the tick. */}
                          {navigates && !infra.isDisabled && (
                            <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors duration-200 group-hover/item:text-foreground">
                              Open
                              <ArrowRight className="size-3.5 transition-transform duration-200 group-hover/item:translate-x-0.5" />
                            </span>
                          )}
                        </CardContent>
                      </Card>
                    </button>
                  );

                  const revealed = (
                    <motion.div
                      key={infra.id}
                      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: index * 0.03 }}
                      whileHover={
                        infra.isDisabled || reduceMotion ? undefined : { y: -4 }
                      }
                      whileTap={
                        infra.isDisabled || reduceMotion
                          ? undefined
                          : { scale: 0.985 }
                      }
                      className="h-full"
                    >
                      {card}
                    </motion.div>
                  );

                  // Only the terse "Soon" badge needs a tooltip to explain it
                  return infra.comingSoon ? (
                    <Tooltip key={infra.id}>
                      <TooltipTrigger asChild>{revealed}</TooltipTrigger>
                      <TooltipContent>{infra.reason}</TooltipContent>
                    </Tooltip>
                  ) : (
                    revealed
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );

  return (
    <TooltipProvider delayDuration={200}>
      {fullPage ? (
        <div className="flex min-h-screen w-full justify-center bg-muted/30 p-6 md:p-10">
          {content}
        </div>
      ) : (
        content
      )}
    </TooltipProvider>
  );
};

export default InfraTypeSelector;
export type { InfraType };
