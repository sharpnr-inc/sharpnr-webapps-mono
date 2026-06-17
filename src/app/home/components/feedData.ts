// Dummy data for the orchestrator home feed.
// Replace with real API data once the endpoints are available.

export interface NewsItem {
  id: string;
  source: string;
  title: string;
  summary: string;
  tag: string;
  postedAt: string; // relative label e.g. "2h ago"
  readMinutes: number;
  helpful: number;
}

export interface InventoryStat {
  id: string;
  label: string;
  value: string;
  hint: string;
  trend: "up" | "down" | "flat";
  trendValue: string;
}

export interface LowStockItem {
  id: string;
  name: string;
  sku: string;
  remaining: number;
  threshold: number;
}

export interface OfferItem {
  id: string;
  title: string;
  partner: string;
  description: string;
  badge: string;
  expiresAt: string;
}

export interface Announcement {
  id: string;
  label: string;
  title: string;
  detail: string;
}

export interface ActivityItem {
  id: string;
  actor: string;
  initials: string;
  action: string;
  target: string;
  time: string;
}

export interface UpcomingEvent {
  id: string;
  title: string;
  day: string;
  month: string;
  time: string;
  type: string;
}

export const newsTags = [
  "All",
  "Logistics",
  "Compliance",
  "Sourcing",
  "Sustainability",
  "Finance",
] as const;

export const industryNews: NewsItem[] = [
  {
    id: "n1",
    source: "Supply Chain Weekly",
    title: "Regional freight costs ease as fuel prices stabilise",
    summary:
      "Logistics operators report a 6% drop in average lane costs this quarter, opening room to renegotiate carrier contracts before the next peak season.",
    tag: "Logistics",
    postedAt: "2h ago",
    readMinutes: 3,
    helpful: 42,
  },
  {
    id: "n2",
    source: "Retail Pulse",
    title: "Demand for sustainable packaging keeps climbing",
    summary:
      "Buyers increasingly filter suppliers by recyclable packaging. Vendors offering compliant materials are seeing shorter sales cycles.",
    tag: "Sustainability",
    postedAt: "5h ago",
    readMinutes: 4,
    helpful: 31,
  },
  {
    id: "n3",
    source: "Trade & Tax Digest",
    title: "New tax category rules take effect next fiscal quarter",
    summary:
      "Updated classification thresholds mean some product lines move brackets. Review your tax categories to avoid mismatched filings.",
    tag: "Compliance",
    postedAt: "Yesterday",
    readMinutes: 6,
    helpful: 58,
  },
  {
    id: "n4",
    source: "Market Signals",
    title: "Raw material lead times shorten across electronics",
    summary:
      "Component suppliers are clearing backlogs, with average lead times down to pre-shortage levels for most standard parts.",
    tag: "Sourcing",
    postedAt: "Yesterday",
    readMinutes: 2,
    helpful: 19,
  },
  {
    id: "n5",
    source: "Logistics Today",
    title: "Port congestion drops to lowest level in two years",
    summary:
      "Major coastal hubs report faster turnaround times, easing pressure on inbound schedules and reducing demurrage charges for importers.",
    tag: "Logistics",
    postedAt: "2 days ago",
    readMinutes: 3,
    helpful: 27,
  },
  {
    id: "n6",
    source: "Finance Brief",
    title: "Central bank holds rates, easing inventory financing costs",
    summary:
      "Stable borrowing costs give operators more room to hold buffer stock through the upcoming demand surge without squeezing margins.",
    tag: "Finance",
    postedAt: "2 days ago",
    readMinutes: 5,
    helpful: 44,
  },
  {
    id: "n7",
    source: "Compliance Wire",
    title: "Updated labelling standards published for cross-border goods",
    summary:
      "New origin and content labelling requirements apply from next quarter. Non-compliant shipments may face clearance delays.",
    tag: "Compliance",
    postedAt: "3 days ago",
    readMinutes: 4,
    helpful: 36,
  },
  {
    id: "n8",
    source: "Sourcing Monthly",
    title: "Diversified supplier bases outperform on resilience",
    summary:
      "Organisations with three or more qualified suppliers per key SKU reported fewer stockouts during recent disruptions.",
    tag: "Sourcing",
    postedAt: "4 days ago",
    readMinutes: 6,
    helpful: 52,
  },
];

