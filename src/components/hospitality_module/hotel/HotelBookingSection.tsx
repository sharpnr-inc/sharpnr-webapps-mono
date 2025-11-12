import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSheet } from "@/context/DrawerContext";
import { useFormsModal } from "@/context/FormModalContext";
import AddBookingForm from "../forms/AddBookingForm";
import BookedRoomDetailsTable from "../dataTables/BookedRoomDetailsTable";
import EmptyHotelPlaceHolder from "./EmptyHotelComponenet";
import {
  useBookingOfHotels,
  useHotelQueryOptions,
} from "@/api_service/queries/HospitalityQueries/Hotel";
import { useQuery } from "@tanstack/react-query";

export default function HotelBookingSection() {
  // Fetch hotel data and booking data
  const { data, isLoading, isError } = useQuery(useHotelQueryOptions());
  const bookingQuery = useQuery(useBookingOfHotels());
  const { openSheet } = useSheet();
  const { showModal } = useFormsModal();
  const [isData, setIsData] = useState(false);

  // ✅ Room Details Component (Sheet)
  function HandleRoomDetails({ room }: { room: any }) {
    return <BookedRoomDetailsTable room={room} />;
  }

  // ✅ Add Booking Form Component (Modal)
  function HandleAddBooking({ room }: { room: any }) {
    return <AddBookingForm room={room} />;
  }

  // ✅ Room Click Logic
  const handleRoom = (room: any) => {
    const status = room.status?.toUpperCase();
    if (status === "BOOKED") {
      openSheet(<HandleRoomDetails room={room} />, "", "", "3/4");
    } else if (status === "AVAILABLE") {
      showModal(
        `Book Room ${room.room_name}`,
        "Book this room for a customer",
        <HandleAddBooking room={room} />
      );
    } else {
      showModal("Unavailable", "", <div>Room is Cleaning or Under Maintenance</div>);
    }
  };

  // ✅ Button color logic
  const getStatusColor = (status: string | undefined) => {
    switch (status?.toUpperCase()) {
      case "BOOKED":
        return "bg-red-500 text-white";
      case "AVAILABLE":
        return "bg-green-500 text-white";
      case "ON_CLEANING":
      case "CLEANING":
        return "bg-yellow-400 text-black";
      case "UNDER_MAINTENANCE":
      case "MAINTENANCE":
        return "bg-gray-400 text-black";
      default:
        return "bg-slate-300 text-foreground";
    }
  };

  // ✅ Loading / Error Handling
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full text-muted-foreground">
        Loading hotel layout...
      </div>
    );
  }

  if (isError || !data?.data) {
    return <EmptyHotelPlaceHolder />;
  }

  const hotel = data.data;

  // ✅ Render Hotel Layout
  return (
    <>
      {!isData ? (
        <div className="flex flex-col gap-6 w-full h-full">
          <Card className="shadow-md rounded-xl border border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-primary">
                {hotel.hotel_name || "Hotel Floor Layout"}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {hotel.floors?.length ? (
                hotel.floors.map((floor: any) => (
                  <div
                    key={floor.floor_id}
                    className="flex flex-col md:flex-row items-start md:items-center gap-4"
                  >
                    {/* Floor Info */}
                    <div className="w-32 text-sm font-semibold text-foreground">
                      Floor {floor.floor_number}
                    </div>

                    {/* Floor Rooms */}
                    <div className="flex flex-wrap gap-2">
                      {floor.rooms?.length ? (
                        floor.rooms.map((room: any) => (
                          <Button
                            key={room.room_id}
                            onClick={() => handleRoom(room)}
                            title={`${room.room_name} - ₹${room.room_price}`}
                            className={`cursor-pointer font-semibold ${getStatusColor(
                              room.status
                            )} hover:scale-110 transition-transform`}
                          >
                            #{room.room_name}
                          </Button>
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
                  <span className="w-3 h-3 bg-green-500 rounded-sm"></span> Available
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-red-500 rounded-sm"></span> Booked
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-yellow-400 rounded-sm"></span> Cleaning
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-gray-400 rounded-sm"></span> Maintenance
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <EmptyHotelPlaceHolder />
      )}
    </>
  );
}
