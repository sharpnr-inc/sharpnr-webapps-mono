import { createFileRoute } from "@tanstack/react-router";
import { PersonStanding } from "lucide-react";
import { lazy } from "react";

const HrEmployeePageLazy = lazy(() =>
  import("@/components/RoutesPages/sharp_hr/HrEmployeePage")
);

export const Route = createFileRoute(
  "/dashboard/_layout/sharp_hr/employee"
)({
  component: HrEmployeePageLazy,
  context: () => ({
    heading: "Employees Management",
    subheading: "Manage Employee Operations",
    HeaderIcon: PersonStanding,
  }),
});
