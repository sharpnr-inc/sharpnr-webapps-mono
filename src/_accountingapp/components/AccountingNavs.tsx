import {
  BadgeDollarSignIcon,
  BadgePercentIcon,
  BarChart3,
  BookOpen,
  Receipt,
  Settings,
  ShoppingBag,
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
        label: "Journal",
        icon: BookOpen,
        to: "/dashboard/sharp_accounting/journal",
      },
      {
        label: "Sales",
        icon: ShoppingBag,
        children: [
          { label: "Sales History", to: "/dashboard/sharp_accounting/sales" },
          { label: "Record Sale", to: "/dashboard/sharp_accounting/sales/new" },
        ],
      },
      {
        label: "Expenses",
        icon: Receipt,
        children: [
          {
            label: "Record Expense",
            to: "/dashboard/sharp_accounting/expenses/new",
          },
          {
            label: "Expense History",
            to: "/dashboard/sharp_accounting/expenses",
          },
        ],
      },

      {
        label: "Purchases & Vendors",
        icon: BadgePercentIcon,
        to: "/dashboard/sharp_accounting/purchases",
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
            to: "/dashboard/sharp_accounting/reports/profit-loss",
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
    group: "Payments&Invoice",
    items: [
      {
        label: "Payments",
        icon: BarChart3,
        children: [
          {
            label: "Payment Orders",
            to: "/dashboard/sharp_accounting/payments/payment_orders",
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
