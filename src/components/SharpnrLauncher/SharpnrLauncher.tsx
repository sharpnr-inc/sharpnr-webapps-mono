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
import { useLauncherResolver } from "./LauncherOptionsResvolver";
import { LauncherSkeleton } from "./LauncherSkeleton";

export default function SharpnrLauncher() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // Example: Integrating with a data fetcher (replace with your actual auth/api hook)
  // const { data: permissions, isLoading } = useQuery({ queryKey: ['user-perms'], queryFn: fetchUserModules });
  const [permissions, setPermissions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setPermissions(["resto", "kitchen", "hr", "acc","mkt", "orchestrator", "hotel", "ngc"]);
      setIsLoading(false);
    }, 2000);
  }, []);

  const { modules } = useLauncherResolver(permissions, isLoading);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      if ((isMac ? e.metaKey : e.ctrlKey) && e.key.toLowerCase() === "m") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full p-0 transition-transform active:scale-90 ring-1 ring-border"
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
        className="w-[340px] rounded-3xl border border-border p-4 shadow-2xl bg-background"
        sideOffset={12}
      >
        <div className="max-h-[80vh] overflow-y-auto pr-1">
          {isLoading ? (
            <LauncherSkeleton />
          ) : (
            modules.map((section, index) => (
              <DropdownMenuGroup
                key={section.id}
                className={cn(
                  "mb-6 last:mb-0",
                  section.isSubSection && "-mt-4",
                )}
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
                <div className="grid grid-cols-3 gap-x-2 gap-y-4">
                  {section.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        navigate({ to: item.to });
                        setOpen(false);
                      }}
                      className="group flex flex-col items-center gap-2 outline-none"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-muted/30 transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-foreground group-hover:text-background">
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
