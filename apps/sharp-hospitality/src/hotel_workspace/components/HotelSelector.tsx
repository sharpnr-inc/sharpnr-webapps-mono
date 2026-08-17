import { useNavigate } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@sharpnr/ui";
import { Button } from "@sharpnr/ui";
import { Hotel as HotelIcon, ArrowRight, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Route } from "@/routes/workspace/_modules/hotel/index";
import { useEffect } from "react";
import type { Hotel } from "@/hotel_workspace/apis/api.service";
import { toast } from "sonner";
import { config } from "@sharpnr/env";

export function HotelSelector() {
  const navigate = useNavigate();
  const { hotels } = Route.useLoaderData();

  const autoSelect =
    hotels?.length === 1 && hotels[0].IsActive && hotels[0].IsConfigured
      ? hotels[0]
      : null;

  useEffect(() => {
    if (!autoSelect) return;

    navigate({
      to: "/workspace/hotel/$hotelID/overview",
      params: {
        hotelID: autoSelect.ID,
      },
    });
  }, [autoSelect, navigate]);

  if (autoSelect) return null;

  if (!hotels || hotels.length === 0) {
    return (
      <div className="min-h-screen w-full bg-muted/30 flex items-center justify-center p-6 text-center">
        <div className="max-w-md flex flex-col items-center">
          <div className="bg-muted border border-border p-4 rounded-full mb-4">
            <HotelIcon className="size-8 opacity-40" />
          </div>
          <h2 className="text-2xl font-bold mb-2">No Hotels Found</h2>
          <p className="text-muted-foreground mb-6">
            You haven't added any hotels yet. Create your first one to get
            started.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              window.location.href = config.orchestratorAppUrl;
            }}
          >
            <Plus className="size-4 mr-2" />
            Create Hotel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-muted/30 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl">
        <h1 className="text-3xl font-bold mb-2">Select Hotel</h1>

        <p className="text-muted-foreground mb-8">
          Choose a hotel to open the dashboard
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {hotels.map((hotel: Hotel, index: number) => {
            const isDisabled = !hotel.IsActive || !hotel.IsConfigured;

            let disabledMessage = "";

            if (!hotel.IsConfigured) {
              disabledMessage =
                "Hotel is not configured. Configure it in Orchestrator → Property section";
            } else if (!hotel.IsActive) {
              disabledMessage = "Activate the hotel from Orchestrator";
            }

            return (
              <motion.div
                key={hotel.ID}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                }}
                whileHover={!isDisabled ? { y: -5 } : undefined}
                whileTap={!isDisabled ? { scale: 0.98 } : undefined}
              >
                <Card
                  onClick={() => {
                    if (isDisabled) return;

                    navigate({
                      to: "/workspace/hotel/$hotelID/overview",
                      params: {
                        hotelID: hotel.ID,
                      },
                    });

                    toast.success(`Entered ${hotel.Name}`);
                  }}
                  className={`border-border/60 transition-shadow ${
                    isDisabled
                      ? "cursor-not-allowed opacity-60"
                      : "cursor-pointer hover:shadow-lg"
                  }`}
                >
                  <CardHeader className="flex flex-row items-center gap-3 pb-2">
                    <div className="bg-muted border border-border p-2 rounded-xl">
                      <HotelIcon className="size-5" />
                    </div>

                    <CardTitle className="text-base font-semibold">
                      {hotel.Name}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-2 pt-2">
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-muted-foreground">
                        Updated{" "}
                        {new Date(hotel.LastUpdatedAt).toLocaleDateString()}
                      </span>

                      {!isDisabled && (
                        <ArrowRight className="size-4 opacity-60" />
                      )}
                    </div>

                    {isDisabled && (
                      <p className="text-xs font-medium pt-1">
                        {disabledMessage}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
