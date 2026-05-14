import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HardHat, CalendarDays, Users, Clock } from "lucide-react";

interface RestaurantReservationPageProps {}

const RestaurantReservationPage: React.FC<
  RestaurantReservationPageProps
> = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="relative p-6 text-black">
      {/* 1. UNDER DEVELOPMENT OVERLAY */}
      <div className=" absolute inset-0 z-50 flex flex-col items-center justify-center bg-transparent/40 backdrop-blur-sm border-4 border-dashed border-yellow-200 m-4">
        <div className="bg-black text-white p-8 text-center max-w-md">
          <HardHat className="w-12 h-12 mx-auto mb-4" />
          <h1 className="text-2xl font-black uppercase mb-2">
            Under Development
          </h1>
          <p className="text-sm border-t border-white/30 pt-4 opacity-80">
            The Reservation engine is currently being integrated with the this is the testing
            <strong> Kitchen</strong> and <strong>Bar</strong> modules.
          </p>
        </div>
      </div>

      {/* 2. PAGE CONTENT (VISIBLE BUT DISABLED) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-40 pointer-events-none">
        {/* Left Column: Date & Time Selection */}
        <div className="space-y-6">
          <Card className="border-2 border-black">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 uppercase text-sm font-bold">
                <CalendarDays className="h-4 w-4" /> 1. Select Date
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border border-black w-full"
              />
            </CardContent>
          </Card>

          <Card className="border-2 border-black">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 uppercase text-sm font-bold">
                <Clock className="h-4 w-4" /> 2. Select Time
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-2">
              {["18:00", "19:00", "20:00", "21:00", "22:00"].map((time) => (
                <Button
                  key={time}
                  variant="outline"
                  className="border-black font-mono"
                >
                  {time}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Guest Details & Table Assignment */}
        <div className="md:col-span-2">
          <Card className="border-2 border-black h-full">
            <CardHeader className="border-b border-black">
              <CardTitle className="uppercase font-black">
                Booking Details
              </CardTitle>
              <CardDescription className="text-black">
                Assign guest information and table placement.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="guest-name">Guest Name</Label>
                  <Input
                    id="guest-name"
                    placeholder="Full Name"
                    className="border-black"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="+00 000 000"
                    className="border-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Users className="h-4 w-4" /> Party Size
                  </Label>
                  <Select>
                    <SelectTrigger className="border-black">
                      <SelectValue placeholder="Select count" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 People</SelectItem>
                      <SelectItem value="4">4 People</SelectItem>
                      <SelectItem value="6">6+ People</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Table Preference</Label>
                  <Select>
                    <SelectTrigger className="border-black">
                      <SelectValue placeholder="Select Zone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="window">Window Side</SelectItem>
                      <SelectItem value="bar">Near Bar</SelectItem>
                      <SelectItem value="outdoor">Outdoor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="pt-6">
                <Button className="w-full bg-black text-white hover:bg-black/90 h-12 uppercase font-bold tracking-widest">
                  Confirm Reservation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RestaurantReservationPage;
