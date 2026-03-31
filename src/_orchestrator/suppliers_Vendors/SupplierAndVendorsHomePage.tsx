import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  MapPin,
  Phone,
  Mail,
  Building2,
  Truck,
  ArrowUpRight,
  Globe,
} from "lucide-react";
import { useOrgSuppliers } from "./api/query";
import { useFormsModal } from "@/context/FormModalContext";
import { AddNewSupplierForm } from "./forms/AddNewSuppliersForms";

/* ─── type matching your API response ─── */
type Supplier = {
  ID: string;
  OrganizationID: string;
  Name: string;
  GSTNumber: string;
  PANNumber: string;
  Phone: string;
  Email: string;
  AddressLine: string;
  City: string;
  State: string;
  Pincode: string;
  Country: string;
  CreatedAt: string;
  UpdatedAt: string;
  CreatedByEngine: string;
};

/* ─── helpers ─── */
function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function engineLabel(engine: string) {
  if (!engine) return "Orchestrator";
  return engine.charAt(0) + engine.slice(1).toLowerCase();
}

const ENGINE_COLORS: Record<string, string> = {
  ACCOUNTING: "bg-sky-400/10 border-sky-400/20 text-sky-400",
  INVENTORY: "bg-amber-400/10 border-amber-400/20 text-amber-400",
  ORCHESTRATOR: "bg-violet-400/10 border-violet-400/20 text-violet-400",
  "": "bg-violet-400/10 border-violet-400/20 text-violet-400",
};

/* ─── supplier card ─── */
function SupplierCard({
  supplier,
  index,
  onClick,
}: {
  supplier: Supplier;
  index: number;
  onClick: () => void;
}) {
  const engineColor =
    ENGINE_COLORS[supplier.CreatedByEngine] ?? ENGINE_COLORS[""];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group relative rounded-2xl border border-border/60 bg-background/70 backdrop-blur-sm p-5 cursor-pointer hover:border-primary/30 hover:shadow-[0_8px_28px_hsl(var(--primary)/0.1)] transition-all duration-200 overflow-hidden"
    >
      {/* hover wash */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl" />

      {/* top row */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-gradient-to-br from-primary/25 to-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
            <span className="cf-mono text-xs font-bold text-primary">
              {initials(supplier.Name)}
            </span>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground leading-tight">
              {supplier.Name}
            </p>
            <span
              className={`cf-mono text-[10px] font-medium px-1.5 py-0.5 rounded border mt-0.5 inline-block ${engineColor}`}
            >
              {engineLabel(supplier.CreatedByEngine)}
            </span>
          </div>
        </div>
        <ArrowUpRight className="size-4 text-muted-foreground/30 group-hover:text-primary/60 transition-colors shrink-0" />
      </div>

      {/* divider */}
      <div className="h-px bg-border/40 mb-4" />

      {/* contact info */}
      <div className="space-y-1.5 mb-4">
        <div className="flex items-start gap-2 text-xs text-muted-foreground">
          <MapPin className="size-3 shrink-0 mt-0.5" />
          <span className="leading-snug line-clamp-2">
            {supplier.AddressLine ? `${supplier.AddressLine}, ` : ""}
            {supplier.City}, {supplier.State} – {supplier.Pincode}
          </span>
        </div>

        {supplier.Phone && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Phone className="size-3 shrink-0" />
            <span className="cf-mono">+91 {supplier.Phone}</span>
          </div>
        )}

        {supplier.Email && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Mail className="size-3 shrink-0" />
            <span className="truncate">{supplier.Email}</span>
          </div>
        )}

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Globe className="size-3 shrink-0" />
          <span>{supplier.Country}</span>
        </div>
      </div>

      {/* compliance badges */}
      <div className="flex flex-wrap gap-1.5">
        {supplier.GSTNumber ? (
          <span className="cf-mono text-[10px] px-2 py-0.5 rounded-lg border bg-emerald-400/10 border-emerald-400/20 text-emerald-400">
            GST ✓
          </span>
        ) : (
          <span className="cf-mono text-[10px] px-2 py-0.5 rounded-lg border bg-muted/30 border-border/40 text-muted-foreground/50">
            No GST
          </span>
        )}

        {supplier.PANNumber ? (
          <span className="cf-mono text-[10px] px-2 py-0.5 rounded-lg border bg-amber-400/10 border-amber-400/20 text-amber-400">
            PAN ✓
          </span>
        ) : (
          <span className="cf-mono text-[10px] px-2 py-0.5 rounded-lg border bg-muted/30 border-border/40 text-muted-foreground/50">
            No PAN
          </span>
        )}

        <span className="cf-mono text-[10px] px-2 py-0.5 rounded-lg border bg-muted/30 border-border/40 text-muted-foreground/40 ml-auto">
          {new Date(supplier.CreatedAt).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>
    </motion.div>
  );
}

