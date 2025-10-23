import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BedDouble, CalendarDays, DoorOpen} from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";

export default function HotelOverviewSection() {

  const bookings = [
    {
      id: 1,
      guest: "John Doe",
      room: "204",
      checkIn: "2025-10-22",
      checkOut: "2025-10-25",
      status: "Checked In",
      totalAmount: 12000,
      pendingAmount: 2000,
    },
    {
      id: 2,
      guest: "Sarah Khan",
      room: "305",
      checkIn: "2025-10-26",
      checkOut: "2025-10-29",
      status: "Upcoming",
      totalAmount: 15000,
      pendingAmount: 15000,
    },
    {
      id: 3,
      guest: "Alex Smith",
      room: "110",
      checkIn: "2025-10-20",
      checkOut: "2025-10-23",
      status: "Due Checkout",
      totalAmount: 9000,
      pendingAmount: 0,
    },
    {
      id: 4,
      guest: "Emma Brown",
      room: "410",
      checkIn: "2025-10-15",
      checkOut: "2025-10-18",
      status: "Checked Out",
      totalAmount: 8000,
      pendingAmount: 0,
    },
  ]


    const getBadgeVariant = (status: string) => {
    switch (status) {
      case "Checked In":
        return "success"
      case "Upcoming":
        return "secondary"
      case "Due Checkout":
        return "warning"
      case "Checked Out":
        return "destructive"
      default:
        return "outline"
    }
  }
  return (
    <div className="space-y-2">
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
          <OverviewCard
            title="Pending Request"
            icon={<BedDouble className="h-4 w-4 text-muted-foreground" />}
            value="12"
            desc="Requests"
          />
        </div>
      </div>

      <div className="p-4">


        <Card className="w-full">
          <CardHeader>
            <CardTitle>Filter</CardTitle>
          </CardHeader>
          <CardContent><Button>Filter</Button></CardContent>
        </Card>

      <Table>

        <TableCaption>Current Hotel Room Bookings</TableCaption>
        <TableHeader className="bg-gray-800">
          <TableRow>
            <TableHead>Guest Name</TableHead>
            <TableHead>Room</TableHead>
            <TableHead>Check-In</TableHead>
            <TableHead>Check-Out</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total (₹)</TableHead>
            <TableHead>Pending (₹)</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>{booking.guest}</TableCell>
              <TableCell>{booking.room}</TableCell>
              <TableCell>{booking.checkIn}</TableCell>
              <TableCell>{booking.checkOut}</TableCell>
              <TableCell>
                <Badge variant={"default"}>
                  {booking.status}
                </Badge>
              </TableCell>
              <TableCell>₹{booking.totalAmount.toLocaleString()}</TableCell>
              <TableCell>₹{booking.pendingAmount.toLocaleString()}</TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm">
                  Manage
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

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

