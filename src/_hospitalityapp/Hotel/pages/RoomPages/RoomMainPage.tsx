
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
import { Route } from "@/routes/_appuser/dashboard/sharp_hospitality/hotel/booking/$roomId";
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
   <div className="mx-auto max-w-6xl space-y-6 p-4">
      {/* ───────── HEADER ───────── */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Room {room.roomName}
          </h1>
          <p className="text-sm text-muted-foreground truncate">
            Booking ID · {booking.id}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="secondary">{booking.status}</Badge>
          <Button size="sm" onClick={handleAddPayments}>
            Add Payment
          </Button>
        </div>
      </div>

      {/* ───────── MAIN GRID ───────── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">
                Booking Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <InfoRow
                label="Check-in"
                value={formatDateTime(booking.checkInDate)}
              />
              <InfoRow
                label="Check-out"
                value={formatDateTime(booking.checkOutDate)}
              />
              <InfoRow
                label="Created At"
                value={formatDateTime(booking.createdAt)}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">
                Primary Guest
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <InfoRow label="Name" value={guest.name} />
              <InfoRow label="Mobile" value={guest.mobile} />
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6 lg:col-span-2">
          {/* Charges */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">
                Charges
              </CardTitle>
            </CardHeader>
            <CardContent>
              {charges.length === 0 ? (
                <EmptyState text="No charges added yet" />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">
                        Amount
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {charges.map((c:any) => (
                      <TableRow key={c.id}>
                        <TableCell>{c.description}</TableCell>
                        <TableCell className="text-right font-medium">
                          ₹{c.amount}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          {/* Payments */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">
                Payments
              </CardTitle>
            </CardHeader>
            <CardContent>
              {payments.length === 0 ? (
                <EmptyState text="No payments recorded" />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Method</TableHead>
                      <TableHead className="text-right">
                        Amount
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((p:any) => (
                      <TableRow key={p.id}>
                        <TableCell>{p.method}</TableCell>
                        <TableCell className="text-right font-medium">
                          ₹{p.amount}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ───────── BILL SUMMARY ───────── */}
      {previewBill && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle>Bill Summary</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <SummaryRow
              label="Base Amount"
              value={previewBill.BaseAmount}
            />

            {previewBill.TaxBreakup?.length ? (
              <>
                <Separator />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Tax Breakup
                  </p>
                  {previewBill.TaxBreakup.map((tax, i) => (
                    <div
                      key={i}
                      className="flex justify-between pl-4 text-sm text-muted-foreground"
                    >
                      <span>
                        {tax.ComponentType} ({tax.Rate}%)
                      </span>
                      <span>
                        {formatCurrency(tax.Amount)}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            <SummaryRow
              label="Total Tax"
              value={previewBill.TaxAmount}
            />

            <Separator />

            <SummaryRow
              label="Total Amount"
              value={previewBill.TotalAmount}
              strong
            />

            <SummaryRow
              label="Paid"
              value={previewBill.PaidAmount}
              className="text-green-600"
            />

            <div className="flex items-center justify-between rounded-lg bg-muted px-4 py-3">
              <span className="font-semibold">
                Balance Due
              </span>
              <span className="font-semibold text-orange-600">
                {formatCurrency(previewBill.Balance)}
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ───────── FOOTER BALANCE ───────── */}
      <div className="flex justify-end text-lg font-semibold">
        Balance: ₹{balance}
      </div>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  strong,
  className,
}: {
  label: string
  value: number
  strong?: boolean
  className?: string
}) {
  return (
    <div className={`flex justify-between ${className ?? ""}`}>
      <span className={strong ? "font-semibold" : "text-sm"}>
        {label}
      </span>
      <span className={strong ? "font-semibold" : "text-sm"}>
        {formatCurrency(value)}
      </span>
    </div>
  )
}

function InfoRow({
  label,
  value,
}: {
  label: string
  value: React.ReactNode
}) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  )
}

function EmptyState({ text }: { text: string }) {
  return (
    <p className="py-6 text-center text-sm text-muted-foreground">
      {text}
    </p>
  )
}