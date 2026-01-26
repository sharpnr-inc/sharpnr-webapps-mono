import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Skeleton } from "@/components/ui/skeleton"
import { useOrganizationProperties } from "../api/queries/general"
import { useNavigate } from "@tanstack/react-router"

type Property = {
  ID: string
  Name: string
  City: string
  State: string
  Domain: string
  Code: string
}

export function PropertyIndexPage() {
  const { data, isLoading } = useOrganizationProperties()

  const properties: Property[] = data?.data?.Properties ?? []
  const navigate = useNavigate()

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-semibold">Properties</h1>
        <p className="text-sm text-muted-foreground">
          Manage and access all properties
        </p>
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
                <CardTitle className="text-base">
                  {property.Name}
                </CardTitle>
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
  )
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
  )
}

