import { AttendancePage } from "@/app/pages/Attendance/AttendancePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/attendance/")({
  component: AttendancePage,
});
