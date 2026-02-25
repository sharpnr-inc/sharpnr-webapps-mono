import { useState } from "react";
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
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Wallet,
  BarChart3,
  Settings,
  Building2,
  ChevronsUpDown,
  Check,
  DollarSignIcon,
  BadgeDollarSignIcon,
} from "lucide-react";

/* ================================
   Sidebar Config (shadcn compatible)
================================ */
const accountingSidebar = [
  {
    group: "Overview",
    items: [
      {
        label: "Dashboard",
        icon: BarChart3,
        to: "/dashboard/sharp_accounting/overview",
      },
    ],
  },
  {
    group: "Master Data",
    items: [
      {
        label: "Chart of Accounts",
        icon: Wallet,
        to: "/dashboard/sharp_accounting/chart-of-account",
      },
      {
        label: "Tax",
        icon: BadgeDollarSignIcon,
        children: [
          {
            label: "Tax Codes",
            to: "/dashboard/sharp_accounting/tax-codes",
          },
          {
            label: "Tax Rates",
            to: "/dashboard/sharp_accounting/tax-rates",
          },
        ],
      },
    ],
  },
  {
    group: "Operations",
    items: [
      {
        label: "Transactions",
        icon: DollarSignIcon,
        to: "/dashboard/sharp_accounting/transactions",
      },
      {
        label: "Expenses",
        icon: Wallet,
        to: "/dashboard/sharp_accounting/expenses",
      },
      {
        label: "Ledger",
        icon: Wallet,
        to: "/dashboard/sharp_accounting/ledger",
      },
    ],
  },
  {
    group: "Reports",
    items: [
      {
        label: "Reports",
        icon: BarChart3,
        children: [
          {
            label: "Trial Balance",
            to: "/dashboard/sharp_accounting/reports/trial-balance",
          },
          {
            label: "Profit & Loss",
            to: "/dashboard/sharp_accounting/reports/pnl",
          },
          {
            label: "Balance Sheet",
            to: "/dashboard/sharp_accounting/reports/balance-sheet",
          },
        ],
      },
    ],
  },
  {
    group: "Controls",
    items: [
      {
        label: "Settings",
        icon: Settings,
        to: "/dashboard/sharp_accounting/settings",
      },
    ],
  },
];

/* ================================
   Dummy Legal Entities
================================ */
const LEGAL_ENTITIES = [
  "Sharp Hospitality Pvt Ltd",
  "Sharp Foods LLP",
];

/* ================================
   Layout
================================ */
const AccountingRootLayout = () => {
  const [selectedEntity, setSelectedEntity] = useState(LEGAL_ENTITIES[0]);

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarContent>
          {/* ========= Legal Entity Switcher ========= */}
          <div className="p-1 m-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg">
                  <div className="bg-sidebar-primary text-sidebar-primary-foreground flex size-8 items-center justify-center rounded-lg">
                    <Building2 className="size-4" />
                  </div>
                  <div className="flex flex-col leading-none">
                    <span className="font-medium truncate">
                      {selectedEntity}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Legal Entity
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4 opacity-60" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="start" className="min-w-[240px]">
                {LEGAL_ENTITIES.map((entity) => (
                  <DropdownMenuItem
                    key={entity}
                    onSelect={() => setSelectedEntity(entity)}
                  >
                    {entity}
                    {entity === selectedEntity && (
                      <Check className="ml-auto size-4" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* ========= Sidebar ========= */}
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
