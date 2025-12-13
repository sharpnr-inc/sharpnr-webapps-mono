import HrMainLayout from "@/_hrapp/pages/HrMainLayout";
import { createFileRoute } from "@tanstack/react-router";
import { PersonStanding } from "lucide-react";

export const Route = createFileRoute(
  "/dashboard/(dashboard)/sharp_hr/employee"
)({
  component: HrMainLayout,
  context: () => ({
    heading: "Employees Management",
    subheading: "Manage Employee Operations",
    HeaderIcon: PersonStanding,
  }),
});
