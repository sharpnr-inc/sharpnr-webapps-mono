"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AlertCircle, RefreshCw, ScrollText } from "lucide-react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Spinner,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@sharpnr/ui";

interface LogEntry {
  raw: string;
  ip?: string;
  time?: string;
  method?: string;
  path?: string;
  status?: number;
  bytes?: number;
  userAgent?: string;
}

interface LogResponse {
  file: string;
  type: "access" | "error";
  size: number;
  mtime: string;
  count: number;
  entries: LogEntry[];
}

const REFRESH_MS = 5000;

function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes)) return "—";
  const units = ["B", "KB", "MB", "GB"];
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit++;
  }
  return `${value.toFixed(unit === 0 ? 0 : 1)} ${units[unit]}`;
}

// Colour the status badge by HTTP class — green 2xx, blue 3xx, amber 4xx, red 5xx.
function statusClasses(status?: number): string {
  if (!status) return "bg-muted text-muted-foreground";
  if (status >= 500) return "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300";
  if (status >= 400)
    return "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300";
  if (status >= 300) return "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300";
  return "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300";
}

export default function NginxLogsPage() {
  const [type, setType] = useState<"access" | "error">("access");
  const [lines, setLines] = useState("200");
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [search, setSearch] = useState("");

  const [data, setData] = useState<LogResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Keep the latest controls available to the polling effect without making the
  // interval depend on (and reset on) every keystroke.
  const fetchLogs = useCallback(async () => {
    try {
      const res = await fetch(
        `/api/nginx-logs?type=${type}&lines=${lines}`,
        { cache: "no-store" },
      );
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? `Request failed (${res.status})`);
        setData(null);
      } else {
        setData(json as LogResponse);
        setError(null);
      }
    } catch (err) {
      setError((err as Error).message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [type, lines]);

  // Refetch immediately when the log type or line count changes.
  useEffect(() => {
    setLoading(true);
    fetchLogs();
  }, [fetchLogs]);

  // Poll while auto-refresh is on.
  const fetchRef = useRef(fetchLogs);
  fetchRef.current = fetchLogs;
  useEffect(() => {
    if (!autoRefresh) return;
    const id = setInterval(() => fetchRef.current(), REFRESH_MS);
    return () => clearInterval(id);
  }, [autoRefresh]);

  const term = search.trim().toLowerCase();
  const entries = (data?.entries ?? []).filter(
    (e) => term === "" || e.raw.toLowerCase().includes(term),
  );

  return (
    <main className="mx-auto w-full max-w-6xl space-y-6 p-6">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <ScrollText className="size-5" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Nginx Logs</h1>
          <p className="text-sm text-muted-foreground">
            Live tail of the nginx service on this machine
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <CardTitle className="font-mono text-base">
                {data?.file ?? "/var/log/nginx/…"}
              </CardTitle>
              <CardDescription>
                {data
                  ? `${data.count} lines · ${formatBytes(data.size)} · updated ${new Date(
                      data.mtime,
                    ).toLocaleTimeString()}`
                  : "Loading…"}
              </CardDescription>
            </div>

            <div className="flex flex-wrap items-end gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs">Log</Label>
                <Select
                  value={type}
                  onValueChange={(v) => setType(v as "access" | "error")}
                >
                  <SelectTrigger size="sm" className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="access">access</SelectItem>
                    <SelectItem value="error">error</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs">Lines</Label>
                <Select value={lines} onValueChange={setLines}>
                  <SelectTrigger size="sm" className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["50", "200", "500", "1000", "5000"].map((n) => (
                      <SelectItem key={n} value={n}>
                        {n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <label className="flex items-center gap-2 pb-1.5 text-sm">
                <Switch checked={autoRefresh} onCheckedChange={setAutoRefresh} />
                Auto-refresh
              </label>

              <Button
                variant="outline"
                size="sm"
                onClick={() => fetchLogs()}
                disabled={loading}
              >
                <RefreshCw
                  className={`size-4 ${loading ? "animate-spin" : ""}`}
                />
                Refresh
              </Button>
            </div>
          </div>

          <Input
            placeholder="Filter lines…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mt-2 max-w-xs"
          />
        </CardHeader>

        <CardContent>
          {error ? (
            <div className="flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
              <AlertCircle className="size-4 shrink-0" />
              <span>{error}</span>
            </div>
          ) : loading && !data ? (
            <div className="flex items-center justify-center gap-2 py-12 text-muted-foreground">
              <Spinner className="size-5" />
              Loading logs…
            </div>
          ) : entries.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground">
              No matching log lines.
            </div>
          ) : type === "access" ? (
            <div className="max-h-[60vh] overflow-auto rounded-md border">
              <Table>
                <TableHeader className="sticky top-0 bg-card">
                  <TableRow>
                    <TableHead className="w-44">Time</TableHead>
                    <TableHead className="w-32">IP</TableHead>
                    <TableHead className="w-20">Method</TableHead>
                    <TableHead>Path</TableHead>
                    <TableHead className="w-20">Status</TableHead>
                    <TableHead className="w-24 text-right">Size</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="font-mono text-xs">
                  {entries.map((e, i) => (
                    <TableRow key={i}>
                      <TableCell className="whitespace-nowrap text-muted-foreground">
                        {e.time ?? "—"}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        {e.ip ?? "—"}
                      </TableCell>
                      <TableCell>{e.method ?? "—"}</TableCell>
                      <TableCell className="max-w-md truncate" title={e.path}>
                        {e.path ?? e.raw}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`border-transparent ${statusClasses(e.status)}`}
                        >
                          {e.status ?? "—"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {e.bytes != null ? formatBytes(e.bytes) : "—"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="max-h-[60vh] overflow-auto rounded-md border bg-muted/30 p-3">
              <pre className="font-mono text-xs leading-relaxed whitespace-pre-wrap">
                {entries.map((e) => e.raw).join("\n")}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
