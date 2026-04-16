import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Hotel, UtensilsCrossed, Wine } from "lucide-react";

export function SharpHospitalityAboutPage() {
  const modules = [
    {
      title: "Restaurant Management",
      description:
        "Manage orders, tables, menus, kitchen workflows, billing, and inventory with real-time syncing across outlets.",
      icon: <UtensilsCrossed size={22} />,
      tag: "POS + Kitchen",
    },
    {
      title: "Hotel Management",
      description:
        "Handle reservations, guest check-ins, housekeeping, room allocation, invoicing, and multi-property control.",
      icon: <Hotel size={22} />,
      tag: "Rooms + Guests",
    },
    {
      title: "Bar Management",
      description:
        "Track liquor inventory, manage bar POS workflows, monitor consumption analytics, and control wastage.",
      icon: <Wine size={22} />,
      tag: "Liquor + POS",
    },
  ];

  return (
    <div className="min-h-screen px-6 py-12 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10"
      >
        <Badge className="mb-3">Sharpnr Suite</Badge>

        <h1 className="text-4xl font-bold tracking-tight">
          Sharpnr Hospitality
        </h1>

        <p className="text-muted-foreground mt-3 max-w-2xl">
          Run Restaurants, Hotels, and Bars from one unified platform — or
          operate them independently depending on your business structure. Built
          for single outlets to multi-location hospitality groups.
        </p>

        <div className="flex gap-3 mt-6">
          <Button>
            Launch Hospitality
            <ArrowRight className="ml-2" size={16} />
          </Button>

          <Button variant="outline">View Documentation</Button>
        </div>
      </motion.div>

      {/* Sync Mode Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="grid md:grid-cols-2 gap-6 mb-10"
      >
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold">Unified Mode</h2>

            <p className="text-sm text-muted-foreground mt-2">
              Connect Restaurant, Hotel, and Bar operations together. Share
              inventory, customers, billing flows, accounting, and reporting
              across your entire hospitality ecosystem.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold">Independent Mode</h2>

            <p className="text-sm text-muted-foreground mt-2">
              Run each module separately. Ideal for standalone restaurants,
              boutique hotels, or independent bars that don't require shared
              operational syncing.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Modules Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {modules.map((module, index) => (
          <motion.div
            key={module.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
          >
            <Card className="hover:shadow-xl transition-shadow rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-muted-foreground">
                  {module.icon}
                  <span className="text-xs uppercase tracking-wide">
                    {module.tag}
                  </span>
                </div>

                <h3 className="text-lg font-semibold mt-3">{module.title}</h3>

                <p className="text-sm text-muted-foreground mt-2">
                  {module.description}
                </p>

                <Button variant="ghost" className="mt-4 px-0 text-primary">
                  Explore Module →
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
