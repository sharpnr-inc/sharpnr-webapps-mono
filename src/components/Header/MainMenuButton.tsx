import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "@tanstack/react-router";
import {
  SharpAccountingNavs,
  SharpHospitalityNavs,
  SharpHRNavs,
  SharpMarketingNavs,
} from "@/components/Dashboard/SidebarNavs";
import sharpnrLogo from "../../../public/AppIcon.png";

export default function MainMenuButton() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const allModules = [
    ...SharpHospitalityNavs,
    ...SharpAccountingNavs,
    ...SharpHRNavs,
    ...SharpMarketingNavs,
  ];

  // ⌘M / Ctrl+M
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      if (
        (isMac && e.metaKey && e.key.toLowerCase() === "m") ||
        (!isMac && e.ctrlKey && e.key.toLowerCase() === "m")
      ) {
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
          className="h-10 w-10 rounded-full grid place-items-center"
        >
          <img
            src={sharpnrLogo}
            alt="Menu"
            className="h-10 w-10 rounded-full object-cover"
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="center" className="w-auto p-2">
        {allModules.map((section, index) => (
          <DropdownMenuGroup key={section.id}>
            <DropdownMenuLabel className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              {section.title}
            </DropdownMenuLabel>

            {/* 🔲 Grid Launcher */}
            <div className="grid grid-cols-3 gap-2 px-2 pb-3">
              {section.items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    navigate({ to: item.to });
                    setOpen(false);
                  }}
                  className="
                    group
                    flex flex-col items-center justify-center
                    h-16 w-full
                    rounded-xl
                    border border-border
                    bg-background
                    hover:bg-accent
                    focus-visible:ring-2 focus-visible:ring-ring
                    transition-all
                    text-xs font-medium
                  "
                >
                  <item.icon
                    className="
                      h-5 w-5 mb-1
                      text-muted-foreground
                      group-hover:text-foreground
                      transition-colors
                    "
                  />

                  <span className="line-clamp-2 text-center text-xs leading-tight">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>

            {index < allModules.length - 1 && (
              <DropdownMenuSeparator className="my-2" />
            )}
          </DropdownMenuGroup>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
