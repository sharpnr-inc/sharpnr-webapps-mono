import axios from "axios";
import type { APIResponse } from "@sharpnr/utils";

/**
 * A failed request normalised into something the UI can branch on: the HTTP
 * status alongside a message that is safe to put in front of a user. Extending
 * `Error` keeps it compatible with the `instanceof Error` checks callers and
 * react-query already make.
 */
export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

/** Per-status wording, used only when the backend didn't send its own message. */
export type ErrorMessages = Partial<Record<number, string>> & {
  default: string;
};

/** Pulls the backend's own message out of the `APIResponse` envelope, if any. */
function readEnvelopeMessage(data: unknown): string | undefined {
  if (!data || typeof data !== "object") return undefined;
  const envelope = data as APIResponse<unknown>;
  return envelope.error?.message ?? envelope.message;
}

/**
 * Turns anything thrown by axios into an `ApiError`. The backend's message wins
 * when there is one — it is the only party that knows *why* the request failed.
 * Otherwise the status picks the wording, so a 409 never reaches the user as
 * "Request failed with status code 409".
 */
export function toApiError(error: unknown, messages: ErrorMessages): ApiError {
  if (isApiError(error)) return error;

  if (axios.isAxiosError(error)) {
    const status = error.response?.status ?? 0;
    const message =
      readEnvelopeMessage(error.response?.data) ??
      messages[status] ??
      messages.default;

    return new ApiError(message, status);
  }

  return new ApiError(messages.default, 0);
}
