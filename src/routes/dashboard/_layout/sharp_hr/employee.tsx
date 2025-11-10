
import HrEmployeePage from "@/components/RoutesPages/sharp_hr/HrEmployeePage";
import { createFileRoute } from "@tanstack/react-router";
import { PersonStanding } from "lucide-react";

export const Route = createFileRoute("/dashboard/_layout/sharp_hr/employee")({
  component: HrEmployeePage,
  context: () => ({
    heading: "Employees Management",
    subheading: "Manage Employee Operations",
    HeaderIcon: PersonStanding,
  }),
});
