// This page is for configuring the hotel of hospitality domain
// This is page implement the multiple phases for the setting up the hotel
// So this page when user first arrives to setup or configure the hotel

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HotelOpTimingConfiguration } from "./components/HotelOpTimingConfiguration";
import { HotelFloorConfiguration } from "./components/HotelFloorConfiguration";

export function HotelConfigurationPage() {
  return (
    <div className="space-y-2">
      <HotelOpTimingConfiguration />
      <Card>
        <CardHeader>
          <CardTitle>Hotel Configuration</CardTitle>
          <CardDescription>
            Configure Your Hotel, and setup the hotels
          </CardDescription>
        </CardHeader>

        {
          <CardContent>
           <HotelFloorConfiguration/>
          </CardContent>
        }
      </Card>
    </div>
  );
}
