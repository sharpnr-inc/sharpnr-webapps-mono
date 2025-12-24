// This is Cart of Account of Page
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Card,
  CardHeader,
  CardTitle,

} from "@/components/ui/card";
import {
  Plus,
  Search,
  Filter,
  Download,
  FolderTree,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export default function AccountGroupsSection() {
  
  // 📘 Mock Account Group Data (replace later with API)
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["Assets"]);

  const accountGroups = [
    {
      name: "Assets",
      type: "Asset",
      parent: null,
      subGroups: [
        {
          name: "Current Assets",
          type: "Asset",
          parent: "Assets",
          subGroups: [
            {
              name: "Bank Accounts",
              type: "Asset",
              parent: "Current Assets",
              subGroups: [],
            },
            {
              name: "Cash in Hand",
              type: "Asset",
              parent: "Current Assets",
              subGroups: [],
            },
          ],
        },
        {
          name: "Fixed Assets",
          type: "Asset",
          parent: "Assets",
          subGroups: [],
        },
      ],
    },
    {
      name: "Liabilities",
      type: "Liability",
      parent: null,
      subGroups: [
        {
          name: "Current Liabilities",
          type: "Liability",
          parent: "Liabilities",
          subGroups: [
            {
              name: "Accounts Payable",
              type: "Liability",
              parent: "Current Liabilities",
              subGroups: [],
            },
          ],
        },
      ],
    },
    {
      name: "Income",
      type: "Income",
      parent: null,
      subGroups: [
        {
          name: "Sales",
          type: "Income",
          parent: "Income",
          subGroups: [
            { name: "Bar Sales", type: "Income", parent: "Sales", subGroups: [] },
            { name: "Restaurant Sales", type: "Income", parent: "Sales", subGroups: [] },
          ],
        },
      ],
    },
    {
      name: "Expenses",
      type: "Expense",
      parent: null,
      subGroups: [
        {
          name: "Operating Expenses",
          type: "Expense",
          parent: "Expenses",
          subGroups: [
            { name: "Salaries", type: "Expense", parent: "Operating Expenses", subGroups: [] },
            { name: "Electricity", type: "Expense", parent: "Operating Expenses", subGroups: [] },
          ],
        },
      ],
    },
  ];

  // 🧩 Recursive Renderer
  const renderGroup = (group: any, depth: number = 0) => {
    const isExpanded = expandedGroups.includes(group.name);

    return (
      <>
        <TableRow key={group.name}>
          <TableCell className="flex items-center gap-1 pl-[calc(12px_*_var(--depth))]" style={{ "--depth": depth } as any}>
            {group.subGroups.length > 0 ? (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => {
                  setExpandedGroups((prev) =>
                    isExpanded
                      ? prev.filter((g) => g !== group.name)
                      : [...prev, group.name]
                  );
                }}
              >
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
            ) : (
              <div className="w-6" />
            )}
            <FolderTree className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{group.name}</span>
          </TableCell>
          <TableCell>
            <Badge
              className={`${
                group.type === "Asset"
                  ? "bg-green-100 text-green-700"
                  : group.type === "Liability"
                  ? "bg-red-100 text-red-700"
                  : group.type === "Income"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {group.type}
            </Badge>
          </TableCell>
          <TableCell>{group.parent || "-"}</TableCell>
          <TableCell className="text-right">
            {group.subGroups.length} Subgroup(s)
          </TableCell>
        </TableRow>

        {/* Render Subgroups */}
        {isExpanded &&
          group.subGroups.map((sub: any) => renderGroup(sub, depth + 1))}
      </>
    );
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 🧭 Header */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <FolderTree className="h-5 w-5 text-primary" />
            Account Group Hierarchy
          </CardTitle>
        </CardHeader>
      </Card>

      {/* 🔍 Search & Actions */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search account group..."
            className="w-72"
          />
          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Groups
          </Button>
          <Button className="bg-primary text-white">
            <Plus className="h-4 w-4 mr-2" />
            New Group
          </Button>
        </div>
      </div>

      {/* 🧾 Account Groups Table */}
      <div className="rounded-lg border bg-card shadow-sm overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Group Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Parent Group</TableHead>
              <TableHead className="text-right">Subgroups</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accountGroups.map((group) => renderGroup(group))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
