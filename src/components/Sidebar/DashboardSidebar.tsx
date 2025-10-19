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

export default function DashboardSideBar() {
  const router = useRouter();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

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
        {/* Hospitality Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Sharp Hospitality</SidebarGroupLabel>
          <SidebarMenu>
            {SharpHospitalityNavs[0].items.map((item) => (
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

        {/* Accounting / HR / Marketing Groups */}
        <SidebarGroup>
          <SidebarGroupLabel>Sharp Modules</SidebarGroupLabel>

          {/* Accounting */}
          <SidebarMenu>
            <Collapsible defaultOpen className="group/collapsible">
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
                              ? "bg-primary/10 text-primary font-medium"
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

          {/* HR */}
          <SidebarMenu>
            <Collapsible defaultOpen className="group/collapsible">
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
                              ? "bg-primary"
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

          {/* Marketing */}
          <SidebarMenu>
            <Collapsible defaultOpen className="group/collapsible">
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
                              ? "bg-primary/10 text-primary font-medium"
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
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <Button variant="destructive">Logout</Button>
      </SidebarFooter>
    </Sidebar>
  );
}
