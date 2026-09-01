import { useState } from "react";
import { motion } from "framer-motion";
import {
  Warehouse,
  Boxes,
  IndianRupee,
  AlertTriangle,
  Plus,
  MapPin,
  UserRound,
  ArrowDownToLine,
  ArrowUpFromLine,
  ArrowLeftRight,
  PackageSearch,
} from "lucide-react";
import { Button, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, toast, useModal } from "@sharpnr/ui";

/* ─────────────────────────────────────────────
   Dummy data (replace with Stockwave API)
───────────────────────────────────────────── */

type WarehouseRecord = {
  id: string;
  name: string;
  location: string;
  manager: string;
  type: string;
  capacityUsedPct: number;
  stockValue: number;
  skuCount: number;
  status: "active" | "maintenance";
};

const DUMMY_WAREHOUSES: WarehouseRecord[] = [
  {
    id: "wh-001",
    name: "Bengaluru Central Warehouse",
    location: "Bengaluru, Karnataka",
    manager: "Ramesh Iyer",
    type: "Warehouse",
    capacityUsedPct: 82,
    stockValue: 18450000,
    skuCount: 1240,
    status: "active",
  },
  {
    id: "wh-002",
    name: "Mumbai Distribution Hub",
    location: "Mumbai, Maharashtra",
    manager: "Sneha Kulkarni",
    type: "Distribution Center",
    capacityUsedPct: 67,
    stockValue: 13200000,
    skuCount: 980,
    status: "active",
  },
  {
    id: "wh-003",
    name: "Delhi NCR Fulfillment Center",
    location: "Gurugram, Delhi NCR",
    manager: "Aman Chadha",
    type: "Distribution Center",
    capacityUsedPct: 91,
    stockValue: 20575000,
    skuCount: 1560,
    status: "active",
  },
  {
    id: "wh-004",
    name: "Chennai Cold Storage",
    location: "Chennai, Tamil Nadu",
    manager: "Divya Raghavan",
    type: "Cold Storage",
    capacityUsedPct: 45,
    stockValue: 5820000,
    skuCount: 410,
    status: "maintenance",
  },
  {
    id: "wh-005",
    name: "Pune Regional Depot",
    location: "Pune, Maharashtra",
    manager: "Karan Malhotra",
    type: "Warehouse",
    capacityUsedPct: 73,
    stockValue: 9640000,
    skuCount: 720,
    status: "active",
  },
];

type LowStockItem = {
  id: string;
  name: string;
  sku: string;
  warehouse: string;
  quantity: number;
  reorderLevel: number;
  severity: "critical" | "low";
};

const DUMMY_LOW_STOCK: LowStockItem[] = [
  {
    id: "ls-001",
    name: "USB-C Charging Cable 1m",
    sku: "ELEC-0231",
    warehouse: "Bengaluru Central",
    quantity: 18,
    reorderLevel: 100,
    severity: "critical",
  },
  {
    id: "ls-002",
    name: "Stainless Steel Hinges",
    sku: "HW-0442",
    warehouse: "Pune Regional Depot",
    quantity: 9,
    reorderLevel: 80,
    severity: "critical",
  },
  {
    id: "ls-003",
    name: "A4 Copier Paper (Ream)",
    sku: "OFF-0119",
    warehouse: "Delhi NCR Fulfillment",
    quantity: 42,
    reorderLevel: 150,
    severity: "low",
  },
  {
    id: "ls-004",
    name: "Bubble Wrap Roll 50m",
    sku: "PKG-0087",
    warehouse: "Mumbai Distribution Hub",
    quantity: 27,
    reorderLevel: 60,
    severity: "low",
  },
];

type StockMovement = {
  id: string;
  item: string;
  type: "inbound" | "outbound" | "transfer";
  warehouse: string;
  quantity: number;
  reference: string;
  date: string;
};

