
import HrEmployeePage from "@/components/UiModuels/sharp_hr/HrEmployeePage";
import { createFileRoute } from "@tanstack/react-router";
import { PersonStanding } from "lucide-react";

export const Route = createFileRoute("/dashboard/_layout/sharp_hr/employee")({
  component: HrEmployeePage,
  context: () => ({
    heading: "Employees Managment",
    subheading: "Manage Emplyee Operations",
    HeaderIcon: PersonStanding,
  }),
});
