import { z } from "zod";

export interface SharpCrmAccountStatusResponse {
  /** The org has provisioned a SharpCRM account at least once. */
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

export const startSharpCrmServiceRequestSchema = z.object({
  agreedTermsAndConditions: z.boolean(),
  startService: z.boolean(),
});

export type StartSharpCrmServiceRequestDto = z.infer<
  typeof startSharpCrmServiceRequestSchema
>;
