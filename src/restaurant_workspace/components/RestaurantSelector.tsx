import { useNavigate } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // Added Button import
import { Building2, ArrowRight, MapPin, Plus } from "lucide-react"; // Added Plus icon
import { motion } from "framer-motion";
import { Route } from "@/routes/workspace/_user/restaurant/index";
import { useEffect } from "react";
import type { RestaurantContext } from "../apis/restaurant.api";
import { toast } from "sonner";
import { config } from "@/configs/env";

export default function RestaurantSelector() {
  const navigate = useNavigate();
  const { restaurants } = Route.useLoaderData();

  // ⭐ Auto-select if only one restaurant exists
  useEffect(() => {
    if (restaurants?.length === 1) {
      const restaurant = restaurants[0];

      if (!restaurant.IsActive && restaurant.IsConfigured) {
        navigate({
          to: "/restaurant/$restaurantID/overview",
          params: {
            restaurantID: restaurant.ID,
          },
        });
      }
    }
  }, [restaurants, navigate]);

  // Prevent flash if redirecting
  if (restaurants?.length === 1) return null;

  // ⭐ Empty state condition
  if (!restaurants || restaurants.length === 0) {
    return (
      <div className="min-h-screen w-full bg-muted/30 flex items-center justify-center p-6 text-center">
        <div className="max-w-md flex flex-col items-center">
          <div className="bg-muted border border-border p-4 rounded-full mb-4">
            <Building2 className="size-8 opacity-40" />
          </div>
          <h2 className="text-2xl font-bold mb-2">No Restaurants Found</h2>
          <p className="text-muted-foreground mb-6">
            You haven't added any restaurants yet. Create your first one to get
            started.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              // Adjust this path to your actual creation route
              window.location.href = config.orchestratorAppUrl;
            }}
          >
            <Plus className="size-4 mr-2" />
            Create Restaurant
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-muted/30 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl">
        <h1 className="text-3xl font-bold mb-2">Select Restaurant</h1>

        <p className="text-muted-foreground mb-8">
          Choose a restaurant to open the dashboard
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {restaurants?.map((restaurant: RestaurantContext, index: number) => {
            const isDisabled = !restaurant.IsActive || !restaurant.IsConfigured;

            let disabledMessage = "";

            if (restaurant.IsConfigured && !restaurant.IsActive) {
              disabledMessage = "Activate the restaurant from Orchestrator";
            }

            if (!restaurant.IsConfigured && !restaurant.IsActive) {
              disabledMessage =
                "Restaurant is not configured. Configure it in Orchestrator → Property section";
            }

            return (
              <motion.div
                key={restaurant.ID}
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
                      to: "/restaurant/$restaurantID/overview",
                      params: {
                        restaurantID: restaurant.ID,
                      },
                    });

                    toast.success(`Entered ${restaurant.Name}`, {
                      description: `${restaurant.Property?.City}, ${restaurant.Property?.State}`,
                    });
                  }}
                  className={`border-border/60 transition-shadow ${
                    isDisabled
                      ? "cursor-not-allowed opacity-60"
                      : "cursor-pointer hover:shadow-lg"
                  }`}
                >
                  <CardHeader className="flex flex-row items-center gap-3 pb-2">
                    <div className="bg-muted border border-border p-2 rounded-xl">
                      <Building2 className="size-5" />
                    </div>

                    <CardTitle className="text-base font-semibold">
                      {restaurant.Name}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-2 pt-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="size-3.5" />

                      <span>
                        {restaurant.Property?.City},{" "}
                        {restaurant.Property?.State || "—"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-muted-foreground">
                        {restaurant.Property?.Name}
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
