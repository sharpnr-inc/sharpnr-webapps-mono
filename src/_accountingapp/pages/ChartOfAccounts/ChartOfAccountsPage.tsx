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
import {
  Plus,
  MoreHorizontal,
  Search,
  Download,
  ChevronRight,
} from "lucide-react";
import { useLEAccountingBook } from "@/_accountingapp/api/queries/books";
import { useAccountingStore } from "@/_accountingapp/store/accounting.store";
import { formatDateTimePretty } from "@/lib/formatDatePretty";

export function ChartOfAccountingPage() {
  const selectedLegalEntity = useAccountingStore((s) => s.selectedLegalEntity);
  const { data } = useLEAccountingBook(selectedLegalEntity?.id);

  const groups = data?.data?.groups ?? [];

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

      {/* Controls */}
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

      {/* Table */}
      <div className="border border-input rounded-none overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="hover:bg-transparent border-input">
              <TableHead className="w-[120px] text-[10px] font-black uppercase tracking-tighter">
                Group ID
              </TableHead>

              <TableHead className="text-[10px] font-black uppercase tracking-tighter">
                Group Name
              </TableHead>

              <TableHead className="text-[10px] font-black uppercase tracking-tighter">
                Type
              </TableHead>

              <TableHead className="text-[10px] font-black uppercase tracking-tighter">
                Last Updated
              </TableHead>

              <TableHead className="w-[50px]" />
            </TableRow>
          </TableHeader>

          <TableBody>
            {groups.map((group: any) => (
              <TableRow
                key={group.id}
                className="border-input hover:bg-muted/30 transition-colors group"
              >
                <TableCell className="font-mono text-xs">
                  {group.id.slice(0, 8)}
                </TableCell>

                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <ChevronRight className="h-3 w-3 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                    {group.group_name}
                  </div>
                </TableCell>

                <TableCell>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground">
                    {group.type}
                  </span>
                </TableCell>

                <TableCell className="font-mono text-xs">
                  {formatDateTimePretty(group.last_updated)}
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
                        Edit Group
                      </DropdownMenuItem>

                      <DropdownMenuItem className="text-xs uppercase cursor-pointer">
                        View Accounts
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
        <span>Total Groups: {groups.length}</span>
        <span>Sharpnr Accounting Engine v1.0</span>
      </div>
    </div>
  );
}
