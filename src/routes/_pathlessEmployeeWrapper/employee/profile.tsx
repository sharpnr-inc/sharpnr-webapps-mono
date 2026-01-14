import EmployeeProfilePage from "@/_employee_app/pages/profile/EmployeeProfilePage";
import { createFileRoute } from "@tanstack/react-router";
import { PersonStanding } from "lucide-react";

export const Route = createFileRoute("/_pathlessEmployeeWrapper/employee/profile")({
  component: EmployeeProfilePage,
  context: () => ({
    heading: "Employees Profile",
    subheading: "Manage your Profile",
    HeaderIcon: PersonStanding,
  }),
});
