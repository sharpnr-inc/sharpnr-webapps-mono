import React, { } from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardDescription 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CalendarCheck, 
  Clock, 
  FileText, 
  UserCheck, 
  PlusCircle, 
  History 
} from "lucide-react";

interface AppUserAttendancePageProps {}

const AppUserAttendancePage: React.FC<AppUserAttendancePageProps> = () => {
  // Sample Data for the Log
  const attendanceData = [
    { date: "2026-01-29", status: "Present", checkIn: "09:00 AM", checkOut: "05:00 PM", hours: "8h" },
    { date: "2026-01-28", status: "Late", checkIn: "09:45 AM", checkOut: "05:00 PM", hours: "7h 15m" },
    { date: "2026-01-27", status: "Present", checkIn: "08:55 AM", checkOut: "05:10 PM", hours: "8h 15m" },
  ];

  const leaveHistory = [
    { type: "Sick Leave", start: "2026-01-15", end: "2026-01-16", days: 2, status: "Approved" },
    { type: "Annual Leave", start: "2026-02-10", end: "2026-02-15", days: 5, status: "Pending" },
  ];

  return (
    <div className="p-4 mt-2 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <UserCheck className="h-6 w-6 text-blue-600" />
            My Attendance & Leaves
          </h2>
          <p className="text-sm text-muted-foreground">Manage your work logs and time-off requests.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Clock className="mr-2 h-4 w-4" /> Clock In
        </Button>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Leaves" value="12" desc="Annual balance" icon={<FileText className="text-blue-600" />} />
        <StatCard title="Used" value="4" desc="Current year" icon={<History className="text-orange-600" />} />
        <StatCard title="Remaining" value="8" desc="Available" icon={<CalendarCheck className="text-green-600" />} />
        <StatCard title="Attendance Rate" value="98%" desc="Last 30 days" icon={<UserCheck className="text-purple-600" />} />
      </div>

      <Tabs defaultValue="log" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-[400px]">
          <TabsTrigger value="log">Attendance Log</TabsTrigger>
          <TabsTrigger value="history">Leave History</TabsTrigger>
          <TabsTrigger value="apply">Apply Leave</TabsTrigger>
        </TabsList>

        {/* Tab 1: Attendance Log */}
        <TabsContent value="log">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your check-in and check-out logs for the current month.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Check In</TableHead>
                    <TableHead>Check Out</TableHead>
                    <TableHead className="text-right">Total Hours</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceData.map((row) => (
                    <TableRow key={row.date}>
                      <TableCell className="font-medium">{row.date}</TableCell>
                      <TableCell>
                        <Badge variant={row.status === "Present" ? "default" : "destructive"}>
                          {row.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{row.checkIn}</TableCell>
                      <TableCell>{row.checkOut}</TableCell>
                      <TableCell className="text-right">{row.hours}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 2: Leave History */}
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Leave Requests</CardTitle>
              <CardDescription>View the status of your past and upcoming leave applications.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Leave Type</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Days</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaveHistory.map((leave, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">{leave.type}</TableCell>
                      <TableCell>{leave.start} to {leave.end}</TableCell>
                      <TableCell>{leave.days}</TableCell>
                      <TableCell>
                        <Badge className={leave.status === "Approved" ? "bg-green-500" : "bg-yellow-500"}>
                          {leave.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 3: Apply Leave Form */}
        <TabsContent value="apply">
          <Card>
            <CardHeader>
              <CardTitle>Request Time Off</CardTitle>
              <CardDescription>Submit a new leave request for approval.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Start Date</label>
                  <input type="date" className="w-full p-2 border rounded-md" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">End Date</label>
                  <input type="date" className="w-full p-2 border rounded-md" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Leave Type</label>
                <select className="w-full p-2 border rounded-md">
                  <option>Annual Leave</option>
                  <option>Sick Leave</option>
                  <option>Casual Leave</option>
                  <option>Maternity/Paternity</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Reason</label>
                <textarea className="w-full p-2 border rounded-md" rows={3} placeholder="Brief description..."></textarea>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <PlusCircle className="mr-2 h-4 w-4" /> Submit Application
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

/* Reusable Stat Card */
function StatCard({ title, value, desc, icon }: { title: string, value: string, desc: string, icon: React.ReactNode }) {
  return (
    <Card className="hover:shadow-sm transition-all border-l-4 border-l-blue-500">
      <CardContent className="p-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase">{title}</p>
          <div className="text-2xl font-bold">{value}</div>
          <p className="text-[10px] text-muted-foreground">{desc}</p>
        </div>
        <div className="p-2 bg-slate-50 rounded-full">{icon}</div>
      </CardContent>
    </Card>
  );
}

export default AppUserAttendancePage;