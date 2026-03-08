import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Route } from "@/routes/_appuser/orchestrator/_orchestrator_layout/_console/property/$propertyId/domain_hospitality/restaurant_dashboard/$restaurantID/index";
import { useRestaurantGeneralInfo } from "@/_hospitalityapp/Restaurant/apis/queries";
import { useAppForm } from "@/components/forms";
import { useUpdateRestaurantGeneralInfo } from "@/_hospitalityapp/Restaurant/apis/mutations";
import { useQueryClient } from "@tanstack/react-query";
import type { RestaurantGeneralInfoInterface } from "@/_hospitalityapp/Restaurant/apis/restaurant.api";
import { ProcessRestaurantConfigurationStatus } from "@/_hospitalityapp/Restaurant/utils/CongifurationStatus";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface RestaurantFormProps {
  restaurant: RestaurantGeneralInfoInterface;
}

function InfoItem({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="text-sm font-medium">{value || "-"}</p>
    </div>
  );
}

function RestaurantForm({ restaurant }: RestaurantFormProps) {
  const [open, setOpen] = useState(false);
  const restaurantID = Route.useParams().restaurantID;
  const updateGeneralInfo = useUpdateRestaurantGeneralInfo();
  const q = useQueryClient();

  const form = useAppForm({
    defaultValues: {
      name: restaurant.name || "",
      opening_time: restaurant.opening_time || "",
      closing_time: restaurant.closing_time || "",
    },
    onSubmit: async ({ value, formApi }) => {
      const dirtyFields = Object.keys(value).filter(
        (key) => formApi.getFieldMeta(key as keyof typeof value)?.isDirty,
      );

      const changedValues = Object.fromEntries(
        dirtyFields.map((key) => [key, value[key as keyof typeof value]]),
      );

      updateGeneralInfo.mutateAsync(
        {
          restaurantID: restaurantID!,
          payload: changedValues,
        },
        {
          onSuccess: () => {
            setOpen(false);
            q.invalidateQueries({
              queryKey: ["Restaurant", "GeneralInfo", restaurantID],
            });
          },
        },
      );
    },
  });

  return (
    <>
      <Card className="rounded-2xl shadow-sm border">
        {/* Header */}
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div>
            <CardTitle className="text-lg font-semibold">
              Restaurant General Settings
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Configure basic information and operating hours
            </p>
          </div>

          <Button size="sm" onClick={() => setOpen(true)}>
            Update Details
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {!restaurant.is_configured && (
            <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
              <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-600" />

              <div className="space-y-1 text-sm">
                <p className="font-medium text-amber-800">
                  Restaurant configuration incomplete
                </p>

                <p className="text-amber-700">
                  {ProcessRestaurantConfigurationStatus(
                    restaurant.current_configured_status,
                  )}
                </p>
              </div>
            </div>
          )}

          <Card
            className={
              restaurant.is_active
                ? "border-green-300"
                : "border-red-200 bg-red-50 dark:bg-red-950/20"
            }
          >
            <CardHeader>
              <CardTitle
                className={
                  restaurant.is_active ? "" : "text-red-700 dark:text-red-400"
                }
              >
                Restaurant Operational Status
              </CardTitle>

              <CardDescription>
                Control whether this restaurant is currently operational. When
                the restaurant is inactive, customers will not be able to browse
                menus or place orders. This can be used during maintenance,
                holidays, or when the restaurant is temporarily closed.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <Label htmlFor="restaurant-active">
                    {restaurant.is_active
                      ? "Restaurant is Operational and Running"
                      : "Restaurant is Currently Inactive"}
                  </Label>

                  <p
                    className={`text-sm ${
                      restaurant.is_active
                        ? "text-muted-foreground"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {restaurant.is_active
                      ? "Customers can browse menus and place orders."
                      : "Restaurant operations are currently stopped. Customers cannot place orders until it is activated."}
                  </p>
                </div>

                <Switch id="restaurant-active" checked={restaurant.is_active} />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoItem label="Restaurant Name" value={restaurant.name} />

            <InfoItem
              label="Opening Time"
              value={restaurant.opening_time || "Not set"}
            />

            <InfoItem
              label="Closing Time"
              value={restaurant.closing_time || "Not set"}
            />

            <div className="space-y-1">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Status
              </p>

              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                  restaurant.is_active
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {restaurant.is_active ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg rounded-2xl">
          <DialogHeader>
            <DialogTitle>Update Restaurant Details</DialogTitle>
          </DialogHeader>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <form.AppField
              name="name"
              children={(f) => <f.TextField label="Restaurant Name" />}
            />

            <form.AppField
              name="opening_time"
              children={(f) => <f.TextField label="Opening Time" type="time" />}
            />

            <form.AppField
              name="closing_time"
              children={(f) => <f.TextField label="Closing Time" type="time" />}
            />

            <DialogFooter className="pt-2">
              <Button
                variant="outline"
                type="button"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>

              <form.AppForm>
                <form.SubmitButton>Save Changes</form.SubmitButton>
              </form.AppForm>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

const RestaurantGeneralSettingsComp = () => {
  const restaurantID = Route.useParams().restaurantID;
  const { data, isLoading } = useRestaurantGeneralInfo(restaurantID!);
  const restaurant = data?.data;

  if (isLoading) {
    return (
      <Card className="rounded-2xl shadow-sm">
        <CardContent className="p-6 text-sm text-muted-foreground">
          Loading restaurant details...
        </CardContent>
      </Card>
    );
  }

  if (!restaurant) {
    return (
      <Card className="rounded-2xl shadow-sm">
        <CardContent className="p-6 text-sm text-muted-foreground">
          Restaurant details not found.
        </CardContent>
      </Card>
    );
  }

  return <RestaurantForm restaurant={restaurant} />;
};

export default RestaurantGeneralSettingsComp;
