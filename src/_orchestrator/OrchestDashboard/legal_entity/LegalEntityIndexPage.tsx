import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "@tanstack/react-router";
import { useFormsModal } from "@/context/FormModalContext";
import CreateLegalEntityForm from "./CreateLegalEntityForm";
import { useOrganizationLegalEntities } from "../api/queries/legal_entity";

export interface LegalEntity {
  id: string;

  // Core
  name: string;
  type: "PRIVATE_LIMITED" | "LLP" | "SOLE_PROPRIETORSHIP";
  status: "ACTIVE" | "INACTIVE";

  // Registrations
  gstNumber?: string;
  cinNumber?: string;
  panNumber?: string;

  // Meta
  country: string;
  registeredOn: string;

  // Address
  addressLine: string;
  city: string;
  state: string;
}

const dummyLegalEntities: LegalEntity[] = [
  {
    id: "le-1",
    name: "Sharpnr Technologies Pvt Ltd",
    type: "PRIVATE_LIMITED",
    status: "ACTIVE",

    gstNumber: "08ABCDE1234F1Z5",
    cinNumber: "U72200RJ2023PTC087654",
    panNumber: "ABCDE1234F",

    country: "India",
    registeredOn: "2023-04-12",

    addressLine: "B-105 Baney Vihar Colony",
    city: "Jaipur",
    state: "Rajasthan",
  },
  {
    id: "le-2",
    name: "Sharp Hospitality LLP",
    type: "LLP",
    status: "ACTIVE",

    gstNumber: "27PQRSX5678L1Z9",
    cinNumber: "AAE-1234",
    panNumber: "PQRSX5678L",

    country: "India",
    registeredOn: "2022-09-01",

    addressLine: "Sector 18, Vashi",
    city: "Navi Mumbai",
    state: "Maharashtra",
  },
];

export function LegalEntityIndexPage() {
  const { data: legalEntities, isLoading } = useOrganizationLegalEntities();
  console.log("Legal Entities from API:", legalEntities);
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
        <Button onClick={() => handleCreateLE()}>Add Legal Entity</Button>
      </div>

      {/* Grid */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {dummyLegalEntities.map((entity) => (
          <Card key={entity.id}>
            <CardHeader className="pb-2">
              <CardTitle className="truncate">{entity.name}</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3 text-sm">
              {/* Type + Status */}
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  {entity.type.replaceAll("_", " ")}
                </span>
                <Badge
                  variant={entity.status === "ACTIVE" ? "default" : "secondary"}
                >
                  {entity.status}
                </Badge>
              </div>

              {/* Registrations */}
              <div className="grid gap-1">
                <div>
                  <span className="font-medium">GST:</span>{" "}
                  {entity.gstNumber ?? "—"}
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

              {/* Address */}
              <div className="text-muted-foreground text-xs">
                {entity.addressLine}, {entity.city}, {entity.state},{" "}
                {entity.country}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-muted-foreground">
                  Registered on {entity.registeredOn}
                </span>

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
