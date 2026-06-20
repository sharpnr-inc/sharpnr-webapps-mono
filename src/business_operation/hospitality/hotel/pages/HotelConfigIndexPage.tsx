/*
 * Hotel Configuration (DUMMY) — enterprise PMS layout.
 * Rendered at /property/$propertyId/business_op_modules/hospitality/hotel/$hotelID
 *
 * No hotel API exists yet, so everything is local/seed data. Rooms support
 * add/delete in local state; the remaining sections render reference dummy
 * data. Swap the constants + local state for real queries/mutations when the
 * backend is ready. Flat + dense visual style, sidebar-driven sections.
 */

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  BedDouble,
  Building2,
  CreditCard,
  DoorOpen,
  Hotel,
  Plus,
  Receipt,
  Scale,
  ScrollText,
  Settings2,
  Share2,
  Sparkles,
  Tag,
  Trash2,
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import {
  Button,
  Checkbox,
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
  Separator,
  Switch,
  toast,
} from "@sharpnr/ui";
import { Route } from "@/routes/_appuser/property/$propertyId/business_op_modules/hospitality/hotel/$hotelID/index";

/* ── domain (dummy) ──────────────────────────────────── */
type RoomStatus = "Available" | "Occupied" | "Maintenance";

interface Room {
  id: string;
  number: string;
  type: string;
  floor: number;
  capacity: number;
  pricePerNight: number;
  status: RoomStatus;
  amenities: string[];
}

const HOTEL = {
  name: "The Grand Aurelia",
  brand: "Aurelia Hotels & Resorts",
  starRating: 5,
  currency: "USD",
  timezone: "Asia/Kolkata",
  checkIn: "14:00",
  checkOut: "11:00",
  floors: 8,
  is_active: true,
};

const ROOM_TYPES = [
  { name: "Standard", description: "Comfortable room with the essentials.", basePrice: 80, maxOccupancy: 2 },
  { name: "Deluxe", description: "More space and upgraded furnishings.", basePrice: 130, maxOccupancy: 3 },
  { name: "Suite", description: "Separate living area for longer stays.", basePrice: 220, maxOccupancy: 4 },
  { name: "Executive", description: "Top-floor rooms with premium amenities.", basePrice: 320, maxOccupancy: 4 },
] as const;

const RATE_PLANS = [
  { id: "rp1", name: "Room Only (EP)", meal: "No meals included", rate: 80, refundable: true },
  { id: "rp2", name: "Bed & Breakfast (CP)", meal: "Breakfast included", rate: 100, refundable: true },
  { id: "rp3", name: "Half Board (MAP)", meal: "Breakfast + Dinner", rate: 140, refundable: false },
  { id: "rp4", name: "Full Board (AP)", meal: "All meals included", rate: 175, refundable: false },
] as const;

const ROOM_AMENITIES = [
  "Wi-Fi",
  "Air Conditioning",
  "TV",
  "Mini Bar",
  "Balcony",
  "Room Service",
  "Safe",
  "Bathtub",
] as const;

const PROPERTY_FACILITIES = [
  "Swimming Pool",
  "Spa & Wellness",
  "Fitness Center",
  "Restaurant",
  "Bar & Lounge",
  "Conference Hall",
  "Valet Parking",
  "Airport Shuttle",
  "Laundry",
  "24/7 Front Desk",
] as const;

const POLICIES = [
  { label: "Check-in", value: "2:00 PM" },
  { label: "Check-out", value: "11:00 AM" },
  { label: "Cancellation", value: "Free up to 48h before arrival" },
  { label: "No-show", value: "First night charged" },
  { label: "Children", value: "Under 6 stay free" },
  { label: "Extra bed", value: "$25 / night" },
  { label: "Pets", value: "Not allowed" },
  { label: "Smoking", value: "Designated rooms only" },
] as const;

const TAXES = [
  { id: "tx1", name: "GST", rate: "12%", type: "Percentage", applies: "Room tariff" },
  { id: "tx2", name: "Service charge", rate: "10%", type: "Percentage", applies: "F&B" },
  { id: "tx3", name: "City / occupancy tax", rate: "$2.00", type: "Flat / night", applies: "Per room" },
  { id: "tx4", name: "Tourism levy", rate: "1.5%", type: "Percentage", applies: "Room tariff" },
] as const;

