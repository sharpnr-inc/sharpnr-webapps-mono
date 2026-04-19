import React from "react";
import type { NavSection } from "./launcher.types";

/* =========================================================
   ICONS
========================================================= */

const SharpLogo = ({ children }: { children: React.ReactNode }) => (
  <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
    {children}
  </svg>
);

const HRLogo = () => (
  <SharpLogo>
    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </SharpLogo>
);

const AccLogo = () => (
  <SharpLogo>
    <path
      d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H7"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </SharpLogo>
);

const MktLogo = () => (
  <SharpLogo>
    <path
      d="M11 5L6 9H2v6h4l5 4V5zM15 9a5 5 0 010 6M19 6a9 9 0 010 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </SharpLogo>
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
        id: "mkt",
        label: "Hospitality",
        icon: MktLogo,
        to: "/dashboard/sharp_marketing",
      },
    ],
  },
];
