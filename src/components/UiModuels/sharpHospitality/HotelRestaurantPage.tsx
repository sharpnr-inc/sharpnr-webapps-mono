import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function RestaurantPage() {
  return (
    <Tabs defaultValue="table_management" className="p-2">
      <TabsList className="w-fit h-auto flex-wrap justify-start gap-1">
        <TabsTrigger value="table_management" className="text-xs sm:text-sm">
          Table Management
        </TabsTrigger>
        <TabsTrigger value="order" className="text-xs sm:text-sm">
          Orders
        </TabsTrigger>
        <TabsTrigger value="pickup" className="text-xs sm:text-sm">
          Pickup
        </TabsTrigger>
        <TabsTrigger value="res_booking" className="text-xs sm:text-sm">
          Reservation & Bookings
        </TabsTrigger>
      </TabsList>

      {/* Tab Contents */}
      <div className="mt-4">
        <TabsContent value="table_management">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Table Management</h2>
            {/* Add your table management component here */}
            <p className="text-muted-foreground">View and manage restaurant tables, seating arrangements, and availability.</p>
          </div>
        </TabsContent>

        <TabsContent value="order">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Orders</h2>
            {/* Add your orders component here */}
            <p className="text-muted-foreground">View and manage dine-in orders.</p>
          </div>
        </TabsContent>

        <TabsContent value="pickup">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Pickup Orders</h2>
            {/* Add your pickup component here */}
            <p className="text-muted-foreground">Manage takeaway and pickup orders.</p>
          </div>
        </TabsContent>

        <TabsContent value="res_booking">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Reservation & Bookings</h2>
            {/* Add your reservations component here */}
            <p className="text-muted-foreground">Manage table reservations and booking requests.</p>
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
}