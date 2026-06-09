// ─── Layer colours ───────────────────────────────────────────────
export const LAYER_META: Record<
  string,
  { label: string; color: string; bg: string; border: string; tag: string }
> = {
  ops: {
    label: "Business Operations",
    tag: "Industry Applications",
    color: "#a78bfa",
    bg: "rgba(124,58,237,0.06)",
    border: "rgba(124,58,237,0.18)",
  },
  org: {
    label: "Business / Organisation",
    tag: "Your Company",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.06)",
    border: "rgba(245,158,11,0.18)",
  },
  platform: {
    label: "Shared Platform",
    tag: "Core Services",
    color: "#22d3ee",
    bg: "rgba(6,182,212,0.06)",
    border: "rgba(6,182,212,0.18)",
  },
};

// ─── Per-service detail content ──────────────────────────────────
export const SERVICE_DETAIL: Record<
  string,
  {
    description: string;
    responsibilities: string[];
    connects?: string[];
  }
> = {
  "Sharp-Hospitality": {
    description:
      "The operational core for restaurants, hotels, cafés, bars, and resorts. It handles everything guest-facing and kitchen-facing in real time.",
    responsibilities: [
      "Table and reservation management",
      "Order taking and kitchen display",
      "Guest checkout and folios",
      "Room inventory for hotels",
    ],
    connects: ["Sharp-Accounting", "Sharp-HRMS", "Sharp-Silo"],
  },
  "Sharp-Retail": {
    description:
      "Point-of-sale and inventory management for physical and online stores, warehouses, and multi-branch retail chains.",
    responsibilities: [
      "Barcode scanning and POS",
      "Inventory tracking across locations",
      "Purchase orders and suppliers",
      "Sales reporting and analytics",
    ],
    connects: ["Sharp-Accounting", "Sharp-HRMS", "Sharp-Silo"],
  },
  "Sharp-Healthcare": {
    description:
      "Clinical workflow management for clinics, hospitals, diagnostic labs, and healthcare providers of all sizes.",
    responsibilities: [
      "Patient registration and EMR",
      "Appointment scheduling",
      "Prescription and billing",
      "Secure staff access via Sharp-IAM",
    ],
    connects: ["Sharp-Accounting", "Sharp-HRMS", "Sharp-IAM"],
  },
  "Your Business": {
    description:
      "The organisation layer represents your company — the entity that owns employees, customers, financial records, and permissions across every Sharpnr application.",
    responsibilities: [
      "Central identity for all services",
      "Owns all financial and HR data",
      "Defines access roles and policies",
      "Links operational apps to the platform",
    ],
  },
  "Sharp-Accounting": {
    description:
      "Full double-entry accounting, GST/tax compliance, and financial reporting. Every Sharpnr app posts transactions here.",
    responsibilities: [
      "Chart of accounts and ledger",
      "Invoicing and accounts payable",
      "GST/IGST/tax filings",
      "P&L, balance sheet, and cash flow",
    ],
  },
  "Sharp-HRMS": {
    description:
      "Human resource management covering the full employee lifecycle — from onboarding to payroll and attendance.",
    responsibilities: [
      "Employee profiles and org structure",
      "Payroll processing and payslips",
      "Leave and attendance tracking",
      "Compliance and document management",
    ],
  },
  "Sharp-IAM": {
    description:
      "Identity and access management with fine-grained policy control modelled after AWS IAM, using Cedar policy language internally.",
    responsibilities: [
      "User authentication (SSO ready)",
      "Role-based access control",
      "Attribute-based policies via Cedar",
      "Audit logs and session management",
    ],
  },
  "Sharp-Silo": {
    description:
      "Scalable object and file storage for all Sharpnr applications — product images, staff documents, invoices, and attachments.",
    responsibilities: [
      "Bucket-based file organisation",
      "Signed URL access control",
      "Versioning and lifecycle rules",
      "CDN-backed delivery",
    ],
  },
  "Sharp-Cable": {
    description:
      "The integration and communication backbone. Cable connects Sharpnr to external systems via webhooks, email, SMS, and event streams.",
    responsibilities: [
      "Webhook delivery and retries",
      "Email and SMS notifications",
      "Third-party API adapters",
      "Event bus between services",
    ],
  },
  Orchestrator: {
    description:
      "Coordinates multi-step workflows across services — automating processes that span accounting, HR, and operations without manual hand-off.",
    responsibilities: [
      "Workflow definition and scheduling",
      "Cross-service task sequencing",
      "Retry and compensation logic",
      "Audit trail for every workflow run",
    ],
  },
};

// ─── Group label positions (for overlay — rough % of flow canvas) ─
export const GROUP_LABELS: Record<
  string,
  { id: string; label: string; color: string; labelLeft: number; labelTop: number }
