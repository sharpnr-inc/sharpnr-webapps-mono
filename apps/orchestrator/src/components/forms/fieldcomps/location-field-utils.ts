import { cn } from "@/lib/utils";

/**
 * Field errors come from zod as `{ message }` objects, but a plain string is
 * also a valid error value — unwrap either shape.
 */
export function getFieldErrorMessage(error: unknown): string | undefined {
  if (!error) return undefined;
  if (typeof error === "object" && "message" in error) {
    return String((error as { message: unknown }).message);
  }
  return String(error);
}

/**
 * Cities can run to thousands of rows per state; cmdk mounts every item it is
 * given, so cap what reaches the DOM and let search narrow it down.
 */
export const MAX_VISIBLE_OPTIONS = 100;

/**
 * Substring match, with prefix matches floated to the top — typing "ind"
 * should surface India before Indonesia and before British Indian Ocean
 * Territory.
 */
export function filterLocationOptions<T extends { label: string }>(
  options: T[],
  search: string,
): T[] {
  const query = search.trim().toLowerCase();
  if (!query) return options;

  const matches = options.filter((o) => o.label.toLowerCase().includes(query));

  return matches.sort((a, b) => {
    const aPrefix = a.label.toLowerCase().startsWith(query);
    const bPrefix = b.label.toLowerCase().startsWith(query);
    if (aPrefix === bPrefix) return 0;
    return aPrefix ? -1 : 1;
  });
}

/**
 * Match the trigger's width, but never get so narrow in a tight grid column
 * that place names are unreadable — while still fitting a small phone.
 */
export const locationPopoverClassName = cn(
  "w-(--radix-popover-trigger-width) min-w-[min(15rem,calc(100vw-2rem))] p-0",
);

/** Shared trigger styling for the country / state / city comboboxes. */
export const locationTriggerClassName = cn(
  "flex w-full items-center justify-between gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs",
  "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none",
  "disabled:cursor-not-allowed disabled:opacity-50",
  "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
);
