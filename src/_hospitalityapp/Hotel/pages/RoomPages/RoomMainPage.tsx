"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

import {
  useBookingPreviewBill,
  useHotelBookingDetails,
} from "@/_hospitalityapp/Hotel/apis/queries/Hotel";
import { Route } from "@/routes/dashboard/sharp_hospitality/hotel/$roomId";
import { Button } from "@/components/ui/button";
import { useDialogModal } from "@/context/DialogModalContext";
import { AddPaymentsInHotelRoomBookingForm } from "../../components/AddPaymentsForm";

function formatDateTime(date: string | Date) {
  return new Date(date).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

interface TaxBreakup {
  ComponentType: string;
  Rate: number;
  Amount: number;
}

interface BillPreview {
  BookingID: string;
  BaseAmount: number;
  TaxAmount: number;
  TotalAmount: number;
  TaxBreakup: TaxBreakup[];
  PaidAmount: number;
  Balance: number;
}

// Add this utility function
function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(amount);
}

export function HotelRoomMainPage() {


  const { roomId } = Route.useParams();

  const { data, isLoading } = useHotelBookingDetails(roomId);
  const { data: previewBillResponse } = useBookingPreviewBill(
    data?.booking?.booking?.id
  );
  const previewBill: BillPreview | undefined = previewBillResponse?.data;

  if (isLoading) {
    return <div className="p-6 text-sm text-muted-foreground">Loading…</div>;
  }

  if (!data?.success || !data.booking) {
    return <div className="p-6 text-sm text-red-500">Booking not found</div>;
  }

  const { booking, room, guest, charges, payments, balance } = data.booking;

  const {openModal, closeModal} = useDialogModal()

  const handleAddPayments = ()=>{
    openModal(<AddPaymentsInHotelRoomBookingForm bookingID={booking?.id} closeModal={closeModal}/>)
  }

  return (
    <div className="space-y-6 p-6">
      {/* ───────── HEADER ───────── */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Room {room.roomName}</h1>

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
            <span className="text-muted-foreground">Name:</span> {guest.name}
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
                    <TableCell className="text-right">₹{c.amount}</TableCell>
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
          <Button onClick={handleAddPayments} className="w-fit">Add Payments</Button>
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
                    <TableCell className="text-right">₹{p.amount}</TableCell>
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

      {previewBill && (
        <Card>
          <CardHeader>
            <CardTitle>Bill Preview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Base Amount */}
            <div className="flex justify-between items-center py-2">
              <span className="text-sm font-medium">Base Amount</span>
              <span className="text-sm">
                {formatCurrency(previewBill.BaseAmount)}
              </span>
            </div>

            <Separator />

            {/* Tax Breakup */}
            {previewBill.TaxBreakup && previewBill.TaxBreakup.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Tax Breakup
                </p>
                {previewBill.TaxBreakup.map((tax, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center pl-4 py-1"
                  >
                    <span className="text-sm text-muted-foreground">
                      {tax.ComponentType} ({tax.Rate}%)
                    </span>
                    <span className="text-sm">
                      {formatCurrency(tax.Amount)}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Total Tax */}
            <div className="flex justify-between items-center py-2">
              <span className="text-sm font-medium">Total Tax</span>
              <span className="text-sm">
                {formatCurrency(previewBill.TaxAmount)}
              </span>
            </div>

            <Separator className="my-2" />

            {/* Total Amount */}
            <div className="flex justify-between items-center py-2">
              <span className="text-base font-semibold">Total Amount</span>
              <span className="text-base font-semibold">
                {formatCurrency(previewBill.TotalAmount)}
              </span>
            </div>

            <Separator className="my-2" />

            {/* Paid Amount */}
            <div className="flex justify-between items-center py-2">
              <span className="text-sm font-medium text-green-600">
                Paid Amount
              </span>
              <span className="text-sm text-green-600">
                {formatCurrency(previewBill.PaidAmount)}
              </span>
            </div>

            {/* Balance */}
            <div className="flex justify-between items-center py-3 bg-muted/50 px-4 rounded-lg">
              <span className="text-base font-semibold">Balance Due</span>
              <span className="text-base font-semibold text-orange-600">
                {formatCurrency(previewBill.Balance)}
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
