import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@radix-ui/react-scroll-area";

interface RestaurantTimingSettingsProps {}

type Day =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

type DayTiming = {
  open: boolean;
  from: string;
  to: string;
};

const DAYS: Day[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const defaultTiming: DayTiming = {
  open: true,
  from: "09:00",
  to: "22:00",
};

const RestaurantTimingSettings: React.FC<
  RestaurantTimingSettingsProps
> = () => {
  const [timings, setTimings] = useState<Record<Day, DayTiming>>(
    DAYS.reduce(
      (acc, day) => {
        acc[day] = { ...defaultTiming };
        return acc;
      },
      {} as Record<Day, DayTiming>,
    ),
  );

  const applyToAll = (timing: DayTiming) => {
    const updated = DAYS.reduce(
      (acc, day) => {
        acc[day] = { ...timing };
        return acc;
      },
      {} as Record<Day, DayTiming>,
    );
    setTimings(updated);
  };

  return (
   
      <Card className="">
        <CardHeader>
          <CardTitle>Restaurant Timings</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {DAYS.map((day, index) => {
            const timing = timings[day];

            return (
              <div key={day} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{day}</div>

                  <div className="flex items-center gap-3">
                    <Label className="text-sm text-muted-foreground">
                      {timing.open ? "Open" : "Closed"}
                    </Label>
                    <Switch
                      checked={timing.open}
                      onCheckedChange={(checked) =>
                        setTimings((prev) => ({
                          ...prev,
                          [day]: { ...prev[day], open: checked },
                        }))
                      }
                    />
                  </div>
                </div>

                {timing.open && (
                  <div className="grid grid-cols-2 gap-4 pl-2">
                    <div className="space-y-1">
                      <Label>Opening Time</Label>
                      <Input
                        type="time"
                        value={timing.from}
                        onChange={(e) =>
                          setTimings((prev) => ({
                            ...prev,
                            [day]: {
                              ...prev[day],
                              from: e.target.value,
                            },
                          }))
                        }
                      />
                    </div>

                    <div className="space-y-1">
                      <Label>Closing Time</Label>
                      <Input
                        type="time"
                        value={timing.to}
                        onChange={(e) =>
                          setTimings((prev) => ({
                            ...prev,
                            [day]: {
                              ...prev[day],
                              to: e.target.value,
                            },
                          }))
                        }
                      />
                    </div>
                  </div>
                )}

                {index === 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-2"
                    onClick={() => applyToAll(timing)}
                  >
                    Apply Monday to all days
                  </Button>
                )}

                {index < DAYS.length - 1 && <Separator />}
              </div>
            );
          })}

          <div className="flex justify-end pt-4">
            <Button>Save Timings</Button>
          </div>
        </CardContent>
      </Card>
   
  );
};

export default RestaurantTimingSettings;
