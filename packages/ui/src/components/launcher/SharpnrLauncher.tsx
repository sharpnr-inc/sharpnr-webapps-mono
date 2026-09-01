"use client";

import { useEffect, useState } from "react";
import { LayoutGrid } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  LAUNCHER_SECTIONS,
  type LauncherAppId,
  type LauncherItem,
  type LauncherSection,
} from "./launcher.config";

const isMac = () =>
  typeof navigator !== "undefined" &&
  navigator.platform.toUpperCase().includes("MAC");

/* =========================================================
   TILE
========================================================= */

const tileClass = cn(
  "relative flex flex-col items-start gap-2 rounded-lg p-2.5 text-left",
  "transition-colors hover:bg-accent focus-visible:bg-accent",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
);

function Tile({
  item,
  isCurrent,
  onSelect,
}: {
  item: LauncherItem;
  isCurrent: boolean;
  onSelect: () => void;
}) {
  const body = (
    <>
      <span
        className={cn(
          "relative flex h-9 w-9 items-center justify-center rounded-md border",
          isCurrent
            ? "border-primary/40 bg-primary/10 text-primary"
            : "bg-muted/50 text-muted-foreground",
        )}
      >
        <item.icon className="h-4.5 w-4.5" strokeWidth={1.75} />
        {isCurrent && (
          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-primary ring-2 ring-popover" />
        )}
      </span>
      <span className="flex min-w-0 flex-col gap-0.5">
        <span
          className={cn(
            "truncate text-xs font-medium leading-none",
            isCurrent && "text-primary",
          )}
        >
          {item.label}
        </span>
        <span className="truncate text-[10px] leading-tight text-muted-foreground">
          {isCurrent ? "You are here" : item.description}
        </span>
      </span>
    </>
  );

  const className = cn(
    tileClass,
    isCurrent && "bg-accent/60 ring-1 ring-primary/25",
  );
  const title = isCurrent
    ? `${item.label} (current app)`
    : (item.description ?? item.label);

  // External Sharpnr apps are plain links (their URL comes from @sharpnr/env);
  // internal routes go back to the host app's router via onNavigate.
  return item.href ? (
    <a
      href={item.href}
      title={title}
      aria-current={isCurrent ? "page" : undefined}
      className={className}
      onClick={onSelect}
    >
      {body}
    </a>
  ) : (
    <button
      type="button"
      title={title}
      aria-current={isCurrent ? "page" : undefined}
      className={className}
      onClick={onSelect}
    >
      {body}
    </button>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export interface SharpnrLauncherProps {
  /** Sections to render. Defaults to the shared Sharpnr suite listing. */
  sections?: LauncherSection[];
  /**
   * The app doing the rendering, as a `LauncherItem.id`. Its tile is marked as
   * the current one so a user can see where they already are. Widened to
   * `string` for apps that pass their own `sections` with their own ids.
   */
  currentApp?: LauncherAppId | (string & {});
  /**
   * Called with an item's `to` when an item without an `href` is picked. Apps
   * wire this to their own router (e.g. `const navigate = useNavigate()` ->
   * `navigate({ to })`), which keeps this package free of a router dependency.
   */
  onNavigate?: (to: string) => void;
}

export default function SharpnrLauncher({
  sections = LAUNCHER_SECTIONS,
  currentApp,
  onNavigate,
}: SharpnrLauncherProps = {}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((isMac() ? e.metaKey : e.ctrlKey) && e.key.toLowerCase() === "m") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleSelect = (item: LauncherItem) => {
    if (!item.href && item.to) onNavigate?.(item.to);
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={`Open Sharpnr launcher (${isMac() ? "⌘" : "Ctrl"}+M)`}
          className={cn(
            "h-9 w-9 rounded-xl border border-transparent",
            "hover:border-border/60 hover:bg-accent/70",
            open && "border-border/60 bg-accent/70",
          )}
        >
          <LayoutGrid className="h-4.25 w-4.25" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="max-h-[75vh] w-[21rem] overflow-y-auto p-2"
      >
        <div className="flex items-center justify-between px-1.5 pt-1 pb-2">
          <span className="text-xs font-semibold">Sharpnr apps</span>
          <span className="flex items-center gap-1">
            {[isMac() ? "⌘" : "Ctrl", "M"].map((key) => (
              <kbd
                key={key}
                className="inline-flex h-4.5 items-center rounded border bg-muted px-1.5 font-mono text-[9px] text-muted-foreground"
              >
                {key}
              </kbd>
            ))}
          </span>
        </div>

        {sections.map((section) => (
          <div key={section.id} className="pb-1 last:pb-0">
            <p className="px-1.5 pb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              {section.title}
            </p>
            <div className="grid grid-cols-3 gap-0.5">
              {section.items.map((item) => (
                <Tile
                  key={item.id}
                  item={item}
                  isCurrent={item.id === currentApp}
                  onSelect={() => handleSelect(item)}
                />
              ))}
            </div>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
