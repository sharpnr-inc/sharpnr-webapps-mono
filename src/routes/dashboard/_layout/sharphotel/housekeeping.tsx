import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createFileRoute } from "@tanstack/react-router";
import { Hotel } from "lucide-react";

export const Route = createFileRoute(
  "/dashboard/_layout/sharphotel/housekeeping"
)({
  component: RouteComponent,
  context: () => ({
    heading: "Dearie Hotel",
    subheading: "Manage Hotel operations",
    HeaderIcon: Hotel,
  }),
});

function RouteComponent() {
    const privilegeLevels = ["READ", "WRITE", "DELETE", "NONE"]
  const sections = ["Overview", "Booking", "Requests", "Room Config"]
  return (
   <div className="p-4">
      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle>SharpHospitality</CardTitle>
          <CardDescription>Manage privileges for different hotel modules</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <div className="font-medium text-sm text-muted-foreground">
              HOTEL →
            </div>

            <div className="grid gap-3">
              {sections.map((section) => (
                <div
                  key={section}
                  className="flex items-center justify-between gap-4 border rounded-md p-3"
                >
                  <Label className="min-w-[120px] font-medium">{section}</Label>

                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Privilege" />
                    </SelectTrigger>
                    <SelectContent>
                      {privilegeLevels.map((level) => (
                        <SelectItem key={level} value={level.toLowerCase()}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
