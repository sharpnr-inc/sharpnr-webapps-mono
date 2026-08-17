import { Wallet, CheckCircle2, Clock } from "lucide-react";
import { motion, easeOut, type Variants } from "framer-motion";

import { Card, CardContent } from "@sharpnr/ui";
import { Button } from "@sharpnr/ui";
import { Input } from "@sharpnr/ui";

type PayrollRecord = {
  id: string;
  employeeName: string;
  department: string;
  salary: string;
  month: string;
  status: "Paid" | "Pending" | "Processing";
};

const payrollData: PayrollRecord[] = [
  {
    id: "1",
    employeeName: "Rahul Sharma",
    department: "Engineering",
    salary: "₹75,000",
    month: "April 2026",
    status: "Paid",
  },
  {
    id: "2",
    employeeName: "Aisha Khan",
    department: "HR",
    salary: "₹55,000",
    month: "April 2026",
    status: "Processing",
  },
  {
    id: "3",
    employeeName: "Mohammed Ali",
    department: "Finance",
    salary: "₹62,000",
    month: "April 2026",
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

function statusColor(status: PayrollRecord["status"]) {
  switch (status) {
    case "Paid":
      return "text-green-600 bg-green-50";
    case "Processing":
      return "text-yellow-600 bg-yellow-50";
    default:
      return "text-gray-600 bg-gray-100";
  }
}

export function PayrollPage() {
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
          <Wallet className="w-6 h-6" />

          <h1 className="text-2xl font-semibold">Payroll Management 💰</h1>
        </div>
      </motion.div>

      {/* Search */}
      <motion.div variants={rowVariants}>
        <Input placeholder="Search employee payroll..." className="max-w-sm" />
      </motion.div>

      {/* Payroll Table */}
      <motion.div variants={rowVariants}>
        <Card>
          <CardContent className="p-5">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-muted-foreground">
                    <th className="text-left py-3">Employee</th>
                    <th className="text-left py-3">Department</th>
                    <th className="text-left py-3">Salary</th>
                    <th className="text-left py-3">Month</th>
                    <th className="text-left py-3">Status</th>
                    <th className="text-left py-3">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {payrollData.map((record) => (
                    <motion.tr
                      key={record.id}
                      variants={rowVariants}
                      className="border-b hover:bg-muted/40"
                    >
                      <td className="py-3 font-medium">
                        {record.employeeName}
                      </td>

                      <td className="py-3">{record.department}</td>

                      <td className="py-3">{record.salary}</td>

                      <td className="py-3">{record.month}</td>

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
                          Process Payroll
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

      {/* Payroll Summary Cards */}
      <motion.div
        variants={containerVariants}
        className="grid gap-4 md:grid-cols-3"
      >
        {[
          { label: "Paid Employees", value: 42, icon: CheckCircle2 },
          { label: "Processing Payroll", value: 8, icon: Clock },
          { label: "Pending Payroll", value: 5, icon: Wallet },
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
