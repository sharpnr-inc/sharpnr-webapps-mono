import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  CalendarDays,
  ClipboardList,
  UserPlus,
  Settings,
  ArrowRight,
} from "lucide-react";

const SharpHRWelcomePage: React.FC = () => {
  return (
    <div className="p-6 space-y-10">
      {/* ================= Hero ================= */}
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Welcome to <span className="text-primary">Sharp HR</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Manage employees, attendance, and leave — all in one structured and
          human-friendly workspace.
        </p>
      </div>

      {/* ================= Quick Access ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="hover:shadow-md transition">
          <CardHeader className="flex flex-row items-center gap-3">
            <Users className="h-6 w-6 text-muted-foreground" />
            <CardTitle className="text-base">Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              View, manage, and organize your workforce.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition">
          <CardHeader className="flex flex-row items-center gap-3">
            <CalendarDays className="h-6 w-6 text-muted-foreground" />
            <CardTitle className="text-base">Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Track daily attendance and working hours.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition">
          <CardHeader className="flex flex-row items-center gap-3">
            <ClipboardList className="h-6 w-6 text-muted-foreground" />
            <CardTitle className="text-base">Leave</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Review and manage leave requests.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition">
          <CardHeader className="flex flex-row items-center gap-3">
            <UserPlus className="h-6 w-6 text-muted-foreground" />
            <CardTitle className="text-base">Recruitment</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Hire and onboard new team members.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition">
          <CardHeader className="flex flex-row items-center gap-3">
            <Settings className="h-6 w-6 text-muted-foreground" />
            <CardTitle className="text-base">Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Configure HR policies and permissions.
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* ================= Getting Started ================= */}
      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>
            Set up Sharp HR in a few simple steps.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center justify-between border rounded-md p-3">
            <span className="text-sm">
              1. Add employees and roles
            </span>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </div>

          <div className="flex items-center justify-between border rounded-md p-3">
            <span className="text-sm">
              2. Configure attendance rules
            </span>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </div>

          <div className="flex items-center justify-between border rounded-md p-3">
            <span className="text-sm">
              3. Define leave policies
            </span>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </div>

          <Button className="mt-4 w-fit">
            Go to HR Setup
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SharpHRWelcomePage;
