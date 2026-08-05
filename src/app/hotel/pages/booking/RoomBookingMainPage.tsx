import { Route } from "@/routes/workspace/_user/hotel/$hotelID/booking/index";
import { useHotelLayout } from "../../apis/queries";
import { IndianRupee } from "lucide-react";
import { cn } from "@/lib/utils";

/* ================================
   Types
================================ */
type RoomStatus =
  | "available"
  | "occupied"
  | "reserved"
  | "cleaning"
  | "out_of_service";

interface StatusConfig {
  label: string;
  cardClass: string;
  dotColor: string;
}

/* ================================
   Status Configuration
================================ */
const statusConfig: { [K in RoomStatus]: StatusConfig } = {
  available: {
    label: "Available",
    cardClass:
      "border-emerald-200 bg-green-200 hover:bg-emerald-100 hover:border-emerald-300",
    dotColor: "bg-emerald-500",
  },
  occupied: {
    label: "Occupied",
    cardClass: "border-red-200 bg-red-50 hover:bg-red-100 hover:border-red-300",
    dotColor: "bg-red-500",
  },
  reserved: {
    label: "Reserved",
    cardClass:
      "border-amber-200 bg-amber-50 hover:bg-amber-100 hover:border-amber-300",
    dotColor: "bg-amber-500",
  },
  cleaning: {
    label: "Cleaning",
    cardClass: "border-sky-200 bg-sky-50 hover:bg-sky-100 hover:border-sky-300",
    dotColor: "bg-sky-500",
  },
  out_of_service: {
    label: "Out of Service",
    cardClass:
      "border-zinc-200 bg-zinc-50 hover:bg-zinc-100 hover:border-zinc-300",
    dotColor: "bg-zinc-400",
  },
};

/* ================================
   Helper
================================ */
function normalizeStatus(status: string): RoomStatus {
  return status.toLowerCase() as RoomStatus;
}

/* ================================
   Page Component
================================ */
export default function RoomBookingPage() {
  const { hotelID } = Route.useParams();
  const { data: hotelLayout } = useHotelLayout(hotelID);

  const layout = hotelLayout?.data?.Layout ?? [];

  if (!layout.length) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-muted-foreground">No rooms available</p>
      </div>
    );
  }

  return (
    <div className="space-y-2 p-2">
      {/* Legend */}
      <div className="flex flex-wrap items-center gap-3 pb-3 border-b ">
        <span className="text-xs font-medium text-muted-foreground">
          Status:
        </span>
        {Object.entries(statusConfig).map(([status, config]) => (
          <div key={status} className="flex items-center gap-1.5">
            <div className={cn("h-2 w-2 rounded-full", config.dotColor)} />
            <span className="text-xs">{config.label}</span>
          </div>
        ))}
      </div>

      {layout.map((floor: any) => {
        const rooms = floor.Rooms ?? [];

        return (
          <section key={floor.FloorID} className="space-y-3 text-gray-900">
            {/* Floor Header */}
            <div className="flex items-center gap-3">
              <h2 className="text-base font-semibold">{floor.FloorName}</h2>
              <span className="text-xs text-muted-foreground">
                ({rooms.length} rooms)
              </span>
            </div>

            {/* Compact Rooms Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 2xl:grid-cols-12 gap-2">
              {rooms.map((room: any) => {
                const status = normalizeStatus(room.Status);
                const config = statusConfig[status];

                return (
                  <button
                    key={room.RoomID}
                    className={cn(
                      "relative border rounded-md p-2 transition-all duration-150 hover:shadow-sm hover:-translate-y-0.5 text-left",
                      config.cardClass,
                    )}
                  >
                    {/* Status Dot */}
                    <div
                      className={cn(
                        "absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full",
                        config.dotColor,
                      )}
                    />

                    {/* Room Code */}
                    <div className="text-xs font-bold mb-1 pr-3">
                      {room.RoomName}
                    </div>

                    {/* Room Name */}
                    <div className="text-[10px] leading-tight mb-1.5 line-clamp-1 opacity-80">
                      {room.Code}
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-0.5 text-[10px] font-semibold">
                      <IndianRupee className="h-2.5 w-2.5" />
                      {room.Price?.toLocaleString("en-IN")}
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
