import type { NextRequest } from "next/server";
import { execFile } from "node:child_process";
import { open, stat } from "node:fs/promises";
import { promisify } from "node:util";
import path from "node:path";

// Reads the filesystem + request params, so it must run per-request (never
// prerendered/cached at build time).
export const dynamic = "force-dynamic";

const execFileAsync = promisify(execFile);

const NEWLINE = 0x0a;
const CHUNK_SIZE = 64 * 1024;
const MAX_OUTPUT_BYTES = 128 * 1024 * 1024;

// Tail the last N lines of (potentially huge) access.log.
//
// Primary path is a `tail` child process — but with LD_PRELOAD stripped from
// its environment. Some editor tooling (e.g. Console Ninja / Wallaby) injects a
// native filesystem hook via LD_PRELOAD into the dev server; that hook corrupts
// *in-process* file content reads (returns empty) and breaks binaries that
// inherit it. Running `tail` in a clean child env sidesteps both, and works the
// same in production where no such hook exists.
//
// If `tail` isn't available (e.g. non-Linux hosts, which also won't have the
// hook), we fall back to an in-process backward chunked read.
async function tailFile(filePath: string, maxLines: number): Promise<string[]> {
  const env = { ...process.env };
  delete env.LD_PRELOAD;

  try {
    const { stdout } = await execFileAsync(
      "tail",
      ["-n", String(maxLines), filePath],
      { env, maxBuffer: MAX_OUTPUT_BYTES },
    );
    return stdout.split("\n").filter((line) => line.length > 0);
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") {
      return readLastLinesInProcess(filePath, maxLines);
    }
    throw err;
  }
}

// Fallback tail: seek to the end and read fixed-size chunks backwards until
// we've collected enough line breaks. Never reads the whole file.
async function readLastLinesInProcess(
  filePath: string,
  maxLines: number,
): Promise<string[]> {
  const fh = await open(filePath, "r");
  try {
    const { size } = await fh.stat();
    if (size === 0) return [];

    let position = size;
    let newlineCount = 0;
    let buffer = Buffer.alloc(0);

    while (position > 0 && newlineCount <= maxLines) {
      const readSize = Math.min(CHUNK_SIZE, position);
      position -= readSize;
      const chunk = Buffer.alloc(readSize);
      await fh.read(chunk, 0, readSize, position);
      for (let i = 0; i < chunk.length; i++) {
        if (chunk[i] === NEWLINE) newlineCount++;
      }
      buffer = Buffer.concat([chunk, buffer]);
    }

    const lines = buffer.toString("utf8").split("\n").filter((l) => l.length > 0);
    return lines.slice(-maxLines);
  } finally {
    await fh.close();
  }
}

// Where nginx writes its logs on this host. Override with NGINX_LOG_DIR if needed.
const LOG_DIR = process.env.NGINX_LOG_DIR ?? "/var/log/nginx";

// Whitelist of log "type" -> filename. The query param can only ever map to one
// of these fixed files, so it can't be abused for path traversal.
const LOG_FILES = {
  access: "access.log",
  error: "error.log",
} as const;

type LogType = keyof typeof LOG_FILES;

const DEFAULT_LINES = 200;
const MAX_LINES = 5000;

// nginx "combined" access log format:
//   127.0.0.1 - - [16/Apr/2026:01:06:56 +0530] "GET / HTTP/1.1" 502 559 "-" "UA..."
const ACCESS_LOG_RE =
  /^(\S+) \S+ (\S+) \[([^\]]+)\] "([^"]*)" (\d{3}|-) (\S+) "([^"]*)" "([^"]*)"/;

export interface LogEntry {
  raw: string;
  ip?: string;
  user?: string;
  time?: string;
  method?: string;
  path?: string;
  protocol?: string;
  status?: number;
  bytes?: number;
  referer?: string;
  userAgent?: string;
}

function parseAccessLine(raw: string): LogEntry {
  const m = ACCESS_LOG_RE.exec(raw);
  if (!m) return { raw };

  const [, ip, user, time, request, status, bytes, referer, userAgent] = m;
  const [method, reqPath, protocol] = request.split(" ");

  return {
    raw,
    ip,
    user: user === "-" ? undefined : user,
    time,
    method,
    path: reqPath,
    protocol,
    status: status === "-" ? undefined : Number(status),
    bytes: bytes === "-" ? undefined : Number(bytes),
    referer: referer === "-" ? undefined : referer,
    userAgent,
  };
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const type = (params.get("type") ?? "access") as LogType;
  if (!Object.prototype.hasOwnProperty.call(LOG_FILES, type)) {
    return Response.json(
      {
        error: `Unknown log type "${type}". Use one of: ${Object.keys(
          LOG_FILES,
        ).join(", ")}`,
      },
      { status: 400 },
    );
  }

  const requested = Number.parseInt(params.get("lines") ?? "", 10);
  const lines = Number.isFinite(requested)
    ? Math.min(Math.max(requested, 1), MAX_LINES)
    : DEFAULT_LINES;

  const filePath = path.join(LOG_DIR, LOG_FILES[type]);

  let size: number;
  let mtime: string;
  try {
    const info = await stat(filePath);
    size = info.size;
    mtime = info.mtime.toISOString();
  } catch {
    return Response.json(
      {
        error: `Log file not found or not readable: ${filePath}`,
        file: filePath,
      },
      { status: 404 },
    );
  }

  let rawLines: string[];
  try {
    rawLines = await tailFile(filePath, lines);
  } catch (err) {
    return Response.json(
      { error: `Failed to read log: ${(err as Error).message}`, file: filePath },
      { status: 500 },
    );
  }

  const entries: LogEntry[] =
    type === "access"
      ? rawLines.map(parseAccessLine)
      : rawLines.map((raw) => ({ raw }));

  return Response.json({
    file: filePath,
    type,
    size,
    mtime,
    count: entries.length,
    entries,
  });
}
