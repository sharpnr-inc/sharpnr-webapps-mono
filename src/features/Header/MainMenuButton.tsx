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

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";


import { useNavigate } from "@tanstack/react-router";
import { SharpAccountingNavs, SharpHospitalityNavs, SharpHRNavs, SharpMarketingNavs } from "@/components/Sidebar/SidebarNavs";
import { Server } from "lucide-react";

export default function MainMenuButton() {
  const navigate = useNavigate();

  const allModules = [
    ...SharpHospitalityNavs,
    ...SharpAccountingNavs,
    ...SharpMarketingNavs,
    ...SharpHRNavs,
  ];

  return (
    <div about="Header for the Sharpnr">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline"><Server/></Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-64" align="start">
          <DropdownMenuLabel>Main Modules</DropdownMenuLabel>

          <DropdownMenuSeparator />

          {allModules.map((section) => (
            <DropdownMenuGroup key={section.id}>
              <Card className="mb-2">
                <CardHeader>
                  <CardTitle className="text-base">{section.title}</CardTitle>
                  <CardDescription>
                    Manage {section.title} modules
                  </CardDescription>
                </CardHeader>

                <CardContent>
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
                </CardContent>
              </Card>

              <DropdownMenuSeparator />
            </DropdownMenuGroup>
          ))}

          {/* FOOTER ACTIONS */}
          <DropdownMenuItem>GitHub</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuItem disabled>API</DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            Log out
            <span className="ml-auto text-xs opacity-50">⇧⌘Q</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
