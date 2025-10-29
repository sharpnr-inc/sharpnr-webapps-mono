import MenuBarMenuSection from "@/components/hospitality_module/Menu/MenuBarMenuSection";
import MenuHotelMenuSection from "@/components/hospitality_module/Menu/MenuHotelMenuSection";
import MenuRestaurantMenuSection from "@/components/hospitality_module/Menu/MenuRestaurantMenuSection";
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs";

export default function MenuPage() {
  return (
    <Tabs defaultValue="bar_menu" className="p-2">
      <TabsList>
        <TabsTrigger value="bar_menu"> Bar Menu</TabsTrigger>
        <TabsTrigger value="hotel_menu">Hotel Menu</TabsTrigger>
        <TabsTrigger value="restaurant_menu"> Restaurant Menu</TabsTrigger>
      </TabsList>
      <TabsContent value="bar_menu">
        <MenuBarMenuSection />
      </TabsContent>

      <TabsContent value="hotel_menu">
        <MenuHotelMenuSection />
      </TabsContent>

      <TabsContent value="restaurant_menu">
        <MenuRestaurantMenuSection />
      </TabsContent>
    </Tabs>
  );
}
