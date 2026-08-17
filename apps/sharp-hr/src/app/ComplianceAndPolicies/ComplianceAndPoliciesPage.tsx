import { FileText, Upload, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@sharpnr/ui";
import { Button } from "@sharpnr/ui";

type Policy = {
  id: string;
  title: string;
  category: string;
  lastUpdated: string;
  status: "Active" | "Draft" | "Archived";
};

const policies: Policy[] = [
  {
    id: "1",
    title: "Employee Code of Conduct",
    category: "Company Policy",
    lastUpdated: "Apr 20, 2026",
    status: "Active",
  },
  {
    id: "2",
    title: "Work From Home Guidelines",
    category: "HR Policy",
    lastUpdated: "Apr 10, 2026",
    status: "Active",
  },
  {
    id: "3",
    title: "Data Privacy Agreement",
    category: "Compliance",
    lastUpdated: "Mar 28, 2026",
    status: "Draft",
  },
];

function statusColor(status: Policy["status"]) {
  switch (status) {
    case "Active":
      return "text-green-600 bg-green-50";
    case "Draft":
      return "text-yellow-600 bg-yellow-50";
    default:
      return "text-gray-600 bg-gray-100";
  }
}

export function ComplianceAndPoliciesPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <ShieldCheck className="w-6 h-6" />

          <h1 className="text-2xl font-semibold">Compliance & Policies 📚</h1>
        </div>

        <Button className="flex items-center gap-2">
          <Upload className="w-4 h-4" />
          Upload Policy
        </Button>
      </div>

      {/* Policies Table */}
      <Card>
        <CardContent className="p-5">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-muted-foreground">
                  <th className="text-left py-3">Policy Name</th>
                  <th className="text-left py-3">Category</th>
                  <th className="text-left py-3">Last Updated</th>
                  <th className="text-left py-3">Status</th>
                  <th className="text-left py-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {policies.map((policy) => (
                  <tr key={policy.id} className="border-b hover:bg-muted/40">
                    <td className="py-3 font-medium flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      {policy.title}
                    </td>

                    <td className="py-3">{policy.category}</td>

                    <td className="py-3">{policy.lastUpdated}</td>

                    <td className="py-3">
                      <span
                        className={`text-xs px-2 py-1 rounded-md font-medium ${statusColor(
                          policy.status,
                        )}`}
                      >
                        {policy.status}
                      </span>
                    </td>

                    <td className="py-3">
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
