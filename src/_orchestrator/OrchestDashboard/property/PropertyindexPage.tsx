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

interface Property {
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

  const handleSelectChange = (propertyId: string, domainValue: string) => {
    setPendingSelection({ id: propertyId, domain: domainValue });
    setIsDialogOpen(true);
  };

  const confirmDomainChange = () => {
    if (pendingSelection) {
      // 1. Update your propertyList state here
      console.log(
        `Updating ${pendingSelection.id} to ${pendingSelection.domain}`,
      );

      // 2. Close and reset
      setIsDialogOpen(false);
      setPendingSelection(null);
    }
  };

  const cancelDomainChange = () => {
    setIsDialogOpen(false);
    setPendingSelection(null); // This resets the select because it's controlled
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
                        <Select
                          onValueChange={(value) =>
                            handleSelectChange(p.id, value)
                          }
                        >
                          <SelectTrigger className="h-8 w-fit text-xs border-destructive text-destructive">
                            <SelectValue placeholder="Select Domain" />
                          </SelectTrigger>
                          <SelectContent>
                            {/* Hospitality Option */}
                            <SelectItem value="HOSPITALITY">
                              <div className="flex flex-col gap-0.5">
                                <span className="font-bold">Hospitality</span>
                                <span className="text-[10px] text-muted-foreground leading-tight">
                                  Enables Kitchen & Bar modules
                                </span>
                              </div>
                            </SelectItem>

                            {/* Retail Option */}
                            <SelectItem value="RETAIL">
                              <div className="flex flex-col gap-0.5">
                                <span className="font-bold">Retail</span>
                                <span className="text-[10px] text-muted-foreground leading-tight">
                                  Inventory & POS focused
                                </span>
                              </div>
                            </SelectItem>

                            {/* Office Option */}
                            <SelectItem value="OFFICE">
                              <div className="flex flex-col gap-0.5">
                                <span className="font-bold">Office</span>
                                <span className="text-[10px] text-muted-foreground leading-tight">
                                  Space & desk management
                                </span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
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
                          {p.domain === null
                            ? "Domain Configuration Pending"
                            : "Setup is incomplete for this property."}
                        </span>
                      </div>

                      {/* Logic: Show 'Configure' only if domain exists */}
                      {p.domain !== null ? (
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Confirm Domain Selection
            </DialogTitle>
            <DialogDescription className="pt-2">
              You are setting the domain to{" "}
              <strong className="text-foreground">
                {pendingSelection?.domain}
              </strong>
              . This action determines which modules (like Kitchen or Bar) will
              be available for configuration.
            </DialogDescription>
          </DialogHeader>
          <Alert variant={"destructive"}>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle className="font-bold">
              This operation is Irreversible
            </AlertTitle>
            <AlertDescription>
              Once you set it up it cannot be changed
            </AlertDescription>
          </Alert>

          <div className="space-y-4 py-4">
            {/* Documentation Link Section */}
            <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
              <p className="text-sm leading-relaxed text-muted-foreground">
                We highly recommend reviewing our <strong>Domain Manual</strong>{" "}
                to understand how this selection affects your property setup.
              </p>
              <Button
                variant="link"
                className="h-auto p-0 text-primary font-semibold"
                asChild
              >
                <a
                  href={`/docs/domains/${pendingSelection?.domain?.toLowerCase()}`}
                  target="_blank"
                >
                  Learn more about {pendingSelection?.domain} Domain →
                </a>
              </Button>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="ghost" onClick={cancelDomainChange}>
              Cancel
            </Button>
            <Button onClick={confirmDomainChange} className="bg-primary">
              Confirm & Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
