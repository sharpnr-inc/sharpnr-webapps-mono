import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChefHat, Settings2, ArrowLeft, Printer, Activity } from "lucide-react";

import { Route } from "@/routes/_appuser/orchestrator/_orchestrator_layout/_console/property/$propertyId/domain_hospitality/infra_d/$InfraID/index";
import { useKitchenConfiguration, useKitchenDetails } from "../api/quries";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { useAppForm } from "@/components/forms";
import { useUpdateKitchenGenralDetailsMutation } from "../api/mutation";

export function KitchenDashBoard() {
  const navigate = useNavigate();
  const { propertyId, InfraID } = Route.useParams();
  const [openGeneralDialog, setOpenGeneralDialog] = useState(false);
  const { mutateAsync } = useUpdateKitchenGenralDetailsMutation();

  const form = useAppForm({
    defaultValues: {
      name: "",
      description: "",
    },

    onSubmit: async ({ value }) => {
      mutateAsync({ kitchenID: InfraID, payload: value });
    },
  });

  const { data: kitchenDetails } = useKitchenDetails(InfraID);
  const { data: kitchenConfigData } = useKitchenConfiguration(InfraID);

  const [settings, setSettings] = useState({
    auto_accept: false,
    printer_type: "",
    printer_ip: "",
    printer_port: 0,
    throttling_enabled: false,
    max_orders_per_slot: 0,
    slot_duration_mins: 0,
  });

  useEffect(() => {
    if (!kitchenConfigData?.data) return;

    const cfg = kitchenConfigData.data;

    setSettings({
      auto_accept: cfg.auto_accept ?? false,
      printer_type: cfg.printer_type ?? "",
      printer_ip: cfg.printer_ip ?? "",
      printer_port: cfg.printer_port ?? 0,
      throttling_enabled: cfg.throttling?.enabled ?? false,
      max_orders_per_slot: cfg.throttling?.max_orders_per_slot ?? 0,
      slot_duration_mins: cfg.throttling?.slot_duration_mins ?? 0,
    });
  }, [kitchenConfigData]);

  const updateField = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    const payload = {
      auto_accept: settings.auto_accept,
      printer_type: settings.printer_type,
      printer_ip: settings.printer_ip,
      printer_port: Number(settings.printer_port),
      throttling: {
        enabled: settings.throttling_enabled,
        max_orders_per_slot: Number(settings.max_orders_per_slot),
        slot_duration_mins: Number(settings.slot_duration_mins),
      },
    };

    console.log("Saving kitchen config:", payload);
  };

  return (
    <div className="p-6 space-y-6">
      <Button
        variant="ghost"
        className="flex items-center gap-2 w-fit"
        onClick={() =>
          navigate({
            to: "/orchestrator/property/$propertyId/details",
            params: { propertyId },
          })
        }
      >
        <ArrowLeft className="h-4 w-4" />
        Go to Property Details
      </Button>

      <div className="flex items-center gap-3">
        <ChefHat className="h-6 w-6" />
        <div className="flex justify-between w-full">
          <div>
            <h1 className="text-2xl font-semibold">
              {kitchenDetails?.data?.Name || "Kitchen Settings"}
            </h1>
            <p className="text-sm text-muted-foreground">
              Status: {kitchenDetails?.data?.Status ? "Active" : "Inactive"}
            </p>
          </div>
          <Button onClick={() => setOpenGeneralDialog(true)}>
            Update General Details
          </Button>
        </div>
      </div>

      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings2 className="h-4 w-4" />
            General
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex items-center justify-between">
            <Label>Auto Accept Orders</Label>
            <Switch
              checked={settings.auto_accept}
              onCheckedChange={(v) => updateField("auto_accept", v)}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Printer className="h-4 w-4" />
            Printer Configuration
          </CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Printer Type</Label>
            <Input
              value={settings.printer_type}
              onChange={(e) => updateField("printer_type", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Printer IP</Label>
            <Input
              value={settings.printer_ip}
              onChange={(e) => updateField("printer_ip", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Port</Label>
            <Input
              type="number"
              value={settings.printer_port}
              onChange={(e) => updateField("printer_port", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Order Throttling
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Enable Throttling</Label>
            <Switch
              checked={settings.throttling_enabled}
              onCheckedChange={(v) => updateField("throttling_enabled", v)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Max Orders Per Slot</Label>
              <Input
                type="number"
                value={settings.max_orders_per_slot}
                onChange={(e) =>
                  updateField("max_orders_per_slot", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Slot Duration (mins)</Label>
              <Input
                type="number"
                value={settings.slot_duration_mins}
                onChange={(e) =>
                  updateField("slot_duration_mins", e.target.value)
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Settings</Button>
      </div>

      <Dialog open={openGeneralDialog} onOpenChange={setOpenGeneralDialog}>
        <DialogContent>
          <DialogHeader>Update Kitchen Details</DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-4"
          >
            <form.AppField
              name="name"
              children={(f) => <f.TextField label="Kitchen Name" />}
            />

            <form.AppField
              name="description"
              children={(f) => <f.TextAreaField label="Kitchen Description" />}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpenGeneralDialog(false)}
              >
                Cancel
              </Button>

              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
