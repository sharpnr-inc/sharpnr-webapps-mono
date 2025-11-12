import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BedDouble, CalendarDays, DoorOpen } from "lucide-react";
import HotelBookingOverviewTable from "../dataTables/HotelBookingOverviewTable";
import EmptyHotelPlaceHolder from "./EmptyHotelComponenet";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useHotelOverview } from "@/api_service/queries/HospitalityQueries/Hotel";

export default function HotelOverviewSection() {
  
  const query = useQuery(useHotelOverview());
  console.log(query)

  const [isdata, setData] = useState(false);

  return (
    <div className="space-y-2">
      {isdata ? (
        <>
          {" "}
          <div className="border rounded p-2 space-y-2">
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                Hotel Overview
              </h2>
              <p className="text-sm text-muted-foreground">
                Overview of room occupancy and bookings
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-5">
              <OverviewCard
                title="Total Rooms"
                icon={<BedDouble className="h-4 w-4 text-muted-foreground" />}
                value="120"
                desc="Including all categories"
              />
              <OverviewCard
                title="Upcoming Reservations"
                icon={
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                }
                value="34"
                desc="For the next 7 days"
              />
              <OverviewCard
                title="Rooms Occupied"
                icon={<DoorOpen className="h-4 w-4 text-muted-foreground" />}
                value="86"
                desc="Currently occupied"
              />
              <OverviewCard
                title="Available Rooms"
                icon={<BedDouble className="h-4 w-4 text-muted-foreground" />}
                value="34"
                desc="Ready for booking"
              />
              <OverviewCard
                title="Pending Request"
                icon={<BedDouble className="h-4 w-4 text-muted-foreground" />}
                value="12"
                desc="Requests"
              />
            </div>
          </div>
          <div className="p-2 border rounded-2xl">
            <HotelBookingOverviewTable />
          </div>
        </>
      ) : (
        <EmptyHotelPlaceHolder />
      )}
    </div>
  );
}

/* Reusable Components */
function OverviewCard({
  title,
  icon,
  value,
  desc,
}: {
  title: string;
  icon: React.ReactNode;
  value: string;
  desc: string;
}) {
  return (
    <Card className="hover:shadow-md transition-all">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </CardContent>
    </Card>
  );
}
