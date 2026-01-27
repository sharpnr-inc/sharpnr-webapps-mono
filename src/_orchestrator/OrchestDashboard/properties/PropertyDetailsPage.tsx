import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { usePropertyDetails } from "../api/queries/general";
import {WrenchIcon } from "lucide-react";

interface PropertyDetailsPageProps {
  propertyId: string;
}

export function PropertyDetailsPage({ propertyId }: PropertyDetailsPageProps) {
  const { data, isLoading } = usePropertyDetails(propertyId);
  const property = data?.data;

  return (
    <div className="p-2 space-y-2">
      {/* ===== Header ===== */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            {property?.Name || "Property Details"}
          </h1>
          
        </div>

        {!isLoading && property?.Modules === null && (
          <Button>Configure Modules <WrenchIcon/> </Button>
        )}
      </div>

      {isLoading ? (
        <PropertyDetailsSkeleton />
      ) : !property ? (
        <div className="text-sm text-muted-foreground">
          Property details not found.
        </div>
      ) : (
        <>
          {/* ===== Meta ===== */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">System Details</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <KeyValue label="Property Code" value={property.Code} />
              <KeyValue label="Domain" value={property.Domain || "—"} />
            </CardContent>
          </Card>

          {/* ===== Address ===== */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Address</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{property.AddressLine}</p>
            </CardContent>
          </Card>
          {/* ===== Location ===== */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Location Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <KeyValue label="City" value={property.City} />
              <KeyValue label="State" value={property.State} />
              <KeyValue label="Country" value={property.Country} />
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

/* ----------------------------- */
/* Small key-value row           */
/* ----------------------------- */
function KeyValue({ label, value }: { label: string; value?: string }) {
  return (
    <div className="space-y-1">
      <div className="text-xs text-muted-foreground uppercase tracking-wide">
        {label}
      </div>
      <div className="font-medium">{value || "—"}</div>
    </div>
  );
}

/* ----------------------------- */
/* Skeleton                      */
/* ----------------------------- */
function PropertyDetailsSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-4 w-1/3" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
