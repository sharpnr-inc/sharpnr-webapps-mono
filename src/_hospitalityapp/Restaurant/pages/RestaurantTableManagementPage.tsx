import { Route } from "@/routes/_appuser/dashboard/sharp_hospitality/restaurant/route";
import { useRestaurantLayout } from "../apis/queries";

export interface RestaurantTableLayout {
  TableName: string;
  TableCode: string;
  FloorID: string; // UUID string
  TableID: string; // UUID string
}

export interface RestaurantFloorLayout {
  Floor_Name: string;
  Floor_Number: number;
  Tables: RestaurantTableLayout[];
}

export interface RestaurantLayoutResponse {
  layout: RestaurantFloorLayout[];
}

interface RestaurantTableManagementPageProps {}

const RestaurantTableManagementPage: React.FC<
  RestaurantTableManagementPageProps
> = () => {
  const { restaurantID } = Route.useLoaderData();
  const { data, isLoading } = useRestaurantLayout(restaurantID);
  console.log(data?.data);
  const resLayout = data?.data.Layout ?? [];
  console.log(resLayout);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Table Management
        </h1>
        <p className="text-sm text-muted-foreground">
          Monitor table availability and active dining sessions.
        </p>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-green-500" />
          Available
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-red-500" />
          Occupied
        </div>
      </div>

      {/* Floor Layout */}
      <div className="flex flex-col gap-6">
        {resLayout.map((floor: RestaurantFloorLayout) => {
          return (
            <section key={floor.Floor_Number} className="border rounded-xl">
              {/* Floor Header */}
              <div className="flex items-center justify-between border-b px-6 py-4">
                <div className="flex flex-col">
                  <h2 className="text-lg font-bold tracking-tight">
                    {floor.Floor_Name}
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Floor Level {floor.Floor_Number}
                  </p>
                </div>
                <div className="text-xs font-medium border px-2 py-1 rounded">
                  {floor.Tables.length} Tables
                </div>
              </div>

              {/* Tables Grid */}
              <div className="p-4">
                <div className="grid  grid-cols-12 gap-4">
                  {floor.Tables.map((table: RestaurantTableLayout) => {
                    return (
                      <div
                        key={table.TableID}
                        className="group flex flex-col justify-between p-4 border rounded-lg transition-all hover:ring-1 hover:ring-black cursor-pointer aspect-square"
                      >
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-mono text-muted-foreground uppercase">
                            {table.TableCode}
                          </span>
                        </div>

                        <div className="flex flex-col">
                          <span className="text-sm font-semibold">
                            {table.TableName}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default RestaurantTableManagementPage;
