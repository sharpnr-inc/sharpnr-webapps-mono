import React, { useState } from "react"

/* ================================
   Types
================================ */
type RoomStatus = "available" | "occupied" | "cleaning"

interface Charge {
  id: string
  label: string
  amount: number
}

interface GuestCheckout {
  id: string
  guestName: string
  roomNumber: string
  stayNights: number
  roomRate: number
  charges: Charge[]
  taxes: number
  paymentStatus: "unpaid" | "paid"
}

interface Room {
  id: string
  number: string
  status: RoomStatus
  checkout?: GuestCheckout
}

/* ================================
   Dummy Rooms + Checkout Data
================================ */
const ROOMS: Room[] = [
  {
    id: "1",
    number: "101",
    status: "occupied",
    checkout: {
      id: "c1",
      guestName: "Amit Sharma",
      roomNumber: "101",
      stayNights: 3,
      roomRate: 4500,
      taxes: 540,
      paymentStatus: "unpaid",
      charges: [
        { id: "1", label: "Room Service", amount: 850 },
        { id: "2", label: "Laundry", amount: 300 },
      ],
    },
  },
  { id: "2", number: "102", status: "available" },
  {
    id: "3",
    number: "103",
    status: "occupied",
    checkout: {
      id: "c2",
      guestName: "Priya Verma",
      roomNumber: "103",
      stayNights: 2,
      roomRate: 3800,
      taxes: 420,
      paymentStatus: "unpaid",
      charges: [{ id: "3", label: "Breakfast", amount: 400 }],
    },
  },
  { id: "4", number: "104", status: "cleaning" },
]

/* ================================
   Styles
================================ */
const statusStyles: Record<RoomStatus, string> = {
  available:
    "bg-emerald-500/15 text-emerald-700 border-emerald-500/30",
  occupied:
    "bg-red-500/15 text-red-700 border-red-500/30",
  cleaning:
    "bg-sky-500/15 text-sky-700 border-sky-500/30",
}

/* ================================
   Page
================================ */
const HotelCheckoutPage: React.FC = () => {
  const [selectedRoom, setSelectedRoom] =
    useState<Room | null>(null)

  const checkout = selectedRoom?.checkout

  const roomTotal =
    checkout ? checkout.stayNights * checkout.roomRate : 0
  const extrasTotal =
    checkout?.charges.reduce((s, c) => s + c.amount, 0) ?? 0
  const grandTotal =
    checkout ? roomTotal + extrasTotal + checkout.taxes : 0

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* ================= Room Layout ================= */}
      <div className="lg:col-span-2 space-y-4">
        <h1 className="text-2xl font-semibold">
          Room Checkout
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {ROOMS.map((room) => (
            <button
              key={room.id}
              disabled={room.status !== "occupied"}
              onClick={() => setSelectedRoom(room)}
              className={`
                aspect-square rounded-xl border p-3
                flex flex-col justify-between
                transition
                ${statusStyles[room.status]}
                ${
                  room.status === "occupied"
                    ? "hover:scale-105 hover:shadow-md"
                    : "opacity-50 cursor-not-allowed"
                }
              `}
            >
              <div className="text-xl font-semibold">
                {room.number}
              </div>
              <div className="text-xs capitalize">
                {room.status}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ================= Checkout Panel ================= */}
      <div className="rounded-xl border p-6">
        {!checkout ? (
          <div className="text-sm text-muted-foreground text-center py-20">
            Select an occupied room to checkout
          </div>
        ) : (
          <>
            <h2 className="text-lg font-medium mb-4">
              Guest Checkout
            </h2>

            {/* Guest Info */}
            <div className="space-y-1 mb-4">
              <div className="font-medium">
                {checkout.guestName}
              </div>
              <div className="text-sm text-muted-foreground">
                Room {checkout.roomNumber} ·{" "}
                {checkout.stayNights} nights
              </div>
            </div>

            {/* Bill Summary */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>
                  Room ({checkout.stayNights} × ₹
                  {checkout.roomRate})
                </span>
                <span>₹{roomTotal}</span>
              </div>

              {checkout.charges.map((c) => (
                <div
                  key={c.id}
                  className="flex justify-between"
                >
                  <span>{c.label}</span>
                  <span>₹{c.amount}</span>
                </div>
              ))}

              <div className="flex justify-between">
                <span>Taxes</span>
                <span>₹{checkout.taxes}</span>
              </div>

              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{grandTotal}</span>
              </div>
            </div>

            {/* Payment */}
            <div className="mt-6 space-y-4">
              <div className="flex gap-3">
                {["Cash", "Card", "UPI"].map((m) => (
                  <button
                    key={m}
                    className="border rounded-md px-4 py-2 hover:bg-zinc-100"
                  >
                    {m}
                  </button>
                ))}
              </div>

              <button
                onClick={() =>
                  setSelectedRoom({
                    ...selectedRoom!,
                    checkout: {
                      ...checkout,
                      paymentStatus: "paid",
                    },
                  })
                }
                className="w-full px-4 py-2 rounded-md bg-black text-white"
              >
                Complete Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default HotelCheckoutPage
