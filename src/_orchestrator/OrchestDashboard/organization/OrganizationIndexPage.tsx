import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface OrganizationIndexPageProps {}

const OrganizationIndexPage: React.FC<OrganizationIndexPageProps> = () => {
  return (
    <div className="p-6 space-y-2">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Organization
        </h1>
        <p className="text-sm text-muted-foreground">
          Dummy organization page for UI & routing tests
        </p>
      </div>

      <Separator />

      {/* Domain */}
      <Card>
        <CardHeader>
          <CardTitle>Domain</CardTitle>
        </CardHeader>
        <CardContent>
          <Badge variant="secondary">Hospitality</Badge>
        </CardContent>
      </Card>

      {/* Properties */}
      <Card>
        <CardHeader>
          <CardTitle>Properties</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <Card className="border-dashed">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">
                Hotel Sunrise
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Hospitality Property
            </CardContent>
          </Card>

          <Card className="border-dashed">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">
                Ocean View Resort
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Hospitality Property
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* Legal Entities */}
      <Card>
        <CardHeader>
          <CardTitle>Legal Entities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="rounded-lg border p-3">
            <p className="font-medium">
              Sunrise Hospitality Pvt Ltd
            </p>
            <p className="text-sm text-muted-foreground">
              Legal Entity
            </p>
          </div>

          <div className="rounded-lg border p-3">
            <p className="font-medium">
              Oceanic Ventures LLP
            </p>
            <p className="text-sm text-muted-foreground">
              Legal Entity
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrganizationIndexPage;
