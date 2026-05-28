export interface NavigationSubItem {
  title: string;
  href: string;
}

export interface NavigationItem {
  title: string;
  description: string;
  href: string;
  badge?: string; // e.g. "Launching Soon", "Beta"
  subItems?: NavigationSubItem[];
}

export interface NavigationCTA {
  label: string;
  action: string;
  href: string;
}

export interface NavigationSection {
  title: string;
  items: NavigationItem[];
  cta?: NavigationCTA;
  layout?: "grid" | "sectors"; // sectors = two-panel mega menu
}

export const navigationSections: NavigationSection[] = [
  // ─── Products ────────────────────────────────────────────────────────────────
  {
    title: "Products",
    layout: "grid",
    cta: {
      label: "Purpose-built apps for every part of your business",
      action: "Browse all products",
      href: "#products",
    },
    items: [
      {
        title: "Sharp Hospitality",
        description: "Hotels, restaurants, bars, and venues — end to end.",
        href: "#",
      },
      {
        title: "Accounting",
        description: "Double-entry accounting and financial reporting.",
        href: "#",
      },
      {
        title: "Inventory",
        description: "Stock tracking and warehouse management.",
        href: "#",
      },
      {
        title: "CRM",
        description: "Customer lifecycle and relationship management.",
        href: "#",
      },
      {
        title: "Payroll",
        description: "Employee salaries, payslips, and compliance.",
        href: "#",
      },
      {
        title: "Procurement",
        description: "Purchase workflows and vendor management.",
        href: "#",
      },
      {
        title: "Projects",
        description: "Task planning and project execution.",
        href: "#",
      },
      {
        title: "HRMS",
        description: "Employee records, leaves, and attendance.",
        href: "#",
      },
      {
        title: "POS",
        description: "Retail and hospitality point-of-sale.",
        href: "#",
      },
      {
        title: "Manufacturing",
        description: "Production planning and BOM management.",
        href: "#",
      },
    ],
  },

  // ─── Infrastructure ───────────────────────────────────────────────────────────
  {
    title: "Infrastructure",
    layout: "grid",
    cta: {
      label: "Services that power your entire Sharpnr workspace",
      action: "Learn more",
      href: "#infrastructure",
    },
    items: [
      {
        title: "Silo",
        description: "Enterprise cloud storage with granular access controls.",
        href: "#",
      },
      {
        title: "Cables",
        description: "Built-in team messaging and connectivity.",
        href: "#",
      },
      {
        title: "Asset Management",
        description: "Track and maintain all company-owned assets.",
        href: "#",
      },
      {
        title: "Webhooks",
        description: "React to events across your platform in real-time.",
        href: "#",
      },
    ],
  },

  // ─── Industries / Sectors ─────────────────────────────────────────────────────
  // Each item is a sector. subItems are the specific business types within it.
  // badge = "Launching Soon" means the sector product isn't live yet.
  {
    title: "Industries",
    layout: "sectors",
    cta: {
      label: "Tailored solutions for every industry vertical",
      action: "Explore all industries",
      href: "#industries",
    },
    items: [
      // ── 1a. Hospitality ──────────────────────────────────────────────────────
      // Powered by: Sharp Hospitality
      {
        title: "Hospitality",
        description:
          "Sharp Hospitality covers the full spectrum — from boutique hotels to large casino resorts.",
        href: "#hospitality",
        subItems: [
          { title: "Hotels", href: "#" },
          { title: "Restaurants", href: "#" },
          { title: "Bars", href: "#" },
          { title: "Venues", href: "#" },
          { title: "Nightclubs", href: "#" },
          { title: "Casinos", href: "#" },
          { title: "Spas", href: "#" },
          { title: "Resorts", href: "#" },
          { title: "Cruise Lines", href: "#" },
          { title: "Event Spaces", href: "#" },
        ],
      },

      // ── 1b. Retail ───────────────────────────────────────────────────────────
      // Powered by: Sharp Retail — Launching Soon
      {
        title: "Retail",
        description:
          "Sharp Retail brings inventory, POS, and analytics to stores of every size.",
        href: "#retail",
        badge: "Launching Soon",
        subItems: [
          { title: "General Stores", href: "#" },
          { title: "Medium-Scale Stores", href: "#" },
        ],
      },

      // ── 1c. Medical ──────────────────────────────────────────────────────────
      // Powered by: Sharp Medical — Launching Soon
      {
        title: "Medical",
        description:
          "Sharp Medical handles clinical workflows, patient records, and compliance.",
        href: "#medical",
        badge: "Launching Soon",
        subItems: [
          { title: "Hospitals", href: "#" },
          { title: "Clinics", href: "#" },
          { title: "Private Practices", href: "#" },
          { title: "Dental Offices", href: "#" },
          { title: "Veterinary Clinics", href: "#" },
          { title: "Physical Therapy Centers", href: "#" },
          { title: "Mental Health Facilities", href: "#" },
          { title: "Home Healthcare Providers", href: "#" },
          { title: "Rehabilitation Centers", href: "#" },
          { title: "Diagnostic Labs", href: "#" },
          { title: "Pharmaceutical Companies", href: "#" },
        ],
      },
    ],
  },
];