import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Building2, UtensilsCrossed, Wine } from "lucide-react";

const modules = [
  {
    title: "Hotel Management",
    description:
      "Reservations, check-ins, housekeeping and complete guest lifecycle management.",
    icon: Building2,
    link: "/hotel",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    title: "Restaurant Management",
    description:
      "Orders, tables, menus, billing and kitchen workflow automation.",
    icon: UtensilsCrossed,
    link: "/restaurant",
    gradient: "from-orange-500 to-red-500",
  },
  {
    title: "Bar Management",
    description:
      "POS operations, beverage tracking and inventory shift control.",
    icon: Wine,
    link: "/bar",
    gradient: "from-emerald-500 to-teal-500",
  },
];

export function ModuleSelectorPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight">
            Select Your Workspace
          </h1>

          <p className="text-muted-foreground mt-3 text-lg">
            Manage your hospitality operations across hotel, restaurant and bar
            — independently or fully connected inside Sharp Hospitality.
          </p>
        </div>

        {/* Module Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((module) => {
            const Icon = module.icon;

            return (
              <Card
                key={module.title}
                onClick={() => window.open(module.link, "_self")}
                className="group relative cursor-pointer border hover:border-primary/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <CardContent className="p-7 space-y-5">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 flex items-center justify-center rounded-2xl bg-linear-to-br ${module.gradient} text-white shadow-md`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-semibold">{module.title}</h2>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {module.description}
                  </p>

                  {/* Footer CTA */}
                  <div className="flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition">
                    Open Workspace
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
