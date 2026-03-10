import { useAccountingStore } from "@/_accountingapp/store/accounting.store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, MapPin } from "lucide-react";

export function AccountingOverviewPage() {
  const selectedLegalEntity = useAccountingStore((s) => s.selectedLegalEntity);

  if (!selectedLegalEntity) {
    return (
      <div className="text-muted-foreground">No legal entity selected.</div>
    );
  }

  return (
    <div className="p-4">
      <Card className="max-w-md">
        <CardHeader className="flex flex-row items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <Building2 className="size-5" />
          </div>

          <CardTitle>{selectedLegalEntity.name}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="size-4" />
            <span>
              {selectedLegalEntity.city}, {selectedLegalEntity.state}
            </span>
          </div>

          <div className="text-muted-foreground">
            Type: {selectedLegalEntity.type}
          </div>

          {selectedLegalEntity.gst && <div>GST: {selectedLegalEntity.gst}</div>}
        </CardContent>
      </Card>
    </div>
  );
}
