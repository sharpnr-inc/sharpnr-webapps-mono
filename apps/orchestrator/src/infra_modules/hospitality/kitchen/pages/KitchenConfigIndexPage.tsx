/*
 * Kitchen Configuration (DUMMY).
 * Rendered at /property/$propertyId/infras/hospitality/kitchen/$kitchenID
 *
 * No kitchen API yet, so everything is local/seed data. Stations support
 * add/delete in local state; remaining sections render reference dummy data.
 * Flat + dense, sidebar-driven, fully responsive. Swap the constants + local
 * state for real queries/mutations when the backend is ready.
 */

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Clock,
  CookingPot,
  Flame,
  Microwave,
  Monitor,
  Package,
  Plus,
  Refrigerator,
  Settings2,
  Thermometer,
  Trash2,
  Users,
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  toast,
} from "@sharpnr/ui";
import { Route } from "@/routes/_appuser/property/$propertyId/infras/hospitality/kitchen/$kitchenID/index";

/* ── domain (dummy) ──────────────────────────────────── */
type StationStatus = "Active" | "Idle" | "Offline";

interface Station {
  id: string;
  name: string;
  type: string;
  capacity: number;
  status: StationStatus;
}

const KITCHEN = {
  name: "Main Kitchen",
  type: "Hot Kitchen",
  outlet: "The Copper Spoon",
  is_active: true,
  capacity_per_hour: 120,
};

const STATION_TYPES = [
  "Grill",
  "Fry",
  "Sauté",
  "Cold / Garde Manger",
  "Pass / Expo",
  "Tandoor",
  "Bakery",
  "Prep",
] as const;

const SEED_STATIONS: Station[] = [
  { id: "st1", name: "Grill 1", type: "Grill", capacity: 30, status: "Active" },
  { id: "st2", name: "Fry Line", type: "Fry", capacity: 25, status: "Active" },
  { id: "st3", name: "Sauté", type: "Sauté", capacity: 20, status: "Idle" },
  { id: "st4", name: "Cold Pass", type: "Cold / Garde Manger", capacity: 18, status: "Active" },
  { id: "st5", name: "Expo", type: "Pass / Expo", capacity: 40, status: "Offline" },
];

const EQUIPMENT = [
  { id: "eq1", name: "6-Burner Range", category: "Cooking", icon: Flame, status: "Operational" },
  { id: "eq2", name: "Combi Oven", category: "Cooking", icon: Microwave, status: "Operational" },
  { id: "eq3", name: "Walk-in Cooler", category: "Refrigeration", icon: Refrigerator, status: "Operational" },
  { id: "eq4", name: "Blast Chiller", category: "Refrigeration", icon: Thermometer, status: "Maintenance" },
  { id: "eq5", name: "Deep Fryer (x2)", category: "Cooking", icon: CookingPot, status: "Operational" },
] as const;

const STAFF = [
  { id: "sf1", name: "Marco R.", role: "Head Chef", shift: "Morning" },
  { id: "sf2", name: "Aisha K.", role: "Sous Chef", shift: "Evening" },
  { id: "sf3", name: "Daniel O.", role: "Line Cook", shift: "Morning" },
  { id: "sf4", name: "Priya S.", role: "Line Cook", shift: "Evening" },
  { id: "sf5", name: "Tom B.", role: "Commis", shift: "Split" },
] as const;

const KDS = {
  ticket_sla_mins: 12,
  warning_threshold_mins: 8,
  auto_bump: false,
  course_firing: true,
  show_modifiers: true,
};

const PREP_ITEMS = [
  { id: "pi1", name: "Marinated Chicken", unit: "kg", par: 20, onHand: 14 },
  { id: "pi2", name: "Diced Onions", unit: "kg", par: 15, onHand: 16 },
  { id: "pi3", name: "House Stock", unit: "L", par: 30, onHand: 9 },
  { id: "pi4", name: "Pizza Dough", unit: "pcs", par: 60, onHand: 42 },
  { id: "pi5", name: "Tomato Sauce", unit: "L", par: 25, onHand: 25 },
] as const;

const HOURS = [
  { day: "Monday", open: "09:00", close: "23:00" },
  { day: "Tuesday", open: "09:00", close: "23:00" },
  { day: "Wednesday", open: "09:00", close: "23:00" },
  { day: "Thursday", open: "09:00", close: "23:30" },
  { day: "Friday", open: "09:00", close: "00:30" },
  { day: "Saturday", open: "10:00", close: "00:30" },
  { day: "Sunday", open: "10:00", close: "22:30" },
] as const;

const STATION_STATUS_COLOR: Record<StationStatus, string> = {
  Active: "text-emerald-600",
  Idle: "text-amber-600",
  Offline: "text-muted-foreground",
};

