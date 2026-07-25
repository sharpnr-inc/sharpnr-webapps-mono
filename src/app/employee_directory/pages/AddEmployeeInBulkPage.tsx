// this is page where we can add the employees

import { useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  toast,
} from "@sharpnr/ui";
import {
  ArrowLeft,
  CheckCircle2,
  Download,
  FileSpreadsheet,
  Trash2,
  UploadCloud,
  Users,
  XCircle,
} from "lucide-react";
import * as XLSX from "xlsx";
import { cn } from "@/lib/utils";

/* ── template ──────────────────────────────────────────────── */

const TEMPLATE_HEADERS = [
  "First Name",
  "Last Name",
  "Email Address",
  "Employee Code",
];

const TEMPLATE_SAMPLE_ROWS = [
  ["John", "Doe", "john.doe@example.com", "EMP001"],
  ["Jane", "Smith", "jane.smith@example.com", ""],
];

function downloadTemplate() {
  const worksheet = XLSX.utils.aoa_to_sheet([
    TEMPLATE_HEADERS,
    ...TEMPLATE_SAMPLE_ROWS,
  ]);
  worksheet["!cols"] = [
    { wch: 18 },
    { wch: 18 },
    { wch: 30 },
    { wch: 16 },
  ];
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");
  XLSX.writeFile(workbook, "employee_bulk_upload_template.xlsx");
}

/* ── parsing ───────────────────────────────────────────────── */

