import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BedDouble, Utensils, Wine } from "lucide-react";

export function HospitalityWrapperSection() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Select Hospitality Module</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Hotel */}
        <Card className="hover:shadow-lg transition">
          <CardHeader className="flex flex-row items-center gap-3">
            <BedDouble className="h-6 w-6 text-primary" />
            <CardTitle>Hotel</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Manage rooms, bookings, housekeeping, and guest services.
            </p>
            <Button className="w-full">Open Hotel</Button>
          </CardContent>
        </Card>

        {/* Bar */}
        <Card className="hover:shadow-lg transition">
          <CardHeader className="flex flex-row items-center gap-3">
            <Wine className="h-6 w-6 text-primary" />
            <CardTitle>Bar</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Handle bar inventory, POS, and drink menus.
            </p>
            <Button className="w-full">Open Bar</Button>
          </CardContent>
        </Card>

        {/* Restaurant */}
        <Card className="hover:shadow-lg transition">
          <CardHeader className="flex flex-row items-center gap-3">
            <Utensils className="h-6 w-6 text-primary" />
            <CardTitle>Restaurant</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Tables, kitchen orders, menu, and billing management.
            </p>
            <Button className="w-full">Open Restaurant</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