> = {
  ops: { id: "ops", label: "Business Operations", color: "#a78bfa", labelLeft: 2, labelTop: 2 },
  org: { id: "org", label: "Organisation", color: "#f59e0b", labelLeft: 2, labelTop: 37 },
  platform: { id: "platform", label: "Shared Services", color: "#22d3ee", labelLeft: 2, labelTop: 55 },
};

// ─── Colours per node ────────────────────────────────────────────
const C = {
  ops: { dot: "#a78bfa", border: "rgba(124,58,237,0.45)", glow: "rgba(124,58,237,0.12)" },
  org: { dot: "#f59e0b", border: "rgba(245,158,11,0.55)", glow: "rgba(245,158,11,0.12)" },
  platform: { dot: "#22d3ee", border: "rgba(6,182,212,0.45)", glow: "rgba(6,182,212,0.12)" },
};

// ─── Nodes ───────────────────────────────────────────────────────
export const initialNodes = [
  // OPS row
  {
    id: "hosp",
    type: "arch",
    position: { x: 60, y: 60 },
    data: { title: "Sharp-Hospitality", layer: "ops", tag: "hospitality", ...C.ops },
  },
  {
    id: "retail",
    type: "arch",
    position: { x: 310, y: 60 },
    data: { title: "Sharp-Retail", layer: "ops", tag: "retail", ...C.ops },
  },
  {
    id: "health",
    type: "arch",
    position: { x: 560, y: 60 },
    data: { title: "Sharp-Healthcare", layer: "ops", tag: "healthcare", ...C.ops },
  },

  // ORG centre
  {
    id: "biz",
    type: "arch",
    position: { x: 310, y: 220 },
    data: { title: "Your Business", layer: "org", tag: "organisation", ...C.org },
  },

  // PLATFORM row
  {
    id: "acct",
    type: "arch",
    position: { x: 0, y: 400 },
    data: { title: "Sharp-Accounting", layer: "platform", tag: "finance", ...C.platform },
  },
  {
    id: "hrms",
    type: "arch",
    position: { x: 180, y: 400 },
    data: { title: "Sharp-HRMS", layer: "platform", tag: "hr", ...C.platform },
  },
  {
    id: "iam",
    type: "arch",
    position: { x: 360, y: 400 },
    data: { title: "Sharp-IAM", layer: "platform", tag: "identity", ...C.platform },
  },
  {
    id: "silo",
    type: "arch",
    position: { x: 540, y: 400 },
    data: { title: "Sharp-Silo", layer: "platform", tag: "storage", ...C.platform },
  },
  {
    id: "cable",
    type: "arch",
    position: { x: 90, y: 520 },
    data: { title: "Sharp-Cable", layer: "platform", tag: "integration", ...C.platform },
  },
  {
    id: "orch",
    type: "arch",
    position: { x: 420, y: 520 },
    data: { title: "Orchestrator", layer: "platform", tag: "workflows", ...C.platform },
  },
];

const EDGE_BASE = { animated: false, style: { strokeWidth: 1.5 } };

export const initialEdges = [
  // OPS → ORG
  { id: "e-hosp-biz", source: "hosp", target: "biz", ...EDGE_BASE, style: { ...EDGE_BASE.style, stroke: "rgba(124,58,237,0.35)" } },
  { id: "e-retail-biz", source: "retail", target: "biz", ...EDGE_BASE, style: { ...EDGE_BASE.style, stroke: "rgba(124,58,237,0.35)" } },
  { id: "e-health-biz", source: "health", target: "biz", ...EDGE_BASE, style: { ...EDGE_BASE.style, stroke: "rgba(124,58,237,0.35)" } },

  // ORG → PLATFORM
  { id: "e-biz-acct", source: "biz", target: "acct", ...EDGE_BASE, style: { ...EDGE_BASE.style, stroke: "rgba(6,182,212,0.3)" } },
  { id: "e-biz-hrms", source: "biz", target: "hrms", ...EDGE_BASE, style: { ...EDGE_BASE.style, stroke: "rgba(6,182,212,0.3)" } },
  { id: "e-biz-iam", source: "biz", target: "iam", ...EDGE_BASE, style: { ...EDGE_BASE.style, stroke: "rgba(6,182,212,0.3)" } },
  { id: "e-biz-silo", source: "biz", target: "silo", ...EDGE_BASE, style: { ...EDGE_BASE.style, stroke: "rgba(6,182,212,0.3)" } },
  { id: "e-biz-cable", source: "biz", target: "cable", ...EDGE_BASE, style: { ...EDGE_BASE.style, stroke: "rgba(6,182,212,0.22)" } },
  { id: "e-biz-orch", source: "biz", target: "orch", ...EDGE_BASE, style: { ...EDGE_BASE.style, stroke: "rgba(6,182,212,0.22)" } },
];
