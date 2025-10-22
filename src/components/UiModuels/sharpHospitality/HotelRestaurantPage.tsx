import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function RestaurantPage() {
  return (
    <Tabs className="p-2">
      <TabsList className="w-fit h-auto flex-wrap justify-start gap-1">
        <TabsTrigger value="table_management">Table Managment</TabsTrigger>
        <TabsTrigger value="order">Orders</TabsTrigger>
        <TabsTrigger value="pickup">Pickup</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
