import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { usePropertyDetails } from "../api/queries/general"

interface PropertyDetailsPageProps {
  propertyId: string
}

export function PropertyDetailsPage({ propertyId }: PropertyDetailsPageProps) {
  const { data, isLoading } = usePropertyDetails(propertyId)

  const property = data?.data

  return (
    <div className="p-6 space-y-2">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold">Property Details</h1>
        <p className="text-sm text-muted-foreground">
          Property ID: {propertyId}
        </p>
      </div>

      {isLoading ? (
        <PropertyDetailsSkeleton />
      ) : !property ? (
        <div className="text-sm text-muted-foreground">
          Property details not found.
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>{property.Name}</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <DetailBlock label="Property Code" value={property.Code} />
              <DetailBlock label="City" value={property.City} />
              <DetailBlock label="State" value={property.State} />
              <DetailBlock label="Country" value={property.Country} />
              <DetailBlock
                label="Domain"
                value={property.Domain || "—"}
              />

              {/* Full width address */}
              <div className="md:col-span-2">
                <DetailBlock
                  label="Address"
                  value={property.AddressLine}
                />
              </div>
            </div>

            {/* CTA */}
            {property.Modules === null && (
              <div className="pt-4 border-t">
                <Button>
                  Configure Modules
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

/* ----------------------------- */
/* Grid block component          */
/* ----------------------------- */

function DetailBlock({
  label,
  value,
}: {
  label: string
  value?: string
}) {
  return (
    <div className="rounded-md border p-4 space-y-1">
      <div className="text-xs text-muted-foreground uppercase tracking-wide">
        {label}
      </div>
      <div className="font-medium break-words">
        {value || "—"}
      </div>
    </div>
  )
}

/* ----------------------------- */
/* Skeleton                      */
/* ----------------------------- */

function PropertyDetailsSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-1/2" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-md" />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