const DUMMY_MOVEMENTS: StockMovement[] = [
  {
    id: "mv-001",
    item: "LED Panel Light 40W",
    type: "inbound",
    warehouse: "Bengaluru Central",
    quantity: 500,
    reference: "PO-8821",
    date: "2026-07-24",
  },
  {
    id: "mv-002",
    item: "Wireless Mouse",
    type: "outbound",
    warehouse: "Delhi NCR Fulfillment",
    quantity: 120,
    reference: "SO-4471",
    date: "2026-07-24",
  },
  {
    id: "mv-003",
    item: "Packaging Tape",
    type: "transfer",
    warehouse: "Mumbai → Pune",
    quantity: 300,
    reference: "TR-1042",
    date: "2026-07-23",
  },
  {
    id: "mv-004",
    item: "Corrugated Boxes (M)",
    type: "inbound",
    warehouse: "Chennai Cold Storage",
    quantity: 2000,
    reference: "PO-8790",
    date: "2026-07-22",
  },
  {
    id: "mv-005",
    item: "Office Chair - Ergo",
    type: "outbound",
    warehouse: "Pune Regional Depot",
    quantity: 35,
    reference: "SO-4455",
    date: "2026-07-22",
  },
];

const STOCK_CATEGORIES = [
  { name: "Electronics", pct: 34 },
  { name: "Packaging Materials", pct: 22 },
  { name: "Furniture & Fixtures", pct: 18 },
  { name: "Raw Materials", pct: 15 },
  { name: "Office Supplies", pct: 11 },
];

const MOVEMENT_META: Record<
  StockMovement["type"],
  { icon: React.ElementType; color: string; label: string }
> = {
  inbound: {
    icon: ArrowDownToLine,
    color: "text-emerald-500",
    label: "Inbound",
  },
  outbound: {
    icon: ArrowUpFromLine,
    color: "text-rose-500",
    label: "Outbound",
  },
  transfer: {
    icon: ArrowLeftRight,
    color: "text-sky-500",
    label: "Transfer",
  },
};

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────── */

const formatINR = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

/* ─────────────────────────────────────────────
   Add Warehouse form (dummy — replace with mutation)
───────────────────────────────────────────── */

function AddWarehouseForm({
  closeModal,
  onCreate,
}: {
  closeModal: () => void;
  onCreate: (warehouse: WarehouseRecord) => void;
}) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [manager, setManager] = useState("");
  const [type, setType] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const canSubmit =
    name.trim().length > 1 &&
    location.trim().length > 1 &&
    manager.trim().length > 1 &&
    !!type &&
    !submitting;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      // TODO: wire to real mutation, e.g. createWarehouseMutation({ name, location, manager, type })
      await new Promise((resolve) => setTimeout(resolve, 600));
      onCreate({
        id: `wh-${Date.now()}`,
        name,
        location,
        manager,
        type,
        capacityUsedPct: 0,
        stockValue: 0,
        skuCount: 0,
        status: "active",
      });
      toast.success(`${name} added to Stockwave`);
      closeModal();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="wh-name">Warehouse name</Label>
        <Input
          id="wh-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Hyderabad Central Warehouse"
          autoFocus
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="wh-location">Location</Label>
        <Input
          id="wh-location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g. Hyderabad, Telangana"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="wh-manager">Warehouse manager</Label>
        <Input
          id="wh-manager"
          value={manager}
          onChange={(e) => setManager(e.target.value)}
          placeholder="e.g. Sanjay Kumar"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="wh-type">Type</Label>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger id="wh-type" className="w-full">
            <SelectValue placeholder="Select a type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Warehouse">Warehouse</SelectItem>
            <SelectItem value="Distribution Center">
              Distribution Center
            </SelectItem>
            <SelectItem value="Cold Storage">Cold Storage</SelectItem>
            <SelectItem value="Store">Store</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-end gap-2 pt-2">
        <Button type="button" variant="ghost" onClick={closeModal}>
          Cancel
        </Button>
        <Button type="submit" disabled={!canSubmit}>
          <Plus className="h-4 w-4" />
          {submitting ? "Adding…" : "Add Warehouse"}
        </Button>
      </div>
    </form>
  );
}

/* ─────────────────────────────────────────────
   Stat card
───────────────────────────────────────────── */

function StatCard({
  title,
  value,
  icon: Icon,
  color,
  border,
  bg,
  index,
}: {
  title: string;
  value: string;
  icon: React.ElementType;
  color: string;
  border: string;
  bg: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.06 }}
      className={`flex items-center gap-4 px-5 py-4 rounded-2xl border ${border} ${bg}`}
    >
      <div
        className={`size-9 rounded-xl ${bg} border ${border} flex items-center justify-center shrink-0`}
      >
        <Icon className={`size-4 ${color}`} />
      </div>
      <div>
        <p className="cf-mono text-[10px] tracking-widest uppercase text-muted-foreground/60">
          {title}
        </p>
        <p
          className={`font-display italic text-2xl tabular-nums mt-0.5 ${color}`}
        >
          {value}
        </p>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Warehouse card
