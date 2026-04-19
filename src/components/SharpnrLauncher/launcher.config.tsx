import React from "react";
import type { NavSection } from "./launcher.types";

/* =========================================================
   SVG ICONS
========================================================= */

const Icon = ({ children }: { children: React.ReactNode }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="h-5 w-5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);

export const HRLogo = () => (
  <Icon>
    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </Icon>
);

export const AccLogo = () => (
  <Icon>
    <path
      d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H7"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </Icon>
);

export const MktLogo = () => (
  <Icon>
    <path
      d="M11 5L6 9H2v6h4l5 4V5zM15 9a5 5 0 010 6M19 6a9 9 0 010 12"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </Icon>
);

export const HospLogo = () => (
  <Icon>
    <path
      d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <polyline
      points="9 22 9 12 15 12 15 22"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </Icon>
);

export const DEFAULT_SECTIONS: NavSection[] = [
  {
    id: "sharp_services",
    title: "Sharp Services",
    items: [
      { id: "hr", label: "HR", icon: HRLogo, to: "/dashboard/sharp_hr" },
      {
        id: "acc",
        label: "Accounting",
        icon: AccLogo,
        to: "/dashboard/sharp_accounting",
      },
      {
        id: "mkt",
        label: "Marketing",
        icon: MktLogo,
        to: "/dashboard/sharp_marketing",
      },
      {
        id: "hosp",
        label: "Hospitality",
        icon: HospLogo,
        to: "/dashboard/sharp_hospitality",
      },
    ],
  },
];
