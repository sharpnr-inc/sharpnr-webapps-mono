import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function AddItemInMenuForm() {
  const [selectedSize, setSelectedSize] = useState<string>("Select Size");

  const sizes = [
    { id: "size-1", name: "Small (250ml)" },
    { id: "size-2", name: "Regular (350ml)" },
    { id: "size-3", name: "Large (500ml)" },
  ];

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        {/* Item Name */}
        <div className="flex flex-col space-y-1.5">
          <Label>Item Name</Label>
          <Input placeholder="e.g. Mojito" />
        </div>

        {/* Price */}
        <div className="flex flex-col space-y-1.5 h-full">
          <Label>Price (₹)</Label>
          <Input placeholder="e.g. 350" type="number" />
        </div>

        {/* Sizes Dropdown */}
        <div className="flex flex-col space-y-1.5">
          <Label>Size</Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="justify-between font-normal w-fit"
              >
                {selectedSize}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-fit h-full">
              {sizes.map((size) => (
                <DropdownMenuItem
                  key={size.id}
                  onClick={() => setSelectedSize(size.name)}
                >
                  {size.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div>
          <Label>Size</Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="justify-between font-normal w-fit"
              >
                {selectedSize}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-fit h-full">
              {sizes.map((size) => (
                <DropdownMenuItem
                  key={size.id}
                  onClick={() => setSelectedSize(size.name)}
                >
                  {size.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-5 flex justify-end">
        <Button>Add to Menu</Button>
      </div>
    </div>
  );
}
