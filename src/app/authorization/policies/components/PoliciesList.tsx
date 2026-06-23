import { ShieldOff } from "lucide-react";
import { PolicyCard } from "./PolicyCard";
import type { SentinelPolicy } from "../api/types";

interface PoliciesListProps {
  policies: SentinelPolicy[];
}

export function PoliciesList({ policies }: PoliciesListProps) {
  if (policies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed py-16 text-center">
        <ShieldOff className="h-8 w-8 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">No policies found.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {policies.map((policy) => (
        <PolicyCard key={policy.id} policy={policy} />
      ))}
    </div>
  );
}
