import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChefHat, Settings2, ArrowLeft, Printer, Activity } from "lucide-react";

import { Route } from "@/routes/_appuser/_console/property/$propertyId/domain_hospitality/infra_d/$InfraID/index";
import { useKitchenConfiguration, useKitchenDetails } from "../api/quries";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { useAppForm } from "@/components/forms";
import { useUpdateKitchenGenralDetailsMutation } from "../api/mutation";
import { useQueryClient } from "@tanstack/react-query";
import api from "@/middlewares/axios";
import { KitchenEndpoints } from "@/_hospitalityapp/infra/Kitchen/api/api.endpoints";

export function KitchenDashBoard() {
  const navigate = useNavigate();
  const { propertyId, InfraID } = Route.useParams();
  const [openGeneralDialog, setOpenGeneralDialog] = useState(false);
  const { mutateAsync } = useUpdateKitchenGenralDetailsMutation();
  const q = useQueryClient();
  const { data: kitchenDetails } = useKitchenDetails(InfraID);
  const { data: kitchenConfigData } = useKitchenConfiguration(InfraID);

  const form = useAppForm({
    defaultValues: {
      name: kitchenDetails?.data?.Name,
      description: kitchenDetails?.data?.Description,
    },

    onSubmit: async ({ value }) => {
      await mutateAsync(
        { kitchenID: InfraID, payload: value },
        {
          onSuccess: async () => {
            await q.invalidateQueries({
              queryKey: ["Kitchen", "Kitchen-details", InfraID],
            });

            await q.invalidateQueries({
              queryKey: ["Property Details", propertyId],
            });

            setOpenGeneralDialog(false);
          },
        },
      );
    },
  });

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

  const [loading, setLoading] = useState(false);

  const handleActivateDeactiveKitchen = async (checked: boolean) => {
    if (loading) return;

    setLoading(true);

    try {
      await api.patch(
        KitchenEndpoints.ActivateOrDeactivateKitchen(InfraID, checked),
      );

      await q.invalidateQueries({
        queryKey: ["Kitchen", "Kitchen-details", InfraID],
      });

      await q.invalidateQueries({
        queryKey: ["Kitchen", "Kitchen-configuration"],
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-2">
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
            <p> {kitchenDetails?.data?.Description || "Kitchen Settings"}</p>
            <p className="text-sm text-muted-foreground">
              Status: {kitchenDetails?.data?.Status ? "Active" : "Inactive"}
            </p>
          </div>
          <Button onClick={() => setOpenGeneralDialog(true)}>
            Update General Details
          </Button>
        </div>
      </div>

      <Card
        className={
          kitchenConfigData?.data?.is_active
            ? "border-green-300"
            : "border-red-200 bg-red-50 dark:bg-red-950/20"
        }
      >
        <CardHeader>
          <CardTitle
            className={
              kitchenConfigData?.data?.is_active
                ? ""
                : "text-red-700 dark:text-red-400"
            }
          >
            Kitchen Operational Status
          </CardTitle>
        </CardHeader>

        <CardContent className="flex items-start justify-between">
          <div className="space-y-1">
            <Label htmlFor="kitchen-active">
              {kitchenConfigData?.data?.is_active
                ? "Kitchen is Active and Processing Orders"
                : "Kitchen is Currently Inactive"}
            </Label>

            <p
              className={`text-sm ${
                kitchenConfigData?.data?.is_active
                  ? "text-muted-foreground"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {kitchenConfigData?.data?.is_active
                ? "This kitchen can receive and process incoming orders."
                : "This kitchen is currently disabled and will not receive any orders."}
            </p>
          </div>

          <Switch
            id="kitchen-active"
            checked={kitchenConfigData?.data?.is_active ?? false}
            onCheckedChange={handleActivateDeactiveKitchen}
            disabled={loading}
          />
        </CardContent>
      </Card>

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
