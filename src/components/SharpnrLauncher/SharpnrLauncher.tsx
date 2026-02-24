import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { buildLauncherSections } from "./launcher.builder";
import { LauncherSkeleton } from "./LauncherSkeleton";
import { useLauncher } from "./api";

export default function SharpnrLauncher() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const { data, isLoading } = useLauncher();

  // 👇 simple derived value (NO useMemo)
  const modules = data ? buildLauncherSections(data) : [];

  // CTRL + M shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");

      if ((isMac ? e.metaKey : e.ctrlKey) && e.key.toLowerCase() === "m") {
        e.preventDefault();
        setOpen((p) => !p);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full p-0 ring-1 ring-border"
        >
          <img
            src="/AppIcon.png"
            alt="Sharpnr"
            className="h-10 w-10 rounded-full grayscale"
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="center"
        className="w-[340px] rounded-3xl border p-4 shadow-2xl bg-background"
      >
        <div className="max-h-[80vh] overflow-y-auto pr-1">
          {isLoading ? (
            <LauncherSkeleton />
          ) : (
            modules.map((section, index) => (
              <DropdownMenuGroup
                key={section.id}
                className={cn("mb-6", section.isSubSection && "-mt-4")}
              >
                <DropdownMenuLabel
                  className={cn(
                    "mb-3 px-2 text-[10px] font-bold uppercase tracking-[0.15em]",
                    section.isSubSection
                      ? "text-muted-foreground/40 italic"
                      : "text-muted-foreground/60",
                  )}
                >
                  {section.title}
                </DropdownMenuLabel>

                <div className="grid grid-cols-3 gap-3">
                  {section.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        navigate({ to: item.to });
                        setOpen(false);
                      }}
                      className="group flex flex-col items-center gap-2"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border bg-muted/30 group-hover:bg-foreground group-hover:text-background transition">
                        <item.icon />
                      </div>
                      <span className="text-[11px] font-semibold text-muted-foreground group-hover:text-foreground">
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>

                {!section.isSubSection && index < modules.length - 1 && (
                  <DropdownMenuSeparator className="mt-6 opacity-20" />
                )}
              </DropdownMenuGroup>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
