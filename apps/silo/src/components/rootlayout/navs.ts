import type { LinkProps } from "@tanstack/react-router";
import {
  Activity,
  Archive,
  Boxes,
  Database,
  FolderOpen,
  Gauge,
  Globe,
  KeyRound,
  Layers,
  LayoutDashboard,
  ScrollText,
  Settings,
  ShieldCheck,
  Table2,
  Warehouse,
  Waves,
  Workflow,
} from "lucide-react";

export type SiloNavItem = {
  id: string;
  label: string;
  icon: React.ElementType;
  /**
   * Typed against the generated route tree rather than `string`, so a nav
   * entry pointing at a route that does not exist fails the build instead of
   * shipping a link that silently 404s.
   */
  to: NonNullable<LinkProps["to"]>;
  exact?: boolean;
};

export type SiloNavGroup = {
  group: string;
  items: SiloNavItem[];
};

export const siloSidebar: SiloNavGroup[] = [
  {
    group: "Overview",
    items: [
      {
        id: "silo_dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
        to: "/dashboard",
        exact: true,
      },
      {
        id: "silo_activity",
        label: "Activity",
        icon: Activity,
        to: "/activity",
      },
    ],
  },

  {
    group: "Storage",
    items: [
      {
        id: "silo_buckets",
        label: "Buckets",
        icon: Boxes,
        to: "/buckets",
      },
      {
        id: "silo_drive",
        label: "Drive",
        icon: FolderOpen,
        to: "/drive",
      },
      {
        id: "silo_cdn",
        label: "CDN",
        icon: Globe,
        to: "/cdn",
      },
    ],
  },

  {
    group: "Databases",
    items: [
      {
        id: "silo_postgres",
        label: "PostgreSQL",
        icon: Database,
        to: "/postgres",
      },
      {
        id: "silo_explorer",
        label: "Explorer",
        icon: Table2,
        to: "/explorer",
      },
    ],
  },

  {
    group: "Data Platform",
    items: [
      {
        id: "silo_lakes",
        label: "Data Lakes",
        icon: Waves,
        to: "/lakes",
      },
      {
        id: "silo_warehouses",
        label: "Warehouses",
        icon: Warehouse,
        to: "/warehouses",
      },
      {
        id: "silo_datasets",
        label: "Datasets",
        icon: Layers,
        to: "/datasets",
      },
      {
        id: "silo_pipelines",
        label: "Pipelines",
        icon: Workflow,
        to: "/pipelines",
      },
    ],
  },

  {
    group: "Access",
    items: [
      {
        id: "silo_credentials",
        label: "Credentials",
        icon: KeyRound,
        to: "/credentials",
      },
      {
        id: "silo_permissions",
        label: "Permissions",
        icon: ShieldCheck,
        to: "/permissions",
      },
      {
        id: "silo_audit",
        label: "Audit Log",
        icon: ScrollText,
        to: "/audit-log",
      },
    ],
  },

  {
    group: "System",
    items: [
      {
        id: "silo_backups",
        label: "Backups",
        icon: Archive,
        to: "/backups",
      },
      {
        id: "silo_usage",
        label: "Usage & Quotas",
        icon: Gauge,
        to: "/usage",
      },
      {
        id: "silo_settings",
        label: "Settings",
        icon: Settings,
        to: "/settings",
        exact: true,
      },
    ],
  },
];
