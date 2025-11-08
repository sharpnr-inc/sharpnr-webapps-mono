"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { PlusCircle, Trash2 } from "lucide-react";

export default function BarConfigSection() {
  // State for bar timing and floors
  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [isMultiFloor, setIsMultiFloor] = useState(false);

  // Floors and Tables
  const [floors, setFloors] = useState<
    { id: string; name: string; tables: string[] }[]
  >([]);
  const [tables, setTables] = useState<string[]>([]); // For single-floor bars
  const [newFloorName, setNewFloorName] = useState("");
  const [newTableName, setNewTableName] = useState("");

  // Generate random ID helper
  const uid = () => Math.random().toString(36).substring(2, 9);

  // Add a new floor
  const handleAddFloor = () => {
    if (!newFloorName.trim()) return;
    setFloors([...floors, { id: uid(), name: newFloorName, tables: [] }]);
    setNewFloorName("");
  };

  // Remove floor
  const handleRemoveFloor = (id: string) => {
    setFloors(floors.filter((f) => f.id !== id));
  };

  // Add a table (to floor or directly)
  const handleAddTable = (floorId?: string) => {
    if (!newTableName.trim()) return;

    if (isMultiFloor && floorId) {
      setFloors(
        floors.map((floor) =>
          floor.id === floorId
            ? { ...floor, tables: [...floor.tables, newTableName] }
            : floor
        )
      );
    } else {
      setTables([...tables, newTableName]);
    }
    setNewTableName("");
  };

  // Remove a table
  const handleRemoveTable = (floorId: string | null, tableName: string) => {
    if (isMultiFloor && floorId) {
      setFloors(
        floors.map((floor) =>
          floor.id === floorId
            ? {
                ...floor,
                tables: floor.tables.filter((t) => t !== tableName),
              }
            : floor
        )
      );
    } else {
      setTables(tables.filter((t) => t !== tableName));
    }
  };

  return (
    <div className="p-2 flex flex-col gap-4">
      {/* --- Bar Configuration --- */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Bar Configuration</CardTitle>
          <CardDescription>Configure your bar’s basic settings</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Opening & Closing Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="opening-time">Opening Time</Label>
              <Input
                id="opening-time"
                type="time"
                value={openingTime}
                onChange={(e) => setOpeningTime(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="closing-time">Closing Time</Label>
              <Input
                id="closing-time"
                type="time"
                value={closingTime}
                onChange={(e) => setClosingTime(e.target.value)}
              />
            </div>
          </div>

          <Button
            onClick={() =>
              alert(`Saved!\nOpen: ${openingTime}\nClose: ${closingTime}`)
            }
          >
            Save Changes in Time
          </Button>

          {/* Multi-Floor Switch */}
          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex flex-col">
              <Label htmlFor="multi-floor">Multi-Floor Bar</Label>
              <p className="text-sm text-muted-foreground">
                Enable this if the bar has multiple floors.
              </p>
            </div>
            <Switch
              id="multi-floor"
              checked={isMultiFloor}
              onCheckedChange={setIsMultiFloor}
            />
          </div>
        </CardContent>
      </Card>

      {/* --- Add Floors / Tables Section --- */}
      <Card>
        <CardHeader>
          <CardTitle>Add Tables and Floors</CardTitle>
          <CardDescription>Add floors or tables to your bar</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {isMultiFloor ? (
            <>
              {/* Add new floor */}
              <div className="flex gap-2">
                <Input
                  placeholder="Floor name (e.g., Rooftop)"
                  value={newFloorName}
                  onChange={(e) => setNewFloorName(e.target.value)}
                />
                <Button onClick={handleAddFloor}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Floor
                </Button>
              </div>

              {/* Display floors */}
              {floors.length > 0 ? (
                <div className="space-y-4">
                  {floors.map((floor) => (
                    <Card key={floor.id} className="border">
                      <CardHeader className="flex flex-row justify-between items-center">
                        <CardTitle>{floor.name}</CardTitle>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleRemoveFloor(floor.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex gap-2">
                          <Input
                            placeholder="Add table to this floor"
                            value={newTableName}
                            onChange={(e) => setNewTableName(e.target.value)}
                          />
                          <Button onClick={() => handleAddTable(floor.id)}>
                            <PlusCircle className="mr-2 h-4 w-4" /> Add Table
                          </Button>
                        </div>
                        {floor.tables.length > 0 && (
                          <ul className="list-disc pl-5 space-y-1">
                            {floor.tables.map((table) => (
                              <li
                                key={table}
                                className="flex justify-between items-center"
                              >
                                {table}
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  onClick={() =>
                                    handleRemoveTable(floor.id, table)
                                  }
                                >
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">
                  No floors added yet.
                </p>
              )}
            </>
          ) : (
            <>
              {/* Single floor mode — add tables directly */}
              <div className="flex gap-2">
                <Input
                  placeholder="Table name"
                  value={newTableName}
                  onChange={(e) => setNewTableName(e.target.value)}
                />
                <Button onClick={() => handleAddTable()}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Table
                </Button>
              </div>

              {tables.length > 0 && (
                <ul className="list-disc pl-5 space-y-1">
                  {tables.map((t) => (
                    <li
                      key={t}
                      className="flex justify-between items-center text-sm"
                    >
                      {t}
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleRemoveTable(null, t)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* --- Layout Display --- */}
      <Card>
        <CardHeader>
          <CardTitle>Bar Table Layout</CardTitle>
          <CardDescription>This is your current bar layout</CardDescription>
        </CardHeader>
        <CardContent>
          {isMultiFloor ? (
            floors.length > 0 ? (
              <div className="space-y-4">
                {floors.map((f) => (
                  <div key={f.id}>
                    <h3 className="font-medium mb-1">{f.name}</h3>
                    {f.tables.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {f.tables.map((t) => (
                          <div
                            key={t}
                            className="border rounded-md px-3 py-1 bg-muted text-sm"
                          >
                            {t}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-sm">
                        No tables yet
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">
                No floors configured yet.
              </p>
            )
          ) : tables.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {tables.map((t) => (
                <div
                  key={t}
                  className="border rounded-md px-3 py-1 bg-muted text-sm"
                >
                  {t}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">No tables yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
