import {
  BarChart3,
  BoxesIcon,
  BriefcaseBusiness,
  Building2Icon,
  Cable,
  CalendarCheck,
  ContainerIcon,
  DollarSign,
  Globe,
  Globe2Icon,
  Home,
  LucideShoppingBasket,
  MirrorRound,
  TrendingUp,
} from "lucide-react";
import { GrOverview } from "react-icons/gr";
import {
  MdAdminPanelSettings,
  MdDevices,
  MdGroups2,
  MdOutlineAccountBalanceWallet,
  MdOutlineAppShortcut,
  MdPolicy,
} from "react-icons/md";
import { TbTransactionRupee } from "react-icons/tb";
import { FcBusinesswoman, FcDepartment } from "react-icons/fc";
import { AiOutlineAudit } from "react-icons/ai";
import { RiCustomerService2Line, RiOrganizationChart } from "react-icons/ri";
import { BiPaste } from "react-icons/bi";
import { FaCashRegister } from "react-icons/fa";
import { FaArrowsToEye } from "react-icons/fa6";

export type SidebarLink = {
  label: string;
  path?: string;
  icon: React.ElementType;
  tooltip?: string;
  exact?: boolean;
  /** Optional small badge rendered as a superscript next to the label
   *  (e.g. "new"). */
  badge?: string;
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

      {
        label: "Cost Centers",
        icon: BiPaste,
        tooltip: "Cost Centers",
        path: "/cost_center/overview",
      },

      {
        label: "Deparments",
        path: "/deparments",
        icon: FcDepartment,
        tooltip: "Organization's Deparments",
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
            label: "Business Intelligence",
            path: "/reports/occupancy",
            icon: CalendarCheck,
            tooltip: "Occupancy",
          },
        ],
      },
    ],
  },

  {
    groupLabel: "Authorization policies",
    links: [
      {
        label: "Org Policies",
        path: "/authorization/policies",
        icon: MdPolicy,
        tooltip: "Policies",
        exact: false,
      },
      {
        label: "Roles",
        path: "/authorization/roles",
        icon: MdAdminPanelSettings,
        tooltip: "Roles",
        exact: false,
      },
      {
        label: "User Groups",
        path: "/authorization/user_groups",
        icon: MdGroups2,
        tooltip: "User Groups",
        exact: false,
      },
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
        label: "SharpCRM",
        path: "/sharp-crm",
        icon: RiCustomerService2Line,
        tooltip: "SharpCRM",
      },
      {
        label: "Sharp-Accounting",
        path: "/sharp-accounting",
        icon: FaCashRegister,
        tooltip: "Cables",
      },
      {
        label: "SharpHR",
        path: "/sharp-hr",
        icon: FaArrowsToEye,
        tooltip: "Cables",
      },
      {
        label: "Stockwave",
        path: "/sharpnr-services/stockwave",
        icon: LucideShoppingBasket,
        tooltip: "Stockwave",
      },
    ],
  },
  {
    groupLabel: "Apps & Devices",
    links: [
      {
        label: "Mobile Apps",
        path: "/descovro_integrations",
        icon: MdOutlineAppShortcut,
        tooltip: "Mobile Apps",
      },
      {
        label: "Devices",
        path: "/sharp_marketplace",
        icon: MdDevices,
        tooltip: "Devices",
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
