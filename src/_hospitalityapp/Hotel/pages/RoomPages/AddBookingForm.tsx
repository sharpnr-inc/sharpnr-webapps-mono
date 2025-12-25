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
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import React, { useState } from "react";
import { format } from "date-fns";
import CustomerSearch from "@/_hospitalityapp/Hotel/components/SearchCustomer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutationCreateRoomBooking } from "@/_hospitalityapp/Hotel/apis/mutations/Hotel";

interface BookingGuest {
  guestName: string;
  guestEmail: string;
  guestMobile: string;
}

interface RoomBookingForm {
  roomId: string;
  primaryGuestId: string;
  checkinDate: string;
  checkoutDate: string;
  bookingDate: string;
  bookingGuests: Array<BookingGuest>;
}



/***************************************
 * Component for Creating Room Booking *
 ***************************************/
export default function AddBookingForm({roomId}:any) {
  const [checkinDate, setCheckinDate] = React.useState<Date>();
  const [checkoutDate, setCheckoutDate] = React.useState<Date>();
  const [prgId, setPrgId]= useState("")

  const createBooking = useMutationCreateRoomBooking()

  const defaultBookingForm: RoomBookingForm = {
  roomId: roomId,
  primaryGuestId: prgId,
  checkinDate: "",
  checkoutDate: "",
  bookingDate: new Date().toISOString(),
  bookingGuests: [],
};

  // Tanstack form
  const form = useForm({
    defaultValues: defaultBookingForm,
   onSubmit: async ({ value }) => {
    const bookingData = {
      ...value,
      bookingDate: new Date().toISOString(), // Set booking date at submit time
    };
    createBooking.mutateAsync(value)
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
            {/* Customer Search */}
            <div className="space-y-3">
              <h2 className="text-xl font-semibold tracking-tight">
                Primary Guest
              </h2>
              <CustomerSearch setguestId={setPrgId}/>
            </div>

            {/* Booking Dates */}
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold tracking-tight">
                  Booking Dates
                </h2>
                <p className="text-sm text-muted-foreground">
                  Select your check-in and check-out dates
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <form.Field name="checkinDate">
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
                            data-empty={!checkinDate}
                            className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal h-11 px-4"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {checkinDate ? (
                              format(checkinDate, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={checkinDate}
                            onSelect={(date) => {
                              setCheckinDate(date);
                              field.handleChange(date?.toISOString() || "");
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  )}
                </form.Field>

                <form.Field name="checkoutDate">
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
                            data-empty={!checkoutDate}
                            className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal h-11 px-4"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {checkoutDate ? (
                              format(checkoutDate, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={checkoutDate}
                            onSelect={(date) => {
                              setCheckoutDate(date);
                              field.handleChange(date?.toISOString() || "");
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  )}
                </form.Field>
              </div>
            </div>

            {/* Extra Guests Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="text-xl font-semibold tracking-tight">
                    Extra Guests
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Add additional guests for this booking
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const currentGuests = form.getFieldValue("bookingGuests");
                    form.setFieldValue("bookingGuests", [
                      ...currentGuests,
                      {
                        guestName: "",
                        guestEmail: "",
                        guestMobile: "",
                      },
                    ]);
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Extra Guest
                </Button>
              </div>

              <form.Field name="bookingGuests" mode="array">
                {(field) => (
                  <div className="space-y-4">
                    {field.state.value.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
                        <p>No extra guests added yet</p>
                        <p className="text-sm">
                          Click "Add Extra Guest" to add more guests
                        </p>
                      </div>
                    ) : (
                      field.state.value.map((_, index) => (
                        <Card key={index}>
                          <CardContent className="pt-6">
                            <div className="space-y-4">
                              <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-semibold">
                                  Guest {index + 1}
                                </h3>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    const currentGuests =
                                      form.getFieldValue("bookingGuests");
                                    form.setFieldValue(
                                      "bookingGuests",
                                      currentGuests.filter((_, i) => i !== index)
                                    );
                                  }}
                                >
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <form.Field
                                  name={`bookingGuests[${index}].guestName`}
                                >
                                  {(subField) => (
                                    <div className="space-y-2">
                                      <Label htmlFor={`guest-name-${index}`}>
                                        Guest Name
                                      </Label>
                                      <Input
                                        id={`guest-name-${index}`}
                                        placeholder="Enter guest name"
                                        value={subField.state.value}
                                        onChange={(e) =>
                                          subField.handleChange(e.target.value)
                                        }
                                      />
                                    </div>
                                  )}
                                </form.Field>

                                <form.Field
                                  name={`bookingGuests[${index}].guestEmail`}
                                >
                                  {(subField) => (
                                    <div className="space-y-2">
                                      <Label htmlFor={`guest-email-${index}`}>
                                        Email
                                      </Label>
                                      <Input
                                        id={`guest-email-${index}`}
                                        type="email"
                                        placeholder="guest@example.com"
                                        value={subField.state.value}
                                        onChange={(e) =>
                                          subField.handleChange(e.target.value)
                                        }
                                      />
                                    </div>
                                  )}
                                </form.Field>

                                <form.Field
                                  name={`bookingGuests[${index}].guestMobile`}
                                >
                                  {(subField) => (
                                    <div className="space-y-2">
                                      <Label htmlFor={`guest-mobile-${index}`}>
                                        Mobile Number
                                      </Label>
                                      <Input
                                        id={`guest-mobile-${index}`}
                                        type="tel"
                                        placeholder="+1234567890"
                                        value={subField.state.value}
                                        onChange={(e) =>
                                          subField.handleChange(e.target.value)
                                        }
                                      />
                                    </div>
                                  )}
                                </form.Field>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                )}
              </form.Field>
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
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