interface ParsedEmployeeRow {
  rowNumber: number;
  firstName: string;
  lastName: string;
  email: string;
  employeeCode: string;
  errors: string[];
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeHeader(header: string) {
  return header.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
}

function findColumn(headerMap: Record<string, number>, candidates: string[]) {
  for (const candidate of candidates) {
    if (headerMap[candidate] !== undefined) return headerMap[candidate];
  }
  return undefined;
}

function parseWorkbook(data: ArrayBuffer): ParsedEmployeeRow[] {
  const workbook = XLSX.read(data, { type: "array" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows: unknown[][] = XLSX.utils.sheet_to_json(sheet, {
    header: 1,
    blankrows: false,
    defval: "",
  });

  if (rows.length === 0) return [];

  const [headerRow, ...dataRows] = rows;
  const headerMap: Record<string, number> = {};
  headerRow.forEach((h, idx) => {
    headerMap[normalizeHeader(String(h ?? ""))] = idx;
  });

  const firstNameIdx = findColumn(headerMap, ["firstname", "fname"]);
  const lastNameIdx = findColumn(headerMap, ["lastname", "lname"]);
  const emailIdx = findColumn(headerMap, ["emailaddress", "email"]);
  const codeIdx = findColumn(headerMap, [
    "employeecode",
    "empcode",
    "code",
  ]);

  return dataRows
    .filter((row) => row.some((cell) => String(cell ?? "").trim() !== ""))
    .map((row, i) => {
      const firstName =
        firstNameIdx !== undefined ? String(row[firstNameIdx] ?? "").trim() : "";
      const lastName =
        lastNameIdx !== undefined ? String(row[lastNameIdx] ?? "").trim() : "";
      const email =
        emailIdx !== undefined ? String(row[emailIdx] ?? "").trim() : "";
      const employeeCode =
        codeIdx !== undefined ? String(row[codeIdx] ?? "").trim() : "";

      const errors: string[] = [];
      if (!firstName) errors.push("First name is required");
      if (!lastName) errors.push("Last name is required");
      if (!email) errors.push("Email is required");
      else if (!EMAIL_REGEX.test(email)) errors.push("Invalid email format");

      return {
        rowNumber: i + 2,
        firstName,
        lastName,
        email,
        employeeCode,
        errors,
      };
    });
}

/* ── page ──────────────────────────────────────────────────── */

const AddEmployeeInBulkPage = () => {
  const nav = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const [fileName, setFileName] = useState<string | null>(null);
  const [rows, setRows] = useState<ParsedEmployeeRow[]>([]);
  const [isParsing, setIsParsing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const validCount = rows.filter((r) => r.errors.length === 0).length;
  const errorCount = rows.length - validCount;

  const processFile = async (file: File) => {
    const isExcel = /\.(xlsx|xls)$/i.test(file.name);
    if (!isExcel) {
      toast.error("Please upload a valid .xlsx or .xls file");
      return;
    }

    setIsParsing(true);
    try {
      const buffer = await file.arrayBuffer();
      const parsed = parseWorkbook(buffer);
      if (parsed.length === 0) {
        toast.error("No employee rows found in this file");
        setFileName(null);
        setRows([]);
        return;
      }
      setFileName(file.name);
      setRows(parsed);
      toast.success(`Parsed ${parsed.length} row(s) from ${file.name}`);
    } catch {
      toast.error("Could not read this file. Please check the format.");
    } finally {
      setIsParsing(false);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const removeRow = (rowNumber: number) => {
    setRows((prev) => prev.filter((r) => r.rowNumber !== rowNumber));
  };

  const clearAll = () => {
    setFileName(null);
    setRows([]);
  };

  const handleImport = () => {
    toast.success(
      `${validCount} employee(s) ready — bulk import isn't wired up to the backend yet`,
    );
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-3 sm:px-6 pb-10">
      {/* ── Header ── */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="min-w-0">
          <button
            onClick={() => nav({ to: "/org-users" })}
            className="mb-1 inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Employees
          </button>
          <h1 className="font-bold text-xl sm:text-2xl tracking-tight leading-none flex items-center gap-2">
            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground" />
            Add Employees in Bulk
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Upload an Excel sheet to add multiple employees at once.
          </p>
        </div>

        <Button variant="outline" size="sm" onClick={downloadTemplate}>
          <Download className="h-3.5 w-3.5" />
          Download Template
        </Button>
      </div>

      {/* ── Upload zone ── */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={cn(
          "flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed p-8 text-center transition-colors",
          isDragging ? "border-primary bg-primary/5" : "border-border bg-card",
        )}
      >
        <UploadCloud className="h-7 w-7 text-muted-foreground/60" />
        <p className="text-sm font-medium text-foreground">
          {isParsing ? "Parsing file…" : "Drag & drop an Excel file here"}
        </p>
        <p className="text-xs text-muted-foreground">
          or click below to browse · .xlsx / .xls
        </p>
        <Button
          size="sm"
          className="mt-1"
          disabled={isParsing}
          onClick={() => inputRef.current?.click()}
        >
          Choose File
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept=".xlsx,.xls"
          className="hidden"
          onChange={handleFileInput}
        />
        {fileName && (
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-lg border bg-background px-2.5 py-1 text-xs text-foreground">
            <FileSpreadsheet className="h-3.5 w-3.5 text-muted-foreground" />
            {fileName}
          </div>
        )}
      </div>

      {/* ── Parsed list ── */}
      {rows.length > 0 && (
        <div className="mt-5">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-3 w-3" />
                {validCount} valid
              </span>
              {errorCount > 0 && (
                <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 px-2 py-0.5 text-[11px] font-semibold text-rose-600 dark:text-rose-400">
                  <XCircle className="h-3 w-3" />
                  {errorCount} with errors
                </span>
              )}
            </div>
            <button
              onClick={clearAll}
              className="text-xs font-semibold text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors"
            >
              Clear
            </button>
          </div>

          <div className="rounded-xl border bg-card overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">#</TableHead>
                  <TableHead>First Name</TableHead>
                  <TableHead>Last Name</TableHead>
                  <TableHead>Email Address</TableHead>
                  <TableHead>Employee Code</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-10" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.rowNumber}>
                    <TableCell className="text-xs text-muted-foreground">
                      {row.rowNumber}
                    </TableCell>
                    <TableCell className="text-sm">
                      {row.firstName || (
                        <span className="text-muted-foreground/50">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-sm">
                      {row.lastName || (
                        <span className="text-muted-foreground/50">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-sm">
                      {row.email || (
                        <span className="text-muted-foreground/50">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {row.employeeCode || "—"}
                    </TableCell>
                    <TableCell>
                      {row.errors.length === 0 ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="h-3 w-3" />
                          Valid
                        </span>
                      ) : (
                        <span
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-600 dark:text-rose-400"
                          title={row.errors.join(", ")}
                        >
                          <XCircle className="h-3 w-3" />
                          {row.errors[0]}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={() => removeRow(row.rowNumber)}
                        className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-destructive transition-colors"
                        aria-label="Remove row"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex justify-end">
            <Button
              size="sm"
              disabled={validCount === 0}
              onClick={handleImport}
            >
              Import {validCount} Employee{validCount === 1 ? "" : "s"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddEmployeeInBulkPage;
