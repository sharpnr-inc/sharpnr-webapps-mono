import { GraduationCap, Users, Clock } from "lucide-react";
import { motion, easeOut, type Variants } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type TrainingRecord = {
  id: string;
  title: string;
  assignedTo: number;
  dueDate: string;
  type: "Mandatory" | "Optional" | "Certification";
  status: "Completed" | "In Progress" | "Pending";
};

const trainings: TrainingRecord[] = [
  {
    id: "1",
    title: "Workplace Safety Training",
    assignedTo: 42,
    dueDate: "May 15, 2026",
    type: "Mandatory",
    status: "In Progress",
  },
  {
    id: "2",
    title: "Leadership Development",
    assignedTo: 12,
    dueDate: "Jun 01, 2026",
    type: "Optional",
    status: "Pending",
  },
  {
    id: "3",
    title: "Data Security Compliance",
    assignedTo: 80,
    dueDate: "Apr 30, 2026",
    type: "Certification",
    status: "Completed",
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

function statusColor(status: TrainingRecord["status"]) {
  switch (status) {
    case "Completed":
      return "text-green-600 bg-green-50";
    case "In Progress":
      return "text-yellow-600 bg-yellow-50";
    default:
      return "text-gray-600 bg-gray-100";
  }
}

function typeColor(type: TrainingRecord["type"]) {
  switch (type) {
    case "Mandatory":
      return "text-red-600 bg-red-50";
    case "Certification":
      return "text-blue-600 bg-blue-50";
    default:
      return "text-gray-600 bg-gray-100";
  }
}

export function TrainingPage() {
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
          <GraduationCap className="w-6 h-6" />

          <h1 className="text-2xl font-semibold">Employee Training 🎓</h1>
        </div>

        <Button>Add Training Program</Button>
      </motion.div>

      {/* Search */}
      <motion.div variants={rowVariants}>
        <Input placeholder="Search training programs..." className="max-w-sm" />
      </motion.div>

      {/* Training Table */}
      <motion.div variants={rowVariants}>
        <Card>
          <CardContent className="p-5">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-muted-foreground">
                    <th className="text-left py-3">Training</th>
                    <th className="text-left py-3">Assigned</th>
                    <th className="text-left py-3">Due Date</th>
                    <th className="text-left py-3">Type</th>
                    <th className="text-left py-3">Status</th>
                    <th className="text-left py-3">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {trainings.map((training) => (
                    <motion.tr
                      key={training.id}
                      variants={rowVariants}
                      className="border-b hover:bg-muted/40"
                    >
                      <td className="py-3 font-medium">{training.title}</td>

                      <td className="py-3">{training.assignedTo} Employees</td>

                      <td className="py-3">{training.dueDate}</td>

                      <td className="py-3">
                        <span
                          className={`text-xs px-2 py-1 rounded-md font-medium ${typeColor(
                            training.type,
                          )}`}
                        >
                          {training.type}
                        </span>
                      </td>

                      <td className="py-3">
                        <span
                          className={`text-xs px-2 py-1 rounded-md font-medium ${statusColor(
                            training.status,
                          )}`}
                        >
                          {training.status}
                        </span>
                      </td>

                      <td className="py-3">
                        <Button size="sm" variant="outline">
                          Manage
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

      {/* Summary Cards */}
      <motion.div
        variants={containerVariants}
        className="grid gap-4 md:grid-cols-3"
      >
        {[
          { label: "Mandatory Trainings", value: 6, icon: Clock },
          { label: "Completed Trainings", value: 24, icon: GraduationCap },
          { label: "Active Learners", value: 58, icon: Users },
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
