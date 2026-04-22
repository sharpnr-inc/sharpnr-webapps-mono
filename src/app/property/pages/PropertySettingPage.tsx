/*
Property Settings Page

Features:
- Property Info Editor
- Visibility Toggle (Public / Private)
- Module Requests Management Section
- Danger Zone (Delete Property)
*/

import { Route } from "@/routes/_appuser/property/$propertyId/property_settings/index";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

import { useState } from "react";

interface PropertySettingPageProps {}

const PropertySettingPage: React.FC<PropertySettingPageProps> = () => {
  const { propertyId } = Route.useParams();

  const [propertyName, setPropertyName] = useState("");
  const [propertySlug, setPropertySlug] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const handleSave = () => {
    console.log({
      propertyId,
      propertyName,
      propertySlug,
      isPublic,
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold">Property Settings</h1>
        <p className="text-muted-foreground">
          Manage your property configuration and access controls
        </p>
      </div>

      {/* Property Information */}
      <Card className="bg-transparent">
        <CardHeader>
          <CardTitle>Property Information</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Property Name</Label>
            <Input
              value={propertyName}
              onChange={(e) => setPropertyName(e.target.value)}
              placeholder="My Property"
            />
          </div>

          <div className="space-y-2">
            <Label>Property Slug</Label>
            <Input
              value={propertySlug}
              onChange={(e) => setPropertySlug(e.target.value)}
              placeholder="my-property"
            />
          </div>

          <Button onClick={handleSave}>Save Changes</Button>
        </CardContent>
      </Card>

      {/* Visibility Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Visibility Settings</CardTitle>
        </CardHeader>

        <CardContent className="flex items-center justify-between">
          <div>
            <p className="font-medium">Public Property</p>
            <p className="text-muted-foreground text-sm">
              Allow others to discover and request module access
            </p>
          </div>

          <Switch checked={isPublic} onCheckedChange={setIsPublic} />
        </CardContent>
      </Card>

      {/* Module Requests */}
      <Card>
        <CardHeader>
          <CardTitle>Module Access Requests</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          <p className="text-muted-foreground text-sm">
            External users requesting module access will appear here.
          </p>

          {/* future list */}
          <div className="text-sm text-muted-foreground">
            No pending requests
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-500">
        <CardHeader>
          <CardTitle className="text-red-500">Danger Zone</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          <Separator />

          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Delete Property</p>
              <p className="text-muted-foreground text-sm">
                This action cannot be undone
              </p>
            </div>

            <Button variant="destructive">Delete Property</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PropertySettingPage;
