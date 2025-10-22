
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

function HrEmployeesManagementSection(){
  return(<div>This is Just Employee Page</div>)
}
