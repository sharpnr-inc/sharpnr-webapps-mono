import { useMemo, useState } from "react";
import { Badge, Button, Card, CardContent, CardHeader } from "@sharpnr/ui";
import {
  ShieldCheck,
  ShieldX,
  ChevronDown,
  ChevronUp,
  User,
  Zap,
  Box,
  Pencil,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/formatDatePretty";
import {
  parsePolicy,
  formatPolicy,
  policyToJsonObject,
} from "../../cederbuilder/service";
import { JsonView } from "./JsonView";
import type { SentinelPolicy } from "../api/types";

interface PolicyCardProps {
  policy: SentinelPolicy;
}

function ConstraintRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof User;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <Icon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
      <span className="text-muted-foreground w-20 shrink-0">{label}</span>
      <code className="font-mono text-xs text-foreground break-all">{value}</code>
    </div>
  );
}

export function PolicyCard({ policy }: PolicyCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [view, setView] = useState<"cedar" | "json">("cedar");

  const parsed = useMemo(() => parsePolicy(policy.statement), [policy.statement]);
  const formatted = useMemo(
    () => formatPolicy(policy.statement),
    [policy.statement],
  );
  const json = useMemo(
    () => policyToJsonObject(policy.statement),
    [policy.statement],
  );

  const isForbid = parsed?.effect === "forbid";
  const invalid = parsed === null;

  return (
    <Card className={cn(!policy.enabled && "opacity-60")}>
      <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">{policy.name}</span>
            {!policy.enabled && (
              <Badge variant="outline" className="text-xs">
                Disabled
              </Badge>
            )}
          </div>
          {policy.description && (
            <p className="text-sm text-muted-foreground">{policy.description}</p>
          )}
        </div>

        {invalid ? (
          <Badge variant="outline" className="gap-1 text-destructive shrink-0">
            <ShieldX className="h-3.5 w-3.5" />
            Invalid
          </Badge>
        ) : (
          <Badge
            variant="secondary"
            className={cn(
              "gap-1 shrink-0",
              isForbid
                ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
                : "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
            )}
          >
            {isForbid ? (
              <ShieldX className="h-3.5 w-3.5" />
            ) : (
              <ShieldCheck className="h-3.5 w-3.5" />
            )}
            {parsed.effect}
          </Badge>
        )}
      </CardHeader>

      <CardContent className="space-y-3">
        {parsed && (
          <div className="space-y-1.5 rounded-md border bg-muted/30 p-3">
            <ConstraintRow icon={User} label="Principal" value={parsed.principal.label} />
            <ConstraintRow icon={Zap} label="Action" value={parsed.action.label} />
            <ConstraintRow icon={Box} label="Resource" value={parsed.resource.label} />
            {parsed.hasConditions && (
              <p className="pt-1 text-xs text-muted-foreground">
                + conditional <code className="font-mono">when</code> clause
              </p>
            )}
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Updated {formatDate(policy.updatedAt)}
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 text-xs"
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? (
              <>
                Hide source <ChevronUp className="h-3.5 w-3.5" />
              </>
            ) : (
              <>
                View source <ChevronDown className="h-3.5 w-3.5" />
              </>
            )}
          </Button>
        </div>

        {expanded && (
          <div className="space-y-2">
            <div className="inline-flex rounded-md border p-0.5 text-xs">
              {(["cedar", "json"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setView(v)}
                  className={cn(
                    "rounded px-2.5 py-1 font-medium transition-colors",
                    view === v
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {v === "cedar" ? "Cedar" : "JSON"}
                </button>
              ))}
            </div>
            {view === "cedar" ? (
              <pre className="overflow-x-auto rounded-md bg-muted p-3 text-xs font-mono text-foreground">
                {formatted}
              </pre>
            ) : json ? (
              <JsonView data={json} />
            ) : (
              <pre className="rounded-md bg-muted p-3 text-xs font-mono text-destructive">
                // invalid Cedar policy
              </pre>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 border-t pt-3">
          <Button variant="outline" size="sm" className="gap-1">
            <Pencil className="h-3.5 w-3.5" /> Edit
          </Button>
          <Button size="sm" className="gap-1">
            See details <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