/* ── nav ─────────────────────────────────────────────── */
type SectionId =
  | "general"
  | "stations"
  | "equipment"
  | "staff"
  | "kds"
  | "prep"
  | "hours";

const NAV: { id: SectionId; label: string; icon: React.ReactNode }[] = [
  { id: "general", label: "General", icon: <Settings2 className="h-3.5 w-3.5" /> },
  { id: "stations", label: "Stations", icon: <CookingPot className="h-3.5 w-3.5" /> },
  { id: "equipment", label: "Equipment", icon: <Refrigerator className="h-3.5 w-3.5" /> },
  { id: "staff", label: "Staff", icon: <Users className="h-3.5 w-3.5" /> },
  { id: "kds", label: "KDS Display", icon: <Monitor className="h-3.5 w-3.5" /> },
  { id: "prep", label: "Prep & Inventory", icon: <Package className="h-3.5 w-3.5" /> },
  { id: "hours", label: "Hours", icon: <Clock className="h-3.5 w-3.5" /> },
];

/* ── station form ────────────────────────────────────── */
interface StationForm {
  name: string;
  type: string;
  capacity: string;
  status: StationStatus;
}

const emptyStation: StationForm = {
  name: "",
  type: STATION_TYPES[0],
  capacity: "20",
  status: "Active",
};

/* ── shared primitives (flat, dense) ─────────────────── */
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
    <div className="flex flex-wrap items-start justify-between gap-2 border-b pb-2">
      <div className="min-w-0">
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

function ListRow({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 px-3 py-2">
      <div className="min-w-0">
        <p className="truncate text-xs font-medium">{title}</p>
        {subtitle && (
          <p className="truncate text-[11px] text-muted-foreground">{subtitle}</p>
        )}
      </div>
      <div className="shrink-0">{right}</div>
    </div>
  );
}

