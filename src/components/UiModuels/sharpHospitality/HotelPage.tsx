import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HotelBookingSection from "@/components/hospitality_module/hotel/HotelBookingSection";
import HotelOverviewSection from "@/components/hospitality_module/hotel/HotelOverviewSection";
import HotelRequestSection from "@/components/hospitality_module/hotel/HotelRequestSection";
import HotelRoomMgmSection from "@/components/hospitality_module/hotel/HotelRoomMgmSection";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function SharpHospitalityHotelPage() {
  const [activeTab, setActiveTab] = React.useState("overview");

  const handleSelect = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div>
      <div className="p-2 border-b-2">
        <div className="text-3xl font-semibold">Hotel</div>
        <p className="">THis is Hotel Page</p>
      </div>{" "}
      <div className="mt-2">
        {/* Tabs Section */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
     
            <TabsList className="w-max hidden xl:flex p-1 space-x-2 max-w-full">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="booking">Bookings</TabsTrigger>
              <TabsTrigger value="request">Request</TabsTrigger>
              <TabsTrigger value="rooms_config">Room Management</TabsTrigger>
            </TabsList>

           <div className="xl:hidden mb-4">
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full capitalize">
                {activeTab.replaceAll("_", " ")}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Settings Sections</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => handleSelect("overview")}>
                Overview
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => handleSelect("booking")}>
                Bookings
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => handleSelect("request")}>
                Request
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => handleSelect("rooms_config")}>
                Room Configuration
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

            </div> 


          <TabsContent value="overview">
            <HotelOverviewSection />
          </TabsContent>

          <TabsContent value="booking">
            <HotelBookingSection />
          </TabsContent>

          <TabsContent value="request">
            <HotelRequestSection />
          </TabsContent>

          <TabsContent value="rooms_config">
            <HotelRoomMgmSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
