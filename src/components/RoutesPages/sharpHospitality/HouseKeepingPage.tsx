import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function HouseKeepingPage() {
  return (
    <Tabs className="p-2">
      <TabsList>
        <TabsTrigger value="a">Requests</TabsTrigger>
        <TabsTrigger value="b">Requests</TabsTrigger>
        <TabsTrigger value="c">Laundary</TabsTrigger>
      </TabsList>
      <TabsContent value="a"><div>This is Request</div></TabsContent>
    </Tabs>
  );
}
