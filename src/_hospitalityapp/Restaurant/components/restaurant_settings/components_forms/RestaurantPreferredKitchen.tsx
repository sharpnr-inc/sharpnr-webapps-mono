import { useState } from "react";
import { usePropertyDetails } from "@/_orchestrator/api/general";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useAddPreferredKitchenMutation } from "@/_hospitalityapp/Restaurant/apis/mutations";

interface RestaurantPreferredKitchenProps {
  kitchenID: string | null;
  propertyID: string;
  restaurantID: string; // <-- REQUIRED for mutation
}

export function RestaurantPreferredKitchen({
  kitchenID,
  propertyID,
  restaurantID,
}: RestaurantPreferredKitchenProps) {
  const { data: propertyData, isLoading } = usePropertyDetails(propertyID);
  const kitchens = propertyData?.data?.infra ?? [];

  const [selectedID, setSelectedID] = useState<string | null>(kitchenID);

  const selectedKitchen = kitchens.find((k: any) => k.id === selectedID);

  const { mutateAsync, isPending } = useAddPreferredKitchenMutation();

  const handleChange = async (value: string) => {
    setSelectedID(value);

    await mutateAsync({
      restaurantID,
      kitchenID: value,
    });
  };

  if (isLoading) {
    return <div>Loading kitchens...</div>;
  }

  return (
    <div className="space-y-6">
      {/* ========================= */}
      {/* SECTION 1: Selected Kitchen */}
      {/* ========================= */}
      <div>
        <div className="font-semibold mb-3">Selected Preferred Kitchen</div>

        <Card className="border-green-500 ring-2 ring-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">
              {selectedKitchen
                ? selectedKitchen.name
                : "No Preferred Kitchen Selected"}
            </CardTitle>
          </CardHeader>

          <CardContent className="text-sm text-muted-foreground space-y-2">
            {selectedKitchen ? (
              <>
                <div>Type: {selectedKitchen.infra_type}</div>

                <div>
                  Status:{" "}
                  <Badge
                    variant="outline"
                    className={
                      selectedKitchen.status
                        ? "border-green-500 text-green-600"
                        : "border-red-500 text-red-500"
                    }
                  >
                    {selectedKitchen.status ? "Active" : "Inactive"}
                  </Badge>
                </div>

                <Badge className="bg-green-100 text-green-700">Preferred</Badge>
              </>
            ) : (
              <div className="text-yellow-600">
                Please select a Restaurant Preferred Kitchen
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ========================= */}
      {/* SECTION 2: Dropdown Selector */}
      {/* ========================= */}
      <div>
        <div className="font-semibold mb-3">Change Preferred Kitchen</div>

        <Select value={selectedID ?? undefined} onValueChange={handleChange}>
          <SelectTrigger className="w-full max-w-sm">
            <SelectValue placeholder="Select a Kitchen" />
          </SelectTrigger>

          <SelectContent>
            {kitchens.map((kitchen: any) => (
              <SelectItem key={kitchen.id} value={kitchen.id}>
                {kitchen.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {isPending && (
          <div className="text-xs text-muted-foreground mt-2">
            Updating preferred kitchen...
          </div>
        )}
      </div>
    </div>
  );
}