/* ── sections ────────────────────────────────────────── */
function GeneralSection({
  stationCount,
}: {
  stationCount: number;
}) {
  const [isActive, setIsActive] = useState(KITCHEN.is_active);

  return (
    <div className="space-y-4">
      <SectionHead
        title="General"
        description="Core kitchen details and capacity."
        action={
          <Button size="sm" variant="outline" className="h-7 px-2.5 text-xs">
            Save changes
          </Button>
        }
      />

      <div className="grid grid-cols-2 divide-x divide-y rounded-md border sm:grid-cols-4 sm:divide-y-0">
        {[
          { label: "Stations", value: stationCount },
          { label: "Equipment", value: EQUIPMENT.length },
          { label: "Staff", value: STAFF.length },
          { label: "Orders / hr", value: KITCHEN.capacity_per_hour },
        ].map((s) => (
          <div key={s.label} className="px-3 py-2">
            <p className="text-base font-semibold leading-none">{s.value}</p>
            <p className="mt-1 text-[11px] text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="space-y-2.5">
        <Field label="Kitchen name">
          <Input defaultValue={KITCHEN.name} className="h-8 w-full max-w-sm text-sm" />
        </Field>
        <Field label="Kitchen type">
          <Select defaultValue={KITCHEN.type}>
            <SelectTrigger className="h-8 w-full max-w-sm text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {["Hot Kitchen", "Cold Kitchen", "Grill", "Bakery", "Central / Commissary"].map(
                (t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ),
              )}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Linked outlet">
          <Input defaultValue={KITCHEN.outlet} className="h-8 w-full max-w-sm text-sm" />
        </Field>
        <Field label="Capacity (orders/hr)">
          <Input
            type="number"
            defaultValue={KITCHEN.capacity_per_hour}
            className="h-8 w-full max-w-37.5 text-sm"
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

function StationsSection({
  stations,
  onAdd,
  onDelete,
}: {
  stations: Station[];
  onAdd: () => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="space-y-4">
      <SectionHead
        title="Stations"
        description="Cooking and prep stations in this kitchen."
        action={
          <Button size="sm" variant="outline" className="h-7 px-2.5 text-xs" onClick={onAdd}>
            <Plus className="mr-1 h-3.5 w-3.5" />
            Add station
          </Button>
        }
      />

      {stations.length === 0 ? (
        <div className="rounded-md border py-10 text-center">
          <p className="text-xs font-medium text-foreground">No stations yet</p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            Use “Add station” to configure your first station.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {stations.map((st) => (
            <div key={st.id} className="rounded-md border p-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2">
                  <CookingPot className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  <p className="truncate text-xs font-medium">{st.name}</p>
                </div>
                <button
                  onClick={() => onDelete(st.id)}
                  aria-label={`Remove ${st.name}`}
                  className="shrink-0 text-muted-foreground transition-colors hover:text-destructive"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground">{st.type}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-[11px] text-muted-foreground">
                  {st.capacity} orders/hr
                </span>
                <span className={`text-[11px] font-medium ${STATION_STATUS_COLOR[st.status]}`}>
                  ● {st.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function EquipmentSection() {
  return (
    <div className="space-y-4">
      <SectionHead
        title="Equipment"
        description="Appliances and assets assigned to this kitchen."
        action={
          <Button size="sm" variant="outline" className="h-7 px-2.5 text-xs">
            <Plus className="mr-1 h-3.5 w-3.5" />
            Add equipment
          </Button>
        }
      />
      <div className="divide-y rounded-md border">
        {EQUIPMENT.map((e) => {
          const Icon = e.icon;
          return (
            <div key={e.id} className="flex items-center justify-between gap-3 px-3 py-2">
              <div className="flex min-w-0 items-center gap-2.5">
                <Icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium">{e.name}</p>
                  <p className="text-[11px] text-muted-foreground">{e.category}</p>
                </div>
              </div>
              <span
                className={`shrink-0 text-[11px] font-medium ${
                  e.status === "Operational" ? "text-emerald-600" : "text-amber-600"
                }`}
              >
                {e.status}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StaffSection() {
  return (
    <div className="space-y-4">
      <SectionHead
        title="Staff"
        description="Team members assigned to this kitchen."
        action={
          <Button size="sm" variant="outline" className="h-7 px-2.5 text-xs">
            <Plus className="mr-1 h-3.5 w-3.5" />
            Assign staff
          </Button>
        }
      />
      <div className="divide-y rounded-md border">
        {STAFF.map((s) => (
          <ListRow
            key={s.id}
            title={s.name}
            subtitle={s.role}
            right={
              <span className="text-[11px] text-muted-foreground">{s.shift}</span>
            }
          />
        ))}
      </div>
    </div>
  );
}

function KdsSection() {
  const [autoBump, setAutoBump] = useState(KDS.auto_bump);
  const [courseFiring, setCourseFiring] = useState(KDS.course_firing);
  const [showModifiers, setShowModifiers] = useState(KDS.show_modifiers);

  return (
    <div className="space-y-4">
      <SectionHead
        title="KDS Display"
        description="Kitchen display behaviour and ticket timing."
        action={
          <Button size="sm" variant="outline" className="h-7 px-2.5 text-xs">
            Save changes
          </Button>
        }
      />
      <div className="space-y-2.5">
        <Field label="Ticket SLA (mins)">
          <Input
            type="number"
            defaultValue={KDS.ticket_sla_mins}
            className="h-8 w-full max-w-37.5 text-sm"
          />
        </Field>
        <Field label="Warning at (mins)">
          <Input
            type="number"
            defaultValue={KDS.warning_threshold_mins}
            className="h-8 w-full max-w-37.5 text-sm"
          />
        </Field>
        <Field label="Auto-bump on ready">
          <Switch checked={autoBump} onCheckedChange={setAutoBump} />
        </Field>
        <Field label="Course firing">
          <Switch checked={courseFiring} onCheckedChange={setCourseFiring} />
        </Field>
        <Field label="Show modifiers">
          <Switch checked={showModifiers} onCheckedChange={setShowModifiers} />
        </Field>
      </div>
    </div>
  );
}

function PrepSection() {
  return (
    <div className="space-y-4">
      <SectionHead
        title="Prep & Inventory"
        description="Prep items with par levels and stock on hand."
        action={
          <Button size="sm" variant="outline" className="h-7 px-2.5 text-xs">
            <Plus className="mr-1 h-3.5 w-3.5" />
            Add item
          </Button>
        }
      />
      {/* horizontal scroll on small screens */}
      <div className="overflow-x-auto rounded-md border">
        <div className="min-w-105">
          <div className="grid grid-cols-[1.5fr_0.8fr_0.8fr_0.8fr] gap-2 border-b bg-muted/40 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
            <span>Item</span>
            <span>Unit</span>
            <span>Par</span>
            <span>On hand</span>
          </div>
          <div className="divide-y">
            {PREP_ITEMS.map((p) => {
              const low = p.onHand < p.par;
              return (
                <div
                  key={p.id}
                  className="grid grid-cols-[1.5fr_0.8fr_0.8fr_0.8fr] items-center gap-2 px-3 py-1.5 text-xs"
                >
                  <span className="font-medium">{p.name}</span>
                  <span className="text-muted-foreground">{p.unit}</span>
                  <span className="text-muted-foreground">{p.par}</span>
                  <span className={low ? "font-medium text-amber-600" : "text-muted-foreground"}>
                    {p.onHand}
                    {low ? " · low" : ""}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function HoursSection() {
  return (
    <div className="space-y-4">
      <SectionHead
        title="Operating Hours"
        description="When this kitchen accepts and fires orders."
        action={
          <Button size="sm" variant="outline" className="h-7 px-2.5 text-xs">
            Edit
          </Button>
        }
      />
      <div className="divide-y rounded-md border">
        {HOURS.map((h) => (
          <div key={h.day} className="flex items-center justify-between px-3 py-2">
            <span className="text-xs font-medium">{h.day}</span>
            <span className="text-xs text-muted-foreground">
              {h.open} – {h.close}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────── */
const KitchenConfigIndexPage = () => {
  const { propertyId, kitchenID } = Route.useParams();
  const nav = useNavigate();

  const [active, setActive] = useState<SectionId>("general");
  const [stations, setStations] = useState<Station[]>(SEED_STATIONS);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<StationForm>(emptyStation);

  const setField = <K extends keyof StationForm>(key: K, value: StationForm[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const nameTaken = useMemo(
    () =>
      stations.some(
        (s) => s.name.toLowerCase() === form.name.trim().toLowerCase(),
      ),
    [stations, form.name],
  );
  const canSubmit = form.name.trim().length > 0 && !nameTaken;

  const openAddDialog = () => {
    setForm(emptyStation);
    setDialogOpen(true);
  };

  const handleAddStation = () => {
    if (!canSubmit) return;
    const station: Station = {
      id: `st-${Date.now()}`,
      name: form.name.trim(),
      type: form.type,
      capacity: Number(form.capacity) || 0,
      status: form.status,
    };
    setStations((prev) => [...prev, station]);
    toast.success(`${station.name} added`);
    setForm(emptyStation);
    setDialogOpen(false);
  };

  const handleDeleteStation = (id: string) => {
    setStations((prev) => prev.filter((s) => s.id !== id));
    toast.success("Station removed");
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-4">
      {/* Back nav */}
      <button
        onClick={() =>
          nav({ to: "/property/$propertyId/details", params: { propertyId } })
        }
        className="mb-3 flex items-center gap-1.5 text-[11px] text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3 w-3" />
        Back to property
      </button>

      {/* Header */}
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border">
          <Flame className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-sm font-semibold leading-tight">
            {KITCHEN.name}
          </h1>
          <p className="truncate text-[11px] text-muted-foreground">
            Kitchen configuration · {kitchenID.slice(0, 8)}…
          </p>
        </div>
        <span
          className={`shrink-0 text-[11px] font-medium ${
            KITCHEN.is_active ? "text-emerald-600" : "text-muted-foreground"
          }`}
        >
          {KITCHEN.is_active ? "● Active" : "● Inactive"}
        </span>
      </div>

      {/* Sidebar + content */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-[170px_1fr]">
        <nav className="flex flex-row gap-1 overflow-x-auto pb-1 sm:flex-col sm:overflow-visible sm:pb-0">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={[
                "flex shrink-0 items-center gap-2 whitespace-nowrap rounded-md px-2.5 py-1.5 text-left text-xs transition-colors",
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

        <div className="min-w-0">
          {active === "general" && <GeneralSection stationCount={stations.length} />}
          {active === "stations" && (
            <StationsSection
              stations={stations}
              onAdd={openAddDialog}
              onDelete={handleDeleteStation}
            />
          )}
          {active === "equipment" && <EquipmentSection />}
          {active === "staff" && <StaffSection />}
          {active === "kds" && <KdsSection />}
          {active === "prep" && <PrepSection />}
          {active === "hours" && <HoursSection />}
        </div>
      </div>

      {/* Add station dialog */}
      <Dialog
        open={dialogOpen}
        onOpenChange={(o) => {
          setDialogOpen(o);
          if (!o) setForm(emptyStation);
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add station</DialogTitle>
            <DialogDescription>
              Configure a new station for this kitchen.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="station-name">Station name</Label>
              <Input
                id="station-name"
                value={form.name}
                onChange={(e) => setField("name", e.target.value)}
                placeholder="e.g. Grill 2"
                aria-invalid={nameTaken}
              />
              {nameTaken && (
                <p className="text-[11px] text-destructive">
                  A station with that name already exists.
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>Type</Label>
                <Select value={form.type} onValueChange={(v) => setField("type", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {STATION_TYPES.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Status</Label>
                <Select
                  value={form.status}
                  onValueChange={(v) => setField("status", v as StationStatus)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(["Active", "Idle", "Offline"] as const).map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="station-capacity">Capacity (orders / hr)</Label>
              <Input
                id="station-capacity"
                type="number"
                min={0}
                value={form.capacity}
                onChange={(e) => setField("capacity", e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddStation} disabled={!canSubmit} className="gap-1.5">
              <Plus className="h-4 w-4" />
              Add station
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default KitchenConfigIndexPage;
