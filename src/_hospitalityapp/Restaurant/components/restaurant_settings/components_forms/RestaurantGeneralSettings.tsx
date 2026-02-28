import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

// ─── Types ───────────────────────────────────────────────────────────────────

interface Restaurant {
  name: string;
  opening_time: string;
  closing_time: string;
  is_active: boolean;
  is_configured: boolean;
}

// ─── Inner Form Component (always receives real data) ────────────────────────

function RestaurantForm({ restaurant }: { restaurant: Restaurant }) {
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
            q.invalidateQueries();
          },
        },
      );
    },
  });

  return (
    <>
      <Card className="relative rounded-2xl shadow-sm">
        <CardHeader className="relative">
          <CardTitle className="text-xl font-semibold">
            Restaurant General Settings
          </CardTitle>

          {/* TOP RIGHT BUTTON */}
          <Button
            className="absolute right-4 top-4"
            onClick={() => setOpen(true)}
            size="sm"
          >
            Update Details
          </Button>
        </CardHeader>

        <CardContent className="space-y-4 text-sm">
          {!restaurant.is_configured && (
            <div className="rounded-xl border border-border bg-secondary/20 p-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="mt-0.5 h-4 w-4 text-foreground" />
                <div className="text-sm leading-relaxed text-foreground">
                  <p className="font-medium">
                    Your restaurant is not configured yet.
                  </p>
                  <p className="mt-1 text-muted-foreground">
                    Please complete the following setup:
                  </p>
                  <ul className="mt-1 list-disc space-y-1 pl-5 text-muted-foreground">
                    <li>Add Menu</li>
                    <li>Add at least 1 Table</li>
                    <li>Complete General Details</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          <div>
            <p className="text-muted-foreground">Name</p>
            <p className="font-medium">{restaurant.name || "-"}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Opening Time</p>
            <p className="font-medium">
              {restaurant.opening_time || "Not set"}
            </p>
          </div>

          <div>
            <p className="text-muted-foreground">Closing Time</p>
            <p className="font-medium">
              {restaurant.closing_time || "Not set"}
            </p>
          </div>

          <div>
            <p className="text-muted-foreground">Status</p>
            <p className="font-medium">
              {restaurant.is_active ? "Active" : "Inactive"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* UPDATE DIALOG */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg rounded-2xl">
          <DialogHeader>
            <DialogTitle>Update Restaurant Details</DialogTitle>
          </DialogHeader>

          <form
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

            <DialogFooter className="mt-4">
              <Button
                variant="outline"
                type="button"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <form.AppForm>
                <div>
                  {" "}
                  <form.SubmitButton>Save changes</form.SubmitButton>
                </div>
              </form.AppForm>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

// ─── Outer Component (handles loading/error) ─────────────────────────────────

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

  // ✅ Only renders RestaurantForm when real data exists
  return <RestaurantForm restaurant={restaurant} />;
};

export default RestaurantGeneralSettingsComp;
