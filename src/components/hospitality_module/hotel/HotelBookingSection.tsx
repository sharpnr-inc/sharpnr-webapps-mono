import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function HotelBookingSection() {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left: Booking Section */}
      <div className=" w-2/3 border rounded-xl p-4 shadow-sm">
        <h2 className="text-lg font-semibold mb-3">Booking Details</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Fill or view guest booking details here.
        </p>

        {/* Example form fields */}
        <div className="space-y-3">
          <div>
            <Label>Guest Name</Label>
            <Input placeholder="Enter guest name" />
          </div>
          <div>
            <Label>Check-in Date</Label>
            <Input type="date" />
          </div>
          <div>
            <Label>Check-out Date</Label>
            <Input type="date" />
          </div>
          <div>
            <Label>Number of Guests</Label>
            <Input type="number" placeholder="2" />
          </div>
        </div>

        <div className="pt-5 flex justify-end">
          <Button>Save Booking</Button>
        </div>
      </div>

      {/* Right: Rooms Scroll Section */}
      <div className=" w-1/3 border rounded-xl p-4 shadow-sm">
        <h2 className="text-lg font-semibold mb-3">Available Rooms</h2>
        <div className="h-[400px] overflow-y-auto pr-2 space-y-4">
          {[1, 2, 3, 4, 5, 6].map((room) => (
            <Card
              key={room}
              className="rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-base">
                      Room #{100 + room}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Deluxe Suite
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-green-600">
                      ₹{3000 + room * 200}
                    </p>
                    <Button size="sm" className="mt-1">
                      Book
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
