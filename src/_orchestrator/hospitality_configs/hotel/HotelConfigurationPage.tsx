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

export function HotelFloorConfig() {
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
              <div className="space-y-3">
                {field.state.value.map((_, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-3 gap-4 border p-3 rounded-md"
                  >
                    {/* Floor No */}
                    <form.Field name={`floors[${index}].floor_no`}>
                      {(sub) => (
                        <Input
                          type="number"
                          step={1}
                          inputMode="numeric"
                          value={sub.state.value}
                          onChange={(e) => {
                            const val = parseInt(e.target.value, 10);
                            if (!Number.isInteger(val)) return;

                            const floors = [...form.state.values.floors];
                            floors[index].floor_no = val;

                            for (let i = index + 1; i < floors.length; i++) {
                              floors[i].floor_no = floors[i - 1].floor_no + 1;
                            }

                            form.setFieldValue("floors", floors);
                          }}
                        />
                      )}
                    </form.Field>

                    {/* Rooms */}
                    <form.Field name={`floors[${index}].rooms`}>
                      {(sub) => (
                        <Input
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
                      )}
                    </form.Field>
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
