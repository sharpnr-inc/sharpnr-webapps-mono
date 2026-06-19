import { useMemo, useState } from "react";
import { Badge, Button, Input, ScrollArea, Separator } from "@sharpnr/ui";
import {
  Boxes,
  Building2,
  Check,
  ChefHat,
  ConciergeBell,
  Disc3,
  HeartPulse,
  Hotel,
  Loader2,
  Microscope,
  Minus,
  Pill,
  Plus,
  Search,
  Sparkles,
  Stethoscope,
  TreePalm,
  TriangleAlert,
  UtensilsCrossed,
  Video,
  Wine,
  type LucideIcon,
} from "lucide-react";
import { useBusinessModules } from "./api/queries";
import type { HealthcareModuleType, HospitalityModuleType } from "./api/types";

/* ──────────────────────────────────────────────────────────────
   Catalog presentation
   Segmentation: Industry / Sector → Modules (modules come from the API).
   The maps below turn the backend enum into a friendly label + icon.
─────────────────────────────────────────────────────────────── */

type ModuleType = HospitalityModuleType | HealthcareModuleType;

const MODULE_LABELS: Record<ModuleType, string> = {
  RESTAURANT: "Restaurant",
  HOTEL: "Hotel",
  BAR: "Bar",
  NIGHT_CLUB: "Nightclub",
  RESORT: "Resort",
  "CLOUD_KITCHEN/TAKEAWAYS": "Cloud Kitchen / Takeaway",
  HOSPITAL: "Hospital",
  CLINIC: "Clinic",
  PHARMACY: "Pharmacy",
  DIAGNOSTICS: "Diagnostics",
  TELEMEDICINE: "Telemedicine",
  HOME_CARE: "Home Care",
};

const MODULE_ICONS: Record<ModuleType, LucideIcon> = {
  RESTAURANT: UtensilsCrossed,
  HOTEL: Hotel,
  BAR: Wine,
  NIGHT_CLUB: Disc3,
  RESORT: TreePalm,
  "CLOUD_KITCHEN/TAKEAWAYS": ChefHat,
  HOSPITAL: Building2,
  CLINIC: Stethoscope,
  PHARMACY: Pill,
  DIAGNOSTICS: Microscope,
  TELEMEDICINE: Video,
  HOME_CARE: HeartPulse,
};

/** Static sector metadata, keyed to the API payload fields. */
const SECTORS = [
  {
    id: "hospitality",
    name: "Hospitality",
    description: "Food, beverage and lodging operations.",
    icon: ConciergeBell,
    dataKey: "hospitality",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    description: "Clinical and patient-care operations.",
    icon: Stethoscope,
    dataKey: "healthcare",
  },
] as const;

interface CatalogModule {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  tags: string[];
  available: boolean;
}

interface CatalogSector {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  modules: CatalogModule[];
  comingSoon: boolean;
}

/* ──────────────────────────────────────────────────────────────
   Module card — selectable tile
─────────────────────────────────────────────────────────────── */

