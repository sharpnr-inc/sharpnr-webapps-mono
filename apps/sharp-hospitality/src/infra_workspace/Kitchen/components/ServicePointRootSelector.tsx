import React from "react";
import { motion } from "framer-motion";
import { Utensils, MapPin } from "lucide-react";
import { Card, CardContent } from "@sharpnr/ui";
import { useNavigate } from "@tanstack/react-router";
import { Route } from "@/routes/workspace/_modules/infra/kitchen/index";

const ServicePointRootSelector: React.FC = () => {
  const nav = useNavigate();
  const { infras } = Route.useLoaderData();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-muted/30">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 max-w-6xl w-full">
        {infras?.map((infra: any, index: number) => (
          <motion.div
            key={infra.ID}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              onClick={() =>
                nav({
                  to: "/workspace/infra/kitchen/$service_point/service",
                  params: {
                    service_point: infra.ID, // 👈 REAL ID
                  },
                })
              }
              className="cursor-pointer border-border/60 hover:shadow-lg transition-all"
            >
              <CardContent className="flex flex-col items-start p-6 space-y-4">
                <motion.div whileHover={{ rotate: 6 }}>
                  <div className="bg-primary/10 text-primary p-3 rounded-xl">
                    <Utensils size={22} />
                  </div>
                </motion.div>

                <div className="space-y-1">
                  <h3 className="text-lg font-semibold tracking-tight">
                    {infra.Name}
                  </h3>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="size-3.5" />
                    <span>
                      {infra.Property?.City}, {infra.Property?.State || "—"}
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    {infra.Property?.Name}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ServicePointRootSelector;
