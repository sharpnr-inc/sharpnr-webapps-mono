import EmployeeProfilePage from "@/components/RoutesPages/employees/EmployeeProfilePage";
import { createFileRoute } from "@tanstack/react-router";
import { PersonStanding } from "lucide-react";

export const Route = createFileRoute("/dashboard/_layout/employee/profile")({
  component: EmployeeProfilePage,
  context: () => ({
    heading: "Employees Profile",
    subheading: "Manage your Profile",
    HeaderIcon: PersonStanding,
  }),
});
