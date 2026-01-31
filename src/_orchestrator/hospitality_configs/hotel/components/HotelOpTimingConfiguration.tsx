import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function HotelOpTimingConfiguration() {
  const [isReception24x7, setIsReception24x7] = useState(false);
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hotel Operation Timing</CardTitle>
        <CardDescription>
          Configure reception availability and check-in/check-out timings
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Hotel Info */}
        <div className="space-y-2">
          <Label htmlFor="hotel-name">Hotel Name</Label>
          <Input id="hotel-name" placeholder="e.g. Hotel Taj Palace" />
        </div>

        {/* Divider */}
        <div className="border-t" />

        {/* Reception Setting */}
        <div className="flex items-start gap-3 rounded-md border p-4">
          <Checkbox
            id="reception-24x7"
            checked={isReception24x7}
            onCheckedChange={(value) => setIsReception24x7(!!value)}
          />
          <div className="space-y-1">
            <Label htmlFor="reception-24x7" className="cursor-pointer">
              Reception Open 24×7
            </Label>
            <p className="text-sm text-muted-foreground">
              Enable this if reception operates round the clock
            </p>
          </div>
        </div>

        {/* Check-in / Check-out */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="check-in-time">Check-In Time</Label>
            <Input
              id="check-in-time"
              type="time"
              value={checkInTime}
              onChange={(e) => setCheckInTime(e.target.value)}
              disabled={isReception24x7}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="check-out-time">Check-Out Time</Label>
            <Input
              id="check-out-time"
              type="time"
              value={checkOutTime}
              onChange={(e) => setCheckOutTime(e.target.value)}
              disabled={isReception24x7}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-5">
        <Button>Save</Button>
         <Button>Reset</Button>
      </CardFooter>
    </Card>
  );
}
