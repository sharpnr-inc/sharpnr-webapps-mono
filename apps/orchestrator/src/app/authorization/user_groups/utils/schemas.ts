import { z } from "zod";

export const createSentinelUserGroupSchema = z.object({
  name: z.string().min(1, "Group name is required"),
  description: z.string().min(1, "Group description is required"),
  parentGroupId: z.string().nullable(),
});
