import { ArrowUpRightIcon, PlusCircle, EditIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import CreateRoomForm from "./forms/CreateRoomForm";
import { useFormsModal } from "@/context/FormModalContext";
import { hotel_layout } from "@/dummy_data/hotel_rooms";
import { useSheet } from "@/context/DrawerContext";

export default function HotelConfigSection() {
  const { showModal } = useFormsModal();
  const { openSheet } = useSheet();

  const handleAddRoom = () => {
    showModal("Add Room", "Add the layout for the Room", <CreateRoomForm />);
  };

  function HandleRoomDetails({ room }: { room: any }) {
    return (
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">{room.room_name}</h2>
        <p>Price: ₹{room.price}</p>
        <p>Status: {room.status}</p>
        {room.guest_name && <p>Guest: {room.guest_name}</p>}
        <div className="flex flex-wrap gap-2">
          {room.ameneties.beds && (
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
              Beds: {room.ameneties.beds}
            </span>
          )}
          {room.ameneties.ac && (
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
              AC
            </span>
          )}
          {room.ameneties.tv && (
            <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
              TV
            </span>
          )}
          {room.ameneties.fridge && (
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
              Fridge
            </span>
          )}
          {room.ameneties.balcony && (
            <span className="px-2 py-1 bg-pink-100 text-pink-800 rounded-full text-xs font-medium">
              Balcony
            </span>
          )}
          {room.ameneties.wifi && (
            <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium">
              WiFi
            </span>
          )}
        </div>
      </div>
    );
  }

  //   const sendRoomDetailsToHook = (room: any) => {
  //     showModal(
  //       "This is Room",
  //       "Edit Rooms Details",
  //       <HandleRoomDetails room={room} />
  //     );
  //   };

  const handleRoomClick = (room: any) => {
    openSheet(
      <HandleRoomDetails room={room} />,
      `Room: ${room.room_name}`,
      "View or edit room details",
      "3/4"
    );
  };

  if (!hotel_layout || hotel_layout.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ArrowUpRightIcon />
          </EmptyMedia>
          <EmptyTitle>No Room Configuration</EmptyTitle>
          <EmptyDescription>
            You haven&apos;t configured any hotel rooms yet. Start by adding a
            new room.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button onClick={handleAddRoom}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Room
          </Button>
        </EmptyContent>
      </Empty>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {hotel_layout.map((floor) => (
        <div key={floor.flor_id} className="border p-4 rounded-lg">
          <div className="flex justify-between">
            <h2 className=" font-semibold mb-3">{floor.flor_name}</h2>
            <Button onClick={handleAddRoom}> <PlusCircle className="mr-2 h-4 w-4" />Add Rooms</Button>
          </div>
          <div className="sm:grid md:inline-flex gap-2">
            {floor.floor_layout.map((room) => (
              <Button
                onClick={() => handleRoomClick(room)}
                key={room.room_id}
                className="border shadow-sm"
              >
                Room #{room.room_name}
                <EditIcon />
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
