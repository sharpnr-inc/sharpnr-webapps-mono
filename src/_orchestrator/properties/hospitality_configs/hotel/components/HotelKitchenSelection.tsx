import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronDown } from "lucide-react";

type Kitchen = {
  id: string;
  name: string;
};

const kitchens: Kitchen[] = [
  { id: "main", name: "Main Kitchen" },
  { id: "bakery", name: "Bakery Kitchen" },
  { id: "bar", name: "Bar Kitchen" },
  { id: "room-service", name: "Room Service Kitchen" },
];

export function HotelKitchenSelection() {
  const [selected, setSelected] = useState<string[]>([]);

  function toggleKitchen(id: string) {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((k) => k !== id)
        : [...prev, id],
    );
  }

  return (
    <div className="space-y-2">
      <Label>Assigned Kitchens</Label>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between"
          >
            {selected.length === 0
              ? "Select kitchens"
              : `${selected.length} kitchen(s) selected`}
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-[320px] p-0"
          align="start"
        >
          <Card className="border-0 shadow-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">
                Select Kitchens
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              {kitchens.map((kitchen) => (
                <div
                  key={kitchen.id}
                  className="flex items-start gap-3 rounded-md border p-3"
                >
                  <Checkbox
                    id={`kitchen-${kitchen.id}`}
                    checked={selected.includes(kitchen.id)}
                    onCheckedChange={() =>
                      toggleKitchen(kitchen.id)
                    }
                  />
                  <Label
                    htmlFor={`kitchen-${kitchen.id}`}
                    className="cursor-pointer"
                  >
                    {kitchen.name}
                  </Label>
                </div>
              ))}
            </CardContent>
          </Card>
        </PopoverContent>
      </Popover>

      {selected.length > 0 && (
        <p className="text-sm text-muted-foreground">
          Selected:{" "}
          {kitchens
            .filter((k) => selected.includes(k.id))
            .map((k) => k.name)
            .join(", ")}
        </p>
      )}
    </div>
  );
}
