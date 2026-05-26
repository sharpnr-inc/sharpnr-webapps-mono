import {
  BoxesIcon,
  BriefcaseBusiness,
  Building2Icon,
  Cable,
  ContainerIcon,
  DollarSign,
  Globe,
  Globe2Icon,
  Home,
  LucideShoppingBasket,
  MarsStroke,
  MirrorRound,
  Users,
  Verified,
} from "lucide-react";

export type SidebarLink = {
  label: string;
  path?: string;
  icon: React.ElementType;
  tooltip?: string;
  exact?: boolean;
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
        path: "/suppliers&Vendors",
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
        label: "Payments",
        path: "/payments",
        icon: DollarSign,
        tooltip: "Payments",
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
        label: "Storage",
        path: "/storage",
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
        path: "/cables",
        icon: MirrorRound,
        tooltip: "Cables",
      },

      {
        label: "Folio",
        path: "/cables",
        icon: Cable,
        tooltip: "Cables",
      },

      {
        label: "Sharp-Marketing",
        path: "/cables",
        icon: MarsStroke,
        tooltip: "Cables",
      },
      {
        label: "Sharp-Accounting",
        path: "/cables",
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
