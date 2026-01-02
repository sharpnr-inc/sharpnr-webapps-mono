import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
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

  // ⌘M (mac) / Ctrl+M (win, linux)
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
    <div about="Header for the Sharpnr">
      <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="group">
            <img
              src={sharpnrLogo}
              alt="Menu"
              className="
                h-6 w-6
                transition-transform duration-200 ease-in-out
                group-data-[state=open]:rotate-180
              "
            />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-64" align="start">
          {allModules.map((section, index) => (
            <DropdownMenuGroup key={section.id}>
              <DropdownMenuLabel className="text-sm font-semibold">
                {section.title}
              </DropdownMenuLabel>

              {section.items.map((item) => (
                <DropdownMenuItem
                  key={item.id}
                  className="flex items-center gap-2"
                  onClick={() => {
                    navigate({ to: item.to });
                    setOpen(false); // 🔥 close after click
                  }}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </DropdownMenuItem>
              ))}

              {index < allModules.length - 1 && <DropdownMenuSeparator />}
            </DropdownMenuGroup>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
