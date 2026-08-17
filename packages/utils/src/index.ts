import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * @file @sharpnr/utils
 * @description The suite's shared helpers.
 *
 * Every app used to carry its own `src/lib/` copies of these -- `utils.ts` in
 * ten apps across seven variants, `api_response.ts` in nine across two. The
 * copies had drifted: three different `getCookie` implementations with three
 * different contracts, and an `APIError` type that was structurally different
 * depending on which app you were in.
 *
 * Consumed as SOURCE (its `exports` points at `src/`, no build step), matching
 * `@sharpnr/env` and `@sharpnr/http`.
 *
 * ─── HOW TO USE ───────────────────────────────────────────────────────────────
 *   import { cn, getCookie, type APIResponse } from "@sharpnr/utils";
 *
 * App-specific helpers stay in their own app: orchestrator's `create_menu.ts`,
 * sharp-hr's `role_badge.ts`, sharp-auth's `auth-redirect.ts` / `api_error.ts`
 * and its signup validators are each used by exactly one app and do not belong
 * here.
 */

// ─── Styling ─────────────────────────────────────────────────────────────────

/**
 * Merges class names, with later Tailwind utilities beating earlier ones.
 *
 * Re-exported by `@sharpnr/ui` as well, so `import { cn } from "@sharpnr/ui"`
 * keeps working -- both names resolve to this one implementation.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── Cookies ─────────────────────────────────────────────────────────────────

/**
 * Safely reads a cookie value by name.
 *
 * Returns `null` when the cookie is absent, or when there is no `document`
 * (SSR / tests). Handles surrounding whitespace, percent-encoded values, and
 * values that themselves contain "=" -- the split is on the FIRST "=" only.
 *
 * A malformed percent-encoding yields the raw value rather than throwing,
 * since this runs inside a request interceptor where throwing would take out
 * the request.
 */
export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;

  for (const cookie of document.cookie.split(";")) {
    const trimmed = cookie.trim();
    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) continue;

    if (trimmed.slice(0, separatorIndex) !== name) continue;

    const value = trimmed.slice(separatorIndex + 1);
    try {
      return decodeURIComponent(value);
    } catch {
      return value;
    }
  }

  return null;
}

// ─── API envelope ────────────────────────────────────────────────────────────

/**
 * Error payload from sharpnr-engine.
 *
 * `code` is optional: four apps declared it and five did not, and nothing in
 * the suite reads it. Optional satisfies both without breaking either.
 */
export interface APIError {
  status: number;
  code?: string;
  message: string;
}

/** Standard response envelope from sharpnr-engine. */
export interface APIResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: APIError;
  timestamp: string;
  token?: string;
}

// ─── Dates ───────────────────────────────────────────────────────────────────

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/**
 * Formats a date as `Monday, 05-Jan-2026, 09:30AM`.
 *
 * Returns "" for missing or unparseable input, so a bad timestamp renders as
 * blank rather than "Invalid Date".
 */
export function formatDateTimePretty(input?: string | Date): string {
  if (!input) return "";

  const date = input instanceof Date ? input : new Date(input);
  if (isNaN(date.getTime())) return "";

  const dayName = DAYS[date.getDay()];
  const day = String(date.getDate()).padStart(2, "0");
  const month = MONTHS[date.getMonth()];
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  return `${dayName}, ${day}-${month}-${year}, ${String(hours).padStart(2, "0")}:${minutes}${ampm}`;
}

/** Formats a date as `05 Jan 2026`. */
export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/**
 * Converts a YYYY-MM-DD string to an ISO 8601 string at UTC midnight, which is
 * what the Go backend expects.
 *
 * Example: "2026-05-23" -> "2026-05-23T00:00:00.000Z"
 */
export function convertToGoTimeUTC(dateStr: string): string {
  if (!dateStr) return "";
  return `${dateStr}T00:00:00.000Z`;
}
