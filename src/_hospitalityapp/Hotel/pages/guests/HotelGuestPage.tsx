import { useEffect, useState } from "react"

/* ================================
   Types
================================ */
type GuestStatus =
  | "checked_in"
  | "checked_out"
  | "reserved"
  | "cancelled"

interface Guest {
  id: string
  name: string
  roomNumber: string
  guestsCount: number
  checkInDate: string
  checkOutDate: string
  status: GuestStatus
}

/* ================================
   Dummy Data
================================ */
const DUMMY_GUESTS: Guest[] = [
  {
    id: "1",
    name: "Amit Sharma",
    roomNumber: "101",
    guestsCount: 2,
    checkInDate: "2026-01-28",
    checkOutDate: "2026-01-31",
    status: "checked_in",
  },
  {
    id: "2",
    name: "Priya Verma",
    roomNumber: "202",
    guestsCount: 1,
    checkInDate: "2026-01-27",
    checkOutDate: "2026-01-30",
    status: "checked_out",
  },
  {
    id: "3",
    name: "Rahul Mehta",
    roomNumber: "104",
    guestsCount: 3,
    checkInDate: "2026-01-30",
    checkOutDate: "2026-02-02",
    status: "reserved",
  },
  {
    id: "4",
    name: "Neha Kapoor",
    roomNumber: "-",
    guestsCount: 2,
    checkInDate: "—",
    checkOutDate: "—",
    status: "cancelled",
  },
]

/* ================================
   Status Styles
================================ */
const statusStyles: Record<GuestStatus, string> = {
  checked_in:
    "bg-emerald-500/15 text-emerald-700 border-emerald-500/30",
  checked_out:
    "bg-zinc-500/15 text-zinc-700 border-zinc-500/30",
  reserved:
    "bg-sky-500/15 text-sky-700 border-sky-500/30",
  cancelled:
    "bg-red-500/15 text-red-700 border-red-500/30",
}

/* ================================
   Page
================================ */
export function HotelGuestPage() {
  const [guests, setGuests] = useState<Guest[]>([])
  const [statusFilter, setStatusFilter] =
    useState<GuestStatus | "all">("all")

  // Fake API
  useEffect(() => {
    setTimeout(() => {
      setGuests(DUMMY_GUESTS)
    }, 300)
  }, [])

  const filteredGuests =
    statusFilter === "all"
      ? guests
      : guests.filter((g) => g.status === statusFilter)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          Guests
        </h1>

        {/* Status Filter */}
        <div className="flex gap-2">
          {["all", "checked_in", "reserved", "checked_out", "cancelled"].map(
            (s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s as any)}
                className={`px-3 py-1 rounded-full text-sm border
                  ${
                    statusFilter === s
                      ? "bg-black text-white"
                      : "bg-gray-700 hover:bg-zinc-100"
                  }`}
              >
                {s === "all"
                  ? "All"
                  : s.replace("_", " ")}
              </button>
            )
          )}
        </div>
      </div>

      {/* Guest List */}
      <div className="space-y-3">
        {filteredGuests.map((guest) => (
          <div
            key={guest.id}
            className="flex items-center justify-between gap-4
              rounded-xl border p-4 hover:shadow-sm transition"
          >
            {/* Left */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold">
                  {guest.name}
                </span>

                <span className="text-xs px-2 py-0.5 rounded-full border">
                  Room {guest.roomNumber}
                </span>
              </div>

              <div className="text-sm text-muted-foreground">
                Guests: {guest.guestsCount} ·
                Check-in: {guest.checkInDate} ·
                Check-out: {guest.checkOutDate}
              </div>
            </div>

            {/* Right */}
            <div
              className={`px-3 py-1 rounded-full text-xs font-medium border
                ${statusStyles[guest.status]}`}
            >
              {guest.status.replace("_", " ")}
            </div>
          </div>
        ))}

        {filteredGuests.length === 0 && (
          <div className="text-center text-sm text-muted-foreground py-10">
            No guests found
          </div>
        )}
      </div>
    </div>
  )
}
