import HrEmployeesManagementSection from "@/ui_modules/HR/Employees/HrEmployeeManagement";
import { createFileRoute } from "@tanstack/react-router";
import { PersonStanding } from "lucide-react";

export const Route = createFileRoute("/dashboard/_layout/sharphr/employee")({
  component: HrEmployeesManagementSection,
  context: () => ({
    heading: "Employees Managment",
    subheading: "Manage Emplyee Operations",
    HeaderIcon: PersonStanding,
  }),
});