const CHANNELS = [
  { id: "ch1", name: "Booking.com", connected: true, commission: "15%", rooms: 40 },
  { id: "ch2", name: "Expedia", connected: true, commission: "18%", rooms: 30 },
  { id: "ch3", name: "MakeMyTrip", connected: true, commission: "20%", rooms: 25 },
  { id: "ch4", name: "Airbnb", connected: false, commission: "3%", rooms: 0 },
  { id: "ch5", name: "Agoda", connected: false, commission: "17%", rooms: 0 },
] as const;

const PAYMENT_METHODS = [
  "Credit / Debit Card",
  "UPI",
  "Net Banking",
  "Cash",
  "Bank Transfer",
] as const;

const LEGAL_ENTITIES = [
  { id: "le1", name: "Aurelia Hospitality Pvt. Ltd.", city: "Bengaluru", state: "Karnataka", gst: "29ABCDE1234F1Z5" },
  { id: "le2", name: "Grand Stays LLP", city: "Mumbai", state: "Maharashtra", gst: "27FGHIJ5678K2Z9" },
] as const;

const SEED_ROOMS: Room[] = [
  { id: "room-101", number: "101", type: "Standard", floor: 1, capacity: 2, pricePerNight: 80, status: "Available", amenities: ["Wi-Fi", "Air Conditioning", "TV"] },
  { id: "room-102", number: "102", type: "Deluxe", floor: 1, capacity: 3, pricePerNight: 130, status: "Occupied", amenities: ["Wi-Fi", "Air Conditioning", "TV", "Mini Bar"] },
  { id: "room-201", number: "201", type: "Suite", floor: 2, capacity: 4, pricePerNight: 220, status: "Maintenance", amenities: ["Wi-Fi", "Air Conditioning", "TV", "Balcony", "Bathtub"] },
];

const STATUS_COLOR: Record<RoomStatus, string> = {
  Available: "text-emerald-600",
  Occupied: "text-sky-600",
  Maintenance: "text-amber-600",
};

/* ── nav ─────────────────────────────────────────────── */
type SectionId =
  | "general"
  | "rooms"
  | "types"
  | "rates"
  | "amenities"
  | "policies"
  | "taxes"
  | "channels"
  | "payments"
  | "legal";

const NAV: { id: SectionId; label: string; icon: React.ReactNode }[] = [
  { id: "general", label: "General", icon: <Settings2 className="h-3.5 w-3.5" /> },
  { id: "rooms", label: "Rooms", icon: <DoorOpen className="h-3.5 w-3.5" /> },
  { id: "types", label: "Room Types", icon: <BedDouble className="h-3.5 w-3.5" /> },
  { id: "rates", label: "Rate Plans", icon: <Tag className="h-3.5 w-3.5" /> },
  { id: "amenities", label: "Amenities", icon: <Sparkles className="h-3.5 w-3.5" /> },
  { id: "policies", label: "Policies", icon: <ScrollText className="h-3.5 w-3.5" /> },
  { id: "taxes", label: "Taxes & Fees", icon: <Receipt className="h-3.5 w-3.5" /> },
  { id: "channels", label: "Channels", icon: <Share2 className="h-3.5 w-3.5" /> },
  { id: "payments", label: "Payments", icon: <CreditCard className="h-3.5 w-3.5" /> },
  { id: "legal", label: "Legal Entity", icon: <Scale className="h-3.5 w-3.5" /> },
];

/* ── form ────────────────────────────────────────────── */
interface RoomForm {
  number: string;
  type: string;
  floor: string;
  capacity: string;
  pricePerNight: string;
  status: RoomStatus;
  amenities: string[];
}

