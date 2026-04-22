import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash2, Pencil, PlusIcon } from "lucide-react";
import { useRestaurantLayout } from "@/propertyDomain/hospitality/restaurant/apis/queries";
import { Route } from "@/routes/_appuser/property/$propertyId/domain_hospitality/restaurant_dashboard/$restaurantID/index";
import RestaurantConfiguration from "./RestaurantFloorForm";
import { useFormsModal } from "@/hooks/useFormModal";

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

  const onEditFloor = (floor: Floor) => {
    console.log("Edit floor:", floor);
  };

  const onDeleteFloor = (floor: Floor) => {
    console.log("Delete floor:", floor);
  };

  const { closeModal, showModal } = useFormsModal();

  const handleAddFloor = () => {
    showModal(
      "add-floor",
      "Add Floor and Tables",
      <RestaurantConfiguration
        restaurantID={restaurantID}
        closeModal={closeModal}
      />,
    );
  };

  return (
    <div className="space-y-3">
      {/* EMPTY STATE */}
      {floors.length === 0 ? (
        <Card className="rounded-2xl border-dashed">
          <CardContent className="space-y-3 py-10 text-center">
            <p className="text-sm text-muted-foreground">No layout found.</p>

            <Button onClick={handleAddFloor}>
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Floors & Tables
            </Button>
          </CardContent>
        </Card>
      ) : (
        /* FLOOR CARD (ONLY WHEN FLOORS EXIST) */
        <Card className="relative">
          {/* HEADER */}
          <CardHeader className="flex flex-row items-start justify-between">
            <div>
              <CardTitle>Restaurant Floors</CardTitle>
              <CardDescription>This is Card Description</CardDescription>
            </div>

            <Button onClick={handleAddFloor} size="sm">
              Add Floors & Tables
            </Button>
          </CardHeader>

          {/* CONTENT */}
          <CardContent className="space-y-3">
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
                      <Pencil className="mr-1 h-4 w-4" />
                      Edit
                    </Button>

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onDeleteFloor(floor)}
                    >
                      <Trash2 className="mr-1 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </CardHeader>

                <CardContent>
                  {floor.tables.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No tables found.
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {floor.tables.map((table) => (
                        <div
                          key={table.id}
                          className="
                          h-16 w-16
                          flex items-center justify-center
                          rounded-md border bg-muted
                          text-xs font-medium
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
          </CardContent>
        </Card>
      )}
    </div>
  );
}
