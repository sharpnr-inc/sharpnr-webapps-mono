import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HotelOverviewSection() {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
        <Card className="rounded-xl shadow-sm hover:shadow transition-all p-3">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Total Guest</p>
              <p className="text-2xl font-semibold text-blue-600">12</p>
            </div>
            <span className="text-xs text-gray-500">Next 7 days</span>
          </div>
        </Card>

        <Card className="rounded-xl shadow-sm hover:shadow transition-all p-3">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Upcoming Booking</p>
              <p className="text-2xl font-semibold text-green-600">5</p>
            </div>
            <span className="text-xs text-gray-500">By 11 AM</span>
          </div>
        </Card>

        <Card className="rounded-xl shadow-sm hover:shadow transition-all p-3">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Checkouts</p>
              <p className="text-2xl font-semibold text-yellow-600">8</p>
            </div>
            <span className="text-xs text-gray-500">Active</span>
          </div>
        </Card>
        <Card className="rounded-xl shadow-sm hover:shadow transition-all p-3">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Service Requests</p>
              <p className="text-2xl font-semibold text-yellow-600">8</p>
            </div>
            <span className="text-xs text-gray-500">Active</span>
          </div>
        </Card>
      </div>

      {/* Guest Information Table */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="">
          <CardTitle className="text-lg font-semibold">
            Guest Information
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-scroll">
          <table className="w-full text-sm border-collapse ">
            <thead>
              <tr className="border-b bg-muted/30 text-left">
                <th className="py-2 px-3 font-medium">Guest Name</th>
                <th className="py-2 px-3 font-medium">Room No.</th>
                <th className="py-2 px-3 font-medium">Check-in</th>
                <th className="py-2 px-3 font-medium">Check-out</th>
                <th className="py-2 px-3 font-medium">Status</th>
                <th className="py-2 px-3 font-medium">Paid</th>
                <th className="py-2 px-3 font-medium">Pending</th>
                <th className="py-2 px-3 font-medium">Total</th>
                <th className="py-2 px-3 font-medium text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1 */}
              <tr className="border-b hover:bg-muted/20">
                <td className="py-2 px-3">Amit Sharma</td>
                <td className="py-2 px-3">101</td>
                <td className="py-2 px-3">17 Oct 2025</td>
                <td className="py-2 px-3">20 Oct 2025</td>
                <td className="py-2 px-3">
                  <span className="text-green-600 font-medium">Checked In</span>
                </td>
                <td className="py-2 px-3">
                  <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                    ₹12,500
                  </span>
                </td>
                <td className="py-2 px-3">
                  <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium text-yellow-700 bg-yellow-100 rounded-full">
                    ₹0
                  </span>
                </td>
                <td className="py-2 px-3 font-semibold">₹12,500</td>
                <td className="py-2 px-3 text-center">
                  <Button size="sm" variant="outline">
                    Checkout
                  </Button>
                </td>
              </tr>

              {/* Row 2 */}
              <tr className="border-b hover:bg-muted/20">
                <td className="py-2 px-3">Priya Patel</td>
                <td className="py-2 px-3">202</td>
                <td className="py-2 px-3">16 Oct 2025</td>
                <td className="py-2 px-3">17 Oct 2025</td>
                <td className="py-2 px-3">
                  <span className="text-yellow-600 font-medium">
                    Due Checkout
                  </span>
                </td>
                <td className="py-2 px-3">
                  <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                    ₹4,000
                  </span>
                </td>
                <td className="py-2 px-3">
                  <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium text-yellow-700 bg-yellow-100 rounded-full">
                    ₹4,400
                  </span>
                </td>
                <td className="py-2 px-3 font-semibold">₹8,400</td>
                <td className="py-2 px-3 text-center">
                  <Button
                    size="sm"
                    className="bg-yellow-500 hover:bg-yellow-600 text-white"
                  >
                    Checkout
                  </Button>
                </td>
              </tr>

              {/* Row 3 */}
              <tr className="hover:bg-muted/20">
                <td className="py-2 px-3">Rahul Mehta</td>
                <td className="py-2 px-3">303</td>
                <td className="py-2 px-3">15 Oct 2025</td>
                <td className="py-2 px-3">18 Oct 2025</td>
                <td className="py-2 px-3">
                  <span className="text-blue-600 font-medium">Upcoming</span>
                </td>
                <td className="py-2 px-3">
                  <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                    ₹0
                  </span>
                </td>
                <td className="py-2 px-3">
                  <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium text-yellow-700 bg-yellow-100 rounded-full">
                    ₹10,000
                  </span>
                </td>
                <td className="py-2 px-3 font-semibold">₹10,000</td>
                <td className="py-2 px-3 text-center">
                  <Button size="sm" variant="secondary" disabled>
                    Checkout
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
