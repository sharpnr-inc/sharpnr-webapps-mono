import { useNavigate } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, ArrowRight, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Route } from "@/routes/_appuser/dashboard/sharp_hospitality/restaurant/index";
import { useSetRestaurant } from "../store/selectors";
import { useEffect } from "react";

export default function RestaurantSelector() {
  const navigate = useNavigate();
  const { restaurants } = Route.useLoaderData();
  const setRestaurant = useSetRestaurant();

  // ⭐ Auto-select if only one restaurant exists
  useEffect(() => {
    if (restaurants?.length === 1) {
      const restaurant = restaurants[0];
      setRestaurant(restaurant);

      navigate({
        to: "/dashboard/sharp_hospitality/restaurant/overview",
      });
    }
  }, [restaurants, setRestaurant, navigate]);

  // Optional: prevent flash of UI while redirecting
  if (restaurants?.length === 1) return null;

  return (
    <div className="min-h-screen w-full bg-muted/30 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl">
        <h1 className="text-3xl font-bold mb-2">Select Restaurant</h1>
        <p className="text-muted-foreground mb-8">
          Choose a restaurant to open the dashboard
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {restaurants?.map((restaurant: any, index: number) => (
            <motion.div
              key={restaurant.ID}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.05,
              }}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                onClick={() => {
                  setRestaurant(restaurant);
                  navigate({
                    to: "/dashboard/sharp_hospitality/restaurant/overview",
                  });
                }}
                className="cursor-pointer border-border/60 transition-shadow hover:shadow-lg"
              >
                <CardHeader className="flex flex-row items-center gap-3 pb-2">
                  <div className="bg-primary/10 text-primary p-2 rounded-xl">
                    <Building2 className="size-5" />
                  </div>

                  <CardTitle className="text-base font-semibold">
                    {restaurant.Name}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-1 pt-2">
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

                    <ArrowRight className="size-4 opacity-60" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
