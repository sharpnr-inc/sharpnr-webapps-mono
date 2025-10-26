import { IlamyCalendar } from "@ilamy/calendar";

const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, "0");
const dd = String(today.getDate()).padStart(2, "0");

// Helper: generates date strings for today with specific times
const time = (h: number, m = 0) => new Date(`${yyyy}-${mm}-${dd}T${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:00`);

const bookings = [
  {
    id: "1",
    title: "Room 101 - John Doe",
    start: time(9, 0),
    end: time(11, 0),
    backgroundColor: "#10b981",
  },
  {
    id: "2",
    title: "Room 102 - Alice",
    start: time(10, 0),
    end: time(12, 0),
    backgroundColor: "#3b82f6",
  },
  {
    id: "3",
    title: "Room 103 - Guest A",
    start: time(11, 0),
    end: time(13, 0),
    backgroundColor: "#f59e0b",
  },
  {
    id: "4",
    title: "Room 104 - Guest B",
    start: time(12, 30),
    end: time(14, 30),
    backgroundColor: "#ef4444",
  },
  {
    id: "5",
    title: "Room 105 - Mr. Smith",
    start: time(13, 0),
    end: time(15, 0),
    backgroundColor: "#8b5cf6",
  },
  {
    id: "6",
    title: "Room 106 - Mr. Karim",
    start: time(14, 0),
    end: time(16, 0),
    backgroundColor: "#0ea5e9",
  },
  {
    id: "7",
    title: "Room 107 - Mrs. Lee",
    start: time(15, 0),
    end: time(17, 0),
    backgroundColor: "#84cc16",
  },
  {
    id: "8",
    title: "Room 108 - Family Stay",
    start: time(8, 30),
    end: time(10, 30),
    backgroundColor: "#f97316",
  },
  {
    id: "9",
    title: "Room 109 - Business Guest",
    start: time(16, 0),
    end: time(18, 0),
    backgroundColor: "#06b6d4",
  },
  {
    id: "10",
    title: "Room 110 - Couple Stay",
    start: time(17, 0),
    end: time(19, 0),
    backgroundColor: "#ec4899",
  },
  {
    id: "11",
    title: "Room 201 - VIP Guest",
    start: time(11, 30),
    end: time(13, 30),
    backgroundColor: "#f87171",
  },
  {
    id: "12",
    title: "Room 202 - Group Tour",
    start: time(9, 30),
    end: time(11, 30),
    backgroundColor: "#a855f7",
  },
  {
    id: "13",
    title: "Room 203 - Check-out",
    start: time(7, 0),
    end: time(8, 30),
    backgroundColor: "#eab308",
  },
  {
    id: "14",
    title: "Room 204 - Cleaning",
    start: time(13, 0),
    end: time(14, 0),
    backgroundColor: "#9ca3af",
  },
  {
    id: "15",
    title: "Room 205 - Maintenance",
    start: time(15, 30),
    end: time(17, 30),
    backgroundColor: "#facc15",
  },
  {
    id: "16",
    title: "Room 301 - Honeymoon Stay",
    start: time(18, 0),
    end: time(20, 0),
    backgroundColor: "#d946ef",
  },
  {
    id: "17",
    title: "Room 302 - Family",
    start: time(20, 0),
    end: time(22, 0),
    backgroundColor: "#22c55e",
  },
];
export default function HotelRoomMgmSection() {
  return (
    <div >
      <IlamyCalendar events={bookings} />
    </div>
  );
}
