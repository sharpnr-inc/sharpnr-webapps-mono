import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function SettingsRestaurantConfigSection() {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle>Restaurant Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Configure restaurant settings and schedules.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Opening Time</Label>
            <Input type="time" />
          </div>
          <div>
            <Label>Closing Time</Label>
            <Input type="time" />
          </div>
          <div>
            <Label>Service Tax (%)</Label>
            <Input type="number" placeholder="5" />
          </div>
          <div>
            <Label>Special Instructions</Label>
            <Textarea placeholder="E.g., Closed on Mondays, last order at 10 PM." />
          </div>
        </div>
        <div className="flex justify-end pt-4">
          <Button>Save Restaurant Settings</Button>
        </div>
      </CardContent>
    </Card>
  );
}
