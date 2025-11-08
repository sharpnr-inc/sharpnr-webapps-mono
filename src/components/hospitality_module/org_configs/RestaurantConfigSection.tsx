"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { PlusCircle, Trash2, UtensilsCrossed } from "lucide-react";

export default function RestaurantConfigSection() {
  const [license, setLicense] = useState("");
  const [hasMultiFloor, setHasMultiFloor] = useState(false);

  const [floors, setFloors] = useState<
    { id: string; name: string; tables: { name: string; capacity: number }[] }[]
  >([]);
  const [tables, setTables] = useState<{ name: string; capacity: number }[]>([]);

  const [newFloor, setNewFloor] = useState("");
  const [newTableName, setNewTableName] = useState("");
  const [newCapacity, setNewCapacity] = useState("");

  const uid = () => Math.random().toString(36).substring(2, 9);

  // --- Floor Handlers ---
  const addFloor = () => {
    if (!newFloor.trim()) return;
    setFloors([...floors, { id: uid(), name: newFloor, tables: [] }]);
    setNewFloor("");
  };

  const removeFloor = (id: string) => {
    setFloors(floors.filter((f) => f.id !== id));
  };

  // --- Table Handlers ---
  const addTable = (floorId?: string) => {
    if (!newTableName.trim() || !newCapacity.trim()) return;

    const newTable = { name: newTableName, capacity: parseInt(newCapacity) };
    if (hasMultiFloor && floorId) {
      setFloors(
        floors.map((f) =>
          f.id === floorId
            ? { ...f, tables: [...f.tables, newTable] }
            : f
        )
      );
    } else {
      setTables([...tables, newTable]);
    }

    setNewTableName("");
    setNewCapacity("");
  };

  const removeTable = (floorId: string | null, name: string) => {
    if (hasMultiFloor && floorId) {
      setFloors(
        floors.map((f) =>
          f.id === floorId
            ? { ...f, tables: f.tables.filter((t) => t.name !== name) }
            : f
        )
      );
    } else {
      setTables(tables.filter((t) => t.name !== name));
    }
  };

  return (
    <div className="p-4 flex flex-col gap-5">
      {/* 🧾 FSSAI License */}
      <Card>
        <CardHeader>
          <CardTitle>FSSAI License</CardTitle>
          <CardDescription>
            Enter your Food Safety and Standards Authority of India license number.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-3 items-center">
          <Input
            placeholder="Enter FSSAI License Number"
            className="sm:w-[320px]"
            value={license}
            onChange={(e) => setLicense(e.target.value)}
          />
          <Button
            variant="outline"
            onClick={() => alert(`FSSAI License Saved: ${license}`)}
          >
            Save License
          </Button>
        </CardContent>
      </Card>

      {/* 🏢 Restaurant Floor & Table Config */}
      <Card>
        <CardHeader>
          <CardTitle>Restaurant Configuration</CardTitle>
          <CardDescription>
            Configure your restaurant’s floors and tables
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Multi-floor toggle */}
          <div className="flex items-center justify-between border-b pb-4">
            <div className="flex flex-col">
              <Label htmlFor="multi-floor">Multi-Floor Restaurant</Label>
              <p className="text-sm text-muted-foreground">
                Enable this if your restaurant spans multiple floors.
              </p>
            </div>
            <Switch
              id="multi-floor"
              checked={hasMultiFloor}
              onCheckedChange={setHasMultiFloor}
            />
          </div>

          {/* Add Floors */}
          {hasMultiFloor && (
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter Floor Name"
                  value={newFloor}
                  onChange={(e) => setNewFloor(e.target.value)}
                />
                <Button onClick={addFloor}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Floor
                </Button>
              </div>

              {floors.length > 0 ? (
                <div className="space-y-4">
                  {floors.map((f) => (
                    <Card key={f.id}>
                      <CardHeader className="flex flex-row justify-between items-center">
                        <CardTitle>{f.name}</CardTitle>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => removeFloor(f.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex gap-2">
                          <Input
                            placeholder="Table Name"
                            value={newTableName}
                            onChange={(e) => setNewTableName(e.target.value)}
                          />
                          <Input
                            placeholder="Capacity"
                            type="number"
                            value={newCapacity}
                            onChange={(e) => setNewCapacity(e.target.value)}
                            className="w-[120px]"
                          />
                          <Button onClick={() => addTable(f.id)}>
                            <PlusCircle className="mr-2 h-4 w-4" /> Add Table
                          </Button>
                        </div>

                        {f.tables.length > 0 && (
                          <ul className="list-disc pl-5 space-y-1">
                            {f.tables.map((t) => (
                              <li
                                key={t.name}
                                className="flex justify-between items-center text-sm"
                              >
                                {t.name} — {t.capacity} seats
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  onClick={() => removeTable(f.id, t.name)}
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
                <p className="text-sm text-muted-foreground">
                  No floors added yet.
                </p>
              )}
            </div>
          )}

          {/* Single-floor Tables */}
          {!hasMultiFloor && (
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  placeholder="Table Name"
                  value={newTableName}
                  onChange={(e) => setNewTableName(e.target.value)}
                />
                <Input
                  placeholder="Capacity"
                  type="number"
                  value={newCapacity}
                  onChange={(e) => setNewCapacity(e.target.value)}
                  className="w-[120px]"
                />
                <Button onClick={() => addTable()}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Table
                </Button>
              </div>

              {tables.length > 0 && (
                <ul className="list-disc pl-5 space-y-1">
                  {tables.map((t) => (
                    <li
                      key={t.name}
                      className="flex justify-between items-center text-sm"
                    >
                      {t.name} — {t.capacity} seats
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => removeTable(null, t.name)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* 🧩 Layout Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Restaurant Layout</CardTitle>
          <CardDescription>
            Preview your current restaurant layout
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {hasMultiFloor ? (
            floors.length > 0 ? (
              floors.map((f) => (
                <div key={f.id}>
                  <h3 className="font-medium mb-1">{f.name}</h3>
                  {f.tables.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {f.tables.map((t) => (
                        <div
                          key={t.name}
                          className="border rounded-md px-3 py-1 bg-muted text-sm"
                        >
                          {t.name} ({t.capacity})
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No tables added to this floor
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-sm">
                No floors configured yet.
              </p>
            )
          ) : tables.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {tables.map((t) => (
                <div
                  key={t.name}
                  className="border rounded-md px-3 py-1 bg-muted text-sm"
                >
                  {t.name} ({t.capacity})
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <UtensilsCrossed className="w-10 h-10 mb-2 opacity-60" />
              <p className="text-muted-foreground text-sm">
                No tables configured yet.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
