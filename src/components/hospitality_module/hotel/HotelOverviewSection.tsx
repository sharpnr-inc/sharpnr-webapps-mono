"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Hotel,
  BedDouble,
  CalendarDays,
  DoorOpen,
  Utensils,
  BarChart,
} from "lucide-react";
import SharpTable from "@/components/Tables/ShapTable";

export default function HotelOverviewSection() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Hotel className="size-6 text-primary" />
          Hotel Overview
        </h2>
        <p className="text-sm text-muted-foreground">
          Overview of room occupancy and bookings
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <OverviewCard
          title="Total Rooms"
          icon={<BedDouble className="h-4 w-4 text-muted-foreground" />}
          value="120"
          desc="Including all categories"
        />
        <OverviewCard
          title="Upcoming Reservations"
          icon={<CalendarDays className="h-4 w-4 text-muted-foreground" />}
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
      </div>

      <Separator />

      {/* Orders & Housekeeping Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <BarChart className="size-5 text-primary" />
          <h3 className="text-lg font-semibold">
            Orders & Housekeeping Requests
          </h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Latest in-room service and housekeeping updates
        </p>

        <ScrollArea className="h-[250px] rounded-md border p-2">
          <div className="grid gap-3">
            {/* Example entries */}
            <RequestCard
              room="302"
              type="Housekeeping"
              details="Towel and toiletries"
              status="In Progress"
              icon={<BarChart className="h-4 w-4 text-muted-foreground" />}
            />
            <RequestCard
              room="215"
              type="Room Service"
              details="Lunch Order - Club Sandwich"
              status="Delivered"
              icon={<Utensils className="h-4 w-4 text-muted-foreground" />}
            />
            <RequestCard
              room="410"
              type="Housekeeping"
              details="Laundry Pickup"
              status="Pending"
              icon={<BarChart className="h-4 w-4 text-muted-foreground" />}
            />
          </div>
        </ScrollArea>
      </div>

      <Separator />

      <div className="text-sm text-muted-foreground">
        Updated just now — monitor hotel activity in real-time.
      </div>
      <SharpTable></SharpTable>
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

function RequestCard({
  room,
  type,
  details,
  status,
  icon,
}: {
  room: string;
  type: string;
  details: string;
  status: "Pending" | "In Progress" | "Delivered";
  icon: React.ReactNode;
}) {
  const statusColor =
    status === "Pending"
      ? "bg-yellow-100 text-yellow-800"
      : status === "In Progress"
        ? "bg-blue-100 text-blue-800"
        : "bg-green-100 text-green-800";

  return (
    <Card className="flex items-center justify-between p-3 hover:shadow-sm transition">
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <div className="font-medium">
            {type} – Room {room}
          </div>
          <p className="text-xs text-muted-foreground">{details}</p>
        </div>
      </div>
      <Badge className={`${statusColor}`}>{status}</Badge>
    </Card>
  );
}
