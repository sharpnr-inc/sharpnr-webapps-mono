"use client";
import { Button } from "@/components/ui/button";
import { useForm } from "@tanstack/react-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import React from "react";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import CustomerSearch from "@/_hospitalityapp/components/hotels/SearchCustomer";

/***************************************
 * Component for Creating Room Booking *
 ***************************************/
export default function AddBookingForm() {
  const [date, setDate] = React.useState<Date>();

  // Tanstack form
  const form = useForm({
    defaultValues: {
      room_id: "",
      primary_guestId: "",
      checkin_date: "",
      checkout_date: "",

      guest_list: [
        {
          guest_name: "",
          guest_email: "",
          guest_mobile: "",
        },
      ],
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  return (
    <div className="w-full mx-auto p-4 flex flex-col gap-4">
      <CardContent className="flex item-start">
        <Button>Back</Button>
      </CardContent>
      <Card>
        <CardHeader>
          <CardTitle>Booking For Room #G01</CardTitle>
          <CardDescription>Room Details</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-8"
          >
            {/* Booking Dates */}
            <div className="space-y-6 p-4">
              <CustomerSearch/>
              <div className="space-y-1">
                <h2 className="text-xl font-semibold tracking-tight">
                  Booking Dates
                </h2>
                <p className="text-sm text-muted-foreground">
                  Select your check-in and check-out dates
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <form.Field name="checkin_date">
                  {(field) => (
                    <div className="space-y-3">
                      <label
                        htmlFor="from_date"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Check-in Date
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            data-empty={!date}
                            className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal h-11 px-4"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? (
                              format(date, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  )}
                </form.Field>

                <form.Field name="checkout_date">
                  {(field) => (
                    <div className="space-y-3">
                      <label
                        htmlFor="to_date"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Check-out Date
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            data-empty={!date}
                            className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal h-11 px-4"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? (
                              format(date, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  )}
                </form.Field>
              </div>
            </div>
     

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button type="submit" className="w-full sm:w-auto">
                Submit Booking
              </Button>
              <Button
                variant="outline"
                type="button"
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
