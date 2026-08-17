import { Badge, Button } from "@sharpnr/ui";
import { Settings } from "lucide-react";
import { ORG } from "./orgData";

export function OrgHeader() {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border bg-muted text-lg font-medium">
        {ORG.initials}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-xl font-semibold tracking-tight">{ORG.name}</h1>
            <p className="mt-0.5 truncate text-sm text-muted-foreground">
              {ORG.handle} · {ORG.createdAt}
            </p>
          </div>
          <Button variant="outline" size="sm" className="shrink-0 gap-1.5">
            <Settings className="h-4 w-4" />
            Manage
          </Button>
        </div>

        <div className="mt-2 flex flex-wrap gap-1.5">
          <Badge variant="outline" className="gap-1.5 font-normal">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-foreground" />
            Active
          </Badge>
          <Badge variant="secondary" className="font-normal">
            {ORG.domain}
          </Badge>
          <Badge variant="secondary" className="font-normal">
            {ORG.plan}
          </Badge>
          <Badge variant="secondary" className="font-normal">
            {ORG.region}
          </Badge>
        </div>
      </div>
    </div>
  );
}
