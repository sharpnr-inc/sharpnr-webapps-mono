import { Building2, Plus } from "lucide-react";
import { motion, easeOut, type Variants } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Department = {
  id: string;
  name: string;
  head: string;
  employees: number;
  status: "Active" | "Archived";
};

const departments: Department[] = [
  {
    id: "1",
    name: "Engineering",
    head: "Ahmed Khan",
    employees: 42,
    status: "Active",
  },
  {
    id: "2",
    name: "Human Resources",
    head: "Fatima Noor",
    employees: 8,
    status: "Active",
  },
  {
    id: "3",
    name: "Finance",
    head: "Ali Raza",
    employees: 6,
    status: "Archived",
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
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: easeOut,
    },
  },
};

function statusColor(status: Department["status"]) {
  return status === "Active"
    ? "text-green-600 bg-green-50"
    : "text-gray-600 bg-gray-100";
}

export function DepartmentsPage() {
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
          <Building2 className="w-6 h-6" />

          <h1 className="text-2xl font-semibold">Departments 🏢</h1>
        </div>

        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Department
        </Button>
      </motion.div>

      {/* Search */}
      <motion.div variants={rowVariants}>
        <Input placeholder="Search department..." className="max-w-sm" />
      </motion.div>

      {/* Departments Table */}
      <motion.div variants={rowVariants}>
        <Card>
          <CardContent className="p-5">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-muted-foreground">
                    <th className="text-left py-3">Department</th>
                    <th className="text-left py-3">Head</th>
                    <th className="text-left py-3">Employees</th>
                    <th className="text-left py-3">Status</th>
                    <th className="text-left py-3">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {departments.map((dept) => (
                    <motion.tr
                      key={dept.id}
                      variants={rowVariants}
                      className="border-b hover:bg-muted/40"
                    >
                      <td className="py-3 font-medium">{dept.name}</td>

                      <td className="py-3">{dept.head}</td>

                      <td className="py-3">{dept.employees}</td>

                      <td className="py-3">
                        <span
                          className={`text-xs px-2 py-1 rounded-md font-medium ${statusColor(
                            dept.status,
                          )}`}
                        >
                          {dept.status}
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
    </motion.div>
  );
}
