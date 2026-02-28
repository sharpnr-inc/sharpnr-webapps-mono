import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useHospitalityDomainModInfra } from "../api/queries";

type QtyMap = Record<string, number>;

export function AddInfraInProperty({
  closeModal,
}: {
  propertyID: string;
  closeModal: () => void;
}) {
  const { data: domainData, isLoading } =
    useHospitalityDomainModInfra("hospitality");

  const infrastructures = domainData?.data?.infrastructure ?? [];

  const [qty, setQty] = useState<QtyMap>({});

  const updateQty = (id: string, value: string) => {
    setQty((prev) => ({
      ...prev,
      [id]: Number(value) || 0,
    }));
  };

  const handleSubmit = () => {
    const payload = infrastructures
      .filter((infra: any) => infra.IsAvailable && (qty[infra.ID] ?? 0) > 0)
      .map((infra: any) => ({
        infra_id: infra.ID,
        qty: qty[infra.ID],
      }));

    console.log("SUBMIT PAYLOAD:", payload);

    // TODO: API call
    closeModal();
  };

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading...</p>;
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Select infrastructure and set quantity.
      </p>

      {/* INFRA LIST */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {infrastructures.map((infra: any) => {
          const disabled = !infra.IsAvailable;

          return (
            <Card
              key={infra.ID}
              className="relative overflow-hidden rounded-xl"
            >
              {/* TRANSPARENT OVERLAY */}
              {disabled && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/60 backdrop-blur-[1px]">
                  <span className="rounded-md bg-black/70 px-3 py-1 text-xs font-semibold text-white">
                    Coming Soon
                  </span>
                </div>
              )}

              <CardHeader className="pb-3">
                <CardTitle className="text-base">{infra.ModuleName}</CardTitle>

                <CardDescription className="text-sm">
                  {infra.Description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Qty</span>

                <Input
                  type="number"
                  min={0}
                  value={qty[infra.ID] ?? ""}
                  onChange={(e) => updateQty(infra.ID, e.target.value)}
                  className="w-24"
                  placeholder="0"
                  disabled={disabled}
                />
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-2 pt-2">
        <Button variant="outline" onClick={closeModal}>
          Cancel
        </Button>

        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
}
