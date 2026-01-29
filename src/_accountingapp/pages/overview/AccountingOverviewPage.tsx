import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Wallet,
  BarChart3,
  BookOpen,
  Settings,
  ArrowRight,
} from "lucide-react";

export function AccountingOverviewPage() {
  return (
    <div className="p-6 space-y-10">
      {/* ================= Hero ================= */}
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Welcome to <span className="text-primary">Sharp Accounting</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Manage books, track transactions, and generate financial reports —
          all in one clean, reliable accounting workspace.
        </p>
      </div>

      {/* ================= Quick Actions ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition">
          <CardHeader className="flex flex-row items-center gap-3">
            <Wallet className="h-6 w-6 text-muted-foreground" />
            <CardTitle className="text-base">Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Get a quick snapshot of balances, cash flow, and totals.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition">
          <CardHeader className="flex flex-row items-center gap-3">
            <BookOpen className="h-6 w-6 text-muted-foreground" />
            <CardTitle className="text-base">Ledger</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Maintain clean and accurate accounting ledgers.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition">
          <CardHeader className="flex flex-row items-center gap-3">
            <BarChart3 className="h-6 w-6 text-muted-foreground" />
            <CardTitle className="text-base">Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Generate balance sheets, P&L, and financial reports.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition">
          <CardHeader className="flex flex-row items-center gap-3">
            <Settings className="h-6 w-6 text-muted-foreground" />
            <CardTitle className="text-base">Setup</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Configure accounting books, groups, and preferences.
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* ================= Getting Started ================= */}
      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>
            Follow these steps to start managing your accounting efficiently.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center justify-between border rounded-md p-3">
            <span className="text-sm">
              1. Create or select an accounting book
            </span>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </div>

          <div className="flex items-center justify-between border rounded-md p-3">
            <span className="text-sm">
              2. Define accounting groups and ledgers
            </span>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </div>

          <div className="flex items-center justify-between border rounded-md p-3">
            <span className="text-sm">
              3. Start recording transactions
            </span>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </div>

          <Button className="mt-4 w-fit">
            Go to Accounting Setup
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
