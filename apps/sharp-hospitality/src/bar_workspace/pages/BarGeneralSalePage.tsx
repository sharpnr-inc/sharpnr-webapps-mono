import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@sharpnr/ui";
import { Input } from "@sharpnr/ui";
import { Button } from "@sharpnr/ui";
import { ScrollArea } from "@sharpnr/ui";
import { Label } from "@sharpnr/ui";

export default function BarGeneralSalePage() {
  const menuItems = [
    { id: 1, name: "Whiskey", price: 350 },
    { id: 2, name: "Beer (Pint)", price: 180 },
    { id: 3, name: "Vodka", price: 250 },
    { id: 4, name: "Rum", price: 220 },
    { id: 5, name: "Cocktail", price: 400 },
    { id: 6, name: "Mocktail", price: 200 },
  ];

  return (
    <div className=" flex flex-col md:flex-row gap-4 mt-4">
      {/* SALES COUNTER */}
      <Card className="w-full md:w-1/3 shadow-md border">
        <CardHeader>
          <CardTitle>Sales Counter</CardTitle>
          <CardDescription>
            Create a direct sale of bar items here
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Guest Info */}
          <div className="space-y-2">
            <Label>Guest Mobile</Label>
            <Input placeholder="Enter guest mobile number" />
          </div>

          <div className="space-y-2">
            <Label>Guest Name (Optional)</Label>
            <Input placeholder="Enter guest name" />
          </div>

          <div className="pt-2">
            <Button className="w-full">Start New Sale</Button>
          </div>

          {/* Cart Items */}
          <div className="pt-4">
            <Label className="text-sm">Cart Items</Label>
            <ScrollArea className="h-40 border rounded-md mt-1 p-2">
              <div className="space-y-2 text-sm text-gray-600">
                <p>No items added yet</p>
              </div>
            </ScrollArea>
          </div>

          {/* Total and Checkout */}
          <div className="flex justify-between items-center pt-3">
            <span className="font-semibold text-lg">Total: ₹0</span>
            <Button variant="default">Checkout</Button>
          </div>
        </CardContent>
      </Card>

      {/* BAR MENU */}
      <Card className="w-full md:w-2/3 shadow-md border">
        <CardHeader>
          <CardTitle>Bar Menu</CardTitle>
          <CardDescription>Browse and add items to the sale</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[450px] p-2 border rounded-md">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {menuItems.map((item) => (
                <Card
                  key={item.id}
                  className="hover:shadow-md transition-all duration-200 cursor-pointer border"
                >
                  <CardContent className="flex flex-col items-center justify-between text-center py-4 space-y-2">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">₹{item.price}</p>
                    <Button size="sm" className="w-full">
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
