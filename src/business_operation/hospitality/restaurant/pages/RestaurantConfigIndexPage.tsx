import { useState } from "react";
import {
  Building2,
  ChefHat,
  Flame,
  LayoutGrid,
  Plus,
  Scale,
  Settings2,
  UtensilsCrossed,
  Users,
} from "lucide-react";
import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
} from "@sharpnr/ui";

/* ─────────────────────────────────────────────
   Dummy data
───────────────────────────────────────────── */
const RESTAURANT = {
  name: "The Copper Spoon",
  opening_time: "09:00",
  closing_time: "23:30",
  is_active: true,
  cuisine: "Modern Indian",
  seating_capacity: 86,
};

type DummyTable = { id: string; name: string; seats: number };
type DummyFloor = { id: string; name: string; tables: DummyTable[] };

const FLOORS: DummyFloor[] = [
  {
    id: "1",
    name: "Ground Floor",
    tables: [
      { id: "t1", name: "T1", seats: 2 },
      { id: "t2", name: "T2", seats: 4 },
      { id: "t3", name: "T3", seats: 4 },
      { id: "t4", name: "T4", seats: 6 },
      { id: "t5", name: "T5", seats: 2 },
    ],
  },
  {
    id: "2",
    name: "Rooftop",
    tables: [
      { id: "t6", name: "R1", seats: 4 },
      { id: "t7", name: "R2", seats: 4 },
      { id: "t8", name: "R3", seats: 8 },
    ],
  },
];

type DummyKitchen = {
  id: string;
  name: string;
  type: string;
  stations: number;
  is_active: boolean;
};

const KITCHENS: DummyKitchen[] = [
  { id: "k1", name: "Main Kitchen", type: "Hot Kitchen", stations: 6, is_active: true },
  { id: "k2", name: "Bakery & Desserts", type: "Cold Kitchen", stations: 3, is_active: true },
  { id: "k3", name: "Tandoor Section", type: "Grill", stations: 2, is_active: false },
];

type DummyMenu = { id: string; name: string; items: number; active: boolean };

const MENUS: DummyMenu[] = [
  { id: "m1", name: "Breakfast", items: 24, active: true },
  { id: "m2", name: "Lunch Specials", items: 42, active: true },
  { id: "m3", name: "Dinner", items: 58, active: true },
  { id: "m4", name: "Beverages", items: 31, active: true },
  { id: "m5", name: "Seasonal (Winter)", items: 12, active: false },
];

type DummyLegalEntity = {
  id: string;
  name: string;
  city: string;
  state: string;
  gst: string;
};

const LEGAL_ENTITIES: DummyLegalEntity[] = [
  { id: "le1", name: "Copper Hospitality Pvt. Ltd.", city: "Bengaluru", state: "Karnataka", gst: "29ABCDE1234F1Z5" },
  { id: "le2", name: "Spoon Foods LLP", city: "Mumbai", state: "Maharashtra", gst: "27FGHIJ5678K2Z9" },
];

/* ─────────────────────────────────────────────
   Nav configuration
───────────────────────────────────────────── */
type SectionId = "general" | "tables" | "kitchen" | "menu" | "legal";

const NAV: { id: SectionId; label: string; icon: React.ReactNode }[] = [
  { id: "general", label: "General", icon: <Settings2 className="h-3.5 w-3.5" /> },
  { id: "tables", label: "Tables", icon: <LayoutGrid className="h-3.5 w-3.5" /> },
  { id: "kitchen", label: "Kitchen", icon: <Flame className="h-3.5 w-3.5" /> },
  { id: "menu", label: "Menu", icon: <UtensilsCrossed className="h-3.5 w-3.5" /> },
  { id: "legal", label: "Legal Entity", icon: <Scale className="h-3.5 w-3.5" /> },
];

