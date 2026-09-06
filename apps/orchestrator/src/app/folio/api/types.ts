import { z } from "zod";

export interface FolioAccountStatusResponse {
  /** The org has provisioned a Folio account at least once. */
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

export const startFolioServiceRequestSchema = z.object({
  agreeTermsAndConditions: z.boolean(),
  startService: z.boolean(),
});

export type StartFolioServiceRequestDto = z.infer<
  typeof startFolioServiceRequestSchema
>;
