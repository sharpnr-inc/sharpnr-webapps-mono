import { CalendarClock, Check, X } from "lucide-react";
import { motion, easeOut, type Variants } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type LeaveRequest = {
  id: string;
  employeeName: string;
  leaveType: "Casual" | "Sick" | "Annual";
  fromDate: string;
  toDate: string;
  status: "Pending" | "Approved" | "Rejected";
};

const leaveRequests: LeaveRequest[] = [
  {
    id: "1",
    employeeName: "Rahul Sharma",
    leaveType: "Casual",
    fromDate: "May 02, 2026",
    toDate: "May 04, 2026",
    status: "Pending",
  },
  {
    id: "2",
    employeeName: "Aisha Khan",
    leaveType: "Sick",
    fromDate: "Apr 28, 2026",
    toDate: "Apr 29, 2026",
    status: "Approved",
  },
  {
    id: "3",
    employeeName: "Mohammed Ali",
    leaveType: "Annual",
    fromDate: "May 10, 2026",
    toDate: "May 18, 2026",
    status: "Rejected",
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
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: easeOut,
    },
  },
};

function statusColor(status: LeaveRequest["status"]) {
  switch (status) {
    case "Approved":
      return "text-green-600 bg-green-50";
    case "Rejected":
      return "text-red-600 bg-red-50";
    default:
      return "text-yellow-600 bg-yellow-50";
  }
}

export function LeavesPage() {
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
          <CalendarClock className="w-6 h-6" />

          <h1 className="text-2xl font-semibold">Leave Requests 🌴</h1>
        </div>
      </motion.div>

      {/* Search */}
      <motion.div variants={rowVariants}>
        <Input placeholder="Search employee..." className="max-w-sm" />
      </motion.div>

      {/* Leave Requests Table */}
      <motion.div variants={rowVariants}>
        <Card>
          <CardContent className="p-5">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-muted-foreground">
                    <th className="text-left py-3">Employee</th>
                    <th className="text-left py-3">Leave Type</th>
                    <th className="text-left py-3">From</th>
                    <th className="text-left py-3">To</th>
                    <th className="text-left py-3">Status</th>
                    <th className="text-left py-3">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {leaveRequests.map((leave) => (
                    <motion.tr
                      key={leave.id}
                      variants={rowVariants}
                      className="border-b hover:bg-muted/40"
                    >
                      <td className="py-3 font-medium">{leave.employeeName}</td>

                      <td className="py-3">{leave.leaveType}</td>

                      <td className="py-3">{leave.fromDate}</td>

                      <td className="py-3">{leave.toDate}</td>

                      <td className="py-3">
                        <span
                          className={`text-xs px-2 py-1 rounded-md font-medium ${statusColor(
                            leave.status,
                          )}`}
                        >
                          {leave.status}
                        </span>
                      </td>

                      <td className="py-3 flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex gap-1"
                        >
                          <Check className="w-3 h-3" />
                          Approve
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          className="flex gap-1"
                        >
                          <X className="w-3 h-3" />
                          Reject
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
    </motion.div>
  );
}
