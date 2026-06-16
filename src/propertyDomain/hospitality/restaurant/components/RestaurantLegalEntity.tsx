import { useState, useEffect } from "react";
import {
  Info,
  Building2,
  Pencil,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Route } from "@/routes/_appuser/property/$propertyId/domain_hospitality/restaurant_dashboard/$restaurantID/index";
import { useRestaurantGeneralInfo } from "@/propertyDomain/hospitality/restaurant/apis/queries";
import { useUpdateRestaurantGeneralInfo } from "@/propertyDomain/hospitality/restaurant/apis/mutations";
import { useQueryClient } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sharpnr/ui";

export function RestaurantLegalEntity() {
  const { restaurantID } = Route.useParams();

  const queryClient = useQueryClient();

  const { data: restaurantDetails } = useRestaurantGeneralInfo(restaurantID!);

  const { mutateAsync } = useUpdateRestaurantGeneralInfo();

  const restaurantLegalEntityId =
    restaurantDetails?.data?.resturant_legal_entity_id;

  const restaurantHasLegalEntity =
    restaurantLegalEntityId && restaurantLegalEntityId !== NIL_UUID;

  const currentEntity = legalEntities.find(
    (e) => e.id === restaurantLegalEntityId,
  );

  const [selectedId, setSelectedId] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (restaurantHasLegalEntity) {
      setSelectedId(restaurantLegalEntityId);
    }
  }, [restaurantLegalEntityId, restaurantHasLegalEntity]);

  const handleUpdateLegalEntity = async (id: string) => {
    setSelectedId(id);

    await mutateAsync(
      {
        payload: {
          legal_entity_id: id,
        },
        restaurantID,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["Restaurant", "GeneralInfo", restaurantID],
          });

          setIsEditing(false);
        },
      },
    );
  };

  /* ── Empty state ────────────────────────────────────────── */

  /* ── Main UI ────────────────────────────────────────────── */
  return (
    <div className="space-y-3">
      {/* ── Info banner ── */}
      <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
        <Info className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
        <p className="text-sm text-blue-700 leading-snug">
          Select the <span className="font-medium">legal entity</span> that owns
          this restaurant. This is used for billing, compliance, and reporting.
        </p>
      </div>

      {/* ── Assigned entity card (view mode) ── */}
      {restaurantHasLegalEntity && !isEditing && currentEntity && (
        <div className="rounded-xl border bg-card overflow-hidden">
          {/* Status strip */}
          <div className="flex items-center gap-1.5 bg-emerald-50 border-b border-emerald-100 px-4 py-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
            <span className="text-xs font-medium text-emerald-700">
              Legal entity assigned
            </span>
          </div>

          {/* Entity body */}
          <div className="flex items-center justify-between gap-4 p-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="shrink-0 rounded-lg bg-primary/10 p-2.5">
                <Building2 className="h-4 w-4 text-primary" />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">
                  {currentEntity.name}
                </p>

                {(currentEntity.city || currentEntity.state) && (
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {[currentEntity.city, currentEntity.state]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                )}

                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-xs text-muted-foreground">GST:</span>
                  {currentEntity.gst ? (
                    <span className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded text-foreground">
                      {currentEntity.gst}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs text-amber-600">
                      <AlertCircle className="h-3 w-3" />
                      Not available
                    </span>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors"
            >
              <Pencil className="h-3.5 w-3.5" />
              Change
            </button>
          </div>
        </div>
      )}

      {/* ── Unassigned / editing — select dropdown ── */}
      {(!restaurantHasLegalEntity || isEditing) && (
        <div className="rounded-xl border bg-card p-4 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">
              Legal Entity
            </label>
            {isEditing && (
              <button
                onClick={() => setIsEditing(false)}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancel
              </button>
            )}
          </div>

          <Select
            value={selectedId}
            onValueChange={(val) => handleUpdateLegalEntity(val)}
          >
            <SelectTrigger className="w-full h-10">
              <SelectValue placeholder="Select a legal entity…" />
            </SelectTrigger>

            <SelectContent>
              {legalEntities?.map((entity) => (
                <SelectItem key={entity.id} value={entity.id}>
                  <div className="flex flex-col py-0.5">
                    <span className="font-medium">{entity.name}</span>
                    {(entity.city || entity.state) && (
                      <span className="text-xs text-muted-foreground">
                        {[entity.city, entity.state].filter(Boolean).join(", ")}
                      </span>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <p className="text-xs text-muted-foreground">
            Can't find the right entity?{" "}
            <button className="text-primary underline-offset-2 hover:underline font-medium">
              Add a new legal entity
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
