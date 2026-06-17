// Dummy data for the organization home page.
// Swap for real API data once the endpoints are available.

export interface Property {
  id: string;
  name: string;
  location: string;
  rooms: number;
  starRating: number;
  status: "operational" | "renovation" | "closed";
  legalEntityId: string;
}

export interface LegalEntity {
  id: string;
  name: string;
  type: "pvt_ltd" | "llp" | "ltd" | "sole_prop";
  cin: string;
  gst: string;
  location: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  role: "owner" | "admin" | "property_manager" | "viewer";
  initials: string;
}

export interface Integration {
  id: string;
  name: string;
  scope: string;
  status: "active" | "inactive";
}

export interface ActivityEvent {
  id: string;
  description: string;
  timestamp: string;
  actor: string;
}

export const ORG = {
  name: "Sunrise Hospitality Group",
  handle: "sharpnr.io/org/sunrise-hospitality",
  createdAt: "Created Jan 2023",
  initials: "SH",
  domain: "Hospitality",
  plan: "Enterprise",
  region: "India · GMT+5:30",
};

export const PROPERTIES: Property[] = [
  {
    id: "prop_1",
    name: "Hotel Sunrise",
    location: "Jaipur, Rajasthan",
    rooms: 80,
    starRating: 4,
    status: "operational",
    legalEntityId: "entity_1",
  },
  {
    id: "prop_2",
    name: "Ocean View Resort",
    location: "Goa",
    rooms: 120,
    starRating: 5,
    status: "renovation",
    legalEntityId: "entity_2",
  },
  {
    id: "prop_3",
    name: "Hilltop Retreat",
    location: "Shimla, Himachal",
    rooms: 54,
    starRating: 4,
    status: "operational",
    legalEntityId: "entity_1",
  },
  {
    id: "prop_4",
    name: "City Center Suites",
    location: "Bengaluru, Karnataka",
    rooms: 96,
    starRating: 4,
    status: "operational",
    legalEntityId: "entity_2",
  },
];

export const LEGAL_ENTITIES: LegalEntity[] = [
  {
    id: "entity_1",
    name: "Sunrise Hospitality Pvt Ltd",
    type: "pvt_ltd",
    cin: "U55101RJ2019PTC",
    gst: "08AABCS1429B1Z",
    location: "Jaipur, Rajasthan",
  },
  {
    id: "entity_2",
    name: "Oceanic Ventures LLP",
    type: "llp",
    cin: "AAP-2021",
    gst: "30AABCO2147K1Z",
    location: "Panaji, Goa",
  },
];

export const MEMBERS: Member[] = [
  { id: "m1", name: "Vikram Singh", email: "vikram@sunrisehospitality.in", role: "owner", initials: "VS" },
  { id: "m2", name: "Riya Mehta", email: "riya.mehta@sunrisehospitality.in", role: "admin", initials: "RM" },
  { id: "m3", name: "Arjun Sharma", email: "arjun.s@sunrisehospitality.in", role: "property_manager", initials: "AS" },
  { id: "m4", name: "Neha Patel", email: "neha.p@sunrisehospitality.in", role: "property_manager", initials: "NP" },
  { id: "m5", name: "Priya Kapoor", email: "priya.k@sunrisehospitality.in", role: "viewer", initials: "PK" },
  { id: "m6", name: "Karan Malhotra", email: "karan.m@sunrisehospitality.in", role: "viewer", initials: "KM" },
];

export const INTEGRATIONS: Integration[] = [
  { id: "i1", name: "Cloudbeds PMS", scope: "Hotel Sunrise", status: "active" },
  { id: "i2", name: "Razorpay", scope: "All properties", status: "active" },
  { id: "i3", name: "Google Workspace", scope: "Organization-wide", status: "active" },
  { id: "i4", name: "Tally Prime", scope: "Sunrise Hospitality Pvt Ltd", status: "inactive" },
];

export const ACTIVITY: ActivityEvent[] = [
  { id: "a1", description: "Oceanic Ventures LLP linked to Ocean View Resort", timestamp: "2 hours ago", actor: "Riya Mehta" },
  { id: "a2", description: "City Center Suites added to the organization", timestamp: "Yesterday", actor: "Vikram Singh" },
  { id: "a3", description: "Ocean View Resort status changed to Renovation", timestamp: "3 days ago", actor: "Vikram Singh" },
  { id: "a4", description: "Hotel Sunrise connected to Cloudbeds PMS", timestamp: "Last week", actor: "System" },
];

// ─── Derived datasets for charts ──────────────────────────────────────────────

export const roomsByProperty = PROPERTIES.map((p) => ({
  name: p.name,
  rooms: p.rooms,
}));

export const propertyStatusBreakdown = (
  ["operational", "renovation", "closed"] as const
).map((status) => ({
  status,
  label: status[0].toUpperCase() + status.slice(1),
  count: PROPERTIES.filter((p) => p.status === status).length,
}));

const roleLabels: Record<Member["role"], string> = {
  owner: "Owner",
  admin: "Admin",
  property_manager: "Property Mgr",
  viewer: "Viewer",
};

export const membersByRole = (
  ["owner", "admin", "property_manager", "viewer"] as const
).map((role) => ({
  role,
  label: roleLabels[role],
  count: MEMBERS.filter((m) => m.role === role).length,
}));

// 6-month occupancy trend (%) across the portfolio.
export const occupancyTrend = [
  { month: "Jan", occupancy: 62 },
  { month: "Feb", occupancy: 68 },
  { month: "Mar", occupancy: 74 },
  { month: "Apr", occupancy: 71 },
  { month: "May", occupancy: 79 },
  { month: "Jun", occupancy: 84 },
];

export const totalRooms = PROPERTIES.reduce((sum, p) => sum + p.rooms, 0);

export function entityForProperty(propertyId: string) {
  const prop = PROPERTIES.find((p) => p.id === propertyId);
  return prop ? LEGAL_ENTITIES.find((e) => e.id === prop.legalEntityId) : undefined;
}

export function propertyCountForEntity(entityId: string) {
  return PROPERTIES.filter((p) => p.legalEntityId === entityId).length;
}

export const roleLabel = (role: Member["role"]) => roleLabels[role];

export const entityTypeLabel: Record<LegalEntity["type"], string> = {
  pvt_ltd: "Pvt Ltd",
  llp: "LLP",
  ltd: "Ltd",
  sole_prop: "Sole Prop",
};

export const statusLabel: Record<Property["status"], string> = {
  operational: "Operational",
  renovation: "Renovation",
  closed: "Closed",
};
