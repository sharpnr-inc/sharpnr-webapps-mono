import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSheet } from "@/context/DrawerContext";
import { useFormsModal } from "@/context/FormModalContext";
import { hotel_layout } from "@/dummy_data/hotel_rooms";
import AddBookingForm from "../forms/AddBookingForm";
import BookedRoomDetailsTable from "../dataTables/BookedRoomDetailsTable";

export default function HotelBookingSection() {
  const { openSheet } = useSheet();
  const { showModal } = useFormsModal();

  function HandleRoomDetails({ room }: { room: any }) {
    return <BookedRoomDetailsTable room={room} />;
  }

  function HandleAddBooking({ room }: { room: any }) {
    return <AddBookingForm room={room} />;
  }

  const handleRoom = (room: any) => {
    if (room.status === "Booked") {
      openSheet(<HandleRoomDetails room={room} />, "", "", "3/4");
    } else if (room.status === "Available") {
      showModal(
        `Book Room ${room.room_name}`,
        "Book this Room for Customer",
        <HandleAddBooking room={room} />
      );
    } else {
      showModal("", "", <div>Room is Cleaning</div>);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Booked":
        return "bg-red-500";
      case "Available":
        return "bg-green-500";
      case "Cleaning":
        return "bg-yellow-400";
      case "Maintenance":
        return "bg-gray-400";
      default:
        return "bg-slate-300";
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full h-full">
      {/* --- Unified Floor Layout Card --- */}
      <Card className="shadow-md rounded-xl border border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-primary">
            Hotel Floor Layout
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {hotel_layout.map((floor) => (
            <div
              key={floor.flor_id}
              className="flex flex-col md:flex-row  items-center gap-4"
            >
              {/* Floor Name */}
              <div className="w-32 text-sm font-semibold text-foreground">
                {floor.flor_name}
              </div>

              {/* Floor Rooms */}
              <div className="flex flex-wrap gap-2">
                {floor.floor_layout.map((room) => (
                  <Button
                    onClick={() => handleRoom(room)}
                    key={room.room_id}
                    title={`${room.room_name} - ${room.status} - ₹${room.price}`}
                    className={` cursor-pointer font-semibold ${getStatusColor(
                      room.status
                    )} hover:scale-110 transition-transform`}
                  >
                    #{room.room_name}
                  </Button>
                ))}
              </div>
            </div>
          ))}

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-3 mt-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 bg-green-500 rounded-sm"></span>
              Available
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 bg-red-500 rounded-sm"></span>
              Booked
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 bg-yellow-400 rounded-sm"></span>
              Cleaning
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 bg-gray-400 rounded-sm"></span>
              Maintenance
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
