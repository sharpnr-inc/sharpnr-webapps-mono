import type { SentinelPolicy } from "../api/types";

/**
 * Placeholder policies for building out the index UI before the Sentinel
 * backend is wired up. Shapes match {@link SentinelPolicy} so swapping in the
 * real query later is a drop-in change.
 */
export const MOCK_POLICIES: SentinelPolicy[] = [
  {
    id: "pol_view_bookings",
    name: "Staff can view bookings",
    description: "Lets front-desk staff open and read any booking in the property.",
    statement:
      '@id("staff-can-view-bookings")\npermit (\n  principal in Role::"front-desk",\n  action == Action::"viewBooking",\n  resource\n);',
    enabled: true,
    createdAt: "2026-05-02T09:12:00Z",
    updatedAt: "2026-06-18T14:30:00Z",
  },
  {
    id: "pol_manage_menu",
    name: "Managers can edit the menu",
    description: "Allows restaurant managers to add, edit and remove menu items.",
    statement:
      '@id("managers-can-edit-menu")\npermit (\n  principal in Role::"manager",\n  action in [Action::"createMenuItem", Action::"editMenuItem"],\n  resource\n);',
    enabled: true,
    createdAt: "2026-04-21T08:00:00Z",
    updatedAt: "2026-06-25T11:05:00Z",
  },
  {
    id: "pol_block_refunds",
    name: "Block refunds over $500",
    description: "Stops anyone except finance from issuing large refunds.",
    statement:
      '@id("block-large-refunds")\nforbid (\n  principal,\n  action == Action::"issueRefund",\n  resource\n)\nwhen { resource.amount > 500 };',
    enabled: true,
    createdAt: "2026-03-15T16:45:00Z",
    updatedAt: "2026-06-10T09:20:00Z",
  },
  {
    id: "pol_guest_self_service",
    name: "Guests manage their own stay",
    description: "Guests can view and update only their own reservation.",
    statement:
      '@id("guest-self-service")\npermit (\n  principal,\n  action in [Action::"viewBooking", Action::"updateBooking"],\n  resource\n)\nwhen { resource.owner == principal };',
    enabled: false,
    createdAt: "2026-02-28T12:30:00Z",
    updatedAt: "2026-05-30T18:10:00Z",
  },
  {
    id: "pol_deny_deleted_staff",
    name: "Deny access to deactivated staff",
    description: "Immediately blocks anyone whose account has been deactivated.",
    statement:
      '@id("deny-deactivated-staff")\nforbid (\n  principal,\n  action,\n  resource\n)\nwhen { principal.status == "deactivated" };',
    enabled: true,
    createdAt: "2026-01-10T10:00:00Z",
    updatedAt: "2026-06-01T07:45:00Z",
  },
];

/** Coarse effect of a policy, read from the leading keyword of its statement. */
export function policyEffect(statement: string): "permit" | "forbid" {
  // Skip annotation lines (`@id(...)`) to find the first policy keyword.
  const firstKeyword = statement
    .split("\n")
    .map((line) => line.trim())
    .find((line) => line.startsWith("permit") || line.startsWith("forbid"));
  return firstKeyword?.startsWith("forbid") ? "forbid" : "permit";
}
