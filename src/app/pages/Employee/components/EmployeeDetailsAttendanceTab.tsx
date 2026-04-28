import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EmployeeDetailsAttendanceTabProps {
  employeeId: string;
}

export default function EmployeeDetailsAttendanceTab({
  employeeId,
}: EmployeeDetailsAttendanceTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance Logs</CardTitle>
      </CardHeader>

      <CardContent className="text-sm text-muted-foreground">
        Attendance records for employee:
        <span className="ml-2 font-mono">{employeeId}</span>

        <div className="mt-2">
          Daily check-in / check-out logs and monthly attendance summary will be
          displayed here.
        </div>
      </CardContent>
    </Card>
  );
}