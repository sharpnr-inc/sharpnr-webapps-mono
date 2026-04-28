import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EmployeeDetailsOverviewTabProps {
  employeeId: string;
}

export default function EmployeeDetailsOverviewTab({
  employeeId,
}: EmployeeDetailsOverviewTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Employee Overview</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2 text-sm">
        <p>
          Showing overview details for employee:
          <span className="ml-2 font-mono">{employeeId}</span>
        </p>

        <div className="text-muted-foreground">
          Basic info, designation, department, joining date, reporting manager
          will appear here.
        </div>
      </CardContent>
    </Card>
  );
}
