import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Property {
  id: string;
  name: string;
  location: string;
  rooms: number;
  starRating: number;
  status: "operational" | "renovation" | "closed";
  legalEntityId: string;
}

interface LegalEntity {
  id: string;
  name: string;
  type: "pvt_ltd" | "llp" | "ltd" | "sole_prop";
  cin: string;
  gst: string;
  location: string;
}

interface Member {
  id: string;
  name: string;
  email: string;
  role: "owner" | "admin" | "property_manager" | "viewer";
  initials: string;
}

interface Integration {
  id: string;
  name: string;
  scope: string;
  status: "active" | "inactive";
}

interface ActivityEvent {
  id: string;
  description: string;
  timestamp: string;
  actor: string;
  type: "link" | "invite" | "status" | "integration";
}

// ─── Static Data ──────────────────────────────────────────────────────────────

const PROPERTIES: Property[] = [
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
];

const LEGAL_ENTITIES: LegalEntity[] = [
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

const MEMBERS: Member[] = [
  {
    id: "m1",
    name: "Vikram Singh",
    email: "vikram@sunrisehospitality.in",
    role: "owner",
    initials: "VS",
  },
  {
    id: "m2",
    name: "Riya Mehta",
    email: "riya.mehta@sunrisehospitality.in",
    role: "admin",
    initials: "RM",
  },
  {
    id: "m3",
    name: "Arjun Sharma",
    email: "arjun.s@sunrisehospitality.in",
    role: "property_manager",
    initials: "AS",
  },
  {
    id: "m4",
    name: "Priya Kapoor",
    email: "priya.k@sunrisehospitality.in",
    role: "viewer",
    initials: "PK",
  },
];

const INTEGRATIONS: Integration[] = [
  { id: "i1", name: "Cloudbeds PMS", scope: "Hotel Sunrise", status: "active" },
  { id: "i2", name: "Razorpay", scope: "Both properties", status: "active" },
  {
    id: "i3",
    name: "Google Workspace",
    scope: "Organization-wide",
    status: "active",
  },
  {
    id: "i4",
    name: "Tally Prime",
    scope: "Sunrise Hospitality Pvt Ltd",
    status: "active",
  },
];

const ACTIVITY: ActivityEvent[] = [
  {
    id: "a1",
    description: "Oceanic Ventures LLP linked to Ocean View Resort",
    timestamp: "2 hours ago",
    actor: "Riya Mehta",
    type: "link",
  },
  {
    id: "a2",
    description: "Arjun Sharma invited as Property Manager",
    timestamp: "Yesterday",
    actor: "Admin",
    type: "invite",
  },
  {
    id: "a3",
    description: "Ocean View Resort status changed to Renovation",
    timestamp: "3 days ago",
    actor: "Vikram Singh",
    type: "status",
  },
  {
    id: "a4",
    description: "Hotel Sunrise connected to Cloudbeds PMS",
    timestamp: "Last week",
    actor: "System",
    type: "integration",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function statusBadge(status: Property["status"]) {
  switch (status) {
    case "operational":
      return (
        <Badge className="bg-green-50 text-green-800 border-green-200">
          Operational
        </Badge>
      );
    case "renovation":
      return (
        <Badge className="bg-amber-50 text-amber-800 border-amber-200">
          Renovation
        </Badge>
      );
    case "closed":
      return <Badge variant="destructive">Closed</Badge>;
  }
}

function roleBadge(role: Member["role"]) {
  const map: Record<Member["role"], string> = {
    owner: "bg-amber-50 text-amber-800 border-amber-200",
    admin: "bg-teal-50 text-teal-800 border-teal-200",
    property_manager: "bg-blue-50 text-blue-800 border-blue-200",
    viewer: "bg-gray-100 text-gray-800 border-gray-200",
  };
  const label: Record<Member["role"], string> = {
    owner: "Owner",
    admin: "Admin",
    property_manager: "Property Mgr",
    viewer: "Viewer",
  };
  return <Badge className={map[role]}>{label[role]}</Badge>;
}

function entityTypeBadge(type: LegalEntity["type"]) {
  const map: Record<LegalEntity["type"], { cls: string; label: string }> = {
    pvt_ltd: {
      cls: "bg-teal-50 text-teal-800 border-teal-200",
      label: "Pvt Ltd",
    },
    llp: {
      cls: "bg-purple-50 text-purple-800 border-purple-200",
      label: "LLP",
    },
    ltd: { cls: "bg-blue-50 text-blue-800 border-blue-200", label: "Ltd" },
    sole_prop: {
      cls: "bg-gray-100 text-gray-800 border-gray-200",
      label: "Sole Prop",
    },
  };
  const { cls, label } = map[type];
  return <Badge className={cls}>{label}</Badge>;
}

function activityDotColor(type: ActivityEvent["type"]) {
  const map: Record<ActivityEvent["type"], string> = {
    link: "bg-green-500",
    invite: "bg-blue-500",
    status: "bg-amber-500",
    integration: "bg-purple-500",
  };
  return map[type];
}

function propertyForEntity(entityId: string) {
  return PROPERTIES.find((p) => p.legalEntityId === entityId);
}

function entityForProperty(propertyId: string) {
  const prop = PROPERTIES.find((p) => p.id === propertyId);
  return prop
    ? LEGAL_ENTITIES.find((e) => e.id === prop.legalEntityId)
    : undefined;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function OrgHeader() {
  return (
    <div className="flex items-start gap-4 p-5 pb-0">
      <div className="h-14 w-14 flex-shrink-0 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 font-medium text-lg">
        SH
      </div>
      <div className="flex-1 min-w-0">
        <h1 className="text-xl font-semibold tracking-tight">
          Sunrise Hospitality Group
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          sharpnr.io/org/sunrise-hospitality · Created Jan 2023
        </p>
        <div className="flex flex-wrap gap-1.5 mt-2">
          <Badge className="bg-green-50 text-green-800 border-green-200 gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-green-600 inline-block" />
            Active
          </Badge>
          <Badge className="bg-amber-50 text-amber-800 border-amber-200">
            Hospitality
          </Badge>
          <Badge className="bg-blue-50 text-blue-800 border-blue-200">
            Enterprise
          </Badge>
          <Badge variant="secondary">India · GMT+5:30</Badge>
        </div>
      </div>
    </div>
  );
}

function StatsRow() {
  const stats = [
    { label: "Properties", value: PROPERTIES.length },
    { label: "Legal entities", value: LEGAL_ENTITIES.length },
    { label: "Members", value: MEMBERS.length },
    { label: "Integrations", value: INTEGRATIONS.length },
  ];
  return (
    <div className="grid grid-cols-4 gap-3 px-5 py-4">
      {stats.map(({ label, value }) => (
        <div key={label} className="rounded-lg bg-muted/50 p-3">
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
        </div>
      ))}
    </div>
  );
}

// ─── Tab: Overview ────────────────────────────────────────────────────────────

function OverviewTab() {
  return (
    <div className="flex flex-col gap-4">
      {/* Quick Actions */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Quick actions</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-2">
          {[
            { icon: "+", label: "Add property", sub: "Register a new unit" },
            { icon: "@", label: "Invite member", sub: "Add by email" },
            { icon: "#", label: "New entity", sub: "Attach a legal structure" },
          ].map(({ icon, label, sub }) => (
            <button
              key={label}
              className="flex flex-col items-start gap-1 rounded-lg border border-dashed p-3 text-left hover:bg-muted/50 transition-colors"
            >
              <span className="text-sm text-muted-foreground">{icon}</span>
              <span className="text-sm font-medium">{label}</span>
              <span className="text-xs text-muted-foreground">{sub}</span>
            </button>
          ))}
        </CardContent>
      </Card>

      {/* Properties summary */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Properties</CardTitle>
          <Button variant="ghost" size="sm" className="text-xs h-7">
            View all
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid sm:grid-cols-2 divide-x divide-border">
            {PROPERTIES.map((prop) => (
              <div key={prop.id} className="p-4">
                <p className="font-medium text-sm">{prop.name}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {prop.location}
                </p>
                <p className="text-xs text-muted-foreground">
                  {prop.rooms} rooms · {prop.starRating}-star
                </p>
                <div className="mt-2">{statusBadge(prop.status)}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Recent activity</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {ACTIVITY.map((event) => (
              <div key={event.id} className="flex gap-3 px-4 py-3 items-start">
                <span
                  className={`mt-1.5 h-2 w-2 flex-shrink-0 rounded-full ${activityDotColor(event.type)}`}
                />
                <div>
                  <p className="text-sm">{event.description}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {event.timestamp} · {event.actor}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Tab: Properties ──────────────────────────────────────────────────────────

function PropertiesTab() {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">All properties</CardTitle>
          <Button size="sm" className="h-7 text-xs">
            + Add property
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {PROPERTIES.map((prop) => {
              const entity = entityForProperty(prop.id);
              return (
                <div
                  key={prop.id}
                  className="flex items-center gap-4 px-4 py-3"
                >
                  <div className="h-9 w-9 flex-shrink-0 rounded-lg bg-amber-50 flex items-center justify-center text-sm font-medium text-amber-600">
                    {prop.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{prop.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {prop.location} · {prop.rooms} rooms · {prop.starRating}
                      -star
                      {entity && ` · ${entity.name}`}
                    </p>
                  </div>
                  {statusBadge(prop.status)}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Tab: Legal Entities ──────────────────────────────────────────────────────

function EntitiesTab() {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Legal entities</CardTitle>
          <Button size="sm" className="h-7 text-xs">
            + Add entity
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {LEGAL_ENTITIES.map((entity) => (
              <div
                key={entity.id}
                className="flex items-center gap-4 px-4 py-3"
              >
                <div className="h-9 w-9 flex-shrink-0 rounded-lg bg-teal-50 flex items-center justify-center text-xs font-medium text-teal-700">
                  {entity.name
                    .split(" ")
                    .slice(0, 2)
                    .map((w) => w[0])
                    .join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{entity.name}</p>
                  <p className="text-xs text-muted-foreground">
                    CIN: {entity.cin} · GST: {entity.gst} · {entity.location}
                  </p>
                </div>
                {entityTypeBadge(entity.type)}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">
            Entity → property mapping
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {LEGAL_ENTITIES.map((entity) => {
            const prop = propertyForEntity(entity.id);
            return (
              <div
                key={entity.id}
                className="flex items-center gap-2 flex-wrap"
              >
                {entityTypeBadge(entity.type)}
                <Badge variant="secondary">{entity.name}</Badge>
                <span className="text-muted-foreground text-sm">→</span>
                {prop ? statusBadge(prop.status) : null}
                <Badge variant="outline">{prop?.name ?? "—"}</Badge>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Tab: Members ─────────────────────────────────────────────────────────────

function MembersTab() {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Team members</CardTitle>
          <Button size="sm" className="h-7 text-xs">
            Invite
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {MEMBERS.map((m) => (
              <div key={m.id} className="flex items-center gap-3 px-4 py-3">
                <div className="h-8 w-8 flex-shrink-0 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                  {m.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{m.name}</p>
                  <p className="text-xs text-muted-foreground">{m.email}</p>
                </div>
                {roleBadge(m.role)}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">
            Integrations connected
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-3">
          {INTEGRATIONS.map((integ) => (
            <div
              key={integ.id}
              className="rounded-lg border p-3 flex items-start gap-2"
            >
              <div>
                <p className="text-sm font-medium">{integ.name}</p>
                <p className="text-xs text-muted-foreground">{integ.scope}</p>
              </div>
              <Badge className="ml-auto bg-green-50 text-green-800 border-green-200 shrink-0">
                {integ.status}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Tab: Settings ────────────────────────────────────────────────────────────

function SettingsTab() {
  const [orgName, setOrgName] = useState("Sunrise Hospitality Group");
  const [email, setEmail] = useState("admin@sunrisehospitality.in");

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">
            Organization details
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">
                Organization name
              </label>
              <input
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">Domain</label>
              <div className="rounded-md border bg-muted/50 px-3 py-2 text-sm text-muted-foreground">
                Hospitality
              </div>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">
                Headquarters
              </label>
              <div className="rounded-md border bg-muted/50 px-3 py-2 text-sm text-muted-foreground">
                Jaipur, Rajasthan, India
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">Plan</label>
              <div className="rounded-md border bg-muted/50 px-3 py-2 text-sm text-muted-foreground">
                Enterprise
              </div>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground">
              Primary contact email
            </label>
            <input
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <Button size="sm">Save changes</Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/40">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-destructive">
            Danger zone
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Delete organization</p>
            <p className="text-xs text-muted-foreground">
              Permanently removes all data. This cannot be undone.
            </p>
          </div>
          <Button variant="destructive" size="sm">
            Delete
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const OrganizationIndexPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-0">
      <OrgHeader />
      <StatsRow />
      <Separator />

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full justify-start rounded-none border-b bg-transparent px-5 h-auto pb-0 gap-0">
          {(
            [
              "overview",
              "properties",
              "entities",
              "members",
              "settings",
            ] as const
          ).map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent pb-2 capitalize text-sm"
            >
              {tab === "entities" ? "Legal entities" : tab}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="p-5">
          <TabsContent value="overview" className="mt-0">
            <OverviewTab />
          </TabsContent>
          <TabsContent value="properties" className="mt-0">
            <PropertiesTab />
          </TabsContent>
          <TabsContent value="entities" className="mt-0">
            <EntitiesTab />
          </TabsContent>
          <TabsContent value="members" className="mt-0">
            <MembersTab />
          </TabsContent>
          <TabsContent value="settings" className="mt-0">
            <SettingsTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default OrganizationIndexPage;
