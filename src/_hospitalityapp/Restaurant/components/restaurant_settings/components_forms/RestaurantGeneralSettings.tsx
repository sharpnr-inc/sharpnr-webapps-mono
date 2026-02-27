import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Route } from "@/routes/_appuser/orchestrator/_orchestrator_layout/_console/property/$propertyId/domain_hospitality/restaurant_dashboard/$restaurantID/index";
import { useRestaurantGeneralInfo } from "@/_hospitalityapp/Restaurant/apis/queries";

type FormState = {
  name: string;
  opening_time: string;
  closing_time: string;
};

const RestaurantGeneralSettingsComp = () => {
  const [open, setOpen] = useState(false);

  const restaurantID = Route.useParams().restaurantID;
  const { data, isLoading } = useRestaurantGeneralInfo(restaurantID!);

  const restaurant = data?.data;

  const [form, setForm] = useState<FormState>({
    name: "",
    opening_time: "",
    closing_time: "",
  });

  // sync form when api data loads
  useEffect(() => {
    if (restaurant) {
      setForm({
        name: restaurant.name ?? "",
        opening_time: restaurant.opening_time ?? "",
        closing_time: restaurant.closing_time ?? "",
      });
    }
  }, [restaurant]);

  const handleOpen = () => {
    if (!restaurant) return;

    setForm({
      name: restaurant.name ?? "",
      opening_time: restaurant.opening_time ?? "",
      closing_time: restaurant.closing_time ?? "",
    });

    setOpen(true);
  };

  const handleSave = () => {
    // TODO: call mutation here
    // updateRestaurant.mutateAsync(form)
    setOpen(false);
  };

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

  return (
    <>
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Restaurant General Settings
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3 text-sm">
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

          <Button className="mt-4" onClick={handleOpen}>
            Update Details
          </Button>
        </CardContent>
      </Card>

      {/* UPDATE DIALOG */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg rounded-2xl">
          <DialogHeader>
            <DialogTitle>Update Restaurant Details</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Opening Time</Label>
              <Input
                placeholder="09:00"
                value={form.opening_time}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    opening_time: e.target.value,
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Closing Time</Label>
              <Input
                placeholder="22:00"
                value={form.closing_time}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    closing_time: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RestaurantGeneralSettingsComp;
