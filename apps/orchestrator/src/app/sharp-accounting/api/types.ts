import { z } from "zod";

export interface AccountingAccountStatusResponse {
  /** The org has taken the accounting service at least once. */
  serviceStarted: boolean;
  /**
   * Whether that account is currently live. Null only when the org never
   * started the service — the engine leaves it unset rather than guessing
   * false, so "never started" and "started but switched off" stay apart.
   */
  isActive: boolean | null;
  /** The account id, null until the service has been started. */
  id: string | null;
}

export const startAccountingServiceRequestSchema = z.object({
  agreeTermsAndConditions: z.boolean(),
  startService: z.boolean(),
});

export type StartAccountingServiceRequestDto = z.infer<
  typeof startAccountingServiceRequestSchema
>;
