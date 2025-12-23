import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircleIcon, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import CreateFloorForm from "../../Restaurant/forms/CreateFloorForm";
import { useDialogModal } from "@/context/DialogModalContext";
import { useHotelQueryOptions } from "@/api_service/queries/HospitalityQueries/Hotel";
import { useForm } from "@tanstack/react-form";
import { Label } from "@/components/ui/label";
import { useMutationCreateRoom } from "@/api_service/mutations/Hospitality/Hotel";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import React from "react";

/*********************************
 * TypeScript Interfaces         *
 *********************************/

interface RoomPrice {
  price: number;
  effectiveFrom: string;
  effectiveTo: string | null;
}

interface CreateRoomForm {
  floorId: string;
  roomName: string;
  bedSize: string;
  amenities: string;
  description: string;
  initialPrice: RoomPrice;
}

/*********************************
 * Helper Functions              *
 *********************************/

// Convert Date to RFC3339 format without milliseconds
const toRFC3339 = (date: Date | undefined): string => {
  if (!date) return "";
  return date.toISOString().split(".")[0] + "Z";
};

/*********************************
 * Component for the Create Room *
 *********************************/

export default function CreateRoomForm() {
  const [effectiveFromDate, setEffectiveFromDate] = React.useState<Date>(
    new Date()
  );
  const [effectiveToDate, setEffectiveToDate] = React.useState<Date>();

  const createRoom = useMutationCreateRoom();
  const { data } = useHotelQueryOptions();
  const { openModal, closeModal } = useDialogModal();

  const handleAddFloor = () => {
    openModal(
      <CreateFloorForm hotel={data?.data?.hotel_id} closeModel={closeModal} />,
      `Add Floor`,
      `Add Floor in Hotel`
    );
  };

  const defaultRoomForm: CreateRoomForm = {
    floorId: "",
    roomName: "",
    bedSize: "",
    amenities: "",
    description: "",
    initialPrice: {
      price: 0,
      effectiveFrom: toRFC3339(new Date()),
      effectiveTo: null,
    },
  };

  const form = useForm({
    defaultValues: defaultRoomForm,
    onSubmit: async ({ value }) => {
      // Clean the payload - remove empty strings for optional date fields
      const payload = {
        ...value,
        initialPrice: {
          ...value.initialPrice,
          effectiveTo: value.initialPrice.effectiveTo || null, // Convert empty string to null
        },
      };
      createRoom.mutate(payload);
    },
  });

  return (
    <div className="p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* LEFT FORM SECTION */}
        <div className="w-full lg:w-3/4">
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            {/* Basic Room Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Room Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* FLOOR SELECTION */}
                <div className="space-y-2">
                  <Label htmlFor="floor">Floor *</Label>
                  <form.Field name="floorId">
                    {(field) => (
                      <Select
                        onValueChange={(value) => field.handleChange(value)}
                        value={field.state.value}
                      >
                        <SelectTrigger id="floor">
                          <SelectValue placeholder="Select a floor" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {data?.data?.floors?.map((f) => (
                              <SelectItem key={f.floor_id} value={f.floor_id}>
                                Floor {f.floor_number}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  </form.Field>
                </div>

                {/* ROOM NAME + BED SIZE */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="roomName">Room Name / Number *</Label>
                    <form.Field name="roomName">
                      {(field) => (
                        <Input
                          id="roomName"
                          placeholder="e.g., G01, Suite 101"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      )}
                    </form.Field>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bedSize">Bed Type *</Label>
                    <form.Field name="bedSize">
                      {(field) => (
                        <Select
                          onValueChange={(value) => field.handleChange(value)}
                          value={field.state.value}
                        >
                          <SelectTrigger id="bedSize">
                            <SelectValue placeholder="Select bed size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="single">Single Bed</SelectItem>
                              <SelectItem value="double">Double Bed</SelectItem>
                              <SelectItem value="queen">Queen Bed</SelectItem>
                              <SelectItem value="king">King Bed</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    </form.Field>
                  </div>
                </div>

                {/* DESCRIPTION */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <form.Field name="description">
                    {(field) => (
                      <Textarea
                        id="description"
                        placeholder="Brief description of the room features and layout"
                        rows={4}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    )}
                  </form.Field>
                </div>
              </CardContent>
            </Card>

            {/* Pricing Information */}
            <Card>
              <CardHeader>
                <CardTitle>Pricing Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* ROOM PRICE */}
                  <div className="space-y-2">
                    <Label htmlFor="price">Room Price (₹) *</Label>
                    <form.Field name="initialPrice.price">
                      {(field) => (
                        <Input
                          id="price"
                          type="number"
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                          value={field.state.value || ""}
                          onChange={(e) =>
                            field.handleChange(Number(e.target.value))
                          }
                        />
                      )}
                    </form.Field>
                  </div>

                  {/* EFFECTIVE FROM */}
                  <div className="space-y-2">
                    <Label>Effective From *</Label>
                    <form.Field name="initialPrice.effectiveFrom">
                      {(field) => (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              <Calendar className="mr-2 h-4 w-4" />
                              {effectiveFromDate ? (
                                format(effectiveFromDate, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent
                              mode="single"
                              selected={effectiveFromDate}
                              onSelect={(date) => {
                                if (date) {
                                  setEffectiveFromDate(date);
                                  field.handleChange(toRFC3339(date));
                                }
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      )}
                    </form.Field>
                  </div>

                  {/* EFFECTIVE TO */}
                  <div className="space-y-2">
                    <Label>Effective To (Optional)</Label>
                    <form.Field name="initialPrice.effectiveTo">
                      {(field) => (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              <Calendar className="mr-2 h-4 w-4" />
                              {effectiveToDate ? (
                                format(effectiveToDate, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent
                              mode="single"
                              selected={effectiveToDate}
                              onSelect={(date) => {
                                setEffectiveToDate(date);
                                field.handleChange(toRFC3339(date));
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      )}
                    </form.Field>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardHeader>
                <CardTitle>Room Amenities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Double Bed</Badge>
                  <Badge variant="secondary">AC</Badge>
                  <Badge variant="secondary">TV</Badge>
                  <Badge variant="secondary">Wi-Fi</Badge>
                  <Badge variant="secondary">Mini Fridge</Badge>
                  <Badge variant="secondary">Balcony</Badge>
                  <Badge variant="secondary">Bathroom</Badge>
                  <Badge variant="secondary">Room Service</Badge>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amenities">Additional Amenities</Label>
                  <form.Field name="amenities">
                    {(field) => (
                      <Textarea
                        id="amenities"
                        placeholder="Add custom amenities (comma separated)"
                        rows={3}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    )}
                  </form.Field>
                </div>
              </CardContent>
            </Card>

            {/* ACTION BUTTONS */}
            <div className="flex gap-3">
              <Button type="submit" size="lg">
                <PlusCircleIcon className="mr-2 h-4 w-4" />
                Create Room
              </Button>
              <Button type="button" variant="outline" size="lg">
                Cancel
              </Button>
            </div>
          </form>
        </div>

        {/* RIGHT SIDE ACTIONS */}
        <div className="w-full lg:w-1/4">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={handleAddFloor}
              >
                <PlusCircleIcon className="mr-2 h-4 w-4" />
                Add Floor
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <PlusCircleIcon className="mr-2 h-4 w-4" />
                Add Amenities
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <PlusCircleIcon className="mr-2 h-4 w-4" />
                Add Room Addon
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
