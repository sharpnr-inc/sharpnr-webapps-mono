import { useMemo, useState } from "react";
import {
  ShieldCheck,
  ShieldX,
  ShieldOff,
  ShieldAlert,
  Plus,
  Search,
  Layers,
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { Button, Input, Card, CardContent } from "@sharpnr/ui";
import { cn } from "@/lib/utils";
import { PoliciesTable } from "../components/PoliciesTable";
import { dummyPolicies } from "../data/dummyPolicies";
import { useAllOrgPolicies } from "../api/queries";
import { parsePolicy } from "../../cederbuilder/service";

type EffectFilter = "all" | "permit" | "forbid";
type StatusFilter = "all" | "enabled" | "disabled";

function StatCard({
  icon: Icon,
  label,
  value,
  tone = "default",
}: {
  icon: typeof ShieldCheck;
  label: string;
  value: number;
  tone?: "default" | "permit" | "forbid" | "muted";
}) {
  const toneClass = {
    default: "text-primary",
    permit: "text-green-600 dark:text-green-400",
    forbid: "text-red-600 dark:text-red-400",
    muted: "text-muted-foreground",
  }[tone];

  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-4">
        <div
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted",
            toneClass,
          )}
        >
          <Icon className="h-4.5 w-4.5" />
        </div>
        <div className="min-w-0">
          <p className="text-xl font-semibold leading-none text-foreground">
            {value}
          </p>
          <p className="truncate text-xs text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function Segmented<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (value: T) => void;
  options: { label: string; value: T }[];
}) {
  return (
    <div className="inline-flex rounded-md border p-0.5 text-xs">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={cn(
            "rounded px-2.5 py-1 font-medium transition-colors",
            value === o.value
              ? "bg-muted text-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

const PoliciesIndexPage = () => {
  const navigate = useNavigate();
  // Kick off the real query so it's cached for when the backend is wired up.
  useAllOrgPolicies();

  // TODO: swap dummy data for the real backend response once `usePermissions()`
  // returns Cedar policies from `/orchestrator/sentinel/policies`.
  const policies = dummyPolicies;

  const [query, setQuery] = useState("");
  const [effect, setEffect] = useState<EffectFilter>("all");
  const [status, setStatus] = useState<StatusFilter>("all");

  // Parse each policy once to know its effect (permit / forbid / invalid).
  const effectById = useMemo(() => {
    const map: Record<string, "permit" | "forbid" | "invalid"> = {};
    for (const p of policies) {
      const parsed = parsePolicy(p.statement);
      map[p.id] = parsed === null ? "invalid" : parsed.effect;
    }
    return map;
  }, [policies]);

  const stats = useMemo(() => {
    let permit = 0;
    let forbid = 0;
    let invalid = 0;
    let disabled = 0;
    for (const p of policies) {
      if (!p.enabled) disabled++;
      const e = effectById[p.id];
      if (e === "permit") permit++;
      else if (e === "forbid") forbid++;
      else invalid++;
    }
    return { total: policies.length, permit, forbid, invalid, disabled };
  }, [policies, effectById]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return policies.filter((p) => {
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        (p.description?.toLowerCase().includes(q) ?? false);
      const matchesEffect = effect === "all" || effectById[p.id] === effect;
      const matchesStatus =
        status === "all" ||
        (status === "enabled" ? p.enabled : !p.enabled);
      return matchesQuery && matchesEffect && matchesStatus;
    });
  }, [policies, query, effect, status, effectById]);

  const filtersActive = query.trim() !== "" || effect !== "all" || status !== "all";

  const clearFilters = () => {
    setQuery("");
    setEffect("all");
    setStatus("all");
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-6">
      {/* Header */}
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-semibold text-foreground">Policies</h1>
            <span className="text-sm text-muted-foreground">
              ({policies.length})
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Cedar authorization policies evaluated by Sentinel. Showing dummy
            data until the backend is connected.
          </p>
        </div>

        <Button
          className="gap-1"
          onClick={() => navigate({ to: "/authorization/policies/create" })}
        >
          <Plus className="h-4 w-4" /> Add Policy
        </Button>
      </header>

      {/* Stats overview */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard icon={Layers} label="Total policies" value={stats.total} />
        <StatCard
          icon={ShieldCheck}
          label="Permit"
          value={stats.permit}
          tone="permit"
        />
        <StatCard
          icon={ShieldX}
          label="Forbid"
          value={stats.forbid}
          tone="forbid"
        />
        <StatCard
          icon={stats.invalid > 0 ? ShieldAlert : ShieldOff}
          label={stats.invalid > 0 ? "Invalid" : "Disabled"}
          value={stats.invalid > 0 ? stats.invalid : stats.disabled}
          tone="muted"
        />
      </div>

      {/* Toolbar: search + filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[200px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search policies…"
            className="pl-9"
          />
        </div>

        <Segmented<EffectFilter>
          value={effect}
          onChange={setEffect}
          options={[
            { label: "All", value: "all" },
            { label: "Permit", value: "permit" },
            { label: "Forbid", value: "forbid" },
          ]}
        />
        <Segmented<StatusFilter>
          value={status}
          onChange={setStatus}
          options={[
            { label: "All", value: "all" },
            { label: "Enabled", value: "enabled" },
            { label: "Disabled", value: "disabled" },
          ]}
        />
      </div>

      {/* Result count */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Showing {filtered.length} of {policies.length}
        </p>
        {filtersActive && (
          <Button
            variant="ghost"
            size="sm"
            className="h-auto px-2 py-1 text-xs"
            onClick={clearFilters}
          >
            Clear filters
          </Button>
        )}
      </div>

      {/* List */}
      {filtered.length === 0 && filtersActive ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed py-16 text-center">
          <Search className="h-8 w-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            No policies match your filters.
          </p>
          <Button variant="outline" size="sm" onClick={clearFilters}>
            Clear filters
          </Button>
        </div>
      ) : (
        <PoliciesTable policies={filtered} />
      )}
    </div>
  );
};

export default PoliciesIndexPage;
