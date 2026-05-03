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
        to: "/overview",
      },
    ],
  },
  {
    group: "Master Data",
    items: [
      {
        label: "Chart of Accounts",
        icon: Wallet,
        to: "/chart-of-account",
      },
      {
        label: "Tax",
        icon: BadgeDollarSignIcon,
        children: [
          {
            label: "Tax Registration",
            to: "/taxations/tax_registration",
          },
          {
            label: "Tax Codes",
            to: "/taxations/tax_codes",
          },
          {
            label: "Tax Rates",
            to: "/taxations/tax_rates",
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
        to: "/journal",
      },
      {
        label: "Sales",
        icon: ShoppingBag,
        children: [
          { label: "Sales History", to: "/sales" },
          { label: "Record Sale", to: "/sales/new" },
        ],
      },
      {
        label: "Expenses",
        icon: Receipt,
        children: [
          {
            label: "Record Expense",
            to: "/expenses/new",
          },
          {
            label: "Expense History",
            to: "/expenses",
          },
        ],
      },

      {
        label: "Purchases & Vendors",
        icon: BadgePercentIcon,
        children: [
          {
            label: "Suppliers & Vendors",
            to: "/suppliers",
          },
          {
            label: "Purchases",
            to: "/purchases",
          },
          {
            label: "Purchase History",
            to: "/purchases/history",
          },
        ],
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
            to: "/reports/trial-balance",
          },
          {
            label: "Profit & Loss",
            to: "/reports/profit-loss",
          },
          {
            label: "Balance Sheet",
            to: "/reports/balance-sheet",
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
            to: "/payments/payment_orders",
          },

          {
            label: "Payment Vouchers",
            to: "/",
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
        to: "/settings",
      },
    ],
  },
];
