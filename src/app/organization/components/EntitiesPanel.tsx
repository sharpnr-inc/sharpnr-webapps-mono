import { Card, CardContent, CardHeader, CardTitle, Button, Badge } from "@sharpnr/ui";
import { Plus } from "lucide-react";
import {
  LEGAL_ENTITIES,
  entityTypeLabel,
  propertyCountForEntity,
} from "./orgData";

export function EntitiesPanel() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Legal entities</CardTitle>
        <Button size="sm" variant="outline" className="h-8 gap-1.5 text-xs">
          <Plus className="h-3.5 w-3.5" />
          Add entity
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {LEGAL_ENTITIES.map((entity) => (
            <div key={entity.id} className="flex items-center gap-4 px-5 py-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-medium">
                {entity.name
                  .split(" ")
                  .slice(0, 2)
                  .map((w) => w[0])
                  .join("")}
              </div>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2 text-sm font-medium">
                  {entity.name}
                  <Badge variant="secondary" className="font-normal">
                    {entityTypeLabel[entity.type]}
                  </Badge>
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  CIN {entity.cin} · GST {entity.gst} · {entity.location}
                </p>
              </div>
              <span className="shrink-0 text-xs text-muted-foreground">
                {propertyCountForEntity(entity.id)} properties
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
