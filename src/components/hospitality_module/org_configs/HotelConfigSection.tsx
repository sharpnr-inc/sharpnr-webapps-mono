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
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useState } from "react";
import { useHotelQueryOptions } from "@/api_service/queries/HospitalityQueries/Hotel";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

export default function HotelConfigSection() {
  const queryOptions = useHotelQueryOptions();
  const { data, isLoading, isError } = useQuery(queryOptions);
  const [showTabs, setShowTabs] = useState(false);
  const { showModal } = useFormsModal();
  const { openSheet } = useSheet();

  const handleAddRoom = () => {
    showModal("Add Room", "Add the layout for the Room", <CreateRoomForm />);
  };

  const handleToggleTabs = () => {
    setShowTabs((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-2">
      <Card className="border-2 rounded-2xl shadow-sm relative">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-semibold">Add Room</CardTitle>
          <CardDescription>
            Add amenities for this room on the selected floor.
          </CardDescription>
        </CardHeader>

        {/* Button in top-right corner */}
        <Button
          variant={showTabs ? "destructive" : "default"}
          onClick={handleToggleTabs}
          className="absolute top-4 right-4"
          size="sm"
        >
          <PlusCircle className="mr-1 h-4 w-4" />
          {showTabs ? "Cancel" : "Add Room"}
        </Button>

        {showTabs && (
          <>
            <Separator />
            <div className="p-6">
              <CreateRoomForm />
            </div>
          </>
        )}
      </Card>

      <Card className="rounded-2xl shadow-sm border">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-semibold">
            General Details
          </CardTitle>
          <CardDescription>
            Configure the general details and information of the hotel.
          </CardDescription>
        </CardHeader>

        {/* --- Opening & Closing Timings --- */}
        <CardContent className="py-4 space-y-4">
          <div className="font-medium text-sm text-muted-foreground">
            Operating Timings
          </div>

          <div className="flex flex-wrap gap-4">
            <Input placeholder="Opening Time" className="max-w-[200px]" />
            <Input placeholder="Closing Time" className="max-w-[200px]" />
          </div>

          <Button className="w-fit">Save Timings</Button>
        </CardContent>

        <Separator />

        {/* --- Hotel Naming Details --- */}
        <CardContent className="py-4 space-y-4">
          <div className="font-medium text-sm text-muted-foreground">
            Hotel Naming Details
          </div>

          <div className="flex flex-wrap gap-4">
            <Input placeholder="Display Name" className="max-w-[280px]" />
            <Input placeholder="Legal Name" className="max-w-[280px]" />
          </div>
        </CardContent>

        <Separator />

        {/* --- Registration IDs --- */}
        <CardContent className="py-4 space-y-4">
          <div className="font-medium text-sm text-muted-foreground">
            Regulatory & Registration IDs
          </div>

          <div className="flex flex-wrap gap-4">
            <Input placeholder="GST Number" className="max-w-[240px]" />
            <Input placeholder="CIN Number" className="max-w-[240px]" />
            <Input placeholder="FSSAI Number" className="max-w-[240px]" />
          </div>
        </CardContent>

        <Separator />

        {/* --- Contact Details --- */}
        <CardContent className="py-4 space-y-4">
          <div className="font-medium text-sm text-muted-foreground">
            Contact Details
          </div>

          <div className="flex flex-wrap gap-4">
            <Input placeholder="Front Desk Number" className="max-w-[240px]" />
            <Input placeholder="Contact Number" className="max-w-[240px]" />
            <Input placeholder="Manager Name" className="max-w-[240px]" />
          </div>
        </CardContent>

        <Separator />

        {/* --- Kitchen Details --- */}
        <CardContent className="py-4 space-y-4">
          <div className="font-medium text-sm text-muted-foreground">
            Kitchen
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Input placeholder="Kitchen ID" className="max-w-[240px]" />

            <div className="flex items-center justify-between gap-3 px-4 py-3 border rounded-2xl shadow-sm bg-muted/30">
              <div>
                <p className="font-medium">Kitchen Status</p>
                <p className="text-xs text-muted-foreground">
                  Enable or disable this kitchen
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </CardContent>

        <Separator />

        {/* --- Address --- */}
        <CardContent className="py-4 space-y-4">
          <div className="font-medium text-sm text-muted-foreground">
            Hotel Address Details
          </div>

          <Textarea placeholder="Address" className="min-h-[80px]" />

          <div className="flex flex-wrap gap-4">
            <Input placeholder="Country" className="max-w-[200px]" />
            <Input placeholder="State" className="max-w-[200px]" />
            <Input placeholder="City" className="max-w-[200px]" />
            <Input placeholder="Pincode" className="max-w-[200px]" />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="f">
        <TabsList>
          <TabsTrigger value="f">Floors</TabsTrigger>
          <TabsTrigger value="r">Rooms</TabsTrigger>
          <TabsTrigger value="a">Amenities</TabsTrigger>
        </TabsList>
        <TabsContent value="f">
          <div className="space-y-6">
            {data?.data?.floors?.map((floor: any) => (
              <div
                key={floor.floor_id}
                className="border p-4 rounded-2xl space-y-4 bg-muted/30"
              >
                {/* Floor Header */}
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">
                    Floor {floor.floor_number}
                  </h2>
                  {floor.floor_name && (
                    <span className="text-sm text-muted-foreground">
                      {floor.floor_name}
                    </span>
                  )}
                </div>

                {/* Rooms Grid */}
                {floor.rooms?.length ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {floor.rooms.map((room: any) => (
                      <Card
                        key={room.room_id}
                        className="hover:shadow-lg transition-shadow cursor-pointer"
                      >
                        <CardHeader>
                          <CardTitle className="text-base font-medium">
                            Room {room.room_name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                          <p>
                            <span className="font-medium">Price:</span> ₹
                            {room.room_price}
                          </p>
                          {room.description ? (
                            <p className="text-muted-foreground">
                              {room.description}
                            </p>
                          ) : (
                            <p className="text-muted-foreground italic">
                              No description
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    No rooms on this floor yet.
                  </p>
                )}
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="r">
          <div>Here we display the Rooms</div>
        </TabsContent>
        <TabsContent value="a">
          <div>Here we display the Amenities List</div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
