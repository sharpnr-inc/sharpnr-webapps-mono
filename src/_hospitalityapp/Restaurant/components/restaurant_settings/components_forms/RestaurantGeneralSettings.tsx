import { useState } from "react";
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

const RestaurantGeneralSettingsComp = () => {
  const [open, setOpen] = useState(false);

  // mock data (replace with query data)
  const [restaurant, setRestaurant] = useState({
    name: "Sharp Hospitality Restaurant",
    email: "contact@restaurant.com",
    phone: "+91 9876543210",
    address: "Hingona, Rajasthan",
  });

  const [form, setForm] = useState(restaurant);

  const handleOpen = () => {
    setForm(restaurant);
    setOpen(true);
  };

  const handleSave = () => {
    // TODO: call mutation here
    setRestaurant(form);
    setOpen(false);
  };

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
            <p className="font-medium">{restaurant.name}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Email</p>
            <p className="font-medium">{restaurant.email}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Phone</p>
            <p className="font-medium">{restaurant.phone}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Address</p>
            <p className="font-medium">{restaurant.address}</p>
          </div>

          <Button className="mt-4" onClick={handleOpen}>
            Update Details
          </Button>
        </CardContent>
      </Card>

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
              <Label>Email</Label>
              <Input
                value={form.email}
                onChange={(e) =>
                  setForm((p) => ({ ...p, email: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Phone</Label>
              <Input
                value={form.phone}
                onChange={(e) =>
                  setForm((p) => ({ ...p, phone: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Address</Label>
              <Input
                value={form.address}
                onChange={(e) =>
                  setForm((p) => ({ ...p, address: e.target.value }))
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
