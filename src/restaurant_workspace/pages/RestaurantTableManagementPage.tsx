import React, { useState } from "react";
import { useRestaurantLayout } from "../apis/queries";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useSheet } from "@/hooks/useSheet";
import StartDineInSessionDialog from "../components/DineInSessionDialog";
import { useStartDineInSession } from "../apis/mutations";
import DiningSessionTerminal from "../components/DiningSessionTerminal";
import { useQueryClient } from "@tanstack/react-query";
import { Route } from "@/routes/workspace/$propertyID/restaurant/$restaurantID/table-management/index";

export interface RestaurantTableLayout {
  TableName: string;
  TableCode: string;
  FloorID: string;
  TableID: string;
  Status: string;
}

export interface RestaurantFloorLayout {
  Floor_Name: string;
  Floor_Number: number;
  Tables: RestaurantTableLayout[];
}

const RestaurantTableManagementPage: React.FC = () => {
  const q = useQueryClient();
  const { restaurantID } = Route.useParams();
  const { data, isLoading } = useRestaurantLayout(restaurantID);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTable, setSelectedTable] =
    useState<RestaurantTableLayout | null>(null);
  const [loading, setLoading] = useState(false);

  const resLayout = data?.data?.Layout ?? [];

  const statusStyles: Record<string, string> = {
    AVAILABLE: "bg-green-400 text-green-950 border-green-500",
    OCCUPIED: "bg-amber-500 text-amber-950 border-amber-600",
    RESERVED: "bg-blue-400 text-blue-950 border-blue-500",
    BLOCKED: "bg-zinc-800 text-white border-black",
    UNDER_CLEANING: "bg-cyan-300 text-cyan-950 border-cyan-500",
  };

  /* ----------------------------------- *** ---------------------------------- */

  const { openSheet } = useSheet();
  const handleTableSession = (t: RestaurantTableLayout) => {
    if (!restaurantID) return;

    if (t.Status === "AVAILABLE") {
      setSelectedTable(t);
      setOpenDialog(true);
    } else if (t.Status === "OCCUPIED") {
      openSheet(
        <DiningSessionTerminal restaurantID={restaurantID} table={t} />,
        "3/4",
      );
    }
  };

  /* ----------------------------------- *** ---------------------------------- */

  const startSession = useStartDineInSession();

  const handleStartSession = async () => {
    if (!selectedTable || !restaurantID) return;

    setLoading(true);

    await startSession.mutateAsync(
      {
        tableID: selectedTable.TableID,
        restaurantID,
      },
      {
        onSuccess: () => {
          setLoading(false);
          setOpenDialog(false);
          q.invalidateQueries({
            queryKey: ["Restaurant", "Restaurant Layout", restaurantID],
          });
        },
      },
    );
  };
  return (
    <div className="space-y-4">
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
      <div className="flex flex-wrap items-center gap-6 px-4 py-3 border rounded-lg bg-muted/20">
        {Object.entries(statusStyles).map(([status, style]) => (
          <div
            key={status}
            className="flex items-center gap-2 text-xs font-medium capitalize"
          >
            <span
              className={cn(
                "h-3 w-3 rounded-sm border",
                style.split(" ")[0],
                style.split(" ")[2],
              )}
            />
            {status.toLowerCase().replace("_", " ")}
          </div>
        ))}
      </div>

      {/* Main Layout Area */}
      <div className="flex flex-col gap-6">
        {isLoading
          ? [1, 2].map((i) => (
              <section
                key={i}
                className="border rounded-xl bg-card overflow-hidden"
              >
                <div className="flex items-center justify-between border-b px-6 py-4">
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                  <Skeleton className="h-6 w-24" />
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-3">
                    {Array.from({ length: 12 }).map((_, idx) => (
                      <Skeleton key={idx} className="rounded-full" />
                    ))}
                  </div>
                </div>
              </section>
            ))
          : resLayout.map((floor: RestaurantFloorLayout) => (
              <section
                key={floor.Floor_Number}
                className="border rounded-xl bg-card"
              >
                <div className="flex items-center justify-between border-b px-6 py-3">
                  <div className="flex flex-col">
                    <h2 className="text-lg font-bold tracking-tight">
                      {floor.Floor_Name}
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      Floor Level {floor.Floor_Number}
                    </p>
                  </div>
                  <div className="text-[10px] font-mono font-medium border px-2 py-1 rounded bg-muted/50 uppercase">
                    {floor.Tables.length} Tables
                  </div>
                </div>

                <div className="p-4">
                  <div className="grid grid-cols-[repeat(auto-fill,minmax(90px,1fr))] gap-3">
                    {floor.Tables.map((table: RestaurantTableLayout) => (
                      <div
                        onClick={() => handleTableSession(table)}
                        key={table.TableID}
                        className={cn(
                          "group flex flex-col justify-between p-2 border rounded-lg transition-all hover:shadow-md cursor-pointer ",
                          statusStyles[table.Status] ||
                            "bg-background text-foreground",
                        )}
                      >
                        <div className="flex justify-between items-start">
                          <span className="text-[9px] uppercase font-bold">
                            {table.TableCode}
                          </span>
                          <div className="size-1.5 rounded-full bg-current opacity-40" />
                        </div>
                        <div className="flex flex-col overflow-hidden">
                          <span className="text-xs font-bold leading-tight truncate">
                            {table.TableName}
                          </span>
                          <span className="text-[8px] uppercase font-bold opacity-70 tracking-tighter">
                            {table.Status.replace("_", " ")}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            ))}

        {!isLoading && resLayout.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 border border-dashed rounded-xl text-muted-foreground">
            <p>No floor layouts found for this restaurant.</p>
          </div>
        )}
      </div>

      {/* --- TABLE SESSION DIALOG --- */}
      <StartDineInSessionDialog
        isOpen={openDialog}
        onOpenChange={setOpenDialog}
        selectedTable={selectedTable}
        onConfirm={handleStartSession} // Your API call function
        isLoading={loading}
      />
    </div>
  );
};

export default RestaurantTableManagementPage;
