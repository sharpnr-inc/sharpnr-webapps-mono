import { Card, CardContent, CardHeader, CardTitle } from "@sharpnr/ui";

interface EmployeeDetailsDocsTabProps {
  employeeId: string;
}

export default function EmployeeDetailsDocsTab({
  employeeId,
}: EmployeeDetailsDocsTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Employee Documents</CardTitle>
      </CardHeader>

      <CardContent className="text-sm text-muted-foreground">
        Uploaded documents for employee:
        <span className="ml-2 font-mono">{employeeId}</span>
        <div className="mt-2">
          Offer letter, ID proof, certificates, contracts and HR documents will
          be listed here.
        </div>
      </CardContent>
    </Card>
  );
}
