import React, { useEffect, useState } from "react"

/* ================================
   Types
================================ */
type RequestStatus = "pending" | "in_progress" | "completed"

type RequestType =
  | "room_service"
  | "housekeeping"
  | "maintenance"
  | "laundry"
  | "urgent"

interface RoomRequest {
  id: string
  roomNumber: string
  type: RequestType
  message: string
  status: RequestStatus
  createdAt: string
}

/* ================================
   Dummy Data
================================ */
const DUMMY_REQUESTS: RoomRequest[] = [
  {
    id: "1",
    roomNumber: "101",
    type: "room_service",
    message: "Need extra towels",
    status: "pending",
    createdAt: "10 mins ago",
  },
  {
    id: "2",
    roomNumber: "202",
    type: "maintenance",
    message: "AC not cooling properly",
    status: "in_progress",
    createdAt: "25 mins ago",
  },
  {
    id: "3",
    roomNumber: "G03",
    type: "housekeeping",
    message: "Please clean the room",
    status: "completed",
    createdAt: "1 hour ago",
  },
  {
    id: "4",
    roomNumber: "104",
    type: "urgent",
    message: "Water leakage in bathroom",
    status: "pending",
    createdAt: "2 mins ago",
  },
]

/* ================================
   Status Styles
================================ */
const statusStyles: Record<RequestStatus, string> = {
  pending: "bg-yellow-500/15 text-yellow-700 border-yellow-500/30",
  in_progress: "bg-sky-500/15 text-sky-700 border-sky-500/30",
  completed: "bg-emerald-500/15 text-emerald-700 border-emerald-500/30",
}

const typeLabels: Record<RequestType, string> = {
  room_service: "Room Service",
  housekeeping: "Housekeeping",
  maintenance: "Maintenance",
  laundry: "Laundry",
  urgent: "Urgent",
}

/* ================================
   Page
================================ */
const HotelRoomRequestPage: React.FC = () => {
  const [requests, setRequests] = useState<RoomRequest[]>([])
  const [statusFilter, setStatusFilter] =
    useState<RequestStatus | "all">("all")

  // Fake API
  useEffect(() => {
    setTimeout(() => {
      setRequests(DUMMY_REQUESTS)
    }, 300)
  }, [])

  const filteredRequests =
    statusFilter === "all"
      ? requests
      : requests.filter((r) => r.status === statusFilter)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          Room Requests
        </h1>

        {/* Status Filter */}
        <div className="flex gap-2">
          {["all", "pending", "in_progress", "completed"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s as any)}
              className={`px-3 py-1 rounded-full text-sm border
                ${
                  statusFilter === s
                    ? "bg-black text-white"
                    : "bg-white hover:bg-zinc-100"
                }`}
            >
              {s === "all"
                ? "All"
                : s.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-3">
        {filteredRequests.map((req) => (
          <div
            key={req.id}
            className="flex items-center justify-between gap-4
              rounded-xl border p-4 hover:shadow-sm transition"
          >
            {/* Left */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold">
                  Room {req.roomNumber}
                </span>

                <span className="text-xs px-2 py-0.5 rounded-full border">
                  {typeLabels[req.type]}
                </span>
              </div>

              <div className="text-sm text-muted-foreground">
                {req.message}
              </div>

              <div className="text-xs text-muted-foreground">
                {req.createdAt}
              </div>
            </div>

            {/* Right */}
            <div
              className={`px-3 py-1 rounded-full text-xs font-medium border
                ${statusStyles[req.status]}`}
            >
              {req.status.replace("_", " ")}
            </div>
          </div>
        ))}

        {filteredRequests.length === 0 && (
          <div className="text-center text-sm text-muted-foreground py-10">
            No requests found
          </div>
        )}
      </div>
    </div>
  )
}

export default HotelRoomRequestPage
