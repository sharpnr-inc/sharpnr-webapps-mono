import { config } from "@/configs/env";
import {
  BarChart3,
  FileText,
  Fingerprint,
  HardDrive,
  LayoutDashboard,
  MessageSquare,
  ShoppingBag,
  Users,
  Zap,
} from "lucide-react";

export const products = [
  {
    id: "hr",
    name: "Sharp-HR",
    tagline: "Your people, fully managed.",
    icon: Users,
    color: "text-blue-400",
    description:
      "The people operations backbone. Payroll, recruitment, and lifecycle management in one place.",
    link: config.hrAppUrl + "/about",
  },
  {
    id: "marketing",
    name: "Sharp-Marketing",
    tagline: "Campaigns that connect.",
    icon: BarChart3,
    color: "text-pink-400",
    description:
      "Growth engine for modern teams. Multi-channel campaigns and CRM that actually works.",
    link: config.marketingAppUrl,
  },
  {
    id: "accounting",
    name: "Sharp-Accounting",
    tagline: "The numbers, always right.",
    icon: Zap,
    color: "text-emerald-400",
    description:
      "Financial operating system. Bookkeeping, invoicing, and real-time reporting.",
    link: config.accountingAppUrl + "/about",
  },
  {
    id: "orchestrator",
    name: "Sharp-Orchestrator",
    tagline: "Command everything.",
    icon: LayoutDashboard,
    color: "text-violet-400",
    description:
      "The mission control room. Monitor, configure, and govern your entire fleet of apps.",
    link: config.orchestratorAppUrl,
  },
  {
    id: "cable",
    name: "Sharp-Cable",
    tagline: "Your team, always connected.",
    icon: MessageSquare,
    color: "text-orange-400",
    description:
      "Real-time communication layer. Deeply wired into your HR and project data.",
    link: config.cablesAppUrl,
  },
  {
    id: "folio",
    name: "Sharp-Folio",
    tagline: "Write together. Think together.",
    icon: FileText,
    color: "text-cyan-400",
    description:
      "Collaborative document editor with live data embeds from across the platform.",
    link: config.folioAppUrl,
  },
  {
    id: "silo",
    name: "Sharp-Silo",
    tagline: "Every file. Always there.",
    icon: HardDrive,
    color: "text-slate-400",
    description:
      "Secure, centralized file storage layer for the entire ecosystem.",
    link: config.siloAppUrl,
  },
  {
    id: "marketplace",
    name: "Sharp-Marketplace",
    tagline: "Extend Sharpnr. Your way.",
    icon: ShoppingBag,
    color: "text-yellow-400",
    description:
      "The ecosystem extension layer. Discover and install third-party integrations.",
    link: config.marketplaceAppUrl,
  },
  {
    id: "iam",
    name: "SharpIAM",
    tagline: "One identity. Every door.",
    icon: Fingerprint,
    color: "text-red-400",
    description:
      "Identity and access management backbone. Single sign-on for every product.",
    link: config.iamAppUrl + "/about",
  },
];
