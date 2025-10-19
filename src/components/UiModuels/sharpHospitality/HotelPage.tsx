import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {} from "lucide-react";
import HotelBookingSection from "@/components/hospitality_module/hotel/HotelBookingSection";
import HotelOverviewSection from "@/components/hospitality_module/hotel/HotelOverviewSection";

export default function SharpHospitalityHotelPage() {
  return (
    <div>
      <div className="p-2 border-b-2">
        <div className="text-3xl font-semibold">Hotel</div>
        <p className="">THis is Hotel Page</p>
      </div>{" "}
      <div className="mt-2">
        {/* Tabs Section */}
        <Tabs defaultValue="general" className="w-full">
          <div className="">
            <TabsList className=" w-max p-1 space-x-2">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="booking">Bookings</TabsTrigger>
              <TabsTrigger value="notifications">Request</TabsTrigger>
              <TabsTrigger value="rooms_config">Room Management</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview">
            <HotelOverviewSection />
          </TabsContent>

          <TabsContent value="booking">
            <HotelBookingSection />
          </TabsContent>

          {/* --- MENU --- */}
          <TabsContent value="menu">
            <Card className="rounded-2xl shadow-sm">
              <CardHeader>
                <CardTitle>Menu Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Add or update restaurant menu items.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Dish Name</Label>
                    <Input placeholder="Paneer Butter Masala" />
                  </div>
                  <div>
                    <Label>Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="veg">Veg</SelectItem>
                        <SelectItem value="nonveg">Non-Veg</SelectItem>
                        <SelectItem value="beverages">Beverages</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Price</Label>
                    <Input type="number" placeholder="299" />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea placeholder="A rich, creamy tomato-based curry with paneer." />
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <Button>Add to Menu</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* --- USERS --- */}
          <TabsContent value="users">
            <Card className="rounded-2xl shadow-sm">
              <CardHeader>
                <CardTitle>Manage Users</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">
                    Add or remove users in your organisation.
                  </p>
                  <Button>Add User</Button>
                </div>
                <div className="border rounded-lg p-4">
                  <p className="text-muted-foreground text-sm text-center">
                    No users added yet.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* --- PAYMENTS --- */}
          <TabsContent value="payments">
            <Card className="rounded-2xl shadow-sm">
              <CardHeader>
                <CardTitle>Payment Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Payment Gateway</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment gateway" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="razorpay">Razorpay</SelectItem>
                      <SelectItem value="stripe">Stripe</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Merchant ID</Label>
                  <Input placeholder="Enter merchant ID" />
                </div>
                <div>
                  <Label>Secret Key</Label>
                  <Input type="password" placeholder="***********" />
                </div>
                <div className="flex justify-end pt-4">
                  <Button>Save Payment Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* --- ROOMS CONFIG --- */}
          <TabsContent value="rooms_config">
            <Card className="rounded-2xl shadow-sm">
              <CardHeader>
                <CardTitle>Room Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Manage room types and pricing.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Room Type</Label>
                    <Input placeholder="Deluxe Room" />
                  </div>
                  <div>
                    <Label>Base Price (per night)</Label>
                    <Input type="number" placeholder="3500" />
                  </div>
                  <div>
                    <Label>Max Occupancy</Label>
                    <Input type="number" placeholder="2" />
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <Button>Add Room Type</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* --- RESTAURANT CONFIG --- */}
          <TabsContent value="restaurant_config">
            <Card className="rounded-2xl shadow-sm">
              <CardHeader>
                <CardTitle>Restaurant Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Configure restaurant settings and schedules.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Opening Time</Label>
                    <Input type="time" />
                  </div>
                  <div>
                    <Label>Closing Time</Label>
                    <Input type="time" />
                  </div>
                  <div>
                    <Label>Service Tax (%)</Label>
                    <Input type="number" placeholder="5" />
                  </div>
                  <div>
                    <Label>Special Instructions</Label>
                    <Textarea placeholder="E.g., Closed on Mondays, last order at 10 PM." />
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <Button>Save Restaurant Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
