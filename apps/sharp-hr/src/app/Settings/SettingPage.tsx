import { Building, Clock, Bell, Shield, FileText } from "lucide-react";

import { motion, easeOut, type Variants } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: easeOut,
    },
  },
};

const settingsModules = [
  {
    title: "Company Profile",
    description: "Manage company name, logo, timezone, address",
    icon: Building,
  },
  {
    title: "Attendance Rules",
    description: "Configure shifts, working hours, late rules",
    icon: Clock,
  },
  {
    title: "Leave Policies",
    description: "Define leave types and yearly limits",
    icon: FileText,
  },
  {
    title: "Notifications",
    description: "Email alerts, reminders and announcements",
    icon: Bell,
  },
  {
    title: "Roles & Permissions",
    description: "Manage admin, HR and employee access control",
    icon: Shield,
  },
];

export function SettingsPage() {
  return (
    <motion.div
      className="p-6 space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={cardVariants}>
        <h1 className="text-2xl font-semibold">System Settings ⚙️</h1>

        <p className="text-muted-foreground text-sm">
          Configure organization policies and HR workflow preferences
        </p>
      </motion.div>

      {/* Settings Modules Grid */}
      <motion.div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
      >
        {settingsModules.map((module, index) => {
          const Icon = module.icon;

          return (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                y: -6,
                scale: 1.02,
              }}
            >
              <Card className="cursor-pointer">
                <CardContent className="p-5 flex gap-4">
                  <Icon className="w-6 h-6 mt-1" />

                  <div>
                    <h2 className="font-semibold">{module.title}</h2>

                    <p className="text-sm text-muted-foreground">
                      {module.description}
                    </p>

                    <Button size="sm" variant="outline" className="mt-3">
                      Configure
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
