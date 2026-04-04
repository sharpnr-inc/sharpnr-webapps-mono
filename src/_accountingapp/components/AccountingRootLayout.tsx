import { Outlet, Link, useRouterState } from "@tanstack/react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
  useSidebar,
  SidebarHeader,
} from "@/components/ui/sidebar";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { Building2, Check, ChevronDown, ChevronsUpDown } from "lucide-react";

import { useAccountingStore } from "../store/accounting.store";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { accountingSidebar } from "./AccountingNavs";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

/* ================================
   Layout
================================ */

const AccountingRootLayout = () => {
  const pathname = useRouterState({
    select: (s) => s.location.pathname,
  });

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <LegalEntitySwitcher />
        </SidebarHeader>

        {/* ✅ Fixed: ScrollArea lives inside SidebarContent, no asChild */}
        <SidebarContent className="overflow-hidden">
          <ScrollArea className="h-full w-full">
            <div className="pb-2">
              {accountingSidebar.map((section) => (
                <SidebarGroup key={section.group}>
                  <SidebarGroupLabel>{section.group}</SidebarGroupLabel>

                  <SidebarGroupContent>
                    <SidebarMenu>
                      {section.items.map((item) =>
                        item.children ? (
                          <Collapsible
                            key={item.label}
                            defaultOpen={item.children.some(
                              (c) =>
                                pathname === c.to ||
                                pathname.startsWith(`${c.to}/`),
                            )}
                            className="group/collapsible"
                          >
                            <SidebarMenuItem>
                              <CollapsibleTrigger asChild>
                                <SidebarMenuButton
                                  isActive={item.children.some(
                                    (c) =>
                                      pathname === c.to ||
                                      pathname.startsWith(`${c.to}/`),
                                  )}
                                  tooltip={item.label}
                                >
                                  <item.icon />
                                  <span>{item.label}</span>

                                  <ChevronDown className="ml-auto size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                                </SidebarMenuButton>
                              </CollapsibleTrigger>

                              <CollapsibleContent>
                                <SidebarMenuSub>
                                  {item.children.map((child) => (
                                    <SidebarMenuSubItem key={child.label}>
                                      <SidebarMenuSubButton
                                        asChild
                                        isActive={pathname === child.to}
                                      >
                                        <Link to={child.to}>
                                          <span>{child.label}</span>
                                        </Link>
                                      </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                  ))}
                                </SidebarMenuSub>
                              </CollapsibleContent>
                            </SidebarMenuItem>
                          </Collapsible>
                        ) : (
                          <SidebarMenuItem key={item.label}>
                            <SidebarMenuButton
                              asChild
                              isActive={
                                pathname === item.to ||
                                pathname.startsWith(`${item.to}/`)
                              }
                              tooltip={item.label}
                            >
                              <Link to={item.to}>
                                <item.icon />
                                <span>{item.label}</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ),
                      )}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              ))}
            </div>

            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </SidebarContent>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger />
          <span className="">Accounting</span>
        </header>

        <main className=" overflow-auto p-4">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AccountingRootLayout;

/* ================================
   Legal Entity Switcher
================================ */

export function LegalEntitySwitcher() {
  const { state } = useSidebar();

  const legalEntities = useAccountingStore((s) => s.legalEntities);
  const selectedLegalEntity = useAccountingStore((s) => s.selectedLegalEntity);
  const setSelectedLegalEntity = useAccountingStore(
    (s) => s.setSelectedLegalEntity,
  );

  const isCollapsed = state === "collapsed";

  return (
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton
            size="lg"
            tooltip={isCollapsed ? selectedLegalEntity?.name : undefined}
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <div className="flex aspect-square size-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <Building2 className="size-4" />
            </div>

            {!isCollapsed && (
              <>
                <div className="flex min-w-0 flex-col gap-0.5 leading-none">
                  <span className="truncate font-medium">
                    {selectedLegalEntity?.name ?? "Select Legal Entity"}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    {selectedLegalEntity
                      ? `${selectedLegalEntity.city}, ${selectedLegalEntity.state}`
                      : "Accounting Workspace"}
                  </span>
                </div>

                <ChevronsUpDown className="ml-auto size-4 shrink-0 opacity-50" />
              </>
            )}
          </SidebarMenuButton>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" className="min-w-56">
          {legalEntities.map((entity: any) => (
            <DropdownMenuItem
              key={entity.id}
              onSelect={() => setSelectedLegalEntity(entity)}
            >
              {entity.name}
              {entity.id === selectedLegalEntity?.id && (
                <Check className="ml-auto size-4" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );
}
