import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowBigLeft, ArrowRight } from "lucide-react";

const itemData = {
  name: "Margherita Pizza",
  isVeg: true,
  basePrice: 688,
  description:
    "A delightful combination of mozzarella, tomato, and basil on a crispy crust.",
  image: "https://baconmockup.com/1280/720/",
  category: "Pizza",
  subcategory: "Veg",
  variants: [
    {
      name: "Classic",
      sizes: [
        { label: "Small", price: 120 },
        { label: "Regular", price: 180 },
        { label: "Large", price: 230 },
      ],
    },
    {
      name: "Cheese Burst",
      sizes: [
        { label: "Small", price: 150 },
        { label: "Regular", price: 210 },
        { label: "Large", price: 280 },
      ],
    },
  ],
  addons: [
    { name: "Extra Cheese", price: 40 },
    { name: "Mushrooms", price: 30 },
    { name: "Olives", price: 25 },
  ],
};

export default function AddItemInMenuStepFive({ onBack }: any) {
  return (
    <div className="w-full">
      <div>
        <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow rounded-2xl">
          {/* Header */}
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold ">
              <span>Item Preview</span>
            </CardTitle>

            <CardDescription className="text-sm text-muted-foreground flex justify-between items-start">
              Preview of your menu item with all its variants and add-ons.
              <div className="flex gap-4 items-end border">
                <span className="text-xl font-bold">₹{itemData.basePrice}</span>
                {itemData.isVeg ? (
                  <span className="text font-medium text-gray-900 bg-green-500 px-2 py-1 border rounded-full">
                    Veg
                  </span>
                ) : (
                  <span className="text-xs font-medium px-2 py-1 border rounded-full">
                    Non-Veg
                  </span>
                )}
              </div>
            </CardDescription>
          </CardHeader>

          {/* Content */}
          <CardContent className="space-y-4">
            {/* Item Info */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Image */}
              <div className="w-full sm:w-32 h-32 rounded-xl overflow-hidden border bg-gray-50 flex-shrink-0">
                <img
                  src={itemData.image}
                  alt="Item"
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Details */}
              <div className="flex flex-col space-y-2 w-full">
                <div className="text-lg font-semibold ">{itemData.name}</div>
                <p className="text-sm line-clamp-3">{itemData.description}</p>
                <div className="text-xs text-gray-500 font-medium">
                  🍕 {itemData.category} → {itemData.subcategory}
                </div>
              </div>
            </div>

            <Separator />

            {/* Variants */}
            <div className="space-y-3">
              <h4 className="font-medium  text-sm">Variants:</h4>
              <div className="space-y-2">
                {itemData.variants.map((variant, index) => (
                  <div
                    key={index}
                    className="rounded-lg border p-3  hover:bg-gray-100 transition"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium ">{variant.name}</span>
                      <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                        {variant.sizes.map((size, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 rounded-md bg-white border text-xs font-medium"
                          >
                            {size.label} — ₹{size.price}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />
          </CardContent>

          {/* Footer */}
          <CardFooter className="flex flex-col items-start gap-2">
            <div className="text-sm font-medium ">Available Add-ons</div>
            <div className="flex flex-wrap gap-2">
              {itemData.addons.map((addon, i) => (
                <Badge key={i} variant="secondary">
                  {addon.name} +₹{addon.price}
                </Badge>
              ))}
            </div>
          </CardFooter>
        </Card>
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
          <Button className="w-full flex items-center justify-center gap-2 bg-primary cursor-pointer">
            <span className="font-medium truncate">Add Item To Menu</span>
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
