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
import { useHotelQueryOptions } from "@/api_service/queries/hotelQueries";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { mutateRoomInFloor } from "@/api_service/mutations/hotelsMutation";

export default function CreateRoomForm() {
  const queryOptions = useHotelQueryOptions();
  const { data, isLoading, isError } = useQuery(queryOptions);
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
    openModal(<CreateFloorForm />, `Add Floor`, `Add Floor in Hotel`);
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
      <div className="flex flex-col lg:flex-row gap-6 justify-between">
        {/* Left Section */}

        <form
          className=""
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <div className="flex flex-col gap-5 w-full lg:w-3/4 border p-2 rounded-xl shadow-sm bg-muted/10">
            {/* Floor selection */}
            <form.Field
              name="floor_id"
              children={(field) => (
                <Select
                  onValueChange={(value) => field.handleChange(value)}
                  value={field.state.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a floor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {data?.data.floors?.map((f: any) => (
                        <SelectItem key={f.floor_id} value={f.floor_id}>
                          {f.floor_number}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />

            {/* Room and Bed */}
            <div className="flex flex-col sm:flex-row gap-4">
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

              <Select>
                <SelectTrigger className="w-full sm:w-[50%]">
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

            {/* Price and Description */}
            <div className="flex flex-col sm:flex-row gap-4">
              <form.Field
                name="room_price"
                children={(field) => (
                  <Input
                    type="number"
                    placeholder="Room Price"
                    value={field.state.value ?? ""}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                  />
                )}
              />
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

            {/* Image Upload Section */}
            <div className="flex flex-col gap-3">
              <label className="font-medium text-sm flex items-center gap-2">
                <ImageIcon className="w-4 h-4" /> Upload Room Images
              </label>
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="cursor-pointer"
              />
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-2">
                  {imagePreviews.map((src, index) => (
                    <div
                      key={index}
                      className="relative group border rounded-lg overflow-hidden"
                    >
                      <img
                        src={src}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-40 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Amenities */}
            <div>
              <div className="text-sm font-medium mb-1">
                Available Amenities
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge>Double Bed</Badge>
                <Badge>AC</Badge>
                <Badge>TV</Badge>
                <Badge>Wi-Fi</Badge>
                <Badge>Mini Fridge</Badge>
                <Badge>Balcony</Badge>
              </div>
            </div>

            <Textarea placeholder="Add more amenities..."></Textarea>

            <Button type="submit" className="w-fit self-start">
              <PlusCircleIcon className="mr-2 h-4 w-4" />
              Save Room
            </Button>
          </div>
        </form>

        {/* Right Side Actions */}
        <div className="w-full lg:w-1/4">
          <Card className="shadow-md h-fit">
            <CardHeader className="pb-1">
              <CardTitle className="text-base font-semibold">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 pt-2">
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