function ModuleTile({
  module,
  selected,
  onToggle,
}: {
  module: CatalogModule;
  selected: boolean;
  onToggle: () => void;
}) {
  const Icon = module.icon;
  const disabled = !module.available;

  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      aria-pressed={selected}
      className={`group relative flex flex-col gap-3 rounded-xl border p-4 text-left transition-all duration-200 ${
        disabled
          ? "cursor-not-allowed border-border/60 bg-muted/30 opacity-70"
          : "hover:-translate-y-0.5 hover:shadow-md"
      } ${
        selected
          ? "border-primary/60 bg-primary/5 ring-1 ring-primary/40"
          : !disabled && "border-border/70 bg-card hover:border-primary/40"
      }`}
    >
      {/* selection check */}
      {!disabled && (
        <span
          className={`absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full border transition-all ${
            selected
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-background text-transparent group-hover:border-primary/50"
          }`}
        >
          <Check className="h-3 w-3" />
        </span>
      )}

      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-colors ${
          selected
            ? "border-primary/30 bg-primary/10 text-primary"
            : "border-border bg-muted text-muted-foreground group-hover:text-foreground"
        }`}
      >
        <Icon className="h-5 w-5" />
      </div>

      <div className="space-y-1">
        <div className="flex flex-wrap items-center gap-1.5">
          <h3 className="text-sm font-semibold text-foreground">
            {module.name}
          </h3>
          {disabled && (
            <Badge variant="outline" className="px-1.5 py-0 text-[10px]">
              Coming soon
            </Badge>
          )}
        </div>
        <p className="line-clamp-2 text-xs text-muted-foreground">
          {module.description}
        </p>
      </div>

      <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
        {module.tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="rounded-md px-1.5 py-0 text-[10px] font-medium"
          >
            {tag}
          </Badge>
        ))}
      </div>

      {!disabled && (
        <span
          className={`mt-1 flex items-center justify-center gap-1.5 rounded-lg border py-1.5 text-xs font-medium transition-colors ${
            selected
              ? "border-primary/30 bg-primary/10 text-primary"
              : "border-border bg-muted/40 text-muted-foreground group-hover:text-foreground"
          }`}
        >
          {selected ? (
            <>
              <Minus className="h-3.5 w-3.5" />
              Remove
            </>
          ) : (
            <>
              <Plus className="h-3.5 w-3.5" />
              Add module
            </>
          )}
        </span>
      )}
    </button>
  );
}

/* ──────────────────────────────────────────────────────────────
   Catalog
─────────────────────────────────────────────────────────────── */

interface BusinessModuleCatalogProps {
  closeModal: () => void;
  propertyID: string; // needed for sending the params
}

const BusinessModuleCatalog = ({
  closeModal,
  propertyID,
}: BusinessModuleCatalogProps) => {
  const { data, isError, isLoading } = useBusinessModules();
  const [activeSectorId, setActiveSectorId] = useState<string>(SECTORS[0].id);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const search = query.trim().toLowerCase();
  const isSearching = search.length > 0;

  // Merge static sector metadata with the modules returned by the API.
  const catalog = useMemo<CatalogSector[]>(() => {
    return SECTORS.map((sector) => {
      const modules = (data?.data?.[sector.dataKey] ?? []).map((m) => ({
        id: m.id,
        name: MODULE_LABELS[m.moduleName] ?? m.moduleName,
        description: m.description,
        icon: MODULE_ICONS[m.moduleName] ?? Boxes,
        tags: m.tags ?? [],
        available: m.isAvailable,
      }));
      return {
        ...sector,
        modules,
        comingSoon: modules.length === 0,
      };
    });
  }, [data]);

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const activeSector =
    catalog.find((s) => s.id === activeSectorId) ?? catalog[0];

  // When searching we match across every sector; otherwise show the active one.
  const results = useMemo(() => {
    const matches = (m: CatalogModule) =>
      m.name.toLowerCase().includes(search) ||
      m.description.toLowerCase().includes(search) ||
      m.tags.some((t) => t.toLowerCase().includes(search));

    if (isSearching) {
      return catalog.flatMap((s) => s.modules.filter(matches));
    }
    return activeSector?.modules ?? [];
  }, [catalog, search, isSearching, activeSector]);

  const totalModules = catalog.reduce((n, s) => n + s.modules.length, 0);

  const handleContinue = () => {
    closeModal();
  };

  if (isLoading) {
    return (
      <div className="flex h-[68vh] flex-col items-center justify-center gap-3 text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin" />
        <p className="text-sm">Loading modules…</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-[68vh] flex-col items-center justify-center gap-3 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-destructive/10 text-destructive">
          <TriangleAlert className="h-5 w-5" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">
            Couldn’t load business modules
          </p>
          <p className="text-xs text-muted-foreground">
            Please close this dialog and try again.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={closeModal}>
          Close
        </Button>
      </div>
    );
  }

  return (
    <div className="flex h-[68vh] flex-col">
      {/* ── Search ─────────────────────────────────── */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${totalModules} modules across all sectors…`}
          className="pl-9"
        />
      </div>

      <div className="mt-4 flex min-h-0 flex-1 gap-5">
        {/* ── Sector rail ──────────────────────────── */}
        <aside className="hidden w-52 shrink-0 flex-col gap-1 sm:flex">
          <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Industries
          </p>
          {catalog.map((sector) => {
            const Icon = sector.icon;
            const isActive = !isSearching && sector.id === activeSectorId;
            const count = sector.modules.length;
            return (
              <button
                key={sector.id}
                type="button"
                disabled={isSearching}
                onClick={() => setActiveSectorId(sector.id)}
                className={`flex items-start gap-2.5 rounded-lg border px-2.5 py-2 text-left transition-colors disabled:opacity-50 ${
                  isActive
                    ? "border-primary/40 bg-primary/5"
                    : "border-transparent hover:border-border hover:bg-muted/50"
                }`}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${
                    isActive
                      ? "border-primary/30 bg-primary/10 text-primary"
                      : "border-border bg-muted text-muted-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="truncate text-sm font-medium text-foreground">
                      {sector.name}
                    </span>
                    {sector.comingSoon && (
                      <Badge
                        variant="outline"
                        className="shrink-0 px-1 py-0 text-[9px]"
                      >
                        Soon
                      </Badge>
                    )}
                  </div>
                  <p className="truncate text-[11px] text-muted-foreground">
                    {count > 0 ? `${count} modules` : "Coming soon"}
                  </p>
                </div>
              </button>
            );
          })}
        </aside>

        <Separator orientation="vertical" className="hidden sm:block" />

        {/* ── Module grid ──────────────────────────── */}
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-baseline justify-between pb-3">
            <h2 className="text-sm font-semibold text-foreground">
              {isSearching
                ? `Results for “${query.trim()}”`
                : activeSector?.name}
            </h2>
            <span className="text-xs text-muted-foreground">
              {results.length} {results.length === 1 ? "module" : "modules"}
            </span>
          </div>

          <ScrollArea className="min-h-0 flex-1 pr-3">
            {results.length > 0 ? (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                {results.map((module) => (
                  <ModuleTile
                    key={module.id}
                    module={module}
                    selected={selected.has(module.id)}
                    onToggle={() => toggle(module.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-muted text-muted-foreground">
                  <Sparkles className="h-5 w-5" />
                </div>
                <p className="text-sm font-medium text-foreground">
                  {isSearching
                    ? "No modules match your search"
                    : "No modules here yet"}
                </p>
                <p className="max-w-xs text-xs text-muted-foreground">
                  {isSearching
                    ? "Try a different keyword or clear the search."
                    : `${activeSector?.name ?? "These"} modules are coming soon.`}
                </p>
              </div>
            )}
          </ScrollArea>
        </div>
      </div>

      {/* ── Action bar ───────────────────────────────── */}
      <div className="mt-4 flex items-center justify-between gap-3 border-t pt-4">
        <p className="text-sm text-muted-foreground">
          {selected.size > 0 ? (
            <>
              <span className="font-semibold text-foreground">
                {selected.size}
              </span>{" "}
              {selected.size === 1 ? "module" : "modules"} selected
            </>
          ) : (
            "Select one or more modules to continue."
          )}
        </p>
        <div className="flex items-center gap-2">
          {selected.size > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelected(new Set())}
            >
              Clear
            </Button>
          )}
          <Button variant="outline" onClick={closeModal}>
            Cancel
          </Button>
          <Button
            onClick={handleContinue}
            disabled={selected.size === 0}
            className="gap-1.5"
          >
            <Plus className="h-4 w-4" />
            Add{selected.size > 0 ? ` ${selected.size}` : ""}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BusinessModuleCatalog;
