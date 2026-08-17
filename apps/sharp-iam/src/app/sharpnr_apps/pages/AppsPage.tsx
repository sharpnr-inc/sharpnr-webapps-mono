import { motion } from "framer-motion";
import { Card, CardContent } from "@sharpnr/ui";
import { Button } from "@sharpnr/ui";
import { ArrowRight } from "lucide-react";
import { config } from "@sharpnr/env";

const apps = [
  {
    name: "Orchestrator",
    description:
      "Unified business orchestration platform for managing workflows, approvals, and automation across your organization.",
    tag: "Core Platform",
    link: config.orchestratorAppUrl,
  },
  {
    name: "Sharpnr Hospitality",
    description:
      "Manage hotels, restaurants, bookings, inventory, and guest experiences from one powerful dashboard.",
    tag: "Hospitality",
    link: config.hospitalityAppUrl,
  },
  {
    name: "Sharpnr Accounting",
    description:
      "Smart accounting with journal entries, GST reporting, ledgers, financial statements, and automation-ready workflows.",
    tag: "Finance",
    link: config.accountingAppUrl,
  },
  {
    name: "Sharpnr HR",
    description:
      "Employee lifecycle management including onboarding, attendance, payroll integrations, and performance tracking.",
    tag: "People Ops",
    link: config.hrAppUrl,
  },
  {
    name: "Sharpnr Marketing",
    description:
      "Campaign orchestration, audience segmentation, engagement tracking, and automation for growth teams.",
    tag: "Growth",
    link: config.marketingAppUrl,
  },
  {
    name: "Sharpnr Cables",
    description:
      "Connect, collaborate, and stay in sync with your organization through real-time conversations, channels, and team spaces designed for seamless communication.",
    tag: "Communication",
    link: config.cablesAppUrl,
  },
];

export function AppsPage() {
  return (
    <div className=" px-6 py-10 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Sharpnr Apps</h1>
        <p className="text-muted-foreground mt-2">
          Explore the Sharpnr ecosystem. Launch and manage your business
          applications from one unified workspace.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {apps.map((app, index) => (
          <motion.div
            key={app.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="hover:shadow-xl transition-shadow duration-300 rounded-2xl">
              <CardContent className="p-6 flex flex-col justify-between h-full">
                <div>
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {app.tag}
                  </div>

                  <h2 className="text-lg font-semibold mt-2">{app.name}</h2>

                  <p className="text-sm text-muted-foreground mt-2">
                    {app.description}
                  </p>
                </div>

                <div className="mt-6">
                  <Button
                    className="w-full flex items-center justify-center gap-2"
                    onClick={() =>
                      window.open(app.link, "_blank", "noopener,noreferrer")
                    }
                  >
                    Open App
                    <ArrowRight size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
