import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import React from "react";

export default function SharpHospitalitySettings() {
  const [activeTab, setActiveTab] = React.useState("general");

  const handleSelect = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="pb-4 border-b">
        <h1 className="text-3xl font-semibold">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Configure your organisation preferences and manage settings.
        </p>
      </div>

      {/* Tabs Section */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-max hidden xl:flex p-1 space-x-2 max-w-full">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="menu">Menu</TabsTrigger>
        <TabsTrigger value="users">Users</TabsTrigger>
        <TabsTrigger value="payments">Payments</TabsTrigger>
        <TabsTrigger value="rooms_config">Room Configuration</TabsTrigger>
        <TabsTrigger value="restaurant_config">
          Restaurant Configuration
        </TabsTrigger>
      </TabsList>

      {/* --- Mobile Dropdown --- */}
      <div className="xl:hidden mb-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full capitalize">
              {activeTab.replaceAll("_", " ")}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Settings Sections</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => handleSelect("general")}>
              General
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => handleSelect("notifications")}>
              Notifications
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => handleSelect("menu")}>
              Menu
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => handleSelect("users")}>
              Users
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => handleSelect("payments")}>
              Payments
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => handleSelect("rooms_config")}>
              Room Configuration
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => handleSelect("restaurant_config")}
            >
              Restaurant Configuration
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>


        {/* --- GENERAL --- */}
        <TabsContent value="general">
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle>Organisation Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Organisation Name</Label>
                  <Input placeholder="Sharp Hospitality Pvt. Ltd." />
                </div>
                <div>
                  <Label>Contact Email</Label>
                  <Input
                    type="email"
                    placeholder="contact@sharphospitality.com"
                  />
                </div>
                <div>
                  <Label>Phone Number</Label>
                  <Input type="tel" placeholder="+91 9876543210" />
                </div>
                <div>
                  <Label>Address</Label>
                  <Input placeholder="123 Street, Mumbai, India" />
                </div>
              </div>
              <div className="pt-4 flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- NOTIFICATIONS --- */}
        <TabsContent value="notifications">
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive updates about bookings and reports via email.
                  </p>
                </div>
                <Switch />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label>SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Get important alerts through text messages.
                  </p>
                </div>
                <Switch />
              </div>

              <Separator />

              <div className="flex justify-end pt-4">
                <Button>Update Preferences</Button>
              </div>
            </CardContent>
          </Card>
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
  );
}
