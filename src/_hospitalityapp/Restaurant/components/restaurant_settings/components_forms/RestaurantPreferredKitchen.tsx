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
  restaurantID: string;
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
    return (
      <div className="text-sm text-muted-foreground">Loading kitchens...</div>
    );
  }

  return (
    <div>
      <div className=" space-y-2">
        <div>
          <h2 className="text-lg font-semibold">Preferred Kitchen</h2>
          <p className="text-sm text-muted-foreground">
            Select which kitchen will handle orders for this restaurant.
          </p>
        </div>
        <Card className="rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Current Selection</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {selectedKitchen ? (
              <>
                <div className="flex items-center justify-between">
                  <span className="font-medium">{selectedKitchen.name}</span>

                  <Badge className="bg-emerald-100 text-emerald-700">
                    Preferred
                  </Badge>
                </div>

                <div className="text-sm text-muted-foreground">
                  Type: {selectedKitchen.infra_type}
                </div>

                <Badge
                  variant="outline"
                  className={
                    selectedKitchen.status
                      ? "border-emerald-500 text-emerald-600"
                      : "border-red-500 text-red-500"
                  }
                >
                  {selectedKitchen.status ? "Active" : "Inactive"}
                </Badge>
              </>
            ) : (
              <div className="text-sm text-muted-foreground">
                No preferred kitchen selected yet.
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Change Kitchen</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <Select
              value={selectedID ?? undefined}
              onValueChange={handleChange}
              disabled={isPending}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Kitchen" />
              </SelectTrigger>

              <SelectContent>
                {kitchens.map((kitchen: any) => (
                  <SelectItem key={kitchen.id} value={kitchen.id}>
                    <div className="flex items-center justify-between w-full">
                      <span>{kitchen.name}</span>
                      {!kitchen.status && (
                        <span className="text-xs text-red-500 ml-2">
                          (Inactive)
                        </span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {isPending && (
              <div className="text-xs text-muted-foreground">
                Updating preferred kitchen...
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
