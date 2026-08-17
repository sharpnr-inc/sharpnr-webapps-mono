import { UserPlus, FileCheck, Clock } from "lucide-react";
import { motion, easeOut, type Variants } from "framer-motion";

import { Card, CardContent } from "@sharpnr/ui";
import { Button } from "@sharpnr/ui";
import { Input } from "@sharpnr/ui";

type OnboardingRecord = {
  id: string;
  employeeName: string;
  role: string;
  startDate: string;
  status: "Pending" | "In Progress" | "Completed";
};

const onboardingList: OnboardingRecord[] = [
  {
    id: "1",
    employeeName: "Aisha Khan",
    role: "Frontend Developer",
    startDate: "May 02, 2026",
    status: "Pending",
  },
  {
    id: "2",
    employeeName: "Rahul Sharma",
    role: "HR Executive",
    startDate: "Apr 29, 2026",
    status: "In Progress",
  },
  {
    id: "3",
    employeeName: "Mohammed Ali",
    role: "Accountant",
    startDate: "Apr 20, 2026",
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: easeOut,
    },
  },
};

function statusColor(status: OnboardingRecord["status"]) {
  switch (status) {
    case "Completed":
      return "text-green-600 bg-green-50";
    case "In Progress":
      return "text-yellow-600 bg-yellow-50";
    default:
      return "text-gray-600 bg-gray-100";
  }
}

export function OnBoardingPage() {
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
          <UserPlus className="w-6 h-6" />

          <h1 className="text-2xl font-semibold">Employee Onboarding 🚀</h1>
        </div>

        <Button className="flex items-center gap-2">
          <FileCheck className="w-4 h-4" />
          Add New Hire
        </Button>
      </motion.div>

      {/* Search */}
      <motion.div variants={rowVariants}>
        <Input placeholder="Search new hires..." className="max-w-sm" />
      </motion.div>

      {/* Onboarding Table */}
      <motion.div variants={rowVariants}>
        <Card>
          <CardContent className="p-5">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-muted-foreground">
                    <th className="text-left py-3">Employee</th>
                    <th className="text-left py-3">Role</th>
                    <th className="text-left py-3">Start Date</th>
                    <th className="text-left py-3">Status</th>
                    <th className="text-left py-3">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {onboardingList.map((employee) => (
                    <motion.tr
                      key={employee.id}
                      variants={rowVariants}
                      className="border-b hover:bg-muted/40"
                    >
                      <td className="py-3 font-medium">
                        {employee.employeeName}
                      </td>

                      <td className="py-3">{employee.role}</td>

                      <td className="py-3">{employee.startDate}</td>

                      <td className="py-3">
                        <span
                          className={`text-xs px-2 py-1 rounded-md font-medium ${statusColor(
                            employee.status,
                          )}`}
                        >
                          {employee.status}
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

      {/* Quick Summary Cards */}
      <motion.div
        variants={containerVariants}
        className="grid gap-4 md:grid-cols-3"
      >
        {[
          { label: "Pending", value: 5, icon: Clock },
          { label: "In Progress", value: 3, icon: FileCheck },
          { label: "Completed", value: 12, icon: UserPlus },
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
