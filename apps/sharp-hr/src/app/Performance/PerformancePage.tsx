import { BarChart3, Star, Clock } from "lucide-react";
import { motion, easeOut, type Variants } from "framer-motion";

import { Card, CardContent } from "@sharpnr/ui";
import { Button } from "@sharpnr/ui";
import { Input } from "@sharpnr/ui";

type PerformanceRecord = {
  id: string;
  employeeName: string;
  department: string;
  rating: number;
  reviewPeriod: string;
  status: "Completed" | "Pending" | "In Review";
};

const performanceData: PerformanceRecord[] = [
  {
    id: "1",
    employeeName: "Rahul Sharma",
    department: "Engineering",
    rating: 4.5,
    reviewPeriod: "Q1 2026",
    status: "Completed",
  },
  {
    id: "2",
    employeeName: "Aisha Khan",
    department: "HR",
    rating: 3.8,
    reviewPeriod: "Q1 2026",
    status: "In Review",
  },
  {
    id: "3",
    employeeName: "Mohammed Ali",
    department: "Finance",
    rating: 0,
    reviewPeriod: "Q1 2026",
    status: "Pending",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.28,
      ease: easeOut,
    },
  },
};

function statusColor(status: PerformanceRecord["status"]) {
  switch (status) {
    case "Completed":
      return "text-green-600 bg-green-50";
    case "In Review":
      return "text-yellow-600 bg-yellow-50";
    default:
      return "text-gray-600 bg-gray-100";
  }
}

export function PerformancePage() {
  return (
    <motion.div
      className="p-6 space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div
        variants={rowVariants}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <BarChart3 className="w-6 h-6" />

          <h1 className="text-2xl font-semibold">Employee Performance 📈</h1>
        </div>
      </motion.div>

      {/* Search */}
      <motion.div variants={rowVariants}>
        <Input
          placeholder="Search employee performance..."
          className="max-w-sm"
        />
      </motion.div>

      {/* Performance Table */}
      <motion.div variants={rowVariants}>
        <Card>
          <CardContent className="p-5">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-muted-foreground">
                    <th className="text-left py-3">Employee</th>
                    <th className="text-left py-3">Department</th>
                    <th className="text-left py-3">Rating</th>
                    <th className="text-left py-3">Review Period</th>
                    <th className="text-left py-3">Status</th>
                    <th className="text-left py-3">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {performanceData.map((record) => (
                    <motion.tr
                      key={record.id}
                      variants={rowVariants}
                      className="border-b hover:bg-muted/40"
                    >
                      <td className="py-3 font-medium">
                        {record.employeeName}
                      </td>

                      <td className="py-3">{record.department}</td>

                      <td className="py-3 flex items-center gap-1">
                        {record.rating > 0 ? (
                          <>
                            <Star className="w-4 h-4 text-yellow-500" />
                            {record.rating}
                          </>
                        ) : (
                          "—"
                        )}
                      </td>

                      <td className="py-3">{record.reviewPeriod}</td>

                      <td className="py-3">
                        <span
                          className={`text-xs px-2 py-1 rounded-md font-medium ${statusColor(
                            record.status,
                          )}`}
                        >
                          {record.status}
                        </span>
                      </td>

                      <td className="py-3">
                        <Button size="sm" variant="outline">
                          Review
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Performance Summary Cards */}
      <motion.div
        variants={containerVariants}
        className="grid gap-4 md:grid-cols-3"
      >
        {[
          { label: "Completed Reviews", value: 32, icon: Star },
          { label: "Pending Reviews", value: 9, icon: Clock },
          { label: "Avg Rating", value: "4.2", icon: BarChart3 },
        ].map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={index}
              variants={rowVariants}
              whileHover={{ y: -5 }}
            >
              <Card>
                <CardContent className="p-5 flex items-center gap-3">
                  <Icon className="w-5 h-5" />

                  <div>
                    <p className="text-sm text-muted-foreground">
                      {item.label}
                    </p>

                    <p className="text-lg font-semibold">{item.value}</p>
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
