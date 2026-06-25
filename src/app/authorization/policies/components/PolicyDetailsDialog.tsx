import { useMemo, useState } from "react";
import {
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@sharpnr/ui";
import { ShieldCheck, ShieldX, User, Zap, Box, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/formatDatePretty";
import {
  parsePolicy,
  formatPolicy,
  policyToJsonObject,
} from "../../cederbuilder/service";
import { JsonView } from "./JsonView";
import type { SentinelPolicy } from "../api/types";

interface PolicyDetailsDialogProps {
  policy: SentinelPolicy | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
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
      <Icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
      <span className="w-20 shrink-0 text-muted-foreground">{label}</span>
      <code className="break-all font-mono text-xs text-foreground">
        {value}
      </code>
    </div>
  );
}

export function PolicyDetailsDialog({
  policy,
  open,
  onOpenChange,
}: PolicyDetailsDialogProps) {
  const [view, setView] = useState<"cedar" | "json">("cedar");

  const statement = policy?.statement ?? "";
  const parsed = useMemo(() => parsePolicy(statement), [statement]);
  const formatted = useMemo(() => formatPolicy(statement), [statement]);
  const json = useMemo(() => policyToJsonObject(statement), [statement]);

  const invalid = parsed === null;
  const isForbid = parsed?.effect === "forbid";
  const tone = invalid
    ? {
        label: "Invalid",
        Icon: ShieldX,
        dot: "bg-amber-400",
        badge:
          "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
      }
    : isForbid
      ? {
          label: "forbid",
          Icon: ShieldX,
          dot: "bg-red-500",
          badge: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
        }
      : {
          label: "permit",
          Icon: ShieldCheck,
          dot: "bg-green-500",
          badge:
            "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
        };
  const ToneIcon = tone.Icon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
        {policy && (
          <>
            <DialogHeader>
              <div className="flex items-center gap-2">
                <span className={cn("h-2.5 w-2.5 rounded-full", tone.dot)} />
                <DialogTitle>{policy.name}</DialogTitle>
                <Badge
                  variant="secondary"
                  className={cn("gap-1 capitalize", tone.badge)}
                >
                  <ToneIcon className="h-3.5 w-3.5" />
                  {tone.label}
                </Badge>
              </div>
              {policy.description && (
                <DialogDescription>{policy.description}</DialogDescription>
              )}
            </DialogHeader>

            <div className="space-y-4 py-1">
              {parsed && (
                <div className="space-y-1.5 rounded-md border bg-muted/30 p-3">
                  <ConstraintRow
                    icon={User}
                    label="Principal"
                    value={parsed.principal.label}
                  />
                  <ConstraintRow
                    icon={Zap}
                    label="Action"
                    value={parsed.action.label}
                  />
                  <ConstraintRow
                    icon={Box}
                    label="Resource"
                    value={parsed.resource.label}
                  />
                  {parsed.hasConditions && (
                    <p className="pt-1 text-xs text-muted-foreground">
                      + conditional <code className="font-mono">when</code>{" "}
                      clause
                    </p>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">
                    Source
                  </span>
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
                </div>
                {view === "cedar" ? (
                  <pre className="overflow-x-auto rounded-md bg-muted p-3 font-mono text-xs text-foreground">
                    {formatted}
                  </pre>
                ) : json ? (
                  <JsonView data={json} />
                ) : (
                  <pre className="rounded-md bg-muted p-3 font-mono text-xs text-destructive">
                    // invalid Cedar policy
                  </pre>
                )}
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <span>Created {formatDate(policy.createdAt)}</span>
                <span>Updated {formatDate(policy.updatedAt)}</span>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" className="gap-1">
                <Pencil className="h-3.5 w-3.5" /> Edit
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
