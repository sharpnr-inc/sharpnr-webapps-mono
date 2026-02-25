import { useForm } from "@tanstack/react-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

type Floor = {
  floor_no: number;
  rooms: number;
};
export function HotelFloorConfiguration() {
  const [totalFloors, setTotalFloors] = useState<number | "">("");

  const form = useForm({
    defaultValues: {
      floors: [] as Floor[],
    },
    onSubmit: ({ value }) => {
      console.log("FINAL PAYLOAD", value);
    },
  });

  /** generate floors starting from 0 */
  function generateFloors(count: number): Floor[] {
    return Array.from({ length: count }, (_, i) => ({
      floor_no: i,
      rooms: 0,
    }));
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle>Floor Configuration</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Total floors */}
          <div className="space-y-2">
            <Label>Total Floors</Label>
            <Input
              type="number"
              step={1}
              inputMode="numeric"
              value={totalFloors}
              onChange={(e) => {
                const v =
                  e.target.value === "" ? "" : parseInt(e.target.value, 10);

                setTotalFloors(v);

                if (typeof v !== "number" || v < 0) {
                  form.setFieldValue("floors", []);
                  return;
                }

                form.setFieldValue("floors", generateFloors(v));
              }}
            />
          </div>

          {/* Floors list */}
          <form.Field name="floors" mode="array">
            {(field) => (
              <div className="space-y-4">
                {field.state.value.map((_, index) => (
                  <div key={index} className="rounded-md border p-4 space-y-3">
                    {/* Floor Header */}
                

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Floor No */}
                      <form.Field name={`floors[${index}].floor_no`}>
                        {(sub) => (
                          <div className="space-y-2">
                            <Label htmlFor={`floor-no-${index}`}>
                              Floor Number
                            </Label>
                            <Input
                              id={`floor-no-${index}`}
                              type="number"
                              step={1}
                              inputMode="numeric"
                              value={sub.state.value}
                              onChange={(e) => {
                                const val = parseInt(e.target.value, 10);
                                if (!Number.isInteger(val)) return;

                                const floors = [...form.state.values.floors];
                                floors[index].floor_no = val;

                                // auto-increment next floors
                                for (
                                  let i = index + 1;
                                  i < floors.length;
                                  i++
                                ) {
                                  floors[i].floor_no =
                                    floors[i - 1].floor_no + 1;
                                }

                                form.setFieldValue("floors", floors);
                              }}
                            />
                          </div>
                        )}
                      </form.Field>

                      {/* Rooms */}
                      <form.Field name={`floors[${index}].rooms`}>
                        {(sub) => (
                          <div className="space-y-2">
                            <Label htmlFor={`rooms-${index}`}>
                              Rooms on Floor
                            </Label>
                            <Input
                              id={`rooms-${index}`}
                              type="number"
                              step={1}
                              inputMode="numeric"
                              value={sub.state.value}
                              onChange={(e) =>
                                sub.handleChange(
                                  parseInt(e.target.value || "0", 10),
                                )
                              }
                            />
                          </div>
                        )}
                      </form.Field>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </form.Field>

          <Button type="submit">Save</Button>
        </CardContent>
      </Card>
    </form>
  );
}
