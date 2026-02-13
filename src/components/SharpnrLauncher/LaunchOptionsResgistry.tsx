// LaunchOptionsRegistry.tsx

const SharpLogo = ({ children }: { children: React.ReactNode }) => (
  <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
    {children}
  </svg>
);

const HotelLogo = () => (
  <SharpLogo>
    <path d="M3 21h18M5 21V7l8-4v18M13 7l6 3v11M9 11h2m-2 4h2m6-1h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </SharpLogo>
);

const BarLogo = () => (
  <SharpLogo>
    <path d="M7 3h10l-1 9h-8l-1-9zM12 12v7M8 21h8M10 7h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </SharpLogo>
);

const KitchenLogo = () => (
  <SharpLogo>
    <path d="M6 13.847V21M18 13.847V21M3 8h18M5 8V7a3 3 0 013-3h8a3 3 0 013 3v1M6 11h2m8 0h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </SharpLogo>
);

const RestoLogo = () => (
  <SharpLogo>
    <path d="M11 20H4M4 20l1-5M4 20V4m15 16h-4m4 0l-1-7m1-9v16" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 11V4M12 11V4m4 4v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </SharpLogo>
);

const HRLogo = () => (
  <SharpLogo>
    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
    <path d="M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" stroke="currentColor" strokeWidth="1.5" />
  </SharpLogo>
);

const AccLogo = () => (
  <SharpLogo>
    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </SharpLogo>
);

const MktLogo = () => (
  <SharpLogo>
    <path d="M11 5L6 9H2v6h4l5 4V5zM15 9a5 5 0 010 6M19 6a9 9 0 010 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </SharpLogo>
);

const AdminLogo = () => (
  <SharpLogo>
    <path d="M12 2L3 7v5a10 10 0 009 10 10 10 0 009-10V7l-9-5z" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
  </SharpLogo>
);


// --- Types ---
interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType;
  to: string;
}

export interface NavSection {
  id: string;
  title: string;
  items: NavItem[];
  isSubSection?: boolean;
}

export const APP_MODULES: NavSection[] = [
  {
    id: "domain_hospitality",
    title: "Hospitality Domain",
    items: [
      { id: "hotel", label: "Hotel", icon: HotelLogo, to: "/dashboard/sharp_hospitality/hotel" },
      { id: "bar", label: "Bar", icon: BarLogo, to: "/dashboard/sharp_hospitality/bar" },
      { id: "resto", label: "Restaurant", icon: RestoLogo, to: "/dashboard/sharp_hospitality/restaurant" },
      { id: "ngc", label: "Night Club", icon: RestoLogo, to: "/dashboard/sharp_hospitality/nc" },
    ],
  },
  {
    id: "hospitality_infra",
    title: "Infra", // This is the section named Infra within the hospitality context
    isSubSection: true,
    items: [
      { id: "kitchen", label: "Kitchen", icon: KitchenLogo, to: "/dashboard/sharp_hospitality/infra/kitchen" },
    ],
  },
  {
    id: "sharp_services",
    title: "Sharp Services",
    items: [
      { id: "hr", label: "HR", icon: HRLogo, to: "/dashboard/sharp_hr/" },
      { id: "acc", label: "Accounting", icon: AccLogo, to: "/dashboard/sharp_accounting" },
      { id: "mkt", label: "Marketing", icon: MktLogo, to: "/dashboard/sharp_marketing/" },
    ],
  },
  {
    id: "admin_console",
    title: "Admin Console",
    items: [
      { id: "orchestrator", label: "Orchestrator", icon: AdminLogo, to: "/orchestrator" },
    ],
  },
];