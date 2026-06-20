import { useState } from "react";
import {
  Building2,
  ChefHat,
  CheckCircle2,
  Clock,
  Flame,
  LayoutGrid,
  Pencil,
  Plus,
  Scale,
  Settings2,
  Trash2,
  UtensilsCrossed,
  Users,
} from "lucide-react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
  is_configured: true,
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
  {
    id: "k1",
    name: "Main Kitchen",
    type: "Hot Kitchen",
    stations: 6,
    is_active: true,
  },
  {
    id: "k2",
    name: "Bakery & Desserts",
    type: "Cold Kitchen",
    stations: 3,
    is_active: true,
  },
  {
    id: "k3",
    name: "Tandoor Section",
    type: "Grill",
    stations: 2,
    is_active: false,
  },
];

type DummyMenu = {
  id: string;
  name: string;
  items: number;
  active: boolean;
};

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
  {
    id: "le1",
    name: "Copper Hospitality Pvt. Ltd.",
    city: "Bengaluru",
    state: "Karnataka",
    gst: "29ABCDE1234F1Z5",
  },
  {
    id: "le2",
    name: "Spoon Foods LLP",
    city: "Mumbai",
    state: "Maharashtra",
    gst: "27FGHIJ5678K2Z9",
  },
];

/* ─────────────────────────────────────────────
   Tab configuration
───────────────────────────────────────────── */
type TabId = "general" | "layout" | "menu" | "legal";

const TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: "general", label: "General", icon: <Settings2 className="h-4 w-4" /> },
  {
    id: "layout",
    label: "Tables & Kitchen",
    icon: <LayoutGrid className="h-4 w-4" />,
  },
  { id: "menu", label: "Menu", icon: <UtensilsCrossed className="h-4 w-4" /> },
  { id: "legal", label: "Legal Entity", icon: <Scale className="h-4 w-4" /> },
];

/* ─────────────────────────────────────────────
   Motion variants
───────────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, delay: i * 0.07, ease: EASE },
  }),
};

const tabContent: Variants = {
  hidden: { opacity: 0, x: 10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: EASE } },
  exit: { opacity: 0, x: -10, transition: { duration: 0.18 } },
};

/* ─────────────────────────────────────────────
   Small shared pieces
───────────────────────────────────────────── */
function InfoItem({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="text-sm font-medium">{value || "-"}</p>
    </div>
  );
}

function SectionHeader({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-row items-start justify-between gap-4">
      <div>
        <h2 className="text-base font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {action}
    </div>
  );
}

