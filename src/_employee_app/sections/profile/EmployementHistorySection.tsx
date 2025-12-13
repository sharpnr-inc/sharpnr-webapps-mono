import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function EmployementHistorySection() {
  const history = [
    { company: "Vivatech R&D Pvt Ltd", role: "Senior Developer", from: "2020", to: "Present" },
    { company: "Infosys", role: "Software Engineer", from: "2017", to: "2020" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Employment History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell>{item.company}</TableCell>
                <TableCell>{item.role}</TableCell>
                <TableCell>{item.from}</TableCell>
                <TableCell>{item.to}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
