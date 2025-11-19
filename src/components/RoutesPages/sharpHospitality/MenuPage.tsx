import { useMenuGroup } from "@/api_service/queries/HospitalityQueries/Menu";
import MenuBarMenuSection from "@/components/hospitality_module/Menu/MenuBarMenuSection";
import MenuHotelMenuSection from "@/components/hospitality_module/Menu/MenuHotelMenuSection";
import MenuRestaurantMenuSection from "@/components/hospitality_module/Menu/MenuRestaurantMenuSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { JSX } from "react";

export default function MenuPage() {
  const { data, isLoading, error } = useMenuGroup();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading menus</div>;

  const menuGroups = data?.data ?? [];

  // Mapping TYPE → Component factory (so we can inject props)
  const menuSectionComponent: Record<string, (group: any) => JSX.Element> = {
    BAR: (group) => <MenuBarMenuSection group={group} />,
    HOTEL: (group) => <MenuHotelMenuSection  />,
    RESTAURANT: (group) => <MenuRestaurantMenuSection />,
  };

  return (
    <Tabs
      defaultValue={menuGroups[0]?.Type.toLowerCase()}
      className="p-2"
    >
      <TabsList>
        {menuGroups.map((group: any) => (
          <TabsTrigger key={group.Id} value={group.Type.toLowerCase()}>
            {group.Name}
          </TabsTrigger>
        ))}
      </TabsList>

      {menuGroups.map((group: any) => (
        <TabsContent 
          key={group.Id} 
          value={group.Type.toLowerCase()}
        >
          {menuSectionComponent[group.Type]
            ? menuSectionComponent[group.Type](group) // pass group prop
            : <div>No section available for this menu type.</div>}
        </TabsContent>
      ))}
    </Tabs>
  );
}
