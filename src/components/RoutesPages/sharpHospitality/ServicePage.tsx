import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ServicePage() {
  return (
    <div className="p-2">
      <Tabs defaultValue="running">
        <TabsList className="w-fit h-auto flex-wrap justify-start gap-1">
          <TabsTrigger value="running" className="text-xs sm:text-sm">
            Bar
          </TabsTrigger>
          <TabsTrigger value="status" className="text-xs sm:text-sm">
            Hotel
          </TabsTrigger>
          <TabsTrigger value="assigned" className="text-xs sm:text-sm">
            Restaurant
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
