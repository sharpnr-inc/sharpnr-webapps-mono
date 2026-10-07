import { queryOptions } from "@tanstack/react-query";
import type { APIResponse } from "@sharpnr/utils";
import { isAxiosError } from "axios";
import { GetOrganizationSetUpProgress } from "./service";

export const setupProgressQueryKey = ["setup-progress"] as const;

/**
 * Shared by the wizard's route guard, the welcome page and the `/_appuser`
 * guard so they all read one cache entry. Each step mutation invalidates it.
 */
export const setupProgressQuery = queryOptions({
  queryKey: setupProgressQueryKey,
  queryFn: GetOrganizationSetUpProgress,
  // A step transition runs the guard more than once (/setup_wizard → redirect
  // → next step); this keeps it to a single request. Saves invalidate the
  // entry, so it is never served stale after one.
  staleTime: 1000 * 30,
});

/** The engine's own error message for a failed request, if it sent one. */
export function getSetupWizErrorMessage(error: unknown) {
  const fallback = "Something went wrong. Please try again.";

  if (!isAxiosError<APIResponse<unknown>>(error)) return fallback;

  return error.response?.data?.error?.message ?? fallback;
}
