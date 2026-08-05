import { AttendancePage } from "@/app/attendance/pages/AttendancePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/attendance/")({
  component: AttendancePage,
});
