import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";
import { ArrowBigLeft, ArrowRight, ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";



export default function AddItemInMenuStepTwo({ onNext, onBack }: any) {
  const [foodType, setFoodType] = useState<"veg" | "nonveg" | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  

  const handleImageSelect = (file: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file (PNG or JPG).");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("File size should be under 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleImageSelect(file);
  };

  const handleSelectFoodType = (type: "veg" | "nonveg") => {
    setFoodType((prev) => (prev === type ? null : type));
  };

  return (
    <div className="w-full space-y-5">
      {/* Item Name */}
      <div className="space-y-1.5">
        <Label className="text-sm font-medium text-gray-700">Item Name</Label>
        <Input placeholder="e.g. Margherita Pizza, Mojito" />
      </div>

      {/* Item Description */}
      <div className="space-y-1.5">
        <Label className="text-sm font-medium text-gray-700">
          Item Description
        </Label>
        <Textarea placeholder="Describe your dish briefly..." />
      </div>

      {/* Food Type + Unit */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Food Type */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Food Type</Label>
          <div className="flex gap-4">
            {/* Veg Option */}
            <div
              onClick={() => handleSelectFoodType("veg")}
              className={`flex items-center gap-2 px-4 py-2 border rounded-xl cursor-pointer transition-colors ${
                foodType === "veg"
                  ? "border-green-500 bg-green-50"
                  : "hover:bg-green-50"
              }`}
            >
              <Checkbox
                checked={foodType === "veg"}
                onCheckedChange={() => handleSelectFoodType("veg")}
                className="data-[state=checked]:bg-green-500"
              />
              <span className="text-green-600 font-medium">Veg</span>
            </div>

            {/* Non-Veg Option */}
            <div
              onClick={() => handleSelectFoodType("nonveg")}
              className={`flex items-center gap-2 px-4 py-2 border rounded-xl cursor-pointer transition-colors ${
                foodType === "nonveg"
                  ? "border-red-500 bg-red-50"
                  : "hover:bg-red-50"
              }`}
            >
              <Checkbox
                checked={foodType === "nonveg"}
                onCheckedChange={() => handleSelectFoodType("nonveg")}
                className="data-[state=checked]:bg-red-500"
              />
              <span className="text-red-600 font-medium">Non Veg</span>
            </div>
          </div>
        </div>

        {/* Unit Selection */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Unit</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="piece">Piece</SelectItem>
                <SelectItem value="plate">Plate</SelectItem>
                <SelectItem value="glass">Glass</SelectItem>
                <SelectItem value="bottle">Bottle</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Upload Image Section */}
      <div
        className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center transition cursor-pointer ${
          imagePreview ? "border-muted" : "hover:bg-muted/20"
        }`}
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {imagePreview ? (
          <div className="relative h-60 rounded-lg overflow-hidden border">
            <img
              src={imagePreview}
              alt="Preview"
              className="object-cover w-full h-full"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setImagePreview(null);
              }}
              className="absolute top-1 right-1 text-xs bg-background/70 backdrop-blur-sm rounded px-2 py-0.5 font-medium"
            >
              ✕
            </button>
          </div>
        ) : (
          <>
            <ImagePlus className="w-10 h-10 text-muted-foreground mb-2" />
            <p className="text-sm font-medium">Upload Item Image</p>
            <p className="text-xs text-muted-foreground mt-1">
              PNG, JPG up to 5MB
            </p>
          </>
        )}

        <input
          type="file"
          accept="image/png, image/jpeg"
          ref={fileInputRef}
          className="hidden"
          onChange={(e) => handleImageSelect(e.target.files?.[0] as File)}
        />
      </div>

      <div className="flex items-center justify-between gap-6 mt-6 ">
        <div className="w-full">
          <Button
            onClick={onBack}
            variant="outline"
            className="w-full flex items-center justify-center gap-2 "
          >
            <ArrowBigLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </Button>
        </div>
        <div className="w-full">
          {/* Next Button */}
          <Button
            onClick={onNext}
            className="w-full flex items-center justify-center gap-2 bg-primary cursor-pointer"
          >
            <span className="font-medium">Next</span>
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
