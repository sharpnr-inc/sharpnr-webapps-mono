import {
  AreaChart,
  Archive,
  ArrowLeftRight,
  BadgeDollarSign,
  BarChart3,
  BookOpen,
  Building2,
  Calculator,
  ClipboardList,
  CreditCard,
  FileCheck2,
  FileClock,
  FileSpreadsheet,
  FileText,
  FolderKanban,
  Globe,
  Landmark,
  LayoutDashboard,
  Layers,
  Lock,
  Package,
  Receipt,
  Scale,
  Settings,
  ShoppingCart,
  Tags,
  Trash2,
  TrendingDown,
  TrendingUp,
  Truck,
  Users,
  Wallet,
} from "lucide-react";

export type AccountingNavItem = {
  label: string;
  icon: React.ElementType;
  to: string;
  exact?: boolean;
};

export type AccountingNavGroup = {
  group: string;
  items: AccountingNavItem[];
};

export const accountingSidebar: AccountingNavGroup[] = [
  // -------------------------------------------------------
  // OVERVIEW
  // -------------------------------------------------------
  {
    group: "Overview",
    items: [
      {
        label: "Dashboard",
        icon: LayoutDashboard,
        to: "/overview",
        exact: true,
      },
      { label: "Activity Feed", icon: FileClock, to: "/activity" },
    ],
  },

  // -------------------------------------------------------
  // BOOKS & LEDGER
  // -------------------------------------------------------
  {
    group: "Books & Ledger",
    items: [
      { label: "Chart of Accounts", icon: Wallet, to: "/chart-of-account" },
      { label: "Journal Entries", icon: BookOpen, to: "/journal" },
      { label: "General Ledger", icon: FileSpreadsheet, to: "/placeholder" },
      { label: "Trial Balance", icon: Scale, to: "/reports/trial-balance" },
    ],
  },

  // -------------------------------------------------------
  // TAX & COMPLIANCE
  // -------------------------------------------------------
  {
    group: "Tax & Compliance",
    items: [
      {
        label: "Tax Registration",
        icon: Landmark,
        to: "/taxations/tax_registration",
      },
      { label: "Tax Codes", icon: Tags, to: "/taxations/tax_codes" },
      { label: "Tax Rates", icon: BadgeDollarSign, to: "/placeholder" },
      { label: "Tax Returns", icon: FileCheck2, to: "/placeholder" },
      { label: "GST Returns", icon: FileCheck2, to: "/placeholder" },
      { label: "TDS / TCS", icon: Landmark, to: "/placeholder" },
      { label: "E-Invoicing", icon: FileText, to: "/placeholder" },
      { label: "Period Close", icon: Lock, to: "/placeholder" },
    ],
  },

  // -------------------------------------------------------
  // SALES & REVENUE
  // -------------------------------------------------------
  {
    group: "Sales & Revenue",
    items: [
      { label: "Sales Orders", icon: ShoppingCart, to: "/sales" },
      { label: "Invoices", icon: FileText, to: "/invoices" },
      { label: "Customers", icon: Users, to: "/customers" },
      { label: "Credit Notes", icon: FileText, to: "/placeholder" },
      { label: "Customer Statements", icon: FileClock, to: "/placeholder" },
      { label: "Revenue", icon: TrendingUp, to: "/revenue" },
    ],
  },

  // -------------------------------------------------------
  // PURCHASE & EXPENSE
  // -------------------------------------------------------
  {
    group: "Purchase & Expense",
    items: [
      { label: "Purchase Orders", icon: ClipboardList, to: "/purchases" },
      { label: "Bills", icon: Receipt, to: "/bills" },
      { label: "Expenses", icon: CreditCard, to: "/expenses" },
      { label: "Debit Notes", icon: FileText, to: "/placeholder" },
      { label: "Vendor Statements", icon: FileClock, to: "/placeholder" },
      { label: "Withholding Tax", icon: BadgeDollarSign, to: "/placeholder" },
      { label: "Suppliers & Vendors", icon: Truck, to: "/suppliers" },
    ],
  },

  // -------------------------------------------------------
  // INVENTORY
  // -------------------------------------------------------
  {
    group: "Inventory",
    items: [
      { label: "Products & Items", icon: Package, to: "/inventory/items" },
      { label: "Stock Valuation", icon: AreaChart, to: "/placeholder" },
    ],
  },

  // -------------------------------------------------------
  // FIXED ASSETS
  // -------------------------------------------------------
  {
    group: "Fixed Assets",
    items: [
      { label: "Asset Register", icon: Archive, to: "/placeholder" },
      { label: "Depreciation", icon: TrendingDown, to: "/placeholder" },
      { label: "Asset Disposal", icon: Trash2, to: "/placeholder" },
    ],
  },

  // -------------------------------------------------------
  // COST ACCOUNTING
  // -------------------------------------------------------
  {
    group: "Cost Accounting",
    items: [
      { label: "Cost Centers", icon: Layers, to: "/placeholder" },
      { label: "Profit Centers", icon: TrendingUp, to: "/placeholder" },
      { label: "Project Costing", icon: FolderKanban, to: "/placeholder" },
    ],
  },

  // -------------------------------------------------------
  // PAYMENTS
  // -------------------------------------------------------
  {
    group: "Payments",
    items: [
      {
        label: "Payment Orders",
        icon: ArrowLeftRight,
        to: "/payments/payment_orders",
      },
      {
        label: "Payment Vouchers",
        icon: FileCheck2,
        to: "/payments/payment_vouchers",
      },
      { label: "Bank Reconciliation", icon: Building2, to: "/placeholder" },
      { label: "Foreign Currency", icon: Globe, to: "/placeholder" },
    ],
  },

  // -------------------------------------------------------
  // BUDGETING
  // -------------------------------------------------------
  {
    group: "Budgeting",
    items: [
      { label: "Budgets", icon: Calculator, to: "/placeholder" },
      { label: "Budget vs Actual", icon: BarChart3, to: "/placeholder" },
      { label: "Forecasting", icon: AreaChart, to: "/placeholder" },
    ],
  },

  // -------------------------------------------------------
  // REPORTS
  // -------------------------------------------------------
  {
    group: "Reports",
    items: [
      { label: "Profit & Loss", icon: TrendingUp, to: "/reports/profit-loss" },
      { label: "Balance Sheet", icon: BarChart3, to: "/reports/balance-sheet" },
      { label: "Cash Flow", icon: ArrowLeftRight, to: "/placeholder" },
      { label: "Aged Receivables", icon: FileClock, to: "/placeholder" },
      { label: "Aged Payables", icon: FileClock, to: "/placeholder" },
    ],
  },

  // -------------------------------------------------------
  // CONTROLS
  // -------------------------------------------------------
  {
    group: "Controls",
    items: [
      { label: "Fiscal Periods", icon: Calculator, to: "/placeholder" },
      { label: "Currencies", icon: Globe, to: "/placeholder" },
      { label: "Settings", icon: Settings, to: "/settings", exact: true },
    ],
  },
];
