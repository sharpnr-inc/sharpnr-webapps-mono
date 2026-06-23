import type { SentinelPolicy } from "../api/types";

/**
 * Dummy policies standing in for the Sentinel backend response until the real
 * endpoint is wired up. Each `statement` is valid Cedar source text and is
 * parsed/formatted at render time via `cederbuilder/service`.
 */
export const dummyPolicies: SentinelPolicy[] = [
  {
    id: "pol_admins_full_access",
    name: "Admins full access",
    description: "Members of the Admins group may perform any action.",
    statement: `@id("pol_admins_full_access")
permit (
  principal in Group::"Admins",
  action,
  resource
);`,
    enabled: true,
    createdAt: "2026-01-12T09:30:00Z",
    updatedAt: "2026-05-02T14:10:00Z",
  },
  {
    id: "pol_employee_read_directory",
    name: "Employees can view directory",
    description: "Any employee may read entries in the employee directory.",
    statement: `@id("pol_employee_read_directory")
permit (
  principal is Employee,
  action == Action::"viewEmployee",
  resource is Employee
);`,
    enabled: true,
    createdAt: "2026-02-01T11:00:00Z",
    updatedAt: "2026-02-01T11:00:00Z",
  },
  {
    id: "pol_finance_manage_payments",
    name: "Finance manages payments",
    description:
      "The Finance team can create and configure payment accounts in their legal entity.",
    statement: `@id("pol_finance_manage_payments")
permit (
  principal in Group::"Finance",
  action in [Action::"createPaymentAccount", Action::"configureGateway"],
  resource is PaymentAccount
)
when { resource.legalEntity == principal.legalEntity };`,
    enabled: true,
    createdAt: "2026-02-18T08:45:00Z",
    updatedAt: "2026-04-22T16:20:00Z",
  },
  {
    id: "pol_deny_disabled_users",
    name: "Block disabled users",
    description: "Disabled user accounts are forbidden from doing anything.",
    statement: `@id("pol_deny_disabled_users")
forbid (
  principal,
  action,
  resource
)
when { principal.status == "disabled" };`,
    enabled: true,
    createdAt: "2026-03-05T13:15:00Z",
    updatedAt: "2026-03-05T13:15:00Z",
  },
  {
    id: "pol_property_manager_inventory",
    name: "Property managers edit inventory",
    description:
      "Property managers may update inventory for properties they manage.",
    statement: `@id("pol_property_manager_inventory")
permit (
  principal is User,
  action == Action::"updateInventory",
  resource is Property
)
when { resource in principal.managedProperties };`,
    enabled: false,
    createdAt: "2026-03-29T10:05:00Z",
    updatedAt: "2026-06-01T09:40:00Z",
  },
  {
    id: "pol_audit_read_only",
    name: "Auditors read-only",
    description: "Auditors may read audit logs but never modify them.",
    statement: `@id("pol_audit_read_only")
permit (
  principal in Group::"Auditors",
  action == Action::"viewAuditLog",
  resource is AuditLog
);`,
    enabled: true,
    createdAt: "2026-04-10T15:25:00Z",
    updatedAt: "2026-04-10T15:25:00Z",
  },
];
