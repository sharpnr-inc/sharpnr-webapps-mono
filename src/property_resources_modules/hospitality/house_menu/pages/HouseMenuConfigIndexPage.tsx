/*
 * House Menu Configuration (DUMMY).
 * Rendered at /property/$propertyId/resources/hospitality/house_menu/$menuID
 *
 * A house menu is a property-level resource that can be assigned to outlets.
 * No menu API yet, so everything is local/seed data. Items support add/delete
 * in local state; remaining sections render reference dummy data. Flat + dense,
 * sidebar-driven, fully responsive. Swap constants + local state for real
 * queries/mutations when the backend is ready.
 */

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  LayoutList,
  Leaf,
  Plus,
  Receipt,
  Settings2,
  SlidersHorizontal,
  Store,
  Trash2,
  UtensilsCrossed,
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
import { Route } from "@/routes/_appuser/property/$propertyId/resources/hospitality/house_menu/$menuID/index";

/* ── domain (dummy) ──────────────────────────────────── */
const CURRENCY = "$";

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  veg: boolean;
  available: boolean;
}

const MENU = {
  name: "House Dining Menu",
  description: "Shared à la carte menu used across in-house outlets.",
  type: "À la carte",
  is_active: true,
};

const CATEGORIES = [
  "Starters",
  "Soups & Salads",
  "Mains",
  "Breads & Rice",
  "Desserts",
  "Beverages",
] as const;

const SEED_ITEMS: MenuItem[] = [
  { id: "it1", name: "Paneer Tikka", category: "Starters", price: 9.5, veg: true, available: true },
  { id: "it2", name: "Chicken 65", category: "Starters", price: 10.0, veg: false, available: true },
  { id: "it3", name: "Tomato Basil Soup", category: "Soups & Salads", price: 6.0, veg: true, available: true },
  { id: "it4", name: "Butter Chicken", category: "Mains", price: 15.0, veg: false, available: true },
  { id: "it5", name: "Dal Makhani", category: "Mains", price: 12.0, veg: true, available: true },
  { id: "it6", name: "Garlic Naan", category: "Breads & Rice", price: 3.5, veg: true, available: true },
  { id: "it7", name: "Gulab Jamun", category: "Desserts", price: 5.5, veg: true, available: false },
  { id: "it8", name: "Masala Chai", category: "Beverages", price: 2.5, veg: true, available: true },
];

const MODIFIER_GROUPS = [
  { id: "mg1", name: "Spice Level", type: "Single choice", options: ["Mild", "Medium", "Hot"], required: true },
  { id: "mg2", name: "Add-ons", type: "Multi choice", options: ["Extra Cheese", "Extra Sauce", "Fried Egg"], required: false },
  { id: "mg3", name: "Portion Size", type: "Single choice", options: ["Half", "Full"], required: true },
] as const;

const DAYPARTS = [
  { id: "dp1", name: "Breakfast", start: "07:00", end: "11:00", active: true },
  { id: "dp2", name: "Lunch", start: "12:00", end: "16:00", active: true },
  { id: "dp3", name: "Dinner", start: "19:00", end: "23:30", active: true },
  { id: "dp4", name: "Late Night", start: "23:30", end: "01:00", active: false },
] as const;

const OUTLETS = [
  { id: "o1", name: "The Copper Spoon", type: "Restaurant", assigned: true },
  { id: "o2", name: "Rooftop Bar", type: "Bar", assigned: true },
  { id: "o3", name: "Poolside Café", type: "Café", assigned: false },
  { id: "o4", name: "Room Service", type: "In-room dining", assigned: true },
] as const;

const TAX_CLASS = "Standard (12% GST)";
const SERVICE_CHARGE = "10%";

/* ── nav ─────────────────────────────────────────────── */
type SectionId =
  | "general"
  | "categories"
  | "items"
  | "modifiers"
  | "availability"
  | "pricing"
  | "outlets";

