interface PropertyDetailsPageProps {
  propertyId: string;
}

export function PropertyDetailsPage({ propertyId }:PropertyDetailsPageProps) {
  return (
    <div className="p-6">
      <div className="text-lg font-semibold">
        This is property Details page
      </div>

      <div className="text-sm text-muted-foreground">
        Property ID: {propertyId}
      </div>
    </div>
  )
}
