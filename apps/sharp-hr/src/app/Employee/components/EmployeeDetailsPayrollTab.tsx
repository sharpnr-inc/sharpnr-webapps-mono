import { Card, CardContent, CardHeader, CardTitle } from "@sharpnr/ui";

interface EmployeeDetailsPayrollTabProps {
  employeeId: string;
}

export default function EmployeeDetailsPayrollTab({
  employeeId,
}: EmployeeDetailsPayrollTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payroll Details</CardTitle>
      </CardHeader>

      <CardContent className="text-sm text-muted-foreground">
        Salary structure, payslips and deductions for employee:
        <span className="ml-2 font-mono">{employeeId}</span>
      </CardContent>
    </Card>
  );
}
