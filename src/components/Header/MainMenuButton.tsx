import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useNavigate } from "@tanstack/react-router";
import {
  SharpAccountingNavs,
  SharpHospitalityNavs,
  SharpHRNavs,
  SharpMarketingNavs,
} from "@/components/Dashboard/SidebarNavs";
import { Server } from "lucide-react";

export default function MainMenuButton() {
  const navigate = useNavigate();

  const allModules = [
    ...SharpHospitalityNavs,
    ...SharpAccountingNavs,
    ...SharpHRNavs,
    ...SharpMarketingNavs,
  ];

  return (
    <div about="Header for the Sharpnr">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Server />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-64" align="start">
          {allModules.map((section, index) => (
            <DropdownMenuGroup key={section.id}>
              <DropdownMenuLabel className="text-sm font-semibold">
                {section.title}
              </DropdownMenuLabel>
              
              {section.items.map((item) => (
                <DropdownMenuSub key={item.id}>
                  <DropdownMenuSubTrigger className="flex items-center gap-2">
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </DropdownMenuSubTrigger>

                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem
                        className="flex items-center gap-2"
                        onClick={() => navigate({ to: item.to })}
                      >
                        <item.icon className="w-4 h-4" />
                        Open {item.label}
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              ))}
              
              {index < allModules.length - 1 && <DropdownMenuSeparator />}
            </DropdownMenuGroup>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}