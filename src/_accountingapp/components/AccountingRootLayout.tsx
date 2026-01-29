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
  Wallet,
  BarChart3,
  Settings,
} from "lucide-react"

/* ================================
   Sidebar Config (ARRAY-DRIVEN)
================================ */
const accountingSidebarItems = [
  {
    id: "acc_overview",
    label: "Overview",
    icon: Wallet,
    to: "/dashboard/sharp_accounting",
  },
  {
    id: "acc_acc_setup",
    label: "Accounting Setup",
    icon: Wallet,
    to: "/dashboard/sharp_accounting/accounting-setup",
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
   Layout
================================ */
const AccountingRootLayout: React.FC = () => {
  return (
    <SidebarProvider>
      {/* ================= Sidebar ================= */}
      <Sidebar collapsible="icon">
        <SidebarContent>
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

      {/* ================= Main Content ================= */}
      <SidebarInset>
        <header className="flex h-14 items-center gap-2 px-4">
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
