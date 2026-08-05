import { AttendancePage } from "@/app/Attendance/AttendancePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/attendance/")({
  component: AttendancePage,
});
