import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  MoreHorizontal,
  Search,
  Download,
  ArrowUpDown,
  ChevronRight,
} from "lucide-react";

const accounts = [
  {
    code: "1000",
    name: "Assets",
    category: "Asset",
    balance: "0.00",
    status: "Active",
  },
  {
    code: "1100",
    name: "Cash on Hand",
    category: "Asset",
    balance: "15,250.00",
    status: "Active",
  },
  {
    code: "2000",
    name: "Liabilities",
    category: "Liability",
    balance: "5,000.00",
    status: "Active",
  },
  {
    code: "3000",
    name: "Equity",
    category: "Equity",
    balance: "10,250.00",
    status: "Active",
  },
  {
    code: "4000",
    name: "Revenue",
    category: "Income",
    balance: "25,000.00",
    status: "Active",
  },
  {
    code: "5000",
    name: "Cost of Goods Sold",
    category: "Expense",
    balance: "12,400.00",
    status: "Active",
  },
];

export function ChartOfAccountingPage() {
  return (
    <div className="flex flex-col gap-6 p-8 bg-background text-foreground ">
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter uppercase">
            Chart of Accounts
          </h1>
          <p className="text-muted-foreground text-xs uppercase tracking-widest mt-1">
            Core Ledger Structure & Hierarchy
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-9 rounded-none border-foreground/20 uppercase text-[10px] font-bold"
          >
            <Download className="mr-2 h-3.5 w-3.5" />
            Export CSV
          </Button>
          <Button
            size="sm"
            className="h-9 rounded-none uppercase text-[10px] font-bold bg-foreground text-background hover:bg-foreground/90"
          >
            <Plus className="mr-2 h-3.5 w-3.5" />
            New Account
          </Button>
        </div>
      </div>

      {/* Controls Area */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-y border-input py-4">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search accounts..."
            className="pl-9 rounded-none border-input bg-transparent focus-visible:ring-0 focus-visible:border-foreground"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Button
            variant="ghost"
            size="sm"
            className="text-[10px] uppercase font-bold tracking-wider h-8"
          >
            Filter by Type
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-[10px] uppercase font-bold tracking-wider h-8"
          >
            Archived
          </Button>
        </div>
      </div>

      {/* Main Table */}
      <div className="border border-input rounded-none overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="hover:bg-transparent border-input">
              <TableHead className="w-[100px] text-[10px] font-black uppercase tracking-tighter">
                Code
              </TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-tighter">
                <div className="flex items-center gap-1 cursor-pointer hover:text-foreground transition-colors">
                  Account Name <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-tighter">
                Category
              </TableHead>
              <TableHead className="text-right text-[10px] font-black uppercase tracking-tighter">
                Balance
              </TableHead>
              <TableHead className="w-[100px] text-[10px] font-black uppercase tracking-tighter">
                Status
              </TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts.map((account) => (
              <TableRow
                key={account.code}
                className="border-input hover:bg-muted/30 transition-colors group"
              >
                <TableCell className="font-mono text-xs">
                  {account.code}
                </TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <ChevronRight className="h-3 w-3 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                    {account.name}
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground">
                    {account.category}
                  </span>
                </TableCell>
                <TableCell className="text-right font-mono text-sm tracking-tighter">
                  {account.balance}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="rounded-none border-foreground text-[9px] uppercase font-black px-1.5 py-0"
                  >
                    {account.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-8 w-8 p-0 hover:bg-muted"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="rounded-none border-input"
                    >
                      <DropdownMenuLabel className="text-[10px] uppercase">
                        Actions
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-xs uppercase cursor-pointer">
                        Edit Account
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-xs uppercase cursor-pointer">
                        View Ledger
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-xs uppercase text-destructive cursor-pointer">
                        Archive
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between mt-auto pt-4 text-[9px] uppercase font-bold text-muted-foreground tracking-[0.2em]">
        <span>Total Primary Accounts: {accounts.length}</span>
        <span>Sharpnr Accounting Engine v1.0</span>
      </div>
    </div>
  );
}
