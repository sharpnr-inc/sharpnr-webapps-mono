import {
  Users,
  ReceiptText,
  Brain,
  ShoppingBag,
  BookOpenText,
  Cable,
  Megaphone,
  Layers,
} from "lucide-react";

export type EcosystemProduct = {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
};

/** The wider Sharpnr platform that SharpIAM plugs into. */
export const ECOSYSTEM_PRODUCTS: EcosystemProduct[] = [
  {
    id: "hr",
    label: "Sharp HR",
    description: "People & payroll",
    icon: Users,
  },
  {
    id: "acc",
    label: "Accounting",
    description: "Finance & ledger",
    icon: ReceiptText,
  },
  {
    id: "cortex",
    label: "Cortex",
    description: "IT management",
    icon: Brain,
  },
  {
    id: "marketplace",
    label: "Marketplace",
    description: "Buy, sell & trade",
    icon: ShoppingBag,
  },
  {
    id: "folio",
    label: "Folio",
    description: "Docs & knowledge base",
    icon: BookOpenText,
  },
  {
    id: "cables",
    label: "Cables",
    description: "Integrations & pipelines",
    icon: Cable,
  },
  {
    id: "marketing",
    label: "Marketing",
    description: "Campaigns & analytics",
    icon: Megaphone,
  },
  {
    id: "silo",
    label: "Silo",
    description: "Data warehouse & storage",
    icon: Layers,
  },
];
