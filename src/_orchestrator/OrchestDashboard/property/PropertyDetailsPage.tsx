import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { usePropertyDetails } from "../api/queries/general";
import { WrenchIcon, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useNavigate } from "@tanstack/react-router";

interface PropertyDetailsPageProps {
  propertyId: string;
}

export function PropertyDetailsPage({ propertyId }: PropertyDetailsPageProps) {
  const { data, isLoading } = usePropertyDetails(propertyId);
  const property = data?.data;
  const isModuleConfigured = property?.Modules === null;
  const isDomain = property?.Domain;

  const nav = useNavigate();

  return (
    <div className="p-2 space-y-4">
      {/* ===== Header ===== */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            {property?.Name || "Property Details"}
          </h1>
        </div>
      </div>

      {isLoading ? (
        <PropertyDetailsSkeleton />
      ) : !property ? (
        <div className="text-sm text-muted-foreground">
          Property details not found.
        </div>
      ) : (
        <>
          {!isDomain && (
            <Alert variant="warning">
              <AlertCircle />
              <AlertTitle>Property not fully configured</AlertTitle>
              <AlertDescription>
                <p>
                  This property is not fully configured. Some features may be
                  unavailable.
                </p>
                <Button
                  size="sm"
                  className="mt-2"
                  onClick={() =>
                    nav({
                      to: "/orchestrator/property/$propertyId/property-configuration",
                      params: {
                        propertyId: propertyId,
                      },
                      search: {
                        p_name: property?.Name,
                      },
                    })
                  }
                >
                  Configure
                  <WrenchIcon className="ml-2 h-4 w-4" />
                </Button>
              </AlertDescription>
            </Alert>
          )}

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Property Details</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="md:col-span-1 space-y-4">
                <KeyValue label="Property Code" value={property.Code} />
                <KeyValue label="Domain" value={property.Domain || "—"} />
              </div>
              <div className="md:col-span-2 space-y-4">
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">
                    Address
                  </div>
                  <p className="font-medium leading-relaxed">
                    {property.AddressLine}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <KeyValue label="City" value={property.City} />
                  <KeyValue label="State" value={property.State} />
                  <KeyValue label="Country" value={property.Country} />
                </div>
              </div>
            </CardContent>
            {!isModuleConfigured && (
              <CardFooter>
                <Button
                  onClick={() =>
                    nav({
                      to: "/orchestrator/property/$propertyId/property-configuration",
                      params: {
                        propertyId: propertyId,
                      },
                      search: {
                        p_name: property?.Name,
                      },
                    })
                  }
                >
                  Add Modules
                </Button>
              </CardFooter>
            )}
          </Card>

          {isModuleConfigured && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">Configured Modules</CardTitle>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    nav({
                      to: "/orchestrator/property/$propertyId/property-configuration",
                      params: { propertyId },
                      search: { p_name: property?.Name },
                    })
                  }
                >
                  Manage Modules
                </Button>
              </CardHeader>

              <CardContent className="space-y-6">
                {Object.entries(property?.Modules).map(
                  ([moduleName, entities]: any) => (
                    <div key={moduleName} className="space-y-2">
                      {/* Module Name */}
                      <div className="text-sm font-semibold">{moduleName}</div>

                      {/* Module Entities */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {entities.map((item: any) => (
                          <div
                            key={item.ID}
                            className="flex items-center justify-between rounded-md border p-3 text-sm"
                          >
                            <span className="font-medium">{item.Name}</span>

                            <span
                              className={
                                item.Status
                                  ? "text-green-600"
                                  : "text-muted-foreground"
                              }
                            >
                              {item.Status ? "Active" : "Inactive"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ),
                )}
              </CardContent>
            </Card>
          )}
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
      {Array.from({ length: 1 }).map((_, i) => (
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
