import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ServicePage() {
  return (
    <div className="p-2">
      <Tabs defaultValue="running">
        <TabsList className="w-fit h-auto flex-wrap justify-start gap-1">
          <TabsTrigger value="running" className="text-xs sm:text-sm">
            Running Service
          </TabsTrigger>
          <TabsTrigger value="status" className="text-xs sm:text-sm">
            Order Status
          </TabsTrigger>
          <TabsTrigger value="assigned" className="text-xs sm:text-sm">
            Assigned
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="text-xs sm:text-sm">
            Upcoming
          </TabsTrigger>
          <TabsTrigger value="history" className="text-xs sm:text-sm">
            History
          </TabsTrigger>
          <TabsTrigger value="reviews" className="text-xs sm:text-sm">
            Reviews
          </TabsTrigger>
          <TabsTrigger value="menu" className="text-xs sm:text-sm">
            Menu
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}