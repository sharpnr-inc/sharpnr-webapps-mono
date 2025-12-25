import { useMenuGroup } from "@/_hospitalityapp/shared/Menu/apis/Menu";
import MenuSectionDetails from "@/_hospitalityapp/shared/Menu/sections/MenuDetailsSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MenuPage() {
  const { data, isLoading, error } = useMenuGroup();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading menus</div>;

  const menuGroups = data?.data ?? [];

  return (
    <Tabs defaultValue={menuGroups[0]?.Type.toLowerCase()} className="p-2">
      <TabsList>
        {menuGroups.map((group: any) => (
          <TabsTrigger key={group.Id} value={group.Type.toLowerCase()}>
            {group.Name}
          </TabsTrigger>
        ))}
      </TabsList>

      {menuGroups.map((group: any) => (
        <TabsContent key={group.Id} value={group.Type.toLowerCase()}>
          {/* Only 1 component */}
          <MenuSectionDetails group={group} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
