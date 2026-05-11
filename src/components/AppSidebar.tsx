/*
this is the Root layout Sidebar links
SidebarLinks.tsx
*/

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
  Origami,
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

export const orchestratorLinks: SidebarLink[] = [
  { label: "Home", path: "/home", icon: Origami, tooltip: "Home", exact: true },
  {
    label: "Organization",
    path: "/organization",
    icon: Home,
    tooltip: "Organization",
    exact: true,
  },
  {
    label: "Properties",
    path: "/property",
    icon: Building2Icon,
    tooltip: "Properties",
    exact: false,
  },
  {
    label: "Legal Entity",
    path: "/legal_entity",
    icon: BriefcaseBusiness,
    tooltip: "Legal Entity",
    exact: false,
  },
  {
    label: "Payments",
    path: "/payments",
    icon: DollarSign,
    tooltip: "Payments",
  },
  {
    label: "Inventories",
    path: "/inventory-acc",
    icon: LucideShoppingBasket,
    tooltip: "Inventories",
  },
  {
    label: "Suppliers & Vendors",
    path: "/suppliers&Vendors",
    icon: ContainerIcon,
    tooltip: "Suppliers & Vendors",
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
  { label: "Storage", path: "/storage", icon: BoxesIcon, tooltip: "Storage" },
  { label: "Cables", path: "/cables", icon: Cable, tooltip: "Cables" },
  // {
  //   label: "Docs & Office",
  //   path: "/docs_office",
  //   icon: FileText,
  //   tooltip: "Docs & Office",
  // },
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
];
