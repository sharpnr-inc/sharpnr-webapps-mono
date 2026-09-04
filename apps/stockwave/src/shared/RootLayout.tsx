import {
  Outlet,
  Link,
  useNavigate,
  useRouterState,
} from "@tanstack/react-router";
import type { LinkProps } from "@tanstack/react-router";
import {
  NotificationBell,
  ModeToggle,
  SharpnrLauncher,
  UserCard,
} from "@sharpnr/ui";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarRail,
  SharpnrSidebarFooter,
  AppShell,
  ScrollBar,
  ScrollArea,
  useSidebar,
} from "@sharpnr/ui";
import {
  ArrowLeftRight,
  Building2,
  ClipboardCheck,
  Coins,
  Factory,
  Layers,
  LayoutDashboard,
  Package,
  PackageCheck,
  PieChart,
  Plug,
  Receipt,
  RotateCcw,
  Settings,
  ShoppingCart,
  SlidersHorizontal,
  Tags,
  TriangleAlert,
  Truck,
  Warehouse,
} from "lucide-react";

import { useAppUserStore, selectIsLoadingUser } from "@/store/AppUserStore";
import { useLogout } from "@/api/mutation";
import { config } from "@sharpnr/env";

/* ───────────────── Types ───────────────── */

type StockwaveNavItem = {
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

type StockwaveNavGroup = {
  group: string;
  items: StockwaveNavItem[];
};

/* ───────────────── Nav Config ───────────────── */

const stockwaveSidebar: StockwaveNavGroup[] = [
  {
    group: "Overview",
    items: [
      {
        id: "sw_dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
        to: "/dashboard",
        exact: true,
      },
      {
        id: "sw_alerts",
        label: "Alerts",
        icon: TriangleAlert,
        to: "/alerts",
      },
      {
        id: "sw_reports",
        label: "Reports",
        icon: PieChart,
        to: "/reports",
      },
      {
        id: "sw_valuation",
        label: "Valuation",
        icon: Coins,
        to: "/valuation",
      },
    ],
  },

  {
    group: "Inventory",
    items: [
      {
        id: "sw_products",
        label: "Products",
        icon: Package,
        to: "/products",
      },
      {
        id: "sw_categories",
        label: "Categories",
        icon: Tags,
        to: "/categories",
      },
      {
        id: "sw_stock",
        label: "Stock Levels",
        icon: Layers,
        to: "/stock",
      },
      {
        id: "sw_adjustments",
        label: "Adjustments",
        icon: SlidersHorizontal,
        to: "/adjustments",
      },
    ],
  },

  {
    group: "Warehouses",
    items: [
      {
        id: "sw_warehouses",
        label: "Warehouses",
        icon: Warehouse,
        to: "/warehouses",
      },
      {
        id: "sw_transfers",
        label: "Transfers",
        icon: ArrowLeftRight,
        to: "/transfers",
      },
      {
        id: "sw_stock_takes",
        label: "Stock Takes",
        icon: ClipboardCheck,
        to: "/stock-takes",
      },
    ],
  },

  {
    group: "Purchasing",
    items: [
      {
        id: "sw_purchase_orders",
        label: "Purchase Orders",
        icon: ShoppingCart,
        to: "/purchase-orders",
      },
      {
        id: "sw_suppliers",
        label: "Suppliers",
        icon: Factory,
        to: "/suppliers",
      },
      {
        id: "sw_receiving",
        label: "Receiving",
        icon: PackageCheck,
        to: "/receiving",
      },
    ],
  },

  {
    group: "Fulfilment",
    items: [
      {
        id: "sw_sales_orders",
        label: "Sales Orders",
        icon: Receipt,
        to: "/sales-orders",
      },
      {
        id: "sw_shipments",
        label: "Shipments",
        icon: Truck,
        to: "/shipments",
      },
      {
        id: "sw_returns",
        label: "Returns",
        icon: RotateCcw,
        to: "/returns",
      },
    ],
  },

  {
    group: "System",
    items: [
      {
        id: "sw_integrations",
        label: "Integrations",
        icon: Plug,
        to: "/integrations",
      },
      {
        id: "sw_settings",
        label: "Settings",
        icon: Settings,
        to: "/settings",
        exact: true,
      },
    ],
  },
];

/* ───────────────── Nav Item ───────────────── */

const NavMenuItem: React.FC<{ item: StockwaveNavItem }> = ({ item }) => {
  const { location } = useRouterState();
  const Icon = item.icon;

  const isActive = item.exact
    ? location.pathname === item.to
    : location.pathname.startsWith(item.to);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        size="sm"
        asChild
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
};

/* ───────────────── Sidebar ───────────────── */

/**
 * Its own component rather than JSX inlined into <AppShell sidebar={…}>:
 * `useSidebar` only works below the provider that AppShell renders, so the
 * header needs to be a child of it to know whether the rail is collapsed.
 */
const StockwaveSidebar: React.FC = () => {
  const { location } = useRouterState();
  const { state } = useSidebar();
  const { user } = useAppUserStore();
  const navigate = useNavigate();

  const isCollapsed = state === "collapsed";
  const isDashboardActive = location.pathname === "/dashboard";

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              variant="outline"
              isActive={isDashboardActive}
              tooltip={user?.org_data.org_name}
              className="cursor-pointer"
              onClick={() => navigate({ to: "/dashboard" })}
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
            {stockwaveSidebar.map((group) => (
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
      <SharpnrSidebarFooter appName="Stockwave" />
    </Sidebar>
  );
};

/* ───────────────── Root Layout ───────────────── */

const RootLayout: React.FC = () => {
  const { user } = useAppUserStore();
  const isLoadingUser = useAppUserStore(selectIsLoadingUser);
  const { mutate: logoutUser, isPending: isLoggingOut } = useLogout();

  return (
    <AppShell
      sidebar={<StockwaveSidebar />}
      headerActions={
        <>
          <SharpnrLauncher currentApp="stockwave" />
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

export default RootLayout;
