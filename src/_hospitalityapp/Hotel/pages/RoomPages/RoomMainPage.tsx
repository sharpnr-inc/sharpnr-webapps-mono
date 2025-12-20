"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useHotelBookingDetails } from "@/api_service/queries/HospitalityQueries/Hotel";
import { Route } from "@/routes/dashboard/(dashboard)/sharp_hospitality/hotel/$roomId";

function formatDateTime(date: string | Date) {
  return new Date(date).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}


export function HotelRoomMainPage() {
  const { roomId } = Route.useParams();

  const { data, isLoading } = useHotelBookingDetails(roomId);

  if (isLoading) {
    return <div className="p-6 text-sm text-muted-foreground">Loading…</div>;
  }

  if (!data?.success || !data.booking) {
    return <div className="p-6 text-sm text-red-500">Booking not found</div>;
  }

  const { booking, room, guest, charges, payments, balance } = data.booking;

  return (
    <div className="space-y-6 p-6">
      {/* ───────── HEADER ───────── */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">
          Room {room.roomName}
        </h1>

        <Badge variant="secondary">{booking.status}</Badge>
      </div>

      {/* ───────── BOOKING INFO ───────── */}
      <Card>
        <CardHeader>
          <CardTitle>Booking Details</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Check-in</p>
            <p>{formatDateTime(booking.checkInDate)}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Check-out</p>
            <p>{formatDateTime(booking.checkOutDate)}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Booking ID</p>
            <p className="truncate">{booking.id}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Created At</p>
            <p>{formatDateTime(booking.createdAt).toLocaleString()}</p>
          </div>
        </CardContent>
      </Card>

      {/* ───────── GUEST INFO ───────── */}
      <Card>
        <CardHeader>
          <CardTitle>Primary Guest</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-1">
          <p>
            <span className="text-muted-foreground">Name:</span>{" "}
            {guest.name}
          </p>
          <p>
            <span className="text-muted-foreground">Mobile:</span>{" "}
            {guest.mobile}
          </p>
        </CardContent>
      </Card>

      {/* ───────── CHARGES TABLE ───────── */}
      <Card>
        <CardHeader>
          <CardTitle>Charges</CardTitle>
        </CardHeader>
        <CardContent>
          {charges.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No charges added yet
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {charges.map((c: any) => (
                  <TableRow key={c.id}>
                    <TableCell>{c.description}</TableCell>
                    <TableCell className="text-right">
                      ₹{c.amount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* ───────── PAYMENTS TABLE ───────── */}
      <Card>
        <CardHeader>
          <CardTitle>Payments</CardTitle>
        </CardHeader>
        <CardContent>
          {payments.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No payments recorded
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((p: any) => (
                  <TableRow key={p.id}>
                    <TableCell>{p.method}</TableCell>
                    <TableCell className="text-right">
                      ₹{p.amount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Separator />

      {/* ───────── BALANCE ───────── */}
      <div className="flex justify-end text-lg font-semibold">
        Balance: ₹{balance}
      </div>
    </div>
  );
}
