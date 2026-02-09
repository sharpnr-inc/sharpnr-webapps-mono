import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function SetupLegalEntityPage() {
  return (
    <div>
      <Card className="">
        <CardHeader>
          <CardTitle>Add Property</CardTitle>
          <CardDescription>
            Create a property under your organization. You can add more
            properties later.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Property Name */}
          <div className="space-y-2">
            <Label htmlFor="property-name">Property Name</Label>
            <Input id="property-name" placeholder="e.g. Sharpnr Grand Hotel" />
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              placeholder="Street address, building name, landmark"
            />
          </div>

          {/* City / State / Zip */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" placeholder="Bangalore" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input id="state" placeholder="Karnataka" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="zip">ZIP / Postal Code</Label>
              <Input id="zip" placeholder="560001" />
            </div>
          </div>

          {/* Country */}
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input id="country" placeholder="India" />
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone">Contact Phone</Label>
              <Input id="phone" placeholder="+91 98765 43210" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Contact Email</Label>
              <Input id="email" placeholder="property@company.com" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline">Cancel</Button>
            <Button>Create Property</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
