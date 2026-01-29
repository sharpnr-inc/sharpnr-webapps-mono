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
} from "@/components/Header/app_navs";
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

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const isModifierPressed = isMac ? e.metaKey : e.ctrlKey;
      
      if (isModifierPressed && e.key.toLowerCase() === "m") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleNavigate = (path: string) => {
    navigate({ to: path });
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full p-0"
          aria-label="Open main menu"
        >
          <img
            src={sharpnrLogo}
            alt="SharpNR"
            className="h-10 w-10 rounded-full object-cover"
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent 
        align="center" 
        className="w-auto min-w-[280px] max-w-sm p-3"
        sideOffset={8}
      >
        {allModules.map((section, index) => (
          <DropdownMenuGroup key={section.id}>
            <DropdownMenuLabel className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wider opacity-70">
              {section.title}
            </DropdownMenuLabel>

            <div className="grid grid-cols-3 gap-2 px-1 pb-2">
              {section.items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavigate(item.to)}
                  className="
                    group relative
                    flex flex-col items-center justify-center gap-1.5
                    h-20 w-full
                    rounded-lg
                    border
                    hover:border-foreground/20
                    hover:shadow-sm
                    focus-visible:outline-none
                    focus-visible:ring-2 
                    focus-visible:ring-ring
                    focus-visible:ring-offset-2
                    transition-all duration-200
                    active:scale-95
                  "
                  aria-label={item.label}
                >
                  <item.icon
                    className="h-6 w-6 transition-transform duration-200 group-hover:scale-110"
                    strokeWidth={1.5}
                  />

                  <span className="px-1 text-[11px] font-medium leading-tight text-center line-clamp-2">
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