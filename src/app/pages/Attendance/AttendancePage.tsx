import { CalendarDays } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type AttendanceRecord = {
  id: string;
  employeeName: string;
  department: string;
  checkIn: string;
  checkOut: string;
  status: "Present" | "Absent" | "Late" | "Leave";
};

const attendanceData: AttendanceRecord[] = [
  {
    id: "1",
    employeeName: "Ahmed Khan",
    department: "Engineering",
    checkIn: "09:02 AM",
    checkOut: "06:05 PM",
    status: "Present",
  },
  {
    id: "2",
    employeeName: "Fatima Noor",
    department: "HR",
    checkIn: "09:45 AM",
    checkOut: "06:10 PM",
    status: "Late",
  },
  {
    id: "3",
    employeeName: "Ali Raza",
    department: "Finance",
    checkIn: "-",
    checkOut: "-",
    status: "Absent",
  },
];

function statusColor(status: AttendanceRecord["status"]) {
  switch (status) {
    case "Present":
      return "text-green-600 bg-green-50";
    case "Late":
      return "text-yellow-600 bg-yellow-50";
    case "Leave":
      return "text-blue-600 bg-blue-50";
    default:
      return "text-red-600 bg-red-50";
  }
}

export function AttendancePage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <CalendarDays className="w-6 h-6" />

          <h1 className="text-2xl font-semibold">Employees Attendance 📊</h1>
        </div>

        {/* Search Input */}
        <Input placeholder="Search employee..." className="max-w-sm" />
      </div>

      {/* Attendance Table */}
      <Card>
        <CardContent className="p-5">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-muted-foreground">
                  <th className="text-left py-3">Employee</th>
                  <th className="text-left py-3">Department</th>
                  <th className="text-left py-3">Check In</th>
                  <th className="text-left py-3">Check Out</th>
                  <th className="text-left py-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {attendanceData.map((record) => (
                  <tr key={record.id} className="border-b hover:bg-muted/40">
                    <td className="py-3 font-medium">{record.employeeName}</td>

                    <td className="py-3">{record.department}</td>

                    <td className="py-3">{record.checkIn}</td>

                    <td className="py-3">{record.checkOut}</td>

                    <td className="py-3">
                      <span
                        className={`text-xs px-2 py-1 rounded-md font-medium ${statusColor(
                          record.status,
                        )}`}
                      >
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