/* ─────────────────────────────────────────────
   Shared primitives (flat, dense)
───────────────────────────────────────────── */
function SectionHead({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b pb-2">
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-wide text-foreground">
          {title}
        </h2>
        {description && (
          <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 gap-1 sm:grid-cols-[160px_1fr] sm:items-center sm:gap-4">
      <Label className="text-xs font-medium text-muted-foreground">
        {label}
      </Label>
      <div>{children}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Sections
───────────────────────────────────────────── */
function GeneralSection() {
  const [isActive, setIsActive] = useState(RESTAURANT.is_active);

  return (
    <div className="space-y-4">
      <SectionHead
        title="General"
        description="Basic information and operating hours."
        action={
          <Button size="sm" variant="outline" className="h-7 px-2.5 text-xs">
            Save changes
          </Button>
        }
      />

      <div className="space-y-2.5">
        <Field label="Restaurant name">
          <Input defaultValue={RESTAURANT.name} className="h-8 max-w-sm text-sm" />
        </Field>
        <Field label="Cuisine">
          <Input defaultValue={RESTAURANT.cuisine} className="h-8 max-w-sm text-sm" />
        </Field>
        <Field label="Opening time">
          <Input
            type="time"
            defaultValue={RESTAURANT.opening_time}
            className="h-8 max-w-[150px] text-sm"
          />
        </Field>
        <Field label="Closing time">
          <Input
            type="time"
            defaultValue={RESTAURANT.closing_time}
            className="h-8 max-w-[150px] text-sm"
          />
        </Field>
        <Field label="Seating capacity">
          <Input
            type="number"
            defaultValue={RESTAURANT.seating_capacity}
            className="h-8 max-w-[150px] text-sm"
          />
        </Field>

        <Field label="Operational status">
          <div className="flex items-center gap-2.5">
            <Switch checked={isActive} onCheckedChange={setIsActive} />
            <span className="text-xs text-foreground">
              {isActive ? "Active — accepting orders" : "Inactive"}
            </span>
          </div>
        </Field>
      </div>
    </div>
  );
}

function TablesSection() {
  return (
    <div className="space-y-4">
      <SectionHead
        title="Tables & Floors"
        description="Seating layout across floors."
        action={
          <Button size="sm" variant="outline" className="h-7 px-2.5 text-xs">
            <Plus className="mr-1 h-3.5 w-3.5" />
            Add floor
          </Button>
        }
      />

      <div className="space-y-3">
        {FLOORS.map((floor) => (
          <div key={floor.id} className="rounded-md border">
            <div className="flex items-center justify-between border-b px-3 py-1.5">
              <div className="flex items-baseline gap-2">
                <span className="text-xs font-medium">{floor.name}</span>
                <span className="text-[11px] text-muted-foreground">
                  {floor.tables.length} tables
                </span>
              </div>
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" className="h-6 px-2 text-[11px]">
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 px-2 text-[11px] text-destructive hover:text-destructive"
                >
                  Delete
                </Button>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 p-3">
              {floor.tables.map((table) => (
                <div
                  key={table.id}
                  className="flex h-11 w-11 flex-col items-center justify-center rounded border text-[11px]"
                >
                  <span className="font-medium">{table.name}</span>
                  <span className="flex items-center gap-0.5 text-[9px] text-muted-foreground">
                    <Users className="h-2 w-2" />
                    {table.seats}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function KitchenSection() {
  return (
    <div className="space-y-4">
      <SectionHead
        title="Kitchen"
        description="Kitchen stations linked to this restaurant."
        action={
          <Button size="sm" variant="outline" className="h-7 px-2.5 text-xs">
            <Plus className="mr-1 h-3.5 w-3.5" />
            Add kitchen
          </Button>
        }
      />

      <div className="divide-y rounded-md border">
        {KITCHENS.map((kitchen) => (
          <div
            key={kitchen.id}
            className="flex items-center justify-between px-3 py-2"
          >
            <div className="flex items-center gap-2.5">
              <Flame className="h-3.5 w-3.5 text-muted-foreground" />
              <div>
                <p className="text-xs font-medium">{kitchen.name}</p>
                <p className="text-[11px] text-muted-foreground">
                  {kitchen.type} · {kitchen.stations} stations
                </p>
              </div>
            </div>
            <span
              className={`text-[11px] font-medium ${
                kitchen.is_active ? "text-emerald-600" : "text-muted-foreground"
              }`}
            >
              {kitchen.is_active ? "Active" : "Inactive"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MenuSection() {
  return (
    <div className="space-y-4">
      <SectionHead
        title="Menu"
        description="Menus available to customers."
        action={
          <Button size="sm" variant="outline" className="h-7 px-2.5 text-xs">
            <Plus className="mr-1 h-3.5 w-3.5" />
            Add menu
          </Button>
        }
      />

      <div className="divide-y rounded-md border">
        {MENUS.map((menu) => (
          <div
            key={menu.id}
            className="flex items-center justify-between px-3 py-2"
          >
            <div className="flex items-center gap-2.5">
              <UtensilsCrossed className="h-3.5 w-3.5 text-muted-foreground" />
              <div>
                <p className="text-xs font-medium">{menu.name}</p>
                <p className="text-[11px] text-muted-foreground">
                  {menu.items} items
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`text-[11px] font-medium ${
                  menu.active ? "text-emerald-600" : "text-muted-foreground"
                }`}
              >
                {menu.active ? "Published" : "Draft"}
              </span>
              <Button size="sm" variant="ghost" className="h-6 px-2 text-[11px]">
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LegalSection() {
  const [selectedId, setSelectedId] = useState<string>(LEGAL_ENTITIES[0].id);
  const current = LEGAL_ENTITIES.find((e) => e.id === selectedId);

  return (
    <div className="space-y-4">
      <SectionHead
        title="Legal Entity"
        description="Owner entity used for billing, compliance and reporting."
      />

      <div className="space-y-2.5">
        <Field label="Assigned entity">
          <Select value={selectedId} onValueChange={setSelectedId}>
            <SelectTrigger className="h-8 max-w-sm text-sm">
              <SelectValue placeholder="Select a legal entity…" />
            </SelectTrigger>
            <SelectContent>
              {LEGAL_ENTITIES.map((entity) => (
                <SelectItem key={entity.id} value={entity.id}>
                  {entity.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        {current && (
          <div className="rounded-md border">
            <div className="flex items-center gap-2.5 border-b px-3 py-2">
              <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
              <p className="text-xs font-medium">{current.name}</p>
            </div>
            <dl className="grid grid-cols-1 gap-x-8 gap-y-1.5 px-3 py-2 sm:grid-cols-2">
              <div className="flex justify-between gap-4">
                <dt className="text-[11px] text-muted-foreground">Location</dt>
                <dd className="text-[11px] font-medium">
                  {current.city}, {current.state}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-[11px] text-muted-foreground">GST</dt>
                <dd className="font-mono text-[11px] font-medium">
                  {current.gst}
                </dd>
              </div>
            </dl>
          </div>
        )}

        <button className="text-xs font-medium text-primary underline-offset-2 hover:underline">
          + Add a new legal entity
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
const RestaurantConfigIndexPage = () => {
  const [active, setActive] = useState<SectionId>("general");

  return (
    <div className="mx-auto max-w-5xl px-4 py-4">
      {/* Header */}
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border">
          <ChefHat className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="text-sm font-semibold leading-tight">
            {RESTAURANT.name}
          </h1>
          <p className="text-[11px] text-muted-foreground">
            Restaurant configuration
          </p>
        </div>
        <span
          className={`text-[11px] font-medium ${
            RESTAURANT.is_active ? "text-emerald-600" : "text-muted-foreground"
          }`}
        >
          {RESTAURANT.is_active ? "● Active" : "● Inactive"}
        </span>
      </div>

      {/* Sidebar + content */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-[160px_1fr]">
        {/* Sidebar nav */}
        <nav className="flex flex-row gap-1 overflow-x-auto sm:flex-col sm:overflow-visible">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={[
                "flex shrink-0 items-center gap-2 rounded-md px-2.5 py-1.5 text-left text-xs transition-colors",
                active === item.id
                  ? "bg-muted font-medium text-foreground"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
              ].join(" ")}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <div>
          {active === "general" && <GeneralSection />}
          {active === "tables" && <TablesSection />}
          {active === "kitchen" && <KitchenSection />}
          {active === "menu" && <MenuSection />}
          {active === "legal" && <LegalSection />}
        </div>
      </div>
    </div>
  );
};

export default RestaurantConfigIndexPage;
