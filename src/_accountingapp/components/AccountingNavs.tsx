import {
  BadgeDollarSignIcon,
  BarChart3,
  DollarSignIcon,
  Settings,
  Wallet,
} from "lucide-react";

export const accountingSidebar = [
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
            label: "Tax Registration",
            to: "/dashboard/sharp_accounting/taxations/tax_registration",
          },
          {
            label: "Tax Codes",
            to: "/dashboard/sharp_accounting/taxations/tax_codes",
          },
          {
            label: "Tax Rates",
            to: "/dashboard/sharp_accounting/taxations/tax_rates",
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
