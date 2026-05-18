/*
this is the Root layout Sidebar links
SidebarLinks.tsx
*/

import {
  BoxesIcon,
  BriefcaseBusiness,
  Building2,
  Building2Icon,
  Cable,
  ContainerIcon,
  DollarSign,
  Globe,
  Globe2Icon,
  Home,
  LucideShoppingBasket,
  Origami,
  Users,
  Verified,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  useSidebar,
  SharpnrSidebarFooter,
} from "@sharpnr/ui";
import { useAppUserStore } from "@/store/AppUserStore";
import { Link } from "@tanstack/react-router";

export type SidebarLink = {
  label: string;
  path?: string;
  icon: React.ElementType;
  tooltip?: string;
  exact?: boolean;
};

export const orchestratorLinks: SidebarLink[] = [
  { label: "Home", path: "/home", icon: Origami, tooltip: "Home", exact: true },
  {
    label: "Organization",
    path: "/organization",
    icon: Home,
    tooltip: "Organization",
    exact: true,
  },
  {
    label: "Properties",
    path: "/property",
    icon: Building2Icon,
    tooltip: "Properties",
    exact: false,
  },
  {
    label: "Legal Entity",
    path: "/legal_entity",
    icon: BriefcaseBusiness,
    tooltip: "Legal Entity",
    exact: false,
  },
  {
    label: "Payments",
    path: "/payments",
    icon: DollarSign,
    tooltip: "Payments",
  },
  {
    label: "Inventories",
    path: "/inventory-acc",
    icon: LucideShoppingBasket,
    tooltip: "Inventories",
  },
  {
    label: "Suppliers & Vendors",
    path: "/suppliers&Vendors",
    icon: ContainerIcon,
    tooltip: "Suppliers & Vendors",
  },
  {
    label: "User Directory",
    path: "/org-users",
    icon: Users,
    tooltip: "User Directory",
  },
  {
    label: "Audit Logs",
    path: "/audit-log",
    icon: Verified,
    tooltip: "Audit Logs",
  },
  { label: "Storage", path: "/storage", icon: BoxesIcon, tooltip: "Storage" },
  { label: "Cables", path: "/cables", icon: Cable, tooltip: "Cables" },
  {
    label: "Descovro Integration",
    path: "/descovro_integrations",
    icon: Globe2Icon,
    tooltip: "Descovro Integration",
  },
  {
    label: "Sharp Marketplace",
    path: "/sharp_marketplace",
    icon: Globe,
    tooltip: "Sharp Marketplace",
  },
];

export function OrchestratorShell() {
  const { state } = useSidebar();
  const { user } = useAppUserStore();

  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={false}
              size="lg"
              variant={"outline"}
              tooltip={user?.org_data.org_name}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Building2 className="h-4 w-4" />
              </div>

              {!isCollapsed && (
                <div className="flex flex-col min-w-0">
                  <span className="truncate text-sm font-bold">
                    {user?.org_data.org_name}
                  </span>

                  <span className="truncate text-xs font-mono">
                    {user?.org_data.sharp_id}
                  </span>
                </div>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Orchestrator</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {orchestratorLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      className="bg-transparent"
                      size={"sm"}
                      // tooltip={item.tooltip}
                      asChild={!!item.path}
                    >
                      {item.path ? (
                        <Link to={item.path}>
                          <Icon />
                          <span>{item.label}</span>
                        </Link>
                      ) : (
                        <>
                          <Icon />
                          <span>{item.label}</span>
                        </>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SharpnrSidebarFooter />
    </Sidebar>
  );
}
