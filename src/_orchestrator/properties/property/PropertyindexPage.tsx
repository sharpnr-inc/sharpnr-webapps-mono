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
import { Building, LucideBuilding, PlusIcon } from "lucide-react";
import { useFormsModal } from "@/hooks/FormModalContext";
import { Badge } from "@/components/ui/badge";
import { Alert } from "@/components/ui/alert";
import { useState } from "react";
import AddPropertyForm from "./forms/AddPropertyForm";
import PropertyDomainSelection from "./property_configuration/PropertyDomainSelection";
import { useAddPropertyDomainMutation } from "./api/mutation";
import { useQueryClient } from "@tanstack/react-query";
import { useProperties } from "./api/queries";
import type { Property } from "./api/service";

// This page list all the Properties of the organization
export function PropertyIndexPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // *this query hook the fetch all property that organization have
  // *this return the array of the property
  const { data: properties, isLoading } = useProperties();

  // const { data: domainTypes, isLoading: isDomainLoading } = useDomainType();

  const adddomain = useAddPropertyDomainMutation();
  const qc = useQueryClient();

  const propertyArray = properties?.data?.properties ?? [];

  //*hook for opening the modal
  const { showModal, closeModal } = useFormsModal();

  const handleAddProperty = () => {
    showModal(
      "Add Property",
      "create Property in the organization",
      <AddPropertyForm closeModal={closeModal} />,
    );
  };

  const navigate = useNavigate();

  const handlePropertyNavigation = (p: Property) => {
    if (!p.is_configured && p.domain != null) {
      navigate({
        to: "/property/$propertyId/property-configuration",
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
        to: "/property/$propertyId/details",
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
        ) : propertyArray.length == 0 ? (
          <EmptyPropertySection />
        ) : (
          <div className="grid sm: grid-cols-1 md:grid-cols-3 gap-2">
            {propertyArray.map((p: any) => (
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
                          <Button onClick={() => setIsDialogOpen(true)}>
                            Select Domain
                          </Button>
                          <PropertyDomainSelection
                            onConfirm={async (domainId) => {
                              try {
                                await adddomain.mutateAsync({
                                  domain: domainId,
                                  propertyID: p.id,
                                });

                                await qc.invalidateQueries({
                                  queryKey: [
                                    "ORGANIZATION",
                                    "PROPERTIES",
                                    "ALL",
                                  ],
                                });
                              } catch (error) {
                                console.error("Failed to add domain:", error);
                              }
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
                          Domain Not Provided
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
