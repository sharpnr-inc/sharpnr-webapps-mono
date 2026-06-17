import { Card, CardContent, CardHeader, CardTitle, Badge } from "@sharpnr/ui";
import { Boxes, TrendingUp, TrendingDown, Minus, AlertTriangle } from "lucide-react";
import { inventoryStats, lowStockItems, type InventoryStat } from "./feedData";

function TrendIcon({ trend }: { trend: InventoryStat["trend"] }) {
  if (trend === "up") return <TrendingUp className="h-3.5 w-3.5" />;
  if (trend === "down") return <TrendingDown className="h-3.5 w-3.5" />;
  return <Minus className="h-3.5 w-3.5" />;
}

export function InventoryOverview() {
  return (
    <section className="space-y-4">
      <header className="flex items-center gap-2">
        <Boxes className="h-5 w-5 text-muted-foreground" />
        <h2 className="text-base font-semibold">Inventory overview</h2>
      </header>

      <div className="grid grid-cols-2 gap-3">
        {inventoryStats.map((stat) => (
          <Card key={stat.id}>
            <CardContent className="space-y-1 p-4">
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="text-xl font-semibold tracking-tight">{stat.value}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <TrendIcon trend={stat.trend} />
                <span>{stat.trendValue}</span>
                <span className="truncate">· {stat.hint}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            Low stock alerts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          {lowStockItems.map((item) => {
            const pct = Math.min(100, Math.round((item.remaining / item.threshold) * 100));
            return (
              <div key={item.id} className="space-y-1.5">
                <div className="flex items-center justify-between gap-2 text-sm">
                  <div className="min-w-0">
                    <p className="truncate font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.sku}</p>
                  </div>
                  <Badge variant="outline" className="shrink-0 font-normal">
                    {item.remaining} left
                  </Badge>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-foreground/70"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </section>
  );
}
