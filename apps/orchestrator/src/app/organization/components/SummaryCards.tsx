import { Card, CardContent } from "@sharpnr/ui";
import { Building2, BedDouble, Landmark, Users, Plug } from "lucide-react";
import {
  PROPERTIES,
  LEGAL_ENTITIES,
  MEMBERS,
  INTEGRATIONS,
  totalRooms,
} from "./orgData";

const stats = [
  { label: "Properties", value: PROPERTIES.length, icon: Building2 },
  { label: "Total rooms", value: totalRooms, icon: BedDouble },
  { label: "Legal entities", value: LEGAL_ENTITIES.length, icon: Landmark },
  { label: "Members", value: MEMBERS.length, icon: Users },
  {
    label: "Integrations",
    value: INTEGRATIONS.filter((i) => i.status === "active").length,
    icon: Plug,
  },
];

export function SummaryCards() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="min-w-0">
              <p className="text-2xl font-semibold leading-none tracking-tight">
                {stat.value}
              </p>
              <p className="mt-1 truncate text-xs text-muted-foreground">
                {stat.label}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
