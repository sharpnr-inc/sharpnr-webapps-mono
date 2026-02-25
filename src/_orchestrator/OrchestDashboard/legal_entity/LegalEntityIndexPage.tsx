import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "@tanstack/react-router";
import { useFormsModal } from "@/context/FormModalContext";
import CreateLegalEntityForm from "./CreateLegalEntityForm";
import { useOrganizationLegalEntities } from "../api/queries/legal_entity";

export function LegalEntityIndexPage() {
  const { data: legalEntities, isLoading } = useOrganizationLegalEntities();

  const navigate = useNavigate();
  const { showModal } = useFormsModal();

  const handleCreateLE = () => {
    showModal(
      "Create legal Entity",
      "Here you can Create Legal Entity",
      <CreateLegalEntityForm />,
    );
  };

  return (
    <div className="space-y-6 mt-4 p-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Legal Entities</h1>
        <Button onClick={handleCreateLE}>Add Legal Entity</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {/* Loading Skeleton */}
        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-5 w-3/4" />
              </CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-8 w-full mt-2" />
              </CardContent>
            </Card>
          ))}

        {/* Data */}
        {legalEntities?.data?.map((entity: any) => (
          <Card key={entity.id}>
            <CardHeader className="pb-2">
              <CardTitle className="truncate">{entity.name}</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">{entity.type}</span>

                <Badge variant="secondary">Active</Badge>
              </div>

              <div className="grid gap-1">
                <div>
                  <span className="font-medium">GST:</span> {entity.gst ?? "—"}
                </div>
                <div>
                  <span className="font-medium">CIN:</span>{" "}
                  {entity.cinNumber ?? "—"}
                </div>
                <div>
                  <span className="font-medium">PAN:</span>{" "}
                  {entity.panNumber ?? "—"}
                </div>
              </div>

              <div className="text-muted-foreground text-xs">
                {entity.addressLine}, {entity.city}, {entity.state},{" "}
                {entity.country}
              </div>

              <div className="flex items-center justify-end pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    navigate({
                      to: "/orchestrator/legal_entity/$leID/details",
                      params: {
                        leID: entity.id,
                      },
                    })
                  }
                >
                  See Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
