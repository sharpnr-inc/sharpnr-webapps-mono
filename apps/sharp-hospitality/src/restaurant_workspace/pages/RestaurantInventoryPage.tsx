import React, { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  useAllInventoriesAccounts,
  useRestaurantInventories,
} from "../apis/queries";
import { useFormsModal } from "@/hooks/FormModalContext";
import { AddRestaurantInventoryForm } from "../components/AddRestaurantInventory";
import { Badge } from "@sharpnr/ui";
import { Button } from "@sharpnr/ui";
import { Card, CardContent, CardHeader } from "@sharpnr/ui";
import { Skeleton } from "@sharpnr/ui";
import { Input } from "@sharpnr/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sharpnr/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@sharpnr/ui";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@sharpnr/ui";
import {
  Package,
  Plus,
  Search,
  MapPin,
  Warehouse,
  LayoutGrid,
  List,
  RefreshCw,
  BoxesIcon,
  Share2,
  ChevronDown,
} from "lucide-react";
import { Route } from "@/routes/workspace/_modules/restaurant/$restaurantID/inventory/index";

// ── Animation Variants ──────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.35,
      ease: "easeOut", // ✅ string literal, always valid
    },
  }),
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.07 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 },
  },
  exit: { opacity: 0, scale: 0.94, transition: { duration: 0.18 } },
};

// ── Types ───────────────────────────────────────────────────────────────────
interface Inventory {
  id: string;
  inventory_account_id: string;
  name: string;
  description: string;
  location: string;
  status: string;
  created_at: string;
}

interface Warehouse {
  ID: string;
  Name: string;
  Type: string;
  IsShared: boolean;
}

