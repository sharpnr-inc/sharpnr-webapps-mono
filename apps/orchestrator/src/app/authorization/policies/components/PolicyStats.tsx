import { ScrollText, ShieldCheck, ShieldX, Zap } from "lucide-react";
import { cn } from "@sharpnr/utils";
import type { SentinelPolicy } from "../api/types";
import { policyEffect } from "../data/policies.mock";

interface PolicyStatsProps {
  policies: SentinelPolicy[];
}

/** At-a-glance counts for the org's policy set. */
export function PolicyStats({ policies }: PolicyStatsProps) {
  const total = policies.length;
  const active = policies.filter((p) => p.enabled).length;
  const paused = total - active;
  const allow = policies.filter(
    (p) => policyEffect(p.statement) === "permit",
  ).length;
  const deny = total - allow;

  const tiles = [
    {
      label: "Total policies",
      value: total,
      hint: "Applied across the organization",
      icon: ScrollText,
      tone: "bg-primary/10 text-primary",
    },
    {
      label: "Active",
      value: active,
      hint: paused > 0 ? `${paused} paused` : "All switched on",
      icon: Zap,
      tone: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
    },
    {
      label: "Allow rules",
      value: allow,
      hint: "Grant access to an action",
      icon: ShieldCheck,
      tone: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
    {
      label: "Deny rules",
      value: deny,
      hint: "Block an action outright",
      icon: ShieldX,
      tone: "bg-red-500/10 text-red-600 dark:text-red-400",
    },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {tiles.map((tile) => (
        <div
          key={tile.label}
          className="rounded-xl border bg-card p-4 transition-colors hover:border-primary/30"
        >
          <div className="flex items-start justify-between gap-2">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {tile.label}
            </p>
            <span className={cn("rounded-md p-1.5", tile.tone)}>
              <tile.icon className="h-4 w-4" />
            </span>
          </div>
          <p className="mt-2 text-2xl font-semibold tabular-nums text-foreground">
            {tile.value}
          </p>
          <p className="mt-0.5 truncate text-xs text-muted-foreground">
            {tile.hint}
          </p>
        </div>
      ))}
    </div>
  );
}
