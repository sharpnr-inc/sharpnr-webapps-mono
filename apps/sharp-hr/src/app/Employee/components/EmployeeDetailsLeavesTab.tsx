import { Card, CardContent, CardHeader, CardTitle } from "@sharpnr/ui";

interface EmployeeDetailsLeavesTabProps {
  employeeId: string;
}

export default function EmployeeDetailsLeavesTab({
  employeeId,
}: EmployeeDetailsLeavesTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Leave History</CardTitle>
      </CardHeader>

      <CardContent className="text-sm text-muted-foreground">
        Leave applications and balances for employee:
        <span className="ml-2 font-mono">{employeeId}</span>

        <div className="mt-2">
          Sick leave, casual leave, paid leave summary will appear here.
        </div>
      </CardContent>
    </Card>
  );
}