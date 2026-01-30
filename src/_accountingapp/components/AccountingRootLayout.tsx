import { useState } from "react"
import { Outlet, Link } from "@tanstack/react-router"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Wallet,
  BarChart3,
  Settings,
  Building2,
  ChevronsUpDown,
  Check,
} from "lucide-react"

/* ================================
   Sidebar Menu (ARRAY)
================================ */
const accountingSidebarItems = [
  {
    id: "acc_overview",
    label: "Overview",
    icon: Wallet,
    to: "/dashboard/sharp_accounting/overview",
  },
  {
    id: "acc_acc_setup",
    label: "Chart Of Account",
    icon: Wallet,
    to: "/dashboard/sharp_accounting/chart-of-account",
  },
  {
    id: "acc_transactions",
    label: "Transactions",
    icon: Wallet,
    to: "/dashboard/sharp_accounting/transactions",
  },
  {
    id: "acc_ledger",
    label: "Ledger",
    icon: Wallet,
    to: "/dashboard/sharp_accounting/ledger",
  },
  {
    id: "acc_reports",
    label: "Reports",
    icon: BarChart3,
    to: "/dashboard/sharp_accounting/reports",
  },
  {
    id: "acc_settings",
    label: "Settings",
    icon: Settings,
    to: "/dashboard/sharp_accounting/settings",
  },
]

/* ================================
   Dummy Legal Entities
================================ */
const LEGAL_ENTITIES = [
  "Sharp Hospitality Pvt Ltd",
  "Sharp Foods LLP",
]

/* ================================
   Layout
================================ */
const AccountingRootLayout: React.FC = () => {
  const [selectedEntity, setSelectedEntity] = useState(
    LEGAL_ENTITIES[0]
  )

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarContent>
          {/* 🔁 Legal Entity Switcher */}
          <div className="p-2 border m-1 rounded-xl">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <Building2 className="size-4" />
                  </div>

                  <div className="flex flex-col gap-0.5 leading-none">
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

              <DropdownMenuContent
                align="start"
                className="min-w-[240px]"
              >
                {LEGAL_ENTITIES.map((entity) => (
                  <DropdownMenuItem
                    key={entity}
                    onSelect={() =>
                      setSelectedEntity(entity)
                    }
                    className="flex items-center"
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

          {/* ================= Menu ================= */}
          <SidebarGroup>
            <SidebarGroupLabel>
              Accounting
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {accountingSidebarItems.map((item) => {
                  const Icon = item.icon

                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton asChild>
                        <Link to={item.to}>
                          <Icon />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      {/* ================= Main ================= */}
      <SidebarInset>
        <header className="flex h-14 items-center gap-2 px-4 ">
          <SidebarTrigger />
          <span className="font-medium">
            Accounting
          </span>
        </header>

        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default AccountingRootLayout
