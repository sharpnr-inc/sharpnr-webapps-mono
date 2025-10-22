import BarInventorySection from "@/components/hospitality_module/bar/BarInventorySection";
import BarMenuSection from "@/components/hospitality_module/bar/BarMenuSection";
import BarOrdersSection from "@/components/hospitality_module/bar/BarOrdersSection";
import BarStaffSection from "@/components/hospitality_module/bar/BarStaffSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function BarPage() {
  return (
    <div className="p-2">
      {/* Tabs Section */}
      <Tabs defaultValue="menu" className="w-full">
        {/* --- Tabs Header --- */}
        <TabsList className="w-full h-auto flex-wrap justify-start">
          <TabsTrigger value="menu" className="flex-1 min-w-[80px]">
            Menu
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex-1 min-w-[80px]">
            Orders
          </TabsTrigger>
          <TabsTrigger value="inventory" className="flex-1 min-w-[80px]">
            Inventory
          </TabsTrigger>
          <TabsTrigger value="staff" className="flex-1 min-w-[80px]">
            Staff
          </TabsTrigger>
        </TabsList>

        {/* --- Tabs Content --- */}
        <div className="mt-4">
          <TabsContent value="menu">
            <BarMenuSection />
          </TabsContent>
          <TabsContent value="orders">
            <BarOrdersSection />
          </TabsContent>
          <TabsContent value="inventory">
            <BarInventorySection />
          </TabsContent>
          <TabsContent value="staff">
            <BarStaffSection />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}