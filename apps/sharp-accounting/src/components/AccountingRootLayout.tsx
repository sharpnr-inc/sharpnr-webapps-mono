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
  useSidebar,
  SidebarHeader,
  SharpnrSidebarFooter,
  AppShell,
  useSheet,
} from "@sharpnr/ui";
import { ScrollArea, ScrollBar } from "@sharpnr/ui";
import { Building2, Check, ChevronsUpDown } from "lucide-react";
import { useAccountingStore } from "../store/accounting.store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@sharpnr/ui";
import {
  NotificationBell,
  UserCard,
  ModeToggle,
  SharpnrLauncher,
} from "@sharpnr/ui";
import { config } from "@sharpnr/env";
import { useAppUserStore, selectIsLoadingUser } from "@/store/AppUserStore";
import { useLogout } from "@/api/mutation";
import { QuickAccess } from "@/components/header/QuickAccess";
import { accountingSidebar, type AccountingNavItem } from "./AccountingNavs";

/* ================================
   Nav Item
================================ */

function AccountingNavItem({ item }: { item: AccountingNavItem }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const Icon = item.icon;

  const isActive = item.exact
    ? pathname === item.to
    : pathname.startsWith(item.to);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        size="sm"
        isActive={isActive}
        tooltip={item.label}
      >
        <Link to={item.to}>
          <Icon />
          <span>{item.label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

/* ================================
   Layout
================================ */

const AccountingRootLayout = () => {
  const { openSheet } = useSheet();
  const { user } = useAppUserStore();
  const isLoadingUser = useAppUserStore(selectIsLoadingUser);
  const { mutate: logoutUser, isPending: isLoggingOut } = useLogout();
  return (
    <AppShell
      sidebar={
        <Sidebar collapsible="icon" variant="sidebar" side="left">
          <SidebarHeader>
            <LegalEntitySwitcher />
          </SidebarHeader>

          <SidebarContent className="overflow-hidden">
            <ScrollArea className="h-full w-full">
              <div className="pb-2">
                {accountingSidebar.map((section) => (
                  <SidebarGroup key={section.group}>
                    <SidebarGroupLabel>{section.group}</SidebarGroupLabel>

                    <SidebarGroupContent>
                      <SidebarMenu>
                        {section.items.map((item) => (
                          <AccountingNavItem key={item.label} item={item} />
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                ))}
              </div>
              <ScrollBar orientation="vertical" />
            </ScrollArea>
          </SidebarContent>
          <SharpnrSidebarFooter appName="Accounting" />
        </Sidebar>
      }
      headerActions={
        <>
          <SharpnrLauncher currentApp="accounting" />
          <NotificationBell onClick={() => openSheet(<>HI</>, "1/4")} />
          <UserCard
            user={user}
            isLoading={isLoadingUser}
            onLogout={() => logoutUser()}
            isLoggingOut={isLoggingOut}
            iamUrl={config.iamAppUrl}
            quickAccess={<QuickAccess />}
          />
          <ModeToggle />
        </>
      }
    >
      <Outlet />
    </AppShell>
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
