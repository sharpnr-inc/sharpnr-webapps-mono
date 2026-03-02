import { useState, useMemo } from "react";
import { Info, Building2, CheckCircle2 } from "lucide-react";
import { useOrganizationLegalEntities } from "@/_orchestrator/legal_entity/api/legalEntity.api.queries";

type LegalEntity = {
  id: string;
  name: string;
  gst: string | null;
  addressLine: string;
  city: string;
  state: string;
};

export function RestaurantLegalEntity() {
  const { data } = useOrganizationLegalEntities();

  // API entities
  const legalEntities: LegalEntity[] = useMemo(() => {
    return data?.data ?? [];
  }, [data]);

  // default select first entity when available
  const [selectedId, setSelectedId] = useState<string>("");

  const selectedEntity =
    legalEntities.find((e) => e.id === selectedId) ?? legalEntities[0];

  return (
    <div className="space-y-4">
      {/* INFO NOTE */}
      <div className="rounded-2xl border bg-blue-50/50 p-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-lg bg-blue-100 p-2">
            <Info className="h-4 w-4 text-blue-600" />
          </div>

          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-blue-900">
              What is a Legal Entity?
            </h3>

            <p className="text-sm text-blue-800 leading-relaxed">
              A <span className="font-medium">Legal Entity</span> is the
              officially registered business that owns this restaurant.
            </p>
          </div>
        </div>
      </div>

      {/* NOTE */}
      <div className="rounded-xl border bg-muted/50 p-3 text-sm text-muted-foreground">
        <span className="font-medium text-foreground">Note:</span> You can
        assign only <span className="font-medium">one legal entity</span>.
      </div>

      {/* LEGAL ENTITY CARDS */}
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {legalEntities.map((entity) => {
          const selected = entity.id === (selectedId || selectedEntity?.id);

          return (
            <button
              key={entity.id}
              type="button"
              onClick={() => setSelectedId(entity.id)}
              className={`relative text-left rounded-xl border p-4 transition-all
                ${
                  selected
                    ? "border-primary bg-primary/5"
                    : "hover:border-primary/40 hover:bg-muted/40"
                }`}
            >
              {selected && (
                <CheckCircle2 className="absolute right-3 top-3 h-5 w-5 text-primary" />
              )}

              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Building2 className="h-4 w-4 text-primary" />
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">{entity.name}</h4>

                  <p className="text-xs text-muted-foreground">
                    GST: {entity.gst ?? "Not Available"}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {[entity.city, entity.state].filter(Boolean).join(", ")}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
