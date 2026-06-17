import { Card, CardContent, CardHeader, CardTitle, Button } from "@sharpnr/ui";
import { Plus, Star } from "lucide-react";
import { PROPERTIES, entityForProperty } from "./orgData";
import { StatusBadge } from "./StatusBadge";

export function PropertiesPanel() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">All properties</CardTitle>
        <Button size="sm" variant="outline" className="h-8 gap-1.5 text-xs">
          <Plus className="h-3.5 w-3.5" />
          Add property
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {PROPERTIES.map((prop) => {
            const entity = entityForProperty(prop.id);
            return (
              <div key={prop.id} className="flex items-center gap-4 px-5 py-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-sm font-medium">
                  {prop.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-1.5 text-sm font-medium">
                    {prop.name}
                    <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
                      <Star className="h-3 w-3 fill-current" />
                      {prop.starRating}
                    </span>
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {prop.location} · {prop.rooms} rooms
                    {entity && ` · ${entity.name}`}
                  </p>
                </div>
                <StatusBadge status={prop.status} />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
