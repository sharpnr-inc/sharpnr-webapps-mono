export interface CablesServiceResponseDto {
  /** The org has provisioned a Cables account at least once. */
  isStarted: boolean;
  /** The Cables service is currently live for this org. */
  isActive: boolean;
}
import { z } from "zod";

export const startCablesServiceRequestsSchema = z.object({
  agreeToTermsAndCondtions: z.boolean(),
  startService: z.boolean(),
});

export type StartCablesServiceRequestsDto = z.infer<
  typeof startCablesServiceRequestsSchema
>;

export interface ChannelResponseDto {
  id: string;
  conversationId: string;

  name: string;
  slug: string;
  topic?: string | null;
  description?: string | null;

  type: string;
  visibility: string;

  isDefault: boolean;
  isArchived: boolean;
  memberCount: number;

  createdAt: string;
  updatedAt: string;
}

export type ChannelListResponseDto = ChannelResponseDto[];
