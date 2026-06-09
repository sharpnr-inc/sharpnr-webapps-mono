import { type Node, type Edge } from "@xyflow/react";
import { COLORS } from "./constants";

const INFRA_GROUP_X = -140;
const INFRA_GROUP_Y = 480;
const INFRA_WIDTH = 1000;
const INFRA_HEIGHT = 440;

const GRID_START_X = INFRA_GROUP_X + 40;
const GRID_START_Y = INFRA_GROUP_Y + 80;
const COL_GAP = 240;
const ROW_GAP = 180;

export const initialNodes: Node[] = [
  {
    id: "business-op",
    type: "layer",
    position: { x: 320, y: 0 },
    data: {
      label: "Business Operation Layer",
      sub: "Client-facing apps designed for day-to-day operation.\ne.g. Sharp-Hospitality for hotels & restaurants.",
    },
    draggable: false,
  },
  {
    id: "sharpnr-core",
    type: "core",
    position: { x: 360, y: 220 },
    data: {
      label: "Sharpnr",
      sub: "(your Org)",
    },
    draggable: false,
  },
  {
    id: "marketplace",
    type: "marketplace",
    position: { x: -200, y: 180 },
    data: {
      label: "Sharp-Marketplace",
      sub: "B2B marketplace to purchase and\nsell services & goods with other organisations",
    },
    draggable: true,
  },
  {
    id: "infra-group",
    type: "infraGroup",
    position: { x: INFRA_GROUP_X, y: INFRA_GROUP_Y },
    data: { label: "Business Infrastructure / sharpnr-services" },
    style: { width: INFRA_WIDTH, height: INFRA_HEIGHT, zIndex: -1 },
    draggable: false,
    selectable: false,
  },
  // Row 1
  {
    id: "svc-iam",
    type: "service",
    position: { x: GRID_START_X, y: GRID_START_Y },
    data: {
      label: "Sharp-IAM",
      items: [
        "Employee Login",
        "Task Management",
        "Training",
        "Workforce Portal",
        "Operations Management",
      ],
    },
    draggable: false,
  },
  {
    id: "svc-accounting",
    type: "service",
    position: { x: GRID_START_X + COL_GAP, y: GRID_START_Y },
    data: {
      label: "Sharp-Accounting",
      items: [
        "Accounting",
        "Sales Management",
        "Purchase Management",
        "Double-Entry Accounting",
        "Financial Reporting",
      ],
    },
    draggable: false,
  },
  {
    id: "svc-hrms",
    type: "service",
    position: { x: GRID_START_X + COL_GAP * 2, y: GRID_START_Y },
    data: {
      label: "Sharp-HRMS",
      items: [
        "Human Resources",
        "Attendance & Leave",
        "Payroll Processing",
        "Employee Training",
        "Performance Management",
      ],
    },
    draggable: false,
  },
  {
    id: "svc-crm",
    type: "service",
    position: { x: GRID_START_X + COL_GAP * 3, y: GRID_START_Y },
    data: {
      label: "Sharp-CRM",
      items: [
        "Marketing Automation",
        "Customer Loyalty",
        "Feedback Management",
        "Lead Management",
        "Customer Engagement",
      ],
    },
    draggable: false,
  },
  // Row 2
  {
    id: "svc-silo",
    type: "service",
    position: { x: GRID_START_X, y: GRID_START_Y + ROW_GAP },
    data: {
      label: "Silo",
      items: [
        "Structured Data Storage",
        "RDBMS Management",
        "Data Warehouse",
        "Data Lake",
        "Unified Data Platform",
      ],
    },
    draggable: false,
  },
  {
    id: "svc-cables",
    type: "service",
    position: { x: GRID_START_X + COL_GAP, y: GRID_START_Y + ROW_GAP },
    data: {
      label: "Cables",
      items: [
        "Team Communication",
        "Messaging",
        "Video Calls",
        "Channels & Groups",
        "Context-Aware Collaboration",
      ],
    },
    draggable: false,
  },
  {
    id: "svc-cortex",
    type: "service",
    position: { x: GRID_START_X + COL_GAP * 2, y: GRID_START_Y + ROW_GAP },
    data: {
      label: "Cortex",
      items: [
        "Resource Management",
        "Access Control",
        "Audit Logs",
        "Database Administration",
        "IT Operations",
      ],
    },
    draggable: false,
  },
  {
    id: "svc-folio",
    type: "service",
    position: { x: GRID_START_X + COL_GAP * 3, y: GRID_START_Y + ROW_GAP },
    data: {
      label: "Folio",
      items: [
        "Document Management",
        "Spreadsheets",
        "PDF Workspace",
        "Live Collaboration",
        "Team Productivity",
      ],
    },
    draggable: false,
  },
];

const DASHED_STYLE = {
  stroke: COLORS.textDim,
  strokeWidth: 1.5,
  strokeDasharray: "6 4",
};

const SOLID_STYLE = {
  stroke: COLORS.accent,
  strokeWidth: 1.5,
};

const INFRA_EDGE_STYLE = {
  stroke: "#7a3028", // accentDim
  strokeWidth: 1,
  strokeDasharray: "4 5",
};

export const initialEdges: Edge[] = [
  {
    id: "op-core",
    source: "business-op",
    target: "sharpnr-core",
    style: DASHED_STYLE,
    animated: false,
    type: "smoothstep",
  },
  {
    id: "market-core",
    source: "marketplace",
    sourceHandle: "right",
    target: "sharpnr-core",
    style: DASHED_STYLE,
    animated: false,
    type: "smoothstep",
  },
  {
    id: "core-infra",
    source: "sharpnr-core",
    target: "infra-group",
    style: SOLID_STYLE,
    animated: false,
    type: "smoothstep",
  },
  ...[
    "svc-iam",
    "svc-accounting",
    "svc-hrms",
    "svc-crm",
    "svc-silo",
    "svc-cables",
    "svc-cortex",
    "svc-folio",
  ].map((id) => ({
    id: `core-${id}`,
    source: "sharpnr-core",
    target: id,
    style: INFRA_EDGE_STYLE,
    animated: false,
    type: "smoothstep" as const,
  })),
];
