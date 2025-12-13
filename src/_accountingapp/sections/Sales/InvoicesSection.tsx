import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function InvoicesSection() {
  const invoices = [
    {
      id: "INV-001",
      date: "2025-11-01",
      customer: "Dearie Club - Powai",
      amount: 54000,
      status: "Paid",
    },
    {
      id: "INV-002",
      date: "2025-11-03",
      customer: "Dearie Club - Andheri",
      amount: 32500,
      status: "Pending",
    },
    {
      id: "INV-003",
      date: "2025-11-05",
      customer: "Dearie Club - Pune",
      amount: 18750,
      status: "Overdue",
    },
  ];

  const statusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Overdue":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className=" space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Invoices Overview</CardTitle>
              <CardDescription>
                View, track, and manage all your invoices
              </CardDescription>
            </div>
            <Button>Create New Invoice</Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-muted/50 text-left text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Invoice ID</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Customer</th>
                  <th className="px-4 py-3 font-medium text-right">Amount (₹)</th>
                  <th className="px-4 py-3 font-medium text-center">Status</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {invoices.map((inv) => (
                  <tr
                    key={inv.id}
                    className="border-t hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-4 py-2 font-medium">{inv.id}</td>
                    <td className="px-4 py-2">{inv.date}</td>
                    <td className="px-4 py-2">{inv.customer}</td>
                    <td className="px-4 py-2 text-right">
                      ₹{inv.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <Badge className={`${statusColor(inv.status)} text-xs`}>
                        {inv.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-2 text-right space-x-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>

        <Separator className="my-2" />

        <CardFooter className="flex justify-between text-sm text-muted-foreground">
          <p>Total Invoices: {invoices.length}</p>
          <p>
            Total Value:{" "}
            <span className="text-foreground font-semibold">
              ₹
              {invoices
                .reduce((acc, i) => acc + i.amount, 0)
                .toLocaleString()}
            </span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
