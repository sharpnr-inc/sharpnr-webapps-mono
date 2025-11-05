import { ArrowUpRightIcon, PlusCircle } from "lucide-react";
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
import { Separator } from "@/components/ui/separator";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useState } from "react";

export default function HotelConfigSection() {
  const [showTabs, setShowTabs] = useState(false);
  const { showModal } = useFormsModal();
  const { openSheet } = useSheet();

  const handleAddRoom = () => {
    showModal("Add Room", "Add the layout for the Room", <CreateRoomForm />);
  };

  const handleToggleTabs = () => {
    setShowTabs((prev) => !prev);
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
    <div className="flex flex-col gap-4">
      <Card className="border-2 rounded-2xl shadow-sm">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold">Add Room</CardTitle>
          <CardDescription>Add Room, Floors, Amenities</CardDescription>
          <Button
            variant={showTabs ? "destructive" : "default"}
            onClick={handleToggleTabs}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            {showTabs ? "Cancel" : "Add Room"}
          </Button>
        </CardHeader>

        <Separator/>

        {showTabs && <CreateRoomForm />}
      </Card>

      <Tabs defaultValue="f">
        <TabsList>
          <TabsTrigger value="f">Floors</TabsTrigger>
          <TabsTrigger value="r">Rooms</TabsTrigger>
          <TabsTrigger value="a">Amenities</TabsTrigger>
        </TabsList>
        <TabsContent value="f"></TabsContent>

        <TabsContent value="r"></TabsContent>
        <TabsContent value="r"></TabsContent>
      </Tabs>
    </div>
  );
}
