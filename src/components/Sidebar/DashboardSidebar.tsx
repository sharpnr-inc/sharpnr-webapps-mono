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
import { EmployeeNavs, SharpHospitalityNavs, SharpAccountingNavs, SharpHRNavs, SharpMarketingNavs } from "./SidebarNavs";
import { useNavigate, useRouter } from "@tanstack/react-router";

export default function DashboardSideBar() {
  const navigate = useNavigate();
  const router = useRouter();
  // ✨ CHANGED: Add state for controlling the sidebar and check for mobile
  const {isMobile, toggleSidebar}=useSidebar();

  // ✨ CHANGED: Create a handler function to navigate and close the sidebar on mobile
 const handleNavigate = (to: string) => {
  router.navigate({ to });
  if (isMobile) toggleSidebar();
};

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <div className=" p-2">
            <div className=" truncate">{"Dearie clubs and Restaurant"}</div>
            <Badge variant="destructive">{"SUPER ADMIN"}</Badge>
          </div>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="custom-scrollbar">
        {/* Employee section Starts */}
        <SidebarGroup>
          <SidebarGroupLabel>Employee Section</SidebarGroupLabel>
          <SidebarMenu>
            {EmployeeNavs[0].items.map((item) => (
              <SidebarMenuItem key={item.id}>
                {/* ✨ CHANGED: Use the new handler function */}
                <SidebarMenuButton onClick={() => handleNavigate(item.to)}>
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {/* Employee Section Ends */}
        {/* Modules Groups */}
        <SidebarGroup>
          <SidebarGroupLabel>Sharp Modules</SidebarGroupLabel>
          {/* Note: You have two identical collapsible sections here. I'll apply the fix to both. */}
          <SidebarMenu>
            <Collapsible defaultOpen className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip="some thing boy">
                    <span>{SharpHospitalityNavs[0].title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {SharpHospitalityNavs[0].items.map((item) => (
                      <SidebarMenuSubItem key={item.id}>
                        <SidebarMenuSubButton
                          // ✨ CHANGED: Use the new handler function
                          onClick={() => handleNavigate(item.to)}
                          asChild
                        >
                          <span>{item.label}</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>

          <SidebarMenu>
            <Collapsible defaultOpen className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip="some thing boy">
                    <span>{SharpAccountingNavs[0].title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {SharpAccountingNavs[0].items.map((item) => (
                      <SidebarMenuSubItem key={item.id}>
                        <SidebarMenuSubButton
                          // ✨ CHANGED: Use the new handler function
                          onClick={() => handleNavigate(item.to)}
                          asChild
                        >
                          <span>{item.label}</span>
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