/* ─────────────────────────────────────────────
   General tab
───────────────────────────────────────────── */
function GeneralTab() {
  const [isActive, setIsActive] = useState(RESTAURANT.is_active);

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Restaurant General Settings"
        description="Configure basic information and operating hours"
        action={
          <Button size="sm">
            <Pencil className="mr-1.5 h-4 w-4" />
            Update Details
          </Button>
        }
      />

      <Card
        className={
          isActive
            ? "border-green-300"
            : "border-red-200 bg-red-50 dark:bg-red-950/20"
        }
      >
        <CardHeader>
          <CardTitle className={isActive ? "" : "text-red-700 dark:text-red-400"}>
            Restaurant Operational Status
          </CardTitle>
          <CardDescription>
            Control whether this restaurant is currently operational. When the
            restaurant is inactive, customers will not be able to browse menus or
            place orders.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <Label htmlFor="restaurant-active">
                {isActive
                  ? "Restaurant is Operational and Running"
                  : "Restaurant is Currently Inactive"}
              </Label>
              <p
                className={`text-sm ${
                  isActive
                    ? "text-muted-foreground"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {isActive
                  ? "Customers can browse menus and place orders."
                  : "Restaurant operations are currently stopped."}
              </p>
            </div>
            <Switch
              id="restaurant-active"
              checked={isActive}
              onCheckedChange={setIsActive}
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <InfoItem label="Restaurant Name" value={RESTAURANT.name} />
        <InfoItem label="Cuisine" value={RESTAURANT.cuisine} />
        <InfoItem label="Opening Time" value={RESTAURANT.opening_time} />
        <InfoItem label="Closing Time" value={RESTAURANT.closing_time} />
        <InfoItem
          label="Seating Capacity"
          value={`${RESTAURANT.seating_capacity} guests`}
        />
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Status
          </p>
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
              isActive
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {isActive ? "Active" : "Inactive"}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Tables & Kitchen tab
───────────────────────────────────────────── */
function LayoutTab() {
  return (
    <div className="space-y-6">
      {/* Floors & Tables */}
      <div className="space-y-3">
        <SectionHeader
          title="Floors & Tables"
          description="Manage seating layout across floors"
          action={
            <Button size="sm">
              <Plus className="mr-1.5 h-4 w-4" />
              Add Floor
            </Button>
          }
        />

        {FLOORS.map((floor) => (
          <Card key={floor.id} className="rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg">{floor.name}</CardTitle>
                <Badge variant="secondary">{floor.tables.length} tables</Badge>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Pencil className="mr-1 h-4 w-4" />
                  Edit
                </Button>
                <Button size="sm" variant="destructive">
                  <Trash2 className="mr-1 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {floor.tables.map((table) => (
                  <div
                    key={table.id}
                    className="flex h-16 w-16 flex-col items-center justify-center rounded-md border bg-muted text-xs font-medium"
                  >
                    <span>{table.name}</span>
                    <span className="mt-0.5 flex items-center gap-0.5 text-[10px] text-muted-foreground">
                      <Users className="h-2.5 w-2.5" />
                      {table.seats}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Kitchens */}
      <div className="space-y-3">
        <SectionHeader
          title="Kitchens"
          description="Kitchen stations linked to this restaurant"
          action={
            <Button size="sm">
              <Plus className="mr-1.5 h-4 w-4" />
              Add Kitchen
            </Button>
          }
        />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {KITCHENS.map((kitchen) => (
            <Card key={kitchen.id} className="rounded-2xl">
              <CardContent className="space-y-3 p-4">
                <div className="flex items-start justify-between">
                  <div className="rounded-lg bg-primary/10 p-2.5">
                    <Flame className="h-4 w-4 text-primary" />
                  </div>
                  <Badge variant={kitchen.is_active ? "default" : "secondary"}>
                    {kitchen.is_active ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-semibold">{kitchen.name}</p>
                  <p className="text-xs text-muted-foreground">{kitchen.type}</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <ChefHat className="h-3.5 w-3.5" />
                  {kitchen.stations} stations
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Menu tab
───────────────────────────────────────────── */
function MenuTab() {
  return (
    <div className="space-y-3">
      <SectionHeader
        title="Menu Settings"
        description="Organize menus available to customers"
        action={
          <Button size="sm">
            <Plus className="mr-1.5 h-4 w-4" />
            Add Menu
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {MENUS.map((menu) => (
          <Card key={menu.id} className="rounded-2xl">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2.5">
                  <UtensilsCrossed className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{menu.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {menu.items} items
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                    menu.active
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {menu.active ? "Published" : "Draft"}
                </span>
                <Button size="sm" variant="outline">
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Legal Entity tab
───────────────────────────────────────────── */
function LegalTab() {
  const [selectedId, setSelectedId] = useState<string>(LEGAL_ENTITIES[0].id);
  const current = LEGAL_ENTITIES.find((e) => e.id === selectedId);

  return (
    <div className="space-y-3">
      <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
        <Scale className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
        <p className="text-sm leading-snug text-blue-700">
          Select the <span className="font-medium">legal entity</span> that owns
          this restaurant. This is used for billing, compliance, and reporting.
        </p>
      </div>

      {current && (
        <div className="overflow-hidden rounded-xl border bg-card">
          <div className="flex items-center gap-1.5 border-b border-emerald-100 bg-emerald-50 px-4 py-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
            <span className="text-xs font-medium text-emerald-700">
              Legal entity assigned
            </span>
          </div>
          <div className="flex items-center gap-3 p-4">
            <div className="shrink-0 rounded-lg bg-primary/10 p-2.5">
              <Building2 className="h-4 w-4 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{current.name}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {current.city}, {current.state}
              </p>
              <div className="mt-1 flex items-center gap-1.5">
                <span className="text-xs text-muted-foreground">GST:</span>
                <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
                  {current.gst}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3 rounded-xl border bg-card p-4">
        <Label className="text-sm font-medium">Change Legal Entity</Label>
        <Select value={selectedId} onValueChange={setSelectedId}>
          <SelectTrigger className="h-10 w-full">
            <SelectValue placeholder="Select a legal entity…" />
          </SelectTrigger>
          <SelectContent>
            {LEGAL_ENTITIES.map((entity) => (
              <SelectItem key={entity.id} value={entity.id}>
                <div className="flex flex-col py-0.5">
                  <span className="font-medium">{entity.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {entity.city}, {entity.state}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">
          Can't find the right entity?{" "}
          <button className="font-medium text-primary underline-offset-2 hover:underline">
            Add a new legal entity
          </button>
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
const RestaurantConfigIndexPage = () => {
  const [activeTab, setActiveTab] = useState<TabId>("general");

  return (
    <div>
      {/* Hero header */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0}
        className="relative mb-2 flex items-center gap-3 overflow-hidden rounded-xl border px-4 py-3 shadow-sm"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 100% at 0% 50%, hsl(var(--primary)/0.06) 0%, transparent 70%)",
          }}
        />
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20">
          <ChefHat className="h-4 w-4 text-primary" />
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="text-sm font-semibold leading-none text-foreground">
            {RESTAURANT.name} · Configuration
          </h1>
          <p className="mt-1 truncate text-xs text-muted-foreground">
            Manage layout, kitchen, menu, operating hours and core
            configuration.
          </p>
        </div>
        <Badge
          variant={RESTAURANT.is_active ? "default" : "secondary"}
          className="shrink-0 gap-1"
        >
          <Clock className="h-3 w-3" />
          {RESTAURANT.opening_time}–{RESTAURANT.closing_time}
        </Badge>
      </motion.div>

      {/* Tab bar */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={1}
        className="mb-4"
      >
        <div className="relative flex gap-1 rounded-xl border bg-muted/40 p-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={[
                "relative flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5",
                "text-sm font-medium transition-colors duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
                activeTab === tab.id
                  ? "text-foreground"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
              ].join(" ")}
            >
              {activeTab === tab.id && (
                <motion.span
                  layoutId="restaurant-config-tab-pill"
                  className="absolute inset-0 rounded-lg bg-background shadow-sm ring-1 ring-border/60"
                  transition={{ type: "spring", stiffness: 380, damping: 34 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Tab content */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={1.5}
        className="rounded-xl border shadow-sm"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={tabContent}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="p-5"
          >
            {activeTab === "general" && <GeneralTab />}
            {activeTab === "layout" && <LayoutTab />}
            {activeTab === "menu" && <MenuTab />}
            {activeTab === "legal" && <LegalTab />}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default RestaurantConfigIndexPage;
