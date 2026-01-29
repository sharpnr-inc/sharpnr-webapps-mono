import { useEffect, useState } from "react"

/* ================================
   Types
================================ */
type RoomStatus =
  | "available"
  | "occupied"
  | "reserved"
  | "cleaning"
  | "out_of_service"

interface Room {
  id: string
  number: string
  floor: number
  type: string
  status: RoomStatus
}

/* ================================
   Dummy Data (inline for now)
================================ */
const DUMMY_ROOMS: Room[] = [
  { id: "1", number: "G01", floor: 0, type: "Standard", status: "available" },
  { id: "2", number: "G02", floor: 0, type: "Standard", status: "occupied" },
  { id: "3", number: "G03", floor: 0, type: "Deluxe", status: "cleaning" },

  { id: "4", number: "101", floor: 1, type: "Standard", status: "available" },
  { id: "5", number: "102", floor: 1, type: "Deluxe", status: "reserved" },
  { id: "6", number: "103", floor: 1, type: "Suite", status: "occupied" },
  { id: "7", number: "104", floor: 1, type: "Standard", status: "available" },

  { id: "8", number: "201", floor: 2, type: "Standard", status: "available" },
  { id: "9", number: "202", floor: 2, type: "Deluxe", status: "occupied" },
  { id: "10", number: "203", floor: 2, type: "Suite", status: "out_of_service" },
  { id: "11", number: "204", floor: 2, type: "Standard", status: "cleaning" },

  { id: "8", number: "201", floor: 2, type: "Standard", status: "available" },
  { id: "9", number: "202", floor: 2, type: "Deluxe", status: "occupied" },
  { id: "10", number: "203", floor: 2, type: "Suite", status: "out_of_service" },
  { id: "11", number: "204", floor: 2, type: "Standard", status: "cleaning" },
]

/* ================================
   Status Styles
================================ */
const statusStyles: Record<RoomStatus, string> = {
  available:
    "bg-emerald-500/15 border-emerald-500/30 text-emerald-700",
  occupied:
    "bg-red-500/15 border-red-500/30 text-red-700",
  reserved:
    "bg-yellow-500/15 border-yellow-500/30 text-yellow-800",
  cleaning:
    "bg-sky-500/15 border-sky-500/30 text-sky-700",
  out_of_service:
    "bg-zinc-500/15 border-zinc-500/30 text-zinc-600",
}

/* ================================
   Room Card
================================ */
function RoomCard({
  room,
  onClick,
}: {
  room: Room
  onClick?: (room: Room) => void
}) {
  return (
    <button
      onClick={() => onClick?.(room)}
      className={`
        aspect-square rounded-xl border p-3
        flex flex-col justify-between
        transition-all duration-200
        hover:scale-[1.03] hover:shadow-md
        ${statusStyles[room.status]}
      `}
    >
      <div className="text-xl font-semibold">
        {room.number}
      </div>

      <div className="text-xs opacity-70">
        {room.type}
      </div>

      <div className="text-xs font-medium capitalize">
        {room.status.replace("_", " ")}
      </div>
    </button>
  )
}

/* ================================
   Main Page
================================ */
export default function RoomBookingPage() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [floor, setFloor] = useState<number | "all">("all")

  // Fake API call (inline)
  useEffect(() => {
    setTimeout(() => {
      setRooms(DUMMY_ROOMS)
    }, 300)
  }, [])

  const filteredRooms =
    floor === "all"
      ? rooms
      : rooms.filter((r) => r.floor === floor)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          Room Booking
        </h1>

        {/* Floor Filter */}
        <div className="flex gap-2">
          {["all", 0, 1, 2].map((f) => (
            <button
              key={f}
              onClick={() => setFloor(f as any)}
              className={`px-3 py-1 rounded-full text-sm border
                ${
                  floor === f
                    ? "bg-black text-white"
                    : "bg-white hover:bg-zinc-100"
                }`}
            >
              {f === "all" ? "All" : `Floor ${f}`}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {filteredRooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            onClick={(r) => {
              // later → openSheet(r)
              console.log("Room clicked:", r)
            }}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 text-sm pt-4">
        {Object.keys(statusStyles).map((status) => (
          <div
            key={status}
            className={`px-3 py-1 rounded-full border ${
              statusStyles[status as RoomStatus]
            }`}
          >
            {status.replace("_", " ")}
          </div>
        ))}
      </div>
    </div>
  )
}
