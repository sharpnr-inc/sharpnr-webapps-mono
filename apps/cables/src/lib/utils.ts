import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Reads a single cookie by name from `document.cookie`.
 *
 * Returns `undefined` when the cookie is absent or the value cannot be
 * decoded, so a malformed cookie never throws inside a request interceptor.
 */
export function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined

  for (const pair of document.cookie.split(";")) {
    const separator = pair.indexOf("=")
    if (separator === -1) continue

    if (safeDecode(pair.slice(0, separator).trim()) !== name) continue

    return safeDecode(pair.slice(separator + 1).trim())
  }

  return undefined
}

function safeDecode(value: string): string | undefined {
  try {
    return decodeURIComponent(value)
  } catch {
    return undefined
  }
}
