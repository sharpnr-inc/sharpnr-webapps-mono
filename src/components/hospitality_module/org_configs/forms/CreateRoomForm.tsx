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

export default function CreateRoomForm() {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newPreviews = files.map((file) => URL.createObjectURL(file));

    // Append new images to existing ones
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleRemoveImage = (index: number) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <CardContent>
      <div className="flex flex-col lg:flex-row gap-6 justify-between">
        {/* Left Section */}
        <div className="flex flex-col gap-5 w-full lg:w-3/4 border p-2 rounded-xl shadow-sm bg-muted/10">
          {/* Floor selection */}
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a floor" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="f1">Floor 1</SelectItem>
                <SelectItem value="f2">Floor 2</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Room and Bed */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Input placeholder="Room Name or Number" />
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
            <Input placeholder="Room Price" type="number" />
            <Textarea placeholder="Brief description of the room" />
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
            <div className="text-sm font-medium mb-1">Available Amenities</div>
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

          <Button className="w-fit self-start">
            <PlusCircleIcon className="mr-2 h-4 w-4" />
            Save Room
          </Button>
        </div>

        {/* Right Side Actions */}
        <div className="w-full lg:w-1/4">
          <Card className="shadow-md h-fit">
            <CardHeader className="pb-1">
              <CardTitle className="text-base font-semibold">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 pt-2">
              <Button variant="outline">
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
