import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChefHat, Clock3, BellRing, Settings2, ArrowLeft } from "lucide-react";
import { Route } from "@/routes/_appuser/orchestrator/_orchestrator_layout/_console/property/$propertyId/domain_hospitality/infra_d/$InfraID/index";

export function KitchenDashBoard() {
  const navigate = useNavigate();
  const { propertyId } = Route.useParams();

  const [settings, setSettings] = useState({
    autoAcceptOrders: true,
    soundAlerts: true,
    prepTime: "15",
    maxActiveOrders: "10",
  });

  const updateField = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    console.log("Saving kitchen settings:", settings);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Back Button */}
      <Button
        variant="ghost"
        className="flex items-center gap-2 w-fit"
        onClick={() =>
          navigate({
            to: "/orchestrator/property/$propertyId/details",
            params: {
              propertyId,
            },
          })
        }
      >
        <ArrowLeft className="h-4 w-4" />
        Go to Property Details
      </Button>

      {/* Header */}
      <div className="flex items-center gap-3">
        <ChefHat className="h-6 w-6" />
        <h1 className="text-2xl font-semibold">Kitchen Settings</h1>
      </div>

      {/* General Settings */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings2 className="h-4 w-4" />
            General
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <Label>Auto Accept Orders</Label>
            <Switch
              checked={settings.autoAcceptOrders}
              onCheckedChange={(v) => updateField("autoAcceptOrders", v)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>Sound Alerts</Label>
            <Switch
              checked={settings.soundAlerts}
              onCheckedChange={(v) => updateField("soundAlerts", v)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Operational Settings */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock3 className="h-4 w-4" />
            Operational Settings
          </CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Default Prep Time (mins)</Label>
            <Input
              type="number"
              value={settings.prepTime}
              onChange={(e) => updateField("prepTime", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Max Active Orders</Label>
            <Input
              type="number"
              value={settings.maxActiveOrders}
              onChange={(e) => updateField("maxActiveOrders", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BellRing className="h-4 w-4" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Configure how kitchen staff receive alerts for new orders.
          </p>
        </CardContent>
      </Card>

      {/* Save */}
      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Settings</Button>
      </div>
    </div>
  );
}
