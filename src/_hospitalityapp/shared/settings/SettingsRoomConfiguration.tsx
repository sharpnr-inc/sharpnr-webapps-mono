import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SettingRoomConfiguration() {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle>Room Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Manage room types and pricing.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label>Room Type</Label>
            <Input placeholder="Deluxe Room" />
          </div>
          <div>
            <Label>Base Price (per night)</Label>
            <Input type="number" placeholder="3500" />
          </div>
          <div>
            <Label>Max Occupancy</Label>
            <Input type="number" placeholder="2" />
          </div>
        </div>
        <div className="flex justify-end pt-4">
          <Button>Add Room Type</Button>
        </div>
      </CardContent>
    </Card>
  );
}
