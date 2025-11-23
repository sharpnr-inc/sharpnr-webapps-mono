import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function BookedRoomDetailsTable({ room }: { room: any }) {
  // Sample data - replace with actual data from your backend
  const servicesOrdered = [
    {
      id: 1,
      service: "Laundry",
      quantity: 2,
      price: 150,
      total: 300,
      date: "2025-10-25",
    },
    {
      id: 2,
      service: "Room Cleaning",
      quantity: 1,
      price: 200,
      total: 200,
      date: "2025-10-26",
    },
    {
      id: 3,
      service: "Spa Service",
      quantity: 1,
      price: 1500,
      total: 1500,
      date: "2025-10-26",
    },
  ];

  const foodOrdered = [
    {
      id: 1,
      item: "Breakfast Buffet",
      quantity: 2,
      price: 350,
      total: 700,
      date: "2025-10-25",
    },
    {
      id: 2,
      item: "Lunch (Veg Thali)",
      quantity: 1,
      price: 450,
      total: 450,
      date: "2025-10-25",
    },
    {
      id: 3,
      item: "Dinner (Non-Veg)",
      quantity: 2,
      price: 600,
      total: 1200,
      date: "2025-10-25",
    },
    {
      id: 4,
      item: "Coffee",
      quantity: 4,
      price: 100,
      total: 400,
      date: "2025-10-26",
    },
  ];

  const totalServices = servicesOrdered.reduce(
    (sum, item) => sum + item.total,
    0
  );
  const totalFood = foodOrdered.reduce((sum, item) => sum + item.total, 0);
  const roomCharges = room.price || 0;
  const grandTotal = roomCharges + totalServices + totalFood;

  return (
    <div className="flex flex-row gap-4">
      <div className="w-3/4 p-2 space-y-2 max-h-lvw overflow-y-scroll">
        {/* Room Summary Section */}
        <div className=" border rounded-lg p-4 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Status</p>
              <p className="font-semibold capitalize">{room.status}</p>
            </div>
            <div>
              <p className="text-gray-600">Guest Name</p>
              <p className="font-semibold">{room.guest_name || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-600">Room Price (per night)</p>
              <p className="font-semibold">₹{roomCharges}</p>
            </div>
            <div>
              <p className="text-gray-600">Check-in Date</p>
              <p className="font-semibold">{room.check_in || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-600">Check-out Date</p>
              <p className="font-semibold">{room.check_out || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-600">Contact</p>
              <p className="font-semibold">{room.guest_mobile || "N/A"}</p>
            </div>
          </div>

          {/* Billing Summary */}
          <div className="mt-6 pt-4 border-t">
            <h3 className="font-semibold text-lg mb-3">Billing Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Room Charges:</span>
                <span className="font-semibold">₹{roomCharges}</span>
              </div>
              <div className="flex justify-between">
                <span>Services Total:</span>
                <span className="font-semibold">₹{totalServices}</span>
              </div>
              <div className="flex justify-between">
                <span>Food & Beverage Total:</span>
                <span className="font-semibold">₹{totalFood}</span>
              </div>
              <div className="flex justify-between pt-2 border-t text-base font-bold">
                <span>Grand Total:</span>
                <span className="text-primary">₹{grandTotal}</span>
              </div>
            </div>
          </div>
                 <div className="mt-6 pt-4 border-t">
            <h3 className="font-semibold text-lg mb-3">Billing Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Room Charges:</span>
                <span className="font-semibold">₹{roomCharges}</span>
              </div>
              <div className="flex justify-between">
                <span>Services Total:</span>
                <span className="font-semibold">₹{totalServices}</span>
              </div>
              <div className="flex justify-between">
                <span>Food & Beverage Total:</span>
                <span className="font-semibold">₹{totalFood}</span>
              </div>
              <div className="flex justify-between pt-2 border-t text-base font-bold">
                <span>Grand Total:</span>
                <span className="text-primary">₹{grandTotal}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Services Table */}
        <div className="border rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 md:p-6 border-b">
            <h3 className="text-lg font-semibold">Services Ordered</h3>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead className="text-center">Qty</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {servicesOrdered.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center text-gray-500 py-8"
                    >
                      No services ordered
                    </TableCell>
                  </TableRow>
                ) : (
                  servicesOrdered.map((service, index) => (
                    <TableRow key={service.id}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>{service.service}</TableCell>
                      <TableCell className="text-center">
                        {service.quantity}
                      </TableCell>
                      <TableCell className="text-right">
                        ₹{service.price}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        ₹{service.total}
                      </TableCell>
                      <TableCell>{service.date}</TableCell>
                    </TableRow>
                  ))
                )}
                {servicesOrdered.length > 0 && (
                  <TableRow className="font-semibold">
                    <TableCell colSpan={4} className="text-right">
                      Total Services:
                    </TableCell>
                    <TableCell className="text-right">
                      ₹{totalServices}
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Food & Beverage Table */}
        <div className="border rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 md:p-6 border-b">
            <h3 className="text-lg font-semibold">Food & Beverage Orders</h3>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead className="text-center">Qty</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {foodOrdered.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center text-gray-500 py-8"
                    >
                      No food orders
                    </TableCell>
                  </TableRow>
                ) : (
                  foodOrdered.map((food, index) => (
                    <TableRow key={food.id}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>{food.item}</TableCell>
                      <TableCell className="text-center">
                        {food.quantity}
                      </TableCell>
                      <TableCell className="text-right">
                        ₹{food.price}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        ₹{food.total}
                      </TableCell>
                      <TableCell>{food.date}</TableCell>
                    </TableRow>
                  ))
                )}
                {foodOrdered.length > 0 && (
                  <TableRow className="font-semibold">
                    <TableCell colSpan={4} className="text-right">
                      Total Food & Beverage:
                    </TableCell>
                    <TableCell className="text-right">₹{totalFood}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4">
          <Button variant="outline">Add Service</Button>
          <Button variant="outline">Add Food Order</Button>
          <Button variant="default">Generate Bill</Button>
          <Button variant="secondary">Check Out Guest</Button>
        </div>
      </div>

      <div className="border w-1/4 rounded-xl h-full">
        <Card>
          <CardHeader>
            <CardTitle>Menu</CardTitle>
            <CardDescription>Add Menu</CardDescription>
          </CardHeader>
          <CardContent>
            <div></div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