export const inventoryStats: InventoryStat[] = [
  {
    id: "s1",
    label: "Total SKUs",
    value: "1,284",
    hint: "All warehouses",
    trend: "up",
    trendValue: "+24",
  },
  {
    id: "s2",
    label: "Units in stock",
    value: "48,910",
    hint: "Available to promise",
    trend: "down",
    trendValue: "-3.1%",
  },
  {
    id: "s3",
    label: "Open purchase orders",
    value: "37",
    hint: "Awaiting fulfilment",
    trend: "flat",
    trendValue: "0",
  },
  {
    id: "s4",
    label: "Inventory value",
    value: "$1.92M",
    hint: "At current cost",
    trend: "up",
    trendValue: "+2.4%",
  },
  {
    id: "s5",
    label: "Fulfilment rate",
    value: "96.4%",
    hint: "Last 30 days",
    trend: "up",
    trendValue: "+1.2%",
  },
  {
    id: "s6",
    label: "Dead stock",
    value: "212",
    hint: "No movement 90d+",
    trend: "down",
    trendValue: "-8",
  },
];

export const lowStockItems: LowStockItem[] = [
  { id: "l1", name: "Steel bracket M8", sku: "SB-M8-204", remaining: 42, threshold: 100 },
  { id: "l2", name: "Thermal label roll", sku: "TLR-4x6", remaining: 18, threshold: 75 },
  { id: "l3", name: "USB-C cable 1m", sku: "USB-C-1M", remaining: 9, threshold: 60 },
  { id: "l4", name: "Packing tape 48mm", sku: "PT-48", remaining: 31, threshold: 50 },
  { id: "l5", name: "Bubble wrap 500mm", sku: "BW-500", remaining: 14, threshold: 80 },
  { id: "l6", name: "Shipping carton L", sku: "SC-LRG-12", remaining: 23, threshold: 120 },
];

export const offers: OfferItem[] = [
  {
    id: "o1",
    title: "12% off bulk carrier shipping",
    partner: "NorthLine Freight",
    description:
      "Lock in reduced per-pallet rates on orders booked before the end of the month.",
    badge: "Logistics",
    expiresAt: "Ends Jun 30",
  },
  {
    id: "o2",
    title: "Free 90-day warehouse analytics trial",
    partner: "StockSense",
    description:
      "Connect your inventory and get demand forecasting at no cost for the first quarter.",
    badge: "Software",
    expiresAt: "Ends Jul 15",
  },
  {
    id: "o3",
    title: "Volume pricing on recyclable mailers",
    partner: "GreenPack Co.",
    description:
      "Tiered discounts kick in from 5,000 units — stack with your existing supplier terms.",
    badge: "Packaging",
    expiresAt: "Limited stock",
  },
  {
    id: "o4",
    title: "Waived setup fee on EDI integration",
    partner: "LinkBridge",
    description:
      "Automate purchase orders with your top suppliers and skip the onboarding cost this month.",
    badge: "Software",
    expiresAt: "Ends Jul 1",
  },
];

export const announcements: Announcement[] = [
  {
    id: "a1",
    label: "Product update",
    title: "Tax categories module is now live",
    detail: "Assign categories in bulk and keep filings aligned with the latest brackets.",
  },
  {
    id: "a2",
    label: "Maintenance",
    title: "Scheduled downtime this Sunday, 02:00–04:00",
    detail: "Reporting may be briefly unavailable while we roll out performance upgrades.",
  },
  {
    id: "a3",
    label: "Tip",
    title: "Set reorder points to automate low-stock alerts",
    detail: "Define thresholds per SKU and let the orchestrator flag items before they run out.",
  },
];

export const activityFeed: ActivityItem[] = [
  {
    id: "ac1",
    actor: "Ayesha Khan",
    initials: "AK",
    action: "approved purchase order",
    target: "PO-2048",
    time: "12m ago",
  },
  {
    id: "ac2",
    actor: "Daniel Roy",
    initials: "DR",
    action: "added 3 SKUs to",
    target: "Warehouse B",
    time: "1h ago",
  },
  {
    id: "ac3",
    actor: "Mei Lin",
    initials: "ML",
    action: "updated tax category for",
    target: "Electronics",
    time: "3h ago",
  },
  {
    id: "ac4",
    actor: "Omar Farah",
    initials: "OF",
    action: "closed stock count for",
    target: "Q2 audit",
    time: "Yesterday",
  },
];

export const upcomingEvents: UpcomingEvent[] = [
  {
    id: "e1",
    title: "Quarterly stock audit",
    day: "19",
    month: "Jun",
    time: "09:00",
    type: "Inventory",
  },
  {
    id: "e2",
    title: "Supplier review — NorthLine",
    day: "24",
    month: "Jun",
    time: "14:30",
    type: "Sourcing",
  },
  {
    id: "e3",
    title: "Tax filing deadline",
    day: "30",
    month: "Jun",
    time: "23:59",
    type: "Compliance",
  },
];
