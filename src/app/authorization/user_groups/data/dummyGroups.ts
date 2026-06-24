/** A user group — a named set of people you can attach policies to. */
export interface UserGroup {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  policyCount: number;
}

/** Dummy groups standing in for the backend until the endpoint is wired up. */
export const dummyGroups: UserGroup[] = [
  {
    id: "grp_leadership",
    name: "Leadership",
    description: "Owners and senior managers who oversee the whole organization.",
    memberCount: 4,
    policyCount: 6,
  },
  {
    id: "grp_finance",
    name: "Finance",
    description: "Handles billing, invoices, payouts and payment settings.",
    memberCount: 7,
    policyCount: 5,
  },
  {
    id: "grp_front_desk",
    name: "Front Desk",
    description: "Day-to-day staff who manage bookings, check-ins and guests.",
    memberCount: 12,
    policyCount: 3,
  },
  {
    id: "grp_housekeeping",
    name: "Housekeeping",
    description: "Team responsible for rooms, inventory and maintenance tasks.",
    memberCount: 18,
    policyCount: 2,
  },
  {
    id: "grp_auditors",
    name: "Auditors",
    description: "Read-only access to reports and activity history for reviews.",
    memberCount: 3,
    policyCount: 1,
  },
  {
    id: "grp_support",
    name: "Support",
    description: "Helps customers and views tickets, orders and account details.",
    memberCount: 9,
    policyCount: 4,
  },
];
