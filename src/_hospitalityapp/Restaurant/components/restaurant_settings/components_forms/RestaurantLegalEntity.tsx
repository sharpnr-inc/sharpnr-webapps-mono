import { useMemo, useState, useEffect } from "react";
import { Info, Building2 } from "lucide-react";
import { useOrganizationLegalEntities } from "@/_orchestrator/legal_entity/api/legalEntity.api.queries";
import { Route } from "@/routes/_appuser/orchestrator/_orchestrator_layout/_console/property/$propertyId/domain_hospitality/restaurant_dashboard/$restaurantID/index";
import { useRestaurantGeneralInfo } from "@/_hospitalityapp/Restaurant/apis/queries";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type LegalEntity = {
  id: string;
  name: string;
  gst: string | null;
  addressLine: string;
  city: string;
  state: string;
};

const NIL_UUID = "00000000-0000-0000-0000-000000000000";

export function RestaurantLegalEntity() {
  const { restaurantID } = Route.useParams();

  const { data } = useOrganizationLegalEntities();
  const { data: restuarntDetails, isLoading } = useRestaurantGeneralInfo(
    restaurantID!,
  );

  const legalEntities: LegalEntity[] = useMemo(() => {
    return data?.data ?? [];
  }, [data]);

  const restaurantLegalEntityId =
    restuarntDetails?.data?.resturant_legal_entity_id;

  const restaurantHasLegalEntity =
    restaurantLegalEntityId && restaurantLegalEntityId !== NIL_UUID;

  const [selectedId, setSelectedId] = useState<string>("");

  /* Auto select if restaurant already has entity */
  useEffect(() => {
    if (restaurantHasLegalEntity) {
      setSelectedId(restaurantLegalEntityId);
    }
  }, [restaurantLegalEntityId, restaurantHasLegalEntity]);

  /* No Legal Entity in Organization */
  if (!isLoading && legalEntities.length === 0) {
    return (
      <div className="rounded-xl border p-6 text-center space-y-3">
        <Building2 className="h-8 w-8  text-muted-foreground" />

        <h3 className="text-sm font-semibold">No Legal Entity Found</h3>

        <p className="text-sm text-muted-foreground">
          Your organization does not have any Legal Entity. Please create one
          before assigning it to a restaurant.
        </p>

        <button className="mt-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm">
          Add Legal Entity
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* INFO */}
      <div className="rounded-2xl border bg-blue-50/50 p-4">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-blue-100 p-2">
            <Info className="h-4 w-4 text-blue-600" />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-blue-900">
              Restaurant Legal Entity
            </h3>

            <p className="text-sm text-blue-800">
              Select the legal entity that owns this restaurant.
            </p>
          </div>
        </div>
      </div>

      {/* SELECT */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Legal Entity</label>

        <Select
          value={selectedId}
          onValueChange={(val) => setSelectedId(val)}
          // disabled={restaurantHasLegalEntity}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Legal Entity" />
          </SelectTrigger>

          <SelectContent>
            {legalEntities.map((entity) => (
              <SelectItem key={entity.id} value={entity.id}>
                {entity.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {restaurantHasLegalEntity && (
          <p className="text-xs text-muted-foreground">
            This restaurant already has a legal entity assigned.
          </p>
        )}
      </div>
    </div>
  );
}
