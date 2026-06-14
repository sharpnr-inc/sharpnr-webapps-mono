import {
  BarChart3,
  BoxesIcon,
  BriefcaseBusiness,
  Building2Icon,
  CalendarCheck,
  Cable,
  ContainerIcon,
  CreditCard,
  DollarSign,
  FileText,
  Globe,
  Globe2Icon,
  Home,
  LucideShoppingBasket,
  MarsStroke,
  MirrorRound,
  Receipt,
  TrendingUp,
  Users,
  Verified,
} from "lucide-react";

export type SidebarLink = {
  label: string;
  path?: string;
  icon: React.ElementType;
  tooltip?: string;
  exact?: boolean;
  /** Optional nested links. When present and non-empty, the item renders
   *  as a collapsible group instead of a plain link. */
  children?: SidebarLink[];
};

export type SidebarGroup = {
  groupLabel: string;
  links: SidebarLink[];
};

export const orchestratorGroups: SidebarGroup[] = [
  {
    groupLabel: "Organization",
    links: [
      {
        label: "Organization",
        path: "/organization",
        icon: Home,
        tooltip: "Organization",
        exact: true,
      },
      {
        label: "User Directory",
        path: "/org-users",
        icon: Users,
        tooltip: "User Directory",
      },
      {
        label: "Audit Logs",
        path: "/audit-log",
        icon: Verified,
        tooltip: "Audit Logs",
      },
      {
        label: "Suppliers & Vendors",
        path: "/suppliers&Vendors",
        icon: ContainerIcon,
        tooltip: "Suppliers & Vendors",
      },

      {
        label: "Customers",
        path: "/customers",
        icon: ContainerIcon,
        tooltip: "Suppliers & Vendors",
      },
    ],
  },
  {
    groupLabel: "Business Operations",
    links: [
      {
        label: "Properties",
        path: "/property",
        icon: Building2Icon,
        tooltip: "Properties",
        exact: false,
      },
      {
        label: "Reports",
        icon: BarChart3,
        tooltip: "Reports",
        children: [
          {
            label: "Overview",
            path: "/reports/overview",
            icon: TrendingUp,
            tooltip: "Reports Overview",
          },
          {
            label: "Revenue",
            path: "/reports/revenue",
            icon: DollarSign,
            tooltip: "Revenue",
          },
          {
            label: "Occupancy",
            path: "/reports/occupancy",
            icon: CalendarCheck,
            tooltip: "Occupancy",
          },
        ],
      },
    ],
  },

  {
    groupLabel: "Payments",
    links: [
      {
        label: "Payments",
        path: "/payments",
        icon: DollarSign,
        tooltip: "Payments",
        children: [
          {
            label: "Transactions",
            path: "/payments/transactions",
            icon: CreditCard,
            tooltip: "Transactions",
          },
          {
            label: "Invoices",
            path: "/payments/invoices",
            icon: FileText,
            tooltip: "Invoices",
          },
          {
            label: "Payouts",
            path: "/payments/payouts",
            icon: Receipt,
            tooltip: "Payouts",
          },
        ],
      },
    ],
  },

  {
    groupLabel: "Legal Entity",
    links: [
      {
        label: "Legal Entity",
        path: "/legal_entity",
        icon: BriefcaseBusiness,
        tooltip: "Legal Entity",
        exact: false,
      },
    ],
  },
  {
    groupLabel: "Sharpnr Services",
    links: [
      {
        label: "Silo",
        path: "/silo",
        icon: BoxesIcon,
        tooltip: "Storage",
      },
      {
        label: "Cables",
        path: "/cables",
        icon: Cable,
        tooltip: "Cables",
      },

      {
        label: "Cortex",
        path: "/cortex",
        icon: MirrorRound,
        tooltip: "Cables",
      },

      {
        label: "Folio",
        path: "/folio",
        icon: Cable,
        tooltip: "Cables",
      },

      {
        label: "Sharp-Marketing",
        path: "/sharp-crm",
        icon: MarsStroke,
        tooltip: "Cables",
      },
      {
        label: "Sharp-Accounting",
        path: "/sharp-accounting",
        icon: MarsStroke,
        tooltip: "Cables",
      },
      {
        label: "Inventories",
        path: "/inventory-acc",
        icon: LucideShoppingBasket,
        tooltip: "Inventories",
      },
    ],
  },
  {
    groupLabel: "External Integrations",
    links: [
      {
        label: "Descovro Integration",
        path: "/descovro_integrations",
        icon: Globe2Icon,
        tooltip: "Descovro Integration",
      },
      {
        label: "Sharp Marketplace",
        path: "/sharp_marketplace",
        icon: Globe,
        tooltip: "Sharp Marketplace",
      },
    ],
  },
];
