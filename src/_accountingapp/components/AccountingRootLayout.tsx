import { Outlet, Link } from "@tanstack/react-router";
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

import { Building2, Check, ChevronsUpDown } from "lucide-react";
import { useAccountingStore } from "../store/accounting.store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { accountingSidebar } from "./AccountingNavs";
import { useMatchRoute } from "@tanstack/react-router";

/* ================================
   Layout
================================ */
const AccountingRootLayout = () => {
  const matchRoute = useMatchRoute();

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <LegalEntitySwitcher />
        </SidebarHeader>
        <SidebarContent>
          {accountingSidebar.map((section) => (
            <SidebarGroup key={section.group}>
              <SidebarGroupLabel>{section.group}</SidebarGroupLabel>

              <SidebarGroupContent>
                <SidebarMenu>
                  {section.items.map((item) => (
                    <SidebarMenuItem key={item.label}>
                      {/* 🔽 WITH CHILDREN (shadcn dropdown) */}
                      {item.children ? (
                        <>
                          <SidebarMenuButton>
                            <item.icon />
                            <span>{item.label}</span>
                          </SidebarMenuButton>

                          <SidebarMenuSub>
                            {item.children.map((child) => (
                              <SidebarMenuSubItem key={child.label}>
                                <SidebarMenuSubButton asChild>
                                  <Link to={child.to}>
                                    <span>{child.label}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </>
                      ) : (
                        /* 🔹 NORMAL LINK */
                        <SidebarMenuButton asChild>
                          <Link to={item.to}>
                            <item.icon />
                            <span>{item.label}</span>
                          </Link>
                        </SidebarMenuButton>
                      )}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
      </Sidebar>

      {/* ========= Main ========= */}
      <SidebarInset>
        <header className="flex h-14 items-center gap-2 px-4">
          <SidebarTrigger />
          <span className="font-medium">Accounting</span>
        </header>

        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AccountingRootLayout;

export function LegalEntitySwitcher() {
  const { state } = useSidebar(); // expanded | collapsed

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
            {/* ICON */}
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <Building2 className="size-4" />
            </div>

            {/* TEXT (hidden when collapsed) */}
            {!isCollapsed && (
              <>
                <div className="flex flex-col gap-0.5 leading-none overflow-hidden">
                  <span className="font-medium truncate">
                    {selectedLegalEntity?.name ?? "Select Legal Entity"}
                  </span>

                  <span className="text-xs text-muted-foreground truncate">
                    {selectedLegalEntity
                      ? `${selectedLegalEntity.city}, ${selectedLegalEntity.state}`
                      : "Accounting Workspace"}
                  </span>
                </div>

                <ChevronsUpDown className="ml-auto size-4 opacity-50" />
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
