import { Button } from "@/components/ui/button";
import { getAllHotels } from "@/hotel_workspace/apis/api.service";
import { HotelSelector } from "@/hotel_workspace/components/HotelSelector";
import { createFileRoute } from "@tanstack/react-router";
import { RefreshCw, TriangleAlert } from "lucide-react";

export const Route = createFileRoute("/workspace/_modules/hotel/")({
  loader: async ({ context }) => {
    const hotels = await context.queryClient.ensureQueryData({
      queryKey: ["ALL_HOTELS"],
      queryFn: getAllHotels,
    });

    return { hotels };
  },
  errorComponent: ({ error }) => (
    <div className="min-h-screen w-full bg-muted/30 flex items-center justify-center p-6 text-center">
      <div className="max-w-md flex flex-col items-center">
        <div className="bg-muted border border-border p-4 rounded-full mb-4">
          <TriangleAlert className="size-8 opacity-40" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Couldn't Load Hotels</h2>
        <p className="text-muted-foreground mb-6">{error.message}</p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          <RefreshCw className="size-4 mr-2" />
          Try Again
        </Button>
      </div>
    </div>
  ),
  component: HotelSelector,
});
