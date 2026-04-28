import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Route } from "@/routes/_layout/employees/$employeeId";
import { ArrowLeft } from "lucide-react";

import EmployeeDetailsOverviewTab from "./components/EmployeeDetailsOverviewTab";
import EmployeeDetailsAttendanceTab from "./components/EmployeeDetailsAttendanceTab";
import EmployeeDetailsLeavesTab from "./components/EmployeeDetailsLeavesTab";
import EmployeeDetailsPayrollTab from "./components/EmployeeDetailsPayrollTab";
import EmployeeDetailsDocsTab from "./components/EmployeeDetailsDocsTab";

export function EmployeeDetailsPage() {
  const { employeeId } = Route.useParams();

  return (
    <div className="space-y-4 p-3">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>

        <div>
          <h1 className="text-xl font-semibold">Employee Details</h1>

          <p className="text-sm text-muted-foreground">
            Employee ID:
            <span className="ml-2 font-mono">{employeeId}</span>
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="leaves">Leaves</TabsTrigger>
          <TabsTrigger value="payroll">Payroll</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <EmployeeDetailsOverviewTab employeeId={employeeId} />
        </TabsContent>

        <TabsContent value="attendance">
          <EmployeeDetailsAttendanceTab employeeId={employeeId} />
        </TabsContent>

        <TabsContent value="leaves">
          <EmployeeDetailsLeavesTab employeeId={employeeId} />
        </TabsContent>

        <TabsContent value="payroll">
          <EmployeeDetailsPayrollTab employeeId={employeeId} />
        </TabsContent>

        <TabsContent value="documents">
          <EmployeeDetailsDocsTab employeeId={employeeId} />
        </TabsContent>
      </Tabs>
    </div>
  );
}