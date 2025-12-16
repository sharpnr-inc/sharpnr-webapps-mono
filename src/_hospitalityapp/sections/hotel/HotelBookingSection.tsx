import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useFormsModal } from "@/context/FormModalContext";

import EmptyHotelPlaceHolder from "./EmptyHotelComponenet";
import { useRouter } from "@tanstack/react-router";

import { useBookingTerminal } from "@/api_service/queries/HospitalityQueries/Hotel";

import type {
  HotelBookingTerminal_Response,
  RoomResponse,
  FloorResponse,
} from "@/api_service/apis/Hospitality/Hotel";
import { DoorClosedLocked, DoorOpenIcon } from "lucide-react";

const getStatusColor = (status?: string) => {
  switch (status?.toUpperCase()) {
    case "BOOKED":
      return "bg-red-500 text-white";

    case "AVAILABLE":
      return "bg-green-500 text-white";

    case "CLEANING":
    case "ON_CLEANING":
      return "bg-yellow-400 text-black";

    case "MAINTENANCE":
    case "UNDER_MAINTENANCE":
      return "bg-gray-400 text-black";

    case "DISABLED":
      return "bg-black/40 text-white cursor-not-allowed";

    default:
      return "bg-slate-300 text-foreground";
  }
};
export default function HotelBookingSection() {
  const { data, isLoading, isError } = useBookingTerminal();

  const router = useRouter();

  const { showModal } = useFormsModal();

  // Hotel data
  const hotel: HotelBookingTerminal_Response | undefined = data?.data;

  // ---- Click Room Handler ----
  const handleRoom = (room: RoomResponse) => {
    const status = room.status?.toUpperCase();

    if (status === "BOOKED") {
      router.navigate({
        to: "/dashboard/sharp_hospitality/hotel/$roomId",
        params: { roomId: room.room_id },
      });
    } else if (status === "AVAILABLE") {
      router.navigate({
        to: "/dashboard/sharp_hospitality/hotel/booking/$roomId",
        params: { roomId: room.room_id },
      });
    } else {
      showModal(
        "Unavailable",
        "",
        <div>Room is Cleaning or Under Maintenance</div>
      );
    }
  };

  // ---- Loading / Error ----
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-full text-muted-foreground">
        Loading hotel layout...
      </div>
    );

  if (isError || !hotel) return <EmptyHotelPlaceHolder />;

  // ---- UI ----
  return (
    <div className="flex flex-col gap-6 w-full h-full">
      <Card className="shadow-md rounded-xl border border-border">
        <CardHeader className="pb-2"></CardHeader>

        <CardContent className="space-y-4">
          {/* Floors */}
          {hotel.Floors?.length > 0 ? (
            hotel.Floors.map((floor: FloorResponse) => (
              <div
                key={floor.floor_id}
                className="flex flex-col md:flex-row items-start md:items-center gap-4"
              >
                {/* Floor Label */}
                <div className="w-32 text-sm font-semibold text-foreground">
                  Floor {floor.floor_number}
                </div>

                {/* Rooms */}
                <div className="flex flex-wrap gap-2">
                  {floor.rooms?.length > 0 ? (
                    floor.rooms.map((room: RoomResponse) => (
                      <RoomCard
                        key={room.room_id}
                        room={room}
                        onClick={handleRoom}
                      />
                    ))
                  ) : (
                    <span className="text-xs text-muted-foreground italic">
                      No rooms available
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-sm text-muted-foreground italic">
              No floors found in this hotel.
            </div>
          )}

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-3 mt-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 bg-green-500 rounded-sm"></span>{" "}
              Available
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 bg-red-500 rounded-sm"></span> Booked
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 bg-yellow-400 rounded-sm"></span>{" "}
              Cleaning
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 bg-gray-400 rounded-sm"></span>{" "}
              Maintenance
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const RoomCard = ({ room, onClick }: { room: RoomResponse; onClick: any }) => {
  const isDisabled = room.status?.toUpperCase() === "DISABLED";
  const isOccupied = room.status?.toUpperCase() === "BOOKED";

  return (
    <div
      key={room.room_id}
      onClick={() => !isDisabled && onClick(room)}
      title={`${room.room_name} - ₹${room.room_price}`}
      className={[
        "font-semibold transition-transform p-2 rounded-lg h-16 w-18 flex flex-col items-center justify-center gap-1",
        getStatusColor(room.status),
        isDisabled
          ? "cursor-not-allowed opacity-60"
          : "cursor-pointer hover:scale-110",
      ].join(" ")}
    >
      {isOccupied ? <DoorClosedLocked size={18} /> : <DoorOpenIcon size={18} />}
      <span className="text-xs text-center">{room.room_name}</span>
    </div>
  );
};
