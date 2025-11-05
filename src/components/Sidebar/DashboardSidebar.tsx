import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "../ui/sidebar";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { ChevronRight } from "lucide-react";
import * as sidebarNavs from "./SidebarNavs";
import { useRouter, useRouterState } from "@tanstack/react-router";
import { useUIRenderer } from "@/context/ui-rendererContext";
import { useEmployeePolicy } from "@/context/EmployeePolicyContext";
import { useState } from "react";

export default function DashboardSideBar() {
  const [show, setShow] = useState(true);
  const { renderTree, hasModuleAccess, hasSectionAccess, hasSubSectionAccess } =
    useUIRenderer();
  const { policy } = useEmployeePolicy();
  console.log(renderTree);
  const router = useRouter();

  const currentPath = useRouterState({
    select: (state) => state.location.pathname,
  });
  console.log("Sidebar render:", {
    renderTree,
    currentPath,
    timestamp: Date.now(),
  });

  // 🔥 Helper to detect active route
  const isActive = (path: string) =>
    currentPath === path || currentPath.startsWith(path + "/");

  const { isMobile, toggleSidebar } = useSidebar();
  const {
    SharpAccountingNavs,
    SharpHospitalityNavs,
    SharpHRNavs,
    SharpMarketingNavs,
  } = sidebarNavs;

  const filteredHospitalityItems = SharpHospitalityNavs[0].items.filter(
    (item) => {
      // Extract section name from route
      const pathSegments = item.to.split("/");
      console.log(pathSegments);
      const sectionName = pathSegments[pathSegments.length - 1];
      console.log(sectionName);

      // Map route names to render tree keys if they differ
      const sectionMapping: Record<string, string> = {
        restaurent: "restaurent", // Fix typo in route
      };

      const mappedSection = sectionMapping[sectionName] || sectionName;
      console.log(mappedSection);

      // Check if section exists in render tree
      return hasSectionAccess("sharp_hospitality", mappedSection);
    }
  );

  const handleNavigate = (to: string) => {
    router.navigate({ to });
    if (isMobile) toggleSidebar();
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <div className="p-2">
            <div className="truncate">Dearie clubs and Restaurant</div>
            <Badge variant="destructive">SUPER ADMIN</Badge>
          </div>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="custom-scrollbar">
        {hasModuleAccess("sharp_hospitality") &&
          filteredHospitalityItems.length > 0 && (
            <SidebarGroup>
              <SidebarGroupLabel>Sharp Hospitality</SidebarGroupLabel>
              <SidebarMenu>
                {filteredHospitalityItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => handleNavigate(item.to)}
                      className={`flex items-center gap-2 transition-colors ${
                        isActive(item.to)
                          ? "bg-primary text-secondary"
                          : "hover:bg-muted"
                      }`}
                    >
                      <item.icon size={18} />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          )}

        <SidebarGroup>
          <SidebarGroupLabel>Sharp Modules</SidebarGroupLabel>

          {show ? (
            <SidebarMenu>
              <Collapsible className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      <span>{SharpAccountingNavs[0].title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {SharpAccountingNavs[0].items.map((item) => (
                        <SidebarMenuSubItem key={item.id}>
                          <SidebarMenuSubButton
                            onClick={() => handleNavigate(item.to)}
                            className={`transition-colors ${
                              isActive(item.to)
                                ? "bg-primary text-secondary"
                                : "hover:bg-muted"
                            }`}
                          >
                            {item.label}
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          ) : (
            <>NO ACCESS</>
          )}

          {
            <SidebarMenu>
              <Collapsible className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      <span>{SharpHRNavs[0].title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {SharpHRNavs[0].items.map((item) => (
                        <SidebarMenuSubItem key={item.id}>
                          <SidebarMenuSubButton
                            onClick={() => handleNavigate(item.to)}
                            className={`transition-colors ${
                              isActive(item.to)
                                ? "bg-primary text-secondary"
                                : "hover:bg-muted"
                            }`}
                          >
                            {item.label}
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          }

          {
            <SidebarMenu>
              <Collapsible className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      <span>{SharpMarketingNavs[0].title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {SharpMarketingNavs[0].items.map((item) => (
                        <SidebarMenuSubItem key={item.id}>
                          <SidebarMenuSubButton
                            onClick={() => handleNavigate(item.to)}
                            className={`transition-colors ${
                              isActive(item.to)
                                ? "bg-primary text-secondary"
                                : "hover:bg-muted"
                            }`}
                          >
                            {item.label}
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          }
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <Button variant="destructive">Logout</Button>
      </SidebarFooter>
    </Sidebar>
  );
}
