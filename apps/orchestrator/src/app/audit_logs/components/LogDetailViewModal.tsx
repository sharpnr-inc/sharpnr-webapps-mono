import { Badge } from "@sharpnr/ui";
import { format } from "date-fns";
import type { AuditLogEntry } from "../api/types";
import {
  DESTRUCTIVE_ACTION,
  actorLabel,
  entryTitle,
  formatAction,
  formatMetaValue,
  getInitials,
} from "../utils/format";

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3 py-2 border-b border-border/50 last:border-0">
      <span className="text-xs text-muted-foreground shrink-0 capitalize">
        {label}
      </span>
      <span className="text-xs font-medium text-foreground text-right break-all">
        {value}
      </span>
    </div>
  );
}

function LogDetailViewModal({ entry }: { entry: AuditLogEntry }) {
  const name = actorLabel(entry);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <Badge
          variant={
            DESTRUCTIVE_ACTION.test(entry.action) ? "destructive" : "secondary"
          }
        >
          {formatAction(entry.action)}
        </Badge>
        <Badge variant="outline" className="capitalize">
          {entry.module}
        </Badge>
      </div>

      <p className="text-sm font-medium text-foreground leading-snug">
        {entryTitle(entry)}
      </p>

      {/* Actor */}
      <div className="flex items-center gap-3 rounded-lg border bg-background px-3 py-2.5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-[11px] font-bold text-muted-foreground">
          {getInitials(name)}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-foreground">{name}</p>
          <p className="truncate text-xs text-muted-foreground capitalize">
            {entry.actor.type}
            {entry.actor.id ? ` · ${entry.actor.id}` : ""}
          </p>
        </div>
      </div>

      {/* Meta facts */}
      <div className="space-y-0">
        <DetailRow
          label="When"
          value={format(new Date(entry.createdAt), "PPpp")}
        />
        {entry.resourceType && (
          <DetailRow label="Resource" value={entry.resourceType} />
        )}
        {entry.resourceId && (
          <DetailRow label="Resource ID" value={entry.resourceId} />
        )}
        <DetailRow label="IP address" value={entry.actor.ipAddress || "—"} />
        <DetailRow label="Event ID" value={entry.id} />
        {entry.metadata &&
          Object.entries(entry.metadata).map(([k, v]) => (
            <DetailRow
              key={k}
              label={k.replace(/_/g, " ")}
              value={formatMetaValue(v)}
            />
          ))}
      </div>
    </div>
  );
}

export default LogDetailViewModal;
