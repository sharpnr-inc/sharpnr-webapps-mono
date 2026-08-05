import { Users, Clock, CalendarCheck, FileText, UserPlus } from "lucide-react";

import { motion, type Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut",
    } as const,
  },
};

export function DashBoardPage() {
  return (
    <motion.div
      className="p-6 space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={cardVariants}>
        <h1 className="text-2xl font-semibold">HR Dashboard 📊</h1>

        <p className="text-muted-foreground text-sm">
          Overview of employee activity and organization status
        </p>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        variants={containerVariants}
      >
        {[
          {
            label: "Total Employees",
            value: "124",
            icon: Users,
          },
          {
            label: "Present Today",
            value: "109",
            icon: CalendarCheck,
          },
          {
            label: "Late Arrivals",
            value: "7",
            icon: Clock,
          },
          {
            label: "On Leave",
            value: "8",
            icon: FileText,
          },
        ].map((stat, index) => {
          const Icon = stat.icon;

          return (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                y: -6,
                scale: 1.02,
              }}
            >
              <Card>
                <CardContent className="p-5 flex items-center gap-4">
                  <Icon className="w-6 h-6" />

                  <div>
                    <p className="text-sm text-muted-foreground">
                      {stat.label}
                    </p>

                    <p className="text-xl font-semibold">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Quick Actions */}
      <motion.div className="space-y-3" variants={cardVariants}>
        <h2 className="font-semibold text-lg">Quick Actions ⚡</h2>

        <div className="flex flex-wrap gap-3">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button className="flex gap-2 items-center">
              <UserPlus className="w-4 h-4" />
              Add Employee
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }}>
            <Button variant="outline">View Attendance</Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }}>
            <Button variant="outline">Create Announcement</Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }}>
            <Button variant="outline">Upload Policy</Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Recent Announcements */}
      <motion.div variants={cardVariants}>
        <Card>
          <CardContent className="p-5 space-y-3">
            <h2 className="font-semibold text-lg">Recent Announcements 📢</h2>

            {[
              "Office closed Friday due to maintenance.",
              "Updated HR handbook available.",
              "Submit timesheets before end of week.",
            ].map((announcement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
                className="text-sm"
              >
                {announcement}
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
