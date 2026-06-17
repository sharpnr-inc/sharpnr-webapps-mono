import { Card, CardContent, Button } from "@sharpnr/ui";
import { PackagePlus, FileText, Truck, BarChart3 } from "lucide-react";

const actions = [
  { id: "qa1", label: "Add stock", icon: PackagePlus },
  { id: "qa2", label: "New order", icon: FileText },
  { id: "qa3", label: "Track shipment", icon: Truck },
  { id: "qa4", label: "View reports", icon: BarChart3 },
];

export function QuickActions() {
  return (
    <Card>
      <CardContent className="grid grid-cols-2 gap-2 p-3 sm:grid-cols-4">
        {actions.map((action) => (
          <Button
            key={action.id}
            variant="ghost"
            className="h-auto flex-col gap-1.5 py-3"
          >
            <action.icon className="h-5 w-5 text-muted-foreground" />
            <span className="text-xs font-medium">{action.label}</span>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
