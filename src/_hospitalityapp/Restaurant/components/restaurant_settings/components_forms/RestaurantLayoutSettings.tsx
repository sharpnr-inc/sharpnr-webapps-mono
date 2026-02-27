import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

type Table = {
  id: string;
  name: string;
};

type Floor = {
  id: string;
  name: string;
  tables: Table[];
};

export function RestaurantLayoutSettings() {
  const [floors, setFloors] = useState<Floor[]>([]);

  const addFloor = () => {
    const newFloor: Floor = {
      id: crypto.randomUUID(),
      name: `Floor ${floors.length + 1}`,
      tables: [],
    };
    setFloors((p) => [...p, newFloor]);
  };

  const removeFloor = (floorId: string) => {
    setFloors((p) => p.filter((f) => f.id !== floorId));
  };

  const addTable = (floorId: string) => {
    setFloors((prev) =>
      prev.map((floor) =>
        floor.id === floorId
          ? {
              ...floor,
              tables: [
                ...floor.tables,
                {
                  id: crypto.randomUUID(),
                  name: `Table ${floor.tables.length + 1}`,
                },
              ],
            }
          : floor,
      ),
    );
  };

  const removeTable = (floorId: string) => {
    setFloors((prev) =>
      prev.map((floor) =>
        floor.id === floorId
          ? {
              ...floor,
              tables: floor.tables.slice(0, -1),
            }
          : floor,
      ),
    );
  };

  return (
    <div className="space-y-4">
      {/* EMPTY STATE */}
      {floors.length === 0 && (
        <Card className="rounded-2xl border-dashed">
          <CardContent className="py-10 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              No floors added yet.
            </p>
            <Button onClick={addFloor}>
              <Plus className="h-4 w-4 mr-2" />
              Add Floor
            </Button>
          </CardContent>
        </Card>
      )}

      {/* FLOOR LIST */}
      {floors.map((floor) => (
        <Card key={floor.id} className="rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">{floor.name}</CardTitle>

            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeFloor(floor.id)}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Remove Floor
            </Button>
          </CardHeader>

          <CardContent className="space-y-3">
            {/* TABLES */}
            {floor.tables.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No tables added yet.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {floor.tables.map((table) => (
                  <div
                    key={table.id}
                    className="px-3 py-1 text-sm rounded-full bg-muted"
                  >
                    {table.name}
                  </div>
                ))}
              </div>
            )}

            {/* ACTIONS */}
            <div className="flex gap-2 pt-2">
              <Button size="sm" onClick={() => addTable(floor.id)}>
                <Plus className="h-4 w-4 mr-1" />
                Add Table
              </Button>

              <Button
                size="sm"
                variant="outline"
                disabled={floor.tables.length === 0}
                onClick={() => removeTable(floor.id)}
              >
                Remove Table
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* ADD FLOOR BUTTON (when floors exist) */}
      {floors.length > 0 && (
        <Button onClick={addFloor}>
          <Plus className="h-4 w-4 mr-2" />
          Add Floor
        </Button>
      )}
    </div>
  );
}