const emptyForm: RoomForm = {
  number: "",
  type: ROOM_TYPES[0].name,
  floor: "1",
  capacity: "2",
  pricePerNight: String(ROOM_TYPES[0].basePrice),
  status: "Available",
  amenities: ["Wi-Fi", "Air Conditioning"],
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
    <div className="flex items-center justify-between px-3 py-2">
      <div className="min-w-0">
        <p className="truncate text-xs font-medium">{title}</p>
        {subtitle && (
          <p className="truncate text-[11px] text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {right}
    </div>
  );
}

/* ── sections ────────────────────────────────────────── */
function GeneralSection({
  stats,
}: {
  stats: { total: number; available: number; occupied: number; types: number };
}) {
  const [isActive, setIsActive] = useState(HOTEL.is_active);

  return (
    <div className="space-y-4">
      <SectionHead
        title="General"
        description="Core property details and operating configuration."
        action={
          <Button size="sm" variant="outline" className="h-7 px-2.5 text-xs">
            Save changes
          </Button>
        }
      />

      {/* compact stat strip */}
      <div className="grid grid-cols-2 divide-x divide-y rounded-md border sm:grid-cols-4 sm:divide-y-0">
        {[
          { label: "Total rooms", value: stats.total },
          { label: "Available", value: stats.available },
          { label: "Occupied", value: stats.occupied },
          { label: "Room types", value: stats.types },
        ].map((s) => (
          <div key={s.label} className="px-3 py-2">
            <p className="text-base font-semibold leading-none">{s.value}</p>
            <p className="mt-1 text-[11px] text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="space-y-2.5">
        <Field label="Hotel name">
          <Input defaultValue={HOTEL.name} className="h-8 max-w-sm text-sm" />
        </Field>
        <Field label="Brand / chain">
          <Input defaultValue={HOTEL.brand} className="h-8 max-w-sm text-sm" />
        </Field>
        <Field label="Star rating">
          <Select defaultValue={String(HOTEL.starRating)}>
            <SelectTrigger className="h-8 max-w-[150px] text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5].map((n) => (
                <SelectItem key={n} value={String(n)}>
                  {n} Star
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Currency">
          <Select defaultValue={HOTEL.currency}>
            <SelectTrigger className="h-8 max-w-[150px] text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {["USD", "EUR", "GBP", "INR", "AED"].map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Timezone">
          <Input defaultValue={HOTEL.timezone} className="h-8 max-w-sm text-sm" />
        </Field>
        <Field label="Check-in time">
          <Input type="time" defaultValue={HOTEL.checkIn} className="h-8 max-w-[150px] text-sm" />
        </Field>
        <Field label="Check-out time">
          <Input type="time" defaultValue={HOTEL.checkOut} className="h-8 max-w-[150px] text-sm" />
        </Field>
        <Field label="Total floors">
          <Input type="number" defaultValue={HOTEL.floors} className="h-8 max-w-[150px] text-sm" />
        </Field>
        <Field label="Operational status">
          <div className="flex items-center gap-2.5">
            <Switch checked={isActive} onCheckedChange={setIsActive} />
            <span className="text-xs text-foreground">
              {isActive ? "Active — accepting bookings" : "Inactive"}
            </span>
          </div>
        </Field>
      </div>
    </div>
  );
}

function RoomsSection({
  rooms,
  onAdd,
  onDelete,
}: {
  rooms: Room[];
  onAdd: () => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="space-y-4">
      <SectionHead
        title="Rooms"
        description="Every room configured for this hotel."
        action={
          <Button size="sm" variant="outline" className="h-7 px-2.5 text-xs" onClick={onAdd}>
            <Plus className="mr-1 h-3.5 w-3.5" />
            Add room
          </Button>
        }
      />

      {rooms.length === 0 ? (
        <div className="rounded-md border py-10 text-center">
          <p className="text-xs font-medium text-foreground">No rooms yet</p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            Use “Add room” to configure your first room.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-md border">
          {/* header */}
          <div className="grid grid-cols-[1fr_1fr_0.6fr_0.8fr_0.9fr_0.9fr_auto] gap-2 border-b bg-muted/40 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
            <span>Room</span>
            <span>Type</span>
            <span>Floor</span>
            <span>Capacity</span>
            <span>Price / night</span>
            <span>Status</span>
            <span className="text-right">·</span>
          </div>
          {/* rows */}
          <div className="divide-y">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="grid grid-cols-[1fr_1fr_0.6fr_0.8fr_0.9fr_0.9fr_auto] items-center gap-2 px-3 py-1.5 text-xs"
              >
                <span className="font-medium">{room.number}</span>
                <span className="text-muted-foreground">{room.type}</span>
                <span className="text-muted-foreground">{room.floor}</span>
                <span className="text-muted-foreground">{room.capacity}</span>
                <span className="text-muted-foreground">
                  {HOTEL.currency} {room.pricePerNight}
                </span>
                <span className={`font-medium ${STATUS_COLOR[room.status]}`}>
                  {room.status}
                </span>
                <button
                  onClick={() => onDelete(room.id)}
                  aria-label={`Remove room ${room.number}`}
                  className="justify-self-end text-muted-foreground transition-colors hover:text-destructive"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function TypesSection({ rooms }: { rooms: Room[] }) {
  return (
    <div className="space-y-4">
      <SectionHead
        title="Room Types"
        description="Categories and their base rates."
        action={
          <Button size="sm" variant="outline" className="h-7 px-2.5 text-xs">
            <Plus className="mr-1 h-3.5 w-3.5" />
            Add type
          </Button>
        }
      />
      <div className="divide-y rounded-md border">
        {ROOM_TYPES.map((t) => {
          const count = rooms.filter((r) => r.type === t.name).length;
          return (
            <ListRow
              key={t.name}
              title={t.name}
              subtitle={`${t.description} · Max ${t.maxOccupancy} guests`}
              right={
                <div className="flex items-center gap-4 text-right">
                  <span className="text-[11px] text-muted-foreground">
                    {count} {count === 1 ? "room" : "rooms"}
                  </span>
                  <span className="text-xs font-semibold">
                    {HOTEL.currency} {t.basePrice}
                  </span>
                </div>
              }
            />
          );
        })}
      </div>
    </div>
  );
}

function RatesSection() {
  return (
    <div className="space-y-4">
      <SectionHead
        title="Rate Plans"
        description="Meal plans and pricing offered at booking."
        action={
          <Button size="sm" variant="outline" className="h-7 px-2.5 text-xs">
            <Plus className="mr-1 h-3.5 w-3.5" />
            Add plan
          </Button>
        }
      />
      <div className="divide-y rounded-md border">
        {RATE_PLANS.map((p) => (
          <ListRow
            key={p.id}
            title={p.name}
            subtitle={p.meal}
            right={
              <div className="flex items-center gap-4">
                <span
                  className={`text-[11px] font-medium ${
                    p.refundable ? "text-emerald-600" : "text-muted-foreground"
                  }`}
                >
                  {p.refundable ? "Refundable" : "Non-refundable"}
                </span>
                <span className="text-xs font-semibold">
                  {HOTEL.currency} {p.rate}
                </span>
              </div>
            }
          />
        ))}
      </div>
    </div>
  );
}

function AmenitiesSection() {
  return (
    <div className="space-y-4">
      <SectionHead
        title="Amenities & Facilities"
        description="Available to assign to rooms and the property."
      />
      <div className="space-y-4">
        <div>
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Room amenities
          </p>
          <div className="flex flex-wrap gap-1.5">
            {ROOM_AMENITIES.map((a) => (
              <span key={a} className="rounded border px-2 py-0.5 text-[11px]">
                {a}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Property facilities
          </p>
          <div className="flex flex-wrap gap-1.5">
            {PROPERTY_FACILITIES.map((a) => (
              <span key={a} className="rounded border px-2 py-0.5 text-[11px]">
                {a}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PoliciesSection() {
  return (
    <div className="space-y-4">
      <SectionHead
        title="Policies"
        description="Guest-facing rules and conditions."
        action={
          <Button size="sm" variant="outline" className="h-7 px-2.5 text-xs">
            Edit
          </Button>
        }
      />
      <dl className="divide-y rounded-md border">
        {POLICIES.map((p) => (
          <div key={p.label} className="flex items-center justify-between px-3 py-2">
            <dt className="text-xs text-muted-foreground">{p.label}</dt>
            <dd className="text-xs font-medium">{p.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function TaxesSection() {
  return (
    <div className="space-y-4">
      <SectionHead
        title="Taxes & Fees"
        description="Applied to bookings and invoices."
        action={
          <Button size="sm" variant="outline" className="h-7 px-2.5 text-xs">
            <Plus className="mr-1 h-3.5 w-3.5" />
            Add tax
          </Button>
        }
      />
      <div className="divide-y rounded-md border">
        {TAXES.map((t) => (
          <ListRow
            key={t.id}
            title={t.name}
            subtitle={`${t.type} · Applies to ${t.applies}`}
            right={<span className="text-xs font-semibold">{t.rate}</span>}
          />
        ))}
      </div>
    </div>
  );
}

function ChannelsSection() {
  return (
    <div className="space-y-4">
      <SectionHead
        title="Distribution Channels"
        description="OTA and channel-manager connections."
      />
      <div className="divide-y rounded-md border">
        {CHANNELS.map((c) => (
          <div key={c.id} className="flex items-center justify-between px-3 py-2">
            <div>
              <p className="text-xs font-medium">{c.name}</p>
              <p className="text-[11px] text-muted-foreground">
                Commission {c.commission}
                {c.connected ? ` · ${c.rooms} rooms mapped` : ""}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`text-[11px] font-medium ${
                  c.connected ? "text-emerald-600" : "text-muted-foreground"
                }`}
              >
                {c.connected ? "Connected" : "Not connected"}
              </span>
              <Button size="sm" variant="ghost" className="h-6 px-2 text-[11px]">
                {c.connected ? "Manage" : "Connect"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PaymentsSection() {
  return (
    <div className="space-y-4">
      <SectionHead
        title="Payments"
        description="Gateway, accepted methods and deposit policy."
        action={
          <Button size="sm" variant="outline" className="h-7 px-2.5 text-xs">
            Save changes
          </Button>
        }
      />
      <div className="space-y-2.5">
        <Field label="Payment gateway">
          <Select defaultValue="stripe">
            <SelectTrigger className="h-8 max-w-sm text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {["stripe", "razorpay", "paypal", "adyen"].map((g) => (
                <SelectItem key={g} value={g} className="capitalize">
                  {g}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Deposit at booking">
          <Input defaultValue="20% of total" className="h-8 max-w-sm text-sm" />
        </Field>
      </div>
      <div>
        <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          Accepted methods
        </p>
        <div className="flex flex-wrap gap-1.5">
          {PAYMENT_METHODS.map((m) => (
            <span key={m} className="rounded border px-2 py-0.5 text-[11px]">
              {m}
            </span>
          ))}
        </div>
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
              {LEGAL_ENTITIES.map((e) => (
                <SelectItem key={e.id} value={e.id}>
                  {e.name}
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
                <dd className="font-mono text-[11px] font-medium">{current.gst}</dd>
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

/* ─────────────────────────────────────────────────────── */
const HotelConfigIndexPage = () => {
  const { propertyId, hotelID } = Route.useParams();
  const nav = useNavigate();

  const [active, setActive] = useState<SectionId>("general");
  const [rooms, setRooms] = useState<Room[]>(SEED_ROOMS);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<RoomForm>(emptyForm);

  const stats = useMemo(() => {
    const available = rooms.filter((r) => r.status === "Available").length;
    const occupied = rooms.filter((r) => r.status === "Occupied").length;
    const types = new Set(rooms.map((r) => r.type)).size;
    return { total: rooms.length, available, occupied, types };
  }, [rooms]);

  const setField = <K extends keyof RoomForm>(key: K, value: RoomForm[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const toggleAmenity = (amenity: string) =>
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));

  const numberTaken = rooms.some(
    (r) => r.number.toLowerCase() === form.number.trim().toLowerCase(),
  );
  const canSubmit = form.number.trim().length > 0 && !numberTaken;

  const handleAddRoom = () => {
    if (!canSubmit) return;
    const room: Room = {
      id: `room-${Date.now()}`,
      number: form.number.trim(),
      type: form.type,
      floor: Number(form.floor) || 1,
      capacity: Number(form.capacity) || 1,
      pricePerNight: Number(form.pricePerNight) || 0,
      status: form.status,
      amenities: form.amenities,
    };
    setRooms((prev) => [...prev, room]);
    toast.success(`Room ${room.number} added`);
    setForm(emptyForm);
    setDialogOpen(false);
  };

  const handleDeleteRoom = (id: string) => {
    setRooms((prev) => prev.filter((r) => r.id !== id));
    toast.success("Room removed");
  };

  const openAddDialog = () => {
    setForm(emptyForm);
    setDialogOpen(true);
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
          <Hotel className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-sm font-semibold leading-tight">
            {HOTEL.name}
          </h1>
          <p className="text-[11px] text-muted-foreground">
            Hotel configuration · {hotelID.slice(0, 8)}…
          </p>
        </div>
        <span
          className={`text-[11px] font-medium ${
            HOTEL.is_active ? "text-emerald-600" : "text-muted-foreground"
          }`}
        >
          {HOTEL.is_active ? "● Active" : "● Inactive"}
        </span>
      </div>

      {/* Sidebar + content */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-[170px_1fr]">
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

        <div>
          {active === "general" && <GeneralSection stats={stats} />}
          {active === "rooms" && (
            <RoomsSection
              rooms={rooms}
              onAdd={openAddDialog}
              onDelete={handleDeleteRoom}
            />
          )}
          {active === "types" && <TypesSection rooms={rooms} />}
          {active === "rates" && <RatesSection />}
          {active === "amenities" && <AmenitiesSection />}
          {active === "policies" && <PoliciesSection />}
          {active === "taxes" && <TaxesSection />}
          {active === "channels" && <ChannelsSection />}
          {active === "payments" && <PaymentsSection />}
          {active === "legal" && <LegalSection />}
        </div>
      </div>

      <AddRoomDialog
        open={dialogOpen}
        onOpenChange={(o) => {
          setDialogOpen(o);
          if (!o) setForm(emptyForm);
        }}
        form={form}
        setField={setField}
        toggleAmenity={toggleAmenity}
        numberTaken={numberTaken}
        canSubmit={canSubmit}
        onSubmit={handleAddRoom}
      />
    </div>
  );
};

/* ── add-room dialog ─────────────────────────────────── */
function AddRoomDialog({
  open,
  onOpenChange,
  form,
  setField,
  toggleAmenity,
  numberTaken,
  canSubmit,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: RoomForm;
  setField: <K extends keyof RoomForm>(key: K, value: RoomForm[K]) => void;
  toggleAmenity: (amenity: string) => void;
  numberTaken: boolean;
  canSubmit: boolean;
  onSubmit: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add room</DialogTitle>
          <DialogDescription>
            Configure a new room for this hotel.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="room-number">Room number</Label>
              <Input
                id="room-number"
                value={form.number}
                onChange={(e) => setField("number", e.target.value)}
                placeholder="e.g. 305"
                aria-invalid={numberTaken}
              />
              {numberTaken && (
                <p className="text-[11px] text-destructive">
                  That room number already exists.
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="room-floor">Floor</Label>
              <Input
                id="room-floor"
                type="number"
                min={0}
                value={form.floor}
                onChange={(e) => setField("floor", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Room type</Label>
              <Select
                value={form.type}
                onValueChange={(v) => {
                  setField("type", v);
                  const base = ROOM_TYPES.find((t) => t.name === v)?.basePrice;
                  if (base) setField("pricePerNight", String(base));
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {ROOM_TYPES.map((t) => (
                    <SelectItem key={t.name} value={t.name}>
                      {t.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Status</Label>
              <Select
                value={form.status}
                onValueChange={(v) => setField("status", v as RoomStatus)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(["Available", "Occupied", "Maintenance"] as const).map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="room-capacity">Capacity (guests)</Label>
              <Input
                id="room-capacity"
                type="number"
                min={1}
                value={form.capacity}
                onChange={(e) => setField("capacity", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="room-price">Price / night</Label>
              <Input
                id="room-price"
                type="number"
                min={0}
                value={form.pricePerNight}
                onChange={(e) => setField("pricePerNight", e.target.value)}
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label>Amenities</Label>
            <div className="grid grid-cols-2 gap-2">
              {ROOM_AMENITIES.map((amenity) => {
                const checked = form.amenities.includes(amenity);
                return (
                  <label
                    key={amenity}
                    className="flex cursor-pointer items-center gap-2 rounded-md border border-border/70 px-2.5 py-2 text-sm transition-colors hover:bg-muted/50"
                  >
                    <Checkbox
                      checked={checked}
                      onCheckedChange={() => toggleAmenity(amenity)}
                    />
                    <span className="truncate">{amenity}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSubmit} disabled={!canSubmit} className="gap-1.5">
            <Plus className="h-4 w-4" />
            Add room
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default HotelConfigIndexPage;
