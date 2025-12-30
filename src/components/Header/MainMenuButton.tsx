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
import sharpnrLogo from "../../../public/AppIcon.png";

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
      <DropdownMenu modal={false}>
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
                <DropdownMenuSub key={item.id}>
                  <DropdownMenuSubTrigger className="flex items-center gap-2">
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </DropdownMenuSubTrigger>

                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem
                        className="flex items-center gap-2"
                        onClick={() => navigate({ to: item.to })}
                      >
                        <item.icon className="h-4 w-4" />
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