───────────────────────────────────────────── */

function WarehouseCard({
  warehouse,
  index,
}: {
  warehouse: WarehouseRecord;
  index: number;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="group relative rounded-2xl border border-border/60 bg-background/70 backdrop-blur-sm p-5 hover:border-primary/30 hover:shadow-[0_8px_28px_hsl(var(--primary)/0.1)] transition-all duration-200 overflow-hidden"
    >
      <div className="absolute inset-0 bg-linear-to-br from-primary/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl" />

      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-linear-to-br from-primary/25 to-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
            <Warehouse className="size-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground leading-tight">
              {warehouse.name}
            </p>
            <p className="cf-mono text-[10px] text-muted-foreground tracking-widest uppercase">
              {warehouse.type}
            </p>
          </div>
        </div>

        <span
          className={`cf-mono text-[10px] px-2 py-0.5 rounded-lg border shrink-0 ${
            warehouse.status === "active"
              ? "bg-primary/10 border-primary/20 text-primary"
              : "bg-amber-500/10 border-amber-500/20 text-amber-500"
          }`}
        >
          {warehouse.status}
        </span>
      </div>

      <div className="h-px bg-border/40 mb-4" />

      <div className="space-y-1.5 mb-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <UserRound className="size-3 shrink-0" />
          <span>{warehouse.manager}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <MapPin className="size-3 shrink-0" />
          <span>{warehouse.location}</span>
        </div>
      </div>

      {/* capacity bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between text-[10px] cf-mono uppercase tracking-widest text-muted-foreground/60 mb-1">
          <span>Capacity used</span>
          <span>{warehouse.capacityUsedPct}%</span>
        </div>
        <div className="h-2 rounded-full bg-muted/50 overflow-hidden">
          <div
            className={`h-full rounded-full ${
              warehouse.capacityUsedPct >= 90
                ? "bg-rose-500"
                : warehouse.capacityUsedPct >= 75
                  ? "bg-amber-500"
                  : "bg-primary"
            }`}
            style={{ width: `${warehouse.capacityUsedPct}%` }}
          />
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <span className="cf-mono text-[10px] px-2 py-0.5 rounded-lg border bg-muted/30 border-border/40 text-muted-foreground flex items-center gap-1">
          <Boxes className="size-2.5" />
          {warehouse.skuCount.toLocaleString("en-IN")} SKUs
        </span>
        <span className="cf-mono text-[10px] px-2 py-0.5 rounded-lg border bg-muted/30 border-border/40 text-muted-foreground ml-auto">
          {formatINR(warehouse.stockValue)}
        </span>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */

const StockwaveIndexPage = () => {
  const { openModal, closeModal } = useModal();
  const [warehouses, setWarehouses] = useState(DUMMY_WAREHOUSES);

  const totalSkus = warehouses.reduce((sum, w) => sum + w.skuCount, 0);
  const totalValue = warehouses.reduce((sum, w) => sum + w.stockValue, 0);

  const handleAddWarehouse = () => {
    openModal({
      title: "Add Warehouse",
      description: "Register a new warehouse or storage location in Stockwave.",
      content: (
        <AddWarehouseForm
          closeModal={closeModal}
          onCreate={(w) => setWarehouses((prev) => [w, ...prev])}
        />
      ),
    });
  };

  return (
    <div className="cf-font relative z-10 flex flex-col p-6 md:p-10 gap-8">
      {/* header */}
      <motion.div
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-5"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary cf-mono text-[10px] tracking-widest uppercase">
            <Warehouse className="size-3" /> Inventory Management
          </span>

          <h1 className="font-display italic text-5xl md:text-6xl text-foreground leading-none">
            Stockwave
          </h1>

          <p className="text-xs text-muted-foreground max-w-md">
            Track warehouses, stock levels, and movements across your entire
            organization.
          </p>
        </div>

        <Button onClick={handleAddWarehouse} size="sm">
          <Plus className="size-3.5" />
          Add Warehouse
        </Button>
      </motion.div>

      {/* stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          index={0}
          title="Warehouses"
          value={String(warehouses.length)}
          icon={Warehouse}
          color="text-primary"
          border="border-primary/20"
          bg="bg-primary/5"
        />
        <StatCard
          index={1}
          title="Total SKUs"
          value={totalSkus.toLocaleString("en-IN")}
          icon={Boxes}
          color="text-sky-400"
          border="border-sky-400/20"
          bg="bg-sky-400/5"
        />
        <StatCard
          index={2}
          title="Stock Value"
          value={formatINR(totalValue)}
          icon={IndianRupee}
          color="text-emerald-400"
          border="border-emerald-400/20"
          bg="bg-emerald-400/5"
        />
        <StatCard
          index={3}
          title="Low Stock Alerts"
          value={String(DUMMY_LOW_STOCK.length)}
          icon={AlertTriangle}
          color="text-rose-400"
          border="border-rose-400/20"
          bg="bg-rose-400/5"
        />
      </div>

      {/* warehouses */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Warehouse className="size-4 text-muted-foreground" />
          <h2 className="font-display italic text-2xl text-foreground">
            Warehouses
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {warehouses.map((warehouse, i) => (
            <WarehouseCard key={warehouse.id} warehouse={warehouse} index={i} />
          ))}
        </div>
      </div>

      {/* movements + alerts + categories */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* recent stock movements */}
        <div className="lg:col-span-2 rounded-2xl border border-border/60 bg-background/70 backdrop-blur-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <PackageSearch className="size-4 text-muted-foreground" />
            <h2 className="font-display italic text-xl text-foreground">
              Recent Stock Movements
            </h2>
          </div>

          <div className="flex flex-col divide-y divide-border/40">
            {DUMMY_MOVEMENTS.map((movement) => {
              const meta = MOVEMENT_META[movement.type];
              const Icon = meta.icon;
              return (
                <div
                  key={movement.id}
                  className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0"
                >
                  <div className="size-8 rounded-lg bg-muted/40 border border-border/40 flex items-center justify-center shrink-0">
                    <Icon className={`size-3.5 ${meta.color}`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground truncate">
                      {movement.item}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {movement.warehouse} · {meta.label}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-semibold tabular-nums text-foreground">
                      {movement.quantity.toLocaleString("en-IN")}
                    </p>
                    <p className="cf-mono text-[10px] text-muted-foreground/60">
                      {movement.reference}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* right column: low stock + categories */}
        <div className="flex flex-col gap-4">
          {/* low stock alerts */}
          <div className="rounded-2xl border border-border/60 bg-background/70 backdrop-blur-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="size-4 text-muted-foreground" />
              <h2 className="font-display italic text-xl text-foreground">
                Low Stock Alerts
              </h2>
            </div>

            <div className="flex flex-col gap-2.5">
              {DUMMY_LOW_STOCK.map((item) => (
                <div key={item.id} className="flex items-start gap-2.5">
                  <span
                    className={`mt-1 size-1.5 rounded-full shrink-0 ${
                      item.severity === "critical"
                        ? "bg-rose-500"
                        : "bg-amber-500"
                    }`}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-foreground truncate">
                      {item.name}
                    </p>
                    <p className="cf-mono text-[10px] text-muted-foreground/60">
                      {item.sku} · {item.warehouse}
                    </p>
                  </div>
                  <span
                    className={`cf-mono text-[10px] px-1.5 py-0.5 rounded-md border shrink-0 ${
                      item.severity === "critical"
                        ? "bg-rose-500/10 border-rose-500/20 text-rose-500"
                        : "bg-amber-500/10 border-amber-500/20 text-amber-500"
                    }`}
                  >
                    {item.quantity}/{item.reorderLevel}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* stock by category */}
          <div className="rounded-2xl border border-border/60 bg-background/70 backdrop-blur-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <Boxes className="size-4 text-muted-foreground" />
              <h2 className="font-display italic text-xl text-foreground">
                Stock by Category
              </h2>
            </div>

            <div className="flex flex-col gap-3">
              {STOCK_CATEGORIES.map((category) => (
                <div key={category.name}>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                    <span>{category.name}</span>
                    <span className="cf-mono tabular-nums">
                      {category.pct}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-muted/50 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${category.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockwaveIndexPage;
