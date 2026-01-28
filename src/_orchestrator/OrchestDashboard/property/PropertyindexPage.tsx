import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";
import { useOrganizationProperties } from "../api/queries/general";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Building, PlusIcon } from "lucide-react";
import { AddPropertyCard } from "./components/AddPropertyCard";
import { useFormsModal } from "@/context/FormModalContext";

type Property = {
  ID: string;
  Name: string;
  City: string;
  State: string;
  Domain: string;
  Code: string;
};

// This page list all the Properties of the organization

export function PropertyIndexPage() {
  const { data, isLoading } = useOrganizationProperties();
  const { showModal, closeModal } = useFormsModal();

  const handleAddProperty = () => {
    showModal("Add Property", "", <AddPropertyCard />);
  };

  const properties: Property[] = data?.data?.Properties ?? [];
  const navigate = useNavigate();

  return (
    <div className="p-2 space-y-2">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Properties</h1>
          <p className="text-sm text-muted-foreground">
            Manage and access all properties
          </p>
        </div>

        <Button onClick={() => handleAddProperty()}>
          <PlusIcon /> <Building />
          Add Property
        </Button>
      </div>

      {/* Content */}
      {isLoading ? (
        <PropertyCardSkeleton />
      ) : properties.length === 0 ? (
        <div className="text-sm text-muted-foreground">
          No properties found.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <Card
              key={property.ID}
              role="button"
              className="cursor-pointer transition-shadow hover:shadow-2xl"
              onClick={() =>
                navigate({
                  to: "/orchestrator/property/$propertyId/details",
                  params: {
                    propertyId: property.ID,
                  },
                })
              }
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{property.Name}</CardTitle>
                <CardDescription>
                  {property.City}, {property.State}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Code</span>
                  <span>{property.Code}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Domain</span>
                  <span>{property.Domain || "—"}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function PropertyCardSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
