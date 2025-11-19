import { useMenuGroup } from "@/api_service/queries/HospitalityQueries/Menu";
import MenuSectionDetails from "@/components/hospitality_module/Menu/MenuDetailsSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


export default function MenuPage() {
  const { data, isLoading, error } = useMenuGroup();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading menus</div>;

  const menuGroups = data?.data ?? [];

  console.log(menuGroups)

  return (
    <Tabs
      defaultValue={menuGroups[0]?.Type.toLowerCase()}
      className="p-2"
    >
      <TabsList>
        {menuGroups.map((group:any) => (
          <TabsTrigger
            key={group.Id}
            value={group.Type.toLowerCase()}
          >
            {group.Name}
          </TabsTrigger>
        ))}
      </TabsList>

      {menuGroups.map((group:any) => (
        <TabsContent
          key={group.Id}
          value={group.Type.toLowerCase()}
        >
          {/* Only 1 component */}
          <MenuSectionDetails group={group} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
