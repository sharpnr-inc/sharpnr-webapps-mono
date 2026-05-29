import {
  Bed,
  Calculator,
  HeartPulse,
  Database,
  FileText,
  ShieldCheck,
  Users,
  Brain,
  Store,
  Megaphone,
  Workflow,
  Cable,
  Wine,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

interface HeroSectionItems {
  title: string;
  description: string;
  logo: LucideIcon;
}

export const heroSectionItems: HeroSectionItems[] = [
  {
    title: "Sharp-Hospitality",
    description:
      "Complete hospitality management for hotels, restaurants, resorts, and guest services.",
    logo: Bed,
  },
  {
    title: "Sharp-Accounting",
    description:
      "Modern financial management including invoicing, bookkeeping, reporting, and taxation.",
    logo: Calculator,
  },
  {
    title: "Sharp-Healthcare",
    description:
      "Healthcare operations management for clinics, hospitals, and medical organizations.",
    logo: HeartPulse,
  },
  {
    title: "Silo",
    description:
      "Secure cloud storage and document management with centralized file access and collaboration.",
    logo: Database,
  },
  {
    title: "Sharp-Folio",
    description:
      "Create documents, spreadsheets, reports, and PDFs while collaborating with your team.",
    logo: FileText,
  },
  {
    title: "Sharp-IAM",
    description:
      "Identity and access management with authentication, authorization, roles, and permissions.",
    logo: ShieldCheck,
  },
  {
    title: "Sharp-HRMS",
    description:
      "Human resource management including recruitment, attendance, payroll, and performance tracking.",
    logo: Users,
  },
  {
    title: "Cortex",
    description:
      "Business intelligence, analytics, dashboards, reporting, and AI-powered insights.",
    logo: Brain,
  },
  {
    title: "Sharp-Marketplace",
    description:
      "A platform for vendors, customers, products, procurement, and digital transactions.",
    logo: Store,
  },
  {
    title: "Sharp-Marketing",
    description:
      "Marketing automation, campaigns, customer engagement, and performance analytics.",
    logo: Megaphone,
  },
  {
    title: "Orchestrator",
    description:
      "Workflow automation and process orchestration across the Sharpnr ecosystem.",
    logo: Workflow,
  },
  {
    title: "Cables",
    description:
      "Real-time communication, integrations, notifications, messaging, and event streaming.",
    logo: Cable,
  },
  {
    title: "Sharp-Bar",
    description:
      "Complete bar and beverage inventory with real-time pour tracking and ordering.",
    logo: Wine,
  },
  {
    title: "Sharp-Kitchen",
    description:
      "Kitchen order ticketing and recipe management for streamlined back-of-house operations.",
    logo: UtensilsCrossed,
  },
];