/* ─── page ─── */
export function SupplierAndVendorsHomePage() {
  const { data: suppliersRes, isLoading } = useOrgSuppliers();
  const { showModal } = useFormsModal();

  const suppliers: Supplier[] = suppliersRes?.data ?? [];

  const [query, setQuery] = useState("");
  const [engineFilter, setEngineFilter] = useState<string | null>(null);

  const uniqueEngines = useMemo(
    () => [
      ...new Set(suppliers.map((s) => s.CreatedByEngine || "ORCHESTRATOR")),
    ],
    [suppliers],
  );

  const filtered = useMemo(
    () =>
      suppliers.filter((s) => {
        const matchEngine =
          !engineFilter ||
          (s.CreatedByEngine || "ORCHESTRATOR") === engineFilter;
        const matchQuery =
          !query ||
          s.Name.toLowerCase().includes(query.toLowerCase()) ||
          s.City.toLowerCase().includes(query.toLowerCase()) ||
          s.GSTNumber?.toLowerCase().includes(query.toLowerCase()) ||
          s.Email?.toLowerCase().includes(query.toLowerCase());
        return matchEngine && matchQuery;
      }),
    [suppliers, query, engineFilter],
  );

  const handleNewSupplier = () =>
    showModal(
      "New Supplier",
      "Add a new supplier to your organisation",
      <AddNewSupplierForm />,
    );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Mono:wght@400;500&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');
        .font-display { font-family: 'Instrument Serif', Georgia, serif; }
        .cf-font  { font-family: 'DM Sans', system-ui, sans-serif; }
        .cf-mono  { font-family: 'DM Mono', monospace; }
        .bg-dots {
          background-image: radial-gradient(circle, hsl(var(--foreground)/0.055) 1px, transparent 1px);
          background-size: 24px 24px;
        }
        .search-ring:focus-within { box-shadow: 0 0 0 3px hsl(var(--primary)/0.12); }
      `}</style>

      <div className="pointer-events-none fixed inset-0 bg-dots opacity-35 z-0" />

      <div className="cf-font relative z-10 flex flex-col min-h-screen p-6 md:p-10 gap-8">
        {/* ── hero ── */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-5"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary cf-mono text-[10px] tracking-widest uppercase">
              <Truck className="size-3" /> Suppliers & Vendors
            </span>

            <h1 className="font-display italic text-5xl md:text-6xl text-foreground leading-none">
              Suppliers
            </h1>

            <div className="h-px w-28 bg-gradient-to-r from-primary/50 via-primary/20 to-transparent" />

            {/* stat pills */}
            <div className="flex flex-wrap items-center gap-5 pt-1">
              <div className="flex items-baseline gap-1.5">
                <span className="font-display italic text-2xl text-foreground">
                  {isLoading ? "—" : suppliers.length}
                </span>
                <span className="text-xs text-muted-foreground">
                  Total Suppliers
                </span>
              </div>

              {uniqueEngines.map((engine) => (
                <div key={engine} className="flex items-baseline gap-1.5">
                  <span className="font-display italic text-2xl text-foreground">
                    {
                      suppliers.filter(
                        (s) => (s.CreatedByEngine || "ORCHESTRATOR") === engine,
                      ).length
                    }
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {engineLabel(engine)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleNewSupplier}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors shadow-[0_2px_14px_hsl(var(--primary)/0.3)] shrink-0 self-start sm:self-auto"
          >
            <Plus className="size-3.5" />
            Add Supplier
          </button>
        </motion.div>

        {/* ── search + filters ── */}
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {/* search */}
          <div className="search-ring flex items-center gap-2 px-3 py-2 rounded-xl border border-border/60 bg-background/60 backdrop-blur-sm w-full sm:w-72 transition-all">
            <Search className="size-3.5 text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder="Search name, city, GST…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="cf-mono bg-transparent text-xs w-full outline-none text-foreground placeholder:text-muted-foreground/50"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="text-[10px] text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            )}
          </div>

          {/* engine filter pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setEngineFilter(null)}
              className={`cf-mono text-[10px] font-medium px-3 py-1.5 rounded-lg border transition-all ${
                !engineFilter
                  ? "bg-primary/10 border-primary/25 text-primary"
                  : "border-border/40 text-muted-foreground hover:border-border/70"
              }`}
            >
              All
            </button>
            {uniqueEngines.map((engine) => (
              <button
                key={engine}
                onClick={() =>
                  setEngineFilter(engineFilter === engine ? null : engine)
                }
                className={`cf-mono text-[10px] font-medium px-3 py-1.5 rounded-lg border transition-all ${
                  engineFilter === engine
                    ? ENGINE_COLORS[engine]
                    : "border-border/40 text-muted-foreground hover:border-border/70"
                }`}
              >
                {engineLabel(engine)}
              </button>
            ))}
          </div>

          <span className="cf-mono text-[10px] text-muted-foreground/50 sm:ml-auto shrink-0">
            {filtered.length} of {suppliers.length}
          </span>
        </motion.div>

        {/* ── grid ── */}
        <div>
          {/* loading skeleton */}
          {isLoading && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-border/40 bg-background/60 p-5 space-y-4 animate-pulse"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="flex gap-3">
                    <div className="size-10 rounded-xl bg-muted/40 shrink-0" />
                    <div className="space-y-2 flex-1">
                      <div className="h-3 bg-muted/40 rounded w-3/4" />
                      <div className="h-2 bg-muted/30 rounded w-1/3" />
                    </div>
                  </div>
                  <div className="h-px bg-border/30" />
                  <div className="space-y-2">
                    <div className="h-2 bg-muted/30 rounded w-full" />
                    <div className="h-2 bg-muted/30 rounded w-2/3" />
                    <div className="h-2 bg-muted/30 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* empty */}
          {!isLoading && filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 gap-4"
            >
              <div className="size-14 rounded-2xl bg-muted/30 border border-border/50 flex items-center justify-center">
                <Building2 className="size-6 text-muted-foreground/30" />
              </div>
              <div className="text-center">
                <p className="font-display italic text-xl text-foreground">
                  {query ? `No results for "${query}"` : "No suppliers yet"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {query
                    ? "Try a different name, city or GST number."
                    : "Add your first supplier to get started."}
                </p>
              </div>
              {!query && (
                <button
                  onClick={handleNewSupplier}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary text-xs font-medium hover:bg-primary/20 transition-colors"
                >
                  <Plus className="size-3.5" /> Add Supplier
                </button>
              )}
            </motion.div>
          )}

          {/* cards */}
          {!isLoading && filtered.length > 0 && (
            <AnimatePresence mode="popLayout">
              <motion.div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.map((supplier, i) => (
                  <SupplierCard
                    key={supplier.ID}
                    supplier={supplier}
                    index={i}
                    onClick={() => {
                      // navigate to supplier detail later
                      console.log("View supplier:", supplier.ID);
                    }}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* footer */}
        <div className="flex items-center justify-between pt-2 pb-4 border-t border-border/30">
          <span className="cf-mono text-[10px] text-muted-foreground/40 uppercase tracking-widest">
            Organisation-level supplier registry
          </span>
          <span className="cf-mono text-[10px] text-muted-foreground/30 uppercase tracking-widest">
            Sharpnr Engine v1.0
          </span>
        </div>
      </div>
    </>
  );
}