const NAV: { id: SectionId; label: string; icon: React.ReactNode }[] = [
  { id: "general", label: "General", icon: <Settings2 className="h-3.5 w-3.5" /> },
  { id: "categories", label: "Categories", icon: <LayoutList className="h-3.5 w-3.5" /> },
  { id: "items", label: "Items", icon: <UtensilsCrossed className="h-3.5 w-3.5" /> },
  { id: "modifiers", label: "Modifiers", icon: <SlidersHorizontal className="h-3.5 w-3.5" /> },
  { id: "availability", label: "Availability", icon: <Clock className="h-3.5 w-3.5" /> },
  { id: "pricing", label: "Pricing & Tax", icon: <Receipt className="h-3.5 w-3.5" /> },
  { id: "outlets", label: "Assigned Outlets", icon: <Store className="h-3.5 w-3.5" /> },
];

/* ── item form ───────────────────────────────────────── */
interface ItemForm {
  name: string;
  category: string;
  price: string;
  veg: boolean;
  available: boolean;
}

const emptyItem: ItemForm = {
  name: "",
  category: CATEGORIES[0],
  price: "",
  veg: true,
  available: true,
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
  itemCount,
  availableCount,
}: {
  itemCount: number;
  availableCount: number;
}) {
  const [isActive, setIsActive] = useState(MENU.is_active);

  return (
    <div className="space-y-4">
      <SectionHead
        title="General"
        description="Menu identity and publication state."
        action={
          <Button size="sm" variant="outline" className="h-7 px-2.5 text-xs">
            Save changes
          </Button>
        }
      />

      <div className="grid grid-cols-2 divide-x divide-y rounded-md border sm:grid-cols-4 sm:divide-y-0">
        {[
          { label: "Items", value: itemCount },
          { label: "Available", value: availableCount },
          { label: "Categories", value: CATEGORIES.length },
          { label: "Outlets", value: OUTLETS.filter((o) => o.assigned).length },
        ].map((s) => (
          <div key={s.label} className="px-3 py-2">
            <p className="text-base font-semibold leading-none">{s.value}</p>
            <p className="mt-1 text-[11px] text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="space-y-2.5">
        <Field label="Menu name">
          <Input defaultValue={MENU.name} className="h-8 w-full max-w-sm text-sm" />
        </Field>
        <Field label="Description">
          <Input defaultValue={MENU.description} className="h-8 w-full max-w-md text-sm" />
        </Field>
        <Field label="Menu type">
          <Select defaultValue={MENU.type}>
            <SelectTrigger className="h-8 w-full max-w-sm text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {["À la carte", "Buffet", "Set Menu", "Combo"].map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Published">
          <div className="flex items-center gap-2.5">
            <Switch checked={isActive} onCheckedChange={setIsActive} />
            <span className="text-xs text-foreground">
              {isActive ? "Visible to customers" : "Hidden (draft)"}
            </span>
          </div>
        </Field>
      </div>
    </div>
  );
}

function CategoriesSection({ items }: { items: MenuItem[] }) {
  return (
    <div className="space-y-4">
      <SectionHead
        title="Categories"
        description="Sections used to group menu items."
        action={
          <Button size="sm" variant="outline" className="h-7 px-2.5 text-xs">
            <Plus className="mr-1 h-3.5 w-3.5" />
            Add category
          </Button>
        }
      />
      <div className="divide-y rounded-md border">
        {CATEGORIES.map((c) => {
          const count = items.filter((i) => i.category === c).length;
          return (
            <ListRow
              key={c}
              title={c}
              right={
                <span className="text-[11px] text-muted-foreground">
                  {count} {count === 1 ? "item" : "items"}
                </span>
              }
            />
          );
        })}
      </div>
    </div>
  );
}

function ItemsSection({
  items,
  onAdd,
  onDelete,
}: {
  items: MenuItem[];
  onAdd: () => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="space-y-4">
      <SectionHead
        title="Items"
        description="Dishes and drinks on this menu."
        action={
          <Button size="sm" variant="outline" className="h-7 px-2.5 text-xs" onClick={onAdd}>
            <Plus className="mr-1 h-3.5 w-3.5" />
            Add item
          </Button>
        }
      />

      {items.length === 0 ? (
        <div className="rounded-md border py-10 text-center">
          <p className="text-xs font-medium text-foreground">No items yet</p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            Use “Add item” to build out your menu.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-md border">
          <div className="min-w-[460px]">
            <div className="grid grid-cols-[1.6fr_1.2fr_0.7fr_0.9fr_auto] gap-2 border-b bg-muted/40 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              <span>Item</span>
              <span>Category</span>
              <span>Price</span>
              <span>Status</span>
              <span className="text-right">·</span>
            </div>
            <div className="divide-y">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[1.6fr_1.2fr_0.7fr_0.9fr_auto] items-center gap-2 px-3 py-1.5 text-xs"
                >
                  <span className="flex min-w-0 items-center gap-1.5 font-medium">
                    <Leaf
                      className={`h-3 w-3 shrink-0 ${
                        item.veg ? "text-emerald-600" : "text-rose-500"
                      }`}
                    />
                    <span className="truncate">{item.name}</span>
                  </span>
                  <span className="truncate text-muted-foreground">{item.category}</span>
                  <span className="text-muted-foreground">
                    {CURRENCY}
                    {item.price.toFixed(2)}
                  </span>
                  <span
                    className={`font-medium ${
                      item.available ? "text-emerald-600" : "text-muted-foreground"
                    }`}
                  >
                    {item.available ? "Available" : "86'd"}
                  </span>
                  <button
                    onClick={() => onDelete(item.id)}
                    aria-label={`Remove ${item.name}`}
                    className="justify-self-end text-muted-foreground transition-colors hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ModifiersSection() {
  return (
    <div className="space-y-4">
      <SectionHead
        title="Modifiers"
        description="Option groups customers can choose per item."
        action={
          <Button size="sm" variant="outline" className="h-7 px-2.5 text-xs">
            <Plus className="mr-1 h-3.5 w-3.5" />
            Add group
          </Button>
        }
      />
      <div className="space-y-2.5">
        {MODIFIER_GROUPS.map((g) => (
          <div key={g.id} className="rounded-md border">
            <div className="flex items-center justify-between gap-2 border-b px-3 py-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium">{g.name}</span>
                <span className="text-[11px] text-muted-foreground">{g.type}</span>
              </div>
              <span
                className={`text-[11px] font-medium ${
                  g.required ? "text-amber-600" : "text-muted-foreground"
                }`}
              >
                {g.required ? "Required" : "Optional"}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 p-3">
              {g.options.map((o) => (
                <span key={o} className="rounded border px-2 py-0.5 text-[11px]">
                  {o}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AvailabilitySection() {
  return (
    <div className="space-y-4">
      <SectionHead
        title="Availability"
        description="Day-parts when this menu is served."
        action={
          <Button size="sm" variant="outline" className="h-7 px-2.5 text-xs">
            <Plus className="mr-1 h-3.5 w-3.5" />
            Add day-part
          </Button>
        }
      />
      <div className="divide-y rounded-md border">
        {DAYPARTS.map((d) => (
          <div key={d.id} className="flex items-center justify-between px-3 py-2">
            <div>
              <p className="text-xs font-medium">{d.name}</p>
              <p className="text-[11px] text-muted-foreground">
                {d.start} – {d.end}
              </p>
            </div>
            <span
              className={`text-[11px] font-medium ${
                d.active ? "text-emerald-600" : "text-muted-foreground"
              }`}
            >
              {d.active ? "Enabled" : "Disabled"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PricingSection() {
  return (
    <div className="space-y-4">
      <SectionHead
        title="Pricing & Tax"
        description="Tax class and charges applied to this menu."
        action={
          <Button size="sm" variant="outline" className="h-7 px-2.5 text-xs">
            Save changes
          </Button>
        }
      />
      <div className="space-y-2.5">
        <Field label="Currency">
          <Select defaultValue="USD">
            <SelectTrigger className="h-8 w-full max-w-37.5 text-sm">
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
        <Field label="Tax class">
          <Input defaultValue={TAX_CLASS} className="h-8 w-full max-w-sm text-sm" />
        </Field>
        <Field label="Service charge">
          <Input defaultValue={SERVICE_CHARGE} className="h-8 w-full max-w-37.5 text-sm" />
        </Field>
        <Field label="Prices include tax">
          <Switch defaultChecked />
        </Field>
      </div>
    </div>
  );
}

function OutletsSection() {
  return (
    <div className="space-y-4">
      <SectionHead
        title="Assigned Outlets"
        description="Outlets that serve this house menu."
      />
      <div className="divide-y rounded-md border">
        {OUTLETS.map((o) => (
          <div key={o.id} className="flex items-center justify-between gap-3 px-3 py-2">
            <div className="min-w-0">
              <p className="truncate text-xs font-medium">{o.name}</p>
              <p className="text-[11px] text-muted-foreground">{o.type}</p>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`text-[11px] font-medium ${
                  o.assigned ? "text-emerald-600" : "text-muted-foreground"
                }`}
              >
                {o.assigned ? "Assigned" : "Not assigned"}
              </span>
              <Button size="sm" variant="ghost" className="h-6 px-2 text-[11px]">
                {o.assigned ? "Remove" : "Assign"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────── */
const HouseMenuConfigIndexPage = () => {
  const { propertyId, menuID } = Route.useParams();
  const nav = useNavigate();

  const [active, setActive] = useState<SectionId>("general");
  const [items, setItems] = useState<MenuItem[]>(SEED_ITEMS);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<ItemForm>(emptyItem);

  const availableCount = useMemo(
    () => items.filter((i) => i.available).length,
    [items],
  );

  const setField = <K extends keyof ItemForm>(key: K, value: ItemForm[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const priceValid = form.price.trim() !== "" && Number(form.price) >= 0;
  const canSubmit = form.name.trim().length > 0 && priceValid;

  const openAddDialog = () => {
    setForm(emptyItem);
    setDialogOpen(true);
  };

  const handleAddItem = () => {
    if (!canSubmit) return;
    const item: MenuItem = {
      id: `it-${Date.now()}`,
      name: form.name.trim(),
      category: form.category,
      price: Number(form.price) || 0,
      veg: form.veg,
      available: form.available,
    };
    setItems((prev) => [...prev, item]);
    toast.success(`${item.name} added`);
    setForm(emptyItem);
    setDialogOpen(false);
  };

  const handleDeleteItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    toast.success("Item removed");
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
          <BookOpen className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-sm font-semibold leading-tight">
            {MENU.name}
          </h1>
          <p className="truncate text-[11px] text-muted-foreground">
            House menu configuration · {menuID.slice(0, 8)}…
          </p>
        </div>
        <span
          className={`shrink-0 text-[11px] font-medium ${
            MENU.is_active ? "text-emerald-600" : "text-muted-foreground"
          }`}
        >
          {MENU.is_active ? "● Published" : "● Draft"}
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
          {active === "general" && (
            <GeneralSection itemCount={items.length} availableCount={availableCount} />
          )}
          {active === "categories" && <CategoriesSection items={items} />}
          {active === "items" && (
            <ItemsSection items={items} onAdd={openAddDialog} onDelete={handleDeleteItem} />
          )}
          {active === "modifiers" && <ModifiersSection />}
          {active === "availability" && <AvailabilitySection />}
          {active === "pricing" && <PricingSection />}
          {active === "outlets" && <OutletsSection />}
        </div>
      </div>

      {/* Add item dialog */}
      <Dialog
        open={dialogOpen}
        onOpenChange={(o) => {
          setDialogOpen(o);
          if (!o) setForm(emptyItem);
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add menu item</DialogTitle>
            <DialogDescription>Add a new dish or drink to this menu.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="item-name">Item name</Label>
              <Input
                id="item-name"
                value={form.name}
                onChange={(e) => setField("name", e.target.value)}
                placeholder="e.g. Margherita Pizza"
              />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>Category</Label>
                <Select value={form.category} onValueChange={(v) => setField("category", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="item-price">Price ({CURRENCY})</Label>
                <Input
                  id="item-price"
                  type="number"
                  min={0}
                  step="0.5"
                  value={form.price}
                  onChange={(e) => setField("price", e.target.value)}
                  placeholder="0.00"
                  aria-invalid={form.price.trim() !== "" && !priceValid}
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2.5">
                <Switch
                  id="item-veg"
                  checked={form.veg}
                  onCheckedChange={(v) => setField("veg", v)}
                />
                <Label htmlFor="item-veg" className="text-xs">
                  Vegetarian
                </Label>
              </div>
              <div className="flex items-center gap-2.5">
                <Switch
                  id="item-available"
                  checked={form.available}
                  onCheckedChange={(v) => setField("available", v)}
                />
                <Label htmlFor="item-available" className="text-xs">
                  Available
                </Label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddItem} disabled={!canSubmit} className="gap-1.5">
              <Plus className="h-4 w-4" />
              Add item
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HouseMenuConfigIndexPage;
