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
import { ImageIcon, PlusCircleIcon, X } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import CreateFloorForm from "./CreateFloorForm";
import { useDialogModal } from "@/context/DialogModalContext";
import { useHotelQueryOptions } from "@/api_service/queries/HospitalityQueries/Hotel";
import { useForm } from "@tanstack/react-form";
import { mutateRoomInFloor } from "@/api_service/mutations/Hospitality/HotelsMutations";
import { Label } from "@/components/ui/label";

export default function CreateRoomForm() {
  const { data, isLoading, isError } = useHotelQueryOptions();
  console.log(data);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const { openModal } = useDialogModal();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newPreviews = files.map((file) => URL.createObjectURL(file));

    // Append new images to existing ones
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleRemoveImage = (index: number) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddFloor = () => {
    console.log("Done");
    openModal(
      <CreateFloorForm hotel={data?.data?.hotel_id} />,
      `Add Floor`,
      `Add Floor in Hotel`
    );
  };

  const mutation = mutateRoomInFloor();

  const form = useForm({
    defaultValues: {
      floor_id: "",
      room_name: "",
      room_price: 0,
      description: "",
    },
    onSubmit: async ({ value }) => {
      mutation.mutate(value);
    },
  });

  return (
    <CardContent>
      <div className="flex flex-col lg:flex-row gap-4">
        {/* LEFT FORM SECTION */}
        <form
          className="w-full lg:w-3/4 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <Card className="p-6 shadow-sm border rounded-2xl bg-muted/30 space-y-6">
            {/* FLOOR */}
            <div className="space-y-2">
              <Label>Floor</Label>
              <form.Field
                name="floor_id"
                children={(field) => (
                  <Select
                    onValueChange={(value) => field.handleChange(value)}
                    value={field.state.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a floor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {data?.data?.floors?.map((f) => (
                          <SelectItem key={f.floor_id} value={f.floor_id}>
                            {f.floor_number}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* ROOM + BED */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Room Name</Label>
                <form.Field
                  name="room_name"
                  children={(field) => (
                    <Input
                      placeholder="Room Name or Number"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  )}
                />
              </div>

              <div className="space-y-2">
                <Label>Bed Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Bed Size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="single">Single Bed</SelectItem>
                      <SelectItem value="double">Double Bed</SelectItem>
                      <SelectItem value="queen">Queen Bed</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* PRICE + DESCRIPTION */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Room Price</Label>
                <form.Field
                  name="room_price"
                  children={(field) => (
                    <Input
                      type="number"
                      placeholder="Room Price"
                      value={field.state.value ?? ""}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                    />
                  )}
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <form.Field
                  name="description"
                  children={(field) => (
                    <Textarea
                      placeholder="Brief description of the room"
                      value={field.state.value ?? ""}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  )}
                />
              </div>
            </div>

            {/* IMAGES */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" /> Upload Room Images
              </Label>

              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="cursor-pointer"
              />

              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pt-2">
                  {imagePreviews.map((src, index) => (
                    <div
                      key={index}
                      className="relative rounded-xl overflow-hidden border shadow-sm"
                    >
                      <img
                        src={src}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-40 object-cover"
                      />

                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* AMENITIES */}
            <div className="space-y-2">
              <Label>Available Amenities</Label>
              <div className="flex flex-wrap gap-2">
                <Badge>Double Bed</Badge>
                <Badge>AC</Badge>
                <Badge>TV</Badge>
                <Badge>Wi-Fi</Badge>
                <Badge>Mini Fridge</Badge>
                <Badge>Balcony</Badge>
              </div>
            </div>

            <Textarea placeholder="Add more amenities..." />

            <Button type="submit" className="w-fit">
              <PlusCircleIcon className="mr-2 h-4 w-4" />
              Save Room
            </Button>
          </Card>
        </form>

        {/* RIGHT SIDE ACTIONS */}
        <div className="w-full lg:w-1/4">
          <Card className="shadow-md rounded-2xl">
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <Button variant="outline" onClick={handleAddFloor}>
                <PlusCircleIcon className="mr-2 h-4 w-4" />
                Add Floor
              </Button>
              <Button variant="outline">
                <PlusCircleIcon className="mr-2 h-4 w-4" />
                Add Amenities
              </Button>
              <Button variant="outline">
                <PlusCircleIcon className="mr-2 h-4 w-4" />
                Add Room Addon
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </CardContent>
  );
}