// ── Component ───────────────────────────────────────────────────────────────
const RestaurantInventoryPage: React.FC = () => {
  const [selectedWarehouseFilter, setSelectedWarehouseFilter] =
    useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { restaurantID } = Route.useParams();

  // Filter is passed directly to the hook — it handles the API call
  const {
    data: inventories,
    isLoading: isInventoryLoading,
    refetch,
  } = useRestaurantInventories(
    restaurantID!,
    selectedWarehouseFilter === "ALL" ? undefined : selectedWarehouseFilter,
  );

  const { data: warehouseOrAccounts, isLoading: isWarehouseLoading } =
    useAllInventoriesAccounts(restaurantID!);

  const { showModal } = useFormsModal();

  const handleAddInventory = (warehouseID: string) => {
    if (!warehouseID) return;
    showModal(
      "New Inventory",
      "Add New Inventory",
      <AddRestaurantInventoryForm />,
    );
  };

  const warehouses: Warehouse[] = warehouseOrAccounts?.data ?? [];
  const allInventories: Inventory[] = inventories?.data ?? [];

  // Client-side search only (warehouse filter is server-side via hook)
  const filteredInventories = allInventories.filter(
    (inv) =>
      inv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.location?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getWarehouse = (accountId: string) =>
    warehouses.find((w) => w.ID === accountId);

  const activeCount = allInventories.filter(
    (i) => i.status === "ACTIVE",
  ).length;

  const stats = [
    {
      label: "Total Items",
      value: allInventories.length,
      icon: Package,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      label: "Active",
      value: activeCount,
      icon: BoxesIcon,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Warehouses",
      value: warehouses.length,
      icon: Warehouse,
      color: "text-violet-500",
      bg: "bg-violet-500/10",
    },
    {
      label: "Shared",
      value: warehouses.filter((w) => w.IsShared).length,
      icon: Share2,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
  ];

  return (
    <div className="space-y-4 mt-2 px-1">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: [0, -8, 8, 0], scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary"
          >
            <BoxesIcon className="h-5 w-5" />
          </motion.div>
          <div>
            <h1 className="text-xl font-semibold text-foreground tracking-tight">
              Inventory
            </h1>
            <p className="text-sm text-muted-foreground">
              {isInventoryLoading ? (
                <Skeleton className="h-4 w-40 inline-block" />
              ) : (
                <>
                  {allInventories.length} items across {warehouses.length}{" "}
                  warehouse{warehouses.length !== 1 ? "s" : ""}
                </>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9"
                onClick={() => refetch()}
              >
                <motion.div
                  whileTap={{ rotate: 180 }}
                  transition={{ duration: 0.4 }}
                >
                  <RefreshCw className="h-4 w-4" />
                </motion.div>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Refresh</TooltipContent>
          </Tooltip>

          {/* ── Add Inventory — DropdownMenu (no asChild on SelectTrigger) */}
          {warehouses.length <= 1 ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  className="gap-2"
                  disabled={warehouses.length === 0}
                  onClick={() =>
                    warehouses[0] && handleAddInventory(warehouses[0].ID)
                  }
                >
                  <Plus className="h-4 w-4" />
                  Add Inventory
                </Button>
              </TooltipTrigger>
              <TooltipContent>Refresh</TooltipContent>
            </Tooltip>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Inventory
                  <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                  Select Warehouse
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {warehouses.map((w) => (
                  <DropdownMenuItem
                    key={w.ID}
                    onClick={() => handleAddInventory(w.ID)}
                    className="gap-2"
                  >
                    <Warehouse className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="truncate">{w.Name}</span>
                    {w.IsShared && (
                      <Badge
                        variant="secondary"
                        className="ml-auto text-[9px] px-1.5 py-0 h-4"
                      >
                        Shared
                      </Badge>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </motion.div>

      {/* ── Stats Bar ──────────────────────────────────────────────────── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 gap-3 sm:grid-cols-4"
      >
        {stats.map((stat, i) => (
          <motion.div key={stat.label} variants={fadeUp} custom={i}>
            <Card className="border-border/60 hover:border-border transition-colors">
              <CardContent className="p-4 flex items-center gap-3">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${stat.bg}`}
                >
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </motion.div>
                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  {isInventoryLoading || isWarehouseLoading ? (
                    <Skeleton className="h-5 w-8 mt-0.5" />
                  ) : (
                    <motion.p
                      key={stat.value}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-lg font-semibold leading-tight"
                    >
                      {stat.value}
                    </motion.p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Filters & View Toggle ───────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex flex-1 gap-2 flex-wrap">
          <div className="relative flex-1 min-w-45 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search inventories…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 text-sm"
            />
          </div>

          {/* Warehouse filter → triggers hook refetch via state */}
          <Select
            value={selectedWarehouseFilter}
            onValueChange={(val) => {
              setSelectedWarehouseFilter(val);
            }}
          >
            <SelectTrigger className="h-9 w-47.5 text-sm">
              <Warehouse className="h-3.5 w-3.5 mr-2 text-muted-foreground shrink-0" />
              <SelectValue placeholder="All Warehouses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Warehouses</SelectItem>
              {warehouses.map((w) => (
                <SelectItem key={w.ID} value={w.ID}>
                  {w.Name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-1 rounded-lg border border-border p-0.5 bg-muted/40 self-start sm:self-auto">
          {(["grid", "list"] as const).map((mode) => (
            <Button
              key={mode}
              variant={viewMode === mode ? "secondary" : "ghost"}
              size="icon"
              className="h-7 w-7 relative"
              onClick={() => setViewMode(mode)}
            >
              {viewMode === mode && (
                <motion.span
                  layoutId="viewModeIndicator"
                  className="absolute inset-0 rounded-md bg-background shadow-sm"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              <span className="relative z-10">
                {mode === "grid" ? (
                  <LayoutGrid className="h-3.5 w-3.5" />
                ) : (
                  <List className="h-3.5 w-3.5" />
                )}
              </span>
            </Button>
          ))}
        </div>
      </motion.div>

      {/* ── Content ────────────────────────────────────────────────────── */}
      {isInventoryLoading ? (
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className={
            viewMode === "grid"
              ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              : "flex flex-col gap-3"
          }
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div key={i} variants={fadeUp} custom={i}>
              <Card className="border-border/60">
                <CardContent className="p-5 space-y-3">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-1/2" />
                  <div className="flex gap-2 pt-1">
                    <Skeleton className="h-5 w-16 rounded-full" />
                    <Skeleton className="h-5 w-20 rounded-full" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      ) : filteredInventories.length === 0 ? (
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Card className="border-dashed border-border/60">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center gap-3">
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5,
                  ease: "easeInOut",
                }}
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted"
              >
                <Package className="h-7 w-7 text-muted-foreground" />
              </motion.div>
              <div>
                <p className="font-medium text-foreground">
                  No inventories found
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {searchQuery || selectedWarehouseFilter !== "ALL"
                    ? "Try adjusting your filters."
                    : "Add your first inventory to get started."}
                </p>
              </div>
              {warehouses.length > 0 &&
                !searchQuery &&
                selectedWarehouseFilter === "ALL" && (
                  <Button
                    size="sm"
                    className="mt-2 gap-2"
                    onClick={() => handleAddInventory(warehouses[0].ID)}
                  >
                    <Plus className="h-4 w-4" />
                    Add First Inventory
                  </Button>
                )}
            </CardContent>
          </Card>
        </motion.div>
      ) : viewMode === "grid" ? (
        <AnimatePresence mode="popLayout">
          <motion.div
            key="grid"
            variants={stagger}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredInventories.map((inv, i) => {
              const warehouse = getWarehouse(inv.inventory_account_id);
              return (
                <motion.div
                  key={inv.id}
                  variants={fadeUp}
                  custom={i}
                  layout
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Card className="group border-border/60 hover:border-primary/40 hover:shadow-md transition-shadow duration-200 h-full">
                    <CardHeader className="pb-3 pt-4 px-5">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <motion.div
                            whileHover={{ rotate: 15, scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 400 }}
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"
                          >
                            <Package className="h-4 w-4" />
                          </motion.div>
                          <p className="font-semibold text-sm text-foreground truncate leading-tight">
                            {inv.name}
                          </p>
                        </div>
                        <Badge
                          variant={
                            inv.status === "ACTIVE" ? "default" : "secondary"
                          }
                          className={`shrink-0 text-[10px] px-2 py-0.5 ${
                            inv.status === "ACTIVE"
                              ? "bg-emerald-500/15 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/20"
                              : ""
                          }`}
                        >
                          {inv.status}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="px-5 pb-4 space-y-3">
                      {inv.description && (
                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                          {inv.description}
                        </p>
                      )}
                      <div className="flex flex-col gap-1.5">
                        {inv.location && (
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3 shrink-0" />
                            <span className="truncate">{inv.location}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Warehouse className="h-3 w-3 shrink-0" />
                          <span className="truncate">
                            {warehouse?.Name ?? "Unknown"}
                          </span>
                          {warehouse?.Type && (
                            <Badge
                              variant="outline"
                              className="text-[9px] px-1.5 py-0 h-4 ml-auto shrink-0"
                            >
                              {warehouse.Type}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      ) : (
        /* ── List View ── */
        <AnimatePresence mode="popLayout">
          <motion.div
            key="list"
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="rounded-xl border border-border/60 overflow-hidden"
          >
            <div className="hidden sm:grid grid-cols-[1fr_1fr_1fr_auto] gap-4 px-5 py-3 bg-muted/40 text-xs font-medium text-muted-foreground uppercase tracking-wide border-b border-border/60">
              <span>Name</span>
              <span>Warehouse</span>
              <span>Location</span>
              <span>Status</span>
            </div>
            <div className="divide-y divide-border/60">
              {filteredInventories.map((inv, i) => {
                const warehouse = getWarehouse(inv.inventory_account_id);
                return (
                  <motion.div
                    key={inv.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: i * 0.04,
                      duration: 0.3,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="grid sm:grid-cols-[1fr_1fr_1fr_auto] gap-3 sm:gap-4 px-5 py-4 items-center hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <Package className="h-3.5 w-3.5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">
                          {inv.name}
                        </p>
                        {inv.description && (
                          <p className="text-xs text-muted-foreground truncate">
                            {inv.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground min-w-0">
                      <Warehouse className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">
                        {warehouse?.Name ?? "Unknown"}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground min-w-0">
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{inv.location || "—"}</span>
                    </div>

                    <Badge
                      variant={
                        inv.status === "ACTIVE" ? "default" : "secondary"
                      }
                      className={`shrink-0 text-[10px] px-2 py-0.5 justify-self-start sm:justify-self-end ${
                        inv.status === "ACTIVE"
                          ? "bg-emerald-500/15 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/20"
                          : ""
                      }`}
                    >
                      {inv.status}
                    </Badge>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {!isInventoryLoading && filteredInventories.length > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-xs text-muted-foreground text-right pb-2"
          >
            Showing {filteredInventories.length} of {allInventories.length}{" "}
            inventories
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RestaurantInventoryPage;
