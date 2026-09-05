import { Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import type { LinkProps } from "@tanstack/react-router";
import {
  AppShell,
  ModeToggle,
  NotificationBell,
  ScrollArea,
  ScrollBar,
  SharpnrLauncher,
  SharpnrSidebarFooter,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  UserCard,
  useSidebar,
} from "@sharpnr/ui";
import { config } from "@sharpnr/env";
import {
  Building2,
  Clock,
  FileText,
  FileType2,
  House,
  LayoutTemplate,
  PenLine,
  Presentation,
  Settings,
  Shapes,
  Sheet as SheetIcon,
  Star,
  StickyNote,
  Trash2,
  Users,
} from "lucide-react";

import { useAppUserStore, selectIsLoadingUser } from "@/store/AppUserStore";
import { useLogout } from "@/api/mutation";

/* ───────────────── Nav Config ───────────────── */

type FolioNavItem = {
  id: string;
  label: string;
  icon: React.ElementType;
  /**
   * Typed against the generated route tree rather than `string`, so a nav
   * entry pointing at a route that does not exist fails the build instead of
   * shipping a link that silently 404s.
   */
  to: NonNullable<LinkProps["to"]>;
  exact?: boolean;
};

type FolioNavGroup = { group: string; items: FolioNavItem[] };

const folioSidebar: FolioNavGroup[] = [
  {
    group: "Library",
    items: [
      { id: "fo_home", label: "Home", icon: House, to: "/home", exact: true },
      { id: "fo_recent", label: "Recent", icon: Clock, to: "/recent" },
      { id: "fo_starred", label: "Starred", icon: Star, to: "/starred" },
      { id: "fo_shared", label: "Shared with me", icon: Users, to: "/shared" },
      { id: "fo_trash", label: "Trash", icon: Trash2, to: "/trash" },
    ],
  },
  {
    group: "Content",
    items: [
      { id: "fo_docs", label: "Documents", icon: FileText, to: "/documents" },
      { id: "fo_sheets", label: "Spreadsheets", icon: SheetIcon, to: "/sheets" },
      { id: "fo_slides", label: "Presentations", icon: Presentation, to: "/slides" },
      { id: "fo_pdfs", label: "PDFs", icon: FileType2, to: "/pdfs" },
      { id: "fo_boards", label: "Whiteboards", icon: Shapes, to: "/boards" },
      { id: "fo_notes", label: "Notes", icon: StickyNote, to: "/notes" },
      { id: "fo_markdown", label: "Markdown", icon: PenLine, to: "/markdown" },
    ],
  },
  {
    group: "System",
    items: [
      { id: "fo_templates", label: "Templates", icon: LayoutTemplate, to: "/templates" },
      { id: "fo_settings", label: "Settings", icon: Settings, to: "/settings", exact: true },
    ],
  },
];

/* ───────────────── Nav Item ───────────────── */

const NavMenuItem: React.FC<{ item: FolioNavItem }> = ({ item }) => {
  const { location } = useRouterState();
  const Icon = item.icon;

  const isActive = item.exact
    ? location.pathname === item.to
    : location.pathname.startsWith(item.to);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton size="sm" asChild isActive={isActive} tooltip={item.label}>
        <Link to={item.to}>
          <Icon />
          <span>{item.label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

/* ───────────────── Sidebar ───────────────── */

/**
 * Its own component rather than JSX inlined into <AppShell sidebar={…}>:
 * `useSidebar` only works below the provider that AppShell renders, so the
 * header needs to be a child of it to know whether the rail is collapsed.
 */
const FolioSidebar: React.FC = () => {
  const { location } = useRouterState();
  const { state } = useSidebar();
  const { user } = useAppUserStore();
  const navigate = useNavigate();

  const isCollapsed = state === "collapsed";
  const isHomeActive = location.pathname === "/home";

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              variant="outline"
              isActive={isHomeActive}
              tooltip={user?.org_data.org_name}
              className="cursor-pointer"
              onClick={() => navigate({ to: "/home" })}
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shrink-0">
                <Building2 className="size-4" />
              </div>

              {!isCollapsed && (
                <div className="grid flex-1 text-left text-sm min-w-0">
                  <span className="truncate font-semibold">
                    {user?.org_data.org_name}
                  </span>
                  <span className="truncate text-xs font-mono text-muted-foreground">
                    {user?.org_data.sharp_id}
                  </span>
                </div>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="overflow-hidden">
        <ScrollArea className="h-full w-full">
          <div className="pb-2">
            {folioSidebar.map((group) => (
              <SidebarGroup key={group.group}>
                <SidebarGroupLabel>{group.group}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => (
                      <NavMenuItem key={item.id} item={item} />
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </SidebarContent>

      <SidebarRail />
      <SharpnrSidebarFooter appName="Folio" />
    </Sidebar>
  );
};

/* ───────────────── Layout ───────────────── */

const FolioLayout: React.FC = () => {
  const { user } = useAppUserStore();
  const isLoadingUser = useAppUserStore(selectIsLoadingUser);
  const { mutate: logoutUser, isPending: isLoggingOut } = useLogout();

  return (
    <AppShell
      sidebar={<FolioSidebar />}
      headerActions={
        <>
          <SharpnrLauncher currentApp="folio" />
          <NotificationBell onClick={() => {}} />
          <UserCard
            user={user}
            isLoading={isLoadingUser}
            onLogout={() => logoutUser()}
            isLoggingOut={isLoggingOut}
            iamUrl={config.iamAppUrl}
          />
          <ModeToggle />
        </>
      }
    >
      <Outlet />
    </AppShell>
  );
};

export default FolioLayout;
