import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Pencil } from "lucide-react";
import { useRestaurantLayout } from "@/_hospitalityapp/Restaurant/apis/queries";
import { Route } from "@/routes/_appuser/orchestrator/_orchestrator_layout/_console/property/$propertyId/domain_hospitality/restaurant_dashboard/$restaurantID/index";

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
  const { restaurantID } = Route.useParams();
  const { data } = useRestaurantLayout(restaurantID);

  /**
   * DERIVE FLOORS DIRECTLY FROM API
   */
  const floors: Floor[] = useMemo(() => {
    const layout = data?.data?.Layout;
    if (!layout) return [];

    return layout.map((floor: any) => ({
      id: floor.Floor_Number.toString(),
      name: floor.Floor_Name,
      tables:
        floor.Tables?.map((t: any) => ({
          id: t.TableID,
          name: t.TableName,
        })) ?? [],
    }));
  }, [data]);

  /** FLOOR ACTIONS (API / Dialog) */
  const onAddFloor = () => {
    console.log("Add Floor");
  };

  const onEditFloor = (floor: Floor) => {
    console.log("Edit floor:", floor);
  };

  const onDeleteFloor = (floor: Floor) => {
    console.log("Delete floor:", floor);
  };

  return (
    <div className="space-y-2">
      {/* ADD FLOOR ALWAYS */}
      <Card>
        <CardContent className="py-4">
          <Button onClick={onAddFloor}>
            <Plus className="h-4 w-4 mr-2" />
            Add Floor
          </Button>
        </CardContent>
      </Card>

      {/* EMPTY STATE */}
      {floors.length === 0 && (
        <Card className="rounded-2xl border-dashed">
          <CardContent className="py-10 text-center">
            <p className="text-sm text-muted-foreground">No layout found.</p>
          </CardContent>
        </Card>
      )}

      {/* FLOOR LIST */}
      {floors.map((floor) => (
        <Card key={floor.id} className="rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">{floor.name}</CardTitle>

            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onEditFloor(floor)}
              >
                <Pencil className="h-4 w-4 mr-1" />
                Edit
              </Button>

              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDeleteFloor(floor)}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            {floor.tables.length === 0 ? (
              <p className="text-sm text-muted-foreground">No tables found.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {floor.tables.map((table) => (
                  <div
                    key={table.id}
                    className="
                      w-16 h-16
                      flex items-center justify-center
                      text-xs font-medium
                      rounded-md
                      bg-muted
                      border
                    "
                  >
                    {table.name}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
