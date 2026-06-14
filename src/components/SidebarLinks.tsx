import {
  BoxesIcon,
  BriefcaseBusiness,
  Building2Icon,
  Cable,
  ContainerIcon,
  Globe,
  Globe2Icon,
  Home,
  LucideShoppingBasket,
  MarsStroke,
  MirrorRound,
} from "lucide-react";
import { GrOverview } from "react-icons/gr";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { TbTransactionRupee } from "react-icons/tb";
import { FcBusinesswoman } from "react-icons/fc";
import { AiOutlineAudit } from "react-icons/ai";
import { RiOrganizationChart } from "react-icons/ri";

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
        label: "Employee Directory",
        path: "/org-users",
        icon: RiOrganizationChart,
        tooltip: "User Directory",
      },
      {
        label: "Audit Logs",
        path: "/audit-log",
        icon: AiOutlineAudit,
        tooltip: "Audit Logs",
      },
      {
        label: "Suppliers & Vendors",
        path: "/suppliers&Vendors",
        icon: ContainerIcon,
        tooltip: "Suppliers & Vendors",
      },

      {
        label: "Customers & Clients",
        path: "/customers",
        icon: FcBusinesswoman,
        tooltip: "Customers & Clients",
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
      // {
      //   label: "Reports",
      //   icon: BarChart3,
      //   tooltip: "Reports",
      //   children: [
      //     {
      //       label: "Overview",
      //       path: "/reports/overview",
      //       icon: TrendingUp,
      //       tooltip: "Reports Overview",
      //     },
      //     {
      //       label: "Revenue",
      //       path: "/reports/revenue",
      //       icon: DollarSign,
      //       tooltip: "Revenue",
      //     },
      //     {
      //       label: "Occupancy",
      //       path: "/reports/occupancy",
      //       icon: CalendarCheck,
      //       tooltip: "Occupancy",
      //     },
      //   ],
      // },
    ],
  },

  {
    groupLabel: "Payments",
    links: [
      {
        label: "Overview",
        path: "/payments/overview",
        icon: GrOverview,
        tooltip: "Payments",
        exact: false,
      },
      {
        label: "Accounts",
        path: "/payments",
        icon: MdOutlineAccountBalanceWallet,
        tooltip: "Payments",
        exact: false,
      },
      {
        label: "Transactions",
        path: "/payments/transactions",
        icon: TbTransactionRupee,
        tooltip: "Payments",
        exact: false,
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
