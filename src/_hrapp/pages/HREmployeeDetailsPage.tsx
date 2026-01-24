import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Route } from "@/routes/_appuser/dashboard/sharp_hr/employees/$employeeId";
import { ArrowLeft } from "lucide-react";

export function HREmployeeDetailsPage() {
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
            Employee ID: <span className="font-mono">{employeeId}</span>
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
          <OverviewTab employeeId={employeeId} />
        </TabsContent>

        <TabsContent value="attendance">
          <AttendanceTab employeeId={employeeId} />
        </TabsContent>

        <TabsContent value="leaves">
          <LeavesTab employeeId={employeeId} />
        </TabsContent>

        <TabsContent value="payroll">
          <PayrollTab employeeId={employeeId} />
        </TabsContent>

        <TabsContent value="documents">
          <DocumentsTab employeeId={employeeId} />
        </TabsContent>
      </Tabs>
    </div>
  );
}


function OverviewTab({ employeeId }: { employeeId: string }) {
  return (
    <div className="rounded-md border p-4">
      <p className="text-sm">
        Overview content for <span className="font-mono">{employeeId}</span>
      </p>
    </div>
  );
}

function AttendanceTab({ employeeId }: { employeeId: string }) {
  return (
    <div className="rounded-md border p-4">
      Attendance logs for {employeeId}
    </div>
  );
}

function LeavesTab({ employeeId }: { employeeId: string }) {
  return (
    <div className="rounded-md border p-4">
      Leave history for {employeeId}
    </div>
  );
}

function PayrollTab({ employeeId }: { employeeId: string }) {
  return (
    <div className="rounded-md border p-4">
      Payroll details for {employeeId}
    </div>
  );
}

function DocumentsTab({ employeeId }: { employeeId: string }) {
  return (
    <div className="rounded-md border p-4">
      Documents for {employeeId}
    </div>
  );
}
