import {
  Users,
  ReceiptText,
  Brain,
  ShoppingBag,
  BookOpenText,
  Cable,
  Megaphone,
  Layers,
  Hotel,
} from "lucide-react";

export type LauncherItem = {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  to: string;
  accent: string; // tailwind bg color for the icon glow/dot
};

export type LauncherSection = {
  id: string;
  title: string;
  items: LauncherItem[];
};

export const LAUNCHER_SECTIONS: LauncherSection[] = [
  {
    id: "business_operations",
    title: "Business Operations",
    items: [
      {
        id: "hosp",
        label: "Hospitality",
        description: "Property & guest management",
        icon: Hotel,
        to: "#",
        accent: "#f59e0b",
      },
    ],
  },
  {
    id: "sharpnr_services",
    title: "Sharpnr Services",
    items: [
      {
        id: "hr",
        label: "Sharp HR",
        description: "People & payroll",
        icon: Users,
        to: "#",
        accent: "#6366f1",
      },
      {
        id: "acc",
        label: "Accounting",
        description: "Finance & ledger",
        icon: ReceiptText,
        to: "#",
        accent: "#10b981",
      },
      {
        id: "cortex",
        label: "Cortex",
        description: "IT management",
        icon: Brain,
        to: "#",
        accent: "#8b5cf6",
      },
      {
        id: "marketplace",
        label: "Marketplace",
        description: "Buy, sell & trade",
        icon: ShoppingBag,
        to: "#",
        accent: "#f43f5e",
      },
      {
        id: "folio",
        label: "Folio",
        description: "Docs & knowledge base",
        icon: BookOpenText,
        to: "#",
        accent: "#0ea5e9",
      },
      {
        id: "cables",
        label: "Cables",
        description: "Integrations & pipelines",
        icon: Cable,
        to: "#",
        accent: "#84cc16",
      },
      {
        id: "mkt",
        label: "Marketing",
        description: "Campaigns & analytics",
        icon: Megaphone,
        to: "#",
        accent: "#fb923c",
      },
      {
        id: "silo",
        label: "Silo",
        description: "Data warehouse & storage",
        icon: Layers,
        to: "#",
        accent: "#22d3ee",
      },
    ],
  },
];
