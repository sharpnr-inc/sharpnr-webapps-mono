// this is the page show all the property of the organization
// This more data

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

import { Skeleton } from "@/components/ui/skeleton";
// import { useOrganizationProperties } from "../api/queries/general";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { AlertCircle, Building, LucideBuilding, PlusIcon } from "lucide-react";
import { useFormsModal } from "@/context/FormModalContext";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import AddPropertyForm from "./forms/AddPropertyForm";
import { useOrganizationProperties } from "../api/queries/general";
import { useDomainType } from "./api/queries";
import PropertyDomainSelection from "./property_configuration/PropertyDomainSelection";

export interface Property {
  id: string;
  name: string;
  property_code: string;
  state: string;
  city: string;
  domain: string | null;
  is_configured: boolean;
}

// This page list all the Properties of the organization
export function PropertyIndexPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pendingSelection, setPendingSelection] = useState<{
    id: string;
    domain: string;
  } | null>(null);
  // *this query hook the fetch all property that organization have
  // *this return the array of the property
  const { data: properties, isLoading } = useOrganizationProperties();
  // const { data: domainTypes, isLoading: isDomainLoading } = useDomainType();

  const propoertyarray = properties?.data?.Properties ?? [];

  //*hook for opening the modal
  const { showModal } = useFormsModal();

  const handleAddProperty = () => {
    showModal(
      "Add Property",
      "create Property in the organization",
      <AddPropertyForm />,
    );
  };

  const navigate = useNavigate();

  const handlePropertyNavigation = (p: Property) => {
    if (!p.is_configured && p.domain != null) {
      navigate({
        to: "/orchestrator/property/$propertyId/property-configuration",
        search: {
          p_domain: p.domain,
          p_name: p.name,
        },
        params: {
          propertyId: p.id,
        },
      });
    } else {
      navigate({
        to: "/orchestrator/property/$propertyId/details",
        params: {
          propertyId: p.id,
        },
      });
    }
  };

  return (
    <div className="p-2 space-y-2">
      {/* Header start */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Properties</h1>
          <p className="text-sm text-muted-foreground">
            {"Manage all the properties here"}
          </p>
        </div>

        <Button onClick={() => handleAddProperty()}>
          <PlusIcon /> <Building />
          Add Property
        </Button>
      </div>
      {/* Header ends */}
      <section>
        {isLoading ? (
          <PropertyCardSkeleton />
        ) : propoertyarray.length == 0 ? (
          <EmptyPropertySection />
        ) : (
          <div className="grid sm: grid-cols-1 md:grid-cols-3 gap-2">
            {propoertyarray.map((p: any) => (
              <Card
                key={p.id}
                className="flex flex-col justify-between hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{p.name}</CardTitle>
                      <CardDescription className="font-mono text-sm">
                        CODE: {p.code}
                      </CardDescription>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      {p.domain ? (
                        <Badge variant="default" className="">
                          {p.domain}
                        </Badge>
                      ) : (
                        <>
                          <Button onClick={()=> setIsDialogOpen(true)}>Select Domain</Button>
                          <PropertyDomainSelection
                            onConfirm={(domainId) => {
                              // call mutation here
                              console.log("Confirmed domain:", domainId);
                            }}
                            property={p}
                            onOpenChange={setIsDialogOpen}
                            open={isDialogOpen}
                          />
                        </>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    <p>
                      {p.city}, {p.state},
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div
                      className={`h-2 w-2 rounded-full ${p.is_configured ? "bg-green-500" : "bg-red-500"}`}
                    />
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      {p.is_configured ? "Active" : "Pending Setup"}
                    </span>
                  </div>
                </CardContent>

                <CardFooter className="pt-0">
                  {!p.is_configured ? (
                    <Alert
                      variant="destructive"
                      className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full bg-destructive/5"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs">
                          {p.domain === ""
                            ? "Domain Configuration Pending"
                            : "Setup is incomplete for this property."}
                        </span>
                      </div>

                      {/* Logic: Show 'Configure' only if domain exists */}
                      {p.domain !== "" ? (
                        <Button
                          onClick={() => handlePropertyNavigation(p)}
                          size="sm"
                          className="w-full sm:w-auto"
                        >
                          Configure Now
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          disabled
                          className="w-full sm:w-auto opacity-50 animate-pulse"
                        >
                          Waiting for Domain...
                        </Button>
                      )}
                    </Alert>
                  ) : (
                    <Button
                      onClick={() => handlePropertyNavigation(p)}
                      variant="secondary"
                      className="w-full"
                    >
                      View Dashboard
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function EmptyPropertySection() {
  return (
    <div>
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant={"icon"}>
            <LucideBuilding />
          </EmptyMedia>
          <EmptyTitle>{"No property"}</EmptyTitle>
          <EmptyDescription>
            You haven&apos;t created any projects yet. Get started by creating
            your first project.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="flex-row justify-center gap-2">
          <Button>Create Property</Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}

function PropertyCardSkeleton() {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="flex flex-col justify-between">
          <CardHeader>
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </CardHeader>

          <CardContent className="space-y-3">
            <Skeleton className="h-3 w-2/3" />
            <Skeleton className="h-3 w-1/3" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-2 w-2 rounded-full" />
              <Skeleton className="h-3 w-20" />
            </div>
          </CardContent>

          <CardFooter>
            <Skeleton className="h-9 w-full" